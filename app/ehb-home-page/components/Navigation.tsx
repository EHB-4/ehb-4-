'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Mic,
  Bell,
  User,
  Settings,
  Globe,
  Brain,
  ShoppingCart,
  Menu,
  X,
} from 'lucide-react';

interface NavigationProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchFocused: boolean;
  setIsSearchFocused: (focused: boolean) => void;
  notifications: number;
  userRole: 'visitor' | 'user' | 'seller' | 'franchise';
  sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
}

/**
 * Modern, glassmorphic navigation bar for EHB Home Page.
 * Includes search, voice, AI help, notifications, cart, and user profile.
 */
const Navigation: React.FC<NavigationProps> = ({
  searchQuery,
  setSearchQuery,
  isSearchFocused,
  setIsSearchFocused,
  notifications,
  userRole,
  sqlLevel,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsVoiceListening(true);
      setTimeout(() => setIsVoiceListening(false), 3000);
    } else {
      alert('Voice search is not supported in this browser');
    }
  };

  const getSqlLevelColor = (level: string) => {
    switch (level) {
      case 'Free':
        return 'bg-gray-500';
      case 'Basic':
        return 'bg-green-500';
      case 'Normal':
        return 'bg-blue-500';
      case 'High':
        return 'bg-purple-500';
      case 'VIP':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-[#18181b]/80 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4 select-none"
          >
            <span className="text-3xl font-extrabold bg-gradient-to-r from-[#2452FF] to-[#8B3DFF] bg-clip-text text-transparent drop-shadow-lg">
              EHB
            </span>
            <span className="text-base font-bold text-gray-700 dark:text-white tracking-wide uppercase">
              | EDUCATION HEALTH BUSINESS (PVT LTD)
            </span>
          </motion.div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search services, people, products, departments..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-full pl-10 pr-20 py-2 rounded-xl border-none bg-white/60 dark:bg-gray-900/60 shadow-inner focus:ring-2 focus:ring-[#2452FF] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                  isSearchFocused ? 'ring-2 ring-[#2452FF]/30' : ''
                }`}
                aria-label="Search"
              />
              {/* Voice Search Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVoiceSearch}
                className={`absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors shadow ${
                  isVoiceListening
                    ? 'bg-red-500 text-white'
                    : 'text-gray-400 hover:text-[#2452FF] hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-label="Voice search"
              >
                <Mic className="h-4 w-4" />
              </motion.button>
              {/* AI Help Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#2452FF] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors shadow"
                aria-label="AI Help"
              >
                <Brain className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              aria-label="Language"
            >
              <Globe className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </motion.button>
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                  {notifications}
                </span>
              )}
            </motion.button>
            {/* Shopping Cart */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-[#2452FF] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                3
              </span>
            </motion.button>
            {/* User Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:outline-none"
                aria-label="User profile"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                <div className="w-9 h-9 bg-gradient-to-br from-[#2452FF] to-[#8B3DFF] rounded-full flex items-center justify-center shadow">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {userRole === 'visitor' ? 'Guest' : userRole}
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full text-white ${getSqlLevelColor(
                      sqlLevel
                    )} shadow`}
                  >
                    {sqlLevel}
                  </div>
                </div>
              </motion.button>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white/90 dark:bg-[#23272f]/95 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50 backdrop-blur-xl"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {userRole === 'visitor' ? 'Guest User' : `${userRole} Account`}
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full text-white inline-block mt-1 ${getSqlLevelColor(
                          sqlLevel
                        )} shadow`}
                      >
                        {sqlLevel} Level
                      </div>
                    </div>
                    {userRole === 'visitor' ? (
                      <>
                        <a
                          href="/login"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        >
                          Sign In
                        </a>
                        <a
                          href="/register"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        >
                          Create Account
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        >
                          My Profile
                        </a>
                        <a
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        >
                          Dashboard
                        </a>
                        <a
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        >
                          Settings
                        </a>
                        <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                          <a
                            href="/logout"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-xl transition-colors"
                          >
                            Sign Out
                          </a>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
