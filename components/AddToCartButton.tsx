import React, { useState } from 'react';

interface AddToCartButtonProps {
  productId: number;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    // In a real app, call backend API to add product to cart
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setSuccess(true);
    setLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
    >
      {loading ? 'Adding...' : success ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
}

// AI Guidance: This component handles adding a product to the cart.
// In a real app, it calls the backend API and updates the cart state.
