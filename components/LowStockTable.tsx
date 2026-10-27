type LowStockRow = {
  sku: string;
  name: string;
  warehouse: string;
  quantity_on_hand: number;
  reorder_point: number;
  shortfall: number;
};

type LowStockTableProps = { rows: LowStockRow[] };

const textHeader =
  "border border-solid border-[#b7c6d1] px-2 py-1.5 text-left font-bold";
const numberHeader =
  "border border-solid border-[#b7c6d1] px-2 py-1.5 text-right font-bold";
const textCell = "border border-solid border-[#b7c6d1] px-2 py-1.5 text-left";
const numberCell =
  "border border-solid border-[#b7c6d1] px-2 py-1.5 text-right tabular-nums";

export default function LowStockTable({ rows }: LowStockTableProps) {
  return (
    <section className="min-w-0 max-w-full border border-solid border-[#b7c6d1] bg-white p-4 text-[#1a2733]">
      <h2 id="low-stock-heading" className="text-lg font-bold text-[#1a2733]">
        Low stock
      </h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-[#1a2733]">
          No items are at or below their reorder point.
        </p>
      ) : (
        <>
          <p className="mt-3 text-sm text-[#1a2733] md:hidden">
            Scroll sideways to see every column.
          </p>
          <div
            className="mt-3 max-w-full overflow-x-auto overscroll-x-contain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6b62]"
            tabIndex={0}
            aria-label="Low stock table"
          >
          <table
            className="w-full min-w-[36rem] border-collapse text-sm text-[#1a2733]"
            aria-labelledby="low-stock-heading"
          >
            <thead>
              <tr>
                <th scope="col" className={textHeader}>
                  SKU
                </th>
                <th scope="col" className={textHeader}>
                  Name
                </th>
                <th scope="col" className={textHeader}>
                  Warehouse
                </th>
                <th scope="col" className={numberHeader}>
                  On hand
                </th>
                <th scope="col" className={numberHeader}>
                  Reorder point
                </th>
                <th scope="col" className={numberHeader}>
                  Shortfall
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.sku}-${row.warehouse}`} data-testid="low-stock-row">
                  <td data-testid="low-stock-sku" className={textCell}>{row.sku}</td>
                  <td className={textCell}>{row.name}</td>
                  <td className={textCell}>{row.warehouse}</td>
                  <td className={numberCell}>{row.quantity_on_hand}</td>
                  <td className={numberCell}>{row.reorder_point}</td>
                  <td className={`${numberCell} font-bold text-[#8c3d12]`}>{row.shortfall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </section>
  );
}
