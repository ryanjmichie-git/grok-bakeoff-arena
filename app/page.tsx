import Header from "../components/Header";
import Dashboard from "../components/Dashboard";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Dashboard />
      </main>
    </>
  );
}
