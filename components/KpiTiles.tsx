import { formatMoney } from "../lib/format";
import {
  inventoryValue,
  lowStockCount,
  orderCount,
  orderRevenue,
} from "../lib/kpis";
import type { InventoryItem, Order } from "../lib/types";

type KpiTilesProps = { items: InventoryItem[]; orders: Order[] };

type Tile = {
  label: string;
  labelId: string;
  testId: string;
  value: string;
};

export default function KpiTiles({ items, orders }: KpiTilesProps) {
  const tiles: Tile[] = [
    {
      label: "Inventory value",
      labelId: "kpi-inventory-value-label",
      testId: "kpi-inventory-value",
      value: formatMoney(inventoryValue(items)),
    },
    {
      label: "Low-stock items",
      labelId: "kpi-low-stock-label",
      testId: "kpi-low-stock",
      value: String(lowStockCount(items)),
    },
    {
      label: "Orders",
      labelId: "kpi-orders-label",
      testId: "kpi-orders",
      value: String(orderCount(orders)),
    },
    {
      label: "Order revenue",
      labelId: "kpi-revenue-label",
      testId: "kpi-revenue",
      value: formatMoney(orderRevenue(orders)),
    },
  ];

  return (
    <section aria-labelledby="summary-heading">
      <h2
        id="summary-heading"
        className="mb-3 text-xl font-semibold tracking-tight text-slate-900"
      >
        Summary
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <div
            key={tile.testId}
            className="min-w-0 rounded border border-slate-200 bg-white p-4"
          >
            <p id={tile.labelId} className="text-sm font-medium text-slate-800">
              {tile.label}
            </p>
            <p
              data-testid={tile.testId}
              aria-labelledby={tile.labelId}
              className="min-w-0 break-words text-2xl font-semibold tracking-tight text-slate-900 tabular-nums"
            >
              {tile.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
