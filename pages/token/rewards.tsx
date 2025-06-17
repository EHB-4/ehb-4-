import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContractReadOnly, getContract } from '@/lib/contracts';
import { toast } from 'react-hot-toast';

interface RewardStats {
  totalRewards: bigint;
  pendingRewards: bigint;
  lastClaimTimestamp: number;
  rewardRate: number;
  rewardHistory: {
    timestamp: number;
    amount: bigint;
    type: 'claim' | 'accrual';
  }[];
}

export default function TokenRewards() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userAddress, setUserAddress] = useState<string>('');
  const [stats, setStats] = useState<RewardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);

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
    const fetchRewardStats = async () => {
      if (!userAddress) return;

      try {
        setLoading(true);
        const contract = await getContractReadOnly();

        // Fetch reward stats
        const [totalRewards, pendingRewards, lastClaimTimestamp, rewardRate, rewardHistory] =
          await Promise.all([
            contract.getTotalRewards(userAddress),
            contract.getPendingRewards(),
            contract.getLastClaimTimestamp(userAddress),
            contract.getRewardRate(),
            contract.getRewardHistory(userAddress),
          ]);

        setStats({
          totalRewards,
          pendingRewards,
          lastClaimTimestamp,
          rewardRate,
          rewardHistory,
        });
      } catch (err) {
        setError('Failed to fetch reward statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRewardStats();
  }, [userAddress]);

  const handleClaimRewards = async () => {
    if (!userAddress || !stats || stats.pendingRewards <= 0n) return;

    try {
      setClaiming(true);
      const contract = await getContract();
      const tx = await contract.claimRewards();
      await tx.wait();

      // Refresh stats after successful claim
      const [totalRewards, pendingRewards, lastClaimTimestamp] = await Promise.all([
        contract.getTotalRewards(userAddress),
        contract.getPendingRewards(),
        contract.getLastClaimTimestamp(userAddress),
      ]);

      setStats(prev =>
        prev
          ? {
              ...prev,
              totalRewards,
              pendingRewards,
              lastClaimTimestamp,
            }
          : null
      );

      toast.success('Rewards claimed successfully!');
    } catch (err) {
      console.error('Failed to claim rewards:', err);
      toast.error('Failed to claim rewards. Please try again.');
    } finally {
      setClaiming(false);
    }
  };

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Token Rewards</h1>

          {/* Claim Rewards Button */}
          <button
            onClick={handleClaimRewards}
            disabled={!stats || stats.pendingRewards <= 0n || claiming}
            className={`px-6 py-3 rounded-lg font-medium ${
              stats && stats.pendingRewards > 0n && !claiming
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {claiming ? 'Claiming...' : 'Claim Rewards'}
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Reward Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <h3 className="text-sm font-medium text-gray-500">Reward Rate</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.rewardRate}%</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Last Claim</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.lastClaimTimestamp > 0
                  ? new Date(stats.lastClaimTimestamp * 1000).toLocaleDateString()
                  : 'Never'}
              </p>
            </div>
          </div>
        )}

        {/* Reward History */}
        {stats && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Reward History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.rewardHistory.map((reward, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(reward.timestamp * 1000).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            reward.type === 'claim'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {reward.type === 'claim' ? 'Claim' : 'Accrual'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ethers.formatEther(reward.amount)} EHBGC
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
