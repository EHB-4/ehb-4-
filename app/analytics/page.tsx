"use client";

'use client';

import React, { useState, useEffect } from 'react';
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
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

/**
 * EHB Analytics Dashboard - Comprehensive analytics with charts and insights
 * @returns {JSX.Element} The analytics dashboard component
 */
export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'performance' | 'revenue'>(
    'overview'
  );

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

  const mockAnalyticsData = {
    projects: {
      total: 24,
      active: 18,
      completed: 5,
      delayed: 1,
    },
    performance: {
      uptime: 99.8,
      responseTime: 2.3,
      slaCompliance: 96.5,
      customerSatisfaction: 94.2,
    },
    revenue: {
      current: 125000,
      previous: 98000,
      growth: 27.6,
    },
    team: {
      total: 24,
      active: 22,
      productivity: 87.5,
    },
  };

  const projectStatusData = {
    labels: ['Active', 'Completed', 'Delayed'],
    datasets: [
      {
        label: 'Projects',
        data: [18, 5, 1],
        backgroundColor: ['#10B981', '#3B82F6', '#EF4444'],
        borderColor: ['#10B981', '#3B82F6', '#EF4444'],
      },
    ],
  };

  const monthlyRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [85000, 92000, 105000, 98000, 112000, 125000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    change: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, icon, color }) => (
        <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ml-1 ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change >= 0 ? '+' : ''}
              {change.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        <div className={color}>{icon}</div>
        </div>
        </div>
  );

  const ProgressRing: React.FC<{
    value: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }> = ({ value, size = 120, strokeWidth = 8, color = '#3B82F6' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-block">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-900">{value.toFixed(1)}%</span>
        </div>
      </div>
    );
  };

  const [data, setData] = useState(mockAnalyticsData);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        performance: {
          uptime: Math.max(
            99.5,
            Math.min(100, prev.performance.uptime + (Math.random() - 0.5) * 0.1)
          ),
          responseTime: Math.max(
            1.5,
            Math.min(4, prev.performance.responseTime + (Math.random() - 0.5) * 0.2)
          ),
          slaCompliance: Math.max(
            90,
            Math.min(100, prev.performance.slaCompliance + (Math.random() - 0.5) * 2)
          ),
          customerSatisfaction: Math.max(
            85,
            Math.min(98, prev.customerSatisfaction + (Math.random() - 0.5) * 1)
          ),
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
          <MetricCard
            title="Total Projects"
            value={data.projects.total}
            change={12.5}
            icon={<Target className="w-6 h-6" />}
            color="text-blue-600"
          />
          <MetricCard
            title="Active Projects"
            value={data.projects.active}
            change={8.2}
            icon={<Activity className="w-6 h-6" />}
            color="text-green-600"
          />
          <MetricCard
            title="Revenue"
            value={`$${(data.revenue.current / 1000).toFixed(0)}k`}
            change={data.revenue.growth}
            icon={<DollarSign className="w-6 h-6" />}
            color="text-purple-600"
          />
          <MetricCard
            title="Team Productivity"
            value={`${data.team.productivity}%`}
            change={5.3}
            icon={<Users className="w-6 h-6" />}
            color="text-orange-600"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'projects', label: 'Projects', icon: Target },
                { id: 'performance', label: 'Performance', icon: Activity },
                { id: 'revenue', label: 'Revenue', icon: DollarSign },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Performance Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <ProgressRing value={data.performance.uptime} color="#10B981" />
                      <p className="text-sm font-medium text-gray-700 mt-2">Uptime</p>
                    </div>
                    <div className="text-center">
                      <ProgressRing value={data.performance.slaCompliance} color="#3B82F6" />
                      <p className="text-sm font-medium text-gray-700 mt-2">SLA Compliance</p>
                    </div>
                    <div className="text-center">
                      <ProgressRing value={data.performance.customerSatisfaction} color="#8B5CF6" />
                      <p className="text-sm font-medium text-gray-700 mt-2">
                        Customer Satisfaction
                      </p>
                    </div>
                    <div className="text-center">
                      <ProgressRing value={data.team.productivity} color="#F59E0B" />
                      <p className="text-sm font-medium text-gray-700 mt-2">Team Productivity</p>
                    </div>
                  </div>
                </div>

                {/* Project Status */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Project Status Distribution
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-green-800">Active Projects</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">
                        {data.projects.active}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-blue-800">Completed Projects</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">
                        {data.projects.completed}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="font-medium text-red-800">Delayed Projects</span>
                      </div>
                      <span className="text-2xl font-bold text-red-600">
                        {data.projects.delayed}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Analytics</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Project Completion Rate</h4>
                    <div className="text-center">
                      <ProgressRing
                        value={(data.projects.completed / data.projects.total) * 100}
                        size={100}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Average Project Duration</h4>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">45 days</div>
                      <p className="text-sm text-gray-600">From start to completion</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Risk Level</h4>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">Low</div>
                      <p className="text-sm text-gray-600">Based on current metrics</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Response Time Trends</h4>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {data.performance.responseTime}h
                      </div>
                      <p className="text-sm text-gray-600">Average response time</p>
                      <div className="mt-4">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">15% improvement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">SLA Compliance History</h4>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {data.performance.slaCompliance}%
                      </div>
                      <p className="text-sm text-gray-600">Current compliance rate</p>
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${data.performance.slaCompliance}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'revenue' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Analytics</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Monthly Revenue</h4>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        ${(data.revenue.current / 1000).toFixed(0)}k
                      </div>
                      <p className="text-sm text-gray-600">Current month revenue</p>
                      <div className="mt-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">
                            +{data.revenue.growth}% from last month
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Revenue Growth</h4>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Q1 2024</span>
                          <span className="text-sm font-medium">$285k</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Q2 2024</span>
                          <span className="text-sm font-medium">$315k</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Q3 2024</span>
                          <span className="text-sm font-medium">$375k</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Q4 2024</span>
                          <span className="text-sm font-medium text-green-600">$425k (est.)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
