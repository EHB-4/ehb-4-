import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import {
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
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

interface ValidatorData {
  id: string;
  address: string;
  stakeAmount: number;
  rewards: number;
  status: 'active' | 'inactive' | 'pending';
  startDate: Date;
  lastRewardDate: Date;
  performance: number;
}

interface StakingHistory {
  id: string;
  amount: number;
  type: 'stake' | 'unstake';
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  transactionHash: string;
}

interface RewardHistory {
  id: string;
  amount: number;
  date: Date;
  type: 'block' | 'transaction' | 'referral';
  status: 'paid' | 'pending';
  transactionHash: string;
}

export default function ValidatorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [validatorData, setValidatorData] = useState<ValidatorData | null>(null);
  const [stakingHistory, setStakingHistory] = useState<StakingHistory[]>([]);
  const [rewardHistory, setRewardHistory] = useState<RewardHistory[]>([]);
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      // TODO: Fetch validator data from API
      setLoading(false);
    }
  }, [status, router]);

  const handleStake = async () => {
    try {
      // TODO: Implement staking logic
      toast.success('Staking request submitted successfully');
    } catch (error) {
      toast.error('Failed to submit staking request');
    }
  };

  const handleUnstake = async () => {
    try {
      // TODO: Implement unstaking logic
      toast.success('Unstaking request submitted successfully');
    } catch (error) {
      toast.error('Failed to submit unstaking request');
    }
  };

  const performanceData = [
    { name: 'Jan', performance: 98, rewards: 2400 },
    { name: 'Feb', performance: 95, rewards: 1398 },
    { name: 'Mar', performance: 99, rewards: 9800 },
    { name: 'Apr', performance: 97, rewards: 3908 },
    { name: 'May', performance: 96, rewards: 4800 },
    { name: 'Jun', performance: 98, rewards: 3800 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Validator Dashboard</h1>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Total Stake</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {validatorData?.stakeAmount.toLocaleString() || 0} EHBGC
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Total Rewards</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {validatorData?.rewards.toLocaleString() || 0} EHBGC
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Performance</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {validatorData?.performance || 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance History</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="performance"
                    stroke="#8884d8"
                    name="Performance %"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="rewards"
                    stroke="#82ca9d"
                    name="Rewards"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Staking Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Stake Tokens</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="stakeAmount" className="block text-sm font-medium text-gray-700">
                    Amount to Stake
                  </label>
                  <input
                    type="number"
                    id="stakeAmount"
                    value={stakeAmount}
                    onChange={e => setStakeAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                </div>
                <button
                  onClick={handleStake}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Stake Tokens
                </button>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Unstake Tokens</h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="unstakeAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount to Unstake
                  </label>
                  <input
                    type="number"
                    id="unstakeAmount"
                    value={unstakeAmount}
                    onChange={e => setUnstakeAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                </div>
                <button
                  onClick={handleUnstake}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Unstake Tokens
                </button>
              </div>
            </div>
          </div>

          {/* History Tabs */}
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              <Tab
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                   ${
                     selected
                       ? 'bg-white text-blue-700 shadow'
                       : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                   }`
                }
              >
                Staking History
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                   ${
                     selected
                       ? 'bg-white text-blue-700 shadow'
                       : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                   }`
                }
              >
                Reward History
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-4">
              <Tab.Panel>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stakingHistory.map(history => (
                        <tr key={history.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDistanceToNow(new Date(history.date), { addSuffix: true })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {history.amount} EHBGC
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {history.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                history.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : history.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {history.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {history.transactionHash.slice(0, 8)}...
                            {history.transactionHash.slice(-8)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rewardHistory.map(history => (
                        <tr key={history.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDistanceToNow(new Date(history.date), { addSuffix: true })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {history.amount} EHBGC
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {history.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                history.status === 'paid'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {history.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {history.transactionHash.slice(0, 8)}...
                            {history.transactionHash.slice(-8)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
