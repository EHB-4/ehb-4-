'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Building,
  MapPin,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface ReportData {
  revenueData: any[];
  categoryData: any[];
  locationData: any[];
  performanceData: any[];
  growthData: any[];
  applicationData: any[];
}

interface ReportMetrics {
  totalRevenue: number;
  totalFranchises: number;
  averageROI: number;
  growthRate: number;
  approvalRate: number;
  topPerformingCategory: string;
}

const mockReportData: ReportData = {
  revenueData: [
    { month: 'Jan', revenue: 32000000, target: 30000000 },
    { month: 'Feb', revenue: 35000000, target: 32000000 },
    { month: 'Mar', revenue: 38000000, target: 35000000 },
    { month: 'Apr', revenue: 42000000, target: 38000000 },
    { month: 'May', revenue: 45000000, target: 42000000 },
    { month: 'Jun', revenue: 48000000, target: 45000000 },
  ],
  categoryData: [
    { name: 'Health & Wellness', revenue: 16800000, franchises: 35, growth: 15.2 },
    { name: 'Education', revenue: 12000000, franchises: 25, growth: 12.8 },
    { name: 'Technology', revenue: 9600000, franchises: 20, growth: 18.5 },
    { name: 'Legal', revenue: 7200000, franchises: 15, growth: 8.9 },
    { name: 'Travel', revenue: 2400000, franchises: 5, growth: 5.2 },
  ],
  locationData: [
    { city: 'Karachi', franchises: 45, revenue: 18000000, growth: 14.5 },
    { city: 'Lahore', franchises: 38, revenue: 15200000, growth: 12.8 },
    { city: 'Islamabad', franchises: 32, revenue: 12800000, growth: 16.2 },
    { city: 'Rawalpindi', franchises: 25, revenue: 10000000, growth: 10.5 },
    { city: 'Faisalabad', franchises: 16, revenue: 6400000, growth: 8.9 },
  ],
  performanceData: [
    { franchise: 'EHB Health Plus', category: 'Health', revenue: 8500000, growth: 15.2, roi: 18.5 },
    {
      franchise: 'EHB Education Hub',
      category: 'Education',
      revenue: 6200000,
      growth: 12.8,
      roi: 16.2,
    },
    {
      franchise: 'EHB Tech Solutions',
      category: 'Technology',
      revenue: 5800000,
      growth: 18.5,
      roi: 22.1,
    },
    {
      franchise: 'EHB Legal Services',
      category: 'Legal',
      revenue: 4200000,
      growth: 8.9,
      roi: 14.8,
    },
    { franchise: 'EHB Travel Pro', category: 'Travel', revenue: 2800000, growth: 5.2, roi: 12.5 },
  ],
  growthData: [
    { quarter: 'Q1 2024', applications: 45, approvals: 38, revenue: 105000000 },
    { quarter: 'Q2 2024', applications: 52, approvals: 44, revenue: 120000000 },
    { quarter: 'Q3 2024', applications: 48, approvals: 41, revenue: 115000000 },
    { quarter: 'Q4 2024', applications: 58, approvals: 49, revenue: 135000000 },
  ],
  applicationData: [
    { month: 'Jan', received: 15, approved: 12, rejected: 3 },
    { month: 'Feb', received: 18, approved: 15, rejected: 3 },
    { month: 'Mar', received: 22, approved: 18, rejected: 4 },
    { month: 'Apr', received: 20, approved: 17, rejected: 3 },
    { month: 'May', received: 25, approved: 21, rejected: 4 },
    { month: 'Jun', received: 28, approved: 24, rejected: 4 },
  ],
};

const mockMetrics: ReportMetrics = {
  totalRevenue: 48000000,
  totalFranchises: 156,
  averageROI: 16.8,
  growthRate: 12.5,
  approvalRate: 85.7,
  topPerformingCategory: 'Health & Wellness',
};

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

export default function FranchiseReports() {
  const [reportData, setReportData] = useState<ReportData>(mockReportData);
  const [metrics, setMetrics] = useState<ReportMetrics>(mockMetrics);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-PK').format(num);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Franchise Reports</h1>
            <p className="text-gray-600 mt-2">Comprehensive analytics and insights</p>
          </div>
          <div className="flex space-x-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{metrics.growthRate}%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Franchises</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(metrics.totalFranchises)}</div>
              <p className="text-xs text-muted-foreground">Active franchise network</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.averageROI}%</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.approvalRate}%</div>
              <p className="text-xs text-muted-foreground">Application success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue vs Target Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Target</CardTitle>
            <CardDescription>Monthly revenue performance against targets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={reportData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="target"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                  name="Target"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="2"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                  name="Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Revenue and growth by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportData.categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [formatCurrency(value), 'Revenue']} />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Franchise distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportData.categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="franchises"
                  >
                    {reportData.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Location Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Location Performance</CardTitle>
            <CardDescription>Franchise performance by city</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={reportData.locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value: any, name: string) => [
                    name === 'revenue' ? formatCurrency(value) : formatNumber(value),
                    name === 'revenue' ? 'Revenue' : 'Franchises',
                  ]}
                />
                <Bar yAxisId="left" dataKey="franchises" fill="#10B981" name="Franchises" />
                <Bar yAxisId="right" dataKey="revenue" fill="#8B5CF6" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Franchises */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Franchises</CardTitle>
            <CardDescription>Highest revenue generating franchises</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.performanceData.map((franchise, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{franchise.franchise}</h3>
                      <p className="text-sm text-gray-600">{franchise.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(franchise.revenue)}</div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-green-600">+{franchise.growth}% growth</span>
                      <span className="text-blue-600">{franchise.roi}% ROI</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
            <CardDescription>Monthly application and approval trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={reportData.applicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="received"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Received"
                />
                <Line
                  type="monotone"
                  dataKey="approved"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Approved"
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="Rejected"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Growth Analysis</CardTitle>
            <CardDescription>Quarterly performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={reportData.growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value: any, name: string) => [
                    name === 'revenue' ? formatCurrency(value) : formatNumber(value),
                    name === 'revenue' ? 'Revenue' : 'Applications',
                  ]}
                />
                <Bar yAxisId="left" dataKey="applications" fill="#F59E0B" name="Applications" />
                <Bar yAxisId="left" dataKey="approvals" fill="#10B981" name="Approvals" />
                <Bar yAxisId="right" dataKey="revenue" fill="#8B5CF6" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Summary of important findings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Positive Trends</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Revenue growth of {metrics.growthRate}% this period</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>High approval rate of {metrics.approvalRate}%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-green-500" />
                    <span>Strong average ROI of {metrics.averageROI}%</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Areas for Improvement</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span>Travel category showing slower growth</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>Expand presence in smaller cities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span>Increase application processing speed</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
