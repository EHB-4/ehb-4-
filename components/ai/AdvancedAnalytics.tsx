'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  DollarSign,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  Filter,
  Calendar,
} from 'lucide-react';

interface AnalyticsData {
  period: string;
  revenue: number;
  users: number;
  agents: number;
  performance: number;
  errors: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

/**
 * Advanced Analytics Component
 * Provides detailed analytics and insights for AI Agent system
 */
export default function AdvancedAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock analytics data
  const analyticsData: AnalyticsData[] = [
    { period: 'Jan', revenue: 12500, users: 150, agents: 8, performance: 94, errors: 12 },
    { period: 'Feb', revenue: 15800, users: 180, agents: 10, performance: 96, errors: 8 },
    { period: 'Mar', revenue: 14200, users: 165, agents: 9, performance: 92, errors: 15 },
    { period: 'Apr', revenue: 18900, users: 220, agents: 12, performance: 98, errors: 5 },
    { period: 'May', revenue: 22100, users: 250, agents: 15, performance: 97, errors: 7 },
    { period: 'Jun', revenue: 25800, users: 280, agents: 18, performance: 99, errors: 3 },
  ];

  const currentData = analyticsData[analyticsData.length - 1];
  const previousData = analyticsData[analyticsData.length - 2];

  const calculateGrowth = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const getMetricValue = (metric: string) => {
    switch (metric) {
      case 'revenue':
        return currentData.revenue;
      case 'users':
        return currentData.users;
      case 'agents':
        return currentData.agents;
      case 'performance':
        return currentData.performance;
      case 'errors':
        return currentData.errors;
      default:
        return 0;
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'revenue':
        return DollarSign;
      case 'users':
        return Users;
      case 'agents':
        return Activity;
      case 'performance':
        return Target;
      case 'errors':
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'revenue':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'users':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'agents':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300';
      case 'performance':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'errors':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const metrics = [
    { key: 'revenue', label: 'Revenue', prefix: '$', suffix: 'K' },
    { key: 'users', label: 'Active Users', prefix: '', suffix: '' },
    { key: 'agents', label: 'Active Agents', prefix: '', suffix: '' },
    { key: 'performance', label: 'Performance', prefix: '', suffix: '%' },
    { key: 'errors', label: 'Errors', prefix: '', suffix: '' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => {
          const Icon = getMetricIcon(metric.key);
          const currentValue = getMetricValue(metric.key);
          const previousValue = previousData ? getMetricValue(metric.key) : currentValue;
          const growth = calculateGrowth(currentValue, previousValue);
          const isPositive = parseFloat(growth) >= 0;

          return (
            <motion.div
              key={metric.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${getMetricColor(metric.key)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {growth}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.prefix}
                  {currentValue.toLocaleString()}
                  {metric.suffix}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            <select
              value={selectedMetric}
              onChange={e => setSelectedMetric(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="revenue">Revenue</option>
              <option value="users">Users</option>
              <option value="agents">Agents</option>
            </select>
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">Revenue trend chart</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Metrics
          </h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">Performance chart</p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Revenue increased by 15.7%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Compared to last month</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  User growth steady at 12%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Monthly active users</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Error rate decreased by 60%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Improved system stability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Activity className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Agent performance at 99%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">System uptime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
