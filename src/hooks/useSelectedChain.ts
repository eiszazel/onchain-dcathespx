"use client";
import { useEffect, useState } from "react";

const KEY = 'selectedChain';

export function useSelectedChain(defaultChainId: number = 8453) {
  const [chainId, setChainId] = useState<number>(defaultChainId);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setChainId(Number(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, String(chainId));
    } catch {}
  }, [chainId]);

  return { chainId, setChainId } as const;
}

