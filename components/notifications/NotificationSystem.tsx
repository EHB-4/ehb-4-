"use client";

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  Check,
  AlertTriangle,
  Info,
  Mail,
  ShoppingCart,
  Shield,
  Brain,
  BookOpen,
  Briefcase,
  Globe,
  Settings,
  User,
} from 'lucide-react';

/**
 * Notification System Component - Comprehensive notification management
 * @returns {JSX.Element} The notification system component
 */
export default function NotificationSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data
  const mockNotifications: NotificationItem[] = [
    {
      id: 1,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your payment of $99.99 has been processed successfully.',
      service: 'GoSellr',
      time: '2 minutes ago',
      read: false,
      icon: ShoppingCart,
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Available',
      message: 'AI-powered recommendations are now available in WMS.',
      service: 'WMS',
      time: '5 minutes ago',
      read: false,
      icon: Brain,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Security Alert',
      message: 'Unusual login attempt detected from a new device.',
      service: 'PSS',
      time: '10 minutes ago',
      read: false,
      icon: Shield,
    },
    {
      id: 4,
      type: 'success',
      title: 'Course Completed',
      message: 'Congratulations! You have completed the Advanced JavaScript course.',
      service: 'OBS',
      time: '1 hour ago',
      read: true,
      icon: BookOpen,
    },
    {
      id: 5,
      type: 'info',
      title: 'Job Application Update',
      message: 'Your application for Senior Developer position has been reviewed.',
      service: 'JPS',
      time: '2 hours ago',
      read: true,
      icon: Briefcase,
    },
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id: number) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return Check;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return AlertTriangle;
      case 'info':
        return Info;
      default:
        return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'info':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'GoSellr':
        return ShoppingCart;
      case 'WMS':
        return Shield;
      case 'PSS':
        return Globe;
      case 'OBS':
        return BookOpen;
      case 'JPS':
        return Briefcase;
      default:
        return Settings;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map(notification => {
                    const NotificationIcon = getNotificationIcon(notification.type);
                    const ServiceIcon = getServiceIcon(notification.service);
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Service Icon */}
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <ServiceIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <div
                                className={`w-2 h-2 rounded-full ${getNotificationColor(
                                  notification.type
                                )}`}
                              />
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {notification.time}
                              </span>
                              <div className="flex items-center space-x-1">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                  >
                                    <Check className="w-3 h-3" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/notifications"
                  className="block text-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View all notifications
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Notification Item Interface
 */
interface NotificationItem {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  service: string;
  time: string;
  read: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Toast Notification Component
 * @param {Object} props - Component props
 * @returns {JSX.Element} The toast notification component
 */
export function ToastNotification({
  type = 'info',
  title,
  message,
  onClose,
}: {
  type?: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  onClose: () => void;
}) {
  const NotificationIcon = getNotificationIcon(type);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className={`fixed top-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50`}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${getNotificationColor(
            type
          )}`}
        >
          <NotificationIcon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'success':
      return Check;
    case 'warning':
      return AlertTriangle;
    case 'error':
      return AlertTriangle;
    case 'info':
      return Info;
    default:
      return Info;
  }
}

function getNotificationColor(type: string) {
  switch (type) {
    case 'success':
      return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    case 'warning':
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    case 'error':
      return 'text-red-600 bg-red-100 dark:bg-red-900/20';
    case 'info':
      return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  }
}
