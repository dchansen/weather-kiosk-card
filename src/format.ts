import type { HassEntity } from "./types";

const INVALID_STATES = new Set(["unknown", "unavailable", "none", ""]);

export function numericState(entity: HassEntity | undefined): number | undefined {
  if (!entity || INVALID_STATES.has(entity.state.toLowerCase())) return undefined;
  const value = Number(entity.state);
  return Number.isFinite(value) ? value : undefined;
}

export function formatState(
  entity: HassEntity | undefined,
  language: string,
  maximumFractionDigits = 1,
): { value: string; unit: string; available: boolean } {
  const numeric = numericState(entity);
  if (numeric === undefined) {
    return {
      value: "—",
      unit: entity?.attributes.unit_of_measurement ?? "",
      available: false,
    };
  }

  return {
    value: new Intl.NumberFormat(language || "en", {
      maximumFractionDigits,
      minimumFractionDigits: 0,
    }).format(numeric),
    unit: entity?.attributes.unit_of_measurement ?? "",
    available: true,
  };
}

export function directionLabel(degrees: number | undefined): string {
  if (degrees === undefined) return "—";
  const labels = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const normalized = ((degrees % 360) + 360) % 360;
  return labels[Math.round(normalized / 45) % 8] ?? "—";
}
