import {
  isCategoryFilter,
  isWarehouseFilter,
} from "../lib/metrics";
import {
  CATEGORY_OPTIONS,
  WAREHOUSE_OPTIONS,
  type Filters,
} from "../lib/types";

type FilterBarProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
};

const controlClass =
  "h-10 w-full min-w-0 border border-ink bg-plate px-2 text-base text-ink";

export default function FilterBar({
  filters,
  onChange,
  onReset,
}: FilterBarProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <fieldset className="min-w-0 border-0 p-0">
        <legend className="mb-3 text-base font-semibold">Filters</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="flex min-w-0 flex-col gap-1">
            <label htmlFor="filter-warehouse">Warehouse</label>
            <select
              id="filter-warehouse"
              data-testid="filter-warehouse"
              className={controlClass}
              value={filters.warehouse}
              onChange={(event) => {
                const value = event.target.value;
                if (isWarehouseFilter(value)) {
                  onChange({ ...filters, warehouse: value });
                }
              }}
            >
              {WAREHOUSE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <label htmlFor="filter-category">Category</label>
            <select
              id="filter-category"
              data-testid="filter-category"
              className={controlClass}
              value={filters.category}
              onChange={(event) => {
                const value = event.target.value;
                if (isCategoryFilter(value)) {
                  onChange({ ...filters, category: value });
                }
              }}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <label htmlFor="filter-date-from">Order date from</label>
            <input
              id="filter-date-from"
              data-testid="filter-date-from"
              className={controlClass}
              type="date"
              value={filters.dateFrom}
              onChange={(event) => {
                onChange({ ...filters, dateFrom: event.target.value });
              }}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <label htmlFor="filter-date-to">Order date to</label>
            <input
              id="filter-date-to"
              data-testid="filter-date-to"
              className={controlClass}
              type="date"
              value={filters.dateTo}
              onChange={(event) => {
                onChange({ ...filters, dateTo: event.target.value });
              }}
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              data-testid="filter-reset"
              className="h-10 w-full border border-ink bg-ink px-4 text-base font-semibold text-plate xl:w-auto"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
