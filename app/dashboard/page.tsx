'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Download,
  Star,
  Settings,
  Bell,
  Search,
  Menu,
  BarChart3,
  Activity,
  Users,
  Package,
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Downloads',
      value: '1,234',
      change: '+12%',
      icon: Download,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Users',
      value: '5,678',
      change: '+8%',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Revenue',
      value: '$12,345',
      change: '+15%',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
    {
      title: 'Apps Owned',
      value: '23',
      change: '+2',
      icon: Package,
      color: 'bg-orange-500',
    },
  ];

  const recentApps = [
    {
      id: 1,
      name: 'EHB Wallet',
      category: 'Finance',
      lastUsed: '2 hours ago',
      icon: '💰',
    },
    {
      id: 2,
      name: 'EHB AI Assistant',
      category: 'Productivity',
      lastUsed: '1 day ago',
      icon: '🤖',
    },
    {
      id: 3,
      name: 'EHB Analytics',
      category: 'Business',
      lastUsed: '3 days ago',
      icon: '📊',
    },
  ];

  const quickActions = [
    {
      title: 'Install New App',
      description: 'Browse and install new applications',
      icon: Download,
      color: 'bg-blue-500',
      href: '/apps',
    },
    {
      title: 'Manage Subscriptions',
      description: 'View and manage your subscriptions',
      icon: Settings,
      color: 'bg-green-500',
      href: '/subscriptions',
    },
    {
      title: 'View Analytics',
      description: 'Check your usage statistics',
      icon: BarChart3,
      color: 'bg-purple-500',
      href: '/analytics',
    },
    {
      title: 'Support Center',
      description: 'Get help and support',
      icon: Bell,
      color: 'bg-orange-500',
      href: '/support',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-semibold text-gray-900">
                EHB Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening with your account today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'apps', 'analytics', 'settings'].map(tab => (
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
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <Link
                        key={index}
                        href={action.href}
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className={`${action.color} p-2 rounded-lg mr-4`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{action.title}</h4>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Apps */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Apps</h3>
                  <div className="space-y-3">
                    {recentApps.map(app => (
                      <div
                        key={app.id}
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-2xl mr-4">{app.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{app.name}</h4>
                          <p className="text-sm text-gray-600">{app.category}</p>
                        </div>
                        <div className="text-sm text-gray-500">{app.lastUsed}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'apps' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">My Apps</h3>
                  <Link
                    href="/apps"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Apps
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentApps.map(app => (
                    <div
                      key={app.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center mb-3">
                        <div className="text-2xl mr-3">{app.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-900">{app.name}</h4>
                          <p className="text-sm text-gray-600">{app.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{app.lastUsed}</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Open
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Analytics</h3>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Analytics dashboard coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Account Settings</h4>
                      <p className="text-sm text-gray-600">Manage your account preferences</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Edit</button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                      <p className="text-sm text-gray-600">Control your privacy and data</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Edit</button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Notification Settings</h4>
                      <p className="text-sm text-gray-600">Manage your notifications</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Edit</button>
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
