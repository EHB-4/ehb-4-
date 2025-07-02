"use client";

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Settings,
  RefreshCw,
  Play,
  Pause,
  Stop,
  Zap,
  Shield,
  Users,
  Database,
  Server,
  Network,
  Cpu,
  Memory,
  HardDrive,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  Thermometer,
  Gauge,
  Target,
  Award,
  Star,
  Heart,
  HeartOff,
  Eye,
  EyeOff,
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
  Ethereum,
  DollarSign,
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
 * AI Agent Monitoring Dashboard - Real-time monitoring and performance tracking
 * @returns {JSX.Element} The AI agent monitoring dashboard component
 */
export default function AIAgentMonitoringPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [timeRange, setTimeRange] = useState('1h');

  // Mock real-time monitoring data
  const monitoringData = {
    systemHealth: {
      overall: 98.5,
      cpu: 45.2,
      memory: 67.8,
      disk: 23.4,
      network: 89.1,
    },
    agents: [
      {
        id: 'sot-orchestrator',
        name: 'SOT Agent Orchestrator',
        status: 'active',
        performance: 95,
        uptime: 99.8,
        responseTime: 0.8,
        requestsPerMinute: 245,
        errorRate: 0.2,
        cpuUsage: 23.4,
        memoryUsage: 45.6,
        networkLatency: 12.3,
        lastHeartbeat: '2024-01-20T14:30:00Z',
        alerts: [],
        metrics: {
          requests: [245, 238, 251, 242, 249, 256, 243, 248],
          responseTime: [0.8, 0.9, 0.7, 0.8, 0.9, 0.8, 0.7, 0.8],
          errors: [0, 1, 0, 0, 1, 0, 0, 0],
          cpu: [23.4, 24.1, 22.8, 23.9, 24.2, 23.1, 23.7, 23.4],
        },
      },
      {
        id: 'code-check-agent',
        name: 'Code Check Agent',
        status: 'active',
        performance: 92,
        uptime: 99.5,
        responseTime: 1.2,
        requestsPerMinute: 156,
        errorRate: 0.8,
        cpuUsage: 34.7,
        memoryUsage: 52.3,
        networkLatency: 18.9,
        lastHeartbeat: '2024-01-20T14:29:00Z',
        alerts: ['High memory usage detected'],
        metrics: {
          requests: [156, 148, 162, 155, 159, 153, 161, 156],
          responseTime: [1.2, 1.3, 1.1, 1.2, 1.4, 1.2, 1.1, 1.2],
          errors: [0, 1, 0, 1, 0, 1, 0, 0],
          cpu: [34.7, 35.2, 33.8, 34.9, 35.1, 34.3, 34.8, 34.7],
        },
      },
      {
        id: 'fraud-watch-agent',
        name: 'Fraud Watch Agent',
        status: 'active',
        performance: 98,
        uptime: 99.9,
        responseTime: 0.3,
        requestsPerMinute: 892,
        errorRate: 0.1,
        cpuUsage: 67.2,
        memoryUsage: 78.9,
        networkLatency: 5.4,
        lastHeartbeat: '2024-01-20T14:30:00Z',
        alerts: [],
        metrics: {
          requests: [892, 885, 901, 894, 898, 903, 889, 892],
          responseTime: [0.3, 0.4, 0.3, 0.3, 0.4, 0.3, 0.3, 0.3],
          errors: [0, 0, 1, 0, 0, 0, 0, 0],
          cpu: [67.2, 68.1, 66.8, 67.5, 67.9, 66.9, 67.4, 67.2],
        },
      },
      {
        id: 'dev-match-agent',
        name: 'Dev Match Agent',
        status: 'active',
        performance: 89,
        uptime: 99.2,
        responseTime: 2.1,
        requestsPerMinute: 78,
        errorRate: 1.2,
        cpuUsage: 28.4,
        memoryUsage: 41.7,
        networkLatency: 25.6,
        lastHeartbeat: '2024-01-20T14:28:00Z',
        alerts: ['Response time above threshold'],
        metrics: {
          requests: [78, 75, 82, 79, 76, 81, 77, 78],
          responseTime: [2.1, 2.3, 2.0, 2.2, 2.4, 2.1, 2.0, 2.1],
          errors: [0, 1, 0, 1, 0, 1, 0, 0],
          cpu: [28.4, 29.1, 27.8, 28.6, 28.9, 28.2, 28.5, 28.4],
        },
      },
    ],
    alerts: [
      {
        id: 1,
        type: 'warning',
        agent: 'Code Check Agent',
        message: 'High memory usage detected (78.9%)',
        timestamp: '2024-01-20T14:29:00Z',
        severity: 'medium',
      },
      {
        id: 2,
        type: 'warning',
        agent: 'Dev Match Agent',
        message: 'Response time above threshold (2.4s)',
        timestamp: '2024-01-20T14:28:00Z',
        severity: 'low',
      },
      {
        id: 3,
        type: 'info',
        agent: 'System',
        message: 'Scheduled maintenance in 2 hours',
        timestamp: '2024-01-20T14:25:00Z',
        severity: 'info',
      },
    ],
  };

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

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatMetricValue = (value: number, unit: string = '') => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K${unit}`;
    }
    return `${value}${unit}`;
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
                  AI Agent Monitoring
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Real-time monitoring and performance tracking for EHB AI agents
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/ai-agents">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Activity className="w-4 h-4" />
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
                  <option value="1h">Last Hour</option>
                  <option value="6h">Last 6 Hours</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                </select>

                <select
                  value={refreshInterval}
                  onChange={e => setRefreshInterval(parseInt(e.target.value))}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1000}>1 second</option>
                  <option value={5000}>5 seconds</option>
                  <option value={10000}>10 seconds</option>
                  <option value={30000}>30 seconds</option>
                </select>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={e => setAutoRefresh(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Auto Refresh</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Refresh Now
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Last updated: {formatTime(new Date().toISOString())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {monitoringData.systemHealth.overall}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">System Health</p>
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
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Cpu className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {monitoringData.systemHealth.cpu}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</p>
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
                <Memory className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {monitoringData.systemHealth.memory}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</p>
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
                <HardDrive className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {monitoringData.systemHealth.disk}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Disk Usage</p>
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
                <Network className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {monitoringData.systemHealth.network}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Network</p>
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
                  <Activity className="w-4 h-4" />
                  <span>Real-time</span>
                </div>
              </div>

              <div className="space-y-4">
                {monitoringData.agents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
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
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            agent.status
                          )}`}
                        >
                          {agent.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`font-medium ${getPerformanceColor(agent.performance)}`}>
                          {agent.performance}%
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {agent.uptime}% uptime
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Response</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {agent.responseTime}s
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Activity className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Requests/min
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatMetricValue(agent.requestsPerMinute)}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Error Rate
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {agent.errorRate}%
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Cpu className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">CPU</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {agent.cpuUsage}%
                        </span>
                      </div>
                    </div>

                    {agent.alerts.length > 0 && (
                      <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm text-yellow-800 dark:text-yellow-200">
                            {agent.alerts[0]}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts and System Status */}
          <div className="space-y-6">
            {/* Active Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Active Alerts
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {monitoringData.alerts.length} alerts
                </span>
              </div>

              <div className="space-y-3">
                {monitoringData.alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{alert.agent}</p>
                        <p className="text-sm opacity-90">{alert.message}</p>
                        <p className="text-xs opacity-75 mt-1">{formatTime(alert.timestamp)}</p>
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
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Refresh All Agents</span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-900 dark:text-white">System Settings</span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Performance Report</span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Shield className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Security Audit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
