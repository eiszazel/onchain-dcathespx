import Header from "src/components/SiteHeader";
import { siteCopy } from "src/lib/siteCopy";

export default function DocsPage() {
  return (
    <main className="min-h-dvh bg-white text-gray-900">
      <Header />
      <section className="container py-10">
        <h1 className="text-3xl font-semibold mb-4">Docs & Lore</h1>
        <p className="text-gray-700 max-w-3xl">{siteCopy.about.intro}</p>
        <div className="mt-8 space-y-3">
          {siteCopy.about.timeline.map((t) => (
            <div key={t.date} className="rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">{t.date}</div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-gray-700 text-sm">{t.note}</div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Contracts</h2>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
            {siteCopy.disclaimers.contracts.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
