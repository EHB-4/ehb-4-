import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { QRCodeSVG } from 'qrcode.react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { getContract } from '@/lib/contracts';

interface ReferralData {
  referralCode: string;
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: bigint;
  pendingEarnings: bigint;
  referralLevel: number;
  referralRate: number;
  referralHistory: {
    address: string;
    amount: bigint;
    reward: bigint;
    timestamp: number;
    status: 'pending' | 'completed' | 'failed';
  }[];
  referralStats: {
    level1: {
      count: number;
      earnings: bigint;
    };
    level2: {
      count: number;
      earnings: bigint;
    };
    level3: {
      count: number;
      earnings: bigint;
    };
  };
}

export default function ReferralPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        const contract = await getContract();

        // TODO: Fetch referral data from contract
        // For now using mock data
        const mockData: ReferralData = {
          referralCode: 'REF123',
          totalReferrals: 25,
          activeReferrals: 18,
          totalEarnings: ethers.parseEther('25000'),
          pendingEarnings: ethers.parseEther('5000'),
          referralLevel: 2,
          referralRate: 2.5,
          referralHistory: [
            {
              address: '0x123...abc',
              amount: ethers.parseEther('5000'),
              reward: ethers.parseEther('250'),
              timestamp: Date.now() - 86400000,
              status: 'completed',
            },
            {
              address: '0x456...def',
              amount: ethers.parseEther('3000'),
              reward: ethers.parseEther('150'),
              timestamp: Date.now() - 172800000,
              status: 'pending',
            },
            {
              address: '0x789...ghi',
              amount: ethers.parseEther('2000'),
              reward: ethers.parseEther('100'),
              timestamp: Date.now() - 259200000,
              status: 'completed',
            },
          ],
          referralStats: {
            level1: {
              count: 15,
              earnings: ethers.parseEther('15000'),
            },
            level2: {
              count: 8,
              earnings: ethers.parseEther('8000'),
            },
            level3: {
              count: 2,
              earnings: ethers.parseEther('2000'),
            },
          },
        };

        setReferralData(mockData);
      } catch (err) {
        console.error('Failed to fetch referral data:', err);
        toast.error('Failed to load referral data');
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  const handleCopyReferralLink = () => {
    if (!referralData) return;
    const referralLink = `${window.location.origin}/token?ref=${referralData.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Referral link copied to clipboard!');
  };

  const handleClaimRewards = async () => {
    if (!referralData) return;
    try {
      const contract = await getContract();
      // TODO: Call contract to claim rewards
      toast.success('Rewards claimed successfully!');
    } catch (err) {
      console.error('Failed to claim rewards:', err);
      toast.error('Failed to claim rewards');
    }
  };

  if (loading) {
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
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!referralData) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Referral Program</h1>

        {/* Referral Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Referrals</h3>
            <p className="text-3xl font-bold text-blue-600">{referralData.totalReferrals}</p>
            <p className="text-sm text-gray-500 mt-2">{referralData.activeReferrals} active</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-600">
              {ethers.formatEther(referralData.totalEarnings)} EHBGC
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {ethers.formatEther(referralData.pendingEarnings)} pending
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Referral Level</h3>
            <p className="text-3xl font-bold text-purple-600">Level {referralData.referralLevel}</p>
            <p className="text-sm text-gray-500 mt-2">{referralData.referralRate}% commission</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Referral Code</h3>
            <p className="text-3xl font-bold text-indigo-600">{referralData.referralCode}</p>
            <button
              onClick={handleCopyReferralLink}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              {copied ? 'Copied!' : 'Copy Referral Link'}
            </button>
          </div>
        </div>

        {/* Referral Link and QR Code */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Referral Link</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/token?ref=${referralData.referralCode}`}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <button
                  onClick={handleCopyReferralLink}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Share this link with your friends and earn {referralData.referralRate}% commission
                on their locks!
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-8">
              <QRCodeSVG
                value={`${window.location.origin}/token?ref=${referralData.referralCode}`}
                size={128}
                level="H"
                includeMargin
              />
            </div>
          </div>
        </div>

        {/* Referral Stats */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Referral Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Level 1</h4>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {referralData.referralStats.level1.count}
              </p>
              <p className="text-sm text-gray-500">
                {ethers.formatEther(referralData.referralStats.level1.earnings)} EHBGC
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Level 2</h4>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {referralData.referralStats.level2.count}
              </p>
              <p className="text-sm text-gray-500">
                {ethers.formatEther(referralData.referralStats.level2.earnings)} EHBGC
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Level 3</h4>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {referralData.referralStats.level3.count}
              </p>
              <p className="text-sm text-gray-500">
                {ethers.formatEther(referralData.referralStats.level3.earnings)} EHBGC
              </p>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Referral History</h3>
              <button
                onClick={handleClaimRewards}
                disabled={referralData.pendingEarnings === BigInt(0)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  referralData.pendingEarnings === BigInt(0)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Claim Rewards
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reward
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referralData.referralHistory.map((referral, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {referral.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ethers.formatEther(referral.amount)} EHBGC
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ethers.formatEther(referral.reward)} EHBGC
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(referral.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          referral.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : referral.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
