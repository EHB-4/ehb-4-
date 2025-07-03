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
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Roman Urdu: Status update handler
  const handleStatusUpdate = (id: string, newStatus: VerificationItem['status']) => {
    setVerifications(prev => prev.map(v => 
      v.id === id ? { ...v, status: newStatus, updatedAt: new Date().toISOString() } : v
    ));
    toast.success('Status update ho gaya hai!');
  };

  // Roman Urdu: SQL level upgrade handler
  const handleSQLLevelUpgrade = () => {
    if (pssCompletionPercentage >= 100) {
      setCurrentSQLLevel(prev => Math.min(prev + 1, 4));
      toast.success('SQL level upgrade ho gaya hai!');
    } else {
      toast.error('PSS completion 100% honi chahiye SQL level upgrade ke liye');
    }
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
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">{pssCompletionPercentage}% Complete</span>
              </div>
              <div className="bg-purple-100 px-3 py-1 rounded-full">
                <span className="text-purple-800 text-sm font-medium">Active</span>
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Identity Verification & Security Management
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive KYC verification, document validation, fraud prevention, and trust scoring system.
              SQL Level System ke sath integrated security platform.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>{pssCompletionPercentage}% Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Clock className="h-5 w-5" />
                <span>Port 4001</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Shield className="h-5 w-5" />
                <span>Security Team</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SQL Level Integration */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">SQL Level Integration</h3>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-500" />
              <span className="text-purple-600 font-medium">Current Level: {sqlLevelConfig[currentSQLLevel as keyof typeof sqlLevelConfig]?.name}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(sqlLevelConfig).map(([level, config]) => (
              <div 
                key={level}
                className={`p-4 rounded-lg border-2 ${
                  parseInt(level) <= currentSQLLevel 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold ${
                    parseInt(level) <= currentSQLLevel ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {config.name}
                  </span>
                  {parseInt(level) <= currentSQLLevel && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <p className={`text-sm ${
                  parseInt(level) <= currentSQLLevel ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {config.description}
                </p>
              </div>
            ))}
          </div>
          {pssCompletionPercentage >= 100 && currentSQLLevel < 4 && (
            <div className="mt-4 text-center">
              <button
                onClick={handleSQLLevelUpgrade}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Upgrade SQL Level
              </button>
            </div>
          )}
        </motion.div>

        {/* Statistics Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Verifications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search verifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="in-progress">In Progress</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                aria-label="Filter by type"
              >
                <option value="all">All Types</option>
                <option value="kyc">KYC</option>
                <option value="document">Document</option>
                <option value="fraud">Fraud</option>
                <option value="trust">Trust</option>
              </select>
              <button
                onClick={handleUploadDocument}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Document</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Verifications List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Verification Requests</h3>
          
          <div className="grid gap-6">
            {filteredVerifications.map((verification) => (
              <motion.div
                key={verification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      {getTypeIcon(verification.type)}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{verification.title}</h4>
                      <p className="text-gray-600 mb-2">{verification.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Created: {new Date(verification.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Updated: {new Date(verification.updatedAt).toLocaleDateString()}</span>
                        </div>
                        {verification.sqlLevelRequired && (
                          <div className="flex items-center space-x-1">
                            <Shield className="h-4 w-4" />
                            <span>SQL Level {verification.sqlLevelRequired}+ required</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(verification.status)}`}>
                      {verification.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(verification.priority)}`}>
                      {verification.priority}
                    </span>
                  </div>
                </div>

                {verification.score && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Verification Score</span>
                      <span className="text-sm font-medium text-gray-900">{verification.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${verification.score}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {verification.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(verification.id, 'approved')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(verification.id, 'rejected')}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {verification.status === 'in-progress' && (
                      <button
                        onClick={() => handleStatusUpdate(verification.id, 'approved')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Complete Review
                      </button>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                    <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredVerifications.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No verifications found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </motion.div>
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
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>National ID Card</option>
                  <option>Passport</option>
                  <option>Utility Bill</option>
                  <option>Bank Statement</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    toast.success('Document upload ho gaya hai!');
                  }}
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
