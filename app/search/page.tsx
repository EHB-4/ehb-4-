"use client";

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  TrendingUp,
  Clock,
  Star,
  Users,
  ArrowRight,
  MapPin,
  Tag,
  Calendar,
  Eye,
  Heart,
  Share2,
  Download,
  Bookmark,
} from 'lucide-react';
import Link from 'next/link';

/**
 * EHB Search Page - Advanced search with filters, suggestions, and real-time results
 * @returns {JSX.Element} The search page component
 */
export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    type: 'all',
    rating: 'all',
    price: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]);

  // Mock data for search results
  const searchData = [
    {
      id: 1,
      title: 'GoSellr E-commerce Platform',
      type: 'service',
      category: 'e-commerce',
      description: 'Global e-commerce platform with verified sellers and secure transactions',
      url: '/gosellr',
      rating: 4.8,
      users: '12.5K',
      price: 'Free',
      tags: ['e-commerce', 'shopping', 'verified sellers'],
      lastUpdated: '2024-01-15',
      views: '45.2K',
    },
    {
      id: 2,
      title: 'WMS Healthcare System',
      type: 'service',
      category: 'healthcare',
      description: 'Healthcare system with verified doctors and medical services',
      url: '/wms',
      rating: 4.9,
      users: '8.2K',
      price: 'Free',
      tags: ['healthcare', 'medical', 'doctors'],
      lastUpdated: '2024-01-10',
      views: '32.1K',
    },
    {
      id: 3,
      title: 'AI Marketplace Tools',
      type: 'service',
      category: 'ai',
      description: 'Advanced AI tools and services for businesses and individuals',
      url: '/ai-marketplace',
      rating: 4.7,
      users: '15.3K',
      price: 'Free',
      tags: ['ai', 'machine learning', 'automation'],
      lastUpdated: '2024-01-12',
      views: '67.8K',
    },
    {
      id: 4,
      title: 'PSS Identity Verification',
      type: 'service',
      category: 'security',
      description: 'Identity and business verification services',
      url: '/pss',
      rating: 4.6,
      users: '5.1K',
      price: 'Free',
      tags: ['security', 'verification', 'identity'],
      lastUpdated: '2024-01-08',
      views: '23.4K',
    },
    {
      id: 5,
      title: 'OBS Learning Management',
      type: 'service',
      category: 'education',
      description: 'Educational resources and learning management system',
      url: '/obs',
      rating: 4.5,
      users: '3.8K',
      price: 'Free',
      tags: ['education', 'learning', 'courses'],
      lastUpdated: '2024-01-14',
      views: '18.9K',
    },
    {
      id: 6,
      title: 'JPS Job Marketplace',
      type: 'service',
      category: 'jobs',
      description: 'Job marketplace connecting employers and job seekers',
      url: '/jps',
      rating: 4.4,
      users: '7.2K',
      price: 'Free',
      tags: ['jobs', 'careers', 'employment'],
      lastUpdated: '2024-01-11',
      views: '29.7K',
    },
    {
      id: 7,
      title: 'EMO AI Emotional Intelligence',
      type: 'service',
      category: 'ai',
      description: 'AI-powered emotional intelligence tools',
      url: '/emo',
      rating: 4.3,
      users: '2.1K',
      price: 'Free',
      tags: ['ai', 'emotional intelligence', 'psychology'],
      lastUpdated: '2024-01-09',
      views: '12.3K',
    },
    {
      id: 8,
      title: 'HPS Healthcare Provider Services',
      type: 'service',
      category: 'healthcare',
      description: 'Healthcare provider services and management',
      url: '/hps',
      rating: 4.2,
      users: '1.8K',
      price: 'Free',
      tags: ['healthcare', 'providers', 'management'],
      lastUpdated: '2024-01-13',
      views: '9.6K',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: searchData.length },
    {
      id: 'e-commerce',
      name: 'E-Commerce',
      count: searchData.filter(item => item.category === 'e-commerce').length,
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      count: searchData.filter(item => item.category === 'healthcare').length,
    },
    { id: 'ai', name: 'AI & ML', count: searchData.filter(item => item.category === 'ai').length },
    {
      id: 'security',
      name: 'Security',
      count: searchData.filter(item => item.category === 'security').length,
    },
    {
      id: 'education',
      name: 'Education',
      count: searchData.filter(item => item.category === 'education').length,
    },
    { id: 'jobs', name: 'Jobs', count: searchData.filter(item => item.category === 'jobs').length },
  ];

  const types = [
    { id: 'all', name: 'All Types', count: searchData.length },
    {
      id: 'service',
      name: 'Services',
      count: searchData.filter(item => item.type === 'service').length,
    },
    { id: 'product', name: 'Products', count: 0 },
    { id: 'article', name: 'Articles', count: 0 },
  ];

  const ratings = [
    { id: 'all', name: 'All Ratings' },
    { id: '4.5+', name: '4.5+ Stars' },
    { id: '4.0+', name: '4.0+ Stars' },
    { id: '3.5+', name: '3.5+ Stars' },
  ];

  const prices = [
    { id: 'all', name: 'All Prices' },
    { id: 'free', name: 'Free' },
    { id: 'paid', name: 'Paid' },
    { id: 'freemium', name: 'Freemium' },
  ];

  // Mock trending searches
  useEffect(() => {
    setTrendingSearches([
      'GoSellr e-commerce',
      'AI tools',
      'Healthcare services',
      'Job opportunities',
      'Security verification',
      'Learning platforms',
    ]);
  }, []);

  // Filter search results
  const filteredResults = useMemo(() => {
    let results = searchData;

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filters
    if (selectedFilters.category !== 'all') {
      results = results.filter(item => item.category === selectedFilters.category);
    }

    if (selectedFilters.type !== 'all') {
      results = results.filter(item => item.type === selectedFilters.type);
    }

    if (selectedFilters.rating !== 'all') {
      const minRating = parseFloat(selectedFilters.rating);
      results = results.filter(item => item.rating >= minRating);
    }

    if (selectedFilters.price !== 'all') {
      results = results.filter(item => item.price.toLowerCase() === selectedFilters.price);
    }

    return results;
  }, [searchQuery, selectedFilters]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    // Add to recent searches
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }

    // Simulate search delay
    setTimeout(() => setIsSearching(false), 500);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSelectedFilters({
      category: 'all',
      type: 'all',
      rating: 'all',
      price: 'all',
    });
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedFilters({
      category: 'all',
      type: 'all',
      rating: 'all',
      price: 'all',
    });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(filter => filter !== 'all');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search EHB services, products, and more..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="w-full pl-12 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-4 rounded-xl border transition-colors ${
                  showFilters
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                {Object.entries(selectedFilters).map(([key, value]) => {
                  if (value === 'all') return null;
                  const filterName =
                    key === 'category'
                      ? 'Category'
                      : key === 'type'
                      ? 'Type'
                      : key === 'rating'
                      ? 'Rating'
                      : 'Price';
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {filterName}: {value}
                      <button
                        onClick={() => setSelectedFilters(prev => ({ ...prev, [key]: 'all' }))}
                        className="ml-1 hover:text-blue-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-64 flex-shrink-0"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Filters
                  </h3>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Category
                    </h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={selectedFilters.category === category.id}
                            onChange={e =>
                              setSelectedFilters(prev => ({ ...prev, category: e.target.value }))
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {category.name} ({category.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Type</h4>
                    <div className="space-y-2">
                      {types.map(type => (
                        <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value={type.id}
                            checked={selectedFilters.type === type.id}
                            onChange={e =>
                              setSelectedFilters(prev => ({ ...prev, type: e.target.value }))
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {type.name} ({type.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Rating
                    </h4>
                    <div className="space-y-2">
                      {ratings.map(rating => (
                        <label key={rating.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            value={rating.id}
                            checked={selectedFilters.rating === rating.id}
                            onChange={e =>
                              setSelectedFilters(prev => ({ ...prev, rating: e.target.value }))
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {rating.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Price
                    </h4>
                    <div className="space-y-2">
                      {prices.map(price => (
                        <label key={price.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price"
                            value={price.id}
                            checked={selectedFilters.price === price.id}
                            onChange={e =>
                              setSelectedFilters(prev => ({ ...prev, price: e.target.value }))
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {price.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Suggestions */}
            {!searchQuery && (
              <div className="mb-8">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchQuery && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Search Results
                    {isSearching ? (
                      <span className="text-lg font-normal text-gray-500 ml-2">Searching...</span>
                    ) : (
                      <span className="text-lg font-normal text-gray-500 ml-2">
                        ({filteredResults.length} results)
                      </span>
                    )}
                  </h2>
                </div>

                {/* Results List */}
                <div className="space-y-4">
                  {filteredResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={result.url}>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                  {result.title}
                                </h3>
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                                  {result.type}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {result.description}
                              </p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {result.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              {/* Meta Information */}
                              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span>{result.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{result.users} users</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{result.views} views</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>Updated {result.lastUpdated}</span>
                                </div>
                                <span className="font-medium text-green-600">{result.price}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 ml-4">
                              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <Heart className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <Bookmark className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <Share2 className="w-4 h-4" />
                              </button>
                              <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* No Results */}
                {filteredResults.length === 0 && !isSearching && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No results found for "{searchQuery}"
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                    <button
                      onClick={clearSearch}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
