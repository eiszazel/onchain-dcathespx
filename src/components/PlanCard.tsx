import Link from 'next/link';

export default function PlanCard({ id, title, nextRun }: { id: string; title: string; nextRun?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm flex items-center justify-between">
      <div>
        <div className="font-semibold">{title}</div>
        {nextRun ? <div className="text-gray-500 text-sm">Next: {nextRun}</div> : null}
      </div>
      <Link href={`/plans/${id}`} className="px-3 py-1.5 rounded-full bg-gray-900 text-white text-sm">Execute Now</Link>
    </div>
  );
}

