import type { InventoryItem } from "./types";

export type LowStockRow = InventoryItem & { shortfall: number };

export function lowStockRows(items: InventoryItem[]): LowStockRow[] {
  const rows: LowStockRow[] = [];

  for (const item of items) {
    if (item.quantity_on_hand <= item.reorder_point) {
      rows.push({
        ...item,
        shortfall: item.reorder_point - item.quantity_on_hand,
      });
    }
  }

  rows.sort((a, b) => {
    if (a.shortfall !== b.shortfall) {
      return b.shortfall - a.shortfall;
    }
    return a.sku.localeCompare(b.sku);
  });

  return rows;
}
