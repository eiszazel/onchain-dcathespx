"use client";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { base, mainnet } from 'viem/chains';

const ERC20_ABI = [
  { type: 'function', name: 'allowance', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] },
] as const;

function chainForId(id: number) {
  return id === 8453 ? base : mainnet;
}

export function useAllowance(owner?: `0x${string}` | null, spender?: `0x${string}`, token?: `0x${string}`, chainId?: number) {
  const [allowance, setAllowance] = useState<bigint>(0n);
  const client = useMemo(() => {
    try {
      if (!chainId) return null;
      return createPublicClient({ chain: chainForId(chainId), transport: http() });
    } catch {
      return null;
    }
  }, [chainId]);

  const read = useCallback(async () => {
    if (!client || !owner || !spender || !token) return;
    const a = await client.readContract({ address: token, abi: ERC20_ABI, functionName: 'allowance', args: [owner, spender] });
    setAllowance(a as bigint);
  }, [client, owner, spender, token]);

  useEffect(() => { void read(); }, [read]);

  return { allowance, refresh: read } as const;
}

