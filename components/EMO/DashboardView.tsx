'use client';

'use client';

import React, { useState, useEffect } from 'react';
import {
  FiDollarSign,
  FiShoppingCart,
  FiAlertTriangle,
  FiPackage,
  FiActivity,
  FiUsers,
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';

interface DashboardData {
  user: {
    name: string;
    email: string;
    sqlLevel: string;
    kycStatus: string;
    subscription: string;
  };
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalComplaints: number;
    walletBalance: number;
  };
  recentActivity: any[];
  quickActions: any[];
}

const StatCard = ({
  icon: Icon,
  title,
  value,
  change,
  changeType,
  loading = false,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  loading?: boolean;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-red-100 rounded-full">
        <Icon className="h-6 w-6 text-red-500" />
      </div>
      {!loading && (
        <div
          className={`flex items-center text-sm font-semibold ${
            changeType === 'increase'
              ? 'text-green-500'
              : changeType === 'decrease'
                ? 'text-red-500'
                : 'text-gray-500'
          }`}
        >
          {changeType === 'increase' && <FiTrendingUp className="h-4 w-4 mr-1" />}
          {changeType === 'decrease' && <FiTrendingDown className="h-4 w-4 mr-1" />}
          <span>{change}</span>
        </div>
      )}
    </div>
    <div>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ) : (
        <>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </>
      )}
    </div>
  </div>
);

const SalesChart = ({ loading = false }: { loading?: boolean }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Analytics</h3>
    {loading ? (
      <div className="h-64 bg-gray-100 rounded-md animate-pulse"></div>
    ) : (
      <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
        <p className="text-gray-500">Chart will be displayed here</p>
        {/* Placeholder for chart library */}
      </div>
    )}
  </div>
);

const RecentActivity = ({
  activities = [],
  loading = false,
}: {
  activities?: any[];
  loading?: boolean;
}) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-start space-x-3">
              <div className="p-2 bg-gray-100 rounded-full animate-pulse">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No recent activity</p>
      ) : (
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <FiUsers className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const QuickActions = ({
  actions = [],
  loading = false,
}: {
  actions?: any[];
  loading?: boolean;
}) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <div className="text-sm font-medium text-gray-800">{action.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function DashboardView() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/emo?action=dashboard');
        const result = await response.json();

        if (result.success) {
          setDashboardData(result.data);
        } else {
          setError(result.error || 'Failed to load dashboard data');
        }
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <FiAlertTriangle className="h-6 w-6 text-red-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-red-800">Error Loading Dashboard</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    totalProducts: 0,
    totalOrders: 0,
    totalComplaints: 0,
    walletBalance: 0,
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      {!loading && dashboardData && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {dashboardData.user.name}!</h1>
          <p className="text-red-100">
            SQL Level: {dashboardData.user.sqlLevel} | KYC Status: {dashboardData.user.kycStatus} |
            Subscription: {dashboardData.user.subscription}
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiPackage}
          title="Total Products"
          value={stats.totalProducts.toString()}
          change="+5.2%"
          changeType="increase"
          loading={loading}
        />
        <StatCard
          icon={FiShoppingCart}
          title="Total Orders"
          value={stats.totalOrders.toString()}
          change="+12%"
          changeType="increase"
          loading={loading}
        />
        <StatCard
          icon={FiAlertTriangle}
          title="Total Complaints"
          value={stats.totalComplaints.toString()}
          change="-2"
          changeType="decrease"
          loading={loading}
        />
        <StatCard
          icon={FiDollarSign}
          title="Wallet Balance"
          value={`PKR ${stats.walletBalance.toLocaleString()}`}
          change="+8.5%"
          changeType="increase"
          loading={loading}
        />
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart loading={loading} />
        </div>
        <div className="space-y-6">
          <QuickActions actions={dashboardData?.quickActions || []} loading={loading} />
          <RecentActivity activities={dashboardData?.recentActivity || []} loading={loading} />
        </div>
      </div>
    </div>
  );
}
