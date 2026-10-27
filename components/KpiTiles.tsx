type KpiTilesProps = {
  inventoryValue: string;
  lowStockCount: number;
  orderCount: number;
  orderRevenue: string;
};

const figureClassName =
  "min-w-0 border-[#b7c6d1] bg-white p-4 text-left max-lg:odd:border-r max-lg:[&:nth-child(-n+2)]:border-b lg:[&:not(:last-child)]:border-r";

const labelClassName = "text-sm text-[#1a2733]";

const valueClassName =
  "text-base font-bold tabular-nums whitespace-nowrap text-[#1a2733] sm:text-2xl";

export default function KpiTiles({
  inventoryValue,
  lowStockCount,
  orderCount,
  orderRevenue,
}: KpiTilesProps) {
  return (
    <section
      aria-labelledby="kpi-totals-heading"
      aria-live="polite"
      className="min-w-0"
    >
      <h2
        id="kpi-totals-heading"
        className="mb-3 text-left text-lg font-bold text-[#1a2733]"
      >
        Totals
      </h2>
      <div className="grid min-w-0 grid-cols-2 border border-[#b7c6d1] bg-white lg:grid-cols-4">
        <figure className={figureClassName}>
          <figcaption className={labelClassName}>Inventory value</figcaption>
          <p data-testid="kpi-inventory-value" className={valueClassName}>
            {inventoryValue}
          </p>
        </figure>
        <figure className={figureClassName}>
          <figcaption className={labelClassName}>Low-stock items</figcaption>
          <p data-testid="kpi-low-stock" className={valueClassName}>
            {lowStockCount}
          </p>
        </figure>
        <figure className={figureClassName}>
          <figcaption className={labelClassName}>Orders</figcaption>
          <p data-testid="kpi-orders" className={valueClassName}>
            {orderCount}
          </p>
        </figure>
        <figure className={figureClassName}>
          <figcaption className={labelClassName}>Order revenue</figcaption>
          <p data-testid="kpi-revenue" className={valueClassName}>
            {orderRevenue}
          </p>
        </figure>
      </div>
    </section>
  );
}
