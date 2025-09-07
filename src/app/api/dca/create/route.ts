import { NextRequest, NextResponse } from 'next/server';
import { createDcaPlanRequest, isValidAddress } from '../../../../lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const body = await request.json();
    const validatedRequest = createDcaPlanRequest.parse(body);
    
    // Additional business logic validation
    const { amount, frequency, tokenIn, tokenOut } = validatedRequest;
    
    // Validate addresses
    if (!isValidAddress(tokenIn) || !isValidAddress(tokenOut)) {
      return NextResponse.json(
        { error: 'Invalid token addresses' },
        { status: 400 }
      );
    }
    
    // Validate amount is positive
    const numAmount = parseFloat(amount);
    if (numAmount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be positive' },
        { status: 400 }
      );
    }
    
    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    console.log(`DCA create request from IP: ${ip}, Amount: ${amount}, Frequency: ${frequency}`);
    
    // TODO: In production, implement:
    // - User authentication check
    // - Database storage of plan
    // - Proper plan ID generation
    // - Ownership assignment
    // - Plan limits per user
    
    const planId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return NextResponse.json({ 
      planId,
      message: 'DCA plan created successfully'
    });
    
  } catch (error) {
    console.error('DCA create error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

