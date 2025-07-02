'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  TrendingUpIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  PackageIcon,
  TruckIcon,
  CreditCardIcon,
  WalletIcon,
  BarChart3Icon,
  PieChartIcon,
  ActivityIcon,
} from 'lucide-react';
import Link from 'next/link';
import { GoSellrAnalytics } from '@/types/gosellr';

// ========================================
// 1. GOSELLR ANALYTICS PAGE
// ========================================

export default function GoSellrAnalyticsPage() {
  const [analytics, setAnalytics] = useState<GoSellrAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // ========================================
  // 2. COMPONENT INITIALIZATION
  // ========================================

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      // Simulate API call
      const data: GoSellrAnalytics = {
        totalRevenue: 45600.5,
        monthlyRevenue: 8900.25,
        totalOrders: 234,
        pendingOrders: 12,
        totalProducts: 45,
        lowStockProducts: 3,
        customerRating: 4.8,
        totalCustomers: 189,
        newCustomers: 23,
        disputeRate: 0.02,
        completionRate: 0.98,
        averageOrderValue: 194.87,
        topSellingCategory: 'Electronics',
        blockchainTransactions: 156,
        escrowFunds: 8900.5,
        aiTrustScore: 92,
        aiRiskScore: 8,
      };

      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 3. UTILITY FUNCTIONS
  // ========================================

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'revenue':
        return CurrencyDollarIcon;
      case 'orders':
        return ShoppingBagIcon;
      case 'customers':
        return UserGroupIcon;
      case 'rating':
        return StarIcon;
      default:
        return ChartBarIcon;
    }
  };

  // ========================================
  // 4. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No analytics data</h3>
          <p className="text-gray-600">Analytics data is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/gosellr" className="text-blue-600 hover:text-blue-700">
                ← Back to GoSellr
              </Link>
              <div className="ml-8">
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-sm text-gray-500">Track your business performance</p>
              </div>
            </div>

            {/* Time range selector */}
            <div className="flex items-center space-x-2">
              <select
                value={timeRange}
                onChange={e => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(analytics.totalRevenue)}
            change="+12.5%"
            changeType="positive"
            icon={CurrencyDollarIcon}
          />
          <MetricCard
            title="Total Orders"
            value={analytics.totalOrders.toString()}
            change="+8.2%"
            changeType="positive"
            icon={ShoppingBagIcon}
          />
          <MetricCard
            title="Customer Rating"
            value={analytics.customerRating.toFixed(1)}
            change="+0.2"
            changeType="positive"
            icon={StarIcon}
          />
          <MetricCard
            title="AI Trust Score"
            value={analytics.aiTrustScore.toString()}
            change="+5"
            changeType="positive"
            icon={ShieldCheckIcon}
          />
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Monthly Revenue</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(analytics.monthlyRevenue)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Average Order Value</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(analytics.averageOrderValue)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Escrow Funds</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(analytics.escrowFunds)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Blockchain Transactions</span>
                <span className="text-sm font-medium text-gray-900">
                  {analytics.blockchainTransactions}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Customers</span>
                <span className="text-sm font-medium text-gray-900">
                  {analytics.totalCustomers}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">New Customers</span>
                <span className="text-sm font-medium text-gray-900">{analytics.newCustomers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Customer Rating</span>
                <span className="text-sm font-medium text-gray-900">
                  {analytics.customerRating.toFixed(1)}/5.0
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Completion Rate</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatPercentage(analytics.completionRate)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Pending Orders</span>
                <span className="text-sm font-medium text-gray-900">{analytics.pendingOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Dispute Rate</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatPercentage(analytics.disputeRate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Top Selling Category</span>
                <span className="text-sm font-medium text-gray-900">
                  {analytics.topSellingCategory}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">AI Risk Score</span>
                <span className="text-sm font-medium text-gray-900">
                  {analytics.aiRiskScore}/100
                </span>
              </div>
            </div>
          </div>

          {/* Product Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Products</span>
                <span className="text-sm font-medium text-gray-900">{analytics.totalProducts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Low Stock Products</span>
                <span className="text-sm font-medium text-gray-900">
                  {analytics.lowStockProducts}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">AI Trust Score</span>
                <span className="text-sm font-medium text-gray-900">
                  {analytics.aiTrustScore}/100
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Performance</span>
                <span className="text-sm font-medium text-green-600">Excellent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3Icon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Revenue chart will be displayed here</p>
              </div>
            </div>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Distribution</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChartIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Order distribution chart will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">Excellent</h4>
              <p className="text-xs text-gray-500">Overall performance</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUpIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">Growing</h4>
              <p className="text-xs text-gray-500">Revenue trend</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <ShieldCheckIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">Secure</h4>
              <p className="text-xs text-gray-500">Trust score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 5. METRIC CARD COMPONENT
// ========================================

function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div
          className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </div>
      </div>
    </motion.div>
  );
}
