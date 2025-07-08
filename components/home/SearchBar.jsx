'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, Filter, X } from 'lucide-react';

export default function SearchBar({ onSearch, className = '' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const modules = [
    { id: 'all', name: 'All Services', icon: '🔍' },
    { id: 'gosellr', name: 'GoSellr', icon: '🛍️' },
    { id: 'edr', name: 'Education', icon: '📚' },
    { id: 'emo', name: 'Health', icon: '🏥' },
    { id: 'jps', name: 'Justice', icon: '⚖️' },
    { id: 'pss', name: 'Safety', icon: '🛡️' },
    { id: 'agts', name: 'Travel', icon: '✈️' },
    { id: 'wms', name: 'Warehouse', icon: '📦' },
  ];

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ query: searchQuery, module: selectedModule });
    } else {
      console.log('Searching:', { searchQuery, selectedModule });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      console.log('Voice search activated');
      // Voice search implementation would go here
    } else {
      alert('Voice search is not supported in this browser');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsExpanded(false);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 transition-all duration-300"
      >
        {/* Main Search Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search services, products, or information..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsExpanded(true)}
              className="w-full pl-12 pr-16 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
            />
            
            {/* Voice Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Voice search"
            >
              <Mic className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Module Filter */}
          <div className="w-full md:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 appearance-none cursor-pointer"
              >
                {modules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.icon} {module.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </motion.button>
        </div>

        {/* Quick Actions - Show when expanded */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 font-medium">Quick searches:</span>
              {['Products', 'Services', 'Doctors', 'Courses', 'Jobs'].map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
                >
                  {tag}
                </motion.button>
              ))}
              {searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearSearch}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm hover:bg-red-100 transition-colors flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Clear
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
