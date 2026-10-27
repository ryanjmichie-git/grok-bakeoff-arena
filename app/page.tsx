"use client";

import { useState } from "react";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header";
import KpiTiles from "../components/KpiTiles";
import LowStockTable from "../components/LowStockTable";
import OrdersByMonth from "../components/OrdersByMonth";
import { inventory, orders } from "../lib/data";
import { filterInventory, filterOrders } from "../lib/filter";
import { DEFAULT_FILTERS, type FilterState } from "../lib/types";

export default function Page() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const items = filterInventory(inventory, filters);
  const filteredOrders = filterOrders(orders, filters);

  return (
    <>
      <Header />
      <main className="mx-auto min-w-0 max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <FilterBar filters={filters} onChange={setFilters} />
        <KpiTiles items={items} orders={filteredOrders} />
        <OrdersByMonth orders={filteredOrders} />
        <LowStockTable items={items} />
      </main>
    </>
  );
}
