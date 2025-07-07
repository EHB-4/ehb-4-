'use client';

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  Search,
  Filter,
  Play,
  Heart,
  Star,
  Eye,
  Share2,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Truck,
  CreditCard,
  ArrowRight,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Filter as FilterIcon,
  X,
  Plus,
  Minus,
  Video,
  Music,
  Gamepad2,
  BookOpen,
  Film,
  Tv,
  Radio,
  Mic,
  Camera,
  Headphones,
  Volume2,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Pause,
  Phone,
  MessageCircle,
  Calendar,
  UserCheck,
  Zap,
  Activity,
  Bell,
  Award,
} from 'lucide-react';
import {
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  projects: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  budget: number;
  spent: number;
}

interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  members: number;
  projects: number;
  budget: number;
  status: 'active' | 'inactive';
}

interface VerificationSession {
  id: string;
  title: string;
  description: string;
  type: 'video-call' | 'voice-call' | 'document-review' | 'live-interview';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  scheduledDate: string;
  duration: number;
  verifier: string;
  sqlLevelRequired?: number;
  sqlLevelUnlocked?: number;
}

const sqlLevelConfig = {
  0: { name: 'Free', color: 'gray', description: 'No verification required' },
  1: { name: 'Basic', color: 'blue', description: 'PSS (KYC + Documents) verified' },
  2: { name: 'Normal', color: 'yellow', description: 'PSS + EDR (Skill Test) verified' },
  3: { name: 'High', color: 'orange', description: 'Normal + EMO/Live Check verified' },
  4: { name: 'VIP', color: 'green', description: 'Full chain + income/trust verified' },
};

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    department: 'Executive',
    email: 'sarah.johnson@ehb.com',
    avatar: '/api/placeholder/40/40',
    status: 'active',
    joinDate: '2023-01-15',
    projects: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    department: 'Technology',
    email: 'michael.chen@ehb.com',
    avatar: '/api/placeholder/40/40',
    status: 'active',
    joinDate: '2023-02-20',
    projects: 8,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Head of Marketing',
    department: 'Marketing',
    email: 'emily.rodriguez@ehb.com',
    avatar: '/api/placeholder/40/40',
    status: 'active',
    joinDate: '2023-03-10',
    projects: 3,
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Senior Developer',
    department: 'Technology',
    email: 'david.kim@ehb.com',
    avatar: '/api/placeholder/40/40',
    status: 'active',
    joinDate: '2023-04-05',
    projects: 6,
  },
  {
    id: '5',
    name: 'Lisa Wang',
    role: 'Product Manager',
    department: 'Product',
    email: 'lisa.wang@ehb.com',
    avatar: '/api/placeholder/40/40',
    status: 'pending',
    joinDate: '2023-05-12',
    projects: 2,
  },
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'EHB Platform v2.0',
    description: 'Complete platform redesign with new features',
    status: 'active',
    priority: 'high',
    progress: 75,
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    team: ['Sarah Johnson', 'Michael Chen', 'David Kim'],
    budget: 500000,
    spent: 375000,
  },
  {
    id: '2',
    name: 'GoSellr Integration',
    description: 'Integrate GoSellr marketplace with main platform',
    status: 'active',
    priority: 'critical',
    progress: 45,
    startDate: '2023-07-15',
    endDate: '2023-11-30',
    team: ['Michael Chen', 'David Kim', 'Lisa Wang'],
    budget: 200000,
    spent: 90000,
  },
  {
    id: '3',
    name: 'Marketing Campaign Q4',
    description: 'Q4 marketing campaign for platform launch',
    status: 'planning',
    priority: 'medium',
    progress: 20,
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    team: ['Emily Rodriguez'],
    budget: 100000,
    spent: 20000,
  },
  {
    id: '4',
    name: 'Security Audit',
    description: 'Comprehensive security audit of all systems',
    status: 'completed',
    priority: 'high',
    progress: 100,
    startDate: '2023-05-01',
    endDate: '2023-08-31',
    team: ['Michael Chen', 'David Kim'],
    budget: 75000,
    spent: 75000,
  },
];

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Executive',
    description: 'Executive leadership and strategic planning',
    head: 'Sarah Johnson',
    members: 3,
    projects: 2,
    budget: 1000000,
    status: 'active',
  },
  {
    id: '2',
    name: 'Technology',
    description: 'Software development and technical operations',
    head: 'Michael Chen',
    members: 12,
    projects: 8,
    budget: 800000,
    status: 'active',
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Marketing, branding, and customer acquisition',
    head: 'Emily Rodriguez',
    members: 6,
    projects: 4,
    budget: 300000,
    status: 'active',
  },
  {
    id: '4',
    name: 'Product',
    description: 'Product management and user experience',
    head: 'Lisa Wang',
    members: 4,
    projects: 3,
    budget: 200000,
    status: 'active',
  },
];

const mockVerificationSessions: VerificationSession[] = [
  {
    id: '1',
    title: 'Basic Identity Verification Call',
    description: 'Video call verification - Required for SQL High Level',
    type: 'video-call',
    status: 'scheduled',
    priority: 'high',
    scheduledDate: '2024-01-25T10:00:00Z',
    duration: 15,
    verifier: 'Sarah Johnson',
    sqlLevelRequired: 2,
    sqlLevelUnlocked: 3,
  },
  {
    id: '2',
    title: 'Advanced Business Verification',
    description: 'Document review and interview - Required for SQL VIP Level',
    type: 'live-interview',
    status: 'in-progress',
    priority: 'critical',
    scheduledDate: '2024-01-26T14:00:00Z',
    duration: 30,
    verifier: 'Michael Chen',
    sqlLevelRequired: 3,
    sqlLevelUnlocked: 4,
  },
  {
    id: '3',
    title: 'Voice Verification Session',
    description: 'Voice-based identity verification',
    type: 'voice-call',
    status: 'completed',
    priority: 'medium',
    scheduledDate: '2024-01-24T09:00:00Z',
    duration: 10,
    verifier: 'Emily Rodriguez',
    sqlLevelRequired: 2,
    sqlLevelUnlocked: 3,
  },
];

/**
 * EMO (Emotional & Mental Operations) - Live Verification System
 * SQL Level System ke sath integrated live verification platform
 * @returns {JSX.Element} The EMO live verification system component
 */
export default function EMOPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [verificationSessions, setVerificationSessions] =
    useState<VerificationSession[]>(mockVerificationSessions);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentSQLLevel, setCurrentSQLLevel] = useState(2);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
      case 'planning':
        return 'text-yellow-600 bg-yellow-100';
      case 'inactive':
      case 'on-hold':
        return 'text-gray-600 bg-gray-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const stats = {
    totalSessions: verificationSessions.length,
    completedSessions: verificationSessions.filter(v => v.status === 'completed').length,
    scheduledSessions: verificationSessions.filter(v => v.status === 'scheduled').length,
    inProgressSessions: verificationSessions.filter(v => v.status === 'in-progress').length,
  };

  const emoCompletionPercentage = Math.round((stats.completedSessions / stats.totalSessions) * 100);

  const filteredSessions = verificationSessions.filter(session => {
    const matchesStatus = selectedStatus === 'all' || session.status === selectedStatus;
    const matchesType = selectedType === 'all' || session.type === selectedType;
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  const handleStartSession = (sessionId: string) => {
    toast.info('Live verification session start ho raha hai...');
  };

  const handleSessionComplete = (sessionId: string) => {
    setVerificationSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, status: 'completed' as const } : s))
    );
    toast.success('Live verification successfully complete ho gaya hai!');
  };

  const handleSQLLevelUpgrade = () => {
    if (emoCompletionPercentage >= 100) {
      setCurrentSQLLevel(prev => Math.min(prev + 1, 4));
      toast.success('SQL level upgrade ho gaya hai!');
    } else {
      toast.error('EMO completion 100% honi chahiye SQL level upgrade ke liye');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header with SQL Level Integration */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EMO</h1>
                <p className="text-green-600 font-medium">Emotional & Mental Operations</p>
                <p className="text-sm text-gray-500">
                  SQL Level {currentSQLLevel} -{' '}
                  {sqlLevelConfig[currentSQLLevel as keyof typeof sqlLevelConfig]?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">
                  {emoCompletionPercentage}% Complete
                </span>
              </div>
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-green-800 text-sm font-medium">Live Verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Level Progress Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">SQL Level Live Verification</h2>
            <Link
              href="/sql"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700"
            >
              <span>View SQL Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Current Level</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {sqlLevelConfig[currentSQLLevel as keyof typeof sqlLevelConfig]?.name}
              </p>
              <p className="text-sm text-green-700">
                {sqlLevelConfig[currentSQLLevel as keyof typeof sqlLevelConfig]?.description}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">EMO Completion</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{emoCompletionPercentage}%</p>
              <p className="text-sm text-blue-700">
                {stats.completedSessions} of {stats.totalSessions} sessions complete
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ArrowRight className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">Next Level</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {sqlLevelConfig[(currentSQLLevel + 1) as keyof typeof sqlLevelConfig]?.name ||
                  'Max Level'}
              </p>
              <p className="text-sm text-purple-700">Complete all verifications for VIP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Team Members
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">{mockTeamMembers.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mockProjects.filter(p => p.status === 'active').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Departments</dt>
                    <dd className="text-lg font-medium text-gray-900">{mockDepartments.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Avg Project Progress
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {Math.round(
                        mockProjects.reduce((acc, p) => acc + p.progress, 0) / mockProjects.length
                      )}
                      %
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: ChartBarIcon },
                { id: 'team', name: 'Team Management', icon: UserGroupIcon },
                { id: 'projects', name: 'Projects', icon: DocumentTextIcon },
                { id: 'departments', name: 'Departments', icon: CogIcon },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="block px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Filter by status"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                  <option value="completed">Completed</option>
                  <option value="planning">Planning</option>
                  <option value="on-hold">On Hold</option>
                </select>
                {activeTab === 'team' && (
                  <select
                    value={departmentFilter}
                    onChange={e => setDepartmentFilter(e.target.value)}
                    className="block px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Filter by department"
                  >
                    <option value="all">All Departments</option>
                    {mockDepartments.map(dept => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Projects */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Projects</h3>
                    <div className="space-y-4">
                      {mockProjects.slice(0, 3).map(project => (
                        <div key={project.id} className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{project.name}</h4>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}
                            >
                              {project.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex-1 mr-4">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}
                            >
                              {project.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Overview */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Team Overview</h3>
                    <div className="space-y-4">
                      {mockDepartments.map(dept => (
                        <div key={dept.id} className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900">{dept.name}</h4>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(dept.status)}`}
                            >
                              {dept.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Head: {dept.head}</span>
                            <span>{dept.members} members</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Projects
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTeamMembers.map(member => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={member.avatar}
                                alt={member.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {member.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {member.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {member.projects}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(member.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                {mockProjects.map(project => (
                  <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}
                        >
                          {project.status}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}
                        >
                          {project.priority}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Progress</p>
                        <div className="flex items-center mt-1">
                          <div className="flex-1 mr-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Timeline</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {new Date(project.startDate).toLocaleDateString()} -{' '}
                          {new Date(project.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Team</p>
                        <p className="text-sm font-medium text-gray-900">
                          {project.team.join(', ')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-900">
                          View Details
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'departments' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockDepartments.map(dept => (
                  <div key={dept.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{dept.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{dept.description}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(dept.status)}`}
                      >
                        {dept.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Head:</span>
                        <span className="font-medium text-gray-900">{dept.head}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Members:</span>
                        <span className="font-medium text-gray-900">{dept.members}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Projects:</span>
                        <span className="font-medium text-gray-900">{dept.projects}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Budget:</span>
                        <span className="font-medium text-gray-900">
                          ${dept.budget.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-900 border border-blue-600 rounded-md hover:bg-blue-50">
                          View Members
                        </button>
                        <button className="flex-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
