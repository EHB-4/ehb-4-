'use client';

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';
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

// Roman Urdu: EDR skill testing ke liye interface
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
  sqlLevelRequired?: number; // SQL level requirement
  sqlLevelUnlocked?: number; // SQL level unlocked after completion
}

// Roman Urdu: SQL Level configuration
const sqlLevelConfig = {
  0: { name: 'Free', color: 'gray', description: 'No verification required' },
  1: { name: 'Basic', color: 'blue', description: 'PSS (KYC + Documents) verified' },
  2: { name: 'Normal', color: 'yellow', description: 'PSS + EDR (Skill Test) verified' },
  3: { name: 'High', color: 'orange', description: 'Normal + EMO/Live Check verified' },
  4: { name: 'VIP', color: 'green', description: 'Full chain + income/trust verified' },
};

// Roman Urdu: Mock data with SQL level integration
const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Basic Skill Assessment (MCQ)',
    description: 'Fundamental knowledge test - Required for SQL Normal Level',
    type: 'skill-assessment',
    status: 'active',
    duration: 30,
    questions: 20,
    difficulty: 'beginner',
    participants: 45,
    passRate: 78,
    aiGenerated: true,
    sqlLevelRequired: 1,
    sqlLevelUnlocked: 2,
  },
  {
    id: '2',
    title: 'Advanced Skill Certification',
    description: 'Professional skill evaluation - Required for SQL High Level',
    type: 'certification',
    status: 'active',
    duration: 60,
    questions: 40,
    difficulty: 'advanced',
    participants: 32,
    passRate: 65,
    aiGenerated: true,
    sqlLevelRequired: 2,
    sqlLevelUnlocked: 3,
  },
  {
    id: '3',
    title: 'Expert Level Proctored Exam',
    description: 'Live proctored examination - Required for SQL VIP Level',
    type: 'proctored',
    status: 'active',
    duration: 90,
    questions: 50,
    difficulty: 'expert',
    participants: 18,
    passRate: 72,
    aiGenerated: false,
    sqlLevelRequired: 3,
    sqlLevelUnlocked: 4,
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
 * EDR (Education & Development Records) - Skill Testing System
 * SQL Level System ke sath integrated skill assessment platform
 * @returns {JSX.Element} The EDR skill testing system component
 */
export default function EDRPage() {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSQLLevel, setCurrentSQLLevel] = useState(1); // Mock current SQL level

  // Roman Urdu: Statistics calculation
  const stats = {
    totalExams: exams.length,
    activeExams: exams.filter(e => e.status === 'active').length,
    completedExams: exams.filter(e => e.status === 'completed').length,
    totalParticipants: exams.reduce((acc, e) => acc + e.participants, 0),
    averagePassRate: Math.round(exams.reduce((acc, e) => acc + e.passRate, 0) / exams.length),
  };

  // Roman Urdu: EDR completion percentage for SQL upgrade
  const edrCompletionPercentage = Math.round((stats.completedExams / stats.totalExams) * 100);

  const filteredExams = exams.filter(exam => {
    const matchesStatus = selectedStatus === 'all' || exam.status === selectedStatus;
    const matchesType = selectedType === 'all' || exam.type === selectedType;
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  // Roman Urdu: Exam start handler
  const handleStartExam = (examId: string) => {
    toast.success('Exam start ho gaya hai! Good luck!');
  };

  // Roman Urdu: Exam completion handler
  const handleExamComplete = (examId: string) => {
    toast.success('Exam complete ho gaya hai! Results check karein.');
    setExams(prev => prev.map(e => (e.id === examId ? { ...e, status: 'completed' as const } : e)));
  };

  // Roman Urdu: SQL level upgrade handler
  const handleSQLLevelUpgrade = () => {
    if (edrCompletionPercentage >= 100) {
      setCurrentSQLLevel(prev => Math.min(prev + 1, 4));
      toast.success('SQL level upgrade ho gaya hai!');
    } else {
      toast.error('EDR completion 100% honi chahiye SQL level upgrade ke liye');
    }
  };

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
                <p className="text-blue-600 font-medium">Exam Decision Registration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">
                  {edrCompletionPercentage}% Complete
                </span>
              </div>
              <div className="bg-blue-100 px-3 py-1 rounded-full">
                <span className="text-blue-800 text-sm font-medium">Active</span>
              </div>
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
              AI-Powered Skill Verification & Examination System
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Advanced skill assessment platform with AI-generated exams, proctoring system, and
              automated certification. SQL Level System ke sath integrated examination platform.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>{edrCompletionPercentage}% Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-5 w-5" />
                <span>Port 4002</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Brain className="h-5 w-5" />
                <span>AI Team</span>
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
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-blue-600 font-medium">
                Current Level:{' '}
                {sqlLevelConfig[currentSQLLevel as keyof typeof sqlLevelConfig]?.name}
              </span>
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
                  <span
                    className={`font-semibold ${
                      parseInt(level) <= currentSQLLevel ? 'text-green-700' : 'text-gray-500'
                    }`}
                  >
                    {config.name}
                  </span>
                  {parseInt(level) <= currentSQLLevel && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <p
                  className={`text-sm ${
                    parseInt(level) <= currentSQLLevel ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {config.description}
                </p>
              </div>
            ))}
          </div>
          {edrCompletionPercentage >= 100 && currentSQLLevel < 4 && (
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
                <p className="text-gray-600 text-sm font-medium">Total Exams</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalExams}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Exams</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeExams}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Play className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Participants</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalParticipants}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Average Pass Rate</p>
                <p className="text-2xl font-bold text-orange-600">{stats.averagePassRate}%</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
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
                  placeholder="Search exams..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filter by type"
              >
                <option value="all">All Types</option>
                <option value="skill-assessment">Skill Assessment</option>
                <option value="certification">Certification</option>
                <option value="proctored">Proctored</option>
                <option value="ai-generated">AI Generated</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Exam</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Exams List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Exams</h3>

          <div className="grid gap-6">
            {filteredExams.map(exam => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">{getTypeIcon(exam.type)}</div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{exam.title}</h4>
                      <p className="text-gray-600 mb-2">{exam.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{exam.duration} minutes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>{exam.questions} questions</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{exam.participants} participants</span>
                        </div>
                        {exam.sqlLevelRequired && (
                          <div className="flex items-center space-x-1">
                            <Shield className="h-4 w-4" />
                            <span>SQL Level {exam.sqlLevelRequired}+ required</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(exam.status)}`}
                    >
                      {exam.status}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exam.difficulty)}`}
                    >
                      {exam.difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>Pass Rate: {exam.passRate}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Brain className="h-4 w-4" />
                      <span>{exam.aiGenerated ? 'AI Generated' : 'Manual'}</span>
                    </div>
                    {exam.sqlLevelUnlocked && (
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4" />
                        <span>Unlocks SQL Level {exam.sqlLevelUnlocked}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {exam.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleStartExam(exam.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Start Exam
                        </button>
                        <button
                          onClick={() => handleExamComplete(exam.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Mark Complete
                        </button>
                      </>
                    )}
                    {exam.status === 'draft' && (
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Activate Exam
                      </button>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </motion.div>

        {/* AI Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Brain className="h-6 w-6 text-blue-600" />
                <h4 className="font-semibold text-gray-900">AI Exam Generation</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Automatically generate exams based on skill requirements and difficulty levels.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Monitor className="h-6 w-6 text-green-600" />
                <h4 className="font-semibold text-gray-900">Proctoring System</h4>
              </div>
              <p className="text-gray-600 text-sm">
                AI-powered monitoring to ensure exam integrity and prevent cheating.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="h-6 w-6 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Auto Certification</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Automatic certificate generation upon successful exam completion.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
