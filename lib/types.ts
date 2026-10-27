export type InventoryItem = {
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  quantity_on_hand: number;
  reorder_point: number;
  unit_cost: number;
};

export type Order = {
  warehouse: string;
  category: string;
  order_date: string;
  total_value: number;
};

export const WAREHOUSE_OPTIONS = [
  "All",
  "London",
  "San Francisco",
  "Tokyo",
] as const;

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

export type MonthCount = {
  key: string;
  label: string;
  short: string;
  count: number;
};

export type LowStockRow = {
  sku: string;
  name: string;
  warehouse: string;
  quantityOnHand: number;
  reorderPoint: number;
  shortfall: number;
};
