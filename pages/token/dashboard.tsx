import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContractReadOnly } from '@/lib/contracts';
import TokenLockCard from '@/components/token/TokenLockCard';
import TransactionCharts from '@/components/token/TransactionCharts';

interface TokenStats {
  totalLocked: bigint;
  totalRewards: bigint;
  pendingRewards: bigint;
  lockCount: number;
  unlockCount: number;
}

export default function TokenDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userAddress, setUserAddress] = useState<string>('');
  const [stats, setStats] = useState<TokenStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const getAddress = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setUserAddress(address);
        }
      } catch (err) {
        setError('Failed to get wallet address. Please make sure your wallet is connected.');
      }
    };

    getAddress();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      if (!userAddress) return;

      try {
        setLoading(true);
        const contract = await getContractReadOnly();

        // Fetch all stats in parallel
        const [totalLocked, totalRewards, pendingRewards, lockCount, unlockCount] =
          await Promise.all([
            contract.lockedBalanceOf(userAddress),
            contract.getTotalRewards(userAddress),
            contract.getPendingRewards(),
            contract.getLockCount(userAddress),
            contract.getUnlockCount(userAddress),
          ]);

        setStats({
          totalLocked,
          totalRewards,
          pendingRewards,
          lockCount,
          unlockCount,
        });
      } catch (err) {
        setError('Failed to fetch token statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userAddress]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Token Dashboard</h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Locked</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(stats.totalLocked)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Rewards</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(stats.totalRewards)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Pending Rewards</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(stats.pendingRewards)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Operations</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.lockCount + stats.unlockCount}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {stats.lockCount} locks, {stats.unlockCount} unlocks
              </p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lock Status */}
          {userAddress && (
            <div className="bg-white rounded-lg shadow">
              <TokenLockCard userAddress={userAddress} />
            </div>
          )}

          {/* Transaction Charts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction History</h2>
            <TransactionCharts transactions={[]} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/token/operations')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Lock Tokens
          </button>
          <button
            onClick={() => router.push('/token/operations')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Unlock Tokens
          </button>
          <button
            onClick={() => router.push('/token/operations')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Claim Rewards
          </button>
        </div>
      </div>
    </div>
  );
}
