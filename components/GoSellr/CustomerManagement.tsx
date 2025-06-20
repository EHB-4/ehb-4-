'use client';

import React, { useState, useEffect } from 'react';
import {
  FiUsers,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShoppingBag,
  FiStar,
  FiSearch,
  FiFilter,
} from 'react-icons/fi';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive' | 'vip';
  loyaltyPoints: number;
  tags: string[];
}

interface CustomerManagementProps {
  shopId?: string;
}

export default function CustomerManagement({ shopId }: CustomerManagementProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Mock data - replace with API calls
  const mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
      address: '123 Main St, New York, NY 10001',
      joinDate: '2023-01-15',
      totalOrders: 12,
      totalSpent: 2450.0,
      lastOrder: '2024-01-10',
      status: 'vip',
      loyaltyPoints: 1250,
      tags: ['electronics', 'premium'],
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-0456',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      joinDate: '2023-03-20',
      totalOrders: 8,
      totalSpent: 1200.0,
      lastOrder: '2024-01-08',
      status: 'active',
      loyaltyPoints: 800,
      tags: ['fashion', 'regular'],
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1-555-0789',
      address: '789 Pine Rd, Chicago, IL 60601',
      joinDate: '2023-06-10',
      totalOrders: 3,
      totalSpent: 450.0,
      lastOrder: '2023-12-15',
      status: 'inactive',
      loyaltyPoints: 150,
      tags: ['sports'],
    },
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCustomers(mockCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [shopId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const calculateMetrics = () => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const vipCustomers = customers.filter(c => c.status === 'vip').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgOrderValue =
      customers.reduce((sum, c) => sum + c.totalOrders, 0) > 0
        ? totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0)
        : 0;

    return { totalCustomers, activeCustomers, vipCustomers, totalRevenue, avgOrderValue };
  };

  const { totalCustomers, activeCustomers, vipCustomers, totalRevenue, avgOrderValue } =
    calculateMetrics();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Customer Management</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <FiUsers className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Customers</p>
              <p className="text-2xl font-bold text-blue-900">{totalCustomers}</p>
            </div>
            <FiUsers className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Active Customers</p>
              <p className="text-2xl font-bold text-green-900">{activeCustomers}</p>
            </div>
            <FiUsers className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">VIP Customers</p>
              <p className="text-2xl font-bold text-purple-900">{vipCustomers}</p>
            </div>
            <FiStar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600">Total Revenue</p>
              <p className="text-2xl font-bold text-orange-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <FiShoppingBag className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="vip">VIP</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Spent
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
            {filteredCustomers.map(customer => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedCustomer(customer)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500">
                      Joined {new Date(customer.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.email}</div>
                  <div className="text-sm text-gray-500">{customer.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.totalOrders}</div>
                  <div className="text-sm text-gray-500">
                    Last: {new Date(customer.lastOrder).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${customer.totalSpent.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">{customer.loyaltyPoints} points</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}
                  >
                    {customer.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-green-600 hover:text-green-900">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <FiUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Orders</label>
                    <p className="text-sm text-gray-900">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Spent</label>
                    <p className="text-sm text-gray-900">
                      ${selectedCustomer.totalSpent.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedCustomer.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
