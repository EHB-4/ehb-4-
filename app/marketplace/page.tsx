'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Users,
  TrendingUp,
  ShoppingCart,
  Shield,
  Brain,
  Globe,
  BookOpen,
  Briefcase,
  Heart,
  Eye,
  ArrowRight,
  Grid3X3,
  List,
} from 'lucide-react';
import Link from 'next/link';

/**
 * EHB Marketplace - Comprehensive service marketplace with filtering and search
 * @returns {JSX.Element} The marketplace component
 */
export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  const services = [
    {
      id: 1,
      name: 'GoSellr',
      category: 'e-commerce',
      description: 'Global e-commerce platform with verified sellers and secure transactions',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      rating: 4.8,
      users: '12.5K',
      price: 'Free',
      trending: true,
      featured: true,
      href: '/gosellr',
    },
    {
      id: 2,
      name: 'WMS',
      category: 'healthcare',
      description: 'Healthcare system with verified doctors and medical services',
      icon: Shield,
      color: 'bg-green-500',
      rating: 4.9,
      users: '8.2K',
      price: 'Free',
      trending: true,
      featured: true,
      href: '/wms',
    },
    {
      id: 3,
      name: 'AI Marketplace',
      category: 'ai',
      description: 'Advanced AI tools and services for businesses and individuals',
      icon: Brain,
      color: 'bg-purple-500',
      rating: 4.7,
      users: '15.3K',
      price: 'Free',
      trending: true,
      featured: true,
      href: '/ai-marketplace',
    },
    {
      id: 4,
      name: 'PSS',
      category: 'security',
      description: 'Identity and business verification services',
      icon: Globe,
      color: 'bg-orange-500',
      rating: 4.6,
      users: '5.1K',
      price: 'Free',
      trending: false,
      featured: false,
      href: '/pss',
    },
    {
      id: 5,
      name: 'OBS',
      category: 'education',
      description: 'Educational resources and learning management system',
      icon: BookOpen,
      color: 'bg-indigo-500',
      rating: 4.5,
      users: '3.8K',
      price: 'Free',
      trending: false,
      featured: false,
      href: '/obs',
    },
    {
      id: 6,
      name: 'JPS',
      category: 'jobs',
      description: 'Job marketplace connecting employers and job seekers',
      icon: Briefcase,
      color: 'bg-teal-500',
      rating: 4.4,
      users: '7.2K',
      price: 'Free',
      trending: false,
      featured: false,
      href: '/jps',
    },
    {
      id: 7,
      name: 'EMO',
      category: 'ai',
      description: 'AI-powered emotional intelligence tools',
      icon: Brain,
      color: 'bg-pink-500',
      rating: 4.3,
      users: '2.1K',
      price: 'Free',
      trending: false,
      featured: false,
      href: '/emo',
    },
    {
      id: 8,
      name: 'HPS',
      category: 'healthcare',
      description: 'Healthcare provider services and management',
      icon: Shield,
      color: 'bg-emerald-500',
      rating: 4.2,
      users: '1.8K',
      price: 'Free',
      trending: false,
      featured: false,
      href: '/hps',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Services', count: services.length },
    {
      id: 'e-commerce',
      name: 'E-Commerce',
      count: services.filter(s => s.category === 'e-commerce').length,
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      count: services.filter(s => s.category === 'healthcare').length,
    },
    { id: 'ai', name: 'AI & ML', count: services.filter(s => s.category === 'ai').length },
    {
      id: 'security',
      name: 'Security',
      count: services.filter(s => s.category === 'security').length,
    },
    {
      id: 'education',
      name: 'Education',
      count: services.filter(s => s.category === 'education').length,
    },
    { id: 'jobs', name: 'Jobs', count: services.filter(s => s.category === 'jobs').length },
  ];

  const filteredServices = useMemo(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        service =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Sort services
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'users':
        filtered.sort(
          (a, b) => parseInt(b.users.replace('K', '000')) - parseInt(a.users.replace('K', '000'))
        );
        break;
      case 'trending':
        filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                EHB Service Marketplace
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover and explore our comprehensive suite of digital services designed to meet
                all your needs
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="users">Most Users</option>
                  <option value="trending">Trending</option>
                  <option value="name">Name A-Z</option>
                </select>

                <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-l-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-r-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured Services */}
        {selectedCategory === 'all' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Featured Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter(s => s.featured)
                .map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Link href={service.href}>
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer">
                        {service.trending && (
                          <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </div>
                        )}
                        <div
                          className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                        >
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {service.rating}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {service.users}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* All Services */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {selectedCategory === 'all'
              ? 'All Services'
              : `${categories.find(c => c.id === selectedCategory)?.name}`}
            <span className="text-gray-500 text-lg font-normal ml-2">
              ({filteredServices.length})
            </span>
          </h2>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={service.href}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer group">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`${service.color} w-10 h-10 rounded-lg flex items-center justify-center`}
                        >
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-500">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {service.rating}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {service.users}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-green-600">{service.price}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={service.href}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div
                          className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {service.name}
                            </h3>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {service.rating}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {service.users}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-green-600">
                                {service.price}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No services found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
