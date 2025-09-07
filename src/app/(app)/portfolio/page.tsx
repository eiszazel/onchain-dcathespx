import Header from "src/components/Header";

async function getPortfolio() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL ?? ''}/api/portfolio`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function PortfolioPage() {
  const data = await getPortfolio();
  return (
    <main className="min-h-dvh bg-white text-gray-900">
      <Header />
      <section className="container py-10 space-y-4">
        <h1 className="text-2xl font-semibold">Portfolio</h1>
        <pre className="text-sm bg-gray-50 p-4 rounded-xl border overflow-auto">{JSON.stringify(data, null, 2)}</pre>
      </section>
    </main>
  );
}

