'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Copy,
  Download,
  Play,
  Pause,
  Stop,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Database,
  Server,
  Network,
  Globe,
  Smartphone,
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
  DanishKrona as DanishKronaIcon,
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
 * AI Agent Fault Tolerance - Error handling and recovery mechanisms
 * @returns {JSX.Element} The AI agent fault tolerance component
 */
export default function AIAgentFaultTolerancePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAgent, setSelectedAgent] = useState('all');

  // Mock fault tolerance data
  const systemHealth = {
    overallStatus: 'healthy',
    uptime: '99.97%',
    lastIncident: '2024-01-10T14:30:00Z',
    totalIncidents: 3,
    resolvedIncidents: 3,
    activeFailures: 0,
    recoveryTime: '2.3 minutes',
  };

  const agents = [
    {
      id: 1,
      name: 'SOT Orchestrator',
      status: 'healthy',
      uptime: '99.98%',
      lastFailure: '2024-01-08T09:15:00Z',
      failures: 2,
      recoveryTime: '1.2 minutes',
      redundancy: 'active-active',
      backupAgents: ['SOT Orchestrator Backup 1', 'SOT Orchestrator Backup 2'],
      healthChecks: {
        cpu: 23,
        memory: 45,
        network: 98,
        responseTime: 0.8,
      },
    },
    {
      id: 2,
      name: 'Code Check Agent',
      status: 'degraded',
      uptime: '99.85%',
      lastFailure: '2024-01-15T10:30:00Z',
      failures: 5,
      recoveryTime: '3.1 minutes',
      redundancy: 'active-passive',
      backupAgents: ['Code Check Agent Backup'],
      healthChecks: {
        cpu: 67,
        memory: 78,
        network: 95,
        responseTime: 2.1,
      },
    },
    {
      id: 3,
      name: 'Fraud Watch Agent',
      status: 'healthy',
      uptime: '99.99%',
      lastFailure: '2024-01-05T16:45:00Z',
      failures: 1,
      recoveryTime: '0.8 minutes',
      redundancy: 'active-active',
      backupAgents: [
        'Fraud Watch Agent Backup 1',
        'Fraud Watch Agent Backup 2',
        'Fraud Watch Agent Backup 3',
      ],
      healthChecks: {
        cpu: 34,
        memory: 52,
        network: 99,
        responseTime: 0.3,
      },
    },
  ];

  const incidents = [
    {
      id: 1,
      timestamp: '2024-01-15T10:30:00Z',
      agent: 'Code Check Agent',
      severity: 'medium',
      type: 'High CPU Usage',
      description: 'CPU usage exceeded 80% threshold for 5 minutes',
      status: 'resolved',
      resolution: 'Auto-scaled additional instances',
      duration: '3.1 minutes',
      impact: 'Temporary slowdown in code validation',
    },
    {
      id: 2,
      timestamp: '2024-01-10T14:30:00Z',
      agent: 'SOT Orchestrator',
      severity: 'low',
      type: 'Network Latency',
      description: 'Network response time increased by 200ms',
      status: 'resolved',
      resolution: 'Switched to backup network path',
      duration: '2.3 minutes',
      impact: 'Minor delay in workflow execution',
    },
    {
      id: 3,
      timestamp: '2024-01-08T09:15:00Z',
      agent: 'SOT Orchestrator',
      severity: 'high',
      type: 'Memory Exhaustion',
      description: 'Memory usage reached 95% causing service degradation',
      status: 'resolved',
      resolution: 'Restarted service and cleared cache',
      duration: '1.2 minutes',
      impact: 'Brief service interruption',
    },
  ];

  const recoveryStrategies = [
    {
      name: 'Auto-Restart',
      description: 'Automatically restart failed services',
      triggers: ['Service crash', 'Memory exhaustion', 'CPU overload'],
      successRate: '95%',
      avgRecoveryTime: '30 seconds',
      enabled: true,
    },
    {
      name: 'Load Balancing',
      description: 'Distribute load across multiple instances',
      triggers: ['High traffic', 'Performance degradation'],
      successRate: '98%',
      avgRecoveryTime: '10 seconds',
      enabled: true,
    },
    {
      name: 'Failover',
      description: 'Switch to backup systems on failure',
      triggers: ['Primary system failure', 'Network issues'],
      successRate: '99%',
      avgRecoveryTime: '2 minutes',
      enabled: true,
    },
    {
      name: 'Circuit Breaker',
      description: 'Temporarily disable failing services',
      triggers: ['Repeated failures', 'Timeout errors'],
      successRate: '92%',
      avgRecoveryTime: '5 minutes',
      enabled: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'unhealthy':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
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
                  AI Agent Fault Tolerance
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Error handling, recovery mechanisms, and system resilience
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/ai-agents">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Brain className="w-4 h-4" />
                    Back to Agents
                  </button>
                </Link>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
              {[
                { id: 'overview', name: 'System Health', icon: Activity },
                { id: 'agents', name: 'Agent Status', icon: Shield },
                { id: 'incidents', name: 'Incidents', icon: AlertTriangle },
                { id: 'recovery', name: 'Recovery Strategies', icon: RefreshCw },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                System Health Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Overall system resilience and fault tolerance status
              </p>
            </div>

            {/* System Health Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: 'Overall Status',
                  value: systemHealth.overallStatus,
                  icon: CheckCircle,
                  color: 'green',
                },
                { label: 'Uptime', value: systemHealth.uptime, icon: Activity, color: 'blue' },
                {
                  label: 'Active Failures',
                  value: systemHealth.activeFailures,
                  icon: AlertTriangle,
                  color: 'red',
                },
                {
                  label: 'Avg Recovery Time',
                  value: systemHealth.recoveryTime,
                  icon: RefreshCw,
                  color: 'purple',
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg`}
                    >
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* System Health Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Health Trends (Last 30 Days)
              </h3>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">
                  System health trend chart will be displayed here
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        System health check completed
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        All agents operating normally
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {formatDate(new Date().toISOString())}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Code Check Agent high CPU usage
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Auto-scaling triggered
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {formatDate('2024-01-15T10:30:00Z')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agent Status Tab */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Agent Status
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Individual agent health and fault tolerance status
                </p>
              </div>
              <select
                value={selectedAgent}
                onChange={e => setSelectedAgent(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filter by agent"
              >
                <option value="all">All Agents</option>
                <option value="SOT Orchestrator">SOT Orchestrator</option>
                <option value="Code Check Agent">Code Check Agent</option>
                <option value="Fraud Watch Agent">Fraud Watch Agent</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agents
                .filter(agent => selectedAgent === 'all' || agent.name === selectedAgent)
                .map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {agent.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Uptime: {agent.uptime}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          agent.status
                        )}`}
                      >
                        {agent.status}
                      </span>
                    </div>

                    {/* Health Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                agent.healthChecks.cpu > 80
                                  ? 'bg-red-600'
                                  : agent.healthChecks.cpu > 60
                                    ? 'bg-yellow-600'
                                    : 'bg-green-600'
                              }`}
                              style={{ width: `${agent.healthChecks.cpu}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {agent.healthChecks.cpu}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                agent.healthChecks.memory > 80
                                  ? 'bg-red-600'
                                  : agent.healthChecks.memory > 60
                                    ? 'bg-yellow-600'
                                    : 'bg-green-600'
                              }`}
                              style={{ width: `${agent.healthChecks.memory}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {agent.healthChecks.memory}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Failure Info */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Last Failure
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatDate(agent.lastFailure)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Total Failures
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {agent.failures}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Recovery Time
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {agent.recoveryTime}
                        </span>
                      </div>
                    </div>

                    {/* Redundancy Info */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Redundancy: {agent.redundancy}
                      </p>
                      <div className="space-y-1">
                        {agent.backupAgents.map((backup, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            {backup}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                        Health Check
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Incident History
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Track and analyze system incidents and their resolutions
              </p>
            </div>

            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {incident.type}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {incident.agent} • {formatDate(incident.timestamp)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                          incident.severity
                        )}`}
                      >
                        {incident.severity}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          incident.status === 'resolved'
                            ? 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
                            : 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}
                      >
                        {incident.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {incident.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {incident.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Impact</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {incident.impact}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Resolution</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {incident.resolution}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Copy className="w-4 h-4" />
                      Copy Report
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recovery Strategies Tab */}
        {activeTab === 'recovery' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recovery Strategies
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure and manage automatic recovery mechanisms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recoveryStrategies.map((strategy, index) => (
                <motion.div
                  key={strategy.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {strategy.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {strategy.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          strategy.enabled
                            ? 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
                            : 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {strategy.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Triggers
                      </p>
                      <div className="space-y-1">
                        {strategy.triggers.map((trigger, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <AlertTriangle className="w-3 h-3 text-yellow-600" />
                            {trigger}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {strategy.successRate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Recovery Time</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {strategy.avgRecoveryTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        strategy.enabled
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {strategy.enabled ? (
                        <>
                          <Pause className="w-4 h-4" />
                          Disable
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Enable
                        </>
                      )}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Settings className="w-4 h-4" />
                      Configure
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
