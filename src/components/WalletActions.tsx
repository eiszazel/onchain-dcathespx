'use client';
import { useAccount } from 'wagmi';
import WalletWrapper from './WalletWrapper';
import CreateWalletButton from './CreateWalletButton';

interface WalletActionsProps {
  className?: string;
}

export default function WalletActions({ className = '' }: WalletActionsProps) {
  const { isConnected } = useAccount();

  if (isConnected) {
    return (
      <WalletWrapper 
        className={className}
        text="Connected"
      />
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <WalletWrapper 
        className="min-w-[120px] bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
        text="Connect Wallet"
      />
      <CreateWalletButton 
        className="min-w-[120px]"
        text="Create Wallet"
      />
    </div>
  );
}
