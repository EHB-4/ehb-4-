import React from 'react';

// Placeholder data (in a real app, fetch from backend)
const analyticsData = {
  totalOrders: 100,
  totalRevenue: 10000,
  totalProducts: 50,
  totalCustomers: 200,
  salesData: [
    { date: '2024-01', sales: 1000 },
    { date: '2024-02', sales: 1500 },
    { date: '2024-03', sales: 2000 },
    { date: '2024-04', sales: 1800 },
    { date: '2024-05', sales: 2500 },
    { date: '2024-06', sales: 3000 },
  ],
};

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{analyticsData.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">${analyticsData.totalRevenue}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
          <p className="text-3xl font-bold text-purple-600">{analyticsData.totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Customers</h3>
          <p className="text-3xl font-bold text-orange-600">{analyticsData.totalCustomers}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Data</h2>
        <div className="space-y-2">
          {analyticsData.salesData.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">{item.date}</span>
              <span className="font-semibold">${item.sales}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
