'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BellIcon,
  CheckIcon,
  XIcon,
  TrashIcon,
  FilterIcon,
  SearchIcon,
  EyeIcon,
  EyeOffIcon,
  StarIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';

// ========================================
// 1. NOTIFICATIONS PAGE
// ========================================

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  // ========================================
  // 2. COMPONENT INITIALIZATION
  // ========================================

  useEffect(() => {
    loadNotifications();
  }, []);

  // ========================================
  // 3. DATA LOADING FUNCTIONS
  // ========================================

  const loadNotifications = async () => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockNotifications: Notification[] = [
        {
          id: 'notif-1',
          type: 'order',
          title: 'New Order Received',
          message: 'Order #ORD-2024-001 from Alice Johnson for $299.99',
          timestamp: new Date('2024-01-15T10:30:00'),
          read: false,
          priority: 'high',
          actionUrl: '/gosellr/orders/ORD-2024-001',
          metadata: {
            orderId: 'ORD-2024-001',
            amount: 299.99,
            customerName: 'Alice Johnson',
          },
        },
        {
          id: 'notif-2',
          type: 'stock',
          title: 'Low Stock Alert',
          message: 'Wireless Headphones is running low on stock (2 remaining)',
          timestamp: new Date('2024-01-15T09:15:00'),
          read: false,
          priority: 'medium',
          actionUrl: '/gosellr/my-products',
          metadata: {
            productId: 'prod-1',
            productName: 'Wireless Headphones',
            currentStock: 2,
          },
        },
        {
          id: 'notif-3',
          type: 'payment',
          title: 'Payment Received',
          message: 'Payment of $199.99 received for Order #ORD-2024-002',
          timestamp: new Date('2024-01-15T08:45:00'),
          read: true,
          priority: 'low',
          actionUrl: '/gosellr/orders/ORD-2024-002',
          metadata: {
            orderId: 'ORD-2024-002',
            amount: 199.99,
            paymentMethod: 'Credit Card',
          },
        },
        {
          id: 'notif-4',
          type: 'shipping',
          title: 'Order Shipped',
          message: 'Order #ORD-2024-003 has been shipped via FedEx',
          timestamp: new Date('2024-01-15T07:20:00'),
          read: true,
          priority: 'medium',
          actionUrl: '/gosellr/orders/ORD-2024-003',
          metadata: {
            orderId: 'ORD-2024-003',
            trackingNumber: 'FX123456789',
            carrier: 'FedEx',
          },
        },
        {
          id: 'notif-5',
          type: 'review',
          title: 'New Product Review',
          message: '5-star review received for Smart Fitness Watch',
          timestamp: new Date('2024-01-15T06:30:00'),
          read: false,
          priority: 'low',
          actionUrl: '/gosellr/reviews',
          metadata: {
            productId: 'prod-2',
            productName: 'Smart Fitness Watch',
            rating: 5,
            reviewId: 'review-123',
          },
        },
        {
          id: 'notif-6',
          type: 'security',
          title: 'Login from New Device',
          message: 'New login detected from IP 192.168.1.100',
          timestamp: new Date('2024-01-15T05:45:00'),
          read: false,
          priority: 'high',
          actionUrl: '/gosellr/settings',
          metadata: {
            ipAddress: '192.168.1.100',
            location: 'New York, NY',
            device: 'Chrome on Windows',
          },
        },
        {
          id: 'notif-7',
          type: 'kyc',
          title: 'KYC Verification Approved',
          message: 'Your identity verification has been approved',
          timestamp: new Date('2024-01-14T16:20:00'),
          read: true,
          priority: 'medium',
          actionUrl: '/gosellr/settings',
          metadata: {
            verificationType: 'Enhanced KYC',
            approvedAt: new Date('2024-01-14T16:20:00'),
          },
        },
        {
          id: 'notif-8',
          type: 'dispute',
          title: 'Dispute Filed',
          message: 'Dispute filed for Order #ORD-2024-004',
          timestamp: new Date('2024-01-14T14:10:00'),
          read: false,
          priority: 'high',
          actionUrl: '/gosellr/orders/ORD-2024-004',
          metadata: {
            orderId: 'ORD-2024-004',
            disputeReason: 'Item not as described',
            customerName: 'Bob Smith',
          },
        },
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 4. UTILITY FUNCTIONS
  // ========================================

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return ShoppingCartIcon;
      case 'payment':
        return CreditCardIcon;
      case 'shipping':
        return TruckIcon;
      case 'stock':
        return ExclamationTriangleIcon;
      case 'review':
        return StarIcon;
      case 'security':
        return ShieldCheckIcon;
      case 'kyc':
        return UserIcon;
      case 'dispute':
        return ExclamationTriangleIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;

    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter(notification => notification.type === filter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        notification =>
          notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return filtered;
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const deleteSelected = () => {
    setNotifications(prev =>
      prev.filter(notification => !selectedNotifications.includes(notification.id))
    );
    setSelectedNotifications([]);
  };

  const toggleSelection = (notificationId: string) => {
    setSelectedNotifications(prev =>
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  // ========================================
  // 5. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/gosellr" className="text-blue-600 hover:text-blue-700">
                ← Back to GoSellr
              </Link>
              <div className="ml-8">
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-sm text-gray-500">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {selectedNotifications.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span>Delete Selected</span>
                </button>
              )}
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <CheckIcon className="h-4 w-4" />
                <span>Mark All Read</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FilterIcon className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="order">Orders</option>
                  <option value="payment">Payments</option>
                  <option value="shipping">Shipping</option>
                  <option value="stock">Stock Alerts</option>
                  <option value="review">Reviews</option>
                  <option value="security">Security</option>
                  <option value="kyc">KYC</option>
                  <option value="dispute">Disputes</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filter === 'all'}
                      onChange={() => setFilter('all')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">All</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filter === 'unread'}
                      onChange={() => setFilter('unread')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Unread</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <BellIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map(notification => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
                    !notification.read ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => toggleSelection(notification.id)}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-medium text-gray-900">
                              {notification.title}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)}`}
                            >
                              {notification.priority}
                            </span>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{formatDate(notification.timestamp)}</span>
                            </div>
                            <span>•</span>
                            <span className="capitalize">{notification.type}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {notification.actionUrl && (
                            <Link
                              href={notification.actionUrl}
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-gray-400 hover:text-blue-600"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Link>
                          )}
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gray-400 hover:text-green-600"
                          >
                            {notification.read ? (
                              <EyeOffIcon className="h-4 w-4" />
                            ) : (
                              <CheckIcon className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-gray-400 hover:text-red-600"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ========================================
// 6. TYPES
// ========================================

interface Notification {
  id: string;
  type: 'order' | 'payment' | 'shipping' | 'stock' | 'review' | 'security' | 'kyc' | 'dispute';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
  metadata?: Record<string, any>;
}
