'use client';

import { useState } from 'react';
import { Search, Mic, Filter, Brain } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');

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
    console.log('Searching:', { searchQuery, selectedModule });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EHB
            </span>
            <span className="text-sm font-medium text-gray-600">
              Education Health Business
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Welcome to EHB Platform
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Search EHB Services
          </h1>
          <p className="text-xl text-gray-600">
            Find products, services, and information across our platform
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
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
                className="w-full pl-12 pr-16 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
              />
              
              {/* Voice Search Button */}
              <button
                onClick={() => alert('Voice search feature')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Voice search"
              >
                <Mic className="h-4 w-4" />
              </button>
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
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600 font-medium">Quick searches:</span>
              {['Products', 'Services', 'Doctors', 'Courses', 'Jobs'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.slice(1).map((module) => (
            <div
              key={module.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {module.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {module.name}
              </h3>
              <p className="text-sm text-gray-600">
                Access {module.name.toLowerCase()} services and features
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
