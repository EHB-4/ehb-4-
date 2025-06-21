'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnalyticsData {
  sales: {
    total: number;
    monthly: number;
    weekly: number;
    daily: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  products: {
    total: number;
    active: number;
    pending: number;
    rejected: number;
  };
  complaints: {
    total: number;
    resolved: number;
    pending: number;
    escalated: number;
  };
  revenue: {
    labels: string[];
    data: number[];
  };
  topProducts: {
    labels: string[];
    data: number[];
  };
  orderStatus: {
    labels: string[];
    data: number[];
  };
  categoryDistribution: {
    labels: string[];
    data: number[];
  };
}

interface AnalyticsChartsProps {
  data: AnalyticsData;
  loading?: boolean;
}

const SalesChart: React.FC<{ data: AnalyticsData['revenue']; loading?: boolean }> = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend</h3>
        <div className="h-64 bg-gray-100 rounded-md animate-pulse"></div>
      </div>
    );
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Revenue (PKR)',
        data: data.data,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return 'PKR ' + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

const TopProductsChart: React.FC<{ data: AnalyticsData['topProducts']; loading?: boolean }> = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
        <div className="h-64 bg-gray-100 rounded-md animate-pulse"></div>
      </div>
    );
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Sales',
        data: data.data,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 101, 101, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 101, 101)',
          'rgb(251, 146, 60)',
          'rgb(251, 191, 36)',
          'rgb(34, 197, 94)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

const OrderStatusChart: React.FC<{ data: AnalyticsData['orderStatus']; loading?: boolean }> = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
        <div className="h-64 bg-gray-100 rounded-md animate-pulse"></div>
      </div>
    );
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)', // Green - Completed
          'rgba(251, 191, 36, 0.8)', // Yellow - Pending
          'rgba(251, 146, 60, 0.8)', // Orange - Confirmed
          'rgba(239, 68, 68, 0.8)', // Red - Cancelled
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(251, 191, 36)',
          'rgb(251, 146, 60)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

const CategoryDistributionChart: React.FC<{
  data: AnalyticsData['categoryDistribution'];
  loading?: boolean;
}> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
        <div className="h-64 bg-gray-100 rounded-md animate-pulse"></div>
      </div>
    );
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(147, 51, 234)',
          'rgb(236, 72, 153)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

const StatsCards: React.FC<{ data: AnalyticsData; loading?: boolean }> = ({ data, loading }) => {
  const stats = [
    {
      title: 'Total Sales',
      value: `PKR ${data.sales.total.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: '💰',
    },
    {
      title: 'Total Orders',
      value: data.orders.total.toString(),
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: '📦',
    },
    {
      title: 'Active Products',
      value: data.products.active.toString(),
      change: '+15.3%',
      changeType: 'increase' as const,
      icon: '🏷️',
    },
    {
      title: 'Resolved Complaints',
      value: data.complaints.resolved.toString(),
      change: '-5.1%',
      changeType: 'decrease' as const,
      icon: '✅',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {loading ? (
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">💰</div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{stat.icon}</div>
                <div
                  className={`text-sm font-semibold ${
                    stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default function AnalyticsCharts({ data, loading = false }: AnalyticsChartsProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          {(['7d', '30d', '90d', '1y'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range === '7d'
                ? '7 Days'
                : range === '30d'
                  ? '30 Days'
                  : range === '90d'
                    ? '90 Days'
                    : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards data={data} loading={loading} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={data.revenue} loading={loading} />
        <TopProductsChart data={data.topProducts} loading={loading} />
        <OrderStatusChart data={data.orderStatus} loading={loading} />
        <CategoryDistributionChart data={data.categoryDistribution} loading={loading} />
      </div>
    </div>
  );
}
