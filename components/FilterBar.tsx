import type { ChangeEvent } from "react";
import {
  CATEGORIES,
  DEFAULT_FILTERS,
  WAREHOUSES,
  type Category,
  type FilterState,
  type Warehouse,
} from "../lib/types";

type FilterBarProps = {
  filters: FilterState;
  onChange: (next: FilterState) => void;
};

const controlClassName =
  "w-full min-w-0 rounded border border-slate-500 bg-white px-2 py-1.5 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

const labelClassName = "text-sm font-medium text-slate-800";

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  function changeWarehouse(event: ChangeEvent<HTMLSelectElement>) {
    onChange({
      ...filters,
      warehouse: event.target.value as "All" | Warehouse,
    });
  }

  function changeCategory(event: ChangeEvent<HTMLSelectElement>) {
    onChange({
      ...filters,
      category: event.target.value as "All" | Category,
    });
  }

  function changeDateFrom(event: ChangeEvent<HTMLInputElement>) {
    onChange({ ...filters, dateFrom: event.target.value });
  }

  function changeDateTo(event: ChangeEvent<HTMLInputElement>) {
    onChange({ ...filters, dateTo: event.target.value });
  }

  return (
    <section
      aria-labelledby="filters-heading"
      className="min-w-0 max-w-full rounded border border-slate-200 bg-white p-4 text-slate-900"
    >
      <h2
        id="filters-heading"
        className="text-xl font-semibold tracking-tight text-slate-900"
      >
        Filters
      </h2>
      <div className="mt-3 grid min-w-0 grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="filter-warehouse" className={labelClassName}>
            Warehouse
          </label>
          <select
            id="filter-warehouse"
            data-testid="filter-warehouse"
            value={filters.warehouse}
            onChange={changeWarehouse}
            className={controlClassName}
          >
            <option value="All">All</option>
            {WAREHOUSES.map((warehouse) => (
              <option key={warehouse} value={warehouse}>
                {warehouse}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="filter-category" className={labelClassName}>
            Category
          </label>
          <select
            id="filter-category"
            data-testid="filter-category"
            value={filters.category}
            onChange={changeCategory}
            className={controlClassName}
          >
            <option value="All">All</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="filter-date-from" className={labelClassName}>
            Order date from
          </label>
          <input
            id="filter-date-from"
            data-testid="filter-date-from"
            type="date"
            value={filters.dateFrom}
            onChange={changeDateFrom}
            className={controlClassName}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="filter-date-to" className={labelClassName}>
            Order date to
          </label>
          <input
            id="filter-date-to"
            data-testid="filter-date-to"
            type="date"
            value={filters.dateTo}
            onChange={changeDateTo}
            className={controlClassName}
          />
        </div>

        <div className="min-w-0">
          <button
            type="button"
            data-testid="filter-reset"
            onClick={() => {
              onChange(DEFAULT_FILTERS);
            }}
            className={controlClassName}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
