"use client";
import Header from "src/components/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPlanPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("5.00");
  const [anyToken, setAnyToken] = useState(false);
  const [token, setToken] = useState("");

  async function submit() {
    const res = await fetch('/api/dca/create', { method: 'POST', body: JSON.stringify({ amount, token: anyToken ? token : 'SPX6900' }) });
    const json = await res.json();
    router.push(`/plans/${json.planId}`);
  }

  return (
    <main className="min-h-dvh bg-white text-gray-900">
      <Header />
      <section className="container py-10 space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold">Create Plan</h1>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Amount (USDC)</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} min={5} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="flex items-center gap-2">
            <input id="any" type="checkbox" checked={anyToken} onChange={(e) => setAnyToken(e.target.checked)} />
            <label htmlFor="any">Any Coin</label>
          </div>
          {anyToken && (
            <div>
              <label className="text-sm text-gray-600">Token address</label>
              <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="0x..." className="w-full border rounded px-3 py-2" />
            </div>
          )}
          <button onClick={submit} className="px-4 py-2 rounded bg-gray-900 text-white">Create</button>
        </div>
      </section>
    </main>
  );
}

