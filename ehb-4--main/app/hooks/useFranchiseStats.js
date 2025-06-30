import { useState, useEffect, useCallback } from 'react';
import APIAgent from '@/agents/APIAgent';

export function useFranchiseStats(franchiseId) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStats = useCallback(async () => {
    if (!franchiseId) return;
    setLoading(true);
    setError('');
    try {
      const res = await APIAgent.get(`/franchise/${franchiseId}`);
      setStats(res.data.franchise);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch franchise stats');
    } finally {
      setLoading(false);
    }
  }, [franchiseId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refresh: fetchStats };
} 