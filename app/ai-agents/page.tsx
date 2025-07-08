'use client';

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
  Bot,
} from 'lucide-react';
import Link from 'next/link';

interface AIAgent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'training' | 'error';
  type: 'chatbot' | 'analytics' | 'automation' | 'prediction';
  performance: {
    accuracy: number;
    responseTime: number;
    uptime: number;
    conversations: number;
  };
  lastActive: string;
  version: string;
}

const mockAgents: AIAgent[] = [
  {
    id: '1',
    name: 'EHB Support Bot',
    description: 'AI-powered customer support assistant',
    status: 'active',
    type: 'chatbot',
    performance: {
      accuracy: 94.2,
      responseTime: 1.2,
      uptime: 99.8,
      conversations: 1247,
    },
    lastActive: '2 minutes ago',
    version: 'v2.1.0',
  },
  {
    id: '2',
    name: 'Project Analytics AI',
    description: 'Advanced project performance analysis',
    status: 'active',
    type: 'analytics',
    performance: {
      accuracy: 96.8,
      responseTime: 3.5,
      uptime: 99.9,
      conversations: 89,
    },
    lastActive: '5 minutes ago',
    version: 'v1.5.2',
  },
  {
    id: '3',
    name: 'Task Automation Bot',
    description: 'Automates repetitive development tasks',
    status: 'training',
    type: 'automation',
    performance: {
      accuracy: 87.3,
      responseTime: 0.8,
      uptime: 98.5,
      conversations: 456,
    },
    lastActive: '1 hour ago',
    version: 'v1.0.0',
  },
  {
    id: '4',
    name: 'Risk Prediction AI',
    description: 'Predicts project risks and delays',
    status: 'inactive',
    type: 'prediction',
    performance: {
      accuracy: 91.5,
      responseTime: 2.1,
      uptime: 97.2,
      conversations: 234,
    },
    lastActive: '3 hours ago',
    version: 'v1.2.1',
  },
];

const StatusBadge: React.FC<{ status: AIAgent['status'] }> = ({ status }) => {
  const config = {
    active: { color: 'bg-green-100 text-green-800', text: 'Active' },
    inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inactive' },
    training: { color: 'bg-yellow-100 text-yellow-800', text: 'Training' },
    error: { color: 'bg-red-100 text-red-800', text: 'Error' },
  };

  const { color, text } = config[status];

  return (
    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {text}
    </span>
  );
};

const AgentCard: React.FC<{
  agent: AIAgent;
  onAction: (action: string, agentId: string) => void;
}> = ({ agent, onAction }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Bot className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-600">{agent.description}</p>
        </div>
      </div>
      <StatusBadge status={agent.status} />
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">Accuracy</p>
        <p className="text-lg font-semibold text-gray-900">{agent.performance.accuracy}%</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">Response Time</p>
        <p className="text-lg font-semibold text-gray-900">{agent.performance.responseTime}s</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">Uptime</p>
        <p className="text-lg font-semibold text-gray-900">{agent.performance.uptime}%</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">Conversations</p>
        <p className="text-lg font-semibold text-gray-900">{agent.performance.conversations}</p>
      </div>
    </div>

    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
      <span>Version {agent.version}</span>
      <span>Last active: {agent.lastActive}</span>
    </div>

    <div className="flex gap-2">
      {agent.status === 'active' ? (
        <button
          onClick={() => onAction('pause', agent.id)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          <Pause className="w-4 h-4" />
          Pause
        </button>
      ) : (
        <button
          onClick={() => onAction('start', agent.id)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
        >
          <Play className="w-4 h-4" />
          Start
        </button>
      )}

      <button
        onClick={() => onAction('settings', agent.id)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        <Settings className="w-4 h-4" />
        Settings
      </button>

      <button
        onClick={() => onAction('delete', agent.id)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  </div>
);

/**
 * EHB AI Agents Dashboard - Comprehensive AI agent management system
 * @returns {JSX.Element} The AI agents dashboard component
 */
export default function AIAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>(mockAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAgents(prev =>
        prev.map(agent => ({
          ...agent,
          performance: {
            ...agent.performance,
            accuracy: Math.max(
              80,
              Math.min(100, agent.performance.accuracy + (Math.random() - 0.5) * 2)
            ),
            responseTime: Math.max(
              0.5,
              Math.min(5, agent.performance.responseTime + (Math.random() - 0.5) * 0.2)
            ),
          },
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAgentAction = (action: string, agentId: string) => {
    switch (action) {
      case 'start':
        setAgents(prev =>
          prev.map(agent =>
            agent.id === agentId ? { ...agent, status: 'active' as const } : agent
          )
        );
        break;
      case 'pause':
        setAgents(prev =>
          prev.map(agent =>
            agent.id === agentId ? { ...agent, status: 'inactive' as const } : agent
          )
        );
        break;
      case 'delete':
        setAgents(prev => prev.filter(agent => agent.id !== agentId));
        break;
      case 'settings':
        // Handle settings modal
        break;
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || agent.type === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: agents.length,
    active: agents.filter(a => a.status === 'active').length,
    training: agents.filter(a => a.status === 'training').length,
    inactive: agents.filter(a => a.status === 'inactive').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Agents</h1>
              <p className="text-gray-600 mt-1">Manage and monitor your AI agents</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Training</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.training}</p>
              </div>
              <Brain className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
              </div>
              <Pause className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="chatbot">Chatbot</option>
                <option value="analytics">Analytics</option>
                <option value="automation">Automation</option>
                <option value="prediction">Prediction</option>
              </select>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} onAction={handleAgentAction} />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Create Agent Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New AI Agent</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Agent Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter agent name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter agent description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="chatbot">Chatbot</option>
                  <option value="analytics">Analytics</option>
                  <option value="automation">Automation</option>
                  <option value="prediction">Prediction</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
