import React from 'react';
import { useSellerActivity } from '@/hooks/useSellerActivity';

const statusColors = {
  active: 'text-green-600',
  cold: 'text-yellow-600',
  inactive: 'text-red-600',
};

export default function SellerActivityMonitor() {
  const { sellers, loading, error, refresh } = useSellerActivity();

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">Seller Activity Monitor</h2>
        <button onClick={refresh} className="text-xs bg-gray-200 px-2 py-1 rounded">Refresh</button>
      </div>
      {loading && <div className="text-gray-500">Loading seller activity...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">SQL Level</th>
              <th className="px-2 py-1">Last Login</th>
              <th className="px-2 py-1">Orders (30d)</th>
              <th className="px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map(seller => (
              <tr key={seller.sellerId} className="border-b">
                <td className="px-2 py-1">{seller.name}</td>
                <td className="px-2 py-1">{seller.sqlLevel}</td>
                <td className="px-2 py-1">{seller.lastLogin ? new Date(seller.lastLogin).toLocaleString() : '—'}</td>
                <td className="px-2 py-1 text-center">{seller.orderCount}</td>
                <td className={`px-2 py-1 font-bold ${statusColors[seller.status] || ''}`}>{seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}</td>
              </tr>
            ))}
            {sellers.length === 0 && !loading && (
              <tr><td colSpan={5} className="text-center text-gray-500 py-4">No sellers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 