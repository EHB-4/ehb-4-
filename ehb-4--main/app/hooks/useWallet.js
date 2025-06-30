import { useState, useCallback } from 'react';
import APIAgent from '@/agents/APIAgent';

export function useWallet() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBalance = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await APIAgent.get('/wallet');
      setBalance(res.data.balance || 0);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch wallet balance');
    } finally {
      setLoading(false);
    }
  }, []);

  const payWithWallet = useCallback(async ({ userId, orderId, amount }) => {
    setLoading(true);
    setError('');
    try {
      const res = await APIAgent.post('/wallet', { userId, orderId, amount });
      if (res.data.success) {
        fetchBalance();
        return { success: true, txnId: res.data.txnId };
      } else {
        setError(res.data.error || 'Payment failed');
        return { success: false };
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Payment failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [fetchBalance]);

  // Initial fetch (optional: call fetchBalance in useEffect if needed)

  return { balance, loading, error, payWithWallet, refresh: fetchBalance };
} 