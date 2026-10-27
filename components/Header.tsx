export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Factory Inventory Dashboard
        </h1>
        <span className="rounded border border-slate-400 px-2 py-0.5 text-sm font-medium text-slate-800">
          Sample data
        </span>
      </div>
    </header>
  );
}
