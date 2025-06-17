import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContract } from '@/lib/contracts';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

interface Reward {
  id: string;
  amount: bigint;
  timestamp: number;
  type: 'lock' | 'referral' | 'bonus';
  status: 'pending' | 'claimed' | 'expired';
  lockId?: string;
  referralId?: string;
}

interface RewardStats {
  totalEarned: bigint;
  totalClaimed: bigint;
  pendingRewards: bigint;
  nextReward: number;
  lastClaim: number;
  referralEarnings: bigint;
  bonusEarnings: bigint;
}

export default function TokenRewards() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [stats, setStats] = useState<RewardStats | null>(null);
  const [selectedRewards, setSelectedRewards] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'claimed' | 'expired'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);
        const contract = await getContract();

        // TODO: Fetch rewards from contract
        // For now using mock data
        const mockRewards: Reward[] = [
          {
            id: '1',
            amount: ethers.parseEther('100'),
            timestamp: Date.now() - 86400000, // 1 day ago
            type: 'lock',
            status: 'pending',
            lockId: 'lock1',
          },
          {
            id: '2',
            amount: ethers.parseEther('50'),
            timestamp: Date.now() - 172800000, // 2 days ago
            type: 'referral',
            status: 'claimed',
            referralId: 'ref1',
          },
          {
            id: '3',
            amount: ethers.parseEther('25'),
            timestamp: Date.now() - 259200000, // 3 days ago
            type: 'bonus',
            status: 'expired',
          },
        ];

        const mockStats: RewardStats = {
          totalEarned: ethers.parseEther('1000'),
          totalClaimed: ethers.parseEther('750'),
          pendingRewards: ethers.parseEther('250'),
          nextReward: Date.now() + 3600000, // 1 hour from now
          lastClaim: Date.now() - 86400000, // 1 day ago
          referralEarnings: ethers.parseEther('150'),
          bonusEarnings: ethers.parseEther('100'),
        };

        setRewards(mockRewards);
        setStats(mockStats);
      } catch (err) {
        console.error('Failed to fetch rewards:', err);
        toast.error('Failed to load rewards');
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  const handleClaimRewards = async () => {
    if (selectedRewards.length === 0) return;

    try {
      setClaiming(true);
      const contract = await getContract();

      // TODO: Claim rewards through contract
      // For now just showing success message
      toast.success('Rewards claimed successfully!');
      setSelectedRewards([]);
    } catch (err) {
      console.error('Failed to claim rewards:', err);
      toast.error('Failed to claim rewards');
    } finally {
      setClaiming(false);
    }
  };

  const handleSelectReward = (rewardId: string) => {
    setSelectedRewards(prev =>
      prev.includes(rewardId) ? prev.filter(id => id !== rewardId) : [...prev, rewardId]
    );
  };

  const handleSelectAll = () => {
    const pendingRewards = rewards.filter(r => r.status === 'pending').map(r => r.id);
    setSelectedRewards(prev => (prev.length === pendingRewards.length ? [] : pendingRewards));
  };

  const filteredRewards = rewards
    .filter(reward => filter === 'all' || reward.status === filter)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
      } else {
        return sortOrder === 'asc' ? Number(a.amount - b.amount) : Number(b.amount - a.amount);
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rewards</h1>

          <button
            onClick={handleClaimRewards}
            disabled={claiming || selectedRewards.length === 0}
            className={`px-6 py-3 rounded-lg font-medium ${
              claiming || selectedRewards.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {claiming ? 'Claiming...' : `Claim Selected (${selectedRewards.length})`}
          </button>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Earned</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(stats.totalEarned)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Pending Rewards</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(stats.pendingRewards)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Referral Earnings</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(stats.referralEarnings)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Bonus Earnings</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(stats.bonusEarnings)} EHBGC
              </p>
            </div>
          </div>
        )}

        {/* Rewards List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSelectAll}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  {selectedRewards.length === rewards.filter(r => r.status === 'pending').length
                    ? 'Deselect All'
                    : 'Select All'}
                </button>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Filter:</label>
                  <select
                    value={filter}
                    onChange={e => setFilter(e.target.value as typeof filter)}
                    className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                    title="Filter Rewards"
                    aria-label="Filter Rewards"
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="claimed">Claimed</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                  title="Sort Rewards"
                  aria-label="Sort Rewards"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                </select>

                <button
                  onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                  className="text-gray-400 hover:text-gray-500"
                  title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                  aria-label={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredRewards.map(reward => (
              <div key={reward.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {reward.status === 'pending' && (
                      <input
                        type="checkbox"
                        checked={selectedRewards.includes(reward.id)}
                        onChange={() => handleSelectReward(reward.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        title={`Select reward ${reward.id}`}
                        aria-label={`Select reward ${reward.id}`}
                      />
                    )}

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {ethers.formatEther(reward.amount)} EHBGC
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            reward.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : reward.status === 'claimed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {reward.type.charAt(0).toUpperCase() + reward.type.slice(1)} Reward
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    {formatDistanceToNow(reward.timestamp, { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}

            {filteredRewards.length === 0 && (
              <div className="px-6 py-4 text-center text-gray-500">No rewards found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
