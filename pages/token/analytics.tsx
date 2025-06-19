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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { getContract } from '@/lib/contracts';

interface AnalyticsData {
  totalLocks: number;
  totalUnlocks: number;
  totalClaims: number;
  totalReferrals: number;
  totalBonuses: number;
  totalLockedAmount: bigint;
  totalUnlockedAmount: bigint;
  totalClaimedAmount: bigint;
  totalReferralAmount: bigint;
  totalBonusAmount: bigint;
  lockHistory: {
    date: string;
    amount: number;
  }[];
  unlockHistory: {
    date: string;
    amount: number;
  }[];
  claimHistory: {
    date: string;
    amount: number;
  }[];
  referralHistory: {
    date: string;
    amount: number;
  }[];
  bonusHistory: {
    date: string;
    amount: number;
  }[];
  lockDistribution: {
    name: string;
    value: number;
  }[];
  referralDistribution: {
    name: string;
    value: number;
  }[];
  bonusDistribution: {
    name: string;
    value: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function TokenAnalytics() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const contract = await getContract();

        // TODO: Fetch analytics from contract
        // For now using mock data
        const mockData: AnalyticsData = {
          totalLocks: 150,
          totalUnlocks: 45,
          totalClaims: 300,
          totalReferrals: 25,
          totalBonuses: 50,
          totalLockedAmount: ethers.parseEther('1000000'),
          totalUnlockedAmount: ethers.parseEther('300000'),
          totalClaimedAmount: ethers.parseEther('50000'),
          totalReferralAmount: ethers.parseEther('25000'),
          totalBonusAmount: ethers.parseEther('75000'),
          lockHistory: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
            amount: Math.random() * 1000,
          })),
          unlockHistory: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
            amount: Math.random() * 500,
          })),
          claimHistory: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
            amount: Math.random() * 100,
          })),
          referralHistory: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
            amount: Math.random() * 50,
          })),
          bonusHistory: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
            amount: Math.random() * 75,
          })),
          lockDistribution: [
            { name: '30 Days', value: 40 },
            { name: '60 Days', value: 30 },
            { name: '90 Days', value: 20 },
            { name: '180 Days', value: 7 },
            { name: '365 Days', value: 3 },
          ],
          referralDistribution: [
            { name: 'Level 1', value: 60 },
            { name: 'Level 2', value: 25 },
            { name: 'Level 3', value: 15 },
          ],
          bonusDistribution: [
            { name: 'Early Adopter', value: 40 },
            { name: 'Long Term', value: 30 },
            { name: 'Volume', value: 20 },
            { name: 'Referral', value: 10 },
          ],
        };

        setAnalyticsData(mockData);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        toast.error('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Token Analytics</h1>
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value as '7d' | '30d' | '90d' | '1y')}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Locked</h3>
            <p className="text-3xl font-bold text-blue-600">
              {ethers.formatEther(analyticsData.totalLockedAmount)} EHBGC
            </p>
            <p className="text-sm text-gray-500 mt-2">{analyticsData.totalLocks} locks</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Rewards</h3>
            <p className="text-3xl font-bold text-green-600">
              {ethers.formatEther(analyticsData.totalClaimedAmount)} EHBGC
            </p>
            <p className="text-sm text-gray-500 mt-2">{analyticsData.totalClaims} claims</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Referrals</h3>
            <p className="text-3xl font-bold text-purple-600">
              {ethers.formatEther(analyticsData.totalReferralAmount)} EHBGC
            </p>
            <p className="text-sm text-gray-500 mt-2">{analyticsData.totalReferrals} referrals</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Bonuses</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {ethers.formatEther(analyticsData.totalBonusAmount)} EHBGC
            </p>
            <p className="text-sm text-gray-500 mt-2">{analyticsData.totalBonuses} bonuses</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Unlocked</h3>
            <p className="text-3xl font-bold text-red-600">
              {ethers.formatEther(analyticsData.totalUnlockedAmount)} EHBGC
            </p>
            <p className="text-sm text-gray-500 mt-2">{analyticsData.totalUnlocks} unlocks</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Net Position</h3>
            <p className="text-3xl font-bold text-indigo-600">
              {ethers.formatEther(
                analyticsData.totalLockedAmount -
                  analyticsData.totalUnlockedAmount +
                  analyticsData.totalClaimedAmount +
                  analyticsData.totalReferralAmount +
                  analyticsData.totalBonusAmount
              )}{' '}
              EHBGC
            </p>
            <p className="text-sm text-gray-500 mt-2">Current balance</p>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-8">
          {/* Lock/Unlock History */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Lock/Unlock History</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={analyticsData.lockHistory.map((lock, i) => ({
                    date: lock.date,
                    locks: lock.amount,
                    unlocks: analyticsData.unlockHistory[i].amount,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="locks" stroke="#0088FE" name="Locks" />
                  <Line type="monotone" dataKey="unlocks" stroke="#FF8042" name="Unlocks" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rewards History */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Rewards History</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.claimHistory.map((claim, i) => ({
                    date: claim.date,
                    claims: claim.amount,
                    referrals: analyticsData.referralHistory[i].amount,
                    bonuses: analyticsData.bonusHistory[i].amount,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="claims" fill="#00C49F" name="Claims" />
                  <Bar dataKey="referrals" fill="#8884D8" name="Referrals" />
                  <Bar dataKey="bonuses" fill="#FFBB28" name="Bonuses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lock Duration Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lock Duration Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.lockDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {analyticsData.lockDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Referral Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Referral Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.referralDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {analyticsData.referralDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bonus Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Bonus Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.bonusDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {analyticsData.bonusDistribution.map((entry, index) => (
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
        </div>
      </div>
    </div>
  );
}
