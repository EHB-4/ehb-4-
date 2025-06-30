import React from 'react';

const mockSummary = [
  { label: 'Total Registered Users', value: 2345, icon: '📈' },
  { label: 'Active Lawyers', value: 87, icon: '👨‍⚖️' },
  { label: 'Active Legal Cases', value: 142, icon: '📁' },
  { label: 'Pending Verifications', value: 19, icon: '🧾' },
  { label: 'Open Complaints', value: 7, icon: '🚨' },
];
const mockFranchiseLoad = [
  { name: 'Lahore Franchise', value: 42 },
  { name: 'Karachi Franchise', value: 37 },
  { name: 'Islamabad Franchise', value: 28 },
];
const mockFranchiseKPIs = [
  { name: 'Lahore Franchise', orders: 120, complaints: 2, escalated: 1, avgTime: 6, sqlUpgrades: 8, rank: 1 },
  { name: 'Karachi Franchise', orders: 98, complaints: 4, escalated: 2, avgTime: 8, sqlUpgrades: 5, rank: 2 },
  { name: 'Islamabad Franchise', orders: 75, complaints: 1, escalated: 0, avgTime: 5, sqlUpgrades: 3, rank: 3 },
];

const Analytics = () => {
  return (
    <section>
      <h2 className="text-lg font-bold mb-4">📊 Platform Analytics & Insights</h2>
      {/* Top Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {mockSummary.map((w, i) => (
          <div key={i} className="flex flex-col items-center p-6 rounded-lg shadow bg-white hover:shadow-lg transition border-t-4 border-blue-200">
            <span className="text-3xl mb-2">{w.icon}</span>
            <div className="text-2xl font-bold mb-1">{w.value}</div>
            <div className="text-sm text-gray-700 mb-2">{w.label}</div>
          </div>
        ))}
        {/* SQL Level Pie Chart Placeholder */}
        <div className="flex flex-col items-center p-6 rounded-lg shadow bg-white hover:shadow-lg transition border-t-4 border-green-200 col-span-1 md:col-span-3">
          <div className="text-lg font-semibold mb-2">🛡 SQL Level Distribution</div>
          <div className="w-32 h-32 bg-gradient-to-tr from-green-200 to-blue-200 rounded-full flex items-center justify-center text-2xl font-bold">Pie Chart</div>
        </div>
      </div>
      {/* Franchise-Wise Load Leaderboard */}
      <div className="mb-8">
        <div className="font-semibold mb-2">Franchise-Wise Load</div>
        <div className="bg-white border rounded p-4 flex flex-col gap-2">
          {mockFranchiseLoad.map((f, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="font-semibold">{f.name}</span>
              <span className="text-lg font-bold">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Graphs & Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border rounded p-4 flex flex-col items-center">
          <div className="font-semibold mb-2">📊 User Growth (Line Chart)</div>
          <div className="w-full h-32 bg-blue-100 rounded flex items-center justify-center">Line Chart</div>
        </div>
        <div className="bg-white border rounded p-4 flex flex-col items-center">
          <div className="font-semibold mb-2">📉 Lawyer Response Time (Bar Chart)</div>
          <div className="w-full h-32 bg-yellow-100 rounded flex items-center justify-center">Bar Chart</div>
        </div>
        <div className="bg-white border rounded p-4 flex flex-col items-center">
          <div className="font-semibold mb-2">🧭 SQL Upgrade Flow (Funnel)</div>
          <div className="w-full h-32 bg-green-100 rounded flex items-center justify-center">Funnel Chart</div>
        </div>
        <div className="bg-white border rounded p-4 flex flex-col items-center">
          <div className="font-semibold mb-2">🧯 Complaint Heatmap</div>
          <div className="w-full h-32 bg-red-100 rounded flex items-center justify-center">Heatmap</div>
        </div>
        <div className="bg-white border rounded p-4 flex flex-col items-center">
          <div className="font-semibold mb-2">🧠 Case Type Distribution (Pie)</div>
          <div className="w-full h-32 bg-purple-100 rounded flex items-center justify-center">Pie Chart</div>
        </div>
        <div className="bg-white border rounded p-4 flex flex-col items-center">
          <div className="font-semibold mb-2">📍 Regional Activity Map</div>
          <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">Map</div>
        </div>
      </div>
      {/* Franchise KPI Board */}
      <div className="mb-8">
        <div className="font-semibold mb-2">Franchise KPI Board</div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Franchise</th>
                <th className="p-2">Orders (30d)</th>
                <th className="p-2">Complaints</th>
                <th className="p-2">Escalated</th>
                <th className="p-2">Avg Resolution (h)</th>
                <th className="p-2">SQL Upgrades</th>
                <th className="p-2">Rank</th>
              </tr>
            </thead>
            <tbody>
              {mockFranchiseKPIs.map((f, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{f.name}</td>
                  <td className="p-2">{f.orders}</td>
                  <td className="p-2">{f.complaints}</td>
                  <td className="p-2">{f.escalated}</td>
                  <td className="p-2">{f.avgTime}</td>
                  <td className="p-2">{f.sqlUpgrades}</td>
                  <td className="p-2 font-bold">{f.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Data Export & Reports */}
      <div className="flex gap-4 mb-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow text-xs">🧾 Export CSV</button>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow text-xs">📅 Schedule Weekly Report</button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow text-xs">📤 Share Dashboard View (PDF)</button>
      </div>
    </section>
  );
};

export default Analytics; 