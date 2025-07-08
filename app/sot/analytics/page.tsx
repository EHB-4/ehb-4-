/**
 * SOT Analytics Page
 *
 * System analytics and performance metrics
 *
 * @author EHB AI System
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Users,
  Code,
  Brain,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Settings,
  BarChart3,
  MessageSquare,
  Globe,
  Smartphone,
  Database,
  Server,
  Network,
  Monitor,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  CreditCard,
  Wallet,
  PiggyBank,
  Banknote,
  Coins,
  Bitcoin,
  DollarSign,
  Euro,
  PoundSterling,
  Rupee,
  Won,
  Ruble,
  Lira,
  Real,
  Peso,
  Franc,
  Krona,
  Forint,
  Zloty,
  Koruna,
  Leu,
  Lev,
  Hryvnia,
  Tenge,
  Som,
  Tugrik,
  Kyat,
  Kip,
  Dong,
  Baht,
  Ringgit,
  SingaporeDollar,
  HongKongDollar,
  TaiwanDollar,
  NewZealandDollar,
  AustralianDollar,
  CanadianDollar,
  NorwegianKrone,
  SwedishKrona,
  DanishKrone,
  IcelandicKrona,
  PolishZloty,
  CzechKoruna,
  HungarianForint,
  RomanianLeu,
  BulgarianLev,
  CroatianKuna,
  SerbianDinar,
  BosnianMark,
  AlbanianLek,
  MacedonianDenar,
  MontenegrinEuro,
  KosovoEuro,
  MoldovanLeu,
  UkrainianHryvnia,
  BelarusianRuble,
  GeorgianLari,
  ArmenianDram,
  AzerbaijaniManat,
  KazakhstaniTenge,
  KyrgyzstaniSom,
  TajikistaniSomoni,
  TurkmenistaniManat,
  UzbekistaniSom,
  AfghanAfghani,
  PakistaniRupee,
  IndianRupee,
  BangladeshiTaka,
  SriLankanRupee,
  NepaleseRupee,
  BhutaneseNgultrum,
  MaldivianRufiyaa,
  BurmeseKyat,
  CambodianRiel,
  LaotianKip,
  VietnameseDong,
  ThaiBaht,
  MalaysianRinggit,
  Activity,
  BarChart3 as BarChart3Icon,
  MessageSquare as MessageSquareIcon,
  Star,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Play,
  Pause,
  RotateCcw,
  Eye as EyeIcon,
  Edit,
  Trash2,
  Download,
  Upload,
  GitBranch,
  Terminal,
  FileText,
  ArrowRight,
  Zap,
  Calendar,
  DollarSign as DollarSignIcon,
  Target,
  Award,
  Activity as ActivityIcon,
} from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalTasks: number;
  completedTasks: number;
  totalRevenue: number;
  averageTaskValue: number;
  systemUptime: number;
  averageResponseTime: number;
  userSatisfaction: number;
  agentPerformance: {
    name: string;
    tasksProcessed: number;
    successRate: number;
    averageTime: number;
  }[];
  topCategories: {
    name: string;
    tasks: number;
    revenue: number;
  }[];
  monthlyGrowth: {
    month: string;
    users: number;
    tasks: number;
    revenue: number;
  }[];
}

export default function SOTAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    totalRevenue: 0,
    averageTaskValue: 0,
    systemUptime: 0,
    averageResponseTime: 0,
    userSatisfaction: 0,
    agentPerformance: [],
    topCategories: [],
    monthlyGrowth: [],
  });

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    setAnalyticsData({
      totalUsers: 15420,
      activeUsers: 8920,
      newUsers: 234,
      totalTasks: 45670,
      completedTasks: 42340,
      totalRevenue: 1250000,
      averageTaskValue: 27.4,
      systemUptime: 99.8,
      averageResponseTime: 1.2,
      userSatisfaction: 4.7,
      agentPerformance: [
        {
          name: 'DevMatchAgent',
          tasksProcessed: 12450,
          successRate: 98.5,
          averageTime: 0.8,
        },
        {
          name: 'CodeCheckAgent',
          tasksProcessed: 8920,
          successRate: 96.2,
          averageTime: 2.1,
        },
        {
          name: 'SchedulerAgent',
          tasksProcessed: 15670,
          successRate: 99.1,
          averageTime: 0.3,
        },
        {
          name: 'FraudWatchAgent',
          tasksProcessed: 23450,
          successRate: 97.8,
          averageTime: 1.5,
        },
      ],
      topCategories: [
        { name: 'Web Development', tasks: 12500, revenue: 450000 },
        { name: 'Mobile Development', tasks: 8900, revenue: 320000 },
        { name: 'AI & ML', tasks: 6700, revenue: 280000 },
        { name: 'Design', tasks: 5400, revenue: 120000 },
        { name: 'Testing', tasks: 3200, revenue: 80000 },
      ],
      monthlyGrowth: [
        { month: 'Jan', users: 12000, tasks: 35000, revenue: 800000 },
        { month: 'Feb', users: 13200, tasks: 38000, revenue: 900000 },
        { month: 'Mar', users: 14100, tasks: 41000, revenue: 1000000 },
        { month: 'Apr', users: 14800, tasks: 43000, revenue: 1100000 },
        { month: 'May', users: 15200, tasks: 44000, revenue: 1200000 },
        { month: 'Jun', users: 15420, tasks: 45670, revenue: 1250000 },
      ],
    });
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SOT Analytics</h1>
              <p className="text-gray-600">
                Comprehensive system analytics and performance metrics
              </p>
            </div>
            <Link href="/sot">
              <Button variant="outline">
                Back to SOT
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatNumber(analyticsData.totalUsers)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Tasks</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatNumber(analyticsData.totalTasks)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(analyticsData.totalRevenue)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Uptime</p>
                    <p className="text-lg font-bold text-gray-900">{analyticsData.systemUptime}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* System Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData.completedTasks.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">Completed Tasks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData.averageResponseTime}s
                      </p>
                      <p className="text-sm text-gray-500">Avg Response Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData.userSatisfaction}/5
                      </p>
                      <p className="text-sm text-gray-500">User Satisfaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(analyticsData.averageTaskValue)}
                      </p>
                      <p className="text-sm text-gray-500">Avg Task Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Agent Performance */}
            <Card>
              <CardHeader>
                <CardTitle>AI Agent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {analyticsData.agentPerformance.map((agent, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{agent.name}</h4>
                        <Badge variant="outline">{agent.successRate}%</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tasks Processed</span>
                          <span className="font-medium">{formatNumber(agent.tasksProcessed)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Avg Time</span>
                          <span className="font-medium">{agent.averageTime}s</span>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Success Rate</span>
                            <span>{agent.successRate}%</span>
                          </div>
                          <Progress value={agent.successRate} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Top Categories by Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-sm text-gray-500">
                            {formatNumber(category.tasks)} tasks
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(category.revenue)}</p>
                        <p className="text-sm text-gray-500">
                          {((category.revenue / analyticsData.totalRevenue) * 100).toFixed(1)}% of
                          total
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>System Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>System Uptime</span>
                        <span>{analyticsData.systemUptime}%</span>
                      </div>
                      <Progress value={analyticsData.systemUptime} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Task Completion Rate</span>
                        <span>
                          {(
                            (analyticsData.completedTasks / analyticsData.totalTasks) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(analyticsData.completedTasks / analyticsData.totalTasks) * 100}
                        className="h-3"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>User Satisfaction</span>
                        <span>{(analyticsData.userSatisfaction / 5) * 100}%</span>
                      </div>
                      <Progress
                        value={(analyticsData.userSatisfaction / 5) * 100}
                        className="h-3"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Response Time Efficiency</span>
                        <span>{((2 - analyticsData.averageResponseTime) / 2) * 100}%</span>
                      </div>
                      <Progress
                        value={((2 - analyticsData.averageResponseTime) / 2) * 100}
                        className="h-3"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Task Completion</span>
                      </div>
                      <span className="text-green-600 font-medium">+12.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">User Growth</span>
                      </div>
                      <span className="text-blue-600 font-medium">+8.3%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Revenue Growth</span>
                      </div>
                      <span className="text-purple-600 font-medium">+15.2%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <span className="font-medium">Response Time</span>
                      </div>
                      <span className="text-orange-600 font-medium">-5.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">
                        {formatCurrency(analyticsData.totalRevenue)}
                      </p>
                      <p className="text-gray-500">Total Revenue</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-lg font-bold text-green-600">
                          {formatCurrency(analyticsData.averageTaskValue)}
                        </p>
                        <p className="text-sm text-green-600">Avg Task Value</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-lg font-bold text-blue-600">
                          {formatNumber(analyticsData.totalTasks)}
                        </p>
                        <p className="text-sm text-blue-600">Total Tasks</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                          </div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(category.revenue)}</p>
                          <p className="text-sm text-gray-500">
                            {((category.revenue / analyticsData.totalRevenue) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Growth Tab */}
          <TabsContent value="growth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Growth Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analyticsData.monthlyGrowth.map((month, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{month.month} 2024</h4>
                          <p className="text-sm text-gray-500">Monthly performance</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-right">
                        <div>
                          <p className="font-medium">{formatNumber(month.users)}</p>
                          <p className="text-sm text-gray-500">Users</p>
                        </div>
                        <div>
                          <p className="font-medium">{formatNumber(month.tasks)}</p>
                          <p className="text-sm text-gray-500">Tasks</p>
                        </div>
                        <div>
                          <p className="font-medium">{formatCurrency(month.revenue)}</p>
                          <p className="text-sm text-gray-500">Revenue</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
