import { useState, useEffect, useCallback } from 'react';
import APIAgent from '@/agents/APIAgent';

export function useProductRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await APIAgent.get('/ai/recommendations');
      setRecommendations(res.data.recommendations || []);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return { recommendations, loading, error, refresh: fetchRecommendations };
} 