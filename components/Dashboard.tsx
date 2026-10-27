"use client";

import { useState } from "react";
import FilterBar from "./FilterBar";
import KpiStrip from "./KpiStrip";
import LowStockTable from "./LowStockTable";
import OrdersByMonth from "./OrdersByMonth";
import {
  DEFAULT_FILTERS,
  filterInventory,
  filterOrders,
  lowStockRows,
  ordersByMonth,
  sumInventoryValue,
  sumOrderRevenue,
} from "../lib/metrics";
import type { Filters, InventoryItem, Order } from "../lib/types";

type DashboardProps = {
  inventory: readonly InventoryItem[];
  orders: readonly Order[];
};

export default function Dashboard({ inventory, orders }: DashboardProps) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const items = filterInventory(inventory, filters);
  const visibleOrders = filterOrders(orders, filters);
  const stockRows = lowStockRows(items);

  return (
    <div className="flex min-w-0 flex-col gap-8">
      <FilterBar
        filters={filters}
        onChange={setFilters}
        onReset={() => {
          setFilters(DEFAULT_FILTERS);
        }}
      />
      <KpiStrip
        inventoryValue={sumInventoryValue(items)}
        lowStockCount={stockRows.length}
        orderCount={visibleOrders.length}
        revenue={sumOrderRevenue(visibleOrders)}
      />
      <OrdersByMonth months={ordersByMonth(visibleOrders)} />
      <LowStockTable rows={stockRows} />
    </div>
  );
}
