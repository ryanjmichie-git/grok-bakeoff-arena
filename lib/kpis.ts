import type { InventoryItem, Order } from "./types";

export function inventoryValue(items: InventoryItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.quantity_on_hand * item.unit_cost,
    0,
  );
}

export function lowStockCount(items: InventoryItem[]): number {
  return items.filter((item) => item.quantity_on_hand <= item.reorder_point)
    .length;
}

export function orderCount(orders: Order[]): number {
  return orders.length;
}

export function orderRevenue(orders: Order[]): number {
  return orders.reduce((sum, order) => sum + order.total_value, 0);
}
