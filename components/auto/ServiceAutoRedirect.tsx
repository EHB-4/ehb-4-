'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  ExternalLink,
  Home,
  Settings,
} from 'lucide-react';
import {
  getAutoRedirectService,
  getServiceById,
  getServiceByPath,
  EHB_SERVICE_ROUTES,
  type ServiceRoute,
} from '@/lib/utils/serviceRoutes';

interface ServiceAutoRedirectProps {
  agentActivity?: string;
  currentPath?: string;
  autoRedirect?: boolean;
  showNotification?: boolean;
  onServiceSelect?: (service: ServiceRoute) => void;
}

/**
 * Smart Auto-Redirect Component
 * Automatically detects and redirects to relevant service pages based on agent activity
 */
export default function ServiceAutoRedirect({
  agentActivity,
  currentPath = '/',
  autoRedirect = true,
  showNotification = true,
  onServiceSelect,
}: ServiceAutoRedirectProps) {
  const router = useRouter();
  const [detectedService, setDetectedService] = useState<ServiceRoute | null>(null);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Detect service based on agent activity
  useEffect(() => {
    if (agentActivity) {
      const service = getAutoRedirectService(agentActivity);
      if (service && service.path !== currentPath) {
        setDetectedService(service);
        if (showNotification) {
          setShowNotificationPanel(true);
        }
        if (autoRedirect) {
          startRedirectCountdown(service);
        }
      }
    }
  }, [agentActivity, currentPath, autoRedirect, showNotification]);

  // Countdown for auto-redirect
  const startRedirectCountdown = (service: ServiceRoute) => {
    setRedirectCountdown(5);
    const interval = setInterval(() => {
      setRedirectCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          redirectToService(service);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Redirect to service
  const redirectToService = (service: ServiceRoute) => {
    setIsRedirecting(true);
    onServiceSelect?.(service);

    // Add a small delay for smooth transition
    setTimeout(() => {
      router.push(service.path);
    }, 500);
  };

  // Manual redirect
  const handleManualRedirect = () => {
    if (detectedService) {
      redirectToService(detectedService);
    }
  };

  // Cancel redirect
  const handleCancelRedirect = () => {
    setShowNotificationPanel(false);
    setDetectedService(null);
    setRedirectCountdown(5);
  };

  // Get current service info
  const currentService = getServiceByPath(currentPath);

  // Get service icon component
  const getServiceIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      Briefcase: (
        <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white">
          J
        </div>
      ),
      Building: (
        <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-white">
          F
        </div>
      ),
      Shield: (
        <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center text-white">
          W
        </div>
      ),
      BookOpen: (
        <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white">
          O
        </div>
      ),
      Globe: (
        <div className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
          A
        </div>
      ),
      Wallet: (
        <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
          $
        </div>
      ),
      Coins: (
        <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center text-white">
          T
        </div>
      ),
      Brain: (
        <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white">
          AI
        </div>
      ),
      Settings: (
        <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-white">
          M
        </div>
      ),
      Crown: (
        <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center text-white">
          A
        </div>
      ),
      BarChart3: (
        <div className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
          📊
        </div>
      ),
      Bot: (
        <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white">
          🤖
        </div>
      ),
      Home: (
        <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white">
          🏠
        </div>
      ),
      Code: (
        <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center text-white">
          💻
        </div>
      ),
      Route: (
        <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white">
          🗺️
        </div>
      ),
      Sparkles: (
        <div className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
          ✨
        </div>
      ),
    };
    return (
      iconMap[iconName] || (
        <div className="w-6 h-6 bg-gray-500 rounded-lg flex items-center justify-center text-white">
          ?
        </div>
      )
    );
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'working':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'under-dev':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <>
      {/* Auto-Redirect Notification Panel */}
      <AnimatePresence>
        {showNotificationPanel && detectedService && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 right-4 z-50 max-w-sm w-full"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">{getServiceIcon(detectedService.icon)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {detectedService.name}
                    </h3>
                    <button
                      onClick={handleCancelRedirect}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {detectedService.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(detectedService.status)}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {detectedService.progress}% Complete
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {autoRedirect && (
                        <span className="text-xs text-blue-600 dark:text-blue-400">
                          Redirecting in {redirectCountdown}s
                        </span>
                      )}

                      <button
                        onClick={handleManualRedirect}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        {autoRedirect ? 'Go Now' : 'Open Service'}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Service Indicator */}
      {currentService && (
        <div className="fixed bottom-4 left-4 z-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">{getServiceIcon(currentService.icon)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {currentService.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {currentService.fullName}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1">
                    {getStatusIcon(currentService.status)}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {currentService.progress}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Loading Overlay */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Redirecting to {detectedService?.name}...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Service Quick Access Component
 * Shows all available services for quick navigation
 */
export function ServiceQuickAccess() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = EHB_SERVICE_ROUTES.filter(service => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'Core Services', name: 'Core Services' },
    { id: 'In Progress', name: 'In Progress' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Service Access
        </h3>
        <button
          onClick={() => router.push('/services')}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View All
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
        {filteredServices.slice(0, 8).map(service => (
          <button
            key={service.id}
            onClick={() => router.push(service.path)}
            className="flex items-center space-x-2 p-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex-shrink-0">{getServiceIcon(service.icon)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {service.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {service.progress}% Complete
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  function getServiceIcon(iconName: string) {
    const iconMap: { [key: string]: React.ReactNode } = {
      Briefcase: (
        <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
          J
        </div>
      ),
      Building: (
        <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center text-white text-xs">
          F
        </div>
      ),
      Shield: (
        <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center text-white text-xs">
          W
        </div>
      ),
      BookOpen: (
        <div className="w-4 h-4 bg-purple-500 rounded flex items-center justify-center text-white text-xs">
          O
        </div>
      ),
      Globe: (
        <div className="w-4 h-4 bg-indigo-500 rounded flex items-center justify-center text-white text-xs">
          A
        </div>
      ),
      Wallet: (
        <div className="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center text-white text-xs">
          $
        </div>
      ),
      Coins: (
        <div className="w-4 h-4 bg-yellow-500 rounded flex items-center justify-center text-white text-xs">
          T
        </div>
      ),
      Brain: (
        <div className="w-4 h-4 bg-purple-500 rounded flex items-center justify-center text-white text-xs">
          AI
        </div>
      ),
      Settings: (
        <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center text-white text-xs">
          M
        </div>
      ),
      Crown: (
        <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center text-white text-xs">
          A
        </div>
      ),
      BarChart3: (
        <div className="w-4 h-4 bg-indigo-500 rounded flex items-center justify-center text-white text-xs">
          📊
        </div>
      ),
      Bot: (
        <div className="w-4 h-4 bg-purple-500 rounded flex items-center justify-center text-white text-xs">
          🤖
        </div>
      ),
      Home: (
        <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
          🏠
        </div>
      ),
      Code: (
        <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center text-white text-xs">
          💻
        </div>
      ),
      Route: (
        <div className="w-4 h-4 bg-purple-500 rounded flex items-center justify-center text-white text-xs">
          🗺️
        </div>
      ),
      Sparkles: (
        <div className="w-4 h-4 bg-indigo-500 rounded flex items-center justify-center text-white text-xs">
          ✨
        </div>
      ),
    };
    return (
      iconMap[iconName] || (
        <div className="w-4 h-4 bg-gray-500 rounded flex items-center justify-center text-white text-xs">
          ?
        </div>
      )
    );
  }
}
