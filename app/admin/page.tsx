'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Settings,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Ban,
  Check,
  X,
  Plus,
  Download,
  Upload,
  RefreshCw,
  BarChart3,
  Server,
  Database,
  Globe,
  Smartphone,
  Monitor,
  Mail,
  Bell,
  UserCheck,
  UserX,
  Key,
  Lock,
  Unlock,
} from 'lucide-react';
import {
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ServerIcon,
  CircleStackIcon,
  BellIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastLogin: string;
  avatar: string;
  department: string;
}

interface SystemMetric {
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@ehb.com',
    role: 'admin',
    status: 'active',
    joinDate: '2023-01-01',
    lastLogin: '2023-12-01T10:30:00Z',
    avatar: '/api/placeholder/40/40',
    department: 'Administration',
  },
  {
    id: '2',
    name: 'Moderator One',
    email: 'mod1@ehb.com',
    role: 'moderator',
    status: 'active',
    joinDate: '2023-02-15',
    lastLogin: '2023-12-01T09:15:00Z',
    avatar: '/api/placeholder/40/40',
    department: 'Content',
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@ehb.com',
    role: 'user',
    status: 'active',
    joinDate: '2023-03-20',
    lastLogin: '2023-12-01T08:45:00Z',
    avatar: '/api/placeholder/40/40',
    department: 'General',
  },
  {
    id: '4',
    name: 'Suspended User',
    email: 'suspended@ehb.com',
    role: 'user',
    status: 'suspended',
    joinDate: '2023-04-10',
    lastLogin: '2023-11-28T14:20:00Z',
    avatar: '/api/placeholder/40/40',
    department: 'General',
  },
];

const mockSystemMetrics: SystemMetric[] = [
  {
    name: 'Total Users',
    value: '12,847',
    change: 12.5,
    trend: 'up',
    icon: UserGroupIcon,
  },
  {
    name: 'Active Sessions',
    value: '2,341',
    change: -3.2,
    trend: 'down',
    icon: GlobeAltIcon,
  },
  {
    name: 'Revenue (Monthly)',
    value: '$45,230',
    change: 8.7,
    trend: 'up',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'System Uptime',
    value: '99.9%',
    change: 0.1,
    trend: 'up',
    icon: ServerIcon,
  },
  {
    name: 'Database Size',
    value: '2.4 TB',
    change: 15.3,
    trend: 'up',
    icon: CircleStackIcon,
  },
  {
    name: 'Security Score',
    value: 'A+',
    change: 0,
    trend: 'stable',
    icon: ShieldCheckIcon,
  },
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High CPU Usage',
    message: 'Server CPU usage is at 85% for the last 10 minutes',
    timestamp: '2023-12-01T10:30:00Z',
    priority: 'medium',
  },
  {
    id: '2',
    type: 'info',
    title: 'New User Registration',
    message: '50 new users registered in the last hour',
    timestamp: '2023-12-01T10:25:00Z',
    priority: 'low',
  },
  {
    id: '3',
    type: 'success',
    title: 'Backup Completed',
    message: 'Daily backup completed successfully',
    timestamp: '2023-12-01T10:20:00Z',
    priority: 'low',
  },
  {
    id: '4',
    type: 'error',
    title: 'Database Connection Error',
    message: 'Failed to connect to primary database',
    timestamp: '2023-12-01T10:15:00Z',
    priority: 'critical',
  },
];

/**
 * EHB Admin Panel - Comprehensive administrative interface
 * @returns {JSX.Element} The admin panel component
 */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'suspended':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-600 bg-purple-100';
      case 'moderator':
        return 'text-blue-600 bg-blue-100';
      case 'user':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'info':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'success':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      case 'stable':
        return '→';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your platform and monitor system health
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
                  { id: 'users', name: 'User Management', icon: UserGroupIcon },
                  { id: 'alerts', name: 'System Alerts', icon: BellIcon },
                  { id: 'security', name: 'Security', icon: ShieldCheckIcon },
                  { id: 'settings', name: 'Settings', icon: CogIcon },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            {activeTab === 'users' && (
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={roleFilter}
                    onChange={e => setRoleFilter(e.target.value)}
                    className="block px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Filter by role"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="user">User</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="block px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Filter by status"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            )}

            {/* Tab Content */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserGroupIcon className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">New user registration</p>
                          <p className="text-sm text-gray-500">
                            john.doe@example.com joined the platform
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">2 min ago</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            System backup completed
                          </p>
                          <p className="text-sm text-gray-500">
                            Daily backup completed successfully
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">15 min ago</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            High CPU usage detected
                          </p>
                          <p className="text-sm text-gray-500">Server CPU usage at 85%</p>
                        </div>
                        <div className="text-sm text-gray-500">1 hour ago</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <UserGroupIcon className="h-6 w-6 text-blue-600 mb-2" />
                        <p className="text-sm font-medium text-gray-900">Add User</p>
                      </button>
                      <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <ShieldCheckIcon className="h-6 w-6 text-green-600 mb-2" />
                        <p className="text-sm font-medium text-gray-900">Security Scan</p>
                      </button>
                      <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <CircleStackIcon className="h-6 w-6 text-purple-600 mb-2" />
                        <p className="text-sm font-medium text-gray-900">Backup Now</p>
                      </button>
                      <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <CogIcon className="h-6 w-6 text-gray-600 mb-2" />
                        <p className="text-sm font-medium text-gray-900">System Settings</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.avatar}
                                alt={user.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.lastLogin).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Suspend</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-4">
                {mockAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{alert.title}</h4>
                        <p className="text-sm mt-1">{alert.message}</p>
                        <p className="text-xs mt-2 opacity-75">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            alert.priority === 'critical'
                              ? 'bg-red-200 text-red-800'
                              : alert.priority === 'high'
                                ? 'bg-orange-200 text-orange-800'
                                : alert.priority === 'medium'
                                  ? 'bg-yellow-200 text-yellow-800'
                                  : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {alert.priority}
                        </span>
                        <button className="text-sm hover:underline">Dismiss</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Security Overview</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Firewall Status</span>
                        <span className="text-sm font-medium text-green-600">Active</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">SSL Certificate</span>
                        <span className="text-sm font-medium text-green-600">Valid</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Security Scan</span>
                        <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Vulnerabilities</span>
                        <span className="text-sm font-medium text-green-600">0 Found</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Access Logs</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Failed Login Attempts</span>
                        <span className="font-medium text-red-600">3 (last 24h)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Suspicious IPs</span>
                        <span className="font-medium text-yellow-600">1 Blocked</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Admin Logins</span>
                        <span className="font-medium text-gray-900">12 (last 24h)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">System Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Maintenance Mode
                      </label>
                      <div className="mt-1">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-900">
                            Enable maintenance mode
                          </span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Auto Backup</label>
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        aria-label="Select backup frequency"
                      >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Session Timeout
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
