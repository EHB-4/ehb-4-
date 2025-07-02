"use client";

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  HardDrive,
  Network,
  Server,
  Shield,
  TrendingUp,
  TrendingDown,
  Zap,
  Eye,
  Settings,
  RefreshCw,
  Bell,
  BarChart3,
  LineChart,
  PieChart,
  Gauge,
  Thermometer,
  Wifi,
  HardDrive as HardDriveIcon,
  Memory,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  MapPin,
  Users,
  UserCheck,
  UserX,
  UserPlus,
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
  Target,
  Timer,
  Calendar,
  User,
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
} from 'lucide-react';

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  temperature: number;
  power: number;
  uptime: number;
  loadAverage: number;
}

interface AgentMetrics {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'error' | 'offline';
  performance: number;
  responseTime: number;
  errorRate: number;
  requestsPerMinute: number;
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  lastHeartbeat: string;
  alerts: string[];
  predictions: {
    nextHour: number;
    nextDay: number;
    nextWeek: number;
  };
}

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  agent?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

interface Prediction {
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  timeframe: string;
}

/**
 * Enhanced Monitoring Dashboard
 * Advanced monitoring with predictive analytics and automated error recovery
 */
export default function EnhancedMonitoringDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'predictive'>('overview');

  // Mock enhanced monitoring data
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 45.2,
    memory: 67.8,
    disk: 23.4,
    network: 89.1,
    temperature: 42.3,
    power: 78.9,
    uptime: 99.8,
    loadAverage: 1.2,
  });

  const [agentMetrics, setAgentMetrics] = useState<AgentMetrics[]>([
    {
      id: 'sot-orchestrator',
      name: 'SOT Agent Orchestrator',
      status: 'active',
      performance: 95,
      responseTime: 0.8,
      errorRate: 0.2,
      requestsPerMinute: 245,
      cpuUsage: 23.4,
      memoryUsage: 45.6,
      networkLatency: 12.3,
      lastHeartbeat: '2024-01-20T14:30:00Z',
      alerts: [],
      predictions: {
        nextHour: 96,
        nextDay: 94,
        nextWeek: 92,
      },
    },
    {
      id: 'code-check-agent',
      name: 'Code Check Agent',
      status: 'warning',
      performance: 92,
      responseTime: 1.2,
      errorRate: 0.8,
      requestsPerMinute: 156,
      cpuUsage: 34.7,
      memoryUsage: 52.3,
      networkLatency: 18.9,
      lastHeartbeat: '2024-01-20T14:29:00Z',
      alerts: ['High memory usage detected', 'Response time increasing'],
      predictions: {
        nextHour: 90,
        nextDay: 88,
        nextWeek: 85,
      },
    },
    {
      id: 'fraud-watch-agent',
      name: 'Fraud Watch Agent',
      status: 'active',
      performance: 98,
      responseTime: 0.3,
      errorRate: 0.1,
      requestsPerMinute: 892,
      cpuUsage: 67.2,
      memoryUsage: 78.9,
      networkLatency: 5.4,
      lastHeartbeat: '2024-01-20T14:30:00Z',
      alerts: [],
      predictions: {
        nextHour: 99,
        nextDay: 98,
        nextWeek: 97,
      },
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High Memory Usage',
      description: 'Code Check Agent memory usage is at 85%',
      timestamp: '2024-01-20T14:25:00Z',
      agent: 'code-check-agent',
      severity: 'medium',
      resolved: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Performance Optimization',
      description: 'System performance improved by 3%',
      timestamp: '2024-01-20T14:20:00Z',
      severity: 'low',
      resolved: true,
    },
    {
      id: '3',
      type: 'error',
      title: 'Network Latency',
      description: 'Network latency increased by 15ms',
      timestamp: '2024-01-20T14:15:00Z',
      severity: 'high',
      resolved: false,
    },
  ]);

  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      metric: 'CPU Usage',
      currentValue: 45.2,
      predictedValue: 52.1,
      confidence: 87,
      trend: 'up',
      timeframe: 'Next 24 hours',
    },
    {
      metric: 'Memory Usage',
      currentValue: 67.8,
      predictedValue: 72.3,
      confidence: 92,
      trend: 'up',
      timeframe: 'Next 24 hours',
    },
    {
      metric: 'Error Rate',
      currentValue: 0.3,
      predictedValue: 0.2,
      confidence: 78,
      trend: 'down',
      timeframe: 'Next 24 hours',
    },
    {
      metric: 'Response Time',
      currentValue: 1.2,
      predictedValue: 1.1,
      confidence: 85,
      trend: 'down',
      timeframe: 'Next 24 hours',
    },
  ]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate real-time data updates
      setSystemMetrics(prev => ({
        ...prev,
        cpu: prev.cpu + (Math.random() - 0.5) * 2,
        memory: prev.memory + (Math.random() - 0.5) * 1,
        disk: prev.disk + (Math.random() - 0.5) * 0.5,
        network: prev.network + (Math.random() - 0.5) * 3,
      }));
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'offline':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'high':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(alert => (alert.id === alertId ? { ...alert, resolved: true } : alert))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Enhanced Monitoring Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time monitoring with predictive analytics and automated recovery
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedTimeRange}
            onChange={e => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={e => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Auto-refresh</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { key: 'overview', label: 'Overview', icon: Eye },
          { key: 'detailed', label: 'Detailed', icon: BarChart3 },
          { key: 'predictive', label: 'Predictive', icon: TrendingUp },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setViewMode(key as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === key
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {viewMode === 'overview' && (
        <>
          {/* System Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">CPU Usage</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {systemMetrics.cpu.toFixed(1)}%
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Target: 70%</span>
                  <span className="text-green-600">Good</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(systemMetrics.cpu, 100)}%` }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Memory Usage
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {systemMetrics.memory.toFixed(1)}%
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <Memory className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Target: 80%</span>
                  <span className="text-green-600">Good</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(systemMetrics.memory, 100)}%` }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Network</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {systemMetrics.network.toFixed(1)}%
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Network className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Target: 90%</span>
                  <span className="text-green-600">Good</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(systemMetrics.network, 100)}%` }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    System Uptime
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {systemMetrics.uptime.toFixed(1)}%
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                  <Server className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Target: 99.9%</span>
                  <span className="text-green-600">Excellent</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(systemMetrics.uptime, 100)}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Agent Status Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Agent Status Overview
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Auto-refresh: {refreshInterval}ms
                </span>
                <button className="text-blue-600 hover:text-blue-700">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agentMetrics.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">{agent.name}</h4>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        agent.status
                      )}`}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Performance:</span>
                      <span className="font-medium">{agent.performance}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Response Time:</span>
                      <span className="font-medium">{agent.responseTime}s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Error Rate:</span>
                      <span className="font-medium">{agent.errorRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">CPU:</span>
                      <span className="font-medium">{agent.cpuUsage}%</span>
                    </div>
                  </div>
                  {agent.alerts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-yellow-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs">{agent.alerts.length} alerts</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

      {viewMode === 'detailed' && (
        <>
          {/* Detailed System Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Performance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Load Average</span>
                  <span className="font-medium">{systemMetrics.loadAverage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Temperature</span>
                  <span className="font-medium">{systemMetrics.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Power Usage</span>
                  <span className="font-medium">{systemMetrics.power}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Disk Usage</span>
                  <span className="font-medium">{systemMetrics.disk}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Network Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Bandwidth</span>
                  <span className="font-medium">{systemMetrics.network} Mbps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Latency</span>
                  <span className="font-medium">12.3ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Packet Loss</span>
                  <span className="font-medium">0.01%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Connections</span>
                  <span className="font-medium">1,247</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Agent Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Detailed Agent Metrics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Agent
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Performance
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Response Time
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Error Rate
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      CPU
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Memory
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Last Heartbeat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agentMetrics.map((agent, index) => (
                    <tr key={agent.id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {agent.name}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            agent.status
                          )}`}
                        >
                          {agent.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{agent.performance}%</span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${agent.performance}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{agent.responseTime}s</td>
                      <td className="py-3 px-4 font-medium">{agent.errorRate}%</td>
                      <td className="py-3 px-4 font-medium">{agent.cpuUsage}%</td>
                      <td className="py-3 px-4 font-medium">{agent.memoryUsage}%</td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {formatTime(agent.lastHeartbeat)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {viewMode === 'predictive' && (
        <>
          {/* Predictive Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Performance Predictions
              </h3>
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <motion.div
                    key={prediction.metric}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {prediction.metric}
                      </span>
                      {getTrendIcon(prediction.trend)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Current: {prediction.currentValue}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Predicted: {prediction.predictedValue}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Confidence: {prediction.confidence}%</span>
                        <span>{prediction.timeframe}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Agent Performance Forecast
              </h3>
              <div className="space-y-4">
                {agentMetrics.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {agent.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Current: {agent.performance}%
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Next Hour:</span>
                        <span className="font-medium">{agent.predictions.nextHour}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Next Day:</span>
                        <span className="font-medium">{agent.predictions.nextDay}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Next Week:</span>
                        <span className="font-medium">{agent.predictions.nextWeek}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Alerts Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Alerts</h3>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {alerts.filter(alert => !alert.resolved).length} active
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                alert.resolved
                  ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                  {alert.type === 'error' && <AlertTriangle className="w-4 h-4" />}
                  {alert.type === 'warning' && <AlertCircle className="w-4 h-4" />}
                  {alert.type === 'info' && <Info className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{alert.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{alert.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatTime(alert.timestamp)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!alert.resolved && (
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Resolve
                  </button>
                )}
                {alert.resolved && (
                  <span className="text-sm text-green-600 dark:text-green-400">Resolved</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
