import inventoryJson from "../data/inventory.json";
import ordersJson from "../data/orders.json";

export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  quantity_on_hand: number;
  reorder_point: number;
  unit_cost: number;
  location: string;
  last_updated: string;
};

export type OrderLine = {
  sku: string;
  name: string;
  quantity: number;
  unit_price: number;
};

export type Order = {
  id: string;
  order_number: string;
  customer: string;
  items: OrderLine[];
  status: string;
  warehouse: string;
  category: string;
  order_date: string;
  expected_delivery: string;
  total_value: number;
  actual_delivery?: string;
};

export const WAREHOUSE_OPTIONS = ["All", "London", "San Francisco", "Tokyo"] as const;
export const CATEGORY_OPTIONS = [
  "All",
  "Actuators",
  "Circuit Boards",
  "Controllers",
  "Power Supplies",
  "Sensors",
] as const;

export type WarehouseFilter = (typeof WAREHOUSE_OPTIONS)[number];
export type CategoryFilter = (typeof CATEGORY_OPTIONS)[number];

export type Filters = {
  warehouse: WarehouseFilter;
  category: CategoryFilter;
  dateFrom: string;
  dateTo: string;
};

export const DEFAULT_FILTERS: Filters = {
  warehouse: "All",
  category: "All",
  dateFrom: "2025-01-01",
  dateTo: "2025-12-31",
};

export type MonthCount = { month: string; count: number };

export type LowStockRow = {
  sku: string;
  name: string;
  warehouse: string;
  quantity_on_hand: number;
  reorder_point: number;
  shortfall: number;
};

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

const moneyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function toInventoryItem(record: (typeof inventoryJson)[number]): InventoryItem {
  return {
    id: record.id,
    sku: record.sku,
    name: record.name,
    category: record.category,
    warehouse: record.warehouse,
    quantity_on_hand: record.quantity_on_hand,
    reorder_point: record.reorder_point,
    unit_cost: record.unit_cost,
    location: record.location,
    last_updated: record.last_updated,
  };
}

function toOrderLine(record: (typeof ordersJson)[number]["items"][number]): OrderLine {
  return {
    sku: record.sku,
    name: record.name,
    quantity: record.quantity,
    unit_price: record.unit_price,
  };
}

function toOrder(record: (typeof ordersJson)[number]): Order {
  const order: Order = {
    id: record.id,
    order_number: record.order_number,
    customer: record.customer,
    items: record.items.map(toOrderLine),
    status: record.status,
    warehouse: record.warehouse,
    category: record.category,
    order_date: record.order_date,
    expected_delivery: record.expected_delivery,
    total_value: record.total_value,
  };

  if ("actual_delivery" in record && typeof record.actual_delivery === "string") {
    order.actual_delivery = record.actual_delivery;
  }

  return order;
}

export const inventoryItems: InventoryItem[] = inventoryJson.map(toInventoryItem);
export const orders: Order[] = ordersJson.map(toOrder);

function matchesWarehouse(warehouse: string, filter: WarehouseFilter): boolean {
  return filter === "All" || warehouse === filter;
}

function matchesCategory(category: string, filter: CategoryFilter): boolean {
  return filter === "All" || category === filter;
}

export function filterInventory(
  items: readonly InventoryItem[],
  filters: Filters,
): InventoryItem[] {
  return items.filter(
    (item) =>
      matchesWarehouse(item.warehouse, filters.warehouse) &&
      matchesCategory(item.category, filters.category),
  );
}

export function filterOrders(orders: readonly Order[], filters: Filters): Order[] {
  if (filters.dateFrom === "" || filters.dateTo === "" || filters.dateFrom > filters.dateTo) {
    return [];
  }

  return orders.filter((order) => {
    const day = order.order_date.slice(0, 10);
    return (
      matchesWarehouse(order.warehouse, filters.warehouse) &&
      matchesCategory(order.category, filters.category) &&
      day >= filters.dateFrom &&
      day <= filters.dateTo
    );
  });
}

export function inventoryValue(items: readonly InventoryItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity_on_hand * item.unit_cost, 0);
}

export function orderRevenue(orders: readonly Order[]): number {
  return orders.reduce((sum, order) => sum + order.total_value, 0);
}

export function lowStockRows(items: readonly InventoryItem[]): LowStockRow[] {
  return items
    .filter((item) => item.quantity_on_hand <= item.reorder_point)
    .map((item) => ({
      sku: item.sku,
      name: item.name,
      warehouse: item.warehouse,
      quantity_on_hand: item.quantity_on_hand,
      reorder_point: item.reorder_point,
      shortfall: item.reorder_point - item.quantity_on_hand,
    }))
    .sort((left, right) => {
      if (left.shortfall !== right.shortfall) {
        return right.shortfall - left.shortfall;
      }
      return left.sku.localeCompare(right.sku);
    });
}

export function ordersByMonth(orders: readonly Order[]): MonthCount[] {
  const counts: MonthCount[] = MONTHS.map((month) => ({ month, count: 0 }));

  for (const order of orders) {
    const month = order.order_date.slice(0, 7);
    const row = counts.find((entry) => entry.month === month);
    if (row) {
      row.count += 1;
    }
  }

  return counts;
}

export function formatMoney(value: number): string {
  return moneyFormat.format(value);
}
