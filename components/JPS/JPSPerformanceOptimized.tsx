'use client';

import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Briefcase,
  Calendar,
  BarChart3,
  CreditCard,
  Mail,
  Globe,
  Shield,
  Move,
  PenTool,
  Settings,
  Menu,
  X,
  Home,
  Search,
  Bell,
  User,
  LogOut,
  Loader2,
  Zap,
  TrendingUp,
  Activity,
} from 'lucide-react';

// Roman Urdu: Lazy load components for better performance
const JPSDashboard = lazy(() => import('./JPSDashboard'));
const JobListings = lazy(() => import('./JobListings'));
const CandidateProfiles = lazy(() => import('./CandidateProfiles'));
const InterviewScheduler = lazy(() => import('./InterviewScheduler'));
const JPSAnalytics = lazy(() => import('./JPSAnalytics'));
const PaymentSystem = lazy(() => import('./PaymentSystem'));
const EmailNotification = lazy(() => import('./EmailNotification'));
const MultiLanguageSupport = lazy(() => import('./MultiLanguageSupport'));
const AdvancedSecurity = lazy(() => import('./AdvancedSecurity'));
const DragAndDrop = lazy(() => import('./DragAndDrop'));
const ContentWriting = lazy(() => import('./ContentWriting'));

interface JPSPerformanceOptimizedProps {
  userType: 'jobseeker' | 'employer' | 'admin';
}

// Roman Urdu: Performance monitoring hook
const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    componentLoads: 0,
  });

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      setMetrics(prev => ({
        ...prev,
        renderTime: endTime - startTime,
        componentLoads: prev.componentLoads + 1,
      }));
    };
  }, []);

  return metrics;
};

// Roman Urdu: Loading component with skeleton
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded mb-4"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);

/**
 * Roman Urdu: Performance Optimized JPS System
 * Lazy loading, memoization, aur caching use karta hai
 */
export default function JPSPerformanceOptimized({ userType }: JPSPerformanceOptimizedProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [securityValid, setSecurityValid] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [cache, setCache] = useState<Map<string, any>>(new Map());

  const metrics = usePerformanceMonitor();

  // Roman Urdu: Memoized navigation tabs
  const tabs = useMemo(
    () => [
      { id: 'dashboard', label: 'Dashboard', icon: Home, priority: 'high' },
      { id: 'jobs', label: 'Jobs', icon: Briefcase, priority: 'high' },
      { id: 'candidates', label: 'Candidates', icon: Users, priority: 'high' },
      { id: 'interviews', label: 'Interviews', icon: Calendar, priority: 'medium' },
      { id: 'analytics', label: 'Analytics', icon: BarChart3, priority: 'medium' },
      { id: 'payments', label: 'Payments', icon: CreditCard, priority: 'low' },
      { id: 'notifications', label: 'Notifications', icon: Mail, priority: 'low' },
      { id: 'language', label: 'Language', icon: Globe, priority: 'low' },
      { id: 'security', label: 'Security', icon: Shield, priority: 'medium' },
      { id: 'dragdrop', label: 'Drag & Drop', icon: Move, priority: 'low' },
      { id: 'content', label: 'Content', icon: PenTool, priority: 'low' },
    ],
    []
  );

  // Roman Urdu: Optimized mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      if (isMobileView !== isMobile) {
        setIsMobile(isMobileView);
      }
    };

    checkMobile();
    const debouncedCheck = debounce(checkMobile, 250);
    window.addEventListener('resize', debouncedCheck);

    return () => window.removeEventListener('resize', debouncedCheck);
  }, [isMobile]);

  // Roman Urdu: Debounce utility
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  }, []);

  // Roman Urdu: Cached data fetching
  const fetchCachedData = useCallback(
    async (key: string, fetcher: () => Promise<any>) => {
      if (cache.has(key)) {
        return cache.get(key);
      }

      const data = await fetcher();
      setCache(prev => new Map(prev).set(key, data));
      return data;
    },
    [cache]
  );

  // Roman Urdu: Optimized notifications loading
  useEffect(() => {
    const loadNotifications = async () => {
      const cachedNotifications = await fetchCachedData('notifications', async () => [
        {
          id: 1,
          type: 'interview',
          message: 'New interview scheduled for Senior Developer position',
          recipient: 'ahmed.khan@email.com',
          status: 'success',
        },
        {
          id: 2,
          type: 'placement',
          message: 'Congratulations! You have been placed at TechCorp Solutions',
          recipient: 'sarah.ahmed@email.com',
          status: 'success',
        },
        {
          id: 3,
          type: 'job',
          message: 'New job posting: React Developer at Digital Solutions',
          recipient: 'admin@jps.com',
          status: 'info',
        },
      ]);

      setNotifications(cachedNotifications);
    };

    loadNotifications();
  }, [fetchCachedData]);

  // Roman Urdu: Memoized active component
  const ActiveComponent = useMemo(() => {
    const componentMap: Record<string, React.ComponentType<any>> = {
      dashboard: JPSDashboard,
      jobs: JobListings,
      candidates: CandidateProfiles,
      interviews: InterviewScheduler,
      analytics: JPSAnalytics,
      payments: PaymentSystem,
      notifications: EmailNotification,
      language: MultiLanguageSupport,
      security: AdvancedSecurity,
      dragdrop: DragAndDrop,
      content: ContentWriting,
    };

    const Component = componentMap[activeTab];
    return Component ? (
      <Suspense fallback={<LoadingSkeleton />}>
        <Component
          userType={userType}
          onValidation={setSecurityValid}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />
      </Suspense>
    ) : null;
  }, [activeTab, userType, currentLanguage]);

  // Roman Urdu: Performance mode toggle
  const togglePerformanceMode = useCallback(() => {
    setPerformanceMode(prev => !prev);
    if (performanceMode) {
      // Enable performance optimizations
      document.body.classList.add('performance-mode');
    } else {
      // Disable performance optimizations
      document.body.classList.remove('performance-mode');
    }
  }, [performanceMode]);

  // Roman Urdu: Mobile view optimization
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mobile Optimized View</h2>
            <div className="space-y-4">
              {tabs.slice(0, 6).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Performance Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-lg bg-gray-100 lg:hidden"
            >
              {showSidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">JPS System</h1>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Performance Mode</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Performance Metrics */}
            <div className="hidden md:flex items-center space-x-2 text-xs text-gray-500">
              <Activity className="h-3 w-3" />
              <span>{metrics.renderTime.toFixed(2)}ms</span>
              <TrendingUp className="h-3 w-3" />
              <span>{metrics.componentLoads} loads</span>
            </div>

            <button
              onClick={togglePerformanceMode}
              className={`p-2 rounded-lg ${
                performanceMode ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}
              title="Toggle Performance Mode"
            >
              <Zap className="h-4 w-4" />
            </button>

            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </div>

            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700 capitalize">{userType}</span>
            </div>

            <button className="p-2 text-gray-600 hover:text-gray-900">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Optimized Sidebar */}
        <aside
          className={`bg-white shadow-sm ${showSidebar ? 'block' : 'hidden'} lg:block lg:w-64`}
        >
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map(tab => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.priority === 'low' && (
                    <span className="ml-auto text-xs text-gray-400">Lazy</span>
                  )}
                </motion.button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Optimized Main Content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {ActiveComponent}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Performance Status */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
        <div className="flex items-center space-x-2 text-sm">
          <div
            className={`h-2 w-2 rounded-full ${securityValid ? 'bg-green-500' : 'bg-yellow-500'}`}
          ></div>
          <span className="text-gray-600">
            {securityValid ? 'System Secure' : 'Security Check Required'}
          </span>
          {performanceMode && <Zap className="h-3 w-3 text-green-500 ml-2" />}
        </div>
      </div>
    </div>
  );
}
