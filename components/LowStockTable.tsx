import type { LowStockRow } from "../lib/types";

type LowStockTableProps = {
  rows: readonly LowStockRow[];
};

export default function LowStockTable({ rows }: LowStockTableProps) {
  return (
    <section aria-labelledby="low-stock-heading" className="min-w-0">
      <h2 id="low-stock-heading" className="text-lg font-semibold">
        Low stock
      </h2>
      <p className="mt-1 max-w-3xl text-sm">
        On-hand quantity is at or below the reorder point. Largest shortfall
        is first.
      </p>
      {rows.length === 0 ? (
        <p className="mt-4 border border-tin bg-plate px-4 py-6">
          No items in this view are at or below their reorder point.
        </p>
      ) : (
        <div className="mt-4 min-w-0">
          <table className="w-full table-fixed border-collapse text-[11px] leading-tight sm:text-sm sm:leading-normal">
            <caption className="sr-only">
              Items at or below their reorder point
            </caption>
            <colgroup>
              <col className="w-[15%]" />
              <col className="w-[20%]" />
              <col className="w-[22%]" />
              <col className="w-[13%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="border-b border-ink px-1 py-2 text-left align-bottom font-semibold leading-tight break-words sm:px-3">
                  SKU
                </th>
                <th scope="col" className="border-b border-ink px-1 py-2 text-left align-bottom font-semibold leading-tight break-words sm:px-3">
                  Name
                </th>
                <th scope="col" className="border-b border-ink px-1 py-2 text-left align-bottom font-semibold leading-tight break-words sm:px-3">
                  Warehouse
                </th>
                <th scope="col" className="border-b border-ink px-1 py-2 text-right align-bottom font-semibold leading-tight break-words sm:px-3">
                  On hand
                </th>
                <th scope="col" className="border-b border-ink px-1 py-2 text-right align-bottom font-semibold leading-tight break-words sm:px-3">
                  Reorder point
                </th>
                <th scope="col" aria-sort="descending" className="border-b border-ink px-1 py-2 text-right align-bottom font-semibold leading-tight break-words sm:px-3">
                  Shortfall
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.sku} data-testid="low-stock-row">
                  <td data-testid="low-stock-sku" className="border-b border-tin px-1 py-2 text-left align-top font-medium break-words sm:px-3">{row.sku}</td>
                  <td className="border-b border-tin px-1 py-2 text-left align-top break-words sm:px-3">
                    {row.name}
                  </td>
                  <td className="border-b border-tin px-1 py-2 text-left align-top break-words sm:px-3">
                    {row.warehouse}
                  </td>
                  <td className="border-b border-tin px-1 py-2 text-right align-top tabular-nums sm:px-3">
                    {row.quantityOnHand}
                  </td>
                  <td className="border-b border-tin px-1 py-2 text-right align-top tabular-nums sm:px-3">
                    {row.reorderPoint}
                  </td>
                  <td className="border-b border-tin px-1 py-2 text-right align-top font-semibold text-oxide tabular-nums sm:px-3">
                    {row.shortfall}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
