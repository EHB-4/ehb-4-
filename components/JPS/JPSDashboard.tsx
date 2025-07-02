"use client";

'use client';

import React, { useState, useEffect } from 'react';
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
} from '@heroicons/react/24/outline';
import { useJPSRole } from './JPSRoleContext';

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
}

interface RecentActivity {
  id: string;
  type: 'job_application' | 'interview_scheduled' | 'placement_completed' | 'skill_assessment';
  title: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'in_progress';
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
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      loadDashboardData();
      setLoading(false);
    }, 1000);
  }, [role]);

  const loadDashboardData = () => {
    // Mock data based on user type
    if (role === 'jobseeker') {
      setStats({
        totalJobs: 156,
        activeApplications: 8,
        completedPlacements: 3,
        pendingInterviews: 2,
        successRate: 85,
        earnings: 2500,
      });
      setRecentActivity([
        {
          id: '1',
          type: 'job_application',
          title: 'Applied for Senior React Developer',
          description: 'Application submitted to TechCorp Inc.',
          timestamp: '2 hours ago',
          status: 'pending',
        },
        {
          id: '2',
          type: 'interview_scheduled',
          title: 'Interview scheduled with AI Solutions',
          description: 'Video interview on Friday, 2:00 PM',
          timestamp: '1 day ago',
          status: 'in_progress',
        },
        {
          id: '3',
          type: 'skill_assessment',
          title: 'Completed JavaScript Assessment',
          description: 'Score: 92/100 - Excellent performance',
          timestamp: '3 days ago',
          status: 'completed',
        },
      ]);
    } else if (role === 'employer') {
      setStats({
        totalJobs: 24,
        activeApplications: 156,
        completedPlacements: 12,
        pendingInterviews: 8,
        successRate: 78,
        earnings: 0,
      });
      setRecentActivity([
        {
          id: '1',
          type: 'job_application',
          title: 'New application for Frontend Developer',
          description: 'Sarah Johnson applied to your posting',
          timestamp: '1 hour ago',
          status: 'pending',
        },
        {
          id: '2',
          type: 'interview_scheduled',
          title: 'Interview with Mike Chen scheduled',
          description: 'Senior Developer position - Tomorrow 10 AM',
          timestamp: '4 hours ago',
          status: 'in_progress',
        },
        {
          id: '3',
          type: 'placement_completed',
          title: 'Successfully hired Alex Rodriguez',
          description: 'Full-stack Developer position filled',
          timestamp: '2 days ago',
          status: 'completed',
        },
      ]);
    } else {
      // Admin view
      setStats({
        totalJobs: 1247,
        activeApplications: 3456,
        completedPlacements: 892,
        pendingInterviews: 234,
        successRate: 82,
        earnings: 45600,
      });
      setRecentActivity([
        {
          id: '1',
          type: 'placement_completed',
          title: 'Monthly placement report generated',
          description: '892 successful placements this month',
          timestamp: '2 hours ago',
          status: 'completed',
        },
        {
          id: '2',
          type: 'skill_assessment',
          title: 'New employer registered',
          description: 'TechStart Inc. joined the platform',
          timestamp: '6 hours ago',
          status: 'completed',
        },
        {
          id: '3',
          type: 'job_application',
          title: 'Fraud detection alert',
          description: 'Suspicious activity detected in job posting',
          timestamp: '1 day ago',
          status: 'pending',
        },
      ]);
    }
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'job_application':
        return <BriefcaseIcon className="h-5 w-5 text-blue-500" />;
      case 'interview_scheduled':
        return <ClockIcon className="h-5 w-5 text-green-500" />;
      case 'placement_completed':
        return <CheckCircleIcon className="h-5 w-5 text-purple-500" />;
      case 'skill_assessment':
        return <StarIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ChartBarIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{roleWelcome[role]}</h2>
        <p className="text-blue-100">
          {role === 'jobseeker' && 'Find your dream job with AI-powered matching'}
          {role === 'employer' && 'Hire the best talent with intelligent candidate matching'}
          {role === 'admin' && 'Monitor and manage the entire job placement ecosystem'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {role === 'jobseeker' ? 'Available Jobs' : 'Posted Jobs'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {role === 'jobseeker' ? 'Active Applications' : 'Applications'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {role === 'jobseeker' ? 'Placements' : 'Hires'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedPlacements}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {role === 'jobseeker' ? 'Pending Interviews' : 'Scheduled'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingInterviews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Rate</h3>
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Overall Success</span>
                <span className="text-sm font-bold text-gray-900">{stats.successRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.successRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {role === 'jobseeker' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings</h3>
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">${stats.earnings}</p>
                <p className="text-sm text-gray-600">Total earnings this month</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                </div>
                <div className="flex-shrink-0">{getStatusIcon(activity.status)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {role === 'jobseeker' && (
            <>
              <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <EyeIcon className="h-5 w-5 mr-2" />
                Browse Jobs
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <HeartIcon className="h-5 w-5 mr-2" />
                Saved Jobs
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <StarIcon className="h-5 w-5 mr-2" />
                Skill Assessment
              </button>
            </>
          )}

          {role === 'employer' && (
            <>
              <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <PlusIcon className="h-5 w-5 mr-2" />
                Post New Job
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <UserGroupIcon className="h-5 w-5 mr-2" />
                View Candidates
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Analytics
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JPSDashboard;
