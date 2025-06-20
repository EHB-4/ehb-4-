'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Package,
  DollarSign,
  BarChart3,
  Settings,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
} from 'lucide-react';

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const adminStats = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+5.2%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Apps',
      value: '1,234',
      change: '+12.1%',
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+8.7%',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: '+0.1%',
      icon: Activity,
      color: 'bg-orange-500',
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      joined: '2024-01-15',
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active',
      joined: '2024-01-14',
      lastActive: '1 day ago',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: 'inactive',
      joined: '2024-01-10',
      lastActive: '5 days ago',
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'High CPU usage detected on server-01',
      time: '5 minutes ago',
    },
    {
      id: 2,
      type: 'info',
      message: 'Database backup completed successfully',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'error',
      message: 'Payment gateway timeout detected',
      time: '2 hours ago',
    },
  ];

  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      icon: Plus,
      color: 'bg-blue-500',
      action: () => console.log('Add user'),
    },
    {
      title: 'Upload App',
      description: 'Upload a new application',
      icon: Upload,
      color: 'bg-green-500',
      action: () => console.log('Upload app'),
    },
    {
      title: 'Generate Report',
      description: 'Create system reports',
      icon: Download,
      color: 'bg-purple-500',
      action: () => console.log('Generate report'),
    },
    {
      title: 'System Backup',
      description: 'Create system backup',
      icon: Shield,
      color: 'bg-orange-500',
      action: () => console.log('System backup'),
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-red-600" />
                <span className="text-xl font-bold text-gray-900">EHB Admin</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage your EHB platform, users, and system settings.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last week</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className={`${action.color} p-2 rounded-lg mr-4`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'users', 'apps', 'analytics', 'system'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Users */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Recent Users</h3>
                    <Link
                      href="/admin/users"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {recentUsers.map(user => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{user.name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(user.status)}
                          <span className="text-sm text-gray-500">{user.lastActive}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Alerts */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
                  <div className="space-y-3">
                    {systemAlerts.map(alert => (
                      <div
                        key={alert.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {getAlertIcon(alert.type)}
                          <div>
                            <p className="text-sm text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500">{alert.time}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">User Management</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add User</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Active
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentUsers.map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                <Users className="h-4 w-4 text-gray-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(user.status)}
                              <span className="ml-2 text-sm text-gray-900 capitalize">
                                {user.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joined}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastActive}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'apps' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">App Management</h3>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">App management interface coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Advanced analytics dashboard coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Database Settings</h4>
                      <p className="text-sm text-gray-600">
                        Configure database connections and backups
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Configure</button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Security Settings</h4>
                      <p className="text-sm text-gray-600">
                        Manage security policies and access controls
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Configure</button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">API Settings</h4>
                      <p className="text-sm text-gray-600">
                        Configure API endpoints and rate limits
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Configure</button>
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
