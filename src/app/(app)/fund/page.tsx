"use client";
import Header from "src/components/Header";
import { useEvmAddress } from "@coinbase/cdp-hooks";
import { useSelectedChain } from "src/hooks/useSelectedChain";

export default function FundPage() {
  const { evmAddress: addr } = useEvmAddress();
  const { chainId } = useSelectedChain(8453);
  const onrampUrl = `https://pay.coinbase.com/buy/select-asset?address=${addr ?? ''}&destinationWallets=${addr ?? ''}`;
  return (
    <main className="min-h-dvh bg-white text-gray-900">
      <Header />
      <section className="container py-10 space-y-4">
        <h1 className="text-2xl font-semibold">Funding</h1>
        <div className="text-sm text-gray-600">Address: {addr ?? 'Not signed in'} • Chain: {chainId}</div>
        <div className="flex gap-3">
          <a className="px-4 py-2 rounded bg-gray-900 text-white" target="_blank" href={onrampUrl}>Open Coinbase Onramp</a>
          <button className="px-4 py-2 rounded border">I funded already</button>
        </div>
      </section>
    </main>
  );
}
