'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Network,
  Play,
  Pause,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  Zap,
  Target,
  BarChart3,
  Activity,
  Users,
  Database,
  Server,
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
 * AI Agent Orchestration - Coordinate multiple AI agents in workflows
 * @returns {JSX.Element} The AI agent orchestration component
 */
export default function AIAgentOrchestrationPage() {
  const [activeTab, setActiveTab] = useState('workflows');
  const [selectedWorkflow, setSelectedWorkflow] = useState('');

  // Mock orchestration data
  const workflows = [
    {
      id: 1,
      name: 'Customer Support Pipeline',
      description: 'End-to-end customer support workflow with multiple AI agents',
      status: 'active',
      agents: 5,
      totalRuns: 1247,
      successRate: 94.2,
      avgExecutionTime: '2.3 minutes',
      lastRun: '2024-01-15T10:30:00Z',
      agentsList: [
        { name: 'Intent Classifier', status: 'active', type: 'nlp' },
        { name: 'Knowledge Base Agent', status: 'active', type: 'search' },
        { name: 'Escalation Handler', status: 'active', type: 'routing' },
        { name: 'Sentiment Analyzer', status: 'active', type: 'nlp' },
        { name: 'Resolution Tracker', status: 'active', type: 'analytics' },
      ],
      triggers: ['New Ticket', 'Customer Message', 'Escalation Request'],
      outputs: ['Resolved Ticket', 'Customer Satisfaction', 'Analytics Report'],
    },
    {
      id: 2,
      name: 'Sales Lead Processing',
      description: 'Automated lead qualification and follow-up system',
      status: 'paused',
      agents: 4,
      totalRuns: 892,
      successRate: 89.7,
      avgExecutionTime: '1.8 minutes',
      lastRun: '2024-01-14T16:45:00Z',
      agentsList: [
        { name: 'Lead Scorer', status: 'active', type: 'analytics' },
        { name: 'Email Composer', status: 'paused', type: 'nlp' },
        { name: 'CRM Updater', status: 'active', type: 'integration' },
        { name: 'Follow-up Scheduler', status: 'active', type: 'automation' },
      ],
      triggers: ['New Lead', 'Website Form', 'Email Response'],
      outputs: ['Qualified Lead', 'Follow-up Email', 'CRM Record'],
    },
    {
      id: 3,
      name: 'Fraud Detection System',
      description: 'Multi-layered fraud detection and prevention',
      status: 'active',
      agents: 6,
      totalRuns: 2341,
      successRate: 97.8,
      avgExecutionTime: '0.8 minutes',
      lastRun: '2024-01-15T09:15:00Z',
      agentsList: [
        { name: 'Transaction Analyzer', status: 'active', type: 'analytics' },
        { name: 'Pattern Detector', status: 'active', type: 'ml' },
        { name: 'Risk Assessor', status: 'active', type: 'analytics' },
        { name: 'Alert Generator', status: 'active', type: 'notification' },
        { name: 'Blocking Agent', status: 'active', type: 'security' },
        { name: 'Report Generator', status: 'active', type: 'reporting' },
      ],
      triggers: ['New Transaction', 'Suspicious Activity', 'Manual Review'],
      outputs: ['Fraud Alert', 'Blocked Transaction', 'Security Report'],
    },
  ];

  const availableAgents = [
    {
      id: 1,
      name: 'Intent Classifier',
      type: 'nlp',
      description: 'Classifies user intent from natural language',
      status: 'available',
      avgResponseTime: '0.3s',
      successRate: 96.5,
      icon: Brain,
      color: 'blue',
    },
    {
      id: 2,
      name: 'Knowledge Base Agent',
      type: 'search',
      description: 'Searches and retrieves relevant information',
      status: 'available',
      avgResponseTime: '0.8s',
      successRate: 94.2,
      icon: Database,
      color: 'green',
    },
    {
      id: 3,
      name: 'Email Composer',
      type: 'nlp',
      description: 'Generates personalized email responses',
      status: 'available',
      avgResponseTime: '1.2s',
      successRate: 91.8,
      icon: MessageSquare,
      color: 'purple',
    },
    {
      id: 4,
      name: 'Analytics Agent',
      type: 'analytics',
      description: 'Performs data analysis and generates insights',
      status: 'available',
      avgResponseTime: '2.1s',
      successRate: 93.7,
      icon: BarChart3,
      color: 'orange',
    },
  ];

  const workflowTemplates = [
    {
      name: 'Customer Support',
      description: 'Complete customer support workflow',
      agents: 5,
      estimatedTime: '2-3 minutes',
      complexity: 'Medium',
      successRate: '94%',
    },
    {
      name: 'Lead Processing',
      description: 'Automated lead qualification',
      agents: 4,
      estimatedTime: '1-2 minutes',
      complexity: 'Low',
      successRate: '89%',
    },
    {
      name: 'Fraud Detection',
      description: 'Multi-layered security system',
      agents: 6,
      estimatedTime: '30-60 seconds',
      complexity: 'High',
      successRate: '97%',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'stopped':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'paused':
        return Pause;
      case 'stopped':
        return AlertTriangle;
      default:
        return Clock;
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
                  AI Agent Orchestration
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Coordinate multiple AI agents in powerful workflows and pipelines
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
                { id: 'workflows', name: 'Active Workflows', icon: Network },
                { id: 'agents', name: 'Available Agents', icon: Brain },
                { id: 'templates', name: 'Workflow Templates', icon: FileText },
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
        {/* Active Workflows Tab */}
        {activeTab === 'workflows' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Active Workflows
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor and manage your AI agent orchestration workflows
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Create Workflow
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {workflows.map((workflow, index) => (
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {workflow.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {workflow.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          workflow.status
                        )}`}
                      >
                        {workflow.status}
                      </span>
                      <div className="flex items-center gap-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Workflow Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Agents</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {workflow.agents}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Runs</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {workflow.totalRuns.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {workflow.successRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Time</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {workflow.avgExecutionTime}
                      </p>
                    </div>
                  </div>

                  {/* Agent List */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Agents in Workflow
                    </p>
                    <div className="space-y-2">
                      {workflow.agentsList.map((agent, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {agent.name}
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                              {agent.type}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              agent.status
                            )}`}
                          >
                            {agent.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Triggers and Outputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Triggers
                      </p>
                      <div className="space-y-1">
                        {workflow.triggers.map((trigger, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Zap className="w-3 h-3 text-blue-600" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {trigger}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Outputs
                      </p>
                      <div className="space-y-1">
                        {workflow.outputs.map((output, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Target className="w-3 h-3 text-green-600" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {output}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Last Run Info */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Run</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(workflow.lastRun)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {workflow.status === 'active' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                        <Pause className="w-4 h-4" />
                        Pause Workflow
                      </button>
                    )}
                    {workflow.status === 'paused' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Play className="w-4 h-4" />
                        Resume Workflow
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                      Analytics
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Available Agents Tab */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Available Agents
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Browse and add agents to your orchestration workflows
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 bg-${agent.color}-100 dark:bg-${agent.color}-900 rounded-lg`}
                    >
                      <agent.icon className={`w-6 h-6 text-${agent.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {agent.type} Agent
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {agent.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {agent.avgResponseTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {agent.successRate}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-4 h-4" />
                      Add to Workflow
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Eye className="w-4 h-4" />
                      Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Workflow Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Workflow Templates
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Pre-built workflow templates to get you started quickly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workflowTemplates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {template.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Agents</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {template.agents}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Estimated Time
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {template.estimatedTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Complexity</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {template.complexity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {template.successRate}
                      </span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Use Template
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
