import React, { useEffect } from 'react';
import { useFranchiseAnalytics } from '@/hooks/useFranchiseAnalytics';

export default function FranchiseAnalyticsPanel({ franchiseId }) {
  const { salesByArea, topProducts, avgResponseTime, activeSellers, loading, error, refresh } = useFranchiseAnalytics(franchiseId);

  useEffect(() => {
    if (franchiseId) refresh();
    // eslint-disable-next-line
  }, [franchiseId]);

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">Franchise Performance Analytics</h2>
        <button onClick={refresh} className="text-xs bg-gray-200 px-2 py-1 rounded">Refresh</button>
      </div>
      {loading && <div className="text-gray-500">Loading analytics...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {/* Area-wise Sales Bar Chart */}
      <div className="mb-4">
        <div className="font-semibold mb-1">Area-wise Sales</div>
        {salesByArea.length === 0 ? (
          <div className="text-gray-500">No sales data.</div>
        ) : (
          <div className="space-y-2">
            {salesByArea.map(area => (
              <div key={area._id} className="flex items-center gap-2">
                <span className="w-24 text-xs font-bold">{area._id || 'Unknown'}</span>
                <div className="flex-1 bg-gray-100 rounded h-4 relative">
                  <div
                    className="bg-ehb-primary h-4 rounded"
                    style={{ width: `${Math.min(100, (area.totalSales / (salesByArea[0]?.totalSales || 1)) * 100)}%` }}
                  ></div>
                  <span className="absolute right-2 top-0 text-xs text-gray-700">Rs {area.totalSales.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Top Products */}
      <div className="mb-4">
        <div className="font-semibold mb-1">Top Products</div>
        {topProducts.length === 0 ? (
          <div className="text-gray-500">No product data.</div>
        ) : (
          <ul className="list-disc ml-6">
            {topProducts.map(p => (
              <li key={p._id}>{p.name} <span className="text-xs text-gray-500">({p.count} sold)</span></li>
            ))}
          </ul>
        )}
      </div>
      {/* Avg Complaint Response Time */}
      <div className="mb-4">
        <div className="font-semibold mb-1">Avg Complaint Response Time</div>
        <span>{avgResponseTime !== null ? `${avgResponseTime} hrs` : 'N/A'}</span>
      </div>
      {/* Active Sellers */}
      <div className="mb-4">
        <div className="font-semibold mb-1">Active Sellers</div>
        {activeSellers.length === 0 ? (
          <div className="text-gray-500">No active sellers.</div>
        ) : (
          <ul className="list-disc ml-6">
            {activeSellers.map(s => (
              <li key={s.id}>{s.name} <span className="text-xs text-gray-500">({s.sqlLevel})</span></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 