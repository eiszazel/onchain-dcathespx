export function formatUsd(n?: number | bigint) {
  if (n == null) return '$0.00';
  const num = typeof n === 'bigint' ? Number(n) : n;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

export function formatToken(n?: number | bigint, symbol = '') {
  if (n == null) return `0 ${symbol}`.trim();
  const num = typeof n === 'bigint' ? Number(n) : n;
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(num)} ${symbol}`.trim();
}

export function truncateAddress(addr?: string, size = 4) {
  if (!addr) return '';
  return `${addr.slice(0, 2 + size)}…${addr.slice(-size)}`;
}

