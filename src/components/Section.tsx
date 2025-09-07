import type { ReactNode } from 'react';

export default function Section({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="container py-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {sub ? <p className="text-gray-600 mt-1">{sub}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

