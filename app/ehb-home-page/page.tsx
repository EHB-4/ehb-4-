'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, List, ArrowRight, Filter, Brain } from 'lucide-react';
import HeroSlider from './components/HeroSlider';
import Navigation from './components/Navigation';
import ServiceCards from './components/ServiceCards';
import DashboardCards from './components/DashboardCards';
import AIChatbot from './components/AIChatbot';
import Footer from './components/Footer';
import TopServicesNav from './components/TopServicesNav';

/**
 * EHB Home Page - Modern, feature-rich, and responsive landing page for the EHB ecosystem.
 * Includes hero slider, categories, featured services, dashboard, AI marketplace, chatbot, and footer.
 * @returns {JSX.Element}
 */
const EHBHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [notifications] = useState(5);
  const [userRole] = useState<'visitor' | 'user' | 'seller' | 'franchise'>('visitor');
  const [sqlLevel] = useState<'Free' | 'Basic' | 'Normal' | 'High' | 'VIP'>('Free');

  // Sample data for services
  const services = [
    {
      id: 1,
      name: 'GoSellr',
      description: 'Global e-commerce platform with verified sellers and franchise-backed delivery',
      icon: 'ShoppingCart',
      color: 'bg-blue-500',
      sqlLevel: 'Normal',
      rating: 4.8,
      downloads: '50K+',
      category: 'E-Commerce',
      featured: true,
      path: '/gosellr',
    },
    {
      id: 2,
      name: 'WMS',
      description: 'Online + offline verified healthcare system with doctors and prescriptions',
      icon: 'Shield',
      color: 'bg-green-500',
      sqlLevel: 'High',
      rating: 4.9,
      downloads: '35K+',
      category: 'Healthcare',
      featured: true,
      path: '/wms',
    },
    {
      id: 3,
      name: 'PSS',
      description: 'Identity, business, service, and product verification system',
      icon: 'Award',
      color: 'bg-purple-500',
      sqlLevel: 'VIP',
      rating: 4.7,
      downloads: '25K+',
      category: 'Security',
      featured: true,
      path: '/pss',
    },
    {
      id: 4,
      name: 'OBS',
      description: 'Global educational resource hub with AI-recommended books and teachers',
      icon: 'BookOpen',
      color: 'bg-orange-500',
      sqlLevel: 'Basic',
      rating: 4.6,
      downloads: '20K+',
      category: 'Education',
      featured: false,
      path: '/obs',
    },
    {
      id: 5,
      name: 'JPS',
      description: 'LinkedIn + Fiverr-style hybrid for hiring, freelancing, and skill testing',
      icon: 'Briefcase',
      color: 'bg-pink-500',
      sqlLevel: 'Normal',
      rating: 4.5,
      downloads: '15K+',
      category: 'Jobs',
      featured: false,
      path: '/jps',
    },
    {
      id: 6,
      name: 'Roadmap Agent',
      description: 'AI-powered roadmap management and project tracking for EHB ecosystem.',
      icon: 'Brain',
      color: 'bg-indigo-500',
      sqlLevel: 'High',
      rating: 4.9,
      downloads: '10K+',
      category: 'AI Tools',
      featured: true,
      path: '/roadmap-agent',
    },
  ];

  const categories = [
    { name: 'E-Commerce', icon: '🛍️', color: 'bg-blue-500', count: 45 },
    { name: 'Healthcare', icon: '🏥', color: 'bg-green-500', count: 32 },
    { name: 'Security', icon: '🛡️', color: 'bg-purple-500', count: 28 },
    { name: 'Education', icon: '📚', color: 'bg-orange-500', count: 23 },
    { name: 'Jobs', icon: '💼', color: 'bg-pink-500', count: 19 },
    { name: 'AI Tools', icon: '🤖', color: 'bg-indigo-500', count: 41 },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f5f7fa] via-[#e3e8f0] to-[#f8fafc] dark:from-[#18181b] dark:to-[#23272f]">
      {/* Navigation */}
      <Navigation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        notifications={notifications}
        userRole={userRole}
        sqlLevel={sqlLevel}
      />
      {/* Top Services Navigation Bar */}
      <TopServicesNav />
      {/* Main Content */}
      <main className="w-full px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 py-8">
        {/* Hero Slider */}
        <section className="mb-12">
          <HeroSlider />
        </section>

        {/* Dashboard */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">Store Overview</h2>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#2452FF] text-white'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#2452FF] text-white'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
          <DashboardCards userRole={userRole} sqlLevel={sqlLevel} />
        </section>

        {/* Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">Categories</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-[#2452FF] hover:text-[#8B3DFF] font-semibold"
              aria-label="Browse all categories"
            >
              <span>Browse all</span>
              <Filter className="h-4 w-4" />
            </motion.button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08, y: -6 }}
                className={`${category.color} p-6 rounded-2xl text-white text-center cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-md bg-opacity-80`}
                tabIndex={0}
                aria-label={category.name}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold mb-1 text-lg">{category.name}</div>
                <div className="text-sm opacity-80">{category.count} services</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Services */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">
                Featured Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Hand-picked by our team</p>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/marketplace"
              className="flex items-center space-x-1 text-[#2452FF] hover:text-[#8B3DFF] font-semibold transition-colors"
              aria-label="View all services"
            >
              <span>View all</span>
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
          <ServiceCards services={services} viewMode={viewMode} />
        </section>

        {/* AI Marketplace Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#2452FF] via-[#8B3DFF] to-[#F8B400] rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10 pointer-events-none" />
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Brain className="h-4 w-4" />
                <span>AI-Powered Marketplace</span>
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
                Discover AI-Enhanced Services
              </h2>
              <p className="text-xl mb-8 opacity-90 drop-shadow">
                Experience the future with our AI-powered marketplace featuring verified services
                and intelligent recommendations.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/ai-marketplace"
                className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-colors backdrop-blur-md"
                aria-label="Explore AI Marketplace"
              >
                <span>Explore Now</span>
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </section>
      </main>

      {/* Floating AI Chatbot */}
      <AIChatbot />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EHBHomePage;
