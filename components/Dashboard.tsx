"use client";

import { useMemo, useState } from "react";
import FilterBar from "./FilterBar";
import KpiTiles from "./KpiTiles";
import LowStockTable from "./LowStockTable";
import OrdersByMonth from "./OrdersByMonth";
import {
  DEFAULT_FILTERS,
  filterInventory,
  filterOrders,
  formatMoney,
  inventoryItems,
  inventoryValue,
  lowStockRows,
  orderRevenue,
  orders,
  ordersByMonth,
} from "../lib/dashboard";

export default function Dashboard() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredItems = useMemo(
    () => filterInventory(inventoryItems, filters),
    [filters],
  );

  const filteredOrders = useMemo(
    () => filterOrders(orders, filters),
    [filters],
  );

  const lowStock = useMemo(
    () => lowStockRows(filteredItems),
    [filteredItems],
  );

  const months = useMemo(
    () => ordersByMonth(filteredOrders),
    [filteredOrders],
  );

  return (
    <div className="flex flex-col gap-8 min-w-0">
      <FilterBar
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />
      <KpiTiles
        inventoryValue={formatMoney(inventoryValue(filteredItems))}
        lowStockCount={lowStock.length}
        orderCount={filteredOrders.length}
        orderRevenue={formatMoney(orderRevenue(filteredOrders))}
      />
      <OrdersByMonth months={months} />
      <LowStockTable rows={lowStock} />
    </div>
  );
}
