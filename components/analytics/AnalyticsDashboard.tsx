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
  Calendar,
  Filter,
  Download,
  Eye,
  BarChart3,
  PieChart,
  LineChart,
  Target,
} from 'lucide-react';

/**
 * Analytics Dashboard Component - Comprehensive analytics with charts and metrics
 * @returns {JSX.Element} The analytics dashboard component
 */
export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Users',
      value: '2,350',
      change: '+180.1%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Sales',
      value: '12,234',
      change: '+19%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Active Sessions',
      value: '573',
      change: '-2.3%',
      trend: 'down',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const chartData = {
    revenue: [
      { month: 'Jan', value: 4000 },
      { month: 'Feb', value: 3000 },
      { month: 'Mar', value: 2000 },
      { month: 'Apr', value: 2780 },
      { month: 'May', value: 1890 },
      { month: 'Jun', value: 2390 },
      { month: 'Jul', value: 3490 },
    ],
    users: [
      { month: 'Jan', value: 2400 },
      { month: 'Feb', value: 1398 },
      { month: 'Mar', value: 9800 },
      { month: 'Apr', value: 3908 },
      { month: 'May', value: 4800 },
      { month: 'Jun', value: 3800 },
      { month: 'Jul', value: 4300 },
    ],
    sales: [
      { month: 'Jan', value: 2400 },
      { month: 'Feb', value: 2210 },
      { month: 'Mar', value: 2290 },
      { month: 'Apr', value: 2000 },
      { month: 'May', value: 2181 },
      { month: 'Jun', value: 2500 },
      { month: 'Jul', value: 2100 },
    ],
  };

  const topServices = [
    { name: 'GoSellr', revenue: '$12,345', growth: '+23%', users: '1,234' },
    { name: 'WMS', revenue: '$8,901', growth: '+18%', users: '987' },
    { name: 'PSS', revenue: '$6,789', growth: '+15%', users: '654' },
    { name: 'OBS', revenue: '$4,567', growth: '+12%', users: '432' },
    { name: 'JPS', revenue: '$3,456', growth: '+9%', users: '321' },
  ];

  const recentActivity = [
    { action: 'New user registered', service: 'GoSellr', time: '2 minutes ago', type: 'user' },
    { action: 'Payment received', service: 'WMS', time: '5 minutes ago', type: 'payment' },
    { action: 'Service activated', service: 'PSS', time: '10 minutes ago', type: 'service' },
    { action: 'Support ticket closed', service: 'OBS', time: '15 minutes ago', type: 'support' },
    { action: 'New product added', service: 'GoSellr', time: '20 minutes ago', type: 'product' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return Users;
      case 'payment':
        return DollarSign;
      case 'service':
        return Activity;
      case 'support':
        return Target;
      case 'product':
        return ShoppingCart;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'text-blue-600 bg-blue-100';
      case 'payment':
        return 'text-green-600 bg-green-100';
      case 'service':
        return 'text-purple-600 bg-purple-100';
      case 'support':
        return 'text-orange-600 bg-orange-100';
      case 'product':
        return 'text-indigo-600 bg-indigo-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your performance and insights</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <div className={`${metric.bgColor} p-3 rounded-lg`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {metric.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <span
                className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
              >
                {metric.change}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Performance Overview
            </h3>
            <div className="flex items-center space-x-2">
              {['revenue', 'users', 'sales'].map(metric => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === metric
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Chart Visualization */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData[selectedMetric as keyof typeof chartData].map((item, index) => (
              <motion.div
                key={item.month}
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / 10000) * 100}%` }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg relative group"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ${item.value.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            {chartData[selectedMetric as keyof typeof chartData].map(item => (
              <span key={item.month}>{item.month}</span>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Performing Services
          </h3>
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold">{service.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{service.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {service.users} users
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{service.revenue}</p>
                  <p className="text-sm text-green-600">{service.growth}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => {
            const ActivityIcon = getActivityIcon(activity.type);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(
                    activity.type
                  )}`}
                >
                  <ActivityIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.service}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
