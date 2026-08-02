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
}

export interface NormalizedWeatherKioskConfig extends WeatherKioskConfig {
  title: string;
  layout: LayoutMode;
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
