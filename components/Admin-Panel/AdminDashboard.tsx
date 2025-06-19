'use client';

import React from 'react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Admin Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-semibold text-blue-800">Users</h4>
          <p className="text-2xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-semibold text-green-800">Revenue</h4>
          <p className="text-2xl font-bold text-green-600">$0</p>
        </div>
        <div className="bg-purple-50 p-4 rounded">
          <h4 className="font-semibold text-purple-800">Orders</h4>
          <p className="text-2xl font-bold text-purple-600">0</p>
        </div>
      </div>
    </div>
  );
};
