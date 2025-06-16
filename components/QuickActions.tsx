import React from 'react';
import Link from 'next/link';

export default function QuickActions() {
  return (
    <div className="flex space-x-4">
      <Link href="/products/add">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Add Product
        </button>
      </Link>
      <Link href="/orders">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          View Orders
        </button>
      </Link>
    </div>
  );
}

// AI Guidance: This component displays quick action buttons for the admin dashboard.
// In a real app, these buttons link to the respective pages for adding products or viewing orders. 