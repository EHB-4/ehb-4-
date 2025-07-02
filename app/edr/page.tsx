'use client';

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  Users,
  TrendingUp,
  ArrowRight,
  Grid3X3,
  List,
  Filter as FilterIcon,
  X,
  Plus,
  Minus,
  Ambulance,
  Fire,
  Police,
  Heart,
  Activity,
  Award,
  Eye,
  MessageCircle,
  Bell,
  AlertCircle,
  PhoneCall,
  Navigation,
  Car,
  Building,
  User,
  Calendar,
  Clock as ClockIcon,
  Star,
  Zap,
  Target,
  Compass,
  Brain,
  BookOpen,
  BarChart3,
  GraduationCap,
  Play,
  Pause,
  Stop,
  Camera,
  Mic,
  Lock,
  Download,
  Upload,
  Video,
  Monitor,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

interface Exam {
  id: string;
  title: string;
  description: string;
  type: 'skill-assessment' | 'certification' | 'proctored' | 'ai-generated';
  status: 'draft' | 'active' | 'completed' | 'archived';
  duration: number;
  questions: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  participants: number;
  passRate: number;
  aiGenerated: boolean;
}

const mockExams: Exam[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals Assessment',
    description: 'Comprehensive evaluation of JavaScript programming skills',
    type: 'skill-assessment',
    status: 'active',
    duration: 60,
    questions: 25,
    difficulty: 'intermediate',
    participants: 45,
    passRate: 78,
    aiGenerated: true,
  },
  {
    id: '2',
    title: 'React Development Certification',
    description: 'Advanced React.js development skills certification',
    type: 'certification',
    status: 'active',
    duration: 90,
    questions: 40,
    difficulty: 'advanced',
    participants: 32,
    passRate: 65,
    aiGenerated: true,
  },
  {
    id: '3',
    title: 'Data Science Proctored Exam',
    description: 'Proctored examination for data science professionals',
    type: 'proctored',
    status: 'active',
    duration: 120,
    questions: 50,
    difficulty: 'expert',
    participants: 18,
    passRate: 72,
    aiGenerated: false,
  },
];

const getStatusColor = (status: Exam['status']) => {
  switch (status) {
    case 'active':
      return 'text-blue-600 bg-blue-100';
    case 'completed':
      return 'text-green-600 bg-green-100';
    case 'draft':
      return 'text-gray-600 bg-gray-100';
    case 'archived':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getDifficultyColor = (difficulty: Exam['difficulty']) => {
  switch (difficulty) {
    case 'beginner':
      return 'text-green-600 bg-green-100';
    case 'intermediate':
      return 'text-yellow-600 bg-yellow-100';
    case 'advanced':
      return 'text-orange-600 bg-orange-100';
    case 'expert':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getTypeIcon = (type: Exam['type']) => {
  switch (type) {
    case 'skill-assessment':
      return <Target className="w-4 h-4" />;
    case 'certification':
      return <Award className="w-4 h-4" />;
    case 'proctored':
      return <Monitor className="w-4 h-4" />;
    case 'ai-generated':
      return <Brain className="w-4 h-4" />;
    default:
      return <BookOpen className="w-4 h-4" />;
  }
};

/**
 * EDR Emergency Response System - Comprehensive emergency services platform
 * @returns {JSX.Element} The EDR emergency response system component
 */
export default function EDRPage() {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalExams: exams.length,
    activeExams: exams.filter(e => e.status === 'active').length,
    totalParticipants: exams.reduce((sum, exam) => sum + exam.participants, 0),
    averagePassRate: Math.round(exams.reduce((sum, exam) => sum + exam.passRate, 0) / exams.length),
  };

  const filteredExams = exams.filter(exam => {
    const matchesStatus = selectedStatus === 'all' || exam.status === selectedStatus;
    const matchesType = selectedType === 'all' || exam.type === selectedType;
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EDR</h1>
                <p className="text-blue-600 font-medium">Emergency Decision Registration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="text-orange-600 font-medium">60% Complete</span>
              </div>
              <div className="bg-orange-100 px-3 py-1 rounded-full">
                <span className="text-orange-800 text-sm font-medium">In Progress</span>
              </div>
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
              AI-Powered Skill Verification & Exam Platform
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Advanced assessment and certification system using artificial intelligence to evaluate
              skills, conduct exams, and issue verified certificates for professional development.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-orange-600">
                <Clock className="h-5 w-5" />
                <span>60% Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <TrendingUp className="h-5 w-5" />
                <span>Port 4002</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Brain className="h-5 w-5" />
                <span>AI Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Development Progress</h3>
            <span className="text-2xl font-bold text-blue-600">60%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>✅ Exam Platform</span>
              <span>✅ Skill Assessment</span>
              <span>🔄 AI Evaluation</span>
              <span>⏳ Certificate System</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Online Exams</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive online examination platform with AI-powered proctoring and assessment.
            </p>
            <Link href="/edr/exams" className="text-blue-600 hover:text-blue-800 font-medium">
              Take Exam →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Skill Assessment</h3>
            </div>
            <p className="text-gray-600 mb-4">
              AI-driven skill evaluation and competency testing across various domains.
            </p>
            <Link href="/edr/skills" className="text-green-600 hover:text-green-800 font-medium">
              Assess Skills →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Certificates</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Digital certificates and credentials with blockchain verification and authenticity.
            </p>
            <Link
              href="/edr/certificates"
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              View Certificates →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Candidate Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive candidate profiles with exam history and performance tracking.
            </p>
            <Link
              href="/edr/candidates"
              className="text-orange-600 hover:text-orange-800 font-medium"
            >
              Manage Candidates →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Analytics & Reports</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Detailed analytics and reporting on exam performance and skill assessment results.
            </p>
            <Link href="/edr/analytics" className="text-red-600 hover:text-red-800 font-medium">
              View Analytics →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Admin Panel</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Administrative tools for managing exams, candidates, and system configuration.
            </p>
            <Link href="/edr/admin" className="text-gray-600 hover:text-gray-800 font-medium">
              Admin Access →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Assessment Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.totalExams}</div>
              <div className="text-gray-600">Total Exams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.activeExams}</div>
              <div className="text-gray-600">Active Exams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.totalParticipants}</div>
              <div className="text-gray-600">Total Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{stats.averagePassRate}%</div>
              <div className="text-gray-600">Avg Pass Rate</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/edr/exams"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 font-medium">Exams</div>
            </Link>
            <Link
              href="/edr/skills"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="text-green-600 font-medium">Skills</div>
            </Link>
            <Link
              href="/edr/certificates"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="text-purple-600 font-medium">Certificates</div>
            </Link>
            <Link
              href="/edr/admin"
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
                    placeholder="Search exams..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                {[
                  { id: 'all', name: 'All Status' },
                  { id: 'active', name: 'Active' },
                  { id: 'completed', name: 'Completed' },
                  { id: 'draft', name: 'Draft' },
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
                    {status.name}
                  </button>
                ))}
              </div>

              {/* Type Filter */}
              <div className="flex gap-2">
                {[
                  { id: 'all', name: 'All Types' },
                  { id: 'skill-assessment', name: 'Skill Assessment' },
                  { id: 'certification', name: 'Certification' },
                  { id: 'proctored', name: 'Proctored' },
                  { id: 'ai-generated', name: 'AI Generated' },
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
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map(exam => (
              <div
                key={exam.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">{getTypeIcon(exam.type)}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}
                          >
                            {exam.status}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}
                          >
                            {exam.difficulty}
                          </span>
                          {exam.aiGenerated && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
                              AI Generated
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">{exam.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{exam.duration}</div>
                      <div className="text-xs text-gray-600">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{exam.questions}</div>
                      <div className="text-xs text-gray-600">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{exam.participants}</div>
                      <div className="text-xs text-gray-600">Participants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{exam.passRate}%</div>
                      <div className="text-xs text-gray-600">Pass Rate</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Edit Exam
                    </button>
                    <button
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      title="View Analytics"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
