import React, { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

export default function DeliveryLiveTracker({ orderId }) {
  const { isConnected, on, off } = useSocket();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!orderId || !isConnected) return;
    const event = `delivery:location:${orderId}`;
    const handler = (data) => {
      if (data && data.lat && data.lng) setLocation({ lat: data.lat, lng: data.lng });
    };
    on(event, handler);
    return () => off(event, handler);
  }, [orderId, isConnected, on, off]);

  return (
    <div className="p-4 border rounded bg-white max-w-md mx-auto mt-4">
      <div className="mb-2 font-bold">Delivery Tracker</div>
      {location ? (
        <>
          <div className="mb-2 text-sm">Rider Location: <span className="font-mono">{location.lat}, {location.lng}</span></div>
          <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded">
            {/* Map integration can be added here (e.g., Google Maps, Mapbox) */}
            <span className="text-gray-400">[Map Placeholder]</span>
          </div>
        </>
      ) : (
        <div className="text-gray-500">Waiting for live location update...</div>
      )}
      {!isConnected && <div className="mt-2 text-xs text-yellow-600">Live updates unavailable, showing last known location.</div>}
    </div>
  );
} 