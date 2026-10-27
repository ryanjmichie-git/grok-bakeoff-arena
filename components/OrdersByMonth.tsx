type MonthCount = { month: string; count: number };

type OrdersByMonthProps = { months: MonthCount[] };

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function monthName(month: string): string {
  const index = Number.parseInt(month.slice(5, 7), 10) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= MONTH_NAMES.length) {
    return month;
  }
  return MONTH_NAMES[index] ?? month;
}

function barPercent(count: number, maxCount: number): string {
  if (maxCount <= 0 || count <= 0) {
    return "0%";
  }
  const ratio = Math.min(count / maxCount, 1);
  return `${ratio * 100}%`;
}

export default function OrdersByMonth({ months }: OrdersByMonthProps) {
  let maxCount = 0;
  for (const row of months) {
    if (row.count > maxCount) {
      maxCount = row.count;
    }
  }

  return (
    <section
      aria-labelledby="orders-by-month-heading"
      className="min-w-0 max-w-full rounded-none border border-[#b7c6d1] bg-white p-4 text-left text-[#1a2733] shadow-none"
    >
      <h2
        id="orders-by-month-heading"
        className="text-lg font-bold text-[#1a2733]"
      >
        Orders by month
      </h2>

      <ul
        aria-hidden="true"
        className="mt-4 flex w-full min-w-0 max-w-full list-none flex-col gap-2 p-0"
      >
        {months.map((row) => (
          <li
            key={row.month}
            className="grid min-w-0 grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-x-2"
          >
            <span className="text-sm">{monthName(row.month)}</span>
            <div className="h-3 min-w-0 overflow-hidden bg-[#e4ebf0]">
              <div
                className="h-3 bg-[#0e6b62]"
                style={{ width: barPercent(row.count, maxCount) }}
              />
            </div>
            <span className="text-right text-sm tabular-nums">{row.count}</span>
          </li>
        ))}
      </ul>

      <table
        aria-labelledby="orders-by-month-heading"
        className="mt-4 w-full max-w-full text-sm"
      >
        <thead>
          <tr className="border-b border-[#b7c6d1]">
            <th scope="col" className="py-1 pr-3 text-left font-bold">
              Month
            </th>
            <th scope="col" className="py-1 text-left font-bold">
              Orders
            </th>
          </tr>
        </thead>
        <tbody>
          {months.map((row) => (
            <tr key={row.month} className="border-b border-[#b7c6d1]">
              <td className="py-1 pr-3">{monthName(row.month)}</td>
              <td className="py-1 tabular-nums" data-testid={`month-${row.month}`}>
                {row.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
