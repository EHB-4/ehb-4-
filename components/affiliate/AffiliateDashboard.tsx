"use client";

'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import {
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiGift,
  FiShare2,
  FiSettings,
  FiDownload,
  FiAward,
} from 'react-icons/fi';

interface AffiliateStats {
  monthlyEarnings: number;
  monthlyWithdrawals: number;
  activeBonuses: number;
  referralCount: number;
  currentBalance: number;
  totalEarnings: number;
}

interface AffiliateUser {
  id: string;
  referralCode: string;
  sqlLevel: string;
  affiliateRank: string;
  currentBalance: number;
  totalEarnings: number;
  isActive: boolean;
  user: {
    name: string;
    email: string;
  };
}

const AffiliateDashboard: React.FC = () => {
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [affiliate, setAffiliate] = useState<AffiliateUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate loading affiliate data
    setTimeout(() => {
      setStats({
        monthlyEarnings: 1250.5,
        monthlyWithdrawals: 800.0,
        activeBonuses: 3,
        referralCount: 15,
        currentBalance: 450.5,
        totalEarnings: 3200.75,
      });

      setAffiliate({
        id: '1',
        referralCode: 'JOHN_ABC123',
        sqlLevel: 'NORMAL',
        affiliateRank: 'SILVER',
        currentBalance: 450.5,
        totalEarnings: 3200.75,
        isActive: true,
        user: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      });

      setLoading(false);
    }, 1000);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiTrendingUp },
    { id: 'referrals', label: 'Referrals', icon: FiUsers },
    { id: 'earnings', label: 'Earnings', icon: FiDollarSign },
    { id: 'bonuses', label: 'Bonuses', icon: FiGift },
    { id: 'tools', label: 'Tools', icon: FiShare2 },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading affiliate dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-teal-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Affiliate Dashboard</h1>
          <p className="text-indigo-100">
            Welcome back, {affiliate?.user.name}! Track your earnings and grow your network.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiDollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Current Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats?.currentBalance.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiTrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Monthly Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats?.monthlyEarnings.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiUsers className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Total Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.referralCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiGift className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Active Bonuses</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.activeBonuses}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Rank & Level Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">SQL Level:</span>
                        <span className="font-semibold text-indigo-600">{affiliate?.sqlLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Affiliate Rank:</span>
                        <span className="font-semibold text-purple-600">
                          {affiliate?.affiliateRank}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Referral Code:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {affiliate?.referralCode}
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        <FiDownload className="w-4 h-4 inline mr-2" />
                        Withdraw Earnings
                      </button>
                      <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                        <FiShare2 className="w-4 h-4 inline mr-2" />
                        Share Products
                      </button>
                      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                        <FiAward className="w-4 h-4 inline mr-2" />
                        View Bonuses
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <FiDollarSign className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Commission Earned</p>
                          <p className="text-sm text-gray-500">Level 1 referral purchase</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">+$25.00</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FiUsers className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">New Referral</p>
                          <p className="text-sm text-gray-500">Sarah joined via your link</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">+1 Referral</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <FiGift className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Bonus Unlocked</p>
                          <p className="text-sm text-gray-500">Quick Bonus achieved</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-yellow-600">+$100.00</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'referrals' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Referral Network</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600">
                    Referral tree visualization will be implemented here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Earnings History</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600">
                    Detailed earnings breakdown will be implemented here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'bonuses' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Active Bonuses</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600">
                    Bonus tracking and management will be implemented here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Marketing Tools</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600">
                    Product sharing and store creation tools will be implemented here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600">
                    Withdrawal preferences and account settings will be implemented here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
