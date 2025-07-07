'use client';

'use client';

import React, { useState, useEffect } from 'react';
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
  Briefcase,
  Building,
  Globe,
  Wallet,
  Coins,
  Brain,
  BookOpen,
  Heart,
  Star,
  TrendingUp,
  Search,
  Menu,
  X,
} from 'lucide-react';
import TailwindTestCard from '@/components/ui/TailwindTestCard';

/**
 * EHB Home Page - Comprehensive landing page showcasing all EHB services
 * @returns {JSX.Element} The main home page component
 */
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Featured Services
  const featuredServices = [
    {
      id: 'jps',
      name: 'JPS',
      fullName: 'Job Placement System',
      description: 'AI-powered job matching and placement platform',
      icon: <Briefcase className="w-8 h-8" />,
      color: 'bg-blue-500',
      status: 'complete',
      progress: 100,
      href: '/jps',
    },
    {
      id: 'franchise',
      name: 'Franchise System',
      fullName: 'Global Franchise Network',
      description: 'Franchise management and expansion platform',
      icon: <Building className="w-8 h-8" />,
      color: 'bg-green-500',
      status: 'complete',
      progress: 100,
      href: '/franchise',
    },
    {
      id: 'wms',
      name: 'WMS',
      fullName: 'World Medical Services',
      description: 'Online + offline verified healthcare system',
      icon: <Heart className="w-8 h-8" />,
      color: 'bg-red-500',
      status: 'complete',
      progress: 100,
      href: '/wms',
    },
    {
      id: 'ols',
      name: 'OLS',
      fullName: 'Online Law Services',
      description: 'AI-Powered Legal Services Platform',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-purple-500',
      status: 'complete',
      progress: 100,
      href: '/ols',
    },
    {
      id: 'agts',
      name: 'AGTS',
      fullName: 'Advanced Global Travel Services',
      description: 'AI-powered Travel Ecosystem',
      icon: <Globe className="w-8 h-8" />,
      color: 'bg-indigo-500',
      status: 'complete',
      progress: 100,
      href: '/agts',
    },
    {
      id: 'wallet',
      name: 'Trusty Wallet',
      fullName: 'EHB Wallet System',
      description: 'Digital wallet and payment processing',
      icon: <Wallet className="w-8 h-8" />,
      color: 'bg-emerald-500',
      status: 'complete',
      progress: 100,
      href: '/wallet',
    },
  ];

  // In Progress Services
  const inProgressServices = [
    {
      id: 'pss',
      name: 'PSS',
      fullName: 'Personal Security System',
      description: 'Identity verification, KYC, fraud prevention',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-purple-500',
      status: 'working',
      progress: 75,
      href: '/pss',
    },
    {
      id: 'edr',
      name: 'EDR',
      fullName: 'Emergency Decision Registration',
      description: 'AI-powered skill verification, exams',
      icon: <Brain className="w-8 h-8" />,
      color: 'bg-blue-500',
      status: 'working',
      progress: 60,
      href: '/edr',
    },
  ];

  // Stats
  const stats = [
    { label: 'Total Services', value: '50+', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Active Users', value: '2.4M+', icon: <Users className="w-5 h-5" /> },
    { label: 'Countries', value: '89', icon: <Globe className="w-5 h-5" /> },
    { label: 'Success Rate', value: '98.7%', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  // Filter services based on search
  const filteredFeaturedServices = featuredServices.filter(
    service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInProgressServices = inProgressServices.filter(
    service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Tailwind CSS Test Card - Auto Rendered */}
      <TailwindTestCard />

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EHB</h1>
                <p className="text-blue-600 text-sm">Global Services Platform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/services"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">EHB</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Your comprehensive global services platform with AI-powered solutions for healthcare,
              legal services, travel, finance, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
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

      {/* Featured Services Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
            <p className="text-lg text-gray-600">Our complete and fully operational services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeaturedServices.map((service, index) => (
              <Link
                key={service.id}
                href={service.href}
                className="group block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`${service.color} text-white p-3 rounded-lg group-hover:scale-110 transition-transform`}
                  >
                    {service.icon}
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Complete</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-3">{service.fullName}</p>
                <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${service.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{service.progress}%</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* In Progress Services Section */}
      {filteredInProgressServices.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">In Development</h2>
              <p className="text-lg text-gray-600">Services currently under development</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredInProgressServices.map((service, index) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`${service.color} text-white p-3 rounded-lg group-hover:scale-110 transition-transform`}
                    >
                      {service.icon}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-orange-600 font-medium">In Progress</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{service.fullName}</p>
                  <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${service.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{service.progress}%</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Explore our comprehensive suite of services and find the perfect solution for your
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-lg text-white hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">EHB</h3>
                  <p className="text-blue-400 text-sm">Global Services Platform</p>
                </div>
              </div>
              <p className="text-gray-400">
                Comprehensive AI-powered services for healthcare, legal, travel, finance, and more.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/jps" className="hover:text-white transition-colors">
                    Job Placement
                  </Link>
                </li>
                <li>
                  <Link href="/wms" className="hover:text-white transition-colors">
                    Medical Services
                  </Link>
                </li>
                <li>
                  <Link href="/ols" className="hover:text-white transition-colors">
                    Legal Services
                  </Link>
                </li>
                <li>
                  <Link href="/agts" className="hover:text-white transition-colors">
                    Travel Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    All Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-white transition-colors">
                    System Status
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EHB Global Services Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
