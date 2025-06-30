import React from 'react';

interface AdminOverviewProps {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
}

export default function AdminOverview({ totalOrders, totalRevenue, totalProducts }: AdminOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Total Orders</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">{totalOrders}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">${totalRevenue}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Total Products</h3>
        <p className="mt-2 text-3xl font-bold text-purple-600">{totalProducts}</p>
      </div>
    </div>
  );
}

// AI Guidance: This component displays overview stats for the admin dashboard.
// In a real app, these stats are fetched from the backend. 