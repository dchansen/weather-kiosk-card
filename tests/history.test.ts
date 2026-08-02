import { describe, expect, it, vi } from "vitest";
import {
  createChartModel,
  createForecastChartModel,
  fetchEntityHistory,
  historyPoints,
} from "../src/history";
import type { HomeAssistant } from "../src/types";

describe("historyPoints", () => {
  it("extracts, sorts, and filters compact numeric history", () => {
    expect(
      historyPoints(
        {
          "sensor.test": [
            { s: "12.5", lu: 20 },
            { s: "unavailable", lu: 25 },
            { s: "10", lu: 10 },
          ],
        },
        "sensor.test",
      ),
    ).toEqual([
      { timestamp: 10_000, value: 10 },
      { timestamp: 20_000, value: 12.5 },
    ]);
  });

  it("preserves real zero values", () => {
    expect(
      historyPoints(
        { "sensor.rain": [{ s: "0", lu: 10 }] },
        "sensor.rain",
      ),
    ).toEqual([{ timestamp: 10_000, value: 0 }]);
  });
});

describe("fetchEntityHistory", () => {
  it("uses Home Assistant's current websocket history endpoint", async () => {
    const callWS = vi.fn().mockResolvedValue({
      "sensor.test": [{ s: "4", lu: 100 }],
    });
    const hass = { callWS } as unknown as HomeAssistant;
    const now = new Date("2026-08-02T18:00:00.000Z");

    await expect(
      fetchEntityHistory(hass, "sensor.test", 6, now),
    ).resolves.toEqual([{ timestamp: 100_000, value: 4 }]);
    expect(callWS).toHaveBeenCalledWith({
      type: "history/history_during_period",
      start_time: "2026-08-02T12:00:00.000Z",
      end_time: "2026-08-02T18:00:00.000Z",
      entity_ids: ["sensor.test"],
      minimal_response: true,
      no_attributes: true,
    });
  });
});

describe("createChartModel", () => {
  it("creates a finite chart for a flat series", () => {
    const model = createChartModel([
      { timestamp: 1_000, value: 0 },
      { timestamp: 2_000, value: 0 },
    ]);

    expect(model?.points).not.toContain("NaN");
    expect(model?.minimum).toBe(0);
    expect(model?.maximum).toBe(0);
  });

  it("returns no model for empty history", () => {
    expect(createChartModel([])).toBeUndefined();
  });
});

describe("createForecastChartModel", () => {
  it("centers now between equal history and forecast intervals", () => {
    const now = Date.parse("2026-08-02T12:00:00Z");
    const hour = 60 * 60 * 1000;
    const model = createForecastChartModel(
      [{ timestamp: now - 6 * hour, value: 10 }, { timestamp: now, value: 12 }],
      [{ timestamp: now + 6 * hour, value: 14 }],
      now,
      6,
    );
    expect(model?.nowX).toBe(400);
    expect(model?.start).toBe(now - 6 * hour);
    expect(model?.end).toBe(now + 6 * hour);
    expect(model?.forecastPoints).toContain("782.0");
  });
});
