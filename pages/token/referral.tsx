import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContract } from '@/lib/contracts';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';

interface ReferralData {
  referralCode: string;
  referredBy: string | null;
  totalReferrals: number;
  totalEarnings: bigint;
  referralLevel: number;
  referralRate: number;
  referrals: {
    address: string;
    joinDate: number;
    totalLocks: number;
    totalVolume: bigint;
    rewards: bigint;
    status: 'active' | 'inactive';
  }[];
  rewardsHistory: {
    date: number;
    amount: bigint;
    referral: string;
    type: 'lock' | 'unlock';
  }[];
}

export default function TokenReferral() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReferralData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'rewards'>('overview');
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
        const mockData: ReferralData = {
          referralCode: 'REF123456',
          referredBy: '0x789...def',
          totalReferrals: 5,
          totalEarnings: ethers.parseEther('1000'),
          referralLevel: 2,
          referralRate: 5,
          referrals: [
            {
              address: '0x123...abc',
              joinDate: Date.now() - 2592000000, // 30 days ago
              totalLocks: 3,
              totalVolume: ethers.parseEther('5000'),
              rewards: ethers.parseEther('250'),
              status: 'active',
            },
            {
              address: '0x456...def',
              joinDate: Date.now() - 1728000000, // 20 days ago
              totalLocks: 2,
              totalVolume: ethers.parseEther('3000'),
              rewards: ethers.parseEther('150'),
              status: 'active',
            },
            {
              address: '0x789...ghi',
              joinDate: Date.now() - 864000000, // 10 days ago
              totalLocks: 1,
              totalVolume: ethers.parseEther('1000'),
              rewards: ethers.parseEther('50'),
              status: 'inactive',
            },
          ],
          rewardsHistory: [
            {
              date: Date.now() - 3600000, // 1 hour ago
              amount: ethers.parseEther('100'),
              referral: '0x123...abc',
              type: 'lock',
            },
            {
              date: Date.now() - 7200000, // 2 hours ago
              amount: ethers.parseEther('50'),
              referral: '0x456...def',
              type: 'unlock',
            },
          ],
        };

        setData(mockData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        toast.error('Failed to load referral data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopyCode = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.referralCode);
    setCopied(true);
    toast.success('Referral code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!data) return;
    const shareText = `Join me on EHBGC! Use my referral code: ${data.referralCode}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EHBGC Referral',
          text: shareText,
          url: window.location.origin,
        });
      } catch (err) {
        console.error('Failed to share:', err);
        toast.error('Failed to share referral code');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Referral link copied to clipboard!');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Referral Program</h1>

        {/* Referral Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Stats */}
            <div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Your Referral Code</h3>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex-1 bg-gray-50 rounded-lg p-3 font-mono text-lg">
                      {data.referralCode}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      title="Copy Referral Code"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      title="Share Referral Code"
                    >
                      Share
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Referrals</h3>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                      {data.totalReferrals}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                      {ethers.formatEther(data.totalEarnings)} EHBGC
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Referral Level</h3>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                      Level {data.referralLevel}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Referral Rate</h3>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                      {data.referralRate}%
                    </p>
                  </div>
                </div>

                {data.referredBy && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Referred By</h3>
                    <p className="mt-2 text-lg text-gray-900">{data.referredBy}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - QR Code */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <QRCodeSVG
                  value={`${window.location.origin}?ref=${data.referralCode}`}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>
              <p className="mt-4 text-sm text-gray-500">Scan to share your referral code</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {(['overview', 'referrals', 'rewards'] as const).map(tab => (
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4">How It Works</h3>
                  <div className="prose max-w-none">
                    <ol className="list-decimal list-inside space-y-4">
                      <li>Share your unique referral code with friends and community members</li>
                      <li>When they join using your code, they become your referral</li>
                      <li>Earn {data.referralRate}% of their lock amounts as rewards</li>
                      <li>Level up by referring more users and increase your earnings</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Level Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900">Level 1</h4>
                      <p className="text-sm text-gray-500 mt-1">5% referral rate</p>
                      <p className="text-sm text-gray-500">0-5 referrals</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900">Level 2</h4>
                      <p className="text-sm text-gray-500 mt-1">7.5% referral rate</p>
                      <p className="text-sm text-gray-500">6-20 referrals</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900">Level 3</h4>
                      <p className="text-sm text-gray-500 mt-1">10% referral rate</p>
                      <p className="text-sm text-gray-500">21+ referrals</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Referrals Tab */}
            {activeTab === 'referrals' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Locks
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Volume
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rewards
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.referrals.map((referral, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {referral.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDistanceToNow(referral.joinDate, { addSuffix: true })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {referral.totalLocks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ethers.formatEther(referral.totalVolume)} EHBGC
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ethers.formatEther(referral.rewards)} EHBGC
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              referral.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
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
            )}

            {/* Rewards Tab */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
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
                          Referral
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {reward.referral}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                reward.type === 'lock'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {reward.type.charAt(0).toUpperCase() + reward.type.slice(1)}
                            </span>
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
      </div>
    </div>
  );
}
