import { LitElement, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { normalizeConfig } from "./config";
import { directionLabel, formatState, numericState } from "./format";
import { weatherKioskStyles } from "./styles";
import type {
  HassEntity,
  HomeAssistant,
  NormalizedWeatherKioskConfig,
  WeatherKioskConfig,
} from "./types";

export class WeatherKioskCard extends LitElement {
  static styles = weatherKioskStyles;

  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private config?: NormalizedWeatherKioskConfig;

  public setConfig(config: WeatherKioskConfig): void {
    this.config = normalizeConfig(config);
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
            ${this.renderMetric("Pressure", entities.pressure)}
            ${this.renderMetric("Rain now", entities.rain_rate)}
            ${this.renderMetric("Rain · 24 h", entities.rain_24h)}
            ${this.renderWind(entities.wind_speed, entities.wind_direction)}
          </section>
        </main>
      </ha-card>
    `;
  }

  private renderTemperature(
    label: string,
    temperatureId: string,
    humidityId?: string,
  ): TemplateResult {
    const temperature = this.entity(temperatureId);
    const formatted = formatState(temperature, this.language, 1);
    const humidity = humidityId
      ? formatState(this.entity(humidityId), this.language, 0)
      : undefined;

    return html`
      <button
        class="temperature ${formatted.available ? "" : "unavailable"}"
        type="button"
        aria-label="Show ${label.toLowerCase()} temperature details"
        @click=${() => this.showMoreInfo(temperatureId)}
      >
        <span class="label">${label}</span>
        <span class="temperature-value">
          ${formatted.value}<span class="unit">${formatted.unit}</span>
        </span>
        ${humidity
          ? html`<span class="humidity">
              Humidity ${humidity.value}${humidity.unit}
            </span>`
          : nothing}
      </button>
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
        aria-label="Show ${label.toLowerCase()} details"
        @click=${() => this.showMoreInfo(entityId)}
      >
        <span class="label">${label}</span>
        <span class="metric-value">
          ${formatted.value}<span class="unit">${formatted.unit}</span>
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
    const clickableId = speedId ?? directionId;

    const content = html`
      <span class="label">Wind</span>
      <span class="metric-value wind-value">
        <span
          class="wind-arrow"
          style=${degrees === undefined
            ? ""
            : `transform: rotate(${degrees}deg)`}
          aria-hidden="true"
        >↑</span>
        <span>${speed.value}<span class="unit">${speed.unit}</span></span>
        <span class="unit">${directionLabel(degrees)}</span>
      </span>
    `;

    return clickableId
      ? html`
          <button
            class="metric ${speed.available ? "" : "unavailable"}"
            type="button"
            aria-label="Show wind details"
            @click=${() => this.showMoreInfo(clickableId)}
          >
            ${content}
          </button>
        `
      : html`<div class="metric unavailable">${content}</div>`;
  }

  private entity(entityId: string | undefined): HassEntity | undefined {
    return entityId ? this.hass?.states[entityId] : undefined;
  }

  private get language(): string {
    return this.hass?.locale?.language ?? this.hass?.language ?? "en";
  }

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
