'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CogIcon,
  BellIcon,
  WalletIcon,
  StarIcon,
  TrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PackageIcon,
  TruckIcon,
  ClockIcon,
  CheckCircleIcon as CheckIcon,
  XCircleIcon,
  AlertCircleIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { GoSellrProduct, GoSellrOrder, GoSellrAnalytics } from '@/types/gosellr';

// ========================================
// 1. VENDOR DASHBOARD COMPONENT
// ========================================

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<GoSellrAnalytics | null>(null);
  const [recentOrders, setRecentOrders] = useState<GoSellrOrder[]>([]);
  const [recentProducts, setRecentProducts] = useState<GoSellrProduct[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ========================================
  // 2. COMPONENT INITIALIZATION
  // ========================================

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      setLoading(true);

      // Load user data
      const userData = await loadUserData();
      setUser(userData);

      // Load dashboard stats
      const statsData = await loadDashboardStats();
      setStats(statsData);

      // Load recent data
      const ordersData = await loadRecentOrders();
      setRecentOrders(ordersData);

      const productsData = await loadRecentProducts();
      setRecentProducts(productsData);

      const notificationsData = await loadNotifications();
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error initializing dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 3. DATA LOADING FUNCTIONS
  // ========================================

  const loadUserData = async () => {
    return {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/api/placeholder/40/40',
      kycVerified: true,
      trustScore: 85,
      walletBalance: 1250.5,
      isSeller: true,
      sellerInfo: {
        businessName: "John's Tech Store",
        businessType: 'individual',
        verified: true,
        rating: 4.8,
        totalSales: 45600,
        totalProducts: 45,
        sellerSince: new Date('2023-01-15'),
      },
    };
  };

  const loadDashboardStats = async (): Promise<GoSellrAnalytics> => {
    return {
      totalRevenue: 45600.5,
      monthlyRevenue: 8900.25,
      totalOrders: 234,
      pendingOrders: 12,
      totalProducts: 45,
      lowStockProducts: 3,
      customerRating: 4.8,
      totalCustomers: 189,
      newCustomers: 23,
      disputeRate: 0.02,
      completionRate: 0.98,
      averageOrderValue: 194.87,
      topSellingCategory: 'Electronics',
      blockchainTransactions: 156,
      escrowFunds: 8900.5,
      aiTrustScore: 92,
      aiRiskScore: 8,
    };
  };

  const loadRecentOrders = async (): Promise<GoSellrOrder[]> => {
    return [
      {
        id: 'order-001',
        userId: 'user-123',
        sellerId: 'seller-1',
        items: [
          {
            productId: 'prod-1',
            productName: 'Wireless Headphones',
            quantity: 1,
            price: 299.99,
            total: 299.99,
            sellerId: 'seller-1',
          },
        ],
        subtotal: 299.99,
        tax: 29.99,
        shipping: 0,
        total: 329.98,
        status: 'pending',
        paymentMethod: 'escrow',
        paymentStatus: 'pending',
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        billingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        blockchainTransaction: {
          hash: '0x1234...5678',
          blockNumber: 12345678,
          gasUsed: 21000,
          gasPrice: 20000000000,
          status: 'confirmed',
          confirmations: 12,
          timestamp: new Date('2024-01-15T10:30:00'),
        },
        createdAt: new Date('2024-01-15T10:30:00'),
        updatedAt: new Date('2024-01-15T10:30:00'),
      },
    ];
  };

  const loadRecentProducts = async (): Promise<GoSellrProduct[]> => {
    return [
      {
        id: 'prod-001',
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones',
        price: 299.99,
        originalPrice: 399.99,
        currency: 'USD',
        category: 'Electronics',
        subcategory: 'Audio',
        brand: 'AudioTech',
        images: ['/api/placeholder/400/400?text=Headphones'],
        rating: 4.8,
        reviewCount: 1247,
        seller: {
          id: 'seller-1',
          name: 'AudioTech Store',
          rating: 4.9,
          verified: true,
          location: 'New York, NY',
          blockchainAddress: '0x1234...5678',
          trustScore: 92,
          totalSales: 45600,
          totalProducts: 45,
        },
        stock: 15,
        shipping: {
          free: true,
          cost: 0,
          estimatedDays: '2-3 days',
          methods: [],
        },
        features: ['Noise Cancellation', 'Bluetooth 5.0'],
        tags: ['wireless', 'premium'],
        blockchain: {
          escrowEnabled: true,
          smartContract: '0x1234...5678',
          nftAvailable: false,
          blockchain: 'ethereum',
          gasEstimate: 0.005,
        },
        aiScore: {
          trustScore: 92,
          riskScore: 8,
          recommendationScore: 95,
          fraudScore: 2,
          reliabilityScore: 94,
          calculatedAt: new Date(),
        },
        sku: 'AUD-001',
        status: 'active',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
      },
    ];
  };

  const loadNotifications = async (): Promise<any[]> => {
    return [
      {
        id: 'notif-001',
        type: 'order',
        title: 'New Order Received',
        message: 'Order #001 from Alice Johnson for $299.99',
        timestamp: new Date('2024-01-15T10:30:00'),
        read: false,
        priority: 'high',
      },
    ];
  };

  // ========================================
  // 4. UTILITY FUNCTIONS
  // ========================================

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'disputed':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // ========================================
  // 5. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Vendor Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader user={user} notifications={notifications} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <OverviewTab
              stats={stats!}
              recentOrders={recentOrders}
              recentProducts={recentProducts}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
            />
          )}
          {activeTab === 'orders' && (
            <OrdersTab
              orders={recentOrders}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
            />
          )}
          {activeTab === 'products' && (
            <ProductsTab products={recentProducts} formatCurrency={formatCurrency} />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsTab stats={stats!} formatCurrency={formatCurrency} />
          )}
          {activeTab === 'settings' && <SettingsTab user={user} />}
        </div>
      </div>
    </div>
  );
}

// ========================================
// 6. DASHBOARD HEADER COMPONENT
// ========================================

function DashboardHeader({ user, notifications }: { user: any; notifications: any[] }) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">GoSellr</div>
            <div className="ml-8 text-sm text-gray-500">Vendor Dashboard</div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-3">
              <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 7. DASHBOARD TABS COMPONENT
// ========================================

function DashboardTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'orders', name: 'Orders', icon: ShoppingBagIcon },
    { id: 'products', name: 'Products', icon: PackageIcon },
    { id: 'analytics', name: 'Analytics', icon: TrendingUpIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ========================================
// 8. OVERVIEW TAB COMPONENT
// ========================================

function OverviewTab({
  stats,
  recentOrders,
  recentProducts,
  formatCurrency,
  formatDate,
  getStatusColor,
}: {
  stats: GoSellrAnalytics;
  recentOrders: GoSellrOrder[];
  recentProducts: GoSellrProduct[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  getStatusColor: (status: string) => string;
}) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change="+12.5%"
          changeType="positive"
          icon={CurrencyDollarIcon}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          change="+8.2%"
          changeType="positive"
          icon={ShoppingBagIcon}
        />
        <StatCard
          title="Customer Rating"
          value={stats.customerRating.toFixed(1)}
          change="+0.2"
          changeType="positive"
          icon={StarIcon}
        />
        <StatCard
          title="AI Trust Score"
          value={stats.aiTrustScore.toString()}
          change="+5"
          changeType="positive"
          icon={ShieldCheckIcon}
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders.map(order => (
            <div key={order.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingBagIcon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Order #{order.id}</div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(order.total)} • {formatDate(order.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                  <Link
                    href={`/gosellr/orders/${order.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Recent Products</h3>
            <Link
              href="/gosellr/my-products"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentProducts.map(product => (
            <div key={product.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(product.price)} • Stock: {product.stock}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/gosellr/product/${product.id}/edit`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========================================
// 9. STAT CARD COMPONENT
// ========================================

function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: any;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div
          className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </div>
      </div>
    </div>
  );
}

// ========================================
// 10. ORDERS TAB COMPONENT
// ========================================

function OrdersTab({
  orders,
  formatCurrency,
  formatDate,
  getStatusColor,
}: {
  orders: GoSellrOrder[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  getStatusColor: (status: string) => string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">All Orders</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {orders.map(order => (
          <div key={order.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingBagIcon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Order #{order.id}</div>
                  <div className="text-sm text-gray-500">
                    {order.items.length} items • {formatCurrency(order.total)}
                  </div>
                  <div className="text-xs text-gray-400">{formatDate(order.createdAt)}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
                <Link
                  href={`/gosellr/orders/${order.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================
// 11. PRODUCTS TAB COMPONENT
// ========================================

function ProductsTab({
  products,
  formatCurrency,
}: {
  products: GoSellrProduct[];
  formatCurrency: (amount: number) => string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">My Products</h3>
        <Link
          href="/gosellr/my-products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {products.map(product => (
            <div key={product.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(product.price)} • Stock: {product.stock}
                    </div>
                    <div className="text-xs text-gray-400">SKU: {product.sku}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/gosellr/product/${product.id}`}
                    className="text-blue-600 hover:text-blue-700 p-2"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/gosellr/product/${product.id}/edit`}
                    className="text-green-600 hover:text-green-700 p-2"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Link>
                  <button className="text-red-600 hover:text-red-700 p-2">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========================================
// 12. ANALYTICS TAB COMPONENT
// ========================================

function AnalyticsTab({
  stats,
  formatCurrency,
}: {
  stats: GoSellrAnalytics;
  formatCurrency: (amount: number) => string;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Monthly Revenue</h4>
          <p className="text-2xl font-semibold text-gray-900">
            {formatCurrency(stats.monthlyRevenue)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Average Order Value</h4>
          <p className="text-2xl font-semibold text-gray-900">
            {formatCurrency(stats.averageOrderValue)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Completion Rate</h4>
          <p className="text-2xl font-semibold text-gray-900">
            {(stats.completionRate * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-lg font-semibold text-gray-900">{stats.totalCustomers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">New Customers</p>
            <p className="text-lg font-semibold text-gray-900">{stats.newCustomers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dispute Rate</p>
            <p className="text-lg font-semibold text-gray-900">
              {(stats.disputeRate * 100).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Blockchain Transactions</p>
            <p className="text-lg font-semibold text-gray-900">{stats.blockchainTransactions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 13. SETTINGS TAB COMPONENT
// ========================================

function SettingsTab({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              defaultValue={user.sellerInfo?.businessName}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue={user.email}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Type</label>
            <select
              defaultValue={user.sellerInfo?.businessType}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="individual">Individual</option>
              <option value="business">Business</option>
              <option value="corporation">Corporation</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
