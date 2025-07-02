'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  Shield,
  UserCheck,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Download,
  Search,
  Filter,
  BarChart3,
  Settings,
  Bell,
  Users,
  Key,
  Fingerprint,
  Camera,
  QrCode,
  ArrowRight,
  Star,
} from 'lucide-react';

// Roman Urdu: PSS verification ke liye interface
interface VerificationItem {
  id: string;
  type: 'kyc' | 'document' | 'fraud' | 'trust';
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  updatedAt: string;
  score?: number;
  sqlLevelRequired?: number; // SQL level requirement
}

// Roman Urdu: Mock data with SQL level integration
const mockVerifications: VerificationItem[] = [
  {
    id: '1',
    type: 'kyc',
    title: 'Identity Verification (KYC)',
    description: 'National ID card verification - Required for SQL Basic Level',
    status: 'approved',
    priority: 'high',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T11:15:00Z',
    score: 95,
    sqlLevelRequired: 1,
  },
  {
    id: '2',
    type: 'document',
    title: 'Address Verification',
    description: 'Utility bill verification - Required for SQL Normal Level',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-01-21T09:00:00Z',
    updatedAt: '2024-01-21T09:00:00Z',
    score: 75,
    sqlLevelRequired: 2,
  },
  {
    id: '3',
    type: 'fraud',
    title: 'Fraud Detection Check',
    description: 'Suspicious activity verification - Required for SQL High Level',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2024-01-21T14:20:00Z',
    updatedAt: '2024-01-21T15:30:00Z',
    score: 30,
    sqlLevelRequired: 3,
  },
  {
    id: '4',
    type: 'trust',
    title: 'Trust Score Assessment',
    description: 'Comprehensive trust evaluation - Required for SQL VIP Level',
    status: 'approved',
    priority: 'medium',
    createdAt: '2024-01-19T16:45:00Z',
    updatedAt: '2024-01-19T17:20:00Z',
    score: 88,
    sqlLevelRequired: 4,
  },
];

// Roman Urdu: SQL Level configuration
const sqlLevelConfig = {
  0: { name: 'Free', color: 'gray', description: 'No verification required' },
  1: { name: 'Basic', color: 'blue', description: 'PSS (KYC + Documents) verified' },
  2: { name: 'Normal', color: 'yellow', description: 'PSS + EDR (Skill Test) verified' },
  3: { name: 'High', color: 'orange', description: 'Normal + EMO/Live Check verified' },
  4: { name: 'VIP', color: 'green', description: 'Full chain + income/trust verified' },
};

const getStatusColor = (status: VerificationItem['status']) => {
  switch (status) {
    case 'approved':
      return 'text-green-600 bg-green-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'rejected':
      return 'text-red-600 bg-red-100';
    case 'in-progress':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getStatusIcon = (status: VerificationItem['status']) => {
  switch (status) {
    case 'approved':
      return <CheckCircle className="w-4 h-4" />;
    case 'pending':
      return <Clock className="w-4 h-4" />;
    case 'rejected':
      return <AlertTriangle className="w-4 h-4" />;
    case 'in-progress':
      return <BarChart3 className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getPriorityColor = (priority: VerificationItem['priority']) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'low':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getTypeIcon = (type: VerificationItem['type']) => {
  switch (type) {
    case 'kyc':
      return <UserCheck className="w-4 h-4" />;
    case 'document':
      return <FileText className="w-4 h-4" />;
    case 'fraud':
      return <AlertTriangle className="w-4 h-4" />;
    case 'trust':
      return <Shield className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

export default function PSSPage() {
  const [verifications, setVerifications] = useState<VerificationItem[]>(mockVerifications);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentSQLLevel, setCurrentSQLLevel] = useState(1); // Mock current SQL level

  // Roman Urdu: Statistics calculation
  const stats = {
    total: verifications.length,
    approved: verifications.filter(v => v.status === 'approved').length,
    pending: verifications.filter(v => v.status === 'pending').length,
    rejected: verifications.filter(v => v.status === 'rejected').length,
    inProgress: verifications.filter(v => v.status === 'in-progress').length,
  };

  // Roman Urdu: PSS completion percentage for SQL upgrade
  const pssCompletionPercentage = Math.round((stats.approved / stats.total) * 100);

  const filteredVerifications = verifications.filter(verification => {
    const matchesStatus = selectedStatus === 'all' || verification.status === selectedStatus;
    const matchesType = selectedType === 'all' || verification.type === selectedType;
    const matchesSearch =
      verification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verification.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  // Roman Urdu: Document upload handler with notification
  const handleUploadDocument = () => {
    setShowUploadModal(true);
    toast.info('Document upload modal khul gaya hai');
  };

  // Roman Urdu: Verification status update handler
  const handleStatusUpdate = (id: string, newStatus: VerificationItem['status']) => {
    setVerifications(prev => 
      prev.map(v => v.id === id ? { ...v, status: newStatus } : v)
    );
    toast.success(`Verification status update ho gaya hai: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header with SQL Level Integration */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">PSS</h1>
                <p className="text-purple-600 font-medium">Personal Security System</p>
                <p className="text-sm text-gray-500">SQL Level {currentSQLLevel} - {sqlLevelConfig[currentSQLLevel as keyof typeof sqlLevelConfig]?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="text-orange-600 font-medium">{pssCompletionPercentage}% Complete</span>
              </div>
              <div className="bg-orange-100 px-3 py-1 rounded-full">
                <span className="text-orange-800 text-sm font-medium">SQL Upgrade Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Level Progress Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">SQL Level Progress</h2>
            <Link href="/sql" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <span>View SQL Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Current Level</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{sqlLevelConfig[currentSQLLevel as keyof typeof sqlLevelConfig]?.name}</p>
              <p className="text-sm text-blue-700">{sqlLevelConfig[currentSQLLevel as keyof typeof sqlLevelConfig]?.description}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">PSS Completion</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{pssCompletionPercentage}%</p>
              <p className="text-sm text-green-700">{stats.approved} of {stats.total} verifications complete</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ArrowRight className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">Next Level</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{sqlLevelConfig[(currentSQLLevel + 1) as keyof typeof sqlLevelConfig]?.name || 'Max Level'}</p>
              <p className="text-sm text-purple-700">Complete EDR for upgrade</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Identity Verification & Fraud Prevention System
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Advanced personal security platform providing identity verification, KYC services, and
              comprehensive fraud prevention measures to protect users and businesses.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-orange-600">
                <Clock className="h-5 w-5" />
                <span>75% Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <TrendingUp className="h-5 w-5" />
                <span>Port 4001</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Shield className="h-5 w-5" />
                <span>Security Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Development Progress</h3>
            <span className="text-2xl font-bold text-purple-600">75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-purple-600 h-4 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>✅ Identity Verification</span>
              <span>✅ KYC Services</span>
              <span>🔄 Fraud Prevention</span>
              <span>⏳ Admin Panel</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Identity Verification</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Multi-factor identity verification with document validation and biometric checks.
            </p>
            <Link href="/pss/verify" className="text-purple-600 hover:text-purple-800 font-medium">
              Verify Identity →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">KYC Services</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Know Your Customer verification with automated document processing and validation.
            </p>
            <Link href="/pss/kyc" className="text-blue-600 hover:text-blue-800 font-medium">
              Complete KYC →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Trust Score</h3>
            </div>
            <p className="text-gray-600 mb-4">
              AI-powered trust scoring system based on verification history and behavior analysis.
            </p>
            <Link
              href="/pss/trust-score"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Check Score →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Fraud Prevention</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Advanced fraud detection algorithms and real-time threat monitoring system.
            </p>
            <Link
              href="/pss/fraud-prevention"
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Learn More →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Lock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Configure security preferences, privacy settings, and access controls.
            </p>
            <Link
              href="/pss/security"
              className="text-orange-600 hover:text-orange-800 font-medium"
            >
              Security Settings →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Settings className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Admin Panel</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Administrative tools for managing verifications, monitoring system health, and
              generating reports.
            </p>
            <Link href="/pss/admin" className="text-gray-600 hover:text-gray-800 font-medium">
              Admin Access →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Security Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">45.2K</div>
              <div className="text-gray-600">Verified Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98.7%</div>
              <div className="text-gray-600">Verification Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">1,247</div>
              <div className="text-gray-600">Fraud Cases Prevented</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">99.9%</div>
              <div className="text-gray-600">System Uptime</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/pss/verify"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="text-purple-600 font-medium">Verify</div>
            </Link>
            <Link
              href="/pss/kyc"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 font-medium">KYC</div>
            </Link>
            <Link
              href="/pss/trust-score"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="text-green-600 font-medium">Trust Score</div>
            </Link>
            <Link
              href="/pss/admin"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-gray-600 font-medium">Admin</div>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search verifications..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                {[
                  { id: 'all', name: 'All Status', count: verifications.length },
                  { id: 'approved', name: 'Approved', count: stats.approved },
                  { id: 'pending', name: 'Pending', count: stats.pending },
                  { id: 'rejected', name: 'Rejected', count: stats.rejected },
                  { id: 'in-progress', name: 'In Progress', count: stats.inProgress },
                ].map(status => (
                  <button
                    key={status.id}
                    onClick={() => setSelectedStatus(status.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedStatus === status.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.name} ({status.count})
                  </button>
                ))}
              </div>

              {/* Type Filter */}
              <div className="flex gap-2">
                {[
                  { id: 'all', name: 'All Types', count: verifications.length },
                  {
                    id: 'kyc',
                    name: 'KYC',
                    count: verifications.filter(v => v.type === 'kyc').length,
                  },
                  {
                    id: 'document',
                    name: 'Document',
                    count: verifications.filter(v => v.type === 'document').length,
                  },
                  {
                    id: 'fraud',
                    name: 'Fraud',
                    count: verifications.filter(v => v.type === 'fraud').length,
                  },
                  {
                    id: 'trust',
                    name: 'Trust',
                    count: verifications.filter(v => v.type === 'trust').length,
                  },
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.name} ({type.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Verifications List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Verification Requests</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredVerifications.map(verification => (
                <div key={verification.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getTypeIcon(verification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {verification.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}
                          >
                            {verification.status}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(verification.priority)}`}
                          >
                            {verification.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{verification.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            Created: {new Date(verification.createdAt).toLocaleDateString()}
                          </span>
                          <span>
                            Updated: {new Date(verification.updatedAt).toLocaleDateString()}
                          </span>
                          {verification.score && (
                            <span className="font-medium text-blue-600">
                              Score: {verification.score}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No Results */}
          {filteredVerifications.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No verifications found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Document</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>National ID</option>
                    <option>Passport</option>
                    <option>Driver's License</option>
                    <option>Utility Bill</option>
                    <option>Bank Statement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
