import { useState, useEffect, useCallback } from 'react';

const CART_KEY = 'gosellr_cart';

function getInitialCart() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [cart, setCart] = useState(getInitialCart());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.productId === product.productId);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Optionally: sync with API if user is logged in (mock for now)
  // const syncCartWithAPI = async () => { ... };

  return {
    cart,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    // syncCartWithAPI,
  };
} 