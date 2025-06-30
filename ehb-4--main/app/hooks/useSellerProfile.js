import { useState, useEffect, useCallback } from 'react';
import APIAgent from '@/agents/APIAgent';

export function useSellerProfile() {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSeller = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await APIAgent.get('/sellers');
      setSeller(res.data.seller);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch seller profile');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSeller = useCallback(async (data) => {
    setLoading(true);
    setError('');
    try {
      const res = await APIAgent.patch('/sellers', data);
      setSeller(res.data.seller);
      return { success: true };
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to update seller profile');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSeller();
  }, [fetchSeller]);

  return { seller, loading, error, refetch: fetchSeller, updateSeller };
} 