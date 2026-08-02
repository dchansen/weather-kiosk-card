export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    device_class?: string;
    [key: string]: unknown;
  };
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale?: {
    language?: string;
  };
  callWS<T>(message: Record<string, unknown>): Promise<T>;
}

export type LayoutMode = "auto" | "landscape" | "portrait";

export interface WeatherKioskEntities {
  outdoor_temperature: string;
  indoor_temperature: string;
  outdoor_humidity?: string;
  indoor_humidity?: string;
  pressure?: string;
  rain_rate?: string;
  rain_24h?: string;
  wind_speed?: string;
  wind_direction?: string;
}

export interface WeatherKioskConfig {
  type: string;
  title?: string;
  entities: WeatherKioskEntities;
  layout?: LayoutMode;
  pressure_trend_threshold?: number;
}

export interface NormalizedWeatherKioskConfig extends WeatherKioskConfig {
  title: string;
  layout: LayoutMode;
}

export interface HistoryState {
  /** Compact state value returned by Home Assistant's history websocket API. */
  s: string;
  /** Last changed, as Unix seconds. May be omitted when equal to last updated. */
  lc?: number;
  /** Last updated, as Unix seconds. */
  lu: number;
  a?: Record<string, unknown>;
}

export type HistoryResponse = Record<string, HistoryState[]>;

export interface HistoryPoint {
  timestamp: number;
  value: number;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}
