import { monthCounts } from "../lib/ordersByMonth";
import type { Order } from "../lib/types";

type OrdersByMonthProps = { orders: Order[] };

function barHeight(count: number, maxCount: number): string {
  if (count <= 0 || maxCount <= 0) {
    return "0%";
  }
  return `${(count / maxCount) * 100}%`;
}

export default function OrdersByMonth({ orders }: OrdersByMonthProps) {
  const rows = monthCounts(orders);
  const maxCount = rows.reduce((max, row) => Math.max(max, row.count), 0);

  return (
    <section
      aria-labelledby="orders-by-month-heading"
      className="rounded border border-slate-200 bg-white p-4 text-slate-900"
    >
      <h2
        id="orders-by-month-heading"
        className="text-lg font-semibold tracking-tight"
      >
        Orders by month
      </h2>
      <div
        className="mt-3 grid w-full grid-cols-12 items-end gap-0.5 overflow-hidden sm:gap-1"
        role="img"
        aria-label="Orders by month"
        aria-describedby="orders-by-month-table"
      >
        {rows.map((row) => (
          <div key={row.month} className="flex min-w-0 flex-col items-center">
            <div className="flex h-28 w-full items-end border-b-2 border-slate-700">
              <div
                className="w-full bg-slate-700"
                style={{ height: barHeight(row.count, maxCount) }}
              />
            </div>
            <p className="mt-1 w-full break-all text-center text-xs font-medium leading-none text-slate-900">
              {String(row.count)}
            </p>
            <p className="mt-1 w-full text-center text-[10px] leading-none text-slate-800 [writing-mode:vertical-rl]">
              {row.month}
            </p>
          </div>
        ))}
      </div>
      <table id="orders-by-month-table" className="mt-4 w-full text-sm">
        <caption className="mb-2 text-left font-medium text-slate-800">
          Order counts by month
        </caption>
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th scope="col" className="py-1 pr-2 font-medium text-slate-800">
              Month
            </th>
            <th
              scope="col"
              className="py-1 text-right font-medium text-slate-800"
            >
              Orders
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.month} className="border-b border-slate-200">
              <th
                scope="row"
                className="py-1 pr-2 text-left font-medium text-slate-800"
              >
                {row.month}
              </th>
              <td className="py-1 text-right tabular-nums" data-testid={`month-${row.month}`}>{String(row.count)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
