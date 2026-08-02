import {
  LitElement,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, state } from "lit/decorators.js";
import { normalizeConfig } from "./config";
import {
  createChartModel,
  createForecastChartModel,
  fetchEntityHistory,
  HISTORY_RANGES,
} from "./history";
import {
  fetchWeatherForecast,
  forecastPoints,
  forecastRange,
  forecastUnit,
  type ForecastUnits,
} from "./forecast";
import { directionLabel, formatState, numericState } from "./format";
import { translationsFor } from "./localize";
import { weatherKioskStyles } from "./styles";
import type {
  HassEntity,
  ForecastMetric,
  HistoryPoint,
  HomeAssistant,
  NormalizedWeatherKioskConfig,
  WeatherKioskConfig,
  WeatherForecast,
} from "./types";

interface ActiveHistory {
  entityId: string;
  label: string;
  hours: number;
  forecastMetric?: ForecastMetric;
}

interface PressureTrend {
  direction: "rising" | "steady" | "falling";
  delta: number;
}

export class WeatherKioskCard extends LitElement {
  static styles = weatherKioskStyles;

  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private config?: NormalizedWeatherKioskConfig;

  @state()
  private activeHistory?: ActiveHistory;

  @state()
  private historyPoints: HistoryPoint[] = [];

  @state()
  private historyLoading = false;

  @state()
  private historyError?: string;

  @state()
  private pressureTrend?: PressureTrend;

  @state()
  private forecast: WeatherForecast[] = [];

  private historyRequest = 0;
  private pressureRequestKey?: string;
  private pressureEntityId?: string;
  private pressureFetchedAt = 0;
  private forecastRequestKey?: string;
  private forecastFetchedAt = 0;

  public setConfig(config: WeatherKioskConfig): void {
    this.config = normalizeConfig(config);
    this.pressureRequestKey = undefined;
    this.pressureEntityId = undefined;
    this.pressureFetchedAt = 0;
    this.forecastRequestKey = undefined;
    this.forecastFetchedAt = 0;
    this.forecast = [];
  }

  public getCardSize(): number {
    return 9;
  }

  public getGridOptions(): Record<string, number | string> {
    return {
      rows: 8,
      min_rows: 6,
      columns: "full",
      min_columns: 6,
    };
  }

  public static getStubConfig(): Omit<WeatherKioskConfig, "type"> {
    const translations = translationsFor(
      typeof document === "undefined" ? "en" : document.documentElement.lang,
    );
    return {
      title: translations.defaultTitle,
      entities: {
        outdoor_temperature: "sensor.outdoor_temperature",
        indoor_temperature: "sensor.indoor_temperature",
      },
    };
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("weather-kiosk-card-editor");
  }

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keydown", this.handleKeydown);
  }

  public disconnectedCallback(): void {
    window.removeEventListener("keydown", this.handleKeydown);
    super.disconnectedCallback();
  }

  protected updated(_changed: PropertyValues<this>): void {
    void this.loadPressureTrend();
    void this.loadForecast();
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html`<ha-card aria-busy="true"></ha-card>`;
    }

    const entities = this.config.entities;
    const translations = this.translations;
    return html`
      <ha-card>
        <main class="kiosk ${this.config.layout}">
          <header><h1>${this.config.title || translations.defaultTitle}</h1></header>
          <section class="temperatures" aria-label=${translations.temperatures}>
            ${this.renderTemperature(
              translations.outdoor,
              translations.editor.outdoorTemperature,
              entities.outdoor_temperature,
              entities.outdoor_humidity,
              true,
            )}
            ${this.renderTemperature(
              translations.indoor,
              translations.editor.indoorTemperature,
              entities.indoor_temperature,
              entities.indoor_humidity,
              false,
            )}
          </section>
          <section class="metrics" aria-label=${translations.weatherDetails}>
            ${this.renderPressure(entities.pressure)}
            ${this.renderMetric(translations.rainNow, entities.rain_rate)}
            ${this.renderMetric(translations.rain24h, entities.rain_24h)}
            ${this.renderWind(entities.wind_speed, entities.wind_direction)}
          </section>
        </main>
        ${this.renderHistoryDialog()}
      </ha-card>
    `;
  }

  private renderTemperature(
    label: string,
    temperatureLabel: string,
    temperatureId: string,
    humidityId?: string,
    outdoor = false,
  ): TemplateResult {
    const temperature = formatState(
      this.entity(temperatureId),
      this.language,
      1,
    );
    const humidity = humidityId
      ? formatState(this.entity(humidityId), this.language, 0)
      : undefined;

    return html`
      <article class="temperature ${temperature.available ? "" : "unavailable"}">
        <button
          class="temperature-main"
          type="button"
          aria-label=${this.translations.showHistory(temperatureLabel)}
          @click=${() =>
            this.openHistory(
              temperatureId,
              temperatureLabel,
              outdoor ? "temperature" : undefined,
            )}
        >
          <span class="label">${label}</span>
          <span class="temperature-value">
            ${temperature.value}<span class="unit">${temperature.unit}</span>
          </span>
          ${outdoor
            ? this.renderForecastRange("temperature", temperatureId)
            : nothing}
        </button>
        ${humidityId && humidity
          ? html`
              <button
                class="secondary-value"
                type="button"
                aria-label=${this.translations.showHistory(
                  label === this.translations.outdoor
                    ? this.translations.editor.outdoorHumidity
                    : this.translations.editor.indoorHumidity,
                )}
                @click=${() =>
                  this.openHistory(
                    humidityId,
                    label === this.translations.outdoor
                      ? this.translations.editor.outdoorHumidity
                      : this.translations.editor.indoorHumidity,
                    outdoor ? "humidity" : undefined,
                  )}
              >
                <span>${this.translations.humidity}</span>
                <strong>${humidity.value}${humidity.unit}</strong>
                ${outdoor
                  ? this.renderForecastRange("humidity", humidityId)
                  : nothing}
              </button>
            `
          : nothing}
      </article>
    `;
  }

  private renderMetric(
    label: string,
    entityId?: string,
    forecastMetric?: ForecastMetric,
  ): TemplateResult {
    if (!entityId) {
      return html`
        <div class="metric unavailable">
          <span class="label">${label}</span>
          <span class="metric-value">—</span>
        </div>
      `;
    }

    const formatted = formatState(this.entity(entityId), this.language, 1);
    return html`
      <button
        class="metric ${formatted.available ? "" : "unavailable"}"
        type="button"
        aria-label=${this.translations.showHistory(label)}
        @click=${() => this.openHistory(entityId, label, forecastMetric)}
      >
        <span class="label">${label}</span>
        <span class="metric-value">
          ${formatted.value}<span class="unit">${formatted.unit}</span>
        </span>
        ${forecastMetric
          ? this.renderForecastRange(forecastMetric, entityId)
          : nothing}
      </button>
    `;
  }

  private renderPressure(entityId?: string): TemplateResult {
    const translations = this.translations;
    if (!entityId) return this.renderMetric(translations.pressure);
    const formatted = formatState(this.entity(entityId), this.language, 1);
    const trend = this.pressureTrend;
    const icon =
      trend?.direction === "rising"
        ? "↗"
        : trend?.direction === "falling"
          ? "↘"
          : "→";
    const trendDirection = trend ? translations[trend.direction] : undefined;
    const trendLabel = trend
      ? `${trendDirection} ${this.formatDelta(trend.delta)}${formatted.unit} / 3 h`
      : translations.trendUnavailable;

    return html`
      <button
        class="metric ${formatted.available ? "" : "unavailable"}"
        type="button"
        aria-label=${translations.showHistory(translations.pressure)}
        @click=${() => this.openHistory(entityId, translations.pressure, "pressure")}
      >
        <span class="label">${translations.pressure}</span>
        <span class="metric-value">
          ${formatted.value}<span class="unit">${formatted.unit}</span>
        </span>
        <span class="trend ${trend?.direction ?? ""}">
          <span aria-hidden="true">${icon}</span> ${trendLabel}
        </span>
        ${this.renderForecastRange("pressure", entityId)}
      </button>
    `;
  }

  private renderWind(speedId?: string, directionId?: string): TemplateResult {
    const speed = speedId
      ? formatState(this.entity(speedId), this.language, 1)
      : { value: "—", unit: "", available: false };
    const degrees = directionId
      ? numericState(this.entity(directionId))
      : undefined;

    return html`
      <article class="metric wind ${speed.available ? "" : "unavailable"}">
        <span class="label">${this.translations.wind}</span>
        <div class="wind-values">
          ${directionId
            ? html`
                <button
                  class="wind-direction"
                  type="button"
                  aria-label=${this.translations.showHistory(
                    this.translations.windDirection,
                  )}
                  @click=${() =>
                    this.openHistory(directionId, this.translations.windDirection, "wind_bearing")}
                >
                  <span
                    class="wind-arrow"
                    style=${degrees === undefined
                      ? ""
                      : `transform: rotate(${degrees}deg)`}
                    aria-hidden="true"
                    >↑</span
                  >
                  <span class="direction-label"
                    >${directionLabel(degrees, this.language)}</span
                  >
                </button>
              `
            : html`<span class="wind-arrow">↑</span>`}
          ${speedId
            ? html`
                <button
                  class="wind-speed"
                  type="button"
                  aria-label=${this.translations.showHistory(
                    this.translations.windSpeed,
                  )}
                  @click=${() =>
                    this.openHistory(speedId, this.translations.windSpeed, "wind_speed")}
                >
                  ${speed.value}<span class="unit">${speed.unit}</span>
                  ${this.renderForecastRange("wind_speed", speedId)}
                </button>
              `
            : html`<span class="wind-speed">—</span>`}
        </div>
      </article>
    `;
  }

  private renderHistoryDialog(): TemplateResult | typeof nothing {
    if (!this.activeHistory) return nothing;

    const entity = this.entity(this.activeHistory.entityId);
    const current = formatState(entity, this.language, 1);
    const now = Date.now();
    const forecast = this.activeHistory.forecastMetric
      ? this.forecastPointsFor(
          this.activeHistory.forecastMetric,
          entity?.attributes.unit_of_measurement,
          now,
          now + this.activeHistory.hours * 60 * 60 * 1000,
        )
      : [];
    const forecastChart = this.activeHistory.forecastMetric && this.config?.forecast_entity
      ? createForecastChartModel(
          this.historyPoints,
          forecast,
          now,
          this.activeHistory.hours,
        )
      : undefined;
    const chart = forecastChart ?? createChartModel(this.historyPoints);
    const hasForecast = Boolean(forecastChart?.forecastPoints);
    const dateFormat = new Intl.DateTimeFormat(this.language, {
      weekday: this.activeHistory.hours >= 168 ? "short" : undefined,
      hour: "2-digit",
      minute: "2-digit",
    });
    const numberFormat = new Intl.NumberFormat(this.language, {
      maximumFractionDigits: 1,
    });

    return html`
      <div
        class="history-backdrop"
        @click=${this.handleBackdropClick}
        role="presentation"
      >
        <section
          class="history-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="history-title"
        >
          <header class="dialog-header">
            <div>
              <span class="dialog-eyebrow">${this.translations.history}</span>
              <h2 id="history-title">${this.activeHistory.label}</h2>
            </div>
            <div class="dialog-current">
              ${current.value}<span>${current.unit}</span>
            </div>
            <button
              class="close-button"
              type="button"
              aria-label=${this.translations.closeHistory}
              @click=${this.closeHistory}
            >
              ×
            </button>
          </header>

          <nav class="range-selector" aria-label=${this.translations.historyRange}>
            ${HISTORY_RANGES.map(
              (range) => html`
                <button
                  type="button"
                  class=${range.hours === this.activeHistory?.hours
                    ? "selected"
                    : ""}
                  aria-pressed=${range.hours === this.activeHistory?.hours}
                  @click=${() => this.changeHistoryRange(range.hours)}
                >
                  ${range.label}
                </button>
              `,
            )}
          </nav>

          <div class="chart-frame" aria-live="polite">
            ${this.historyLoading
              ? html`<div class="chart-message"><span class="spinner"></span>${this.translations.loadingHistory}</div>`
              : this.historyError
                ? html`<div class="chart-message error">${this.historyError}</div>`
                : chart
                  ? html`
                      <div class="chart-y-label max">
                        ${numberFormat.format(chart.maximum)} ${current.unit}
                      </div>
                      <div class="chart-y-label min">
                        ${numberFormat.format(chart.minimum)} ${current.unit}
                      </div>
                      <svg
                        class="history-chart"
                        viewBox="0 0 800 300"
                        preserveAspectRatio="none"
                        role="img"
                        aria-label=${this.translations.historyGraph(
                          this.activeHistory.label,
                        )}
                      >
                        <defs>
                          <linearGradient id="history-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"></stop>
                            <stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.02"></stop>
                          </linearGradient>
                        </defs>
                        <line class="grid-line" x1="18" y1="18" x2="782" y2="18"></line>
                        <line class="grid-line" x1="18" y1="150" x2="782" y2="150"></line>
                        <line class="grid-line" x1="18" y1="282" x2="782" y2="282"></line>
                        ${hasForecast
                          ? html`<line class="now-line" x1="400" y1="18" x2="400" y2="282"></line>`
                          : nothing}
                        <polygon class="chart-area" points=${chart.area}></polygon>
                        <polyline class="chart-line" points=${chart.points}></polyline>
                        ${hasForecast
                          ? html`<polyline class="forecast-line" points=${forecastChart!.forecastPoints}></polyline>`
                          : nothing}
                        <circle class="latest-point" cx=${chart.latestX} cy=${chart.latestY} r="5"></circle>
                      </svg>
                      <div class="chart-x-labels">
                        <span>${dateFormat.format(chart.start)}</span>
                        ${hasForecast ? html`<span>${this.translations.now}</span>` : nothing}
                        <span>${hasForecast ? dateFormat.format(chart.end) : this.translations.now}</span>
                      </div>
                      ${hasForecast
                        ? html`<div class="chart-legend"><span></span>${this.translations.forecast}</div>`
                        : nothing}
                    `
                  : html`<div class="chart-message">${this.translations.noHistory}</div>`}
          </div>

          <footer class="dialog-footer">
            <span>${entity?.attributes.friendly_name ?? this.activeHistory.entityId}</span>
            <button type="button" @click=${() => this.showMoreInfo(this.activeHistory!.entityId)}>
              ${this.translations.entityDetails}
            </button>
          </footer>
        </section>
      </div>
    `;
  }

  private entity(entityId: string | undefined): HassEntity | undefined {
    return entityId ? this.hass?.states[entityId] : undefined;
  }

  private get language(): string {
    return this.hass?.locale?.language ?? this.hass?.language ?? "en";
  }

  private get translations() {
    return translationsFor(this.language);
  }

  private openHistory(
    entityId: string,
    label: string,
    forecastMetric?: ForecastMetric,
  ): void {
    this.activeHistory = { entityId, label, hours: 24, forecastMetric };
    this.historyPoints = [];
    this.historyError = undefined;
    void this.loadActiveHistory();
  }

  private renderForecastRange(
    metric: ForecastMetric,
    entityId: string,
  ): TemplateResult | typeof nothing {
    if (!this.config?.forecast_entity || metric === "wind_bearing") return nothing;
    const entity = this.entity(entityId);
    const now = Date.now();
    const range = forecastRange(
      this.forecast,
      metric,
      forecastUnit(metric, this.forecastUnits),
      entity?.attributes.unit_of_measurement,
      now,
      now + 24 * 60 * 60 * 1000,
    );
    if (!range) return nothing;
    const format = new Intl.NumberFormat(this.language, { maximumFractionDigits: 1 });
    return html`<span class="forecast-range">
      ${this.translations.forecast24h} · ${this.translations.minimumAbbreviation}
      ${format.format(range.minimum)} · ${this.translations.maximumAbbreviation}
      ${format.format(range.maximum)}
    </span>`;
  }

  private forecastPointsFor(
    metric: ForecastMetric,
    targetUnit: unknown,
    start: number,
    end: number,
  ): HistoryPoint[] {
    return forecastPoints(
      this.forecast,
      metric,
      forecastUnit(metric, this.forecastUnits),
      typeof targetUnit === "string" ? targetUnit : undefined,
      start,
      end,
    );
  }

  private get forecastUnits(): ForecastUnits {
    const attributes = this.entity(this.config?.forecast_entity)?.attributes;
    return {
      temperature: typeof attributes?.temperature_unit === "string" ? attributes.temperature_unit : undefined,
      pressure: typeof attributes?.pressure_unit === "string" ? attributes.pressure_unit : undefined,
      wind_speed: typeof attributes?.wind_speed_unit === "string" ? attributes.wind_speed_unit : undefined,
    };
  }

  private async loadForecast(): Promise<void> {
    const entityId = this.config?.forecast_entity;
    const forecastType = this.config?.forecast_type;
    const hass = this.hass;
    if (!hass || !entityId || !forecastType) return;
    const now = Date.now();
    if (now - this.forecastFetchedAt < 30 * 60 * 1000) return;
    const key = `${entityId}:${forecastType}:${now}`;
    this.forecastRequestKey = key;
    this.forecastFetchedAt = now;
    try {
      const forecast = await fetchWeatherForecast(hass, entityId, forecastType);
      if (this.forecastRequestKey === key) this.forecast = forecast;
    } catch (error) {
      console.warn("Weather Kiosk could not load forecast", error);
      if (this.forecastRequestKey === key) this.forecast = [];
    }
  }

  private closeHistory = (): void => {
    this.historyRequest += 1;
    this.activeHistory = undefined;
  };

  private changeHistoryRange(hours: number): void {
    if (!this.activeHistory || this.activeHistory.hours === hours) return;
    this.activeHistory = { ...this.activeHistory, hours };
    void this.loadActiveHistory();
  }

  private async loadActiveHistory(): Promise<void> {
    if (!this.hass || !this.activeHistory) return;
    const request = ++this.historyRequest;
    const { entityId, hours } = this.activeHistory;
    this.historyLoading = true;
    this.historyError = undefined;

    try {
      const points = await fetchEntityHistory(this.hass, entityId, hours);
      if (request !== this.historyRequest) return;
      this.historyPoints = this.appendCurrentPoint(points, entityId);
    } catch (error) {
      if (request !== this.historyRequest) return;
      console.error("Weather Kiosk could not load history", error);
      this.historyError = this.translations.historyError;
    } finally {
      if (request === this.historyRequest) this.historyLoading = false;
    }
  }

  private appendCurrentPoint(
    points: HistoryPoint[],
    entityId: string,
  ): HistoryPoint[] {
    const entity = this.entity(entityId);
    const value = numericState(entity);
    if (value === undefined || !entity) return points;
    const timestamp = new Date(entity.last_updated).getTime();
    if (!Number.isFinite(timestamp)) return points;
    const last = points[points.length - 1];
    if (last?.timestamp === timestamp && last.value === value) return points;
    return [...points, { timestamp, value }].sort(
      (left, right) => left.timestamp - right.timestamp,
    );
  }

  private async loadPressureTrend(): Promise<void> {
    const pressureId = this.config?.entities.pressure;
    const hass = this.hass;
    const pressure = this.entity(pressureId);
    if (!hass || !pressureId || !pressure) return;

    const now = Date.now();
    if (
      pressureId === this.pressureEntityId &&
      now - this.pressureFetchedAt < 10 * 60 * 1000
    ) {
      return;
    }

    const key = `${pressureId}:${now}`;
    this.pressureRequestKey = key;
    this.pressureEntityId = pressureId;
    this.pressureFetchedAt = now;

    try {
      const points = await fetchEntityHistory(hass, pressureId, 3);
      if (this.pressureRequestKey !== key) return;
      const current = numericState(pressure);
      const baseline = points[0]?.value;
      if (current === undefined || baseline === undefined) {
        this.pressureTrend = undefined;
        return;
      }
      const delta = current - baseline;
      const threshold =
        this.config?.pressure_trend_threshold ??
        defaultPressureThreshold(pressure.attributes.unit_of_measurement);
      this.pressureTrend = {
        delta,
        direction:
          delta > threshold
            ? "rising"
            : delta < -threshold
              ? "falling"
              : "steady",
      };
    } catch (error) {
      console.warn("Weather Kiosk could not calculate pressure trend", error);
      if (this.pressureRequestKey === key) this.pressureTrend = undefined;
    }
  }

  private formatDelta(value: number): string {
    const formatted = new Intl.NumberFormat(this.language, {
      maximumFractionDigits: 1,
      signDisplay: "always",
    }).format(value);
    return formatted;
  }

  private handleBackdropClick = (event: MouseEvent): void => {
    if (event.target === event.currentTarget) this.closeHistory();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && this.activeHistory) this.closeHistory();
  };

  private showMoreInfo(entityId: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }
}

function defaultPressureThreshold(unit: unknown): number {
  const normalized = String(unit ?? "").toLowerCase();
  if (normalized === "kpa") return 0.05;
  if (normalized === "inhg") return 0.015;
  if (normalized === "psi") return 0.007;
  return 0.5;
}
