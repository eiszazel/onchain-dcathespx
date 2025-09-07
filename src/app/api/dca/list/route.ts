import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    plans: [
      { id: 'demo-1', title: 'SPX6900 • Daily • $6.90', nextRun: 'Tomorrow 09:00 UTC' },
    ],
  });
}

