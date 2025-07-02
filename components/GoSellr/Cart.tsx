"use client";

'use client';

import { FiShoppingCart } from 'react-icons/fi';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  shopId: string;
}

interface CartProps {
  cart: CartItem[];
  cartTotal: number;
  cartItemCount: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onPlaceOrder: () => void;
  isAuthenticated: boolean;
}

export function Cart({
  cart,
  cartTotal,
  cartItemCount,
  onUpdateQuantity,
  onRemoveFromCart,
  onPlaceOrder,
  isAuthenticated,
}: CartProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FiShoppingCart className="w-5 h-5 mr-2" />
        Cart ({cartItemCount})
      </h3>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {cart.map(item => (
              <div
                key={item.productId}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                    className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                    className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemoveFromCart(item.productId)}
                    className="text-red-500 hover:text-red-600 ml-2"
                    aria-label="Remove item from cart"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={onPlaceOrder}
              disabled={!isAuthenticated}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isAuthenticated ? 'Place Order' : 'Sign in to Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
