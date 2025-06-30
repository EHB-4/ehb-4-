'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  MessageSquare,
  Code,
  Shield,
  Users,
  TrendingUp,
  Activity,
  Zap,
  Star,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  Target,
  Award,
  Lightbulb,
  Database,
  FileText,
  Calendar,
  MapPin,
  DollarSign,
  Heart,
  ShoppingCart,
  GraduationCap,
  Stethoscope,
  Fire,
  Car,
  Building,
  Globe,
  Smartphone,
  Monitor,
  Server,
  Network,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Download,
  Upload,
  Share2,
  Copy,
  Edit,
  Trash2,
  Plus,
  Minus,
  Search,
  Filter,
  Grid,
  List,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ExternalLink,
  Bookmark,
  Flag,
  HelpCircle,
  Info,
  AlertCircle,
  Check,
  X,
  RotateCcw,
  Save,
  Send,
  Phone,
  Mail,
  Map,
  Navigation,
  Compass,
  Target as TargetIcon,
  Timer,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
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
  DanishKrona,
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
 * EHB AI Agents Dashboard - Comprehensive AI agent management system
 * @returns {JSX.Element} The AI agents dashboard component
 */
export default function AIAgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // AI Agents Data
  const aiAgents = [
    {
      id: 'sot-orchestrator',
      name: 'SOT Agent Orchestrator',
      category: 'orchestration',
      description: 'Main orchestrator for SOT (Service Operations Team) agents',
      status: 'active',
      performance: 95,
      uptime: 99.8,
      responseTime: 0.8,
      icon: Brain,
      color: 'blue',
      features: ['Agent Coordination', 'Task Distribution', 'Performance Monitoring'],
      lastActive: '2024-01-20T14:30:00Z',
      totalRequests: 15420,
      successRate: 98.5,
      location: 'Primary Server',
      version: '2.1.0',
      dependencies: ['CodeCheckAgent', 'FraudWatchAgent', 'DevMatchAgent'],
    },
    {
      id: 'code-check-agent',
      name: 'Code Check Agent',
      category: 'development',
      description: 'Automated code review and quality assurance agent',
      status: 'active',
      performance: 92,
      uptime: 99.5,
      responseTime: 1.2,
      icon: Code,
      color: 'green',
      features: ['Code Review', 'Quality Assurance', 'Security Scanning'],
      lastActive: '2024-01-20T14:28:00Z',
      totalRequests: 8920,
      successRate: 96.8,
      location: 'Development Server',
      version: '1.8.2',
      dependencies: ['SOTAgentOrchestrator'],
    },
    {
      id: 'fraud-watch-agent',
      name: 'Fraud Watch Agent',
      category: 'security',
      description: 'Real-time fraud detection and prevention system',
      status: 'active',
      performance: 98,
      uptime: 99.9,
      responseTime: 0.3,
      icon: Shield,
      color: 'red',
      features: ['Fraud Detection', 'Risk Assessment', 'Alert System'],
      lastActive: '2024-01-20T14:29:00Z',
      totalRequests: 23450,
      successRate: 99.2,
      location: 'Security Server',
      version: '3.0.1',
      dependencies: ['SOTAgentOrchestrator'],
    },
    {
      id: 'dev-match-agent',
      name: 'Dev Match Agent',
      category: 'matching',
      description: 'Intelligent developer and project matching system',
      status: 'active',
      performance: 89,
      uptime: 99.2,
      responseTime: 2.1,
      icon: Users,
      color: 'purple',
      features: ['Developer Matching', 'Project Assignment', 'Skill Analysis'],
      lastActive: '2024-01-20T14:25:00Z',
      totalRequests: 5670,
      successRate: 94.5,
      location: 'Matching Server',
      version: '1.5.3',
      dependencies: ['SOTAgentOrchestrator'],
    },
    {
      id: 'scheduler-agent',
      name: 'Scheduler Agent',
      category: 'automation',
      description: 'Intelligent task scheduling and resource management',
      status: 'active',
      performance: 91,
      uptime: 99.7,
      responseTime: 1.5,
      icon: Calendar,
      color: 'orange',
      features: ['Task Scheduling', 'Resource Management', 'Optimization'],
      lastActive: '2024-01-20T14:27:00Z',
      totalRequests: 12340,
      successRate: 97.1,
      location: 'Automation Server',
      version: '2.0.4',
      dependencies: ['SOTAgentOrchestrator'],
    },
    {
      id: 'sql-score-agent',
      name: 'SQL Score Agent',
      category: 'assessment',
      description: 'SQL proficiency assessment and scoring system',
      status: 'active',
      performance: 87,
      uptime: 98.9,
      responseTime: 3.2,
      icon: Database,
      color: 'cyan',
      features: ['SQL Assessment', 'Performance Scoring', 'Learning Path'],
      lastActive: '2024-01-20T14:26:00Z',
      totalRequests: 3450,
      successRate: 93.8,
      location: 'Assessment Server',
      version: '1.3.7',
      dependencies: ['SOTAgentOrchestrator'],
    },
    {
      id: 'complaint-bot',
      name: 'Complaint Bot',
      category: 'support',
      description: 'Automated complaint handling and resolution system',
      status: 'active',
      performance: 94,
      uptime: 99.6,
      responseTime: 1.8,
      icon: MessageSquare,
      color: 'pink',
      features: ['Complaint Handling', 'Resolution Tracking', 'Customer Support'],
      lastActive: '2024-01-20T14:24:00Z',
      totalRequests: 7890,
      successRate: 95.9,
      location: 'Support Server',
      version: '1.7.1',
      dependencies: ['SOTAgentOrchestrator'],
    },
    {
      id: 'reward-agent',
      name: 'Reward Agent',
      category: 'incentives',
      description: 'Automated reward distribution and incentive management',
      status: 'active',
      performance: 96,
      uptime: 99.4,
      responseTime: 1.1,
      icon: Award,
      color: 'yellow',
      features: ['Reward Distribution', 'Incentive Management', 'Gamification'],
      lastActive: '2024-01-20T14:23:00Z',
      totalRequests: 4560,
      successRate: 98.1,
      location: 'Incentive Server',
      version: '1.9.0',
      dependencies: ['SOTAgentOrchestrator'],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: aiAgents.length },
    {
      id: 'orchestration',
      name: 'Orchestration',
      count: aiAgents.filter(a => a.category === 'orchestration').length,
    },
    {
      id: 'development',
      name: 'Development',
      count: aiAgents.filter(a => a.category === 'development').length,
    },
    {
      id: 'security',
      name: 'Security',
      count: aiAgents.filter(a => a.category === 'security').length,
    },
    {
      id: 'matching',
      name: 'Matching',
      count: aiAgents.filter(a => a.category === 'matching').length,
    },
    {
      id: 'automation',
      name: 'Automation',
      count: aiAgents.filter(a => a.category === 'automation').length,
    },
    {
      id: 'assessment',
      name: 'Assessment',
      count: aiAgents.filter(a => a.category === 'assessment').length,
    },
    {
      id: 'support',
      name: 'Support',
      count: aiAgents.filter(a => a.category === 'support').length,
    },
    {
      id: 'incentives',
      name: 'Incentives',
      count: aiAgents.filter(a => a.category === 'incentives').length,
    },
  ];

  const stats = [
    { label: 'Active Agents', value: aiAgents.length.toString(), icon: Brain },
    { label: 'Total Requests', value: '89,250', icon: Activity },
    { label: 'Avg Response Time', value: '1.4s', icon: Clock },
    { label: 'System Uptime', value: '99.7%', icon: CheckCircle },
  ];

  const filteredAgents = aiAgents.filter(agent => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || agent.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'performance':
        return b.performance - a.performance;
      case 'uptime':
        return b.uptime - a.uptime;
      case 'requests':
        return b.totalRequests - a.totalRequests;
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EHB AI Agents</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Comprehensive AI agent management and monitoring system
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/ai">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Brain className="w-4 h-4" />
                    AI Chat
                  </button>
                </Link>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search AI agents..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="performance">Sort by Performance</option>
                  <option value="uptime">Sort by Uptime</option>
                  <option value="requests">Sort by Requests</option>
                </select>

                <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-l-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-r-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center gap-3">
                <stat.icon className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Agents Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI Agents ({sortedAgents.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Activity className="w-4 h-4" />
              <span>Real-time Monitoring</span>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Agent Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg bg-${agent.color}-100 dark:bg-${agent.color}-900`}
                        >
                          <agent.icon className={`w-6 h-6 text-${agent.color}-600`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                            {agent.name}
                          </h3>
                          <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                            {agent.category}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          agent.status
                        )}`}
                      >
                        {agent.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {agent.description}
                    </p>
                  </div>

                  {/* Agent Metrics */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Activity className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Performance
                          </span>
                        </div>
                        <span
                          className={`text-lg font-bold ${getPerformanceColor(agent.performance)}`}
                        >
                          {agent.performance}%
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {agent.uptime}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {agent.responseTime}s
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Total Requests</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {agent.totalRequests.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {agent.successRate}%
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Features
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {agent.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                        {agent.features.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                            +{agent.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Activity className="w-4 h-4" />
                        Monitor
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Settings className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <BarChart3 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Last Active */}
                    <div className="flex items-center gap-1 mt-3 text-xs text-gray-600 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Last active: {formatTime(agent.lastActive)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center gap-6">
                    {/* Agent Icon */}
                    <div
                      className={`relative w-16 h-16 bg-${agent.color}-100 dark:bg-${agent.color}-900 rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <agent.icon className={`w-8 h-8 text-${agent.color}-600`} />
                      <div
                        className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(
                          agent.status
                        )
                          .replace('bg-', 'bg-')
                          .replace('text-', '')}`}
                      ></div>
                    </div>

                    {/* Agent Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {agent.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {agent.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                agent.status
                              )}`}
                            >
                              {agent.status}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              v{agent.version}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Activity className="w-4 h-4" />
                              <span>{agent.performance}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>{agent.uptime}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{agent.responseTime}s</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            <span>{agent.totalRequests.toLocaleString()} requests</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            <span>{agent.successRate}% success</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Server className="w-4 h-4" />
                            <span>{agent.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <BarChart3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Settings className="w-4 h-4" />
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Activity className="w-4 h-4" />
                            Monitor
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {sortedAgents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No AI agents found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or filters to find AI agents.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
