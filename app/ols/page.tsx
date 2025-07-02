import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  User,
  MessageSquare,
  FileText,
  Scale,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
} from 'lucide-react';

export default function OLSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">OLS</h1>
                <p className="text-purple-600 font-medium">Online Law Services</p>
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
              AI-Powered Legal Services Platform
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with qualified legal professionals and access comprehensive legal services.
              From consultations to document preparation, we provide expert legal assistance
              worldwide.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>100% Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-5 w-5" />
                <span>Port 4010</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <TrendingUp className="h-5 w-5" />
                <span>Legal Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Lawyer Directory</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Verified legal professionals with expertise in various practice areas.
            </p>
            <Link href="/ols/lawyers" className="text-purple-600 hover:text-purple-800 font-medium">
              Find Lawyers →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Legal Consultations</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Online legal consultations with qualified attorneys for various legal matters.
            </p>
            <Link
              href="/ols/consultations"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Book Consultation →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Contract Services</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Professional contract drafting, review, and legal document preparation.
            </p>
            <Link href="/ols/contracts" className="text-green-600 hover:text-green-800 font-medium">
              Create Contracts →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Scale className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Legal Advice</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Expert legal advice and guidance for personal and business legal matters.
            </p>
            <Link
              href="/ols/legal-advice"
              className="text-orange-600 hover:text-orange-800 font-medium"
            >
              Get Advice →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Legal Protection</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive legal protection services for individuals and businesses.
            </p>
            <Link
              href="/ols/legal-protection"
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Learn More →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Legal Resources</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Access to legal forms, templates, and educational legal resources.
            </p>
            <Link href="/ols/resources" className="text-gray-600 hover:text-gray-800 font-medium">
              Browse Resources →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Legal Services Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1,247</div>
              <div className="text-gray-600">Verified Lawyers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">89</div>
              <div className="text-gray-600">Practice Areas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">15,678</div>
              <div className="text-gray-600">Cases Handled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">96.8%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/ols/lawyers"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="text-purple-600 font-medium">Lawyers</div>
            </Link>
            <Link
              href="/ols/consultations"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 font-medium">Consultations</div>
            </Link>
            <Link
              href="/ols/contracts"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="text-green-600 font-medium">Contracts</div>
            </Link>
            <Link
              href="/ols/legal-advice"
              className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <div className="text-orange-600 font-medium">Legal Advice</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
