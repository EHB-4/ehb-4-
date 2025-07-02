"use client";

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  Calendar,
  Target,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  FileText,
  Settings,
  MessageSquare,
  Star,
  Zap,
  Shield,
} from 'lucide-react';

interface Metric {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface RecentActivity {
  id: string;
  type: 'project' | 'milestone' | 'risk' | 'sla';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const mockMetrics: Metric[] = [
  {
    title: 'Active Projects',
    value: 12,
    change: 8.2,
    icon: <Target className="w-6 h-6" />,
    color: 'text-blue-600',
  },
  {
    title: 'Team Members',
    value: 24,
    change: 12.5,
    icon: <Users className="w-6 h-6" />,
    color: 'text-green-600',
  },
  {
    title: 'SLA Compliance',
    value: '96.8%',
    change: 2.1,
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'text-purple-600',
  },
  {
    title: 'Avg Response Time',
    value: '2.3h',
    change: -15.4,
    icon: <Clock className="w-6 h-6" />,
    color: 'text-orange-600',
  },
];

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'project',
    title: 'EHB Platform Development',
    description: 'Milestone completed: Design Phase',
    timestamp: '2 hours ago',
    status: 'success',
  },
  {
    id: '2',
    type: 'milestone',
    title: 'AI Integration Module',
    description: 'Development phase started',
    timestamp: '4 hours ago',
    status: 'info',
  },
  {
    id: '3',
    type: 'risk',
    title: 'Resource Constraints',
    description: 'New risk identified in Project Alpha',
    timestamp: '6 hours ago',
    status: 'warning',
  },
  {
    id: '4',
    type: 'sla',
    title: 'SLA Compliance Alert',
    description: 'Response time exceeded threshold',
    timestamp: '8 hours ago',
    status: 'error',
  },
];

const QuickActions = [
  {
    title: 'Development Portal',
    description: 'Access development tools and resources',
    icon: <Settings className="w-8 h-8" />,
    href: '/development-portal',
    color: 'bg-blue-500',
  },
  {
    title: 'Project Tracker',
    description: 'Monitor project progress and milestones',
    icon: <BarChart3 className="w-8 h-8" />,
    href: '/project-tracker',
    color: 'bg-green-500',
  },
  {
    title: 'SLA Management',
    description: 'Service level agreements and compliance',
    icon: <Shield className="w-8 h-8" />,
    href: '/sco',
    color: 'bg-purple-500',
  },
  {
    title: 'Contact Support',
    description: 'Get help from our support team',
    icon: <MessageSquare className="w-8 h-8" />,
    href: '/contact',
    color: 'bg-orange-500',
  },
];

const StatusBadge: React.FC<{ status: RecentActivity['status'] }> = ({ status }) => {
  const config = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${config[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>(mockMetrics);
  const [activities, setActivities] = useState<RecentActivity[]>(mockActivities);

  useEffect(() => {
    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setMetrics(prev =>
        prev.map(metric => ({
          ...metric,
          change: metric.change + (Math.random() - 0.5) * 2,
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Development Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's what's happening with your projects.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                New Project
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp
                      className={`w-4 h-4 ${
                        metric.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ml-1 ${
                        metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {metric.change >= 0 ? '+' : ''}
                      {metric.change.toFixed(1)}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={metric.color}>{metric.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-4">
                {QuickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${action.color} text-white p-2 rounded-lg`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activities.map(activity => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {activity.type === 'project' && (
                            <Target className="w-5 h-5 text-blue-500" />
                          )}
                          {activity.type === 'milestone' && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {activity.type === 'risk' && (
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          )}
                          {activity.type === 'sla' && (
                            <Shield className="w-5 h-5 text-purple-500" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                          <StatusBadge status={activity.status} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    View all activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset="25.12"
                        className="text-green-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-900">90%</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">Project Completion</h3>
                  <p className="text-sm text-gray-600">On track for delivery</p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset="50.24"
                        className="text-blue-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-900">80%</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">Budget Utilization</h3>
                  <p className="text-sm text-gray-600">Within allocated budget</p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset="12.56"
                        className="text-purple-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-900">95%</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">SLA Compliance</h3>
                  <p className="text-sm text-gray-600">Exceeding expectations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
