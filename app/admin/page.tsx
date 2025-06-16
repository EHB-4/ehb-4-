import React from 'react';
import AdminOverview from '../../../components/AdminOverview';
import RecentOrders from '../../../components/RecentOrders';
import QuickActions from '../../../components/QuickActions';

// Placeholder dashboard data (in a real app, fetch from backend)
const dashboardData = {
  totalOrders: 100,
  totalRevenue: 10000,
  totalProducts: 50,
  recentOrders: [
    { id: 1, customer: 'John Doe', total: 100, status: 'Delivered' },
    { id: 2, customer: 'Jane Smith', total: 200, status: 'Processing' },
  ],
};

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminOverview
        totalOrders={dashboardData.totalOrders}
        totalRevenue={dashboardData.totalRevenue}
        totalProducts={dashboardData.totalProducts}
      />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <RecentOrders orders={dashboardData.recentOrders} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <QuickActions />
      </div>
      {/* AI Guidance: In a real app, this page fetches dashboard data from the backend. */}
    </div>
  );
} 