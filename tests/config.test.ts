import { describe, expect, it } from "vitest";
import { normalizeConfig } from "../src/config";

describe("normalizeConfig", () => {
  it("applies stable defaults", () => {
    expect(
      normalizeConfig({
        type: "custom:weather-kiosk-card",
        entities: {
          outdoor_temperature: "sensor.outdoor_temperature",
          indoor_temperature: "sensor.indoor_temperature",
        },
      }),
    ).toMatchObject({ title: "", layout: "auto", forecast_type: "hourly" });
  });

  it("requires both primary temperature entities", () => {
    expect(() =>
      normalizeConfig({
        type: "custom:weather-kiosk-card",
        entities: {
          outdoor_temperature: "sensor.outdoor_temperature",
          indoor_temperature: "",
        },
      }),
    ).toThrow("entities.indoor_temperature");
  });

  it("rejects malformed optional entity IDs", () => {
    expect(() =>
      normalizeConfig({
        type: "custom:weather-kiosk-card",
        entities: {
          outdoor_temperature: "sensor.outdoor_temperature",
          indoor_temperature: "sensor.indoor_temperature",
          rain_rate: "not an entity",
        },
      }),
    ).toThrow("entities.rain_rate");
  });

  it("accepts a custom non-negative pressure trend threshold", () => {
    expect(
      normalizeConfig({
        type: "custom:weather-kiosk-card",
        pressure_trend_threshold: 0.25,
        entities: {
          outdoor_temperature: "sensor.outdoor_temperature",
          indoor_temperature: "sensor.indoor_temperature",
        },
      }).pressure_trend_threshold,
    ).toBe(0.25);
  });

  it("rejects a negative pressure trend threshold", () => {
    expect(() =>
      normalizeConfig({
        type: "custom:weather-kiosk-card",
        pressure_trend_threshold: -1,
        entities: {
          outdoor_temperature: "sensor.outdoor_temperature",
          indoor_temperature: "sensor.indoor_temperature",
        },
      }),
    ).toThrow("pressure_trend_threshold");
  });

  it("accepts a weather forecast source and daily resolution", () => {
    const config = normalizeConfig({
      type: "custom:weather-kiosk-card",
      forecast_entity: "weather.home",
      forecast_type: "daily",
      entities: {
        outdoor_temperature: "sensor.outdoor_temperature",
        indoor_temperature: "sensor.indoor_temperature",
      },
    });
    expect(config.forecast_entity).toBe("weather.home");
    expect(config.forecast_type).toBe("daily");
  });

  it("rejects an invalid forecast source", () => {
    expect(() => normalizeConfig({
      type: "custom:weather-kiosk-card",
      forecast_entity: "not an entity",
      entities: {
        outdoor_temperature: "sensor.outdoor_temperature",
        indoor_temperature: "sensor.indoor_temperature",
      },
    })).toThrow("forecast_entity");
  });
});
