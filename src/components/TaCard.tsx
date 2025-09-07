export default function TaCard({ chain, sentiment, summary }: { chain: string; sentiment: 'bullish'|'bearish'|'neutral'; summary: string }) {
  const color = sentiment === 'bullish' ? 'bg-green-100 text-green-800' : sentiment === 'bearish' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800';
  return (
    <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm">
      <div className={`inline-block px-2 py-0.5 rounded-full text-xs ${color}`}>{sentiment}</div>
      <div className="mt-2 font-semibold">{chain}</div>
      <p className="text-gray-700 mt-2 text-sm">{summary}</p>
    </div>
  );
}

