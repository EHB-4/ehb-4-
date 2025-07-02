'use client';

'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  Settings,
  Edit,
  Eye,
  TrendingUp,
  Users,
  Star,
  MapPin,
  Calendar,
  Filter,
  Search,
  ArrowRight,
  Plus,
  BarChart3,
  Shield,
  Globe,
  Bell,
  CreditCard,
  Wallet,
  Activity,
} from 'lucide-react';
import Link from 'next/link';

interface Order {
  _id: string;
  userId: string;
  items: Array<{
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Shop {
  _id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  banner: string;
  category: string;
  rating: number;
  reviewCount: number;
  totalProducts: number;
  totalSales: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ShopStats {
  totalProducts: number;
  totalOrders: number;
  totalIncome: number;
  pendingOrders: number;
  deliveredOrders: number;
  monthlyRevenue: number;
  customerCount: number;
  averageRating: number;
}

interface WalletInfo {
  balance: number;
  lockedBalance: number;
  sqlLevel: string;
  totalEarnings: number;
  pendingPayouts: number;
}

export default function ShopkeeperDashboard() {
  const { data: session } = useSession();
  const [shop, setShop] = useState<Shop | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [stats, setStats] = useState<ShopStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalIncome: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    monthlyRevenue: 0,
    customerCount: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    startDate: '',
    endDate: '',
  });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');

  // Mock data for fallback
  const mockShop: Shop = {
    _id: 'shop-001',
    name: 'TechGear Store',
    description: 'Premium electronics and gadgets for tech enthusiasts',
    city: 'New York',
    country: 'USA',
    address: '123 Tech Street, NY 10001',
    phone: '+1-555-0123',
    email: 'contact@techgear.com',
    website: 'www.techgear.com',
    logo: '/api/placeholder/100/100?text=TG',
    banner: '/api/placeholder/800/200?text=TechGear',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 1247,
    totalProducts: 45,
    totalSales: 45600,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-15'),
  };

  const mockOrders: Order[] = [
    {
      _id: 'order-001',
      userId: 'user-123',
      items: [
        { _id: 'item-1', name: 'Wireless Headphones', price: 299.99, quantity: 1 },
        { _id: 'item-2', name: 'Smart Watch', price: 199.99, quantity: 1 },
      ],
      total: 499.98,
      status: 'pending',
      paymentMethod: 'credit_card',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      _id: 'order-002',
      userId: 'user-124',
      items: [{ _id: 'item-3', name: 'Laptop Stand', price: 49.99, quantity: 2 }],
      total: 99.98,
      status: 'delivered',
      paymentMethod: 'crypto',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12'),
    },
    {
      _id: 'order-003',
      userId: 'user-125',
      items: [{ _id: 'item-4', name: 'Gaming Mouse', price: 79.99, quantity: 1 }],
      total: 79.99,
      status: 'delivered',
      paymentMethod: 'escrow',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-10'),
    },
  ];

  const mockWallet: WalletInfo = {
    balance: 1250.5,
    lockedBalance: 450.25,
    sqlLevel: 'Gold',
    totalEarnings: 45600.75,
    pendingPayouts: 890.3,
  };

  useEffect(() => {
    fetchShopAndData();
  }, [session]);

  const fetchShopAndData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API calls with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use mock data as fallback
      setShop(mockShop);
      setWallet(mockWallet);
      setOrders(mockOrders);

      // Calculate stats
      const completedOrders = mockOrders.filter(order => order.status === 'delivered');
      const pendingOrders = mockOrders.filter(order => order.status === 'pending');

      setStats({
        totalProducts: mockShop.totalProducts,
        totalOrders: mockOrders.length,
        totalIncome: completedOrders.reduce((sum, order) => sum + order.total, 0),
        pendingOrders: pendingOrders.length,
        deliveredOrders: completedOrders.length,
        monthlyRevenue: 8900.25,
        customerCount: 189,
        averageRating: mockShop.rating,
      });
    } catch (err) {
      setError('Failed to load shop data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus, updatedAt: new Date() } : order
        )
      );

      // Show success message
      alert(`Order status updated to ${newStatus}!`);
    } catch (err) {
      alert('Failed to update order status. Please try again.');
    }
  };

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
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your shop dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Shop</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchShopAndData}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold mb-4">No Shop Found</h2>
          <p className="text-gray-600 mb-6">
            You need to create a shop first to access the dashboard.
          </p>
          <Link
            href="/gosellr/create-shop"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center mb-4 lg:mb-0">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-blue-600">TG</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {shop.city}, {shop.country}
                  </span>
                  <span className="mx-2">•</span>
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  <span>
                    {shop.rating} ({shop.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">SQL Level</p>
                <p className="text-lg font-semibold text-blue-600">{wallet?.sqlLevel || 'Basic'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Wallet Balance</p>
                <p className="text-lg font-semibold text-green-600">
                  {formatCurrency(wallet?.balance || 0)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href="/gosellr/my-products"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Products
                </Link>
                <button className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-3 py-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(stats.totalIncome)}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Customers</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.customerCount}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                </div>
                <div className="p-6">
                  {orders.slice(0, 5).map((order, index) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900">Order #{order._id.slice(-6)}</p>
                        <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <Link
                      href="/gosellr/orders"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      View all orders
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6 space-y-4">
                  <Link
                    href="/gosellr/my-products/add"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Add New Product</p>
                      <p className="text-sm text-gray-600">Create a new product listing</p>
                    </div>
                  </Link>
                  <Link
                    href="/gosellr/orders"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Manage Orders</p>
                      <p className="text-sm text-gray-600">View and process orders</p>
                    </div>
                  </Link>
                  <Link
                    href="/gosellr/analytics"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <BarChart3 className="h-5 w-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">View Analytics</p>
                      <p className="text-sm text-gray-600">Check your performance</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filters.status}
                  onChange={e => setFilters({ ...filters, status: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Filter by status"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={e => setFilters({ ...filters, startDate: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Start date"
                />
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Orders ({orders.length})</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {orders.map(order => (
                  <div key={order._id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Order #{order._id.slice(-6)}</p>
                        <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                        <p className="text-sm text-gray-600">{order.items.length} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {order.status === 'pending' && (
                          <select
                            onChange={e => handleStatusUpdate(order._id, e.target.value)}
                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            aria-label="Update status"
                          >
                            <option value="">Update Status</option>
                            <option value="delivered">Mark Delivered</option>
                            <option value="cancelled">Cancel Order</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Shop Settings</h3>
              </div>
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shop Name
                      </label>
                      <input
                        type="text"
                        defaultValue={shop.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        defaultValue={shop.category}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={shop.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        defaultValue={shop.phone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Address</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Street Address"
                      defaultValue={shop.address}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        defaultValue={shop.city}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        defaultValue={shop.country}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <p className="text-gray-600">Order #{selectedOrder._id.slice(-6)}</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium">
                      {selectedOrder.paymentMethod.charAt(0).toUpperCase() +
                        selectedOrder.paymentMethod.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-bold text-xl">{formatCurrency(selectedOrder.total)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(item.price)}</p>
                          <p className="text-gray-600 text-sm">
                            Total: {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Add order processing functionality
                      alert('Order processing functionality would be implemented here');
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Process Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
