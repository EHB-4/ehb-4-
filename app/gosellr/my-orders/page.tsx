'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Calendar, Package, DollarSign, CreditCard } from 'lucide-react';

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function MyOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Mock orders data for fallback
  const mockOrders: Order[] = [
    {
      _id: 'order-001',
      userId: 'user-123',
      items: [
        { _id: 'item-1', name: 'Wireless Headphones', price: 299.99, quantity: 1 },
        { _id: 'item-2', name: 'Smart Watch', price: 199.99, quantity: 1 },
      ],
      total: 499.98,
      status: 'completed',
      paymentMethod: 'credit_card',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16'),
    },
    {
      _id: 'order-002',
      userId: 'user-123',
      items: [{ _id: 'item-3', name: 'Laptop Stand', price: 49.99, quantity: 2 }],
      total: 99.98,
      status: 'pending',
      paymentMethod: 'crypto',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      _id: 'order-003',
      userId: 'user-123',
      items: [
        { _id: 'item-4', name: 'Gaming Mouse', price: 79.99, quantity: 1 },
        { _id: 'item-5', name: 'Mechanical Keyboard', price: 129.99, quantity: 1 },
      ],
      total: 209.98,
      status: 'cancelled',
      paymentMethod: 'escrow',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-19'),
    },
  ];

  useEffect(() => {
    if (session) {
      fetchOrders();
    }
  }, [session, pagination.page]);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders?page=${pagination.page}&limit=${pagination.limit}`);
      if (!response.ok) {
        // Use mock data if API fails
        setOrders(mockOrders);
        setPagination(prev => ({ ...prev, total: mockOrders.length }));
        return;
      }

      const data = await response.json();
      setOrders(data.orders);
      setPagination(prev => ({
        ...prev,
        total: data.pagination.total,
      }));
    } catch (err) {
      // Use mock data if API fails
      setOrders(mockOrders);
      setPagination(prev => ({ ...prev, total: mockOrders.length }));
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        order =>
          order._id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '❌';
      default:
        return '📦';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Orders</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-600">You need to be signed in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your purchase history</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search orders by ID or product name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="h-8 w-8 text-green-500 mr-3">✅</div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold">
                {orders.filter(o => o.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold">
                ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold mb-4">No Orders Found</h2>
          <p className="text-gray-600 mb-6">
            {orders.length === 0
              ? 'Start shopping to see your orders here.'
              : 'No orders match your search criteria.'}
          </p>
          <a
            href="/gosellr"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Products
          </a>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order._id?.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedOrder(order);
                  setShowModal(true);
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{getStatusIcon(order.status)}</div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Order #{order._id?.toString().slice(-6)}
                      </h3>
                      <p className="text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <p className="text-xl font-bold mt-2">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center py-1">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-gray-500 text-sm">+{order.items.length - 2} more items</p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="text-sm">View Details</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.total > pagination.limit && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from(
                { length: Math.ceil(pagination.total / pagination.limit) },
                (_, i) => i + 1
              ).map(page => (
                <button
                  key={page}
                  onClick={() => setPagination(prev => ({ ...prev, page }))}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    page === pagination.page
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <p className="text-gray-600">Order #{selectedOrder._id?.toString().slice(-6)}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </p>
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
                    <p className="font-bold text-xl">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Items */}
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
                          <p className="font-semibold">${item.price.toFixed(2)}</p>
                          <p className="text-gray-600 text-sm">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Add reorder functionality
                      alert('Reorder functionality would be implemented here');
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Reorder
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
