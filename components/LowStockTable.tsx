import { lowStockRows } from "../lib/lowStock";
import type { InventoryItem } from "../lib/types";

type LowStockTableProps = { items: InventoryItem[] };

const textHeaderClass =
  "px-3 py-2 text-left font-medium text-slate-800";
const numberHeaderClass =
  "px-3 py-2 text-right font-medium text-slate-800 tabular-nums";
const textCellClass = "px-3 py-2 text-left text-slate-900";
const numberCellClass =
  "px-3 py-2 text-right text-slate-900 tabular-nums whitespace-nowrap";

export default function LowStockTable({ items }: LowStockTableProps) {
  const rows = lowStockRows(items);

  return (
    <section
      aria-labelledby="low-stock-heading"
      className="min-w-0 max-w-full rounded border border-slate-200 bg-white p-4 text-slate-900"
    >
      <h2
        id="low-stock-heading"
        className="text-xl font-semibold tracking-tight text-slate-900"
      >
        Low stock
      </h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-slate-800">
          No items match these filters.
        </p>
      ) : (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-900">
            <thead>
              <tr className="border-b border-slate-200">
                <th scope="col" className={textHeaderClass}>
                  SKU
                </th>
                <th scope="col" className={textHeaderClass}>
                  Name
                </th>
                <th scope="col" className={textHeaderClass}>
                  Warehouse
                </th>
                <th scope="col" className={numberHeaderClass}>
                  On hand
                </th>
                <th scope="col" className={numberHeaderClass}>
                  Reorder point
                </th>
                <th scope="col" className={numberHeaderClass}>
                  Shortfall
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  data-testid="low-stock-row"
                  className="border-b border-slate-200 last:border-b-0"
                >
                  <td data-testid="low-stock-sku" className={textCellClass}>
                    {row.sku}
                  </td>
                  <td className={textCellClass}>{row.name}</td>
                  <td className={textCellClass}>{row.warehouse}</td>
                  <td className={numberCellClass}>{row.quantity_on_hand}</td>
                  <td className={numberCellClass}>{row.reorder_point}</td>
                  <td className={numberCellClass}>{row.shortfall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
