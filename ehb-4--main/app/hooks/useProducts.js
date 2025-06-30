import { useState, useEffect, useCallback } from 'react';
import APIAgent from '@/agents/APIAgent';

export function useProducts({ category, search, page = 1, limit = 10 } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let url = '/products?';
      if (category) url += `category=${encodeURIComponent(category)}&`;
      if (search) url += `search=${encodeURIComponent(search)}&`;
      url += `page=${page}&limit=${limit}`;
      const res = await APIAgent.get(url);
      setProducts(res.data.products || []);
      setPagination(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 });
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [category, search, page, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, pagination, refetch: fetchProducts };
} 