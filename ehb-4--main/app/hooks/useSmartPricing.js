import { useState, useCallback } from 'react';
import APIAgent from '@/agents/APIAgent';

export function useSmartPricing(productId) {
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [avgMarketPrice, setAvgMarketPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPricing = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    setError('');
    try {
      const res = await APIAgent.post('/ai/pricing', { productId });
      setSuggestedPrice(res.data.suggestedPrice);
      setAvgMarketPrice(res.data.avgMarketPrice);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch smart pricing');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  return { suggestedPrice, avgMarketPrice, loading, error, refresh: fetchPricing };
} 