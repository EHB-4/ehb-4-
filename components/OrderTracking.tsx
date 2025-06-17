import React from 'react';

// Placeholder tracking data (in a real app, fetch from backend)
const trackingData = [
  { status: 'Order Placed', time: '2023-01-01 10:00 AM' },
  { status: 'Shipped', time: '2023-01-02 2:00 PM' },
  { status: 'Out for Delivery', time: '2023-01-03 9:00 AM' },
  { status: 'Delivered', time: '2023-01-03 12:00 PM' },
];

export default function OrderTracking() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
      <ul className="space-y-4">
        {trackingData.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {index + 1}
            </div>
            <div className="ml-4">
              <p className="font-medium">{item.status}</p>
              <p className="text-gray-500">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// AI Guidance: This component displays the tracking status of an order.
// In a real app, tracking data is fetched from the backend. 