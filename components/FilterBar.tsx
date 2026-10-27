import type { ChangeEvent } from "react";
import {
  CATEGORY_OPTIONS,
  WAREHOUSE_OPTIONS,
  type Filters,
} from "../lib/dashboard";

type FilterBarProps = {
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
};

const labelClass = "flex min-w-0 max-w-full flex-col gap-1 text-sm";

const controlClass =
  "min-h-10 rounded-none border border-[#b7c6d1] bg-white px-2 text-[#1a2733] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6b62]";

const selectClass = `w-full min-w-0 max-w-[14rem] ${controlClass}`;
const dateClass = `w-full min-w-0 max-w-[11rem] ${controlClass}`;

export default function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  function onWarehouseChange(event: ChangeEvent<HTMLSelectElement>) {
    const warehouse = WAREHOUSE_OPTIONS.find((option) => option === event.target.value);
    if (warehouse === undefined) {
      return;
    }
    onChange({
      warehouse,
      category: filters.category,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
    });
  }

  function onCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    const category = CATEGORY_OPTIONS.find((option) => option === event.target.value);
    if (category === undefined) {
      return;
    }
    onChange({
      warehouse: filters.warehouse,
      category,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
    });
  }

  function onDateFromChange(event: ChangeEvent<HTMLInputElement>) {
    onChange({
      warehouse: filters.warehouse,
      category: filters.category,
      dateFrom: event.target.value,
      dateTo: filters.dateTo,
    });
  }

  function onDateToChange(event: ChangeEvent<HTMLInputElement>) {
    onChange({
      warehouse: filters.warehouse,
      category: filters.category,
      dateFrom: filters.dateFrom,
      dateTo: event.target.value,
    });
  }

  return (
    <section className="min-w-0 max-w-full border border-[#b7c6d1] bg-white p-4 text-[#1a2733]">
      <h2 className="mb-3 text-lg font-bold">Filters</h2>
      <div className="flex min-w-0 max-w-full flex-wrap gap-x-4 gap-y-3">
        <label htmlFor="filter-warehouse" className={labelClass}>
          Warehouse
          <select
            id="filter-warehouse"
            data-testid="filter-warehouse"
            className={selectClass}
            value={filters.warehouse}
            onChange={onWarehouseChange}
          >
            {WAREHOUSE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="filter-category" className={labelClass}>
          Category
          <select
            id="filter-category"
            data-testid="filter-category"
            className={selectClass}
            value={filters.category}
            onChange={onCategoryChange}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="filter-date-from" className={labelClass}>
          Order date from
          <input
            id="filter-date-from"
            data-testid="filter-date-from"
            className={dateClass}
            type="date"
            value={filters.dateFrom}
            onChange={onDateFromChange}
          />
        </label>
        <label htmlFor="filter-date-to" className={labelClass}>
          Order date to
          <input
            id="filter-date-to"
            data-testid="filter-date-to"
            className={dateClass}
            type="date"
            value={filters.dateTo}
            onChange={onDateToChange}
          />
        </label>
        <button
          type="button"
          data-testid="filter-reset"
          className={`self-end ${controlClass}`}
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
