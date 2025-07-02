"use client";

import Link from 'next/link';
import React from 'react';

interface WishlistItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  onRemove?: (id: number) => void;
}

export default function WishlistItem({ item, onRemove }: WishlistItemProps) {
  return (
    <div className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
          <p className="text-gray-600">${item.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href={`/products/${item.id}`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Details
        </Link>
        <button
          onClick={() => onRemove?.(item.id)}
          className="text-red-600 hover:text-red-800 transition-colors"
          aria-label="Remove from wishlist"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// AI Guidance: This component displays a wishlist item with remove functionality.
// In a real app, the remove action would update the backend.
