import React from 'react';
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
} from 'lucide-react';

export default function JPSPage() {
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
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
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
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Candidate Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive candidate profiles with skills, experience, and preferences tracking.
            </p>
            <Link href="/jps/candidates" className="text-blue-600 hover:text-blue-800 font-medium">
              View Candidates →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Job Listings</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Curated job opportunities from top employers with detailed requirements.
            </p>
            <Link
              href="/jps/job-listings"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Browse Jobs →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ChartBar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Analytics & Insights</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Data-driven insights into placement success rates and market trends.
            </p>
            <Link
              href="/jps/analytics"
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              View Analytics →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Smart Matching</h3>
            </div>
            <p className="text-gray-600 mb-4">
              AI-powered algorithm that matches candidates with the perfect job opportunities.
            </p>
            <Link
              href="/jps/matching"
              className="text-orange-600 hover:text-orange-800 font-medium"
            >
              Try Matching →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Interview Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Streamlined interview scheduling and feedback collection system.
            </p>
            <Link href="/jps/interviews" className="text-red-600 hover:text-red-800 font-medium">
              Manage Interviews →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Cog className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Settings & Config</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Customize system preferences and manage user permissions.
            </p>
            <Link href="/jps/settings" className="text-gray-600 hover:text-gray-800 font-medium">
              Configure →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">System Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1,247</div>
              <div className="text-gray-600">Active Candidates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">892</div>
              <div className="text-gray-600">Job Listings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">156</div>
              <div className="text-gray-600">Successful Placements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">94.2%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/jps/candidates"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 font-medium">Candidates</div>
            </Link>
            <Link
              href="/jps/job-listings"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="text-green-600 font-medium">Job Listings</div>
            </Link>
            <Link
              href="/jps/employers"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="text-purple-600 font-medium">Employers</div>
            </Link>
            <Link
              href="/jps/admin"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-gray-600 font-medium">Admin Panel</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
