'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Eye,
  Star,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Award,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  X,
} from 'lucide-react';

/**
 * EHB Analytics Dashboard - Comprehensive analytics with charts and insights
 * @returns {JSX.Element} The analytics dashboard component
 */
export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data
  const overviewStats = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Users',
      value: '45,231',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Orders',
      value: '12,847',
      change: '+15.3%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      changeType: 'negative',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const chartData = {
    revenue: [
      { month: 'Jan', value: 45000 },
      { month: 'Feb', value: 52000 },
      { month: 'Mar', value: 48000 },
      { month: 'Apr', value: 61000 },
      { month: 'May', value: 55000 },
      { month: 'Jun', value: 67000 },
      { month: 'Jul', value: 72000 },
      { month: 'Aug', value: 68000 },
      { month: 'Sep', value: 75000 },
      { month: 'Oct', value: 82000 },
      { month: 'Nov', value: 78000 },
      { month: 'Dec', value: 124563 },
    ],
    users: [
      { month: 'Jan', value: 32000 },
      { month: 'Feb', value: 35000 },
      { month: 'Mar', value: 38000 },
      { month: 'Apr', value: 42000 },
      { month: 'May', value: 45000 },
      { month: 'Jun', value: 48000 },
      { month: 'Jul', value: 52000 },
      { month: 'Aug', value: 55000 },
      { month: 'Sep', value: 58000 },
      { month: 'Oct', value: 62000 },
      { month: 'Nov', value: 65000 },
      { month: 'Dec', value: 45231 },
    ],
  };

  const topServices = [
    {
      name: 'GoSellr',
      revenue: '$45,231',
      users: '12.5K',
      growth: '+18.2%',
      category: 'E-Commerce',
    },
    {
      name: 'WMS',
      revenue: '$32,847',
      users: '8.2K',
      growth: '+12.5%',
      category: 'Healthcare',
    },
    {
      name: 'AI Marketplace',
      revenue: '$28,563',
      users: '15.3K',
      growth: '+25.7%',
      category: 'AI & ML',
    },
    {
      name: 'PSS',
      revenue: '$18,942',
      users: '5.1K',
      growth: '+8.9%',
      category: 'Security',
    },
  ];

  const userDemographics = [
    { age: '18-24', percentage: 25 },
    { age: '25-34', percentage: 35 },
    { age: '35-44', percentage: 20 },
    { age: '45-54', percentage: 12 },
    { age: '55+', percentage: 8 },
  ];

  const deviceUsage = [
    { device: 'Desktop', percentage: 45 },
    { device: 'Mobile', percentage: 40 },
    { device: 'Tablet', percentage: 15 },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'purchase',
      description: 'New premium subscription',
      user: 'john.doe@example.com',
      amount: '$99.99',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      type: 'registration',
      description: 'New user registered',
      user: 'jane.smith@example.com',
      amount: null,
      timestamp: '5 minutes ago',
    },
    {
      id: 3,
      type: 'purchase',
      description: 'GoSellr plan upgrade',
      user: 'mike.wilson@example.com',
      amount: '$199.99',
      timestamp: '12 minutes ago',
    },
    {
      id: 4,
      type: 'cancellation',
      description: 'Subscription cancelled',
      user: 'sarah.jones@example.com',
      amount: null,
      timestamp: '1 hour ago',
    },
  ];

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const getChangeIcon = (changeType: string) => {
    return changeType === 'positive' ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  const getChangeColor = (changeType: string) => {
    return changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Track your platform performance and user insights
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={e => setTimeRange(e.target.value)}
                aria-label="Select time range for analytics data"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1">
                  {getChangeIcon(stat.changeType)}
                  <span className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Monthly Revenue
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.revenue.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{
                      height: `${
                        (item.value / Math.max(...chartData.revenue.map(d => d.value))) * 200
                      }px`,
                    }}
                  ></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Users Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Growth</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Active Users
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.users.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-green-500 rounded-t"
                    style={{
                      height: `${
                        (item.value / Math.max(...chartData.users.map(d => d.value))) * 200
                      }px`,
                    }}
                  ></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Services & Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Top Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Top Performing Services
            </h3>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {service.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{service.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">{service.revenue}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {service.users} users
                    </p>
                    <p className="text-sm text-green-600">{service.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Demographics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              User Demographics
            </h3>
            <div className="space-y-4">
              {userDemographics.map((demo, index) => (
                <div key={demo.age} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{demo.age}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${demo.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                      {demo.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Device Usage
              </h4>
              <div className="space-y-3">
                {deviceUsage.map(device => (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {device.device === 'Desktop' && <Monitor className="w-4 h-4 text-gray-400" />}
                      {device.device === 'Mobile' && (
                        <Smartphone className="w-4 h-4 text-gray-400" />
                      )}
                      {device.device === 'Tablet' && <Globe className="w-4 h-4 text-gray-400" />}
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {device.device}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {device.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'purchase'
                        ? 'bg-green-100 text-green-600'
                        : activity.type === 'registration'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {activity.type === 'purchase' && <ShoppingCart className="w-4 h-4" />}
                    {activity.type === 'registration' && <Users className="w-4 h-4" />}
                    {activity.type === 'cancellation' && <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.description}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className="font-semibold text-gray-900 dark:text-white">{activity.amount}</p>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
