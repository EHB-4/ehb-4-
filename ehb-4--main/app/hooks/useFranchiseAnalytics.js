import { useState, useCallback } from 'react';
import APIAgent from '@/agents/APIAgent';

export function useFranchiseAnalytics(franchiseId) {
  const [data, setData] = useState({ salesByArea: [], topProducts: [], avgResponseTime: null, activeSellers: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAnalytics = useCallback(async () => {
    if (!franchiseId) return;
    setLoading(true);
    setError('');
    try {
      const res = await APIAgent.get(`/analytics/franchise?franchiseId=${encodeURIComponent(franchiseId)}`);
      setData({
        salesByArea: res.data.salesByArea || [],
        topProducts: res.data.topProducts || [],
        avgResponseTime: res.data.avgResponseTime,
        activeSellers: res.data.activeSellers || [],
      });
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch franchise analytics');
    } finally {
      setLoading(false);
    }
  }, [franchiseId]);

  return { ...data, loading, error, refresh: fetchAnalytics };
} 