import Header from "../components/Header";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <p className="text-slate-700">The dashboard described in SPEC.md goes here.</p>
      </main>
    </>
  );
}
