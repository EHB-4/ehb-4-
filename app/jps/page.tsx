'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  Briefcase,
  Users,
  Building,
  ChartBar,
  Cog,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowRight,
  Award,
  Target,
  Brain,
  Shield,
  UserCheck,
  FileText,
  Video,
  MessageCircle,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Heart,
  BookOpen,
  GraduationCap,
  Globe,
  Languages,
  Workflow,
  GitBranch,
  Database,
  Server,
  Code,
  Palette,
  Camera,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Cloud,
  Wifi,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  QrCode,
  Scan,
  Upload,
  Download,
  Share,
  Copy,
  Link as LinkIcon,
  ExternalLink,
  Maximize,
  Minimize,
  RotateCcw,
  RefreshCw,
  Save,
  Archive,
  Tag,
  Hash,
  AtSign,
  Percent,
  Hash as HashIcon,
  Hash as HashIcon2,
  Hash as HashIcon3,
  Hash as HashIcon4,
  Hash as HashIcon5,
  Hash as HashIcon6,
  Hash as HashIcon7,
  Hash as HashIcon8,
  Hash as HashIcon9,
  Hash as HashIcon10,
} from 'lucide-react';

// Roman Urdu: JPS job matching ke liye interface
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  skills: string[];
  experience: string;
  education: string;
  status: 'active' | 'filled' | 'expired' | 'draft';
  postedDate: string;
  deadline: string;
  applications: number;
  matchScore?: number;
  sqlLevelRequired?: number;
  sqlLevelUnlocked?: number;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  title: string;
  experience: number;
  education: string;
  skills: string[];
  resume: string;
  status: 'available' | 'employed' | 'interviewing' | 'placed';
  sqlLevel: number;
  matchScore?: number;
  lastActive: string;
}

interface Placement {
  id: string;
  candidateId: string;
  jobId: string;
  candidateName: string;
  jobTitle: string;
  company: string;
  placementDate: string;
  salary: number;
  status: 'active' | 'completed' | 'terminated';
  successRate: number;
  feedback: string;
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
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp Solutions',
    location: 'Karachi, Pakistan',
    type: 'full-time',
    salary: { min: 150000, max: 250000, currency: 'PKR' },
    description: 'We are looking for an experienced React developer to join our team...',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
    experience: '5+ years',
    education: 'BS Computer Science',
    status: 'active',
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    applications: 23,
    matchScore: 95,
    sqlLevelRequired: 2,
    sqlLevelUnlocked: 3,
  },
  {
    id: '2',
    title: 'AI/ML Engineer',
    company: 'DataTech Innovations',
    location: 'Lahore, Pakistan',
    type: 'full-time',
    salary: { min: 200000, max: 350000, currency: 'PKR' },
    description: 'Join our AI team to develop cutting-edge machine learning solutions...',
    requirements: ['Python', 'TensorFlow', 'PyTorch', '3+ years experience'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Docker'],
    experience: '3+ years',
    education: 'MS Computer Science',
    status: 'active',
    postedDate: '2024-01-18',
    deadline: '2024-02-18',
    applications: 15,
    matchScore: 88,
    sqlLevelRequired: 3,
    sqlLevelUnlocked: 4,
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'WebSolutions Ltd',
    location: 'Islamabad, Pakistan',
    type: 'contract',
    salary: { min: 80000, max: 120000, currency: 'PKR' },
    description: 'Contract position for frontend development with modern technologies...',
    requirements: ['JavaScript', 'Vue.js', 'CSS3', '2+ years experience'],
    skills: ['JavaScript', 'Vue.js', 'CSS3', 'HTML5', 'Git'],
    experience: '2+ years',
    education: 'BS Software Engineering',
    status: 'active',
    postedDate: '2024-01-20',
    deadline: '2024-02-20',
    applications: 8,
    matchScore: 75,
    sqlLevelRequired: 1,
    sqlLevelUnlocked: 2,
  },
];

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92-300-1234567',
    location: 'Karachi, Pakistan',
    avatar: '/api/placeholder/40/40',
    title: 'Senior React Developer',
    experience: 6,
    education: 'BS Computer Science',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
    resume: '/resumes/ahmed-khan.pdf',
    status: 'available',
    sqlLevel: 2,
    matchScore: 95,
    lastActive: '2024-01-25',
  },
  {
    id: '2',
    name: 'Fatima Ali',
    email: 'fatima.ali@email.com',
    phone: '+92-301-2345678',
    location: 'Lahore, Pakistan',
    avatar: '/api/placeholder/40/40',
    title: 'AI/ML Engineer',
    experience: 4,
    education: 'MS Computer Science',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Docker'],
    resume: '/resumes/fatima-ali.pdf',
    status: 'available',
    sqlLevel: 3,
    matchScore: 88,
    lastActive: '2024-01-24',
  },
  {
    id: '3',
    name: 'Usman Hassan',
    email: 'usman.hassan@email.com',
    phone: '+92-302-3456789',
    location: 'Islamabad, Pakistan',
    avatar: '/api/placeholder/40/40',
    title: 'Frontend Developer',
    experience: 3,
    education: 'BS Software Engineering',
    skills: ['JavaScript', 'Vue.js', 'CSS3', 'HTML5', 'Git'],
    resume: '/resumes/usman-hassan.pdf',
    status: 'interviewing',
    sqlLevel: 1,
    matchScore: 75,
    lastActive: '2024-01-23',
  },
];

const mockPlacements: Placement[] = [
  {
    id: '1',
    candidateId: '1',
    jobId: '1',
    candidateName: 'Ahmed Khan',
    jobTitle: 'Senior React Developer',
    company: 'TechCorp Solutions',
    placementDate: '2024-01-20',
    salary: 200000,
    status: 'active',
    successRate: 95,
    feedback: 'Excellent candidate with strong technical skills',
  },
  {
    id: '2',
    candidateId: '2',
    jobId: '2',
    candidateName: 'Fatima Ali',
    jobTitle: 'AI/ML Engineer',
    company: 'DataTech Innovations',
    placementDate: '2024-01-18',
    salary: 275000,
    status: 'active',
    successRate: 92,
    feedback: 'Highly skilled in AI/ML technologies',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-100';
    case 'filled':
      return 'text-blue-600 bg-blue-100';
    case 'expired':
      return 'text-red-600 bg-red-100';
    case 'draft':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getTypeColor = (type: Job['type']) => {
  switch (type) {
    case 'full-time':
      return 'text-blue-600 bg-blue-100';
    case 'part-time':
      return 'text-green-600 bg-green-100';
    case 'contract':
      return 'text-orange-600 bg-orange-100';
    case 'freelance':
      return 'text-purple-600 bg-purple-100';
    case 'internship':
      return 'text-pink-600 bg-pink-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getMatchScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * JPS (Job Placement System) - AI-Powered Job Matching Platform
 * SQL Level System ke sath integrated job matching aur placement platform
 * @returns {JSX.Element} The JPS job matching system component
 */
export default function JPSPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [placements, setPlacements] = useState<Placement[]>(mockPlacements);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSQLLevel, setCurrentSQLLevel] = useState(2); // Mock current SQL level
  const [activeTab, setActiveTab] = useState<'jobs' | 'candidates' | 'placements' | 'analytics'>(
    'jobs'
  );

  // Roman Urdu: Statistics calculation
  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => j.status === 'active').length,
    totalCandidates: candidates.length,
    availableCandidates: candidates.filter(c => c.status === 'available').length,
    totalPlacements: placements.length,
    activePlacements: placements.filter(p => p.status === 'active').length,
    averageSuccessRate: Math.round(
      placements.reduce((acc, p) => acc + p.successRate, 0) / placements.length
    ),
  };

  // Roman Urdu: JPS completion percentage for SQL upgrade
  const jpsCompletionPercentage = Math.round(
    (stats.activePlacements / stats.totalPlacements) * 100
  );

  const filteredJobs = jobs.filter(job => {
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  const filteredCandidates = candidates.filter(candidate => {
    const matchesStatus = selectedStatus === 'all' || candidate.status === selectedStatus;
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Roman Urdu: Job application handler
  const handleApplyJob = (jobId: string) => {
    toast.success('Job application submit ho gayi hai!');
    // Update job applications count
    setJobs(prev =>
      prev.map(job => (job.id === jobId ? { ...job, applications: job.applications + 1 } : job))
    );
  };

  // Roman Urdu: Candidate selection handler
  const handleSelectCandidate = (candidateId: string, jobId: string) => {
    toast.success('Candidate select ho gaya hai! Interview schedule karein.');
  };

  // Roman Urdu: Placement completion handler
  const handleCompletePlacement = (placementId: string) => {
    toast.success('Placement complete ho gayi hai!');
    setPlacements(prev =>
      prev.map(p => (p.id === placementId ? { ...p, status: 'completed' as const } : p))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">JPS</h1>
                <p className="text-blue-600 font-medium">Job Placement System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">100% Complete</span>
              </div>
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-green-800 text-sm font-medium">Active</span>
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
              AI-Powered Job Matching & Placement Platform
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect talented professionals with the perfect opportunities using advanced AI
              algorithms. Our system provides intelligent matching, skill assessment, and seamless
              placement services.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>100% Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-5 w-5" />
                <span>Port 4005</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <TrendingUp className="h-5 w-5" />
                <span>HR Team</span>
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
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'jobs', label: 'Jobs', icon: Briefcase, count: stats.totalJobs },
              { id: 'candidates', label: 'Candidates', icon: Users, count: stats.totalCandidates },
              { id: 'placements', label: 'Placements', icon: Award, count: stats.totalPlacements },
              { id: 'analytics', label: 'Analytics', icon: ChartBar, count: null },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md flex-1 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
                {tab.count !== null && (
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Job Listings</h3>
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="filled">Filled</option>
                    <option value="expired">Expired</option>
                  </select>
                  <select
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredJobs.map(job => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h4>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>
                              {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}{' '}
                              {job.salary.currency}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}
                        >
                          {job.status}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}
                        >
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.slice(0, 5).map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 5 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          +{job.skills.length - 5} more
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{job.applications} applications</span>
                        <span>SQL Level {job.sqlLevelRequired}+ required</span>
                        {job.matchScore && (
                          <span className={`font-medium ${getMatchScoreColor(job.matchScore)}`}>
                            {job.matchScore}% match
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleApplyJob(job.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'candidates' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Candidates</h3>
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="employed">Employed</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="placed">Placed</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredCandidates.map(candidate => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-1">
                            {candidate.name}
                          </h4>
                          <p className="text-gray-600 mb-2">{candidate.title}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{candidate.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{candidate.experience} years experience</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Shield className="h-4 w-4" />
                              <span>SQL Level {candidate.sqlLevel}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}
                        >
                          {candidate.status}
                        </span>
                        {candidate.matchScore && (
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(candidate.matchScore)}`}
                          >
                            {candidate.matchScore}% match
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {candidate.skills.slice(0, 5).map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 5 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          +{candidate.skills.length - 5} more
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          Last active: {new Date(candidate.lastActive).toLocaleDateString()}
                        </span>
                        <span>Education: {candidate.education}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSelectCandidate(candidate.id, '')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Select
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'placements' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Placements</h3>
                <div className="flex space-x-4">
                  <select
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="terminated">Terminated</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6">
                {placements.map(placement => (
                  <motion.div
                    key={placement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          {placement.candidateName} → {placement.jobTitle}
                        </h4>
                        <p className="text-gray-600 mb-2">{placement.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Placed: {new Date(placement.placementDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{placement.salary.toLocaleString()} PKR</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{placement.successRate}% success rate</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(placement.status)}`}
                      >
                        {placement.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{placement.feedback}</p>

                    <div className="flex justify-end space-x-2">
                      {placement.status === 'active' && (
                        <button
                          onClick={() => handleCompletePlacement(placement.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Insights</h3>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Jobs</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.totalJobs}</p>
                    </div>
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Active Candidates</p>
                      <p className="text-2xl font-bold text-green-900">
                        {stats.availableCandidates}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Successful Placements</p>
                      <p className="text-2xl font-bold text-purple-900">{stats.activePlacements}</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Success Rate</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {stats.averageSuccessRate}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* SQL Level Distribution */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">SQL Level Distribution</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {Object.entries(sqlLevelConfig).map(([level, config]) => {
                    const count = candidates.filter(c => c.sqlLevel === parseInt(level)).length;
                    const percentage = Math.round((count / candidates.length) * 100);
                    return (
                      <div key={level} className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{count}</div>
                        <div className="text-sm text-gray-600">{config.name}</div>
                        <div className="text-xs text-gray-500">{percentage}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
                <div className="space-y-4">
                  {placements.slice(0, 5).map(placement => (
                    <div key={placement.id} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">
                        <strong>{placement.candidateName}</strong> placed at{' '}
                        <strong>{placement.company}</strong>
                      </span>
                      <span className="text-gray-400 text-sm">
                        {new Date(placement.placementDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
