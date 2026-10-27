import inventoryData from "../data/inventory.json";
import ordersData from "../data/orders.json";
import type { InventoryItem, Order } from "./types";

export const inventory: InventoryItem[] = inventoryData as InventoryItem[];
export const orders: Order[] = ordersData as Order[];

export const WAREHOUSES = ["All", "London", "San Francisco", "Tokyo"] as const;
export const CATEGORIES = [
  "All",
  "Actuators",
  "Circuit Boards",
  "Controllers",
  "Power Supplies",
  "Sensors",
] as const;

export const DEFAULT_DATE_FROM = "2025-01-01";
export const DEFAULT_DATE_TO = "2025-12-31";

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getOrderDateKey(orderDate: string): string {
  return orderDate.slice(0, 10);
}

export function filterInventory(
  items: InventoryItem[],
  warehouse: string,
  category: string,
): InventoryItem[] {
  return items.filter((item) => {
    if (warehouse !== "All" && item.warehouse !== warehouse) return false;
    if (category !== "All" && item.category !== category) return false;
    return true;
  });
}

export function filterOrders(
  ordersList: Order[],
  warehouse: string,
  category: string,
  dateFrom: string,
  dateTo: string,
): Order[] {
  return ordersList.filter((order) => {
    if (warehouse !== "All" && order.warehouse !== warehouse) return false;
    if (category !== "All" && order.category !== category) return false;
    const dateKey = getOrderDateKey(order.order_date);
    if (dateKey < dateFrom || dateKey > dateTo) return false;
    return true;
  });
}

export function computeInventoryValue(items: InventoryItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.quantity_on_hand * item.unit_cost,
    0,
  );
}

export function countLowStock(items: InventoryItem[]): number {
  return items.filter((item) => item.quantity_on_hand <= item.reorder_point)
    .length;
}

export function getLowStockItems(items: InventoryItem[]): InventoryItem[] {
  return items
    .filter((item) => item.quantity_on_hand <= item.reorder_point)
    .sort((a, b) => {
      const shortfallA = a.reorder_point - a.quantity_on_hand;
      const shortfallB = b.reorder_point - b.quantity_on_hand;
      const shortfallDiff = shortfallB - shortfallA;
      if (shortfallDiff !== 0) return shortfallDiff;
      return a.sku.localeCompare(b.sku);
    });
}

export type MonthCount = {
  month: string;
  count: number;
};

export function getOrdersByMonth(ordersList: Order[]): MonthCount[] {
  const months = [
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
  ];
  const counts = new Map<string, number>();
  for (const month of months) {
    counts.set(month, 0);
  }
  for (const order of ordersList) {
    const month = getOrderDateKey(order.order_date).slice(0, 7);
    if (counts.has(month)) {
      counts.set(month, (counts.get(month) ?? 0) + 1);
    }
  }
  return months.map((month) => ({
    month,
    count: counts.get(month) ?? 0,
  }));
}
