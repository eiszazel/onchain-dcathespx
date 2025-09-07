const env = (name: string) => process.env[name] as string | undefined;

export const PERMIT2 = env('NEXT_PUBLIC_PERMIT2') ?? '0x000000000022D473030F116dDEE9F6B43aC78BA3';

export const USDC: Record<number, `0x${string}`> = {
  1: (env('NEXT_PUBLIC_USDC_ETH') as `0x${string}`) ?? '0xA0b86991C6218b36c1d19D4a2e9Eb0cE3606eb48',
  8453: (env('NEXT_PUBLIC_USDC_BASE') as `0x${string}`) ?? '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
};

export const SPX6900: Record<number, `0x${string}`> = {
  1: (env('NEXT_PUBLIC_SPX6900_ETH') as `0x${string}`) ?? '0x52c77b0cb827afbad022e6d6caf2c44452edbc39',
  8453: (env('NEXT_PUBLIC_SPX6900_BASE') as `0x${string}`) ?? '0x50dA645f148798F68EF2d7dB7C1CB22A6819bb2C',
};

