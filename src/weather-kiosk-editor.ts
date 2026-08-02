import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { translationsFor, type WeatherKioskTranslations } from "./localize";
import type {
  ForecastType,
  HomeAssistant,
  LayoutMode,
  WeatherKioskConfig,
  WeatherKioskEntities,
} from "./types";

type EditableWeatherKioskConfig = Omit<WeatherKioskConfig, "entities"> & {
  entities: Partial<WeatherKioskEntities>;
};

interface EntityField {
  key: keyof WeatherKioskEntities;
  label: string;
  required?: boolean;
}

interface EntityGroup {
  title: string;
  description: string;
  fields: readonly EntityField[];
}

function entityGroups(strings: WeatherKioskTranslations["editor"]): readonly EntityGroup[] {
  return [
    {
    title: strings.temperatures,
    description: strings.temperaturesDescription,
    fields: [
      { key: "outdoor_temperature", label: strings.outdoorTemperature, required: true },
      { key: "indoor_temperature", label: strings.indoorTemperature, required: true },
    ],
  },
  {
    title: strings.humidity,
    description: strings.humidityDescription,
    fields: [
      { key: "outdoor_humidity", label: strings.outdoorHumidity },
      { key: "indoor_humidity", label: strings.indoorHumidity },
    ],
  },
  {
    title: strings.weatherDetails,
    description: strings.weatherDetailsDescription,
    fields: [
      { key: "pressure", label: strings.pressure },
      { key: "rain_rate", label: strings.currentRainRate },
      { key: "rain_24h", label: strings.rain24h },
      { key: "wind_speed", label: strings.windSpeed },
      { key: "wind_direction", label: strings.windDirection },
    ],
  },
  ];
}

export function withEntityValue(
  config: EditableWeatherKioskConfig,
  key: keyof WeatherKioskEntities,
  value: string | undefined,
): EditableWeatherKioskConfig {
  const entities = { ...config.entities };
  const trimmed = value?.trim();
  if (trimmed) entities[key] = trimmed;
  else delete entities[key];
  return { ...config, entities };
}

export class WeatherKioskCardEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .editor {
      display: grid;
      gap: 24px;
    }

    section {
      display: grid;
      gap: 14px;
    }

    h3,
    p {
      margin: 0;
    }

    h3 {
      color: var(--primary-text-color);
      font-size: 16px;
      font-weight: 500;
    }

    p,
    .helper {
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.4;
    }

    .fields {
      display: grid;
      gap: 16px;
    }

    .field {
      display: grid;
      gap: 6px;
    }

    label {
      color: var(--primary-text-color);
      font-size: 12px;
      font-weight: 500;
    }

    input,
    select {
      box-sizing: border-box;
      width: 100%;
      min-height: 48px;
      padding: 0 12px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      outline: none;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
    }

    input:focus,
    select:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color);
    }

    option {
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    @media (min-width: 520px) {
      .display-fields {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;

  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private config?: EditableWeatherKioskConfig;

  public setConfig(config: WeatherKioskConfig): void {
    this.config = {
      ...config,
      type: config.type || "custom:weather-kiosk-card",
      entities: { ...(config.entities ?? {}) },
    };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const strings = this.translations.editor;

    return html`
      <div class="editor">
        <section>
          <div>
            <h3>${strings.display}</h3>
            <p>${strings.displayDescription}</p>
          </div>
          <div class="fields display-fields">
            <div class="field">
              <label for="title">${strings.title}</label>
              <input
                id="title"
                type="text"
                .value=${this.config.title ?? ""}
                placeholder=${this.translations.defaultTitle}
                @input=${this.handleTitleInput}
              />
            </div>
            <div class="field">
              <label for="layout">${strings.layout}</label>
              <select
                id="layout"
                .value=${this.config.layout ?? "auto"}
                @change=${this.handleLayoutChange}
              >
                <option value="auto">${strings.automatic}</option>
                <option value="landscape">${strings.landscape}</option>
                <option value="portrait">${strings.portrait}</option>
              </select>
            </div>
          </div>
        </section>

        ${entityGroups(strings).map((group) => this.renderEntityGroup(group))}

        <section>
          <div>
            <h3>${strings.forecast}</h3>
            <p>${strings.forecastDescription}</p>
          </div>
          <div class="fields display-fields">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this.config.forecast_entity ?? ""}
              .label=${strings.forecastEntity}
              .includeDomains=${["weather"]}
              .allowCustomEntity=${true}
              @value-changed=${this.handleForecastEntityChanged}
            ></ha-entity-picker>
            <div class="field">
              <label for="forecast-type">${strings.forecastType}</label>
              <select
                id="forecast-type"
                .value=${this.config.forecast_type ?? "hourly"}
                @change=${this.handleForecastTypeChange}
              >
                <option value="hourly">${strings.hourly}</option>
                <option value="daily">${strings.daily}</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <div>
            <h3>${strings.pressureTrend}</h3>
            <p>${strings.pressureTrendDescription}</p>
          </div>
          <div class="field">
            <label for="pressure-threshold">${strings.steadyThreshold}</label>
            <input
              id="pressure-threshold"
              type="number"
              min="0"
              step="any"
              .value=${this.config.pressure_trend_threshold?.toString() ?? ""}
              placeholder=${strings.automaticThreshold}
              @change=${this.handleThresholdChange}
            />
            <span class="helper">${strings.pressureUnitHelper}</span>
          </div>
        </section>
      </div>
    `;
  }

  private get translations() {
    return translationsFor(
      this.hass?.locale?.language ?? this.hass?.language ?? "en",
    );
  }

  private renderEntityGroup(group: EntityGroup): TemplateResult {
    return html`
      <section>
        <div>
          <h3>${group.title}</h3>
          <p>${group.description}</p>
        </div>
        <div class="fields">
          ${group.fields.map(
            (field) => html`
              <ha-entity-picker
                .hass=${this.hass}
                .value=${this.config?.entities[field.key] ?? ""}
                .label=${`${field.label}${field.required ? " *" : ""}`}
                .includeDomains=${["sensor"]}
                .allowCustomEntity=${true}
                @value-changed=${(event: CustomEvent<{ value?: string }>) =>
                  this.handleEntityChanged(field.key, event)}
              ></ha-entity-picker>
            `,
          )}
        </div>
      </section>
    `;
  }

  private handleEntityChanged(
    key: keyof WeatherKioskEntities,
    event: CustomEvent<{ value?: string }>,
  ): void {
    if (!this.config) return;
    this.emitConfig(withEntityValue(this.config, key, event.detail.value));
  }

  private handleTitleInput = (event: InputEvent): void => {
    if (!this.config) return;
    const title = (event.currentTarget as HTMLInputElement).value;
    this.emitConfig({ ...this.config, title });
  };

  private handleLayoutChange = (event: Event): void => {
    if (!this.config) return;
    const layout = (event.currentTarget as HTMLSelectElement).value as LayoutMode;
    this.emitConfig({ ...this.config, layout });
  };

  private handleThresholdChange = (event: Event): void => {
    if (!this.config) return;
    const raw = (event.currentTarget as HTMLInputElement).value;
    const updated = { ...this.config };
    if (raw === "") delete updated.pressure_trend_threshold;
    else {
      const value = Number(raw);
      if (!Number.isFinite(value) || value < 0) return;
      updated.pressure_trend_threshold = value;
    }
    this.emitConfig(updated);
  };

  private handleForecastEntityChanged = (
    event: CustomEvent<{ value?: string }>,
  ): void => {
    if (!this.config) return;
    const value = event.detail.value?.trim();
    const updated = { ...this.config };
    if (value) updated.forecast_entity = value;
    else delete updated.forecast_entity;
    this.emitConfig(updated);
  };

  private handleForecastTypeChange = (event: Event): void => {
    if (!this.config) return;
    const forecast_type = (event.currentTarget as HTMLSelectElement).value as ForecastType;
    this.emitConfig({ ...this.config, forecast_type });
  };

  private emitConfig(config: EditableWeatherKioskConfig): void {
    this.config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: true,
        composed: true,
        detail: { config },
      }),
    );
  }
}
