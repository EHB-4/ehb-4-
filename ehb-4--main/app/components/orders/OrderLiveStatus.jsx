import React, { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useOrderTracker } from '@/hooks/useOrderTracker';
import { parseOrderStatus } from '@/utils/parseOrderStatus';

const STATUS_STEPS = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'approved',
  'rejected',
];

export default function OrderLiveStatus({ orderId }) {
  const { status: polledStatus } = useOrderTracker(orderId);
  const { isConnected, on, off } = useSocket();
  const [status, setStatus] = useState(polledStatus);

  useEffect(() => {
    setStatus(polledStatus);
  }, [polledStatus]);

  useEffect(() => {
    if (!orderId || !isConnected) return;
    const event = `order:status:${orderId}`;
    const handler = (data) => {
      if (data.status) setStatus(data.status);
    };
    on(event, handler);
    return () => off(event, handler);
  }, [orderId, isConnected, on, off]);

  return (
    <div className="p-4 border rounded bg-white max-w-md mx-auto">
      <div className="mb-2 font-bold">Order Status: <span className="text-ehb-primary">{parseOrderStatus(status)}</span></div>
      <div className="flex gap-2 items-center mt-2">
        {STATUS_STEPS.map((step, idx) => (
          <React.Fragment key={step}>
            <div className={`flex flex-col items-center ${status === step ? 'text-ehb-primary font-bold' : 'text-gray-400'}`}>
              <span className="text-xs">{parseOrderStatus(step)}</span>
              <div className={`w-3 h-3 rounded-full mt-1 ${status === step ? 'bg-ehb-primary' : 'bg-gray-300'}`}></div>
            </div>
            {idx < STATUS_STEPS.length - 1 && <div className="w-6 h-0.5 bg-gray-200" />}
          </React.Fragment>
        ))}
      </div>
      {!isConnected && <div className="mt-2 text-xs text-yellow-600">Live updates unavailable, showing polled status.</div>}
    </div>
  );
} 