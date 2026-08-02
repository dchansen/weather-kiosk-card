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
  fetchEntityHistory,
  HISTORY_RANGES,
} from "./history";
import { directionLabel, formatState, numericState } from "./format";
import { weatherKioskStyles } from "./styles";
import type {
  HassEntity,
  HistoryPoint,
  HomeAssistant,
  NormalizedWeatherKioskConfig,
  WeatherKioskConfig,
} from "./types";

interface ActiveHistory {
  entityId: string;
  label: string;
  hours: number;
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

  private historyRequest = 0;
  private pressureRequestKey?: string;
  private pressureEntityId?: string;
  private pressureFetchedAt = 0;

  public setConfig(config: WeatherKioskConfig): void {
    this.config = normalizeConfig(config);
    this.pressureRequestKey = undefined;
    this.pressureEntityId = undefined;
    this.pressureFetchedAt = 0;
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
    return {
      title: "Weather",
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
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html`<ha-card aria-busy="true"></ha-card>`;
    }

    const entities = this.config.entities;
    return html`
      <ha-card>
        <main class="kiosk ${this.config.layout}">
          <header><h1>${this.config.title}</h1></header>
          <section class="temperatures" aria-label="Temperatures">
            ${this.renderTemperature(
              "Outdoor",
              entities.outdoor_temperature,
              entities.outdoor_humidity,
            )}
            ${this.renderTemperature(
              "Indoor",
              entities.indoor_temperature,
              entities.indoor_humidity,
            )}
          </section>
          <section class="metrics" aria-label="Weather details">
            ${this.renderPressure(entities.pressure)}
            ${this.renderMetric("Rain now", entities.rain_rate)}
            ${this.renderMetric("Rain · 24 h", entities.rain_24h)}
            ${this.renderWind(entities.wind_speed, entities.wind_direction)}
          </section>
        </main>
        ${this.renderHistoryDialog()}
      </ha-card>
    `;
  }

  private renderTemperature(
    label: string,
    temperatureId: string,
    humidityId?: string,
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
          aria-label="Show ${label.toLowerCase()} temperature history"
          @click=${() => this.openHistory(temperatureId, `${label} temperature`)}
        >
          <span class="label">${label}</span>
          <span class="temperature-value">
            ${temperature.value}<span class="unit">${temperature.unit}</span>
          </span>
        </button>
        ${humidityId && humidity
          ? html`
              <button
                class="secondary-value"
                type="button"
                aria-label="Show ${label.toLowerCase()} humidity history"
                @click=${() =>
                  this.openHistory(humidityId, `${label} humidity`)}
              >
                <span>Humidity</span>
                <strong>${humidity.value}${humidity.unit}</strong>
              </button>
            `
          : nothing}
      </article>
    `;
  }

  private renderMetric(label: string, entityId?: string): TemplateResult {
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
        aria-label="Show ${label.toLowerCase()} history"
        @click=${() => this.openHistory(entityId, label)}
      >
        <span class="label">${label}</span>
        <span class="metric-value">
          ${formatted.value}<span class="unit">${formatted.unit}</span>
        </span>
      </button>
    `;
  }

  private renderPressure(entityId?: string): TemplateResult {
    if (!entityId) return this.renderMetric("Pressure");
    const formatted = formatState(this.entity(entityId), this.language, 1);
    const trend = this.pressureTrend;
    const icon =
      trend?.direction === "rising"
        ? "↗"
        : trend?.direction === "falling"
          ? "↘"
          : "→";
    const trendLabel = trend
      ? `${trend.direction} ${this.formatDelta(trend.delta)}${formatted.unit} / 3 h`
      : "Trend unavailable";

    return html`
      <button
        class="metric ${formatted.available ? "" : "unavailable"}"
        type="button"
        aria-label="Show pressure history"
        @click=${() => this.openHistory(entityId, "Pressure")}
      >
        <span class="label">Pressure</span>
        <span class="metric-value">
          ${formatted.value}<span class="unit">${formatted.unit}</span>
        </span>
        <span class="trend ${trend?.direction ?? ""}">
          <span aria-hidden="true">${icon}</span> ${trendLabel}
        </span>
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
        <span class="label">Wind</span>
        <div class="wind-values">
          ${directionId
            ? html`
                <button
                  class="wind-direction"
                  type="button"
                  aria-label="Show wind direction history"
                  @click=${() =>
                    this.openHistory(directionId, "Wind direction")}
                >
                  <span
                    class="wind-arrow"
                    style=${degrees === undefined
                      ? ""
                      : `transform: rotate(${degrees}deg)`}
                    aria-hidden="true"
                    >↑</span
                  >
                  <span class="direction-label">${directionLabel(degrees)}</span>
                </button>
              `
            : html`<span class="wind-arrow">↑</span>`}
          ${speedId
            ? html`
                <button
                  class="wind-speed"
                  type="button"
                  aria-label="Show wind speed history"
                  @click=${() => this.openHistory(speedId, "Wind speed")}
                >
                  ${speed.value}<span class="unit">${speed.unit}</span>
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
    const chart = createChartModel(this.historyPoints);
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
              <span class="dialog-eyebrow">History</span>
              <h2 id="history-title">${this.activeHistory.label}</h2>
            </div>
            <div class="dialog-current">
              ${current.value}<span>${current.unit}</span>
            </div>
            <button
              class="close-button"
              type="button"
              aria-label="Close history"
              @click=${this.closeHistory}
            >
              ×
            </button>
          </header>

          <nav class="range-selector" aria-label="History range">
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
              ? html`<div class="chart-message"><span class="spinner"></span>Loading history…</div>`
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
                        aria-label="${this.activeHistory.label} history graph"
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
                        <polygon class="chart-area" points=${chart.area}></polygon>
                        <polyline class="chart-line" points=${chart.points}></polyline>
                        <circle class="latest-point" cx=${chart.latestX} cy=${chart.latestY} r="5"></circle>
                      </svg>
                      <div class="chart-x-labels">
                        <span>${dateFormat.format(chart.start)}</span>
                        <span>Now</span>
                      </div>
                    `
                  : html`<div class="chart-message">No recorded numeric history for this period.</div>`}
          </div>

          <footer class="dialog-footer">
            <span>${entity?.attributes.friendly_name ?? this.activeHistory.entityId}</span>
            <button type="button" @click=${() => this.showMoreInfo(this.activeHistory!.entityId)}>
              Entity details
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

  private openHistory(entityId: string, label: string): void {
    this.activeHistory = { entityId, label, hours: 24 };
    this.historyPoints = [];
    this.historyError = undefined;
    void this.loadActiveHistory();
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
      this.historyError =
        "History could not be loaded. Check that Recorder includes this entity.";
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
