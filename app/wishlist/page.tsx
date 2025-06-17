import React from 'react';
import WishlistItem from '../../../components/WishlistItem';

// Placeholder data (in a real app, fetch from backend)
const wishlistItems = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 199.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
  },
];

export default function WishlistPage() {
  const handleRemoveItem = (id: number) => {
    // In a real app, this would call the backend to remove the item
    console.log('Removing item:', id);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-500">{wishlistItems.length} items</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
          <p className="mt-2 text-sm text-gray-500">
            Add items to your wishlist to save them for later
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// AI Guidance: This page displays the user's wishlist items.
// In a real app, wishlist items would be fetched from the backend and updated in real-time. 