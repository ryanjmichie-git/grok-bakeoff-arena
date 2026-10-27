import type {
  CategoryFilter,
  Filters,
  InventoryItem,
  LowStockRow,
  MonthCount,
  Order,
  WarehouseFilter,
} from "./types";
import { CATEGORY_OPTIONS, WAREHOUSE_OPTIONS } from "./types";

export const DEFAULT_FILTERS: Filters = {
  warehouse: "All",
  category: "All",
  dateFrom: "2025-01-01",
  dateTo: "2025-12-31",
};

const MONTHS: readonly Omit<MonthCount, "count">[] = [
  { key: "2025-01", label: "January 2025", short: "Jan" },
  { key: "2025-02", label: "February 2025", short: "Feb" },
  { key: "2025-03", label: "March 2025", short: "Mar" },
  { key: "2025-04", label: "April 2025", short: "Apr" },
  { key: "2025-05", label: "May 2025", short: "May" },
  { key: "2025-06", label: "June 2025", short: "Jun" },
  { key: "2025-07", label: "July 2025", short: "Jul" },
  { key: "2025-08", label: "August 2025", short: "Aug" },
  { key: "2025-09", label: "September 2025", short: "Sep" },
  { key: "2025-10", label: "October 2025", short: "Oct" },
  { key: "2025-11", label: "November 2025", short: "Nov" },
  { key: "2025-12", label: "December 2025", short: "Dec" },
];

export function isWarehouseFilter(value: string): value is WarehouseFilter {
  return (WAREHOUSE_OPTIONS as readonly string[]).includes(value);
}

export function isCategoryFilter(value: string): value is CategoryFilter {
  return (CATEGORY_OPTIONS as readonly string[]).includes(value);
}

export function filterInventory(
  items: readonly InventoryItem[],
  filters: Filters,
): InventoryItem[] {
  return items.filter((item) => {
    if (filters.warehouse !== "All" && item.warehouse !== filters.warehouse) {
      return false;
    }
    if (filters.category !== "All" && item.category !== filters.category) {
      return false;
    }
    return true;
  });
}

/**
 * Dates compare as the first 10 characters of `order_date` (`YYYY-MM-DD`).
 * Text order keeps both ends inclusive and avoids time-zone shifts.
 * An empty bound is open.
 */
export function filterOrders(
  orders: readonly Order[],
  filters: Filters,
): Order[] {
  return orders.filter((order) => {
    if (filters.warehouse !== "All" && order.warehouse !== filters.warehouse) {
      return false;
    }
    if (filters.category !== "All" && order.category !== filters.category) {
      return false;
    }
    const day = order.order_date.slice(0, 10);
    if (filters.dateFrom !== "" && day < filters.dateFrom) {
      return false;
    }
    if (filters.dateTo !== "" && day > filters.dateTo) {
      return false;
    }
    return true;
  });
}

export function sumInventoryValue(items: readonly InventoryItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.quantity_on_hand * item.unit_cost,
    0,
  );
}

export function sumOrderRevenue(orders: readonly Order[]): number {
  return orders.reduce((sum, order) => sum + order.total_value, 0);
}

export function ordersByMonth(orders: readonly Order[]): MonthCount[] {
  const counts = new Map<string, number>();
  for (const order of orders) {
    const month = order.order_date.slice(0, 7);
    counts.set(month, (counts.get(month) ?? 0) + 1);
  }
  return MONTHS.map((month) => ({
    ...month,
    count: counts.get(month.key) ?? 0,
  }));
}

export function lowStockRows(items: readonly InventoryItem[]): LowStockRow[] {
  return items
    .filter((item) => item.quantity_on_hand <= item.reorder_point)
    .map((item) => ({
      sku: item.sku,
      name: item.name,
      warehouse: item.warehouse,
      quantityOnHand: item.quantity_on_hand,
      reorderPoint: item.reorder_point,
      shortfall: item.reorder_point - item.quantity_on_hand,
    }))
    .sort((a, b) => b.shortfall - a.shortfall || compareSku(a.sku, b.sku));
}

function compareSku(a: string, b: string): number {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

/** `$1,234.56`, rounded to the cent. */
export function formatMoney(amount: number): string {
  const cents = Math.round(amount * 100);
  const negative = cents < 0;
  const absolute = Math.abs(cents);
  const whole = Math.floor(absolute / 100);
  const fraction = absolute % 100;
  return `${negative ? "-" : ""}$${whole.toLocaleString("en-US")}.${String(fraction).padStart(2, "0")}`;
}
