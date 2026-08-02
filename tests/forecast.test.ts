import { describe, expect, it, vi } from "vitest";
import {
  fetchWeatherForecast,
  forecastPoints,
  forecastRange,
} from "../src/forecast";
import type { HomeAssistant, WeatherForecast } from "../src/types";

const forecast: WeatherForecast[] = [
  { datetime: "2026-08-02T13:00:00Z", temperature: 68, templow: 50, wind_speed: 36 },
  { datetime: "2026-08-02T14:00:00Z", temperature: 77, wind_speed: 18 },
];

describe("fetchWeatherForecast", () => {
  it("uses the weather.get_forecasts response-producing websocket action", async () => {
    const callWS = vi.fn().mockResolvedValue({
      response: { "weather.home": { forecast } },
    });
    const hass = { callWS } as unknown as HomeAssistant;
    await expect(fetchWeatherForecast(hass, "weather.home", "hourly")).resolves.toEqual(forecast);
    expect(callWS).toHaveBeenCalledWith({
      type: "call_service",
      domain: "weather",
      service: "get_forecasts",
      service_data: { type: "hourly" },
      target: { entity_id: "weather.home" },
      return_response: true,
    });
  });
});

describe("forecastPoints", () => {
  it("filters by time and converts Fahrenheit to Celsius", () => {
    const points = forecastPoints(
      forecast,
      "temperature",
      "°F",
      "°C",
      Date.parse("2026-08-02T12:00:00Z"),
      Date.parse("2026-08-02T13:30:00Z"),
    );
    expect(points).toEqual([{ timestamp: Date.parse("2026-08-02T13:00:00Z"), value: 20 }]);
  });

  it("converts forecast wind speed to the sensor unit", () => {
    const range = forecastRange(
      forecast,
      "wind_speed",
      "km/h",
      "m/s",
      Date.parse("2026-08-02T12:00:00Z"),
      Date.parse("2026-08-02T15:00:00Z"),
    );
    expect(range?.minimum).toBeCloseTo(5);
    expect(range?.maximum).toBeCloseTo(10);
  });

  it("includes daily low temperatures in the min/max summary", () => {
    const range = forecastRange(
      forecast,
      "temperature",
      "°F",
      "°C",
      Date.parse("2026-08-02T12:00:00Z"),
      Date.parse("2026-08-02T15:00:00Z"),
    );
    expect(range?.minimum).toBeCloseTo(10);
    expect(range?.maximum).toBeCloseTo(25);
  });
});
