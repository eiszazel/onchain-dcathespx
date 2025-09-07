import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    balances: { usdc: 0, spx: 0, native: 0 },
    positions: [],
  });
}

