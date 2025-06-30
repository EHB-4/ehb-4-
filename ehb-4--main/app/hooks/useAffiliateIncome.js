import { useState, useEffect, useCallback } from 'react';
import APIAgent from '@/agents/APIAgent';

export function useAffiliateIncome(userId) {
  const [affiliate, setAffiliate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAffiliate = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let url = '/affiliate';
      if (userId) url += `?userId=${encodeURIComponent(userId)}`;
      const res = await APIAgent.get(url);
      setAffiliate(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch affiliate income');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAffiliate();
  }, [fetchAffiliate]);

  return { affiliate, loading, error, refresh: fetchAffiliate };
} 