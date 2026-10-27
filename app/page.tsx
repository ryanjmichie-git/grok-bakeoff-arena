import Header from "../components/Header";
import Dashboard from "../components/Dashboard";

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main
        id="main-content"
        className="mx-auto min-w-0 max-w-6xl px-4 py-6 sm:px-6"
      >
        <Dashboard />
      </main>
    </>
  );
}
