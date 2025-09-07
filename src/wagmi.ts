'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { NEXT_PUBLIC_WC_PROJECT_ID } from './config';

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? '';
  const missing = !projectId;

  return useMemo(() => {
    // Warn in development if project ID is missing
    if (missing && process.env.NODE_ENV === 'development') {
      console.warn('⚠️ NEXT_PUBLIC_WC_PROJECT_ID is not set. Wallet connections will be limited.');
    }

    const connectors = missing
      ? []
      : connectorsForWallets(
          [
            { groupName: 'Connect Wallet', wallets: [walletConnectWallet] },
            { groupName: 'Popular Wallets', wallets: [metaMaskWallet, rainbowWallet] },
            { groupName: 'Create New Wallet', wallets: [coinbaseWallet] },
          ],
          {
            appName: 'DCA the SPX',
            projectId,
          },
        );

    const wagmiConfig = createConfig({
      chains: [base, baseSepolia],
      // turn off injected provider discovery for better performance
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
      },
    });

    return wagmiConfig;
  }, [projectId, missing]);
}
