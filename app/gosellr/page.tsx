'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiMapPin, FiFilter, FiSearch } from 'react-icons/fi';

import GoSellrDashboard from '@/components/GoSellr/GoSellrDashboard';
import { ProductGrid } from '@/components/GoSellr/ProductGrid';
import { Cart } from '@/components/GoSellr/Cart';
import { Filters } from '@/components/GoSellr/Filters';
import { Pagination } from '@/components/GoSellr/Pagination';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
  shop: {
    id: string;
    name: string;
    city: string;
    rating: number;
  };
}

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  shopId: string;
}

export default function GoSellrPage() {
  const { data: session } = useSession();
  const [view, setView] = useState<'marketplace' | 'dashboard'>('marketplace');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    city: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
  });
  const [orderStatus, setOrderStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    if (view === 'marketplace') {
      fetchProducts();
    }
  }, [filters, pagination.page, view]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...filters,
      });

      const response = await fetch(`/api/products?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      setProducts(data.products);
      setPagination(prev => ({
        ...prev,
        total: data.pagination.total,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          quantity: 1,
          price: product.price,
          name: product.name,
          shopId: product.shop.id,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const placeOrder = async () => {
    if (!session) {
      setOrderStatus({
        type: 'error',
        message: 'Please sign in to place an order',
      });
      return;
    }

    try {
      // Check wallet balance
      const walletResponse = await fetch('/api/wallet');
      if (!walletResponse.ok) throw new Error('Failed to fetch wallet');
      const walletData = await walletResponse.json();

      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      if (walletData.balance < totalAmount) {
        setOrderStatus({
          type: 'error',
          message: 'Insufficient wallet balance',
        });
        return;
      }

      // Place order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          paymentMethod: 'wallet',
          shippingAddress: 'Default Address', // This should come from user profile
          totalAmount,
        }),
      });

      if (!orderResponse.ok) throw new Error('Failed to place order');

      // Clear cart and show success message
      setCart([]);
      setOrderStatus({
        type: 'success',
        message: 'Order placed successfully!',
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setOrderStatus({ type: null, message: '' });
      }, 3000);
    } catch (err) {
      setOrderStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to place order',
      });
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (view === 'dashboard') {
    return <GoSellrDashboard />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">GoSellr Marketplace</h1>
            <p className="text-gray-600 mt-2">Discover amazing products from local shops</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setView('marketplace')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === ('marketplace' as typeof view)
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => setView('dashboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === ('dashboard' as typeof view)
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              My Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Filters filters={filters} onFiltersChange={setFilters} />

      {/* Order Status Message */}
      <AnimatePresence>
        {orderStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-6 p-4 rounded-lg ${
              orderStatus.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {orderStatus.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Products Grid */}
        <div className="lg:col-span-3">
          <ProductGrid products={products} onAddToCart={addToCart} />
          <Pagination
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.limit)}
            onPageChange={page => setPagination(prev => ({ ...prev, page }))}
          />
        </div>
        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <Cart
            cart={cart}
            cartTotal={cartTotal}
            cartItemCount={cartItemCount}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onPlaceOrder={placeOrder}
            isAuthenticated={!!session}
          />
        </div>
      </div>
    </div>
  );
}
