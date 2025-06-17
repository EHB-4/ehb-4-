import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContract } from '@/lib/contracts';
import { toast } from 'react-hot-toast';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface AnalyticsData {
  totalLocks: number;
  totalUnlocks: number;
  totalRewards: number;
  totalReferrals: number;
  totalVolume: bigint;
  averageLockAmount: bigint;
  averageLockDuration: number;
  successRate: number;
  timeSeriesData: {
    date: string;
    locks: number;
    unlocks: number;
    rewards: number;
    volume: number;
  }[];
  distributionData: {
    name: string;
    value: number;
  }[];
  topReferrals: {
    address: string;
    amount: bigint;
    rewards: bigint;
  }[];
  recentActivity: {
    type: string;
    amount: bigint;
    timestamp: number;
    status: string;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function TokenAnalytics() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [data, setData] = useState<AnalyticsData | null>(null);

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
        const mockData: AnalyticsData = {
          totalLocks: 25,
          totalUnlocks: 15,
          totalRewards: 100,
          totalReferrals: 10,
          totalVolume: ethers.parseEther('50000'),
          averageLockAmount: ethers.parseEther('2000'),
          averageLockDuration: 45,
          successRate: 95.5,
          timeSeriesData: [
            {
              date: '2024-01-01',
              locks: 5,
              unlocks: 2,
              rewards: 10,
              volume: 1000,
            },
            {
              date: '2024-01-02',
              locks: 3,
              unlocks: 1,
              rewards: 8,
              volume: 800,
            },
            // Add more mock data points...
          ],
          distributionData: [
            { name: 'Locks', value: 25 },
            { name: 'Unlocks', value: 15 },
            { name: 'Rewards', value: 100 },
            { name: 'Referrals', value: 10 },
          ],
          topReferrals: [
            {
              address: '0x123...abc',
              amount: ethers.parseEther('5000'),
              rewards: ethers.parseEther('250'),
            },
            {
              address: '0x456...def',
              amount: ethers.parseEther('3000'),
              rewards: ethers.parseEther('150'),
            },
          ],
          recentActivity: [
            {
              type: 'lock',
              amount: ethers.parseEther('1000'),
              timestamp: Date.now() - 3600000,
              status: 'completed',
            },
            {
              type: 'unlock',
              amount: ethers.parseEther('500'),
              timestamp: Date.now() - 7200000,
              status: 'completed',
            },
          ],
        };

        setData(mockData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        toast.error('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded"></div>
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Time Range:</label>
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value as typeof timeRange)}
              className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
              title="Select Time Range"
              aria-label="Select Time Range"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Volume</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {ethers.formatEther(data.totalVolume)} EHBGC
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Lock Amount</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {ethers.formatEther(data.averageLockAmount)} EHBGC
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Lock Duration</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {data.averageLockDuration} days
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{data.successRate}%</p>
          </div>
        </div>

        {/* Activity Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Time Series Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="locks" stroke="#0088FE" />
                  <Line type="monotone" dataKey="unlocks" stroke="#00C49F" />
                  <Line type="monotone" dataKey="rewards" stroke="#FFBB28" />
                  <Line type="monotone" dataKey="volume" stroke="#FF8042" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Referrals */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Referrals</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lock Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rewards
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.topReferrals.map((referral, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {referral.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ethers.formatEther(referral.amount)} EHBGC
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ethers.formatEther(referral.rewards)} EHBGC
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {data.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activity.type === 'lock'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {activity.type === 'lock' ? '🔒' : '🔓'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {ethers.formatEther(activity.amount)} EHBGC
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
