import { Tab } from '@headlessui/react';
import {
  TrophyIcon,
  StarIcon,
  GiftIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

import { getContract } from '@/lib/contracts';

interface RewardData {
  totalRewards: bigint;
  pendingRewards: bigint;
  claimedRewards: bigint;
  lastClaimDate: number | null;
  rewardHistory: {
    date: number;
    amount: bigint;
    type: 'lock' | 'referral' | 'bonus';
    status: 'pending' | 'claimed';
  }[];
  rewardStats: {
    daily: {
      date: string;
      amount: bigint;
    }[];
    monthly: {
      month: string;
      amount: bigint;
    }[];
    byType: {
      type: string;
      amount: bigint;
    }[];
  };
}

interface Reward {
  id: string;
  type: 'lock' | 'referral' | 'bonus' | 'achievement';
  amount: number;
  timestamp: string;
  status: 'pending' | 'claimed' | 'expired';
  details: string;
  multiplier?: number;
}

interface BonusPoint {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  points: number;
  timestamp: string;
  expiresAt: string;
  details: string;
}

interface ReferralEarning {
  id: string;
  referrer: string;
  amount: number;
  timestamp: string;
  status: 'pending' | 'claimed';
  level: number;
  details: string;
}

const rewards: Reward[] = [
  {
    id: '1',
    type: 'lock',
    amount: 50,
    timestamp: '2024-03-15T10:30:00Z',
    status: 'claimed',
    details: 'Monthly lock rewards',
    multiplier: 1.2,
  },
  {
    id: '2',
    type: 'referral',
    amount: 100,
    timestamp: '2024-03-14T15:45:00Z',
    status: 'pending',
    details: 'Referral bonus from user123',
  },
  {
    id: '3',
    type: 'bonus',
    amount: 25,
    timestamp: '2024-03-13T09:15:00Z',
    status: 'claimed',
    details: 'Early adopter bonus',
  },
  {
    id: '4',
    type: 'achievement',
    amount: 200,
    timestamp: '2024-03-12T14:20:00Z',
    status: 'claimed',
    details: 'Security champion achievement',
  },
];

const bonusPoints: BonusPoint[] = [
  {
    id: '1',
    type: 'daily',
    points: 10,
    timestamp: '2024-03-15T00:00:00Z',
    expiresAt: '2024-03-16T00:00:00Z',
    details: 'Daily login bonus',
  },
  {
    id: '2',
    type: 'weekly',
    points: 50,
    timestamp: '2024-03-14T00:00:00Z',
    expiresAt: '2024-03-21T00:00:00Z',
    details: 'Weekly activity bonus',
  },
  {
    id: '3',
    type: 'monthly',
    points: 200,
    timestamp: '2024-03-01T00:00:00Z',
    expiresAt: '2024-04-01T00:00:00Z',
    details: 'Monthly loyalty bonus',
  },
  {
    id: '4',
    type: 'special',
    points: 100,
    timestamp: '2024-03-10T00:00:00Z',
    expiresAt: '2024-03-17T00:00:00Z',
    details: 'Platform launch celebration',
  },
];

const referralEarnings: ReferralEarning[] = [
  {
    id: '1',
    referrer: 'user123',
    amount: 50,
    timestamp: '2024-03-15T10:30:00Z',
    status: 'claimed',
    level: 1,
    details: 'First level referral',
  },
  {
    id: '2',
    referrer: 'user456',
    amount: 25,
    timestamp: '2024-03-14T15:45:00Z',
    status: 'pending',
    level: 2,
    details: 'Second level referral',
  },
  {
    id: '3',
    referrer: 'user789',
    amount: 10,
    timestamp: '2024-03-13T09:15:00Z',
    status: 'claimed',
    level: 3,
    details: 'Third level referral',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function RewardsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rewardData, setRewardData] = useState<RewardData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        setLoading(true);
        const contract = await getContract();

        // TODO: Fetch reward data from contract
        // For now using mock data
        const mockData: RewardData = {
          totalRewards: ethers.parseEther('50000'),
          pendingRewards: ethers.parseEther('5000'),
          claimedRewards: ethers.parseEther('45000'),
          lastClaimDate: Date.now() - 86400000, // 1 day ago
          rewardHistory: [
            {
              date: Date.now() - 3600000, // 1 hour ago
              amount: ethers.parseEther('1000'),
              type: 'lock',
              status: 'pending',
            },
            {
              date: Date.now() - 86400000, // 1 day ago
              amount: ethers.parseEther('2000'),
              type: 'referral',
              status: 'claimed',
            },
            {
              date: Date.now() - 172800000, // 2 days ago
              amount: ethers.parseEther('1500'),
              type: 'bonus',
              status: 'claimed',
            },
          ],
          rewardStats: {
            daily: Array.from({ length: 30 }, (_, i) => ({
              date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString(),
              amount: ethers.parseEther((Math.random() * 1000).toFixed(2)),
            })),
            monthly: Array.from({ length: 12 }, (_, i) => ({
              month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
              amount: ethers.parseEther((Math.random() * 10000).toFixed(2)),
            })),
            byType: [
              {
                type: 'Lock Rewards',
                amount: ethers.parseEther('25000'),
              },
              {
                type: 'Referral Rewards',
                amount: ethers.parseEther('15000'),
              },
              {
                type: 'Bonus Rewards',
                amount: ethers.parseEther('10000'),
              },
            ],
          },
        };

        setRewardData(mockData);
      } catch (err) {
        console.error('Failed to fetch reward data:', err);
        toast.error('Failed to load reward data');
      } finally {
        setLoading(false);
      }
    };

    fetchRewardData();
  }, []);

  const handleClaimRewards = async () => {
    if (!rewardData) return;
    try {
      const contract = await getContract();
      // TODO: Call contract to claim rewards
      toast.success('Rewards claimed successfully!');
    } catch (err) {
      console.error('Failed to claim rewards:', err);
      toast.error('Failed to claim rewards');
    }
  };

  const totalRewards = rewards.reduce((sum, reward) => sum + reward.amount, 0);
  const totalBonusPoints = bonusPoints.reduce((sum, point) => sum + point.points, 0);
  const totalReferralEarnings = referralEarnings.reduce((sum, earning) => sum + earning.amount, 0);

  const chartData = [
    { name: 'Jan', rewards: 4000, bonus: 2400, referrals: 1800 },
    { name: 'Feb', rewards: 3000, bonus: 1398, referrals: 2210 },
    { name: 'Mar', rewards: 2000, bonus: 9800, referrals: 2290 },
    { name: 'Apr', rewards: 2780, bonus: 3908, referrals: 2000 },
    { name: 'May', rewards: 1890, bonus: 4800, referrals: 2181 },
    { name: 'Jun', rewards: 2390, bonus: 3800, referrals: 2500 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!rewardData) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Rewards Center</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrophyIcon className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Rewards</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {ethers.formatEther(rewardData.totalRewards)} EHBGC
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GiftIcon className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Bonus Points</h3>
                <p className="text-2xl font-semibold text-gray-900">{totalBonusPoints} Points</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Referral Earnings</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {ethers.formatEther(ethers.parseEther(totalReferralEarnings.toString()))} EHBGC
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Rewards Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rewards" stroke="#8884d8" />
                <Line type="monotone" dataKey="bonus" stroke="#82ca9d" />
                <Line type="monotone" dataKey="referrals" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabs */}
        <Tab.Group onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Rewards History
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Bonus Points
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Referral Earnings
            </Tab>
          </Tab.List>
          <Tab.Panels>
            {/* Rewards History Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Rewards History</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {rewards.map(reward => (
                    <div key={reward.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {reward.type === 'lock' && (
                              <ChartBarIcon className="h-6 w-6 text-blue-500" />
                            )}
                            {reward.type === 'referral' && (
                              <UserGroupIcon className="h-6 w-6 text-purple-500" />
                            )}
                            {reward.type === 'bonus' && (
                              <GiftIcon className="h-6 w-6 text-yellow-500" />
                            )}
                            {reward.type === 'achievement' && (
                              <TrophyIcon className="h-6 w-6 text-green-500" />
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{reward.details}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(reward.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              reward.status === 'claimed'
                                ? 'bg-green-100 text-green-800'
                                : reward.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {reward.status}
                          </span>
                          <div className="ml-4 text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {reward.amount} EHBGC
                            </p>
                            {reward.multiplier && (
                              <p className="text-xs text-gray-500">
                                {reward.multiplier}x multiplier
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>

            {/* Bonus Points Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Bonus Points</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {bonusPoints.map(point => (
                    <div key={point.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <GiftIcon className="h-6 w-6 text-purple-500" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{point.details}</p>
                            <p className="text-sm text-gray-500">
                              Expires: {new Date(point.expiresAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{point.points} Points</p>
                          <p className="text-xs text-gray-500">
                            {point.type.charAt(0).toUpperCase() + point.type.slice(1)} Bonus
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>

            {/* Referral Earnings Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Referral Earnings</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {referralEarnings.map(earning => (
                    <div key={earning.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <UserGroupIcon className="h-6 w-6 text-blue-500" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{earning.details}</p>
                            <p className="text-sm text-gray-500">From: {earning.referrer}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              earning.status === 'claimed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {earning.status}
                          </span>
                          <div className="ml-4 text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {earning.amount} EHBGC
                            </p>
                            <p className="text-xs text-gray-500">Level {earning.level} Referral</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
