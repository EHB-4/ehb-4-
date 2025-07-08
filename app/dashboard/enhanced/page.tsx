'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Bell,
  Settings,
  Download,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AdvancedDataTable from '@/components/ui/AdvancedDataTable';
import AdvancedChart from '@/components/ui/AdvancedChart';
import AdvancedNotificationSystem from '@/components/notifications/AdvancedNotificationSystem';
import {
  NotificationProvider,
  useNotifications,
} from '@/components/notifications/AdvancedNotificationSystem';

/**
 * Enhanced Dashboard Page
 * Integrates all advanced components for comprehensive user experience
 */
export default function EnhancedDashboard() {
  return (
    <NotificationProvider>
      <EnhancedDashboardContent />
    </NotificationProvider>
  );
}

function EnhancedDashboardContent() {
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Mock data for charts
  const chartData = [
    {
      label: 'Revenue',
      data: [
        { label: 'Jan', value: 65000 },
        { label: 'Feb', value: 72000 },
        { label: 'Mar', value: 68000 },
        { label: 'Apr', value: 85000 },
        { label: 'May', value: 92000 },
        { label: 'Jun', value: 125430 },
      ],
      color: '#3B82F6',
    },
    {
      label: 'Orders',
      data: [
        { label: 'Jan', value: 1200 },
        { label: 'Feb', value: 1350 },
        { label: 'Mar', value: 1100 },
        { label: 'Apr', value: 1500 },
        { label: 'May', value: 1800 },
        { label: 'Jun', value: 2200 },
      ],
      color: '#8B5CF6',
    },
  ];

  // Mock data for table
  const tableData = [
    {
      id: 1,
      customer: 'John Doe',
      email: 'john@example.com',
      order: '#ORD-001',
      amount: 299.99,
      status: 'completed',
      date: '2024-01-15',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      email: 'jane@example.com',
      order: '#ORD-002',
      amount: 149.99,
      status: 'pending',
      date: '2024-01-16',
    },
    {
      id: 3,
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      order: '#ORD-003',
      amount: 599.99,
      status: 'processing',
      date: '2024-01-17',
    },
  ];

  const tableColumns = [
    {
      key: 'customer' as const,
      header: 'Customer',
      sortable: true,
      filterable: true,
    },
    {
      key: 'email' as const,
      header: 'Email',
      sortable: true,
      filterable: true,
    },
    {
      key: 'order' as const,
      header: 'Order ID',
      sortable: true,
    },
    {
      key: 'amount' as const,
      header: 'Amount',
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`,
      align: 'right' as const,
    },
    {
      key: 'status' as const,
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge
          variant={
            value === 'completed'
              ? 'success'
              : value === 'pending'
                ? 'warning'
                : value === 'processing'
                  ? 'info'
                  : 'default'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'date' as const,
      header: 'Date',
      sortable: true,
    },
  ];

  // Mock metrics
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$125,430',
      change: '+5.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Users',
      value: '15,420',
      change: '+8.4%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Orders',
      value: '8,920',
      change: '+8.4%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+10.3%',
      trend: 'up',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  // Handle refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    addNotification({
      type: 'info',
      priority: 'medium',
      title: 'Dashboard Refresh',
      message: 'Refreshing dashboard data...',
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    addNotification({
      type: 'success',
      priority: 'medium',
      title: 'Dashboard Updated',
      message: 'Dashboard data has been refreshed successfully.',
    });

    setIsLoading(false);
  };

  // Handle export
  const handleExport = () => {
    addNotification({
      type: 'info',
      priority: 'low',
      title: 'Export Started',
      message: 'Preparing dashboard data for export...',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Enhanced Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive overview of your platform performance
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Time Range Selector */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {(['7d', '30d', '90d'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedTimeRange === range
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh
            </Button>

            <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>

            <AdvancedNotificationSystem
              notifications={[]}
              onMarkAsRead={() => {}}
              onMarkAllAsRead={() => {}}
              onArchive={() => {}}
              onDelete={() => {}}
            />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {metric.value}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {metric.change}
                        </span>
                        <span className="text-sm text-gray-500">vs last period</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Revenue Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedChart
                type="line"
                data={chartData}
                height={300}
                title="Revenue Trends"
                config={{
                  scales: {
                    y: {
                      title: 'Revenue ($)',
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Orders Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Order Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedChart
                type="bar"
                data={[chartData[1]]}
                height={300}
                title="Order Volume"
                config={{
                  scales: {
                    y: {
                      title: 'Orders',
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Data Table Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AdvancedDataTable
              data={tableData}
              columns={tableColumns}
              title="Order Management"
              searchable={true}
              filterable={true}
              sortable={true}
              pagination={true}
              exportable={true}
              selectable={true}
              actions={[
                {
                  label: 'Export Selected',
                  icon: <Download className="w-4 h-4" />,
                  onClick: selectedRows => {
                    addNotification({
                      type: 'info',
                      priority: 'medium',
                      title: 'Export Started',
                      message: `Exporting ${selectedRows.length} selected orders...`,
                    });
                  },
                },
              ]}
              onRowClick={row => {
                addNotification({
                  type: 'info',
                  priority: 'low',
                  title: 'Order Selected',
                  message: `Viewing order ${row.order}`,
                });
              }}
            />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <BarChart3 className="w-6 h-6 text-gray-400" />
                <span className="text-sm font-medium">View Analytics</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <Users className="w-6 h-6 text-gray-400" />
                <span className="text-sm font-medium">Manage Users</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <ShoppingCart className="w-6 h-6 text-gray-400" />
                <span className="text-sm font-medium">View Orders</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <Settings className="w-6 h-6 text-gray-400" />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
