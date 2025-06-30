import React, { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

export default function ProductStockLive({ productId, initialStock = 0 }) {
  const { isConnected, on, off } = useSocket();
  const [stock, setStock] = useState(initialStock);

  useEffect(() => {
    setStock(initialStock);
  }, [initialStock]);

  useEffect(() => {
    if (!productId || !isConnected) return;
    const event = `product:stock:${productId}`;
    const handler = (data) => {
      if (typeof data.stock === 'number') setStock(data.stock);
    };
    on(event, handler);
    return () => off(event, handler);
  }, [productId, isConnected, on, off]);

  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs ${stock <= 5 ? 'text-red-600 font-bold' : 'text-gray-600'}`}>📦 Stock: {stock} {stock <= 5 && '(Low!)'}</span>
      {!isConnected && <span className="text-xs text-yellow-600">(Live updates unavailable)</span>}
    </div>
  );
} 