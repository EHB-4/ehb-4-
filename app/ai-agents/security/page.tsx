"use client";

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Shield,
  AlertTriangle,
  CheckCircle,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Scan,
  Eye,
  EyeOff,
  Copy,
  Download,
  Settings,
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
 * AI Agent Security - Security monitoring and threat detection
 * @returns {JSX.Element} The AI agent security component
 */
export default function AIAgentSecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAgent, setSelectedAgent] = useState('all');

  // Mock security data
  const securityOverview = {
    overallStatus: 'secure',
    threatLevel: 'low',
    activeThreats: 0,
    blockedAttacks: 127,
    lastIncident: '2024-01-12T08:45:00Z',
    securityScore: 94,
    encryptionStatus: 'enabled',
    firewallStatus: 'active',
  };

  const agents = [
    {
      id: 1,
      name: 'SOT Orchestrator',
      status: 'secure',
      lastScan: '2024-01-15T10:30:00Z',
      vulnerabilities: 0,
      accessLevel: 'admin',
      encryption: 'AES-256',
      authentication: 'multi-factor',
      permissions: ['read', 'write', 'execute', 'admin'],
      securityEvents: [
        {
          type: 'login',
          timestamp: '2024-01-15T09:15:00Z',
          status: 'success',
          ip: '192.168.1.100',
        },
        {
          type: 'data_access',
          timestamp: '2024-01-15T08:30:00Z',
          status: 'success',
          ip: '192.168.1.100',
        },
      ],
    },
    {
      id: 2,
      name: 'Code Check Agent',
      status: 'warning',
      lastScan: '2024-01-14T16:20:00Z',
      vulnerabilities: 2,
      accessLevel: 'user',
      encryption: 'AES-256',
      authentication: 'password',
      permissions: ['read', 'write'],
      securityEvents: [
        {
          type: 'failed_login',
          timestamp: '2024-01-14T15:45:00Z',
          status: 'failed',
          ip: '192.168.1.105',
        },
        {
          type: 'login',
          timestamp: '2024-01-14T15:50:00Z',
          status: 'success',
          ip: '192.168.1.105',
        },
      ],
    },
    {
      id: 3,
      name: 'Fraud Watch Agent',
      status: 'secure',
      lastScan: '2024-01-15T11:00:00Z',
      vulnerabilities: 0,
      accessLevel: 'admin',
      encryption: 'AES-256',
      authentication: 'multi-factor',
      permissions: ['read', 'write', 'execute', 'admin'],
      securityEvents: [
        {
          type: 'threat_detected',
          timestamp: '2024-01-15T10:15:00Z',
          status: 'blocked',
          ip: '203.45.67.89',
        },
        {
          type: 'login',
          timestamp: '2024-01-15T09:00:00Z',
          status: 'success',
          ip: '192.168.1.100',
        },
      ],
    },
  ];

  const threats = [
    {
      id: 1,
      timestamp: '2024-01-15T10:15:00Z',
      type: 'SQL Injection Attempt',
      severity: 'high',
      source: '203.45.67.89',
      target: 'Fraud Watch Agent',
      status: 'blocked',
      description: 'Attempted SQL injection attack on authentication endpoint',
      action: 'IP blocked, alert sent',
    },
    {
      id: 2,
      timestamp: '2024-01-14T15:45:00Z',
      type: 'Failed Authentication',
      severity: 'medium',
      source: '192.168.1.105',
      target: 'Code Check Agent',
      status: 'resolved',
      description: 'Multiple failed login attempts detected',
      action: 'Account temporarily locked',
    },
    {
      id: 3,
      timestamp: '2024-01-12T08:45:00Z',
      type: 'Suspicious Activity',
      severity: 'low',
      source: '192.168.1.110',
      target: 'SOT Orchestrator',
      status: 'investigating',
      description: 'Unusual data access pattern detected',
      action: 'Monitoring increased',
    },
  ];

  const securityPolicies = [
    {
      name: 'Password Policy',
      description: 'Enforce strong password requirements',
      status: 'enabled',
      rules: [
        'Minimum 12 characters',
        'Include uppercase, lowercase, numbers, symbols',
        'No common passwords',
        'Change every 90 days',
      ],
    },
    {
      name: 'Multi-Factor Authentication',
      description: 'Require MFA for all admin accounts',
      status: 'enabled',
      rules: [
        'TOTP or SMS verification',
        'Required for admin access',
        'Optional for user accounts',
        'Backup codes provided',
      ],
    },
    {
      name: 'Access Control',
      description: 'Role-based access control system',
      status: 'enabled',
      rules: [
        'Principle of least privilege',
        'Regular access reviews',
        'Session timeout after 30 minutes',
        'IP whitelist for admin access',
      ],
    },
    {
      name: 'Data Encryption',
      description: 'Encrypt all sensitive data',
      status: 'enabled',
      rules: [
        'AES-256 encryption at rest',
        'TLS 1.3 for data in transit',
        'Key rotation every 90 days',
        'Secure key management',
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'critical':
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
                  AI Agent Security
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Security monitoring, threat detection, and access control
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
                { id: 'overview', name: 'Security Overview', icon: Shield },
                { id: 'agents', name: 'Agent Security', icon: Lock },
                { id: 'threats', name: 'Threat Detection', icon: AlertTriangle },
                { id: 'policies', name: 'Security Policies', icon: Settings },
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
        {/* Security Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Security Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Overall security status and threat landscape
              </p>
            </div>

            {/* Security Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: 'Security Status',
                  value: securityOverview.overallStatus,
                  icon: Shield,
                  color: 'green',
                },
                {
                  label: 'Threat Level',
                  value: securityOverview.threatLevel,
                  icon: AlertTriangle,
                  color: 'blue',
                },
                {
                  label: 'Active Threats',
                  value: securityOverview.activeThreats,
                  icon: Eye,
                  color: 'red',
                },
                {
                  label: 'Blocked Attacks',
                  value: securityOverview.blockedAttacks,
                  icon: Lock,
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

            {/* Security Score */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Security Score
                </h3>
                <span className="text-3xl font-bold text-green-600">
                  {securityOverview.securityScore}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-green-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${securityOverview.securityScore}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Encryption: {securityOverview.encryptionStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Firewall: {securityOverview.firewallStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Security Events */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Security Events
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Security scan completed
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        All systems secure, no vulnerabilities found
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {formatDate(new Date().toISOString())}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        SQL injection attempt blocked
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Source IP: 203.45.67.89
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {formatDate('2024-01-15T10:15:00Z')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agent Security Tab */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Agent Security Status
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Individual agent security configurations and status
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
                          Last scan: {formatDate(agent.lastScan)}
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

                    {/* Security Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Vulnerabilities
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            agent.vulnerabilities > 0 ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {agent.vulnerabilities}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Access Level
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {agent.accessLevel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Encryption</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {agent.encryption}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Authentication
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {agent.authentication}
                        </span>
                      </div>
                    </div>

                    {/* Permissions */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Permissions
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {agent.permissions.map((permission, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recent Security Events */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Recent Security Events
                      </p>
                      <div className="space-y-1">
                        {agent.securityEvents.slice(0, 2).map((event, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400">
                              {event.type} ({event.status})
                            </span>
                            <span className="text-gray-500 dark:text-gray-500">
                              {formatDate(event.timestamp).split(',')[1]}
                            </span>
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
                        <Scan className="w-4 h-4" />
                        Security Scan
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Threat Detection Tab */}
        {activeTab === 'threats' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Threat Detection
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor and respond to security threats and attacks
              </p>
            </div>

            <div className="space-y-4">
              {threats.map((threat, index) => (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {threat.type}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {threat.target} • {formatDate(threat.timestamp)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                          threat.severity
                        )}`}
                      >
                        {threat.severity}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          threat.status === 'blocked'
                            ? 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
                            : threat.status === 'resolved'
                            ? 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300'
                            : 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}
                      >
                        {threat.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {threat.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Source IP</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {threat.source}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Target</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {threat.target}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Action Taken</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {threat.action}
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

        {/* Security Policies Tab */}
        {activeTab === 'policies' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Security Policies
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure and manage security policies and access controls
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityPolicies.map((policy, index) => (
                <motion.div
                  key={policy.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {policy.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {policy.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          policy.status === 'enabled'
                            ? 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
                            : 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {policy.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rules
                      </p>
                      <div className="space-y-1">
                        {policy.rules.map((rule, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            {rule}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        policy.status === 'enabled'
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {policy.status === 'enabled' ? (
                        <>
                          <Lock className="w-4 h-4" />
                          Disable
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4" />
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
