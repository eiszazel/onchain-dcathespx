import Header from "src/components/Header";
import PlanCard from "src/components/PlanCard";

async function getPlans() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL ?? ''}/api/dca/list`, { cache: 'no-store' });
  if (!res.ok) return [] as any[];
  const json = await res.json();
  return json?.plans ?? [];
}

export default async function PlansPage() {
  const plans = await getPlans();
  return (
    <main className="min-h-dvh bg-white text-gray-900">
      <Header />
      <section className="container py-10 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Plans</h1>
          <a href="/plans/new" className="px-3 py-1.5 rounded bg-gray-900 text-white text-sm">New Plan</a>
        </div>
        <div className="grid gap-3">
          {plans.length === 0 && <div className="text-gray-600">No plans yet.</div>}
          {plans.map((p: any) => (
            <PlanCard key={p.id} id={p.id} title={p.title} nextRun={p.nextRun} />
          ))}
        </div>
      </section>
    </main>
  );
}

