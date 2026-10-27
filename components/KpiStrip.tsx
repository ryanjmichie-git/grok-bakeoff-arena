import { formatMoney } from "../lib/metrics";

type KpiStripProps = {
  inventoryValue: number;
  lowStockCount: number;
  orderCount: number;
  revenue: number;
};

export default function KpiStrip({
  inventoryValue,
  lowStockCount,
  orderCount,
  revenue,
}: KpiStripProps) {
  return (
    <section aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="sr-only">
        Summary
      </h2>
      <dl className="grid grid-cols-2 border border-tin bg-plate lg:grid-cols-4">
        <div className="border-r border-b border-tin px-3 py-3 sm:px-4 lg:border-b-0">
          <dt>Inventory value</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums sm:text-2xl" data-testid="kpi-inventory-value">{formatMoney(inventoryValue)}</dd>
        </div>
        <div className="border-b border-tin px-3 py-3 sm:px-4 lg:border-r lg:border-b-0">
          <dt>Low-stock items</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums sm:text-2xl" data-testid="kpi-low-stock">{lowStockCount}</dd>
        </div>
        <div className="border-r border-tin px-3 py-3 sm:px-4">
          <dt>Orders</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums sm:text-2xl" data-testid="kpi-orders">{orderCount}</dd>
        </div>
        <div className="px-3 py-3 sm:px-4">
          <dt>Order revenue</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums sm:text-2xl" data-testid="kpi-revenue">{formatMoney(revenue)}</dd>
        </div>
      </dl>
    </section>
  );
}
