import Header from "src/components/SiteHeader";
import TaCard from "src/components/TaCard";

export default function DailyTAPage() {
  return (
    <main className="min-h-dvh bg-white text-gray-900">
      <Header />
      <section className="container py-10">
        <h1 className="text-3xl font-semibold mb-4">Daily TA</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <TaCard chain="Ethereum" sentiment={'neutral'} summary={'No data'} />
          <TaCard chain="Base" sentiment={'neutral'} summary={'No data'} />
        </div>
        <div className="text-xs text-gray-500 mt-6">Paid via x402 (Bankr).</div>
      </section>
    </main>
  );
}
