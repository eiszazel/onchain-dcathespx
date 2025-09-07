// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_URL || 'https://onchain-app-template.vercel.app';

// Add your API KEY from the Coinbase Developer Portal
export const NEXT_PUBLIC_CDP_API_KEY = process.env.NEXT_PUBLIC_CDP_API_KEY;
export const NEXT_PUBLIC_WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

// Production validation
if (typeof window === 'undefined') {
  // Server-side validation
  if (process.env.NODE_ENV === 'production') {
    if (!NEXT_PUBLIC_CDP_API_KEY) {
      console.warn('⚠️ NEXT_PUBLIC_CDP_API_KEY is required for production');
    }
    if (!NEXT_PUBLIC_WC_PROJECT_ID) {
      console.warn('⚠️ NEXT_PUBLIC_WC_PROJECT_ID is required for production wallet connections');
    }
  }
}
