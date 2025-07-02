"use client";

'use client';

import React, { useState, useEffect } from 'react';
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
} from '@heroicons/react/outline';

// ========================================
// 1. GOSELLR DASHBOARD COMPONENT
// ========================================

export default function GoSellrDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
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

  const loadDashboardStats = async () => {
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

  const loadRecentOrders = async (): Promise<Order[]> => {
    // Simulate API call
    return [
      {
        id: 'order-001',
        customerName: 'Alice Johnson',
        productName: 'Wireless Headphones',
        amount: 299.99,
        status: 'pending',
        date: new Date('2024-01-15'),
        paymentMethod: 'crypto',
        blockchainTx: '0x1234...5678',
      },
      {
        id: 'order-002',
        customerName: 'Bob Smith',
        productName: 'Smart Watch',
        amount: 199.99,
        status: 'completed',
        date: new Date('2024-01-14'),
        paymentMethod: 'escrow',
        blockchainTx: '0x8765...4321',
      },
      {
        id: 'order-003',
        customerName: 'Carol Davis',
        productName: 'Laptop Stand',
        amount: 89.99,
        status: 'shipped',
        date: new Date('2024-01-13'),
        paymentMethod: 'crypto',
        blockchainTx: '0xabcd...efgh',
      },
    ];
  };

  const loadRecentProducts = async (): Promise<Product[]> => {
    // Simulate API call
    return [
      {
        id: 'prod-001',
        name: 'Wireless Headphones',
        price: 299.99,
        stock: 15,
        sales: 45,
        rating: 4.8,
        status: 'active',
      },
      {
        id: 'prod-002',
        name: 'Smart Watch',
        price: 199.99,
        stock: 8,
        sales: 32,
        rating: 4.6,
        status: 'active',
      },
      {
        id: 'prod-003',
        name: 'Laptop Stand',
        price: 89.99,
        stock: 2,
        sales: 28,
        rating: 4.7,
        status: 'low_stock',
      },
    ];
  };

  const loadNotifications = async (): Promise<Notification[]> => {
    // Simulate API call
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
      {
        id: 'notif-002',
        type: 'stock',
        title: 'Low Stock Alert',
        message: 'Laptop Stand is running low on stock (2 remaining)',
        timestamp: new Date('2024-01-15T09:15:00'),
        read: false,
        priority: 'medium',
      },
      {
        id: 'notif-003',
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of $199.99 received for Order #002',
        timestamp: new Date('2024-01-15T08:45:00'),
        read: true,
        priority: 'low',
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
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  // ========================================
  // 5. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading GoSellr Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard Unavailable</h3>
          <p className="text-gray-500">Unable to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader user={user} notifications={notifications} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation Tabs */}
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <OverviewTab
              stats={stats}
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
            <AnalyticsTab stats={stats} formatCurrency={formatCurrency} />
          )}
          {activeTab === 'settings' && <SettingsTab user={user} />}
        </div>
      </div>
    </div>
  );
}

// ========================================
// 6. COMPONENT DEFINITIONS
// ========================================

// Header Component
function DashboardHeader({ user, notifications }: { user: User; notifications: Notification[] }) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">GoSellr</div>
            <div className="ml-4 text-lg font-medium text-gray-900">Seller Dashboard</div>
        </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <BellIcon className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Wallet */}
            <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-600">
              <WalletIcon className="w-5 h-5" />
              <span className="text-sm font-medium">{formatCurrency(user.walletBalance)}</span>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">Trust Score: {user.trustScore}</div>
            </div>
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Navigation Tabs Component
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
    { id: 'products', name: 'Products', icon: CurrencyDollarIcon },
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
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.name}</span>
          </button>
          );
        })}
      </nav>
      </div>
    );
  }

// Overview Tab Component
function OverviewTab({
  stats,
  recentOrders,
  recentProducts,
  formatCurrency,
  formatDate,
  getStatusColor,
}: {
  stats: DashboardStats;
  recentOrders: Order[];
  recentProducts: Product[];
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
          value={stats.customerRating.toString()}
          change="+0.2"
          changeType="positive"
          icon={StarIcon}
        />
        <StatCard
          title="AI Trust Score"
          value={`${stats.aiTrustScore}%`}
          change="+3%"
          changeType="positive"
          icon={ShieldCheckIcon}
          />
        </div>

      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
          <div>
              <p className="text-sm font-medium text-gray-600">Blockchain Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.blockchainTransactions}</p>
          </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
        <div>
              <p className="text-sm font-medium text-gray-600">Escrow Funds</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.escrowFunds)}
              </p>
        </div>
            <div className="p-3 bg-green-100 rounded-full">
              <WalletIcon className="w-6 h-6 text-green-600" />
        </div>
    </div>
      </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
              <div>
              <p className="text-sm font-medium text-gray-600">AI Risk Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.aiRiskScore}%</p>
              </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
              </div>
            </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                      <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.productName}</p>
              </div>
              </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(order.amount)}
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
            </div>
            </div>
              ))}
            </div>
        </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Product Performance</h3>
              </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500">{product.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
        </div>
      </div>
    </div>
  );
}

// Orders Tab Component
function OrdersTab({
  orders,
  formatCurrency,
  formatDate,
  getStatusColor,
}: {
  orders: Order[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  getStatusColor: (status: string) => string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">All Orders</h3>
      </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                  </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.customerName}
                  </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(order.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.date)}
                  </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div className="font-medium">{order.paymentMethod}</div>
                    <div className="text-xs">{order.blockchainTx}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Products Tab Component
function ProductsTab({
  products,
  formatCurrency,
}: {
  products: Product[];
  formatCurrency: (amount: number) => string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">All Products</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add Product
                    </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={product.stock < 5 ? 'text-red-600 font-medium' : ''}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.sales}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-900">{product.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      product.status === 'active'
                        ? 'text-green-600 bg-green-100'
                        : 'text-yellow-600 bg-yellow-100'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

// Analytics Tab Component
function AnalyticsTab({
  stats,
  formatCurrency,
}: {
  stats: DashboardStats;
  formatCurrency: (amount: number) => string;
}) {
  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-600">Monthly Revenue</h4>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</p>
          <p className="text-sm text-green-600">+15.3% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-600">Average Order Value</h4>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(stats.averageOrderValue)}
          </p>
          <p className="text-sm text-green-600">+8.7% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-600">Completion Rate</h4>
          <p className="text-2xl font-bold text-gray-900">
            {(stats.completionRate * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-green-600">+2.1% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-600">Dispute Rate</h4>
          <p className="text-2xl font-bold text-gray-900">
            {(stats.disputeRate * 100).toFixed(2)}%
          </p>
          <p className="text-sm text-red-600">+0.1% from last month</p>
        </div>
      </div>

      {/* Customer Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Growth</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Customers</span>
              <span className="text-sm font-medium text-gray-900">{stats.totalCustomers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">New This Month</span>
              <span className="text-sm font-medium text-green-600">+{stats.newCustomers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Growth Rate</span>
              <span className="text-sm font-medium text-green-600">+12.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Top Categories</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Electronics</span>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Clothing</span>
              <span className="text-sm font-medium text-gray-900">28%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Home & Garden</span>
              <span className="text-sm font-medium text-gray-900">27%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              defaultValue={user.sellerInfo?.businessName}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue={user.email}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Type</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="individual">Individual</option>
              <option value="company">Company</option>
              <option value="partnership">Partnership</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change} from last month
          </p>
        </div>
        <div className="p-3 bg-blue-100 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
}

// ========================================
// 7. TYPE DEFINITIONS
// ========================================

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  kycVerified: boolean;
  trustScore: number;
  walletBalance: number;
  isSeller: boolean;
  sellerInfo?: SellerInfo;
}

interface SellerInfo {
  businessName: string;
  businessType: string;
  verified: boolean;
  rating: number;
  totalSales: number;
  totalProducts: number;
  sellerSince: Date;
}

interface DashboardStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  customerRating: number;
  totalCustomers: number;
  newCustomers: number;
  disputeRate: number;
  completionRate: number;
  averageOrderValue: number;
  topSellingCategory: string;
  blockchainTransactions: number;
  escrowFunds: number;
  aiTrustScore: number;
  aiRiskScore: number;
}

interface Order {
  id: string;
  customerName: string;
  productName: string;
  amount: number;
  status: string;
  date: Date;
  paymentMethod: string;
  blockchainTx: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  status: string;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: string;
}

// Utility function for formatting currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
