'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Mic, Filter, Brain, History, TrendingUp, X, Clock, Star, MapPin, Calendar, Users, DollarSign, ChevronDown } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    rating: '',
    price: '',
    date: '',
    verified: false
  });
  const [searchAnalytics, setSearchAnalytics] = useState({
    totalSearches: 0,
    popularSearches: [],
    recentActivity: []
  });
  
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Sample data for suggestions and results
  const suggestions = [
    'Products', 'Services', 'Doctors', 'Courses', 'Jobs', 'Hotels', 'Restaurants', 'Pharmacy',
    'Online Shopping', 'Medical Consultation', 'Education Programs', 'Career Opportunities',
    'Travel Booking', 'Food Delivery', 'Health Insurance', 'Legal Services'
  ];

  const sampleResults = [
    {
      id: 1,
      title: 'Dr. Ahmed Khan - Cardiologist',
      description: 'Experienced heart specialist with 15+ years of practice',
      module: 'emo',
      rating: 4.9,
      location: 'Lahore',
      price: 'Rs. 2000',
      verified: true,
      image: '👨‍⚕️'
    },
    {
      id: 2,
      title: 'Web Development Course',
      description: 'Complete full-stack web development training',
      module: 'edr',
      rating: 4.7,
      location: 'Online',
      price: 'Rs. 15000',
      verified: true,
      image: '💻'
    },
    {
      id: 3,
      title: 'Premium Organic Products',
      description: 'Fresh organic fruits and vegetables delivery',
      module: 'gosellr',
      rating: 4.8,
      location: 'Karachi',
      price: 'Rs. 500+',
      verified: true,
      image: '🥬'
    }
  ];

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

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    const savedAnalytics = localStorage.getItem('searchAnalytics');
    
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    
    if (savedAnalytics) {
      setSearchAnalytics(JSON.parse(savedAnalytics));
    }
  }, []);

  // Save search history to localStorage
  const saveSearchHistory = (query, module) => {
    const newSearch = {
      id: Date.now(),
      query,
      module,
      timestamp: new Date().toISOString(),
      results: searchResults.length
    };
    
    const updatedHistory = [newSearch, ...searchHistory.slice(0, 9)]; // Keep last 10 searches
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    
    // Update analytics
    const updatedAnalytics = {
      ...searchAnalytics,
      totalSearches: searchAnalytics.totalSearches + 1,
      recentActivity: [newSearch, ...searchAnalytics.recentActivity.slice(0, 4)]
    };
    setSearchAnalytics(updatedAnalytics);
    localStorage.setItem('searchAnalytics', JSON.stringify(updatedAnalytics));
  };

  // Handle search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setShowSuggestions(false);
    
    // Simulate API call
    setTimeout(() => {
      const filteredResults = sampleResults.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (selectedModule !== 'all') {
        const moduleFiltered = filteredResults.filter(item => item.module === selectedModule);
        setSearchResults(moduleFiltered);
      } else {
        setSearchResults(filteredResults);
      }
      
      setIsSearching(false);
      saveSearchHistory(searchQuery, selectedModule);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Auto-complete functionality
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()) && 
    suggestion.toLowerCase() !== searchQuery.toLowerCase()
  );

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setTimeout(() => handleSearch(), 100);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSuggestions(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Voice search functionality
  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setTimeout(() => handleSearch(), 500);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        alert('Voice search error. Please try again.');
      };

      recognition.start();
    } else {
      alert('Voice search is not supported in this browser');
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
          <div className="flex items-center space-x-4">
            <div className="text-xs text-gray-500">
              <TrendingUp className="h-4 w-4 inline mr-1" />
              {searchAnalytics.totalSearches} searches
            </div>
            <div className="text-sm text-gray-500">
              Welcome to EHB Platform
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Advanced Search EHB Services
          </h1>
          <p className="text-xl text-gray-600">
            Find products, services, and information with AI-powered search
          </p>
        </div>

        {/* Advanced Search Bar */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 mb-8 relative">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input with Auto-complete */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search with AI suggestions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                className="w-full pl-12 pr-20 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
              />
              
              {/* Voice Search Button */}
              <button
                onClick={handleVoiceSearch}
                className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Voice search"
              >
                <Mic className="h-4 w-4" />
              </button>

              {/* Clear Search Button */}
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              {/* Auto-complete Suggestions */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 max-h-60 overflow-y-auto z-20"
                >
                  {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
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

            {/* Advanced Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search
                </>
              )}
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Location
                  </label>
                  <select
                    value={selectedFilters.location}
                    onChange={(e) => setSelectedFilters({...selectedFilters, location: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Locations</option>
                    <option value="lahore">Lahore</option>
                    <option value="karachi">Karachi</option>
                    <option value="islamabad">Islamabad</option>
                    <option value="online">Online</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Star className="h-4 w-4 inline mr-1" />
                    Rating
                  </label>
                  <select
                    value={selectedFilters.rating}
                    onChange={(e) => setSelectedFilters({...selectedFilters, rating: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    Price Range
                  </label>
                  <select
                    value={selectedFilters.price}
                    onChange={(e) => setSelectedFilters({...selectedFilters, price: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Price</option>
                    <option value="low">Under Rs. 1000</option>
                    <option value="medium">Rs. 1000 - 5000</option>
                    <option value="high">Rs. 5000+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedFilters.date}
                    onChange={(e) => setSelectedFilters({...selectedFilters, date: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.verified}
                    onChange={(e) => setSelectedFilters({...selectedFilters, verified: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Only show verified providers</span>
                </label>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <span className="text-sm text-gray-600 font-medium">Quick searches:</span>
              {['Products', 'Services', 'Doctors', 'Courses', 'Jobs'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    setTimeout(() => handleSearch(), 100);
                  }}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600 font-medium">
                  <History className="h-4 w-4 inline mr-1" />
                  Recent:
                </span>
                {searchHistory.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSearchQuery(item.query);
                      setSelectedModule(item.module);
                      setTimeout(() => handleSearch(), 100);
                    }}
                    className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm hover:bg-gray-100 transition-colors flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3" />
                    {item.query}
                  </button>
                ))}
                <button
                  onClick={clearHistory}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm hover:bg-red-100 transition-colors"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Search Results ({searchResults.length})
              </h2>
              <div className="text-sm text-gray-500">
                Found in {selectedModule === 'all' ? 'all services' : modules.find(m => m.id === selectedModule)?.name}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {result.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{result.title}</h3>
                        {result.verified && (
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Verified
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{result.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{result.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{result.location}</span>
                        </div>
                        <div className="font-medium text-blue-600">{result.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Analytics */}
        {searchAnalytics.totalSearches > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Search Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{searchAnalytics.totalSearches}</div>
                <div className="text-sm text-gray-600">Total Searches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{searchHistory.length}</div>
                <div className="text-sm text-gray-600">Saved Searches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{searchResults.length}</div>
                <div className="text-sm text-gray-600">Current Results</div>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.slice(1).map((module) => (
            <div
              key={module.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => {
                setSelectedModule(module.id);
                setSearchQuery('');
                setTimeout(() => handleSearch(), 100);
              }}
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
