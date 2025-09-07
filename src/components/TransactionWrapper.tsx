'use client';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { Address, ContractFunctionParameters } from 'viem';
import {
  BASE_SEPOLIA_CHAIN_ID,
  mintABI,
  mintContractAddress,
} from '../constants';

export default function TransactionWrapper({ address }: { address: Address }) {
  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: 'mint',
      args: [address],
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(err);
    }
    
    // Show user-friendly error message
    const errorMessage = err.message || 'Transaction failed. Please try again.';
    alert(`Transaction Error: ${errorMessage}`);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
    // In production, you might want to track successful transactions
    if (process.env.NODE_ENV === 'production') {
      // Example: analytics.track('transaction_success', { txHash: response.transactionReceipts?.[0]?.transactionHash });
    }
    
    // Show success message to user
    if (response.transactionReceipts?.[0]?.transactionHash) {
      alert(`Transaction successful! Hash: ${response.transactionReceipts[0].transactionHash}`);
    }
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        contracts={contracts}
        className="w-[450px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]" />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
