import React from 'react';
import Link from 'next/link';

interface WishlistItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export default function WishlistItem({ item }: WishlistItemProps) {
  const handleRemove = () => {
    // Placeholder logic to remove item from wishlist
    console.log(`Removing item ${item.id} from wishlist`);
  };

  return (
    <div className="flex items-center justify-between border rounded-lg p-4">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
        <div className="ml-4">
          <h3 className="text-lg font-medium">{item.name}</h3>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Link href={`/products/${item.id}`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            View Details
          </button>
        </Link>
        <button
          onClick={handleRemove}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

// AI Guidance: This component displays a wishlist item with a remove button.
// In a real app, the remove functionality would update the backend. 