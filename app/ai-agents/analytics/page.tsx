'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Target,
  Clock,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle,
  Star,
  Award,
  Cpu,
  Memory,
  HardDrive,
  Network,
  Database,
  Server,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Clock as ClockIcon,
  DollarSign,
  Eye,
  EyeOff,
  Download,
  Share2,
  Filter,
  Search,
  RefreshCw,
  Settings,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Grid,
  List,
  Maximize,
  Minimize,
  RotateCcw,
  Save,
  Edit,
  Trash2,
  Copy,
  Bookmark,
  Flag,
  HelpCircle,
  Info,
  AlertCircle,
  Check,
  RotateCcw as RotateCcwIcon,
  Save as SaveIcon,
  Send,
  Phone,
  Mail,
  Map,
  Navigation,
  Compass,
  Target as TargetIcon,
  Timer,
  Calendar as CalendarIcon,
  User,
  UserCheck,
  UserX,
  UserPlus,
  Users as UsersIcon,
  UserCog,
  Key,
  KeyRound,
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
  Ethereum,
  DollarSign as DollarSignIcon,
  Euro,
  PoundSterling,
  Yen,
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
  SwissFranc,
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
  LaoKip,
  VietnameseDong,
  ThaiBaht,
  MalaysianRinggit,
  SingaporeDollar as SingaporeDollarIcon,
  HongKongDollar as HongKongDollarIcon,
  TaiwanDollar as TaiwanDollarIcon,
  NewZealandDollar as NewZealandDollarIcon,
  AustralianDollar as AustralianDollarIcon,
  CanadianDollar as CanadianDollarIcon,
  SwissFranc as SwissFrancIcon,
  NorwegianKrone as NorwegianKroneIcon,
  SwedishKrona as SwedishKronaIcon,
  DanishKrone as DanishKroneIcon,
  IcelandicKrona as IcelandicKronaIcon,
  PolishZloty as PolishZlotyIcon,
  CzechKoruna as CzechKorunaIcon,
  HungarianForint as HungarianForintIcon,
  RomanianLeu as RomanianLeuIcon,
  BulgarianLev as BulgarianLevIcon,
  CroatianKuna as CroatianKunaIcon,
  SerbianDinar as SerbianDinarIcon,
  BosnianMark as BosnianMarkIcon,
  AlbanianLek as AlbanianLekIcon,
  MacedonianDenar as MacedonianDenarIcon,
  MontenegrinEuro as MontenegrinEuroIcon,
  KosovoEuro as KosovoEuroIcon,
  MoldovanLeu as MoldovanLeuIcon,
  UkrainianHryvnia as UkrainianHryvniaIcon,
  BelarusianRuble as BelarusianRubleIcon,
  GeorgianLari as GeorgianLariIcon,
  ArmenianDram as ArmenianDramIcon,
  AzerbaijaniManat as AzerbaijaniManatIcon,
  KazakhstaniTenge as KazakhstaniTengeIcon,
  KyrgyzstaniSom as KyrgyzstaniSomIcon,
  TajikistaniSomoni as TajikistaniSomoniIcon,
  TurkmenistaniManat as TurkmenistaniManatIcon,
  UzbekistaniSom as UzbekistaniSomIcon,
  AfghanAfghani as AfghanAfghaniIcon,
  PakistaniRupee as PakistaniRupeeIcon,
  IndianRupee as IndianRupeeIcon,
  BangladeshiTaka as BangladeshiTakaIcon,
  SriLankanRupee as SriLankanRupeeIcon,
  NepaleseRupee as NepaleseRupeeIcon,
  BhutaneseNgultrum as BhutaneseNgultrumIcon,
  MaldivianRufiyaa as MaldivianRufiyaaIcon,
  BurmeseKyat as BurmeseKyatIcon,
  CambodianRiel as CambodianRielIcon,
  LaoKip as LaoKipIcon,
  VietnameseDong as VietnameseDongIcon,
  ThaiBaht as ThaiBahtIcon,
  MalaysianRinggit as MalaysianRinggitIcon,
} from 'lucide-react';
import Link from 'next/link';

/**
 * AI Agent Analytics Dashboard - Comprehensive analytics and insights
 * @returns {JSX.Element} The AI agent analytics dashboard component
 */
export default function AIAgentAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRequests: 89250,
      totalAgents: 8,
      averageResponseTime: 1.4,
      successRate: 97.2,
      activeUsers: 1247,
      revenue: 45678.9,
    },
    trends: {
      requests: [1250, 1380, 1420, 1560, 1480, 1620, 1750, 1890, 2010, 2150, 2280, 2420],
      responseTime: [1.2, 1.3, 1.1, 1.4, 1.2, 1.3, 1.1, 1.2, 1.4, 1.3, 1.2, 1.1],
      errors: [12, 8, 15, 6, 11, 9, 7, 13, 5, 10, 8, 6],
      users: [890, 920, 950, 980, 1010, 1040, 1070, 1100, 1130, 1160, 1190, 1220],
    },
    agentPerformance: [
      {
        name: 'SOT Orchestrator',
        requests: 15420,
        successRate: 98.5,
        avgResponseTime: 0.8,
        cpuUsage: 23.4,
        memoryUsage: 45.6,
        trend: 'up',
        growth: 12.5,
      },
      {
        name: 'Code Check Agent',
        requests: 8920,
        successRate: 96.8,
        avgResponseTime: 1.2,
        cpuUsage: 34.7,
        memoryUsage: 52.3,
        trend: 'up',
        growth: 8.3,
      },
      {
        name: 'Fraud Watch Agent',
        requests: 23450,
        successRate: 99.2,
        avgResponseTime: 0.3,
        cpuUsage: 67.2,
        memoryUsage: 78.9,
        trend: 'up',
        growth: 15.7,
      },
      {
        name: 'Dev Match Agent',
        requests: 5670,
        successRate: 94.5,
        avgResponseTime: 2.1,
        cpuUsage: 28.4,
        memoryUsage: 41.7,
        trend: 'down',
        growth: -2.1,
      },
      {
        name: 'Scheduler Agent',
        requests: 12340,
        successRate: 97.1,
        avgResponseTime: 1.5,
        cpuUsage: 45.2,
        memoryUsage: 58.3,
        trend: 'up',
        growth: 6.8,
      },
      {
        name: 'SQL Score Agent',
        requests: 3450,
        successRate: 93.8,
        avgResponseTime: 3.2,
        cpuUsage: 38.9,
        memoryUsage: 47.1,
        trend: 'up',
        growth: 4.2,
      },
      {
        name: 'Complaint Bot',
        requests: 7890,
        successRate: 95.9,
        avgResponseTime: 1.8,
        cpuUsage: 31.6,
        memoryUsage: 44.8,
        trend: 'up',
        growth: 9.1,
      },
      {
        name: 'Reward Agent',
        requests: 4560,
        successRate: 98.1,
        avgResponseTime: 1.1,
        cpuUsage: 26.3,
        memoryUsage: 39.5,
        trend: 'up',
        growth: 11.4,
      },
    ],
    insights: [
      {
        type: 'positive',
        title: 'Performance Improvement',
        description: 'Average response time improved by 15% this week',
        metric: '+15%',
        icon: TrendingUp,
      },
      {
        type: 'warning',
        title: 'High CPU Usage',
        description: 'Fraud Watch Agent showing elevated CPU usage',
        metric: '67.2%',
        icon: Cpu,
      },
      {
        type: 'positive',
        title: 'User Growth',
        description: 'Active users increased by 8.3% this month',
        metric: '+8.3%',
        icon: Users,
      },
      {
        type: 'info',
        title: 'New Feature Usage',
        description: 'Code Check Agent usage increased after new features',
        metric: '+12.5%',
        icon: Star,
      },
    ],
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'negative':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  AI Agent Analytics
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Comprehensive analytics and insights for EHB AI agents
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/ai-agents">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <BarChart3 className="w-4 h-4" />
                    Back to Agents
                  </button>
                </Link>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <select
                  value={timeRange}
                  onChange={e => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1d">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>

                <select
                  value={selectedAgent}
                  onChange={e => setSelectedAgent(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Agents</option>
                  <option value="sot-orchestrator">SOT Orchestrator</option>
                  <option value="code-check">Code Check Agent</option>
                  <option value="fraud-watch">Fraud Watch Agent</option>
                  <option value="dev-match">Dev Match Agent</option>
                  <option value="scheduler">Scheduler Agent</option>
                  <option value="sql-score">SQL Score Agent</option>
                  <option value="complaint-bot">Complaint Bot</option>
                  <option value="reward-agent">Reward Agent</option>
                </select>

                <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setViewMode('overview')}
                    className={`px-4 py-2 rounded-l-lg transition-colors ${
                      viewMode === 'overview'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setViewMode('detailed')}
                    className={`px-4 py-2 rounded-r-lg transition-colors ${
                      viewMode === 'detailed'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Detailed
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(analyticsData.overview.totalRequests)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analyticsData.overview.totalAgents}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Agents</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analyticsData.overview.averageResponseTime}s
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analyticsData.overview.successRate}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(analyticsData.overview.activeUsers)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(analyticsData.overview.revenue)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Performance */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Agent Performance
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <BarChart3 className="w-4 h-4" />
                  <span>Real-time metrics</span>
                </div>
              </div>

              <div className="space-y-4">
                {analyticsData.agentPerformance.map((agent, index) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {agent.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {React.createElement(getTrendIcon(agent.trend), {
                            className: `w-4 h-4 ${getTrendColor(agent.trend)}`,
                          })}
                          <span className={`text-sm font-medium ${getTrendColor(agent.trend)}`}>
                            {agent.growth > 0 ? '+' : ''}
                            {agent.growth}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatNumber(agent.requests)}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">requests</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Success Rate
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {agent.successRate}%
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Response Time
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {agent.avgResponseTime}s
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Cpu className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            CPU Usage
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {agent.cpuUsage}%
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Memory className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Memory</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {agent.memoryUsage}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights and Trends */}
          <div className="space-y-6">
            {/* Key Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Key Insights
              </h3>

              <div className="space-y-3">
                {analyticsData.insights.map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <insight.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{insight.title}</p>
                        <p className="text-sm opacity-90">{insight.description}</p>
                        <p className="text-xs font-bold mt-1">{insight.metric}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Generate Report</span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    Performance Analysis
                  </span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Set Goals</span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Analytics Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
