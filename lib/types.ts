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

export type OrderItem = {
  sku: string;
  name: string;
  quantity: number;
  unit_price: number;
};

export type Order = {
  id: string;
  order_number: string;
  customer: string;
  items: OrderItem[];
  status: string;
  warehouse: string;
  category: string;
  order_date: string;
  expected_delivery: string;
  total_value: number;
  actual_delivery?: string;
};
