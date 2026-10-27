"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  DEFAULT_DATE_FROM,
  DEFAULT_DATE_TO,
  WAREHOUSES,
  computeInventoryValue,
  countLowStock,
  filterInventory,
  filterOrders,
  formatCurrency,
  getLowStockItems,
  getOrdersByMonth,
  inventory,
  orders,
} from "../lib/data";
import type { InventoryItem } from "../lib/types";

export default function Dashboard() {
  const [warehouse, setWarehouse] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [dateFrom, setDateFrom] = useState<string>(DEFAULT_DATE_FROM);
  const [dateTo, setDateTo] = useState<string>(DEFAULT_DATE_TO);

  const filteredInventory = useMemo(
    () => filterInventory(inventory, warehouse, category),
    [warehouse, category],
  );

  const filteredOrders = useMemo(
    () => filterOrders(orders, warehouse, category, dateFrom, dateTo),
    [warehouse, category, dateFrom, dateTo],
  );

  const inventoryValue = useMemo(
    () => computeInventoryValue(filteredInventory),
    [filteredInventory],
  );

  const lowStockCount = useMemo(
    () => countLowStock(filteredInventory),
    [filteredInventory],
  );

  const orderCount = filteredOrders.length;

  const orderRevenue = useMemo(
    () => filteredOrders.reduce((sum, order) => sum + order.total_value, 0),
    [filteredOrders],
  );

  const lowStockItems = useMemo(
    () => getLowStockItems(filteredInventory),
    [filteredInventory],
  );

  const ordersByMonth = useMemo(
    () => getOrdersByMonth(filteredOrders),
    [filteredOrders],
  );

  const maxMonthCount = Math.max(1, ...ordersByMonth.map((m) => m.count));

  function handleReset() {
    setWarehouse("All");
    setCategory("All");
    setDateFrom(DEFAULT_DATE_FROM);
    setDateTo(DEFAULT_DATE_TO);
  }

  return (
    <div className="space-y-8">
      <section aria-labelledby="filters-heading">
        <h2 id="filters-heading" className="sr-only">
          Filters
        </h2>
        <div className="flex flex-wrap items-end gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="min-w-[140px] flex-1">
            <label
              htmlFor="filter-warehouse"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Warehouse
            </label>
            <select
              id="filter-warehouse"
              data-testid="filter-warehouse"
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {WAREHOUSES.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[160px] flex-1">
            <label
              htmlFor="filter-category"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Category
            </label>
            <select
              id="filter-category"
              data-testid="filter-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[140px]">
            <label
              htmlFor="filter-date-from"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Order date from
            </label>
            <input
              id="filter-date-from"
              data-testid="filter-date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="min-w-[140px]">
            <label
              htmlFor="filter-date-to"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Order date to
            </label>
            <input
              id="filter-date-to"
              data-testid="filter-date-to"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            data-testid="filter-reset"
            onClick={handleReset}
            className="rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>
      </section>

      <section aria-labelledby="kpis-heading">
        <h2 id="kpis-heading" className="sr-only">
          Key metrics
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Inventory value</p>
            <p
              data-testid="kpi-inventory-value"
              className="mt-1 text-2xl font-semibold text-slate-900"
            >
              {formatCurrency(inventoryValue)}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Low-stock items</p>
            <p
              data-testid="kpi-low-stock"
              className="mt-1 text-2xl font-semibold text-slate-900"
            >
              {lowStockCount}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Orders</p>
            <p
              data-testid="kpi-orders"
              className="mt-1 text-2xl font-semibold text-slate-900"
            >
              {orderCount}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Order revenue</p>
            <p
              data-testid="kpi-revenue"
              className="mt-1 text-2xl font-semibold text-slate-900"
            >
              {formatCurrency(orderRevenue)}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="orders-month-heading">
        <h2
          id="orders-month-heading"
          className="mb-4 text-lg font-semibold text-slate-900"
        >
          Orders by month
        </h2>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div
            className="flex h-48 items-end justify-between gap-1 border-b border-slate-200 pb-2"
            role="img"
            aria-label="Bar chart of order counts by month in 2025"
          >
            {ordersByMonth.map(({ month, count }) => {
              const heightPercent = (count / maxMonthCount) * 100;
              return (
                <div
                  key={month}
                  className="flex flex-1 flex-col items-center justify-end"
                >
                  <div
                    className="w-full max-w-[40px] bg-blue-600"
                    style={{ height: `${heightPercent}%` }}
                    title={`${month}: ${count}`}
                  />
                  <span className="mt-1 text-[10px] text-slate-600 sm:text-xs">
                    {month.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>
          <table className="mt-4 w-full text-left text-sm">
            <caption className="sr-only">
              Order counts by month for 2025
            </caption>
            <thead>
              <tr>
                <th scope="col" className="pb-2 font-medium text-slate-700">
                  Month
                </th>
                <th scope="col" className="pb-2 font-medium text-slate-700">
                  Orders
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersByMonth.map(({ month, count }) => (
                <tr key={month} className="border-t border-slate-100">
                  <td className="py-1">{month}</td>
                  <td className="py-1" data-testid={`month-${month}`}>
                    {count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="low-stock-heading">
        <h2
          id="low-stock-heading"
          className="mb-4 text-lg font-semibold text-slate-900"
        >
          Low-stock items
        </h2>
        {lowStockItems.length === 0 ? (
          <p className="rounded-lg border border-slate-200 bg-white p-4 text-slate-700">
            No low-stock items match the current filters.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 font-medium text-slate-700"
                  >
                    SKU
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-medium text-slate-700"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-medium text-slate-700"
                  >
                    Warehouse
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-medium text-slate-700"
                  >
                    On hand
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-medium text-slate-700"
                  >
                    Reorder point
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-medium text-slate-700"
                  >
                    Shortfall
                  </th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item: InventoryItem) => {
                  const shortfall = item.reorder_point - item.quantity_on_hand;
                  return (
                    <tr
                      key={item.id}
                      data-testid="low-stock-row"
                      className="border-t border-slate-100"
                    >
                      <td
                        data-testid="low-stock-sku"
                        className="px-4 py-3 font-medium text-slate-900"
                      >
                        {item.sku}
                      </td>
                      <td className="px-4 py-3 text-slate-800">{item.name}</td>
                      <td className="px-4 py-3 text-slate-800">
                        {item.warehouse}
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        {item.quantity_on_hand}
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        {item.reorder_point}
                      </td>
                      <td className="px-4 py-3 font-medium text-red-700">
                        {shortfall}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
