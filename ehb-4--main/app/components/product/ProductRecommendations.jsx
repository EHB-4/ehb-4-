import React from 'react';
import { useProductRecommendations } from '@/hooks/useProductRecommendations';
import { formatPrice } from '@/utils/formatPrice';
import { getSqlBadge } from '@/utils/getSqlBadge';

export default function ProductRecommendations() {
  const { recommendations, loading, error, refresh } = useProductRecommendations();

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">Recommended for You</h2>
        <button onClick={refresh} className="text-xs bg-gray-200 px-2 py-1 rounded">Refresh</button>
      </div>
      {loading && <div className="text-gray-500">Loading recommendations...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
        {recommendations.map(product => {
          const badge = getSqlBadge(product.sqlLevel);
          return (
            <div key={product._id} className="border rounded p-3 bg-white flex flex-col items-center">
              <img src={product.images?.[0] || '/placeholder.png'} alt={product.name} className="w-24 h-24 object-cover rounded mb-2" />
              <div className="font-semibold text-center mb-1">{product.name}</div>
              <div className="text-ehb-primary font-bold mb-1">{formatPrice(product.price, product.currency || 'PKR')}</div>
              <span className={`text-xs px-2 py-1 rounded mb-1`} style={{ background: badge.color }}>{badge.text}</span>
            </div>
          );
        })}
      </div>
      {!loading && recommendations.length === 0 && <div className="text-gray-500 mt-2">No recommendations found.</div>}
    </div>
  );
} 