export const WAREHOUSES = ["London", "San Francisco", "Tokyo"] as const;
export const CATEGORIES = [
  "Actuators",
  "Circuit Boards",
  "Controllers",
  "Power Supplies",
  "Sensors",
] as const;

export type Warehouse = (typeof WAREHOUSES)[number];
export type Category = (typeof CATEGORIES)[number];

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

export type FilterState = {
  warehouse: "All" | Warehouse;
  category: "All" | Category;
  dateFrom: string;
  dateTo: string;
};

export const DEFAULT_FILTERS: FilterState = {
  warehouse: "All",
  category: "All",
  dateFrom: "2025-01-01",
  dateTo: "2025-12-31",
};
