import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContractReadOnly } from '@/lib/contracts';
import TransactionCharts from '@/components/token/TransactionCharts';
import TechnicalIndicators from '@/components/token/TechnicalIndicators';
import ChartAnnotations from '@/components/token/ChartAnnotations';

interface AnalyticsData {
  totalVolume: bigint;
  averageLockDuration: number;
  rewardRate: number;
  activeLocks: number;
  totalParticipants: number;
  dailyStats: {
    date: string;
    volume: bigint;
    locks: number;
    unlocks: number;
    rewards: bigint;
  }[];
}

export default function TokenAnalytics() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userAddress, setUserAddress] = useState<string>('');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

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
    const fetchAnalytics = async () => {
      if (!userAddress) return;

      try {
        setLoading(true);
        const contract = await getContractReadOnly();

        // Fetch analytics data
        const [totalVolume, averageLockDuration, rewardRate, activeLocks, totalParticipants] =
          await Promise.all([
            contract.getTotalVolume(),
            contract.getAverageLockDuration(),
            contract.getRewardRate(),
            contract.getActiveLocksCount(),
            contract.getTotalParticipants(),
          ]);

        // Fetch daily stats for the selected time range
        const days =
          timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
        const dailyStats = await contract.getDailyStats(days);

        setAnalyticsData({
          totalVolume,
          averageLockDuration,
          rewardRate,
          activeLocks,
          totalParticipants,
          dailyStats,
        });
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userAddress, timeRange]);

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
          <h1 className="text-3xl font-bold text-gray-900">Token Analytics</h1>

          {/* Time Range Selector */}
          <div className="flex space-x-2">
            {(['7d', '30d', '90d', '1y'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Analytics Overview */}
        {analyticsData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Volume</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(analyticsData.totalVolume)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Average Lock Duration</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {Math.round(analyticsData.averageLockDuration / (24 * 60 * 60))} days
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Reward Rate</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {analyticsData.rewardRate}%
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Active Locks</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {analyticsData.activeLocks}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                from {analyticsData.totalParticipants} participants
              </p>
            </div>
          </div>
        )}

        {/* Charts and Technical Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transaction Charts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction History</h2>
            <TransactionCharts transactions={[]} />
          </div>

          {/* Technical Indicators */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Technical Indicators</h2>
            <TechnicalIndicators
              showRSI={true}
              onRSIChange={() => {}}
              rsiPeriod={14}
              onRSIPeriodChange={() => {}}
              showMACD={true}
              onMACDChange={() => {}}
              macdFastPeriod={12}
              onMACDFastPeriodChange={() => {}}
              macdSlowPeriod={26}
              onMACDSlowPeriodChange={() => {}}
              showBollingerBands={true}
              onBollingerBandsChange={() => {}}
              bollingerPeriod={20}
              onBollingerPeriodChange={() => {}}
              bollingerMultiplier={2}
              onBollingerMultiplierChange={() => {}}
              compareWith="none"
              onCompareWithChange={() => {}}
            />
          </div>

          {/* Chart Annotations */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Market Analysis</h2>
            <ChartAnnotations
              showAnnotations={true}
              onShowAnnotationsChange={() => {}}
              annotationType="line"
              onAnnotationTypeChange={() => {}}
              annotationColor="#000000"
              onAnnotationColorChange={() => {}}
              customIndicators={[]}
              onCustomIndicatorsChange={() => {}}
              onAddAnnotation={() => {}}
              onClearAnnotations={() => {}}
            />
          </div>
        </div>

        {/* Daily Stats Table */}
        {analyticsData && (
          <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Daily Statistics</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Locks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unlocks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rewards
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.dailyStats.map((stat, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(stat.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ethers.formatEther(stat.volume)} EHBGC
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.locks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.unlocks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ethers.formatEther(stat.rewards)} EHBGC
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
