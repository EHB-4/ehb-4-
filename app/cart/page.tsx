'use client';

'use client';

import React, { useState } from 'react';

// Placeholder cart data
const initialCart = [
  { id: 1, name: 'Sample Physical Product', price: 100, quantity: 1 },
  { id: 2, name: 'Sample Digital Product', price: 50, quantity: 2 },
];

export default function CartPage() {
  // In a real app, cart data would come from context or backend
  const [cart, setCart] = useState(initialCart);

  // Update quantity
  const updateQuantity = (id: number, qty: number) => {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: Math.max(1, qty) } : item))
    );
  };

  // Remove item
  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="divide-y">
            {cart.map(item => (
              <li key={item.id} className="flex items-center justify-between py-4">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-600">${item.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="ml-4 text-red-600 hover:underline"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-between items-center border-t pt-4">
            <div className="text-xl font-bold">Total: ${total}</div>
            {/* In a real app, this would go to the checkout page */}
            <a
              href="/checkout"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Checkout
            </a>
          </div>
        </div>
      )}
      {/* AI Guidance: In a real app, cart data comes from user actions and is saved in context or backend. */}
    </div>
  );
}
