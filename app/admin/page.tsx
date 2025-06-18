import React from 'react';
import AdminOverview from '@/components/AdminOverview';
import RecentOrders from '@/components/RecentOrders';
import QuickActions from '@/components/QuickActions';

// Placeholder data (in a real app, fetch from backend)
const adminData = {
  totalOrders: 100,
  totalRevenue: 10000,
  totalProducts: 50,
  totalCustomers: 200,
  recentOrders: [
    {
      id: 1,
      customer: 'John Doe',
      total: 199.99,
      status: 'Delivered',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      total: 299.99,
      status: 'Processing',
    },
    {
      id: 3,
      customer: 'Bob Johnson',
      total: 149.99,
      status: 'Shipped',
    },
  ],
};

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <AdminOverview
        totalOrders={adminData.totalOrders}
        totalRevenue={adminData.totalRevenue}
        totalProducts={adminData.totalProducts}
        totalCustomers={adminData.totalCustomers}
        recentOrders={adminData.recentOrders}
      />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <RecentOrders orders={adminData.recentOrders} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <QuickActions />
      </div>
      {/* AI Guidance: In a real app, this page fetches dashboard data from the backend. */}
    </div>
  );
}
