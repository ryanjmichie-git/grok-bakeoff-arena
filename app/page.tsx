import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import inventory from "../data/inventory.json";
import orders from "../data/orders.json";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto min-w-0 max-w-6xl px-4 py-6 sm:px-6">
        <Dashboard inventory={inventory} orders={orders} />
      </main>
    </>
  );
}
