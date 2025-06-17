import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContract } from '@/lib/contracts';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RewardsData {
  totalRewards: bigint;
  availableRewards: bigint;
  claimedRewards: bigint;
  lastClaimDate: number | null;
  nextClaimDate: number | null;
  claimCooldown: number;
  rewardsHistory: {
    date: number;
    amount: bigint;
    type: 'earned' | 'claimed';
    source: 'lock' | 'referral' | 'bonus';
  }[];
  timeSeriesData: {
    date: string;
    earned: number;
    claimed: number;
  }[];
  bonusRewards: {
    name: string;
    description: string;
    amount: bigint;
    status: 'available' | 'claimed' | 'expired';
    expiryDate: number;
  }[];
}

export default function TokenRewards() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [data, setData] = useState<RewardsData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'bonus'>('overview');

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
        const mockData: RewardsData = {
          totalRewards: ethers.parseEther('5000'),
          availableRewards: ethers.parseEther('2000'),
          claimedRewards: ethers.parseEther('3000'),
          lastClaimDate: Date.now() - 86400000, // 1 day ago
          nextClaimDate: Date.now() + 86400000, // 1 day from now
          claimCooldown: 24, // hours
          rewardsHistory: [
            {
              date: Date.now() - 3600000, // 1 hour ago
              amount: ethers.parseEther('100'),
              type: 'earned',
              source: 'lock',
            },
            {
              date: Date.now() - 7200000, // 2 hours ago
              amount: ethers.parseEther('50'),
              type: 'claimed',
              source: 'referral',
            },
          ],
          timeSeriesData: [
            {
              date: '2024-01-01',
              earned: 1000,
              claimed: 500,
            },
            {
              date: '2024-01-02',
              earned: 800,
              claimed: 300,
            },
          ],
          bonusRewards: [
            {
              name: 'Early Adopter Bonus',
              description: 'Reward for being an early user',
              amount: ethers.parseEther('500'),
              status: 'available',
              expiryDate: Date.now() + 604800000, // 7 days from now
            },
            {
              name: 'Referral Milestone',
              description: 'Achieved 10 referrals',
              amount: ethers.parseEther('1000'),
              status: 'claimed',
              expiryDate: Date.now() - 86400000, // 1 day ago
            },
          ],
        };

        setData(mockData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        toast.error('Failed to load rewards data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClaim = async () => {
    if (!data) return;

    try {
      setClaiming(true);
      const contract = await getContract();

      // TODO: Call contract to claim rewards
      // For now just showing success message
      toast.success('Rewards claimed successfully!');
    } catch (err) {
      console.error('Failed to claim rewards:', err);
      toast.error('Failed to claim rewards');
    } finally {
      setClaiming(false);
    }
  };

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

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Rewards</h1>

        {/* Rewards Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Rewards</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(data.totalRewards)} EHBGC
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Available Rewards</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(data.availableRewards)} EHBGC
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Claimed Rewards</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(data.claimedRewards)} EHBGC
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleClaim}
              disabled={claiming || data.availableRewards === BigInt(0)}
              className={`w-full px-6 py-3 rounded-lg font-medium ${
                claiming || data.availableRewards === BigInt(0)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {claiming
                ? 'Claiming...'
                : data.availableRewards === BigInt(0)
                  ? 'No Rewards Available'
                  : 'Claim Rewards'}
            </button>
          </div>

          {data.lastClaimDate && (
            <div className="mt-4 text-sm text-gray-500">
              Last claim: {formatDistanceToNow(data.lastClaimDate, { addSuffix: true })}
            </div>
          )}
          {data.nextClaimDate && (
            <div className="text-sm text-gray-500">
              Next claim available: {formatDistanceToNow(data.nextClaimDate, { addSuffix: true })}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {(['overview', 'history', 'bonus'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rewards Overview</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.timeSeriesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="earned" stroke="#0088FE" name="Earned" />
                        <Line type="monotone" dataKey="claimed" stroke="#00C49F" name="Claimed" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">How Rewards Work</h3>
                  <div className="prose max-w-none">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Earn rewards for locking your tokens</li>
                      <li>Additional rewards for referring new users</li>
                      <li>Claim your rewards every {data.claimCooldown} hours</li>
                      <li>Special bonus rewards for achieving milestones</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.rewardsHistory.map((reward, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDistanceToNow(reward.date, { addSuffix: true })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ethers.formatEther(reward.amount)} EHBGC
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              reward.type === 'earned'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {reward.type.charAt(0).toUpperCase() + reward.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              reward.source === 'lock'
                                ? 'bg-purple-100 text-purple-800'
                                : reward.source === 'referral'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-pink-100 text-pink-800'
                            }`}
                          >
                            {reward.source.charAt(0).toUpperCase() + reward.source.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Bonus Tab */}
            {activeTab === 'bonus' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.bonusRewards.map((bonus, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-6 ${
                      bonus.status === 'available'
                        ? 'bg-green-50 border border-green-200'
                        : bonus.status === 'claimed'
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{bonus.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{bonus.description}</p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          bonus.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : bonus.status === 'claimed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {bonus.status.charAt(0).toUpperCase() + bonus.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-semibold text-gray-900">
                        {ethers.formatEther(bonus.amount)} EHBGC
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Expires: {formatDistanceToNow(bonus.expiryDate, { addSuffix: true })}
                      </p>
                    </div>
                    {bonus.status === 'available' && (
                      <button
                        onClick={handleClaim}
                        disabled={claiming}
                        className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Claim Bonus
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
