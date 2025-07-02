import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Award,
} from 'lucide-react';

interface FranchiseStatsProps {
  data?: {
    totalApplications: number;
    totalApprovals: number;
    totalRevenue: number;
    avgProcessingTime: number;
    successRate: number;
    avgInvestment: number;
    totalActiveFranchises: number;
    monthlyGrowth: number;
    monthlyTrends?: any[];
    categoryPerformance?: any[];
    statusDistribution?: any[];
    geographicDistribution?: any[];
  };
  showCharts?: boolean;
  compact?: boolean;
}

const defaultData = {
  totalApplications: 128,
  totalApprovals: 32,
  totalRevenue: 2400000,
  avgProcessingTime: 14,
  successRate: 85,
  avgInvestment: 150000,
  totalActiveFranchises: 25,
  monthlyGrowth: 25,
  monthlyTrends: [
    { month: 'Jan', applications: 12, approvals: 8, revenue: 450000 },
    { month: 'Feb', applications: 15, approvals: 11, revenue: 520000 },
    { month: 'Mar', applications: 18, approvals: 14, revenue: 680000 },
    { month: 'Apr', applications: 22, approvals: 17, revenue: 750000 },
    { month: 'May', applications: 25, approvals: 20, revenue: 890000 },
    { month: 'Jun', applications: 28, approvals: 23, revenue: 1020000 },
  ],
  categoryPerformance: [
    { category: 'Health', applications: 45, revenue: 1200000, successRate: 85 },
    { category: 'Education', applications: 38, revenue: 950000, successRate: 90 },
    { category: 'Legal', applications: 25, revenue: 1800000, successRate: 75 },
    { category: 'Travel', applications: 22, revenue: 650000, successRate: 80 },
    { category: 'Books', applications: 18, revenue: 450000, successRate: 70 },
  ],
  statusDistribution: [
    { status: 'Pending', count: 45, color: '#F59E0B' },
    { status: 'Approved', count: 32, color: '#10B981' },
    { status: 'Under Review', count: 18, color: '#3B82F6' },
    { status: 'Rejected', count: 8, color: '#EF4444' },
  ],
  geographicDistribution: [
    { location: 'Karachi', applications: 35, revenue: 850000 },
    { location: 'Lahore', applications: 28, revenue: 720000 },
    { location: 'Islamabad', applications: 20, revenue: 650000 },
    { location: 'Faisalabad', applications: 15, revenue: 380000 },
    { location: 'Peshawar', applications: 12, revenue: 300000 },
  ],
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

export default function FranchiseStats({
  data = defaultData,
  showCharts = true,
  compact = false,
}: FranchiseStatsProps) {
  const stats = [
    {
      label: 'Total Applications',
      value: formatNumber(data.totalApplications),
      change: `+${data.monthlyGrowth}%`,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'Approved Franchises',
      value: formatNumber(data.totalApprovals),
      change: `+${Math.round((data.totalApprovals / data.totalApplications) * 100)}%`,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(data.totalRevenue),
      change: `+${data.monthlyGrowth}%`,
      icon: DollarSign,
      color: 'text-purple-600',
    },
    {
      label: 'Success Rate',
      value: `${data.successRate}%`,
      change: `+${data.monthlyGrowth}%`,
      icon: Star,
      color: 'text-yellow-600',
    },
    {
      label: 'Active Franchises',
      value: formatNumber(data.totalActiveFranchises),
      change: `+${Math.round((data.totalActiveFranchises / data.totalApprovals) * 100)}%`,
      icon: Building2,
      color: 'text-indigo-600',
    },
    {
      label: 'Avg. Investment',
      value: formatCurrency(data.avgInvestment),
      change: `+${data.monthlyGrowth}%`,
      icon: TrendingUp,
      color: 'text-emerald-600',
    },
  ];

  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-4">
              <div className="flex justify-center mb-2">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
              <div className="text-xs text-green-600 mt-1">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className="flex items-center">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600 dark:text-green-400">{stat.change}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      {showCharts && data.monthlyTrends && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Applications & Revenue</CardTitle>
              <CardDescription>Track application trends and revenue growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(Number(value)) : value,
                      name === 'revenue'
                        ? 'Revenue'
                        : name === 'applications'
                          ? 'Applications'
                          : 'Approvals',
                    ]}
                  />
                  <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
                  <Bar dataKey="approvals" fill="#10B981" name="Approvals" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Applications and revenue by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.categoryPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(Number(value)) : value,
                      name === 'revenue'
                        ? 'Revenue'
                        : name === 'applications'
                          ? 'Applications'
                          : 'Success Rate',
                    ]}
                  />
                  <Bar dataKey="applications" fill="#8B5CF6" name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Status Distribution */}
      {showCharts && data.statusDistribution && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Status Distribution</CardTitle>
              <CardDescription>Current status of all applications</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, count }) => `${status} (${count})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {data.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Applications and revenue by location</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.geographicDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(Number(value)) : value,
                      name === 'revenue' ? 'Revenue' : 'Applications',
                    ]}
                  />
                  <Bar dataKey="applications" fill="#F59E0B" name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>Important metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {data.avgProcessingTime} days
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Average Processing Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                {formatCurrency(data.totalRevenue / data.totalActiveFranchises)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg. Revenue per Franchise
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {Math.round((data.totalActiveFranchises / data.totalApprovals) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Franchise Activation Rate
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
