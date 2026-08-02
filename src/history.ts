import type {
  HistoryPoint,
  HistoryResponse,
  HomeAssistant,
} from "./types";

export const HISTORY_RANGES = [
  { hours: 6, label: "6 h" },
  { hours: 24, label: "24 h" },
  { hours: 168, label: "7 d" },
] as const;

export async function fetchEntityHistory(
  hass: HomeAssistant,
  entityId: string,
  hours: number,
  now = new Date(),
): Promise<HistoryPoint[]> {
  const start = new Date(now.getTime() - hours * 60 * 60 * 1000);
  const response = await hass.callWS<HistoryResponse>({
    type: "history/history_during_period",
    start_time: start.toISOString(),
    end_time: now.toISOString(),
    entity_ids: [entityId],
    minimal_response: true,
    no_attributes: true,
  });

  return historyPoints(response, entityId);
}

export function historyPoints(
  response: HistoryResponse,
  entityId: string,
): HistoryPoint[] {
  const points = (response[entityId] ?? [])
    .map((state) => ({
      timestamp: (state.lc ?? state.lu) * 1000,
      value: Number(state.s),
    }))
    .filter(
      (point) =>
        Number.isFinite(point.timestamp) && Number.isFinite(point.value),
    )
    .sort((left, right) => left.timestamp - right.timestamp);

  return points.filter(
    (point, index) =>
      index === 0 ||
      point.timestamp !== points[index - 1]?.timestamp ||
      point.value !== points[index - 1]?.value,
  );
}

export interface ChartModel {
  points: string;
  area: string;
  minimum: number;
  maximum: number;
  start: number;
  end: number;
  latestX: number;
  latestY: number;
}

export function createChartModel(
  source: HistoryPoint[],
  width = 800,
  height = 300,
  padding = 18,
): ChartModel | undefined {
  if (source.length === 0) return undefined;

  const points = downsample(source, 600);
  const values = points.map((point) => point.value);
  const rawMinimum = Math.min(...values);
  const rawMaximum = Math.max(...values);
  const valuePadding = Math.max((rawMaximum - rawMinimum) * 0.08, 0.1);
  const minimum = rawMinimum - valuePadding;
  const maximum = rawMaximum + valuePadding;
  const start = points[0]!.timestamp;
  const end = Math.max(points[points.length - 1]!.timestamp, start + 1);
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  const coordinates = points.map((point) => {
    const x = padding + ((point.timestamp - start) / (end - start)) * innerWidth;
    const y =
      padding + ((maximum - point.value) / (maximum - minimum)) * innerHeight;
    return { x, y };
  });

  const line = coordinates
    .map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const first = coordinates[0]!;
  const latest = coordinates[coordinates.length - 1]!;

  return {
    points: line,
    area: `${first.x.toFixed(1)},${height - padding} ${line} ${latest.x.toFixed(1)},${height - padding}`,
    minimum: rawMinimum,
    maximum: rawMaximum,
    start,
    end,
    latestX: latest.x,
    latestY: latest.y,
  };
}

function downsample(points: HistoryPoint[], maximum: number): HistoryPoint[] {
  if (points.length <= maximum) return points;
  const step = (points.length - 1) / (maximum - 1);
  return Array.from({ length: maximum }, (_, index) =>
    points[Math.round(index * step)]!,
  );
}
