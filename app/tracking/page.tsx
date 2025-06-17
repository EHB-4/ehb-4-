import React from 'react';
import OrderTracking from '../../../components/OrderTracking';

// Placeholder data (in a real app, fetch from backend)
const trackingData = {
  orderId: 12345,
  trackingNumber: 'TRK123456789',
  status: 'In Transit',
  estimatedDelivery: 'March 20, 2024',
  updates: [
    {
      id: 1,
      status: 'Order Placed',
      location: 'Online Store',
      timestamp: '2024-03-15T10:00:00Z',
      description: 'Your order has been placed successfully',
    },
    {
      id: 2,
      status: 'Processing',
      location: 'Warehouse',
      timestamp: '2024-03-15T14:30:00Z',
      description: 'Your order is being processed',
    },
    {
      id: 3,
      status: 'Shipped',
      location: 'Shipping Center',
      timestamp: '2024-03-16T09:15:00Z',
      description: 'Your order has been shipped',
    },
    {
      id: 4,
      status: 'In Transit',
      location: 'Local Distribution Center',
      timestamp: '2024-03-17T11:45:00Z',
      description: 'Your order is in transit',
    },
  ],
};

export default function TrackingPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Tracking</h1>
      
      <OrderTracking
        orderId={trackingData.orderId}
        trackingNumber={trackingData.trackingNumber}
        status={trackingData.status as any}
        updates={trackingData.updates}
        estimatedDelivery={trackingData.estimatedDelivery}
      />
    </div>
  );
}

// AI Guidance: This page displays order tracking information.
// In a real app, tracking data would be fetched from the backend and updated in real-time. 