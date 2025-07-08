'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BriefcaseIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  StarIcon,
  EyeIcon,
  HeartIcon,
  PlusIcon,
  TrendingUp,
  TrendingDown,
  Users,
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
  Calendar,
  MapPin,
  DollarSign,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Filter,
  Search,
  Edit,
  Trash2,
  Send,
} from '@heroicons/react/24/outline';
import { useJPSRole } from './JPSRoleContext';
import JPSApiService, {
  JPSJob,
  JPSCandidate,
  JPSPlacement,
  JPSInterview,
  JPSAnalytics,
} from '../../lib/api/jps-api';

interface JPSDashboardProps {
  userType: 'jobseeker' | 'employer' | 'admin';
}

interface DashboardStats {
  totalJobs: number;
  activeApplications: number;
  completedPlacements: number;
  pendingInterviews: number;
  successRate: number;
  earnings: number;
  sqlLevelDistribution: Record<number, number>;
  monthlyPlacements: Array<{ month: string; count: number }>;
  topSkills: Array<{ skill: string; count: number }>;
}

interface RecentActivity {
  id: string;
  type:
    | 'job_application'
    | 'interview_scheduled'
    | 'placement_completed'
    | 'skill_assessment'
    | 'sql_level_upgrade';
  title: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'in_progress';
  icon: React.ReactNode;
  color: string;
}

const roleWelcome: Record<string, string> = {
  jobseeker: 'Welcome, Job Seeker! Explore jobs, take assessments, and get matched.',
  employer: 'Welcome, Employer! Post jobs, review candidates, and schedule interviews.',
  admin: 'Welcome, Admin! Manage the JPS system, analytics, and user roles.',
};

const JPSDashboard: React.FC = () => {
  const { role } = useJPSRole();
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeApplications: 0,
    completedPlacements: 0,
    pendingInterviews: 0,
    successRate: 0,
    earnings: 0,
    sqlLevelDistribution: {},
    monthlyPlacements: [],
    topSkills: [],
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<JPSJob[]>([]);
  const [candidates, setCandidates] = useState<JPSCandidate[]>([]);
  const [placements, setPlacements] = useState<JPSPlacement[]>([]);
  const [interviews, setInterviews] = useState<JPSInterview[]>([]);
  const [analytics, setAnalytics] = useState<JPSAnalytics | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    loadDashboardData();
    // Set up real-time updates every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, [role, selectedTimeframe]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load all data in parallel
      const [jobsData, candidatesData, placementsData, interviewsData, analyticsData] =
        await Promise.all([
          JPSApiService.getJobs(),
          JPSApiService.getCandidates(),
          JPSApiService.getPlacements(),
          JPSApiService.getInterviews(),
          JPSApiService.getAnalytics(),
        ]);

      setJobs(jobsData);
      setCandidates(candidatesData);
      setPlacements(placementsData);
      setInterviews(interviewsData);
      setAnalytics(analyticsData);

      // Calculate stats based on user role
      const calculatedStats = calculateStats(
        jobsData,
        candidatesData,
        placementsData,
        interviewsData,
        analyticsData
      );
      setStats(calculatedStats);

      // Generate recent activity
      const activity = generateRecentActivity(
        jobsData,
        candidatesData,
        placementsData,
        interviewsData
      );
      setRecentActivity(activity);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (
    jobs: JPSJob[],
    candidates: JPSCandidate[],
    placements: JPSPlacement[],
    interviews: JPSInterview[],
    analytics: JPSAnalytics | null
  ): DashboardStats => {
    if (role === 'jobseeker') {
      return {
        totalJobs: jobs.length,
        activeApplications: Math.floor(Math.random() * 10) + 5, // Mock data
        completedPlacements: placements.filter(p => p.status === 'completed').length,
        pendingInterviews: interviews.filter(i => i.status === 'scheduled').length,
        successRate: Math.round(
          (placements.filter(p => p.status === 'completed').length /
            Math.max(placements.length, 1)) *
            100
        ),
        earnings: placements.reduce((acc, p) => acc + (p.status === 'completed' ? p.salary : 0), 0),
        sqlLevelDistribution: analytics?.sqlLevelDistribution || {},
        monthlyPlacements: analytics?.monthlyPlacements || [],
        topSkills: analytics?.topSkills || [],
      };
    } else if (role === 'employer') {
      return {
        totalJobs: jobs.length,
        activeApplications: candidates.filter(c => c.status === 'available').length,
        completedPlacements: placements.filter(p => p.status === 'completed').length,
        pendingInterviews: interviews.filter(i => i.status === 'scheduled').length,
        successRate: Math.round(
          (placements.filter(p => p.status === 'completed').length /
            Math.max(placements.length, 1)) *
            100
        ),
        earnings: 0, // Employers don't earn from placements
        sqlLevelDistribution: analytics?.sqlLevelDistribution || {},
        monthlyPlacements: analytics?.monthlyPlacements || [],
        topSkills: analytics?.topSkills || [],
      };
    } else {
      // Admin view
      return {
        totalJobs: jobs.length,
        activeApplications: candidates.filter(c => c.status === 'available').length,
        completedPlacements: placements.filter(p => p.status === 'completed').length,
        pendingInterviews: interviews.filter(i => i.status === 'scheduled').length,
        successRate: Math.round(
          (placements.filter(p => p.status === 'completed').length /
            Math.max(placements.length, 1)) *
            100
        ),
        earnings: placements.reduce(
          (acc, p) => acc + (p.status === 'completed' ? p.salary * 0.1 : 0),
          0
        ), // 10% commission
        sqlLevelDistribution: analytics?.sqlLevelDistribution || {},
        monthlyPlacements: analytics?.monthlyPlacements || [],
        topSkills: analytics?.topSkills || [],
      };
    }
  };

  const generateRecentActivity = (
    jobs: JPSJob[],
    candidates: JPSCandidate[],
    placements: JPSPlacement[],
    interviews: JPSInterview[]
  ): RecentActivity[] => {
    const activities: RecentActivity[] = [];

    // Add recent placements
    placements.slice(0, 3).forEach(placement => {
      activities.push({
        id: placement.id,
        type: 'placement_completed',
        title: `Placement completed: ${placement.candidateName}`,
        description: `${placement.candidateName} placed at ${placement.company} as ${placement.jobTitle}`,
        timestamp: new Date(placement.placementDate).toLocaleDateString(),
        status: placement.status === 'completed' ? 'completed' : 'in_progress',
        icon: <Award className="h-5 w-5" />,
        color: 'text-green-500',
      });
    });

    // Add recent interviews
    interviews.slice(0, 2).forEach(interview => {
      activities.push({
        id: interview.id,
        type: 'interview_scheduled',
        title: `Interview scheduled: ${interview.candidateName}`,
        description: `${interview.type} interview for ${interview.jobTitle} at ${interview.company}`,
        timestamp: new Date(interview.scheduledDate).toLocaleDateString(),
        status: interview.status === 'completed' ? 'completed' : 'pending',
        icon: <Calendar className="h-5 w-5" />,
        color: 'text-blue-500',
      });
    });

    // Add SQL level upgrades
    candidates.forEach(candidate => {
      if (candidate.sqlLevel >= 2) {
        activities.push({
          id: `sql-${candidate.id}`,
          type: 'sql_level_upgrade',
          title: `SQL Level upgrade: ${candidate.name}`,
          description: `${candidate.name} upgraded to SQL Level ${candidate.sqlLevel}`,
          timestamp: new Date().toLocaleDateString(),
          status: 'completed',
          icon: <Shield className="h-5 w-5" />,
          color: 'text-purple-500',
        });
        break; // Only add one example
      }
    });

    return activities.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatCardColor = (index: number) => {
    const colors = [
      'bg-blue-50 border-blue-200',
      'bg-green-50 border-green-200',
      'bg-purple-50 border-purple-200',
      'bg-orange-50 border-orange-200',
    ];
    return colors[index % colors.length];
  };

  const getStatIcon = (index: number) => {
    const icons = [
      <BriefcaseIcon className="h-8 w-8 text-blue-600" />,
      <UserGroupIcon className="h-8 w-8 text-green-600" />,
      <Award className="h-8 w-8 text-purple-600" />,
      <Calendar className="h-8 w-8 text-orange-600" />,
    ];
    return icons[index % icons.length];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <ChartBarIcon className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <ChartBarIcon className="h-8 w-8 text-blue-600 mr-3" />
                JPS Dashboard
              </h1>
              <p className="text-gray-600 mt-2">{roleWelcome[role]}</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={e => setSelectedTimeframe(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button
                onClick={loadDashboardData}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`bg-white rounded-lg shadow-sm p-6 border ${getStatCardColor(0)}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12% from last month
                </p>
              </div>
              {getStatIcon(0)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-white rounded-lg shadow-sm p-6 border ${getStatCardColor(1)}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Applications</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeApplications}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Activity className="h-4 w-4 mr-1" />
                  {role === 'jobseeker' ? 'Your applications' : 'Pending reviews'}
                </p>
              </div>
              {getStatIcon(1)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`bg-white rounded-lg shadow-sm p-6 border ${getStatCardColor(2)}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Placements</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedPlacements}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  {stats.successRate}% success rate
                </p>
              </div>
              {getStatIcon(2)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`bg-white rounded-lg shadow-sm p-6 border ${getStatCardColor(3)}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Interviews</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingInterviews}</p>
                <p className="text-sm text-yellow-600 flex items-center mt-1">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {role === 'jobseeker' ? 'Your interviews' : 'To schedule'}
                </p>
              </div>
              {getStatIcon(3)}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SQL Level Distribution */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SQL Level Distribution</h3>
              <div className="space-y-4">
                {Object.entries(stats.sqlLevelDistribution).map(([level, count]) => {
                  const total = Object.values(stats.sqlLevelDistribution).reduce(
                    (a, b) => a + b,
                    0
                  );
                  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                  const levelNames = ['Free', 'Basic', 'Normal', 'High', 'VIP'];

                  return (
                    <div key={level} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                        <span className="text-sm font-medium text-gray-700">
                          Level {level} - {levelNames[parseInt(level)]}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No recent activity</p>
                  </div>
                ) : (
                  recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`p-2 rounded-lg ${activity.color.replace('text-', 'bg-').replace('-500', '-100')}`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                      <div className="flex items-center">{getStatusIcon(activity.status)}</div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Top Skills */}
        {stats.topSkills.length > 0 && (
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills in Demand</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {stats.topSkills.slice(0, 12).map((skill, index) => (
                  <motion.div
                    key={skill.skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="text-2xl font-bold text-blue-600 mb-2">{skill.count}</div>
                    <div className="text-sm text-gray-700">{skill.skill}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <PlusIcon className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-sm font-medium">Post Job</span>
              </button>
              <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-sm font-medium">Schedule Interview</span>
              </button>
              <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-6 w-6 text-purple-600 mr-2" />
                <span className="text-sm font-medium">View Candidates</span>
              </button>
              <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <BarChart3 className="h-6 w-6 text-orange-600 mr-2" />
                <span className="text-sm font-medium">Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JPSDashboard;
