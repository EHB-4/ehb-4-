import { useState, useEffect, useCallback, useRef } from 'react';
import APIAgent from '@/agents/APIAgent';

export function useOrderTracker(orderId) {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const intervalRef = useRef(null);

  const fetchOrder = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    setError('');
    try {
      const res = await APIAgent.get(`/orders/${orderId}`);
      setOrder(res.data);
      setStatus(res.data.status);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (orderId) {
      intervalRef.current = setInterval(fetchOrder, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchOrder, orderId]);

  return { order, status, loading, error, refresh: fetchOrder };
} 