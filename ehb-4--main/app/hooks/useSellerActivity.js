import { useState, useEffect, useCallback } from 'react';
import APIAgent from '@/agents/APIAgent';

export function useSellerActivity() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSellers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await APIAgent.get('/ai/sellerActivity');
      setSellers(res.data.sellers || []);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch seller activity');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSellers();
  }, [fetchSellers]);

  return { sellers, loading, error, refresh: fetchSellers };
} 