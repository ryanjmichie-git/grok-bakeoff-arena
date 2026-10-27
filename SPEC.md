# SPEC: Factory Inventory Dashboard

Build a one-page dashboard over the sample data in `data/inventory.json` (32 items) and
`data/orders.json` (250 orders, all in 2025).

## Rules

- Don't edit this file, `data/`, `bin/`, `.grok/`, `package.json`, `package-lock.json` or
  any config file. Add no dependencies.
- Put your code in `app/`, `components/` and `lib/`.
- `npm run verify` (typecheck, lint, hook tests, build) must pass.

## The page, top to bottom

1. **Header.** Already in `components/Header.tsx`: the page's only `h1`,
   "Factory Inventory Dashboard", and a visible "Sample data" badge. Keep both.

2. **Filter bar.** Every control has a visible label.
   - Warehouse: a `select` with All, London, San Francisco, Tokyo. `data-testid="filter-warehouse"`.
   - Category: a `select` with All, Actuators, Circuit Boards, Controllers, Power Supplies,
     Sensors. `data-testid="filter-category"`.
   - Order date from and to: `input type="date"`, defaults `2025-01-01` and `2025-12-31`.
     `data-testid="filter-date-from"` and `data-testid="filter-date-to"`.
   - A Reset button that restores all defaults. `data-testid="filter-reset"`.
   - Warehouse and category filter both inventory items and orders (match each record's
     `warehouse` and `category` fields). The dates filter orders only.
   - Compare dates on the first 10 characters of `order_date` (`YYYY-MM-DD`) as text, with
     no time-zone conversion. Both ends are inclusive.
   - The page updates as soon as a filter changes.

3. **Four KPI tiles.** Each has a visible label. The element with the `data-testid` holds
   only the formatted value.
   - Inventory value: sum of `quantity_on_hand × unit_cost` over filtered items, formatted
     `$1,234.56`. `data-testid="kpi-inventory-value"`.
   - Low-stock items: count of filtered items with `quantity_on_hand ≤ reorder_point`.
     `data-testid="kpi-low-stock"`.
   - Orders: count of filtered orders. `data-testid="kpi-orders"`.
   - Order revenue: sum of `total_value` over filtered orders, formatted `$1,234.56`.
     `data-testid="kpi-revenue"`.

4. **Orders by month.** A bar chart of filtered order counts for each month from 2025-01 to
   2025-12, drawn with SVG or CSS. Give it a text alternative: a data table with one row per
   month, where the element holding each count has `data-testid="month-YYYY-MM"` (for
   example `month-2025-03`).

5. **Low-stock table.** Filtered items with `quantity_on_hand ≤ reorder_point`.
   - Columns: SKU, Name, Warehouse, On hand, Reorder point, Shortfall
     (`reorder_point − quantity_on_hand`).
   - Sort by shortfall, largest first; break ties by SKU (A to Z).
   - Each row has `data-testid="low-stock-row"`; the SKU cell has `data-testid="low-stock-sku"`.
   - When no items match, show a message saying so instead of an empty table.

## Quality bar

- WCAG 2.2 AA: labelled controls, visible keyboard focus, enough contrast, everything
  usable by keyboard, and nothing conveyed by color alone.
- Responsive: no sideways page scrolling at 390, 768 or 1280 px wide.
- Semantic markup: landmarks, table headers, and heading order under the existing `h1`.
- TypeScript strict, no `any`.
