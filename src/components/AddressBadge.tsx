"use client";
import { useEvmAddress } from "@coinbase/cdp-hooks";
import { truncateAddress } from "src/lib/format";

export default function AddressBadge() {
  const { evmAddress: addr } = useEvmAddress();
  if (!addr) return null;
  const copy = async () => {
    try { await navigator.clipboard.writeText(addr); } catch {}
  };
  return (
    <button title="Copy address" onClick={copy} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm border border-gray-200">
      {truncateAddress(addr)}
    </button>
  );
}
