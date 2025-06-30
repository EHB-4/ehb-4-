'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Users,
  Download,
  ShoppingCart,
  Shield,
  Brain,
  BookOpen,
  Briefcase,
  Globe,
  Heart,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

/**
 * EHB Services Marketplace - Comprehensive service discovery and management
 * @returns {JSX.Element} The services marketplace component
 */
export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  // Services data
  const services = [
    {
      id: 1,
      name: 'GoSellr',
      description: 'Global e-commerce platform with verified sellers and franchise-backed delivery',
      category: 'E-Commerce',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      rating: 4.8,
      users: '50K+',
      downloads: '100K+',
      price: 'Free',
      featured: true,
      tags: ['E-commerce', 'Verified Sellers', 'Global Delivery'],
      path: '/gosellr',
    },
    {
      id: 2,
      name: 'WMS',
      description: 'Online + offline verified healthcare system with doctors and prescriptions',
      category: 'Healthcare',
      icon: Shield,
      color: 'bg-green-500',
      rating: 4.9,
      users: '35K+',
      downloads: '75K+',
      price: 'Premium',
      featured: true,
      tags: ['Healthcare', 'Verified Doctors', 'Prescriptions'],
      path: '/wms',
    },
    {
      id: 3,
      name: 'PSS',
      description: 'Identity, business, service, and product verification system',
      category: 'Security',
      icon: Globe,
      color: 'bg-purple-500',
      rating: 4.7,
      users: '25K+',
      downloads: '50K+',
      price: 'VIP',
      featured: true,
      tags: ['Security', 'Identity Verification', 'Business Verification'],
      path: '/pss',
    },
    {
      id: 4,
      name: 'OBS',
      description: 'Global educational resource hub with AI-recommended books and teachers',
      category: 'Education',
      icon: BookOpen,
      color: 'bg-orange-500',
      rating: 4.6,
      users: '20K+',
      downloads: '40K+',
      price: 'Basic',
      featured: false,
      tags: ['Education', 'AI Recommendations', 'Global Resources'],
      path: '/obs',
    },
    {
      id: 5,
      name: 'JPS',
      description: 'LinkedIn + Fiverr-style hybrid for hiring, freelancing, and skill testing',
      category: 'Jobs',
      icon: Briefcase,
      color: 'bg-pink-500',
      rating: 4.5,
      users: '15K+',
      downloads: '30K+',
      price: 'Normal',
      featured: false,
      tags: ['Jobs', 'Freelancing', 'Skill Testing'],
      path: '/jps',
    },
    {
      id: 6,
      name: 'AI Marketplace',
      description: 'Advanced AI tools and services for businesses and individuals',
      category: 'AI Tools',
      icon: Brain,
      color: 'bg-indigo-500',
      rating: 4.8,
      users: '40K+',
      downloads: '80K+',
      price: 'Premium',
      featured: true,
      tags: ['AI', 'Machine Learning', 'Automation'],
      path: '/ai-marketplace',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: Grid3X3, count: services.length },
    { id: 'E-Commerce', name: 'E-Commerce', icon: ShoppingCart, count: 1 },
    { id: 'Healthcare', name: 'Healthcare', icon: Shield, count: 1 },
    { id: 'Security', name: 'Security', icon: Globe, count: 1 },
    { id: 'Education', name: 'Education', icon: BookOpen, count: 1 },
    { id: 'Jobs', name: 'Jobs', icon: Briefcase, count: 1 },
    { id: 'AI Tools', name: 'AI Tools', icon: Brain, count: 1 },
  ];

  // Filter and sort services
  const filteredServices = useMemo(() => {
    const filtered = services.filter(service => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort services
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'users':
        filtered.sort((a, b) => parseInt(b.users) - parseInt(a.users));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Services Marketplace
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover and explore our comprehensive suite of digital services
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex-shrink-0">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="users">Most Users</option>
                <option value="newest">Newest</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex-shrink-0 flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <Link key={service.id} href={service.path}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg transition-all"
                >
                  {service.featured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                      Featured
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {service.rating}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">{service.price}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{service.users}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>{service.downloads}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service, index) => (
              <Link key={service.id} href={service.path}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="flex items-center space-x-6">
                    <div
                      className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {service.name}
                        </h3>
                        {service.featured && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{service.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{service.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{service.users}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{service.downloads}</span>
                        </div>
                        <span className="font-semibold text-blue-600">{service.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No services found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
