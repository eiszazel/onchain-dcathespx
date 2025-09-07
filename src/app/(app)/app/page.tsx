"use client";
import { useEvmAddress } from "@coinbase/cdp-hooks";
import { useSelectedChain } from "src/hooks/useSelectedChain";
import { useBalances } from "src/hooks/useBalances";
import WalletActions from "src/components/WalletActions";
import AuthButton from "src/components/AuthButton";
import LoadingSpinner from "src/components/LoadingSpinner";

export default function DashboardPage() {
  const { evmAddress: addr } = useEvmAddress();
  const { chainId } = useSelectedChain(8453);
  const { native, usdc, spx, loading } = useBalances(addr as `0x${string}` | null, chainId);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-xl font-bold text-gray-900">DCA the SPX</a>
            <nav className="hidden sm:flex gap-6">
              <a href="/app" className="text-blue-600 font-medium">Dashboard</a>
              <a href="/plans" className="text-gray-600 hover:text-gray-900">Plans</a>
              <a href="/portfolio" className="text-gray-600 hover:text-gray-900">Portfolio</a>
            </nav>
          </div>
          <WalletActions />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!addr ? (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-gray-600 mb-8">Sign in to view your DCA dashboard and manage your strategies</p>
            <AuthButton />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Your Dashboard</h1>
              <p className="text-gray-600">Manage your DCA strategies and track your portfolio</p>
            </div>

            {/* Balance Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">ETH Balance</h3>
                  {loading && <LoadingSpinner size="sm" />}
                </div>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : `${parseFloat(native).toFixed(4)} ETH`}</p>
                <p className="text-sm text-gray-500">{chainId === 8453 ? 'Base Network' : 'Ethereum'}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">USDC Balance</h3>
                  {loading && <LoadingSpinner size="sm" />}
                </div>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : `$${parseFloat(usdc).toFixed(2)}`}</p>
                <p className="text-sm text-gray-500">Available for DCA</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">SPX6900</h3>
                  {loading && <LoadingSpinner size="sm" />}
                </div>
                <p className="text-2xl font-bold text-yellow-600">{loading ? '...' : parseFloat(spx).toFixed(2)}</p>
                <p className="text-sm text-gray-500">Total holdings</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a 
                    href="/plans/new" 
                    className="block w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
                  >
                    Create New DCA Plan
                  </a>
                  <a 
                    href="/plans" 
                    className="block w-full px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
                  >
                    View All Plans
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="text-center text-gray-500 py-8">
                  <p>No recent activity</p>
                  <p className="text-sm mt-1">Create your first DCA plan to get started</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
