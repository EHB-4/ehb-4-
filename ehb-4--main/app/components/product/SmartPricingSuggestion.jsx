import React, { useEffect } from 'react';
import { useSmartPricing } from '@/hooks/useSmartPricing';
import { formatPrice } from '@/utils/formatPrice';

export default function SmartPricingSuggestion({ productId, currentPrice }) {
  const { suggestedPrice, avgMarketPrice, loading, error, refresh } = useSmartPricing(productId);

  useEffect(() => {
    if (productId) refresh();
    // eslint-disable-next-line
  }, [productId]);

  return (
    <div className="p-4 border rounded bg-white max-w-md mx-auto my-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold">Smart Pricing Suggestion</span>
        <button onClick={refresh} className="text-xs bg-gray-200 px-2 py-1 rounded">Refresh</button>
      </div>
      {loading && <div className="text-gray-500">Analyzing market...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && suggestedPrice !== null && (
        <div className="mt-2">
          <div className="mb-1">Current Price: <span className="font-mono">{formatPrice(currentPrice)}</span></div>
          <div className="mb-1">Market Avg: <span className="font-mono">{formatPrice(avgMarketPrice)}</span></div>
          <div className={
            suggestedPrice < currentPrice
              ? 'text-green-700 font-bold'
              : 'text-gray-700 font-bold'
          }>
            Suggested Price: <span className="font-mono">{formatPrice(suggestedPrice)}</span>
            {suggestedPrice < currentPrice && <span className="ml-2 text-xs bg-green-100 px-2 py-0.5 rounded">Competitive!</span>}
          </div>
        </div>
      )}
    </div>
  );
} 