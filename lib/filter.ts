import type { FilterState, InventoryItem, Order } from "./types";

function matchesWarehouseAndCategory(
  record: { warehouse: string; category: string },
  filters: FilterState,
): boolean {
  if (filters.warehouse !== "All" && record.warehouse !== filters.warehouse) {
    return false;
  }
  if (filters.category !== "All" && record.category !== filters.category) {
    return false;
  }
  return true;
}

export function filterInventory(
  items: InventoryItem[],
  filters: FilterState,
): InventoryItem[] {
  return items.filter((item) => matchesWarehouseAndCategory(item, filters));
}

export function filterOrders(orders: Order[], filters: FilterState): Order[] {
  return orders.filter((order) => {
    if (!matchesWarehouseAndCategory(order, filters)) {
      return false;
    }
    const day = order.order_date.slice(0, 10);
    return day >= filters.dateFrom && day <= filters.dateTo;
  });
}
