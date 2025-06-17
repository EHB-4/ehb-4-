import React from 'react';

interface SalesData {
  date: string;
  sales: number;
}

interface AnalyticsChartsProps {
  data: SalesData[];
}

export default function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  const maxSales = Math.max(...data.map(item => item.sales));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Sales Over Time</h3>
        <div className="flex space-x-4">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">Daily</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">Weekly</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">Monthly</button>
        </div>
      </div>
      
      <div className="h-64 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
              style={{ height: `${(item.sales / maxSales) * 100}%` }}
            />
            <span className="text-xs text-gray-500 mt-2">{item.date}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-2xl font-semibold text-gray-900">
            ${data.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Average Daily Sales</p>
          <p className="text-2xl font-semibold text-gray-900">
            ${(data.reduce((sum, item) => sum + item.sales, 0) / data.length).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

// AI Guidance: This component displays sales data in a modern chart layout.
// In a real app, this would use a charting library like Chart.js or D3.js for more advanced visualizations. 