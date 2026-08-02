import type {
  ForecastMetric,
  HistoryPoint,
  HomeAssistant,
  WeatherForecast,
  WeatherForecastResponse,
} from "./types";

export interface ForecastUnits {
  temperature?: string;
  pressure?: string;
  wind_speed?: string;
}

export async function fetchWeatherForecast(
  hass: HomeAssistant,
  entityId: string,
  forecastType: "hourly" | "daily",
): Promise<WeatherForecast[]> {
  const result = await hass.callWS<WeatherForecastResponse>({
    type: "call_service",
    domain: "weather",
    service: "get_forecasts",
    service_data: { type: forecastType },
    target: { entity_id: entityId },
    return_response: true,
  });

  const response = result.response ?? result;
  const value = response[entityId] as { forecast?: WeatherForecast[] } | undefined;
  return (value?.forecast ?? []).filter(
    (entry) => Number.isFinite(new Date(entry.datetime).getTime()),
  );
}

export function forecastPoints(
  forecast: WeatherForecast[],
  metric: ForecastMetric,
  sourceUnit: string | undefined,
  targetUnit: string | undefined,
  start: number,
  end: number,
): HistoryPoint[] {
  return forecast.flatMap((entry) => {
    const timestamp = new Date(entry.datetime).getTime();
    if (!Number.isFinite(timestamp) || timestamp < start || timestamp > end) return [];
    const raw = forecastValue(entry, metric);
    if (raw === undefined) return [];
    const value = convertUnit(raw, sourceUnit, targetUnit, metric);
    return value === undefined ? [] : [{ timestamp, value }];
  });
}

export function forecastRange(
  forecast: WeatherForecast[],
  metric: ForecastMetric,
  sourceUnit: string | undefined,
  targetUnit: string | undefined,
  start: number,
  end: number,
): { minimum: number; maximum: number } | undefined {
  const values = forecastPoints(
    forecast,
    metric,
    sourceUnit,
    targetUnit,
    start,
    end,
  ).map((point) => point.value);
  if (metric === "temperature") {
    for (const entry of forecast) {
      const timestamp = new Date(entry.datetime).getTime();
      if (
        timestamp < start ||
        timestamp > end ||
        typeof entry.templow !== "number" ||
        !Number.isFinite(entry.templow)
      ) continue;
      const low = convertUnit(entry.templow, sourceUnit, targetUnit, metric);
      if (low !== undefined) values.push(low);
    }
  }
  if (!values.length) return undefined;
  return { minimum: Math.min(...values), maximum: Math.max(...values) };
}

export function forecastUnit(
  metric: ForecastMetric,
  units: ForecastUnits,
): string | undefined {
  if (metric === "temperature") return units.temperature;
  if (metric === "pressure") return units.pressure;
  if (metric === "wind_speed") return units.wind_speed;
  if (metric === "humidity") return "%";
  return "°";
}

function forecastValue(
  entry: WeatherForecast,
  metric: ForecastMetric,
): number | undefined {
  if (metric === "wind_bearing") {
    const value = Number(entry.wind_bearing);
    return Number.isFinite(value) ? value : undefined;
  }
  const value = entry[metric];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function convertUnit(
  value: number,
  source: string | undefined,
  target: string | undefined,
  metric: ForecastMetric,
): number | undefined {
  if (!source || !target || normalizeUnit(source) === normalizeUnit(target)) return value;
  const from = normalizeUnit(source);
  const to = normalizeUnit(target);

  if (metric === "temperature") {
    const celsius = from === "°f" ? (value - 32) * (5 / 9) : from === "°c" ? value : undefined;
    if (celsius === undefined) return undefined;
    return to === "°f" ? celsius * (9 / 5) + 32 : to === "°c" ? celsius : undefined;
  }

  if (metric === "pressure") {
    const hpa =
      from === "hpa" || from === "mbar" ? value :
      from === "kpa" ? value * 10 :
      from === "inhg" ? value * 33.8638866667 :
      from === "psi" ? value * 68.9475729 : undefined;
    if (hpa === undefined) return undefined;
    return to === "hpa" || to === "mbar" ? hpa : to === "kpa" ? hpa / 10 :
      to === "inhg" ? hpa / 33.8638866667 : to === "psi" ? hpa / 68.9475729 : undefined;
  }

  if (metric === "wind_speed") {
    const metersPerSecond =
      from === "m/s" ? value : from === "km/h" ? value / 3.6 :
      from === "mph" ? value * 0.44704 : from === "kn" || from === "kt" ? value * 0.514444 : undefined;
    if (metersPerSecond === undefined) return undefined;
    return to === "m/s" ? metersPerSecond : to === "km/h" ? metersPerSecond * 3.6 :
      to === "mph" ? metersPerSecond / 0.44704 : to === "kn" || to === "kt" ? metersPerSecond / 0.514444 : undefined;
  }

  return metric === "humidity" || metric === "wind_bearing" ? value : undefined;
}

function normalizeUnit(unit: string): string {
  return unit.trim().toLowerCase().replace("kph", "km/h");
}
