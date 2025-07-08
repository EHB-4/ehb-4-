'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Building,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Plus,
  Search,
  Filter,
} from 'lucide-react';

interface FranchiseStats {
  totalFranchises: number;
  activeFranchises: number;
  pendingApplications: number;
  totalRevenue: number;
  monthlyGrowth: number;
  topPerformingCategory: string;
}

interface RecentActivity {
  id: string;
  type: 'application' | 'approval' | 'revenue' | 'update';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

interface TopFranchise {
  id: string;
  name: string;
  category: string;
  location: string;
  revenue: number;
  growth: number;
  status: 'active' | 'pending' | 'suspended';
}

const mockStats: FranchiseStats = {
  totalFranchises: 156,
  activeFranchises: 142,
  pendingApplications: 23,
  totalRevenue: 45000000,
  monthlyGrowth: 12.5,
  topPerformingCategory: 'Health & Wellness',
};

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'application',
    title: 'New Franchise Application',
    description: 'Health & Wellness franchise application received from Karachi',
    timestamp: '2 hours ago',
    status: 'info',
  },
  {
    id: '2',
    type: 'approval',
    title: 'Application Approved',
    description: 'Education franchise approved for Lahore location',
    timestamp: '4 hours ago',
    status: 'success',
  },
  {
    id: '3',
    type: 'revenue',
    title: 'Revenue Milestone',
    description: 'Technology franchise achieved PKR 2M monthly revenue',
    timestamp: '6 hours ago',
    status: 'success',
  },
  {
    id: '4',
    type: 'update',
    title: 'System Update',
    description: 'Franchise management system updated to v2.1',
    timestamp: '1 day ago',
    status: 'info',
  },
];

const mockTopFranchises: TopFranchise[] = [
  {
    id: '1',
    name: 'EHB Health Plus',
    category: 'Health & Wellness',
    location: 'Karachi',
    revenue: 8500000,
    growth: 15.2,
    status: 'active',
  },
  {
    id: '2',
    name: 'EHB Education Hub',
    category: 'Education',
    location: 'Lahore',
    revenue: 6200000,
    growth: 12.8,
    status: 'active',
  },
  {
    id: '3',
    name: 'EHB Tech Solutions',
    category: 'Technology',
    location: 'Islamabad',
    revenue: 5800000,
    growth: 18.5,
    status: 'active',
  },
  {
    id: '4',
    name: 'EHB Legal Services',
    category: 'Legal',
    location: 'Rawalpindi',
    revenue: 4200000,
    growth: 8.9,
    status: 'active',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 32000000 },
  { month: 'Feb', revenue: 35000000 },
  { month: 'Mar', revenue: 38000000 },
  { month: 'Apr', revenue: 42000000 },
  { month: 'May', revenue: 45000000 },
  { month: 'Jun', revenue: 48000000 },
];

const categoryData = [
  { name: 'Health & Wellness', value: 35, color: '#10B981' },
  { name: 'Education', value: 25, color: '#3B82F6' },
  { name: 'Technology', value: 20, color: '#8B5CF6' },
  { name: 'Legal', value: 15, color: '#F59E0B' },
  { name: 'Travel', value: 5, color: '#EF4444' },
];

export default function FranchiseDashboard() {
  const [stats, setStats] = useState<FranchiseStats>(mockStats);
  const [activities, setActivities] = useState<RecentActivity[]>(mockActivities);
  const [topFranchises, setTopFranchises] = useState<TopFranchise[]>(mockTopFranchises);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <Plus className="h-4 w-4" />;
      case 'approval':
        return <CheckCircle className="h-4 w-4" />;
      case 'revenue':
        return <DollarSign className="h-4 w-4" />;
      case 'update':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Franchise Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor and manage your franchise network</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Application</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Franchises</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFranchises}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.monthlyGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Franchises</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeFranchises}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.activeFranchises / stats.totalFranchises) * 100).toFixed(1)}% active rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApplications}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.monthlyGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any) => [formatCurrency(value), 'Revenue']}
                    labelFormatter={label => `${label} 2024`}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Franchise Categories</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Franchises */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Franchises</CardTitle>
            <CardDescription>Highest revenue generating franchises</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFranchises.map(franchise => (
                <div
                  key={franchise.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{franchise.name}</h3>
                      <p className="text-sm text-gray-600">{franchise.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{franchise.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(franchise.revenue)}</div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">+{franchise.growth}%</span>
                    </div>
                    <Badge className={`mt-1 ${getStatusColor(franchise.status)}`}>
                      {franchise.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.status === 'success'
                        ? 'bg-green-100'
                        : activity.status === 'warning'
                          ? 'bg-yellow-100'
                          : 'bg-blue-100'
                    }`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Plus className="h-6 w-6" />
                <span>New Application</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Search className="h-6 w-6" />
                <span>Search Franchises</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <BarChart className="h-6 w-6" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
