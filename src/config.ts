import type {
  LayoutMode,
  NormalizedWeatherKioskConfig,
  WeatherKioskConfig,
} from "./types";

const REQUIRED_ENTITIES = [
  "outdoor_temperature",
  "indoor_temperature",
] as const;

const ENTITY_ID_PATTERN = /^[a-z0-9_]+\.[a-z0-9_]+$/;
const LAYOUTS: ReadonlySet<LayoutMode> = new Set([
  "auto",
  "landscape",
  "portrait",
]);

export function normalizeConfig(
  value: WeatherKioskConfig,
): NormalizedWeatherKioskConfig {
  if (!value || typeof value !== "object") {
    throw new Error("Weather Kiosk configuration is required.");
  }

  if (!value.entities || typeof value.entities !== "object") {
    throw new Error("Weather Kiosk requires an entities mapping.");
  }

  for (const key of REQUIRED_ENTITIES) {
    if (!isEntityId(value.entities[key])) {
      throw new Error(`Weather Kiosk requires a valid entities.${key}.`);
    }
  }

  for (const [key, entityId] of Object.entries(value.entities)) {
    if (entityId !== undefined && !isEntityId(entityId)) {
      throw new Error(`Invalid entity ID for entities.${key}: ${entityId}`);
    }
  }

  const layout = value.layout ?? "auto";
  if (!LAYOUTS.has(layout)) {
    throw new Error(`Invalid layout: ${String(layout)}`);
  }

  return {
    ...value,
    type: value.type || "custom:weather-kiosk-card",
    title: value.title?.trim() || "Weather",
    layout,
  };
}

function isEntityId(value: unknown): value is string {
  return typeof value === "string" && ENTITY_ID_PATTERN.test(value);
}
