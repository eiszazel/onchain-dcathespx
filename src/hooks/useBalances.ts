"use client";
import { useEffect, useMemo, useState } from 'react';
import { createPublicClient, formatUnits, http } from 'viem';
import { base, mainnet } from 'viem/chains';
import { SPX6900, USDC } from 'src/lib/tokens';

const ERC20_ABI = [
  { type: 'function', name: 'balanceOf', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] },
  { type: 'function', name: 'decimals', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'uint8' }] },
] as const;

function chainForId(id: number) {
  return id === 8453 ? base : mainnet;
}

export function useBalances(evmAddress?: `0x${string}` | null, chainId?: number) {
  const [loading, setLoading] = useState(false);
  const [native, setNative] = useState<string>('0');
  const [usdc, setUsdc] = useState<string>('0');
  const [spx, setSpx] = useState<string>('0');

  const client = useMemo(() => {
    try {
      if (!chainId) return null;
      return createPublicClient({ chain: chainForId(chainId), transport: http() });
    } catch {
      return null;
    }
  }, [chainId]);

  useEffect(() => {
    (async () => {
      if (!client || !evmAddress || !chainId) return;
      setLoading(true);
      try {
        const [nativeBal, usdcRaw, usdcDec, spxRaw, spxDec] = await Promise.all([
          client.getBalance({ address: evmAddress }),
          client.readContract({ address: USDC[chainId], abi: ERC20_ABI, functionName: 'balanceOf', args: [evmAddress] }),
          client.readContract({ address: USDC[chainId], abi: ERC20_ABI, functionName: 'decimals' }),
          client.readContract({ address: SPX6900[chainId], abi: ERC20_ABI, functionName: 'balanceOf', args: [evmAddress] }),
          client.readContract({ address: SPX6900[chainId], abi: ERC20_ABI, functionName: 'decimals' }),
        ]);
        setNative(formatUnits(nativeBal, 18));
        setUsdc(formatUnits(usdcRaw as bigint, Number(usdcDec)));
        setSpx(formatUnits(spxRaw as bigint, Number(spxDec)));
      } catch (e) {
        // swallow for now; leave zeros
      } finally {
        setLoading(false);
      }
    })();
  }, [client, evmAddress, chainId]);

  return { native, usdc, spx, loading } as const;
}

