'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Search,
  Settings,
  Menu,
  X,
  ArrowRight,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Grid3X3,
  Users,
  Briefcase,
  Building,
  Shield,
  BookOpen,
  Globe,
  Wallet,
  Coins,
  Brain,
  Crown,
  BarChart3,
  Bot,
  Code,
  Route,
  Sparkles,
} from 'lucide-react';
import {
  getServiceByPath,
  getFeaturedServices,
  getServicesByCategory,
  getServiceStats,
  type ServiceRoute,
} from '@/lib/utils/serviceRoutes';

interface SmartNavigationProps {
  showAutoRedirect?: boolean;
  onServiceSelect?: (service: ServiceRoute) => void;
}

/**
 * Smart Navigation Component
 * Automatically detects current service and provides intelligent navigation
 */
export default function SmartNavigation({
  showAutoRedirect = true,
  onServiceSelect,
}: SmartNavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showQuickAccess, setShowQuickAccess] = useState(false);

  const currentService = getServiceByPath(pathname);
  const featuredServices = getFeaturedServices();
  const stats = getServiceStats();

  // Get service icon component
  const getServiceIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      Briefcase: <Briefcase className="w-5 h-5" />,
      Building: <Building className="w-5 h-5" />,
      Shield: <Shield className="w-5 h-5" />,
      BookOpen: <BookOpen className="w-5 h-5" />,
      Globe: <Globe className="w-5 h-5" />,
      Wallet: <Wallet className="w-5 h-5" />,
      Coins: <Coins className="w-5 h-5" />,
      Brain: <Brain className="w-5 h-5" />,
      Settings: <Settings className="w-5 h-5" />,
      Crown: <Crown className="w-5 h-5" />,
      BarChart3: <BarChart3 className="w-5 h-5" />,
      Bot: <Bot className="w-5 h-5" />,
      Home: <Home className="w-5 h-5" />,
      Code: <Code className="w-5 h-5" />,
      Route: <Route className="w-5 h-5" />,
      Sparkles: <Sparkles className="w-5 h-5" />,
    };
    return iconMap[iconName] || <Grid3X3 className="w-5 h-5" />;
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'working':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'under-dev':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  // Filter services based on search and category
  const filteredServices = getServicesByCategory(selectedCategory).filter(service => {
    if (searchQuery) {
      return (
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <>
      {/* Main Navigation Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">EHB</span>
              </Link>

              {/* Current Service Indicator */}
              {currentService && (
                <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {getServiceIcon(currentService.icon)}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentService.name}
                  </span>
                  {getStatusIcon(currentService.status)}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {currentService.progress}%
                  </span>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center space-x-4">
              {/* Quick Access Button */}
              <button
                onClick={() => setShowQuickAccess(!showQuickAccess)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                title="Quick Service Access"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>

              {/* Services Stats */}
              <div className="hidden lg:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">{stats.complete}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">{stats.working}</span>
                </div>
              </div>

              {/* Main Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-6">
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
                >
                  Services
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/development-portal"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
                >
                  Dev Portal
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                <Link
                  href="/services"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/development-portal"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Development Portal
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Access Panel */}
      <AnimatePresence>
        {showQuickAccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Access
                </h3>
                <button
                  onClick={() => setShowQuickAccess(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Services</option>
                  <option value="Core Services">Core Services</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>

              {/* Services List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredServices.slice(0, 10).map(service => (
                  <Link
                    key={service.id}
                    href={service.path}
                    onClick={() => {
                      setShowQuickAccess(false);
                      onServiceSelect?.(service);
                    }}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className={`${service.color} p-2 rounded-lg text-white`}>
                      {getServiceIcon(service.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {service.name}
                        </p>
                        {getStatusIcon(service.status)}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {service.fullName}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>

              {/* View All Link */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/services"
                  onClick={() => setShowQuickAccess(false)}
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View All Services
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Services Banner */}
      {showAutoRedirect && currentService && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800 dark:text-blue-200">
                  Currently viewing: <strong>{currentService.fullName}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-700 dark:text-blue-300">
                <span>Progress: {currentService.progress}%</span>
                {getStatusIcon(currentService.status)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

/**
 * Service Breadcrumb Component
 */
export function ServiceBreadcrumbs() {
  const pathname = usePathname();
  const currentService = getServiceByPath(pathname);

  if (!currentService) return null;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: currentService.name, path: currentService.path },
  ];

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.path}>
              {index > 0 && <span className="text-gray-400 dark:text-gray-600">/</span>}
              <Link
                href={breadcrumb.path}
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  index === breadcrumbs.length - 1
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {breadcrumb.name}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}
