import React from 'react';
import Link from 'next/link';

// Placeholder orders data (in a real app, fetch from backend)
const ordersData = [
  { id: 1, date: '2023-01-01', total: 100, status: 'Delivered' },
  { id: 2, date: '2023-01-02', total: 200, status: 'Processing' },
];

export default function OrderHistoryPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <div className="space-y-4">
        {ordersData.map((order) => (
          <div key={order.id} className="border rounded p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">Order #{order.id}</p>
                <p className="text-gray-600">{order.date}</p>
              </div>
              <div>
                <p className="font-bold">${order.total}</p>
                <p className="text-gray-600">{order.status}</p>
              </div>
              <Link href={`/orders/${order.id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* AI Guidance: In a real app, this page fetches order history from the backend. */}
    </div>
  );
} 