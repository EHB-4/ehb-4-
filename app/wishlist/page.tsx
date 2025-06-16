import React from 'react';
import WishlistItem from '../../../components/WishlistItem';

// Placeholder wishlist data (in a real app, fetch from backend)
const wishlistData = [
  { id: 1, name: 'Sample Physical Product', price: 100, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Sample Digital Product', price: 50, image: 'https://via.placeholder.com/300' },
];

export default function WishlistPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="space-y-4">
        {wishlistData.map((item) => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </div>
      {/* AI Guidance: In a real app, this page fetches wishlist data from the backend. */}
    </div>
  );
} 