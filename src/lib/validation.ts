import { z } from 'zod';

// Address validation schema
export const addressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address');

// Transaction validation schemas
export const transactionSchema = z.object({
  to: addressSchema,
  data: z.string().regex(/^0x[a-fA-F0-9]*$/, 'Invalid transaction data'),
  value: z.string().regex(/^0x[a-fA-F0-9]+$/, 'Invalid transaction value'),
  chainId: z.number().positive('Invalid chain ID'),
});

export const dcaPlanSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  amount: z.string().regex(/^\d+(\.\d+)?$/, 'Invalid amount format'),
  frequency: z.enum(['daily', 'weekly', 'monthly'], {
    errorMap: () => ({ message: 'Frequency must be daily, weekly, or monthly' })
  }),
  tokenIn: addressSchema,
  tokenOut: addressSchema,
});

// API request validation
export const createDcaPlanRequest = z.object({
  amount: z.string().min(1, 'Amount is required'),
  frequency: z.string().min(1, 'Frequency is required'),
  tokenIn: addressSchema,
  tokenOut: addressSchema,
});

export const executeDcaPlanRequest = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  signature: z.string().optional(),
});

// Utility functions
export function isValidAddress(address: string): boolean {
  try {
    addressSchema.parse(address);
    return true;
  } catch {
    return false;
  }
}

export function validateTransaction(tx: unknown) {
  return transactionSchema.parse(tx);
}

export function validateDcaPlan(plan: unknown) {
  return dcaPlanSchema.parse(plan);
}

// Rate limiting helpers
export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export const rateLimits = {
  api: { windowMs: 60 * 1000, maxRequests: 100 }, // 100 requests per minute
  transaction: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 transactions per minute
} as const;
