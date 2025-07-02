'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  MapPin,
  Calendar,
  Star,
  Award,
  Target,
  CheckCircle,
  ArrowRight,
  Building,
  Globe,
  Lightbulb,
  Shield,
  Clock,
  BarChart,
  Users2,
  BookOpen,
  Search,
  Briefcase,
  Handshake,
  Lock,
  Eye,
  FileCheck,
  PieChart,
  LineChart,
  Activity,
  Brain,
  Eye2,
  Tooth,
  Baby,
  Senior,
  Microscope,
  Syringe,
  Thermometer,
  Bandage,
  HeartPulse,
  BrainCircuit,
  Bone,
  Lungs,
  Kidney,
  Liver,
  Stomach,
  Spine,
  Footprints,
  Brain2,
  HeartHandshake,
  GraduationCap,
  BookOpen2,
  Users3,
  DollarSign2,
  MapPin2,
  Calendar2,
  Star2,
  TrendingUp2,
  Award2,
  Target2,
  CheckCircle2,
  ArrowRight2,
  Building2,
  Globe2,
  Lightbulb2,
  Shield2,
  Clock2,
  BarChart32,
  Users22,
  BookOpen3,
  Search2,
  Briefcase2,
  Handshake2,
  Lock2,
  Eye3,
  FileCheck2,
  Scale,
  Gavel,
  FileText,
  Users4,
  DollarSign3,
  MapPin3,
  Calendar3,
  Star3,
  TrendingUp3,
  Award3,
  Target3,
  CheckCircle3,
  ArrowRight3,
  Building3,
  Globe3,
  Lightbulb3,
  Shield3,
  Clock3,
  BarChart33,
  Users23,
  BookOpen4,
  Search3,
  Briefcase3,
  Handshake3,
  Lock3,
  Eye4,
  FileCheck3,
} from 'lucide-react';

interface AnalyticsData {
  totalFranchises: number;
  activeFranchises: number;
  pendingApplications: number;
  totalRevenue: number;
  averageROI: number;
  successRate: number;
  marketGrowth: number;
  categoryBreakdown: {
    health: number;
    education: number;
    law: number;
    travel: number;
    books: number;
  };
  locationBreakdown: {
    karachi: number;
    lahore: number;
    islamabad: number;
    faisalabad: number;
    multan: number;
  };
  monthlyGrowth: {
    applications: number;
    approvals: number;
    revenue: number;
  };
  topPerformers: {
    id: string;
    name: string;
    category: string;
    location: string;
    revenue: number;
    roi: number;
  }[];
  recentActivity: {
    id: string;
    action: string;
    franchise: string;
    timestamp: string;
    status: string;
  }[];
}

const mockAnalyticsData: AnalyticsData = {
  totalFranchises: 1250,
  activeFranchises: 1180,
  pendingApplications: 85,
  totalRevenue: 450000000,
  averageROI: 38,
  successRate: 92,
  marketGrowth: 18,
  categoryBreakdown: {
    health: 320,
    education: 280,
    law: 200,
    travel: 250,
    books: 200,
  },
  locationBreakdown: {
    karachi: 400,
    lahore: 350,
    islamabad: 200,
    faisalabad: 150,
    multan: 150,
  },
  monthlyGrowth: {
    applications: 15,
    approvals: 12,
    revenue: 8,
  },
  topPerformers: [
    {
      id: 'FR001',
      name: 'EHB Health Clinic - Karachi',
      category: 'Health',
      location: 'Karachi',
      revenue: 8500000,
      roi: 45,
    },
    {
      id: 'FR002',
      name: 'EHB Language Academy - Lahore',
      category: 'Education',
      location: 'Lahore',
      revenue: 7200000,
      roi: 42,
    },
    {
      id: 'FR003',
      name: 'EHB Legal Consultancy - Islamabad',
      category: 'Law',
      location: 'Islamabad',
      revenue: 6800000,
      roi: 48,
    },
  ],
  recentActivity: [
    {
      id: 'ACT001',
      action: 'New Application',
      franchise: 'EHB Dental Clinic - Faisalabad',
      timestamp: '2024-01-20T10:30:00Z',
      status: 'pending',
    },
    {
      id: 'ACT002',
      action: 'Application Approved',
      franchise: 'EHB STEM Center - Multan',
      timestamp: '2024-01-20T09:15:00Z',
      status: 'approved',
    },
    {
      id: 'ACT003',
      action: 'Revenue Milestone',
      franchise: 'EHB Medical Clinic - Karachi',
      timestamp: '2024-01-20T08:45:00Z',
      status: 'milestone',
    },
  ],
};

export default function FranchiseAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(mockAnalyticsData);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const getGrowthIcon = (value: number) => {
    return value > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'milestone':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Franchise Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Comprehensive insights into franchise performance and growth
            </p>
          </div>
          <div className="flex items-center space-x-4">
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
            <Button>
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Franchises
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(analyticsData.totalFranchises)}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                {getGrowthIcon(analyticsData.marketGrowth)}
                <span className="text-sm text-green-600 ml-1">
                  +{analyticsData.marketGrowth}% from last {selectedPeriod}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Active Franchises
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(analyticsData.activeFranchises)}
                  </p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${(analyticsData.activeFranchises / analyticsData.totalFranchises) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {Math.round(
                    (analyticsData.activeFranchises / analyticsData.totalFranchises) * 100
                  )}
                  %
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(analyticsData.totalRevenue)}
                  </p>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                {getGrowthIcon(analyticsData.monthlyGrowth.revenue)}
                <span className="text-sm text-green-600 ml-1">
                  +{analyticsData.monthlyGrowth.revenue}% from last {selectedPeriod}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Average ROI
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.averageROI}%
                  </p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Success Rate: {analyticsData.successRate}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Franchise Categories
              </CardTitle>
              <CardDescription>Distribution across different franchise categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analyticsData.categoryBreakdown).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          category === 'health'
                            ? 'bg-green-500'
                            : category === 'education'
                              ? 'bg-blue-500'
                              : category === 'law'
                                ? 'bg-purple-500'
                                : category === 'travel'
                                  ? 'bg-orange-500'
                                  : 'bg-gray-500'
                        }`}
                      ></div>
                      <span className="font-medium capitalize">{category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatNumber(count)}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({Math.round((count / analyticsData.totalFranchises) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Geographic Distribution
              </CardTitle>
              <CardDescription>Franchise distribution across major cities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analyticsData.locationBreakdown).map(([location, count]) => (
                  <div key={location} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="font-medium capitalize">{location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatNumber(count)}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({Math.round((count / analyticsData.totalFranchises) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Top Performing Franchises
            </CardTitle>
            <CardDescription>Highest revenue generating franchises</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPerformers.map((franchise, index) => (
                <div
                  key={franchise.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{franchise.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {franchise.category} • {franchise.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(franchise.revenue)}</p>
                    <p className="text-sm text-green-600">ROI: {franchise.roi}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest franchise system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentActivity.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-2 rounded-full ${
                        activity.status === 'approved'
                          ? 'bg-green-100 dark:bg-green-900'
                          : activity.status === 'pending'
                            ? 'bg-yellow-100 dark:bg-yellow-900'
                            : 'bg-blue-100 dark:bg-blue-900'
                      }`}
                    >
                      {activity.status === 'approved' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : activity.status === 'pending' ? (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <Award className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{activity.action}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.franchise}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
