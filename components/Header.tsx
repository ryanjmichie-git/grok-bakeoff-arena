export default function Header() {
  return (
    <header className="border-b border-tin bg-plate text-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
        <h1 className="min-w-0 text-xl font-semibold tracking-tight sm:text-2xl">
          Factory Inventory Dashboard
        </h1>
        <span className="border border-ink px-2 py-0.5 text-sm font-medium">
          Sample data
        </span>
      </div>
    </header>
  );
}
