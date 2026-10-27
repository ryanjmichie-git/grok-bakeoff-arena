import type { Order } from "./types";

export type MonthCount = { month: string; count: number };

const MONTHS = [
  "2025-01",
  "2025-02",
  "2025-03",
  "2025-04",
  "2025-05",
  "2025-06",
  "2025-07",
  "2025-08",
  "2025-09",
  "2025-10",
  "2025-11",
  "2025-12",
] as const;

export function monthCounts(orders: Order[]): MonthCount[] {
  const counts = new Map<string, number>(MONTHS.map((month) => [month, 0]));

  for (const order of orders) {
    const key = order.order_date.slice(0, 7);
    const current = counts.get(key);
    if (current !== undefined) {
      counts.set(key, current + 1);
    }
  }

  return MONTHS.map((month) => ({
    month,
    count: counts.get(month) ?? 0,
  }));
}
