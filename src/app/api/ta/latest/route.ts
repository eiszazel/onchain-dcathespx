import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    eth: { sentiment: 'neutral', summary: 'Watching support; buyers cautious.' },
    base: { sentiment: 'bullish', summary: 'Momentum strong; pullbacks get bought.' },
  });
}

