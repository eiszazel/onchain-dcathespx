'use client';
import { useState } from 'react';

interface CreateWalletButtonProps {
  className?: string;
  text?: string;
}

export default function CreateWalletButton({ 
  className = '', 
  text = 'Create Wallet' 
}: CreateWalletButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateWallet = async () => {
    setIsLoading(true);
    
    try {
      // Direct user to Coinbase Wallet creation
      const coinbaseWalletUrl = 'https://www.coinbase.com/wallet/downloads';
      
      // Open in new tab
      window.open(coinbaseWalletUrl, '_blank', 'noopener,noreferrer');
      
      // Show helpful message
      setTimeout(() => {
        alert('After creating your wallet, come back here and use "Connect Wallet" to link it to this app.');
      }, 500);
      
    } catch (error) {
      console.error('Error opening wallet creation:', error);
      alert('Unable to open wallet creation page. Please visit coinbase.com/wallet manually.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCreateWallet}
      disabled={isLoading}
      className={`
        inline-flex items-center justify-center px-4 py-2 
        border border-gray-300 rounded-md shadow-sm text-sm font-medium 
        text-gray-700 bg-white hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Opening...
        </>
      ) : (
        <>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {text}
        </>
      )}
    </button>
  );
}
