import type { MonthCount } from "../lib/types";

type OrdersByMonthProps = {
  months: readonly MonthCount[];
};

export default function OrdersByMonth({ months }: OrdersByMonthProps) {
  const peak = months.reduce((max, month) => Math.max(max, month.count), 0);

  return (
    <section aria-labelledby="orders-by-month-heading" className="min-w-0">
      <h2 id="orders-by-month-heading" className="text-lg font-semibold">
        Orders by month
      </h2>
      <div className="mt-4 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:items-start">
        <div
          role="img"
          aria-label="Bar chart of order counts for each month of 2025. Exact counts are in the table."
          className="min-w-0 border border-tin bg-plate px-3 py-4 sm:px-4"
        >
          <div className="flex flex-col gap-1.5">
            {months.map((month) => {
              const width = peak === 0 ? 0 : (month.count / peak) * 100;
              return (
                <div
                  key={month.key}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)_2rem] items-center gap-2"
                >
                  <span className="text-sm">{month.short}</span>
                  <span className="block h-3 bg-bench">
                    <span
                      className="block h-3 bg-enamel"
                      style={{ width: `${width}%` }}
                    />
                  </span>
                  <span className="text-right text-sm font-medium tabular-nums">
                    {month.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="min-w-0 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">Order counts by month for 2025</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border-b border-ink px-3 py-2 text-left font-semibold"
                >
                  Month
                </th>
                <th
                  scope="col"
                  className="border-b border-ink px-3 py-2 text-right font-semibold"
                >
                  Orders
                </th>
              </tr>
            </thead>
            <tbody>
              {months.map((month) => (
                <tr key={month.key}>
                  <th
                    scope="row"
                    className="border-b border-tin px-3 py-1.5 text-left font-medium"
                  >
                    {month.label}
                  </th>
                  <td
                    data-testid={`month-${month.key}`}
                    className="border-b border-tin px-3 py-1.5 text-right tabular-nums"
                  >{month.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
