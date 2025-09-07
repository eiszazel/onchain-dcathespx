"use client";
import { CHAINS } from "src/lib/chains";
import { useSelectedChain } from "src/hooks/useSelectedChain";

export default function NetworkToggle() {
  const { chainId, setChainId } = useSelectedChain(8453);
  return (
    <div className="inline-flex rounded-full border border-gray-200 overflow-hidden">
      {[1, 8453].map((id) => (
        <button
          key={id}
          onClick={() => setChainId(id)}
          className={`px-3 py-1 text-sm ${chainId === id ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
        >
          {CHAINS[id].name}
        </button>
      ))}
    </div>
  );
}

