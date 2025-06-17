import React from 'react';
import AnalyticsOverview from '../../../components/AnalyticsOverview';
import AnalyticsCharts from '../../../components/AnalyticsCharts';

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
      
      <div className="space-y-8">
        <AnalyticsOverview
          totalOrders={analyticsData.totalOrders}
          totalRevenue={analyticsData.totalRevenue}
          totalProducts={analyticsData.totalProducts}
          totalCustomers={analyticsData.totalCustomers}
        />
        
        <AnalyticsCharts data={analyticsData.salesData} />
      </div>
    </div>
  );
}

// AI Guidance: This page displays the analytics dashboard with overview stats and charts.
// In a real app, data would be fetched from the backend and updated in real-time. 