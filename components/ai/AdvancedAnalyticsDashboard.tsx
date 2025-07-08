'use client';

'use client';

import React, { useState, useEffect } from 'react';
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
  PieChart,
  LineChart,
  BarChart,
  AreaChart,
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  period: string;
  revenue: number;
  users: number;
  agents: number;
  performance: number;
  errors: number;
  cost: number;
  efficiency: number;
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
 * Advanced Analytics Dashboard
 * Comprehensive analytics with detailed insights and visualizations
 */
export default function AdvancedAnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(true);

  // Mock analytics data
  const analyticsData: AnalyticsData[] = [
    {
      period: 'Jan',
      revenue: 12500,
      users: 150,
      agents: 8,
      performance: 94,
      errors: 12,
      cost: 8500,
      efficiency: 87,
    },
    {
      period: 'Feb',
      revenue: 15800,
      users: 180,
      agents: 10,
      performance: 96,
      errors: 8,
      cost: 9200,
      efficiency: 89,
    },
    {
      period: 'Mar',
      revenue: 14200,
      users: 165,
      agents: 9,
      performance: 92,
      errors: 15,
      cost: 8800,
      efficiency: 85,
    },
    {
      period: 'Apr',
      revenue: 18900,
      users: 220,
      agents: 12,
      performance: 98,
      errors: 5,
      cost: 10500,
      efficiency: 92,
    },
    {
      period: 'May',
      revenue: 22100,
      users: 250,
      agents: 15,
      performance: 97,
      errors: 7,
      cost: 11800,
      efficiency: 94,
    },
    {
      period: 'Jun',
      revenue: 25800,
      users: 280,
      agents: 18,
      performance: 99,
      errors: 3,
      cost: 13200,
      efficiency: 96,
    },
  ];

  // Fallback for safeCurrentData to avoid possibly undefined errors
  const safeCurrentData: AnalyticsData =
    analyticsData.length > 0
      ? analyticsData[analyticsData.length - 1]
      : {
          period: '',
          revenue: 0,
          users: 0,
          agents: 0,
          performance: 0,
          errors: 0,
          cost: 0,
          efficiency: 0,
        };
  const safePreviousData: AnalyticsData =
    analyticsData.length > 1 ? analyticsData[analyticsData.length - 2] : safeCurrentData;

  const calculateGrowth = (current: number, previous: number) => {
    return previous !== 0 ? (((current - previous) / previous) * 100).toFixed(1) : '0.0';
  };

  const getMetricValue = (metric: string): number => {
    switch (metric) {
      case 'revenue':
        return safeCurrentData.revenue ?? 0;
      case 'users':
        return safeCurrentData.users ?? 0;
      case 'agents':
        return safeCurrentData.agents ?? 0;
      case 'performance':
        return safeCurrentData.performance ?? 0;
      case 'errors':
        return safeCurrentData.errors ?? 0;
      case 'cost':
        return safeCurrentData.cost ?? 0;
      case 'efficiency':
        return safeCurrentData.efficiency ?? 0;
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
      case 'cost':
        return DollarSign;
      case 'efficiency':
        return TrendingUp;
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
      case 'cost':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'efficiency':
        return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-300';
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
    { key: 'cost', label: 'Cost', prefix: '$', suffix: 'K' },
    { key: 'efficiency', label: 'Efficiency', prefix: '', suffix: '%' },
  ];

  const insights = [
    {
      type: 'positive',
      title: 'Revenue Growth',
      description: 'Revenue increased by 15.7% compared to last month',
      icon: TrendingUp,
      value: '+15.7%',
    },
    {
      type: 'positive',
      title: 'User Growth',
      description: 'Active users grew by 12% with high engagement',
      icon: Users,
      value: '+12%',
    },
    {
      type: 'warning',
      title: 'Cost Optimization',
      description: 'Cost per user decreased by 8% through optimization',
      icon: TrendingDown,
      value: '-8%',
    },
    {
      type: 'positive',
      title: 'System Efficiency',
      description: 'Overall system efficiency improved to 96%',
      icon: Target,
      value: '96%',
    },
  ];

  // Chart data for revenue trend
  const revenueLabels = analyticsData.map(d => d.period);
  const revenueData = analyticsData.map(d => d.revenue);
  const usersData = analyticsData.map(d => d.users);
  const agentsData = analyticsData.map(d => d.agents);
  const costData = analyticsData.map(d => d.cost);

  const lineChartData = {
    labels: revenueLabels,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Users',
        data: usersData,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Agents',
        data: agentsData,
        borderColor: '#a21caf',
        backgroundColor: 'rgba(162,28,175,0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Cost',
        data: costData,
        borderColor: '#f59e42',
        backgroundColor: 'rgba(245,158,66,0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' as const },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Bar chart for performance metrics
  const barChartData = {
    labels: revenueLabels,
    datasets: [
      {
        label: 'Performance',
        data: analyticsData.map(d => d.performance),
        backgroundColor: '#facc15',
      },
      {
        label: 'Efficiency',
        data: analyticsData.map(d => d.efficiency),
        backgroundColor: '#14b8a6',
      },
      {
        label: 'Errors',
        data: analyticsData.map(d => d.errors),
        backgroundColor: '#ef4444',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' as const },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Advanced Analytics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Select time period"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={metric.key}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-lg ${getMetricColor(metric.key)}`}>
                {React.createElement(getMetricIcon(metric.key), { className: 'w-6 h-6' })}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? (
                    <Skeleton width={60} height={28} />
                  ) : (
                    `${metric.prefix}${getMetricValue(metric.key)}${metric.suffix}`
                  )}
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {isLoading ? <Skeleton width={80} /> : insights[index]?.description}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            <div className="flex items-center gap-2">
              <select
                value={selectedMetric}
                onChange={e => setSelectedMetric(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                aria-label="Select metric to display"
              >
                <option value="revenue">Revenue</option>
                <option value="users">Users</option>
                <option value="agents">Agents</option>
                <option value="cost">Cost</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            {isLoading ? (
              <Skeleton height={240} />
            ) : (
              <Line data={lineChartData} options={lineChartOptions} />
            )}
          </div>
        </div>

        {/* Performance Metrics Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Metrics
          </h3>
          <div className="h-64">
            {isLoading ? (
              <Skeleton height={240} />
            ) : (
              <Bar data={barChartData} options={barChartOptions} />
            )}
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Agent Distribution
          </h3>
          <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">Agent types</p>
            </div>
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Activity
          </h3>
          <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <AreaChart className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">Activity timeline</p>
            </div>
          </div>
        </div>

        {/* Error Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Error Analysis
          </h3>
          <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">Error patterns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  insight.type === 'positive'
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : insight.type === 'warning'
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    insight.type === 'positive'
                      ? 'text-green-600'
                      : insight.type === 'warning'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {insight.title}
                    </p>
                    <span
                      className={`text-sm font-bold ${
                        insight.type === 'positive'
                          ? 'text-green-600'
                          : insight.type === 'warning'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                      }`}
                    >
                      {insight.value}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {insight.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recommendations
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Scale Code Check Agent
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                High demand detected, consider adding more instances
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Optimize Fraud Watch Agent
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Performance is excellent, consider advanced features
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Monitor System Resources
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                CPU usage trending upward, consider optimization
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
