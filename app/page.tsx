'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Shield,
  Settings,
  MessageSquare,
  CheckCircle,
  Users,
  Zap,
} from 'lucide-react';

/**
 * EHB Home Page - Modern landing page with comprehensive features showcase
 * @returns {JSX.Element} The main home page component
 */
export default function HomePage() {
  useEffect(() => {
    // Auto-redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = '/dashboard';
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: 'Development Portal',
      description: 'Access comprehensive development tools and resources',
      icon: <Settings className="w-8 h-8" />,
      href: '/development-portal',
      color: 'bg-blue-500',
    },
    {
      title: 'Project Tracker',
      description: 'Monitor project progress and milestones in real-time',
      icon: <BarChart3 className="w-8 h-8" />,
      href: '/project-tracker',
      color: 'bg-green-500',
    },
    {
      title: 'SLA Management',
      description: 'Service level agreements and compliance monitoring',
      icon: <Shield className="w-8 h-8" />,
      href: '/sco',
      color: 'bg-purple-500',
    },
    {
      title: 'Contact Support',
      description: 'Get help from our dedicated support team',
      icon: <MessageSquare className="w-8 h-8" />,
      href: '/contact',
      color: 'bg-orange-500',
    },
  ];

  const stats = [
    { label: 'Active Projects', value: '12', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Team Members', value: '24', icon: <Users className="w-5 h-5" /> },
    { label: 'SLA Compliance', value: '96.8%', icon: <Shield className="w-5 h-5" /> },
    { label: 'Response Time', value: '2.3h', icon: <Zap className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">EHB Development</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your comprehensive development platform with advanced project tracking, SLA
              management, and real-time monitoring capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/development-portal"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Development Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="text-blue-500">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">
              Everything you need for successful project development and management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  className={`${feature.color} text-white p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Access your dashboard and start managing your projects today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Access Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Auto-redirect notice */}
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
        <p className="text-sm">Redirecting to dashboard in 5 seconds...</p>
      </div>
    </div>
  );
}
