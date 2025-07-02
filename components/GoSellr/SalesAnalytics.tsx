"use client";

'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
} from 'react-icons/fi';

interface SalesData {
  date: string;
  sales: number;
  orders: number;
  customers: number;
  products: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface AnalyticsProps {
  shopId?: string;
  dateRange?: '7d' | '30d' | '90d' | '1y';
}

export default function SalesAnalytics({ shopId, dateRange = '30d' }: AnalyticsProps) {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(dateRange);

  // Mock data - replace with API calls
  const mockSalesData: SalesData[] = [
    { date: '2024-01-01', sales: 1200, orders: 15, customers: 12, products: 45 },
    { date: '2024-01-02', sales: 1800, orders: 22, customers: 18, products: 52 },
    { date: '2024-01-03', sales: 2100, orders: 28, customers: 24, products: 58 },
    { date: '2024-01-04', sales: 1600, orders: 20, customers: 16, products: 48 },
    { date: '2024-01-05', sales: 2400, orders: 32, customers: 28, products: 65 },
    { date: '2024-01-06', sales: 2800, orders: 38, customers: 32, products: 72 },
    { date: '2024-01-07', sales: 3200, orders: 42, customers: 36, products: 78 },
  ];

  const mockCategoryData: CategoryData[] = [
    { name: 'Electronics', value: 35, color: '#3B82F6' },
    { name: 'Fashion', value: 25, color: '#EF4444' },
    { name: 'Home & Living', value: 20, color: '#10B981' },
    { name: 'Sports', value: 15, color: '#F59E0B' },
    { name: 'Books', value: 5, color: '#8B5CF6' },
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSalesData(mockSalesData);
        setCategoryData(mockCategoryData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedPeriod, shopId]);

  const calculateMetrics = () => {
    if (salesData.length === 0)
      return { totalSales: 0, totalOrders: 0, totalCustomers: 0, avgOrderValue: 0 };

    const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
    const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
    const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0);
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    return { totalSales, totalOrders, totalCustomers, avgOrderValue };
  };

  const { totalSales, totalOrders, totalCustomers, avgOrderValue } = calculateMetrics();

  const getGrowthRate = () => {
    if (salesData.length < 2) return 0;
    const current = salesData[salesData.length - 1].sales;
    const previous = salesData[salesData.length - 2].sales;
    return ((current - previous) / previous) * 100;
  };

  const growthRate = getGrowthRate();

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
        <h2 className="text-2xl font-semibold text-gray-900">Sales Analytics</h2>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period as any)}
              className={`px-3 py-1 text-sm rounded-lg ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Sales</p>
              <p className="text-2xl font-bold">${totalSales.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                {growthRate >= 0 ? (
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <FiTrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm">{Math.abs(growthRate).toFixed(1)}%</span>
              </div>
            </div>
            <FiDollarSign className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Orders</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
              <p className="text-sm opacity-90 mt-2">Avg: ${avgOrderValue.toFixed(2)}</p>
            </div>
            <FiShoppingBag className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Customers</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
              <p className="text-sm opacity-90 mt-2">New this period</p>
            </div>
            <FiUsers className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Products Sold</p>
              <p className="text-2xl font-bold">
                {salesData.reduce((sum, item) => sum + item.products, 0)}
              </p>
              <p className="text-sm opacity-90 mt-2">Units sold</p>
            </div>
            <FiPackage className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Conversion Rate</h4>
            <p className="text-2xl font-bold text-gray-900">
              {totalCustomers > 0 ? ((totalOrders / totalCustomers) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-sm text-gray-500">Orders per customer</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Average Order Value</h4>
            <p className="text-2xl font-bold text-gray-900">${avgOrderValue.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Per order</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Lifetime Value</h4>
            <p className="text-2xl font-bold text-gray-900">
              ${totalCustomers > 0 ? (totalSales / totalCustomers).toFixed(2) : 0}
            </p>
            <p className="text-sm text-gray-500">Per customer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
