'use client';

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Filter,
  TrendingUp,
  Clock,
  Star,
  ShoppingCart,
  Shield,
  Brain,
  BookOpen,
  Briefcase,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

/**
 * Advanced Search Component - Comprehensive search with filters and suggestions
 * @returns {JSX.Element} The advanced search component
 */
export default function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search data
  const searchData: SearchResult[] = [
    {
      id: 1,
      name: 'GoSellr',
      description: 'Global e-commerce platform with verified sellers',
      category: 'E-Commerce',
      icon: ShoppingCart,
      rating: 4.8,
      price: 'Free',
      tags: ['e-commerce', 'shopping', 'verified sellers'],
      path: '/gosellr',
    },
    {
      id: 2,
      name: 'WMS Healthcare',
      description: 'Online healthcare system with verified doctors',
      category: 'Healthcare',
      icon: Shield,
      rating: 4.9,
      price: 'Premium',
      tags: ['healthcare', 'doctors', 'prescriptions'],
      path: '/wms',
    },
    {
      id: 3,
      name: 'PSS Security',
      description: 'Identity and business verification system',
      category: 'Security',
      icon: Globe,
      rating: 4.7,
      price: 'VIP',
      tags: ['security', 'verification', 'identity'],
      path: '/pss',
    },
    {
      id: 4,
      name: 'OBS Education',
      description: 'Global educational resource hub',
      category: 'Education',
      icon: BookOpen,
      rating: 4.6,
      price: 'Basic',
      tags: ['education', 'books', 'learning'],
      path: '/obs',
    },
    {
      id: 5,
      name: 'JPS Jobs',
      description: 'LinkedIn + Fiverr-style job marketplace',
      category: 'Jobs',
      icon: Briefcase,
      rating: 4.5,
      price: 'Normal',
      tags: ['jobs', 'freelancing', 'hiring'],
      path: '/jps',
    },
    {
      id: 6,
      name: 'AI Marketplace',
      description: 'Advanced AI tools and services',
      category: 'AI Tools',
      icon: Brain,
      rating: 4.8,
      price: 'Premium',
      tags: ['ai', 'machine learning', 'automation'],
      path: '/ai-marketplace',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Sparkles },
    { id: 'E-Commerce', name: 'E-Commerce', icon: ShoppingCart },
    { id: 'Healthcare', name: 'Healthcare', icon: Shield },
    { id: 'Security', name: 'Security', icon: Globe },
    { id: 'Education', name: 'Education', icon: BookOpen },
    { id: 'Jobs', name: 'Jobs', icon: Briefcase },
    { id: 'AI Tools', name: 'AI Tools', icon: Brain },
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'free', name: 'Free' },
    { id: 'basic', name: 'Basic' },
    { id: 'normal', name: 'Normal' },
    { id: 'premium', name: 'Premium' },
    { id: 'vip', name: 'VIP' },
  ];

  const ratingRanges = [
    { id: 'all', name: 'All Ratings' },
    { id: '4.5+', name: '4.5+ Stars' },
    { id: '4.0+', name: '4.0+ Stars' },
    { id: '3.5+', name: '3.5+ Stars' },
  ];

  // Handle search
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const filtered = searchData.filter(item => {
        const matchesQuery =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesPrice = selectedPrice === 'all' || item.price.toLowerCase() === selectedPrice;
        const matchesRating =
          selectedRating === 'all' ||
          (selectedRating === '4.5+' && item.rating >= 4.5) ||
          (selectedRating === '4.0+' && item.rating >= 4.0) ||
          (selectedRating === '3.5+' && item.rating >= 3.5);

        return matchesQuery && matchesCategory && matchesPrice && matchesRating;
      });

      setSearchResults(filtered);
      setIsLoading(false);

      // Add to recent searches
      if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
        setRecentSearches(prev => [searchQuery.trim(), ...prev.slice(0, 4)]);
      }
    }, 500);
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setIsOpen(true);
      handleSearch(value);
    } else {
      setIsOpen(false);
      setSearchResults([]);
    }
  };

  // Handle filter change
  const handleFilterChange = () => {
    if (query.trim()) {
      handleSearch(query);
    }
  };

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={e => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search services, features, or anything..."
          className="w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                setSearchResults([]);
              }}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={e => {
                    setSelectedCategory(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range
                </label>
                <select
                  value={selectedPrice}
                  onChange={e => {
                    setSelectedPrice(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceRanges.map(price => (
                    <option key={price.id} value={price.id}>
                      {price.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating
                </label>
                <select
                  value={selectedRating}
                  onChange={e => {
                    setSelectedRating(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {ratingRanges.map(rating => (
                    <option key={rating.id} value={rating.id}>
                      {rating.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50"
          >
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Searching...</p>
              </div>
            ) : query.trim() ? (
              <div>
                {searchResults.length > 0 ? (
                  <div className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </div>
                    <div className="space-y-3">
                      {searchResults.map(result => (
                        <SearchResultItem
                          key={result.id}
                          result={result}
                          onSelect={() => setIsOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No results found</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      Try adjusting your search terms or filters
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Recent Searches
                    </h3>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleInputChange(search)}
                          className="w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-600 dark:text-gray-400"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['GoSellr', 'WMS', 'AI Tools', 'Healthcare', 'Security'].map(term => (
                      <button
                        key={term}
                        onClick={() => handleInputChange(term)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Search Result Item Component
 */
function SearchResultItem({ result, onSelect }: { result: SearchResult; onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      onClick={onSelect}
    >
      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
        <result.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 dark:text-white">{result.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{result.description}</p>
        <div className="flex items-center space-x-4 mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">{result.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{result.rating}</span>
          </div>
          <span className="text-xs text-blue-600 dark:text-blue-400">{result.price}</span>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400" />
    </motion.div>
  );
}

/**
 * Search Result Interface
 */
interface SearchResult {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  rating: number;
  price: string;
  tags: string[];
  path: string;
}
