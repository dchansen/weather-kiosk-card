import { describe, expect, it } from "vitest";
import { directionLabel, formatState } from "../src/format";
import type { HassEntity } from "../src/types";

function entity(state: string, unit = "°C"): HassEntity {
  return {
    entity_id: "sensor.test",
    state,
    attributes: { unit_of_measurement: unit },
    last_changed: "",
    last_updated: "",
  };
}

describe("formatState", () => {
  it("keeps a real zero visible", () => {
    expect(formatState(entity("0", "mm/h"), "en")).toEqual({
      value: "0",
      unit: "mm/h",
      available: true,
    });
  });

  it("marks unavailable values", () => {
    expect(formatState(entity("unavailable"), "en").available).toBe(false);
  });
});

describe("directionLabel", () => {
  it.each([
    [0, "N"],
    [45, "NE"],
    [225, "SW"],
    [359, "N"],
  ])("maps %s degrees to %s", (degrees, label) => {
    expect(directionLabel(degrees)).toBe(label);
  });
});
