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
    ).toMatchObject({ title: "Weather", layout: "auto" });
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
});
