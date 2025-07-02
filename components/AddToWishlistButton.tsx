"use client";

import React from 'react';

interface AddToWishlistButtonProps {
  productId: number;
}

export default function AddToWishlistButton({ productId }: AddToWishlistButtonProps) {
  const handleAddToWishlist = () => {
    // Placeholder logic to add product to wishlist
    console.log(`Adding product ${productId} to wishlist`);
  };

  return (
    <button
      onClick={handleAddToWishlist}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
    >
      Add to Wishlist
    </button>
  );
}

// AI Guidance: This component allows users to add a product to their wishlist.
// In a real app, this would update the backend to save the product in the user's wishlist.
