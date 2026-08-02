import { describe, expect, it } from "vitest";
import { withEntityValue } from "../src/weather-kiosk-editor";

const baseConfig = {
  type: "custom:weather-kiosk-card",
  entities: {
    outdoor_temperature: "sensor.outdoor_temperature",
    indoor_temperature: "sensor.indoor_temperature",
  },
};

describe("withEntityValue", () => {
  it("adds an optional entity without mutating the original configuration", () => {
    const updated = withEntityValue(baseConfig, "pressure", "sensor.pressure");

    expect(updated.entities.pressure).toBe("sensor.pressure");
    expect(baseConfig.entities).not.toHaveProperty("pressure");
  });

  it("trims entity IDs entered through the editor", () => {
    const updated = withEntityValue(
      baseConfig,
      "wind_speed",
      "  sensor.wind_speed  ",
    );

    expect(updated.entities.wind_speed).toBe("sensor.wind_speed");
  });

  it("removes an entity when its picker is cleared", () => {
    const withPressure = withEntityValue(
      baseConfig,
      "pressure",
      "sensor.pressure",
    );
    const updated = withEntityValue(withPressure, "pressure", "");

    expect(updated.entities).not.toHaveProperty("pressure");
  });
});
