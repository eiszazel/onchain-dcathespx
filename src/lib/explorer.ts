import { CHAINS } from './chains';

export function txLink(chainId: number, hash: string) {
  const base = CHAINS[chainId]?.scan ?? 'https://etherscan.io';
  return `${base}/tx/${hash}`;
}

export function addrLink(chainId: number, addr: string) {
  const base = CHAINS[chainId]?.scan ?? 'https://etherscan.io';
  return `${base}/address/${addr}`;
}

