"use client";
import Header from "src/components/Header";
import { useParams } from "next/navigation";
import { useEvmAddress, useSendEvmTransaction } from "@coinbase/cdp-hooks";
import { useSelectedChain } from "src/hooks/useSelectedChain";
import { USDC, PERMIT2 } from "src/lib/tokens";
import { useAllowance } from "src/hooks/useAllowance";
import { useState } from "react";

export default function PlanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { evmAddress: addr } = useEvmAddress();
  const { chainId } = useSelectedChain(8453);
  const { allowance, refresh } = useAllowance(addr, PERMIT2 as `0x${string}`, USDC[chainId] as `0x${string}`, chainId);
  const { sendEvmTransaction } = useSendEvmTransaction();
  const [status, setStatus] = useState<string>('');

  async function approve() {
    try {
      setStatus('Approving…');
      // approve(spender, max)
      const data = `0x095ea7b3${PERMIT2.toLowerCase().replace('0x','').padStart(64,'0')}${(2n**256n-1n).toString(16).padStart(64,'0')}`;
      await (sendEvmTransaction as any)({ evmAccount: addr, network: 'base-mainnet', transaction: { to: USDC[chainId], data, value: 0n, type: 'eip1559' } as any });
      await refresh();
      setStatus('Approved');
    } catch (e:any) {
      setStatus('Approve failed');
    }
  }

  async function execute() {
    setStatus('Preparing…');
    const res = await fetch('/api/dca/prepare', { method: 'POST', body: JSON.stringify({ planId: id }) });
    const json = await res.json();
    if (json?.transaction) {
      setStatus('Sending…');
      try {
        const { to, data, value, chainId: txChainId } = json.transaction;
        const res: any = await (sendEvmTransaction as any)({ evmAccount: addr, network: (txChainId === 1 ? 'ethereum-mainnet' : 'base-mainnet'), transaction: { to, data, value: 0n, type: 'eip1559' } });
        const hash = res?.transactionHash ?? '0x';
        await fetch('/api/dca/confirm', { method: 'POST', body: JSON.stringify({ executionId: json.executionId, txHash: hash }) });
        setStatus('Executed');
      } catch {
        setStatus('Execution failed');
      }
    } else {
      setStatus('No transaction');
    }
  }

  return (
    <main className="min-h-dvh bg-white text-gray-900">
      <Header />
      <section className="container py-10 space-y-4">
        <h1 className="text-2xl font-semibold">Plan {id}</h1>
        <div className="rounded-xl border p-4">
          <div className="font-semibold mb-2">Allowance</div>
          <div className="text-sm text-gray-600">Current: {allowance.toString()}</div>
          <button onClick={approve} className="mt-3 px-3 py-1.5 rounded bg-gray-900 text-white text-sm">Approve USDC</button>
        </div>
        <div className="rounded-xl border p-4">
          <div className="font-semibold mb-2">Execute</div>
          <button onClick={execute} className="px-3 py-1.5 rounded bg-amber-500 text-black text-sm">Execute Now</button>
        </div>
        {status && <div className="text-sm text-gray-700">{status}</div>}
      </section>
    </main>
  );
}
