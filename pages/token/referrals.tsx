import { formatDistanceToNow } from 'date-fns';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { getContract } from '@/lib/contracts';

interface Referral {
  id: string;
  referrer: string;
  referee: string;
  timestamp: number;
  status: 'pending' | 'active' | 'completed';
  totalEarnings: bigint;
  lastReward: number;
  lockAmount: bigint;
  lockDuration: number;
}

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: bigint;
  pendingRewards: bigint;
  referralCode: string;
  referralLink: string;
  lastReward: number;
  nextReward: number;
}

export default function TokenReferrals() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'earnings'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contract = await getContract();

        // TODO: Fetch data from contract
        // For now using mock data
        const mockReferrals: Referral[] = [
          {
            id: '1',
            referrer: '0x123...abc',
            referee: '0x456...def',
            timestamp: Date.now() - 86400000, // 1 day ago
            status: 'active',
            totalEarnings: ethers.parseEther('100'),
            lastReward: Date.now() - 43200000, // 12 hours ago
            lockAmount: ethers.parseEther('1000'),
            lockDuration: 30,
          },
          {
            id: '2',
            referrer: '0x123...abc',
            referee: '0x789...ghi',
            timestamp: Date.now() - 172800000, // 2 days ago
            status: 'pending',
            totalEarnings: ethers.parseEther('0'),
            lastReward: 0,
            lockAmount: ethers.parseEther('0'),
            lockDuration: 0,
          },
          {
            id: '3',
            referrer: '0x123...abc',
            referee: '0x012...jkl',
            timestamp: Date.now() - 259200000, // 3 days ago
            status: 'completed',
            totalEarnings: ethers.parseEther('50'),
            lastReward: Date.now() - 86400000, // 1 day ago
            lockAmount: ethers.parseEther('500'),
            lockDuration: 15,
          },
        ];

        const mockStats: ReferralStats = {
          totalReferrals: 10,
          activeReferrals: 5,
          totalEarnings: ethers.parseEther('500'),
          pendingRewards: ethers.parseEther('50'),
          referralCode: 'REF123',
          referralLink: 'https://ehbgc.com/ref/REF123',
          lastReward: Date.now() - 43200000, // 12 hours ago
          nextReward: Date.now() + 43200000, // 12 hours from now
        };

        setReferrals(mockReferrals);
        setStats(mockStats);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        toast.error('Failed to load referrals');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopyLink = async () => {
    if (!stats) return;

    try {
      await navigator.clipboard.writeText(stats.referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast.error('Failed to copy referral link');
    }
  };

  const filteredReferrals = referrals
    .filter(referral => filter === 'all' || referral.status === filter)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
      } else {
        return sortOrder === 'asc'
          ? Number(a.totalEarnings - b.totalEarnings)
          : Number(b.totalEarnings - a.totalEarnings);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Referrals</h1>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Referrals</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalReferrals}</p>
              <p className="mt-1 text-sm text-gray-500">{stats.activeReferrals} active</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(stats.totalEarnings)} EHBGC
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {ethers.formatEther(stats.pendingRewards)} pending
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Last Reward</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {formatDistanceToNow(stats.lastReward, { addSuffix: true })}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Next in {formatDistanceToNow(stats.nextReward, { addSuffix: true })}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Your Referral Code</h3>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-2xl font-semibold text-gray-900">{stats.referralCode}</span>
                <button
                  onClick={handleCopyLink}
                  className={`p-2 rounded-md ${
                    copied
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="Copy Referral Link"
                  aria-label="Copy Referral Link"
                >
                  {copied ? '✓' : '📋'}
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500 break-all">{stats.referralLink}</p>
            </div>
          </div>
        )}

        {/* Referrals List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Filter:</label>
                  <select
                    value={filter}
                    onChange={e => setFilter(e.target.value as typeof filter)}
                    className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                    title="Filter Referrals"
                    aria-label="Filter Referrals"
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                  title="Sort Referrals"
                  aria-label="Sort Referrals"
                >
                  <option value="date">Date</option>
                  <option value="earnings">Earnings</option>
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
            {filteredReferrals.map(referral => (
              <div key={referral.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        referral.status === 'active'
                          ? 'bg-green-100 text-green-600'
                          : referral.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      👥
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {ethers.formatEther(referral.totalEarnings)} EHBGC
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            referral.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : referral.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>Referee: {referral.referee}</p>
                        <p>Lock Amount: {ethers.formatEther(referral.lockAmount)} EHBGC</p>
                        <p>Lock Duration: {referral.lockDuration} days</p>
                        <p>
                          Last Reward:{' '}
                          {referral.lastReward
                            ? formatDistanceToNow(referral.lastReward, { addSuffix: true })
                            : 'None'}
                        </p>
                        <p>Joined {formatDistanceToNow(referral.timestamp, { addSuffix: true })}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredReferrals.length === 0 && (
              <div className="px-6 py-4 text-center text-gray-500">No referrals found</div>
            )}
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">How Referrals Work</h3>
          <ul className="space-y-3 text-blue-700">
            <li>1. Share your unique referral link with friends</li>
            <li>2. When they sign up and lock tokens, you earn rewards</li>
            <li>3. Earn 5% of their lock amount as a reward</li>
            <li>4. Get additional rewards when they lock more tokens</li>
            <li>5. Track your earnings and referral status here</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
