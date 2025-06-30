import React, { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

export default function RealTimeAlertPanel() {
  const { isConnected, on, off } = useSocket();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isConnected) return;
    const handler = (data) => {
      setAlerts((prev) => [
        {
          id: Date.now() + Math.random(),
          type: data.type || 'info',
          message: data.message || 'Alert',
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    };
    on('alert', handler);
    return () => off('alert', handler);
  }, [isConnected, on, off]);

  const dismiss = (id) => setAlerts((prev) => prev.filter(a => a.id !== id));

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80 max-w-full">
      {alerts.map(alert => (
        <div key={alert.id} className={`mb-2 p-3 rounded shadow-lg flex items-start gap-2 bg-white border-l-4 ${
          alert.type === 'error' ? 'border-red-500' : alert.type === 'warning' ? 'border-yellow-500' : 'border-ehb-primary'
        }`}>
          <div className="flex-1">
            <div className="font-bold text-sm mb-1">
              {alert.type === 'error' && '🚨 Error'}
              {alert.type === 'warning' && '⚠️ Warning'}
              {alert.type === 'info' && 'ℹ️ Info'}
              {alert.type === 'success' && '✅ Success'}
              {alert.type !== 'error' && alert.type !== 'warning' && alert.type !== 'info' && alert.type !== 'success' && '🔔 Alert'}
              <span className="ml-2 text-xs text-gray-400">{alert.time}</span>
            </div>
            <div className="text-sm">{alert.message}</div>
          </div>
          <button className="ml-2 text-gray-400 hover:text-gray-700 text-lg" onClick={() => dismiss(alert.id)} title="Dismiss">×</button>
        </div>
      ))}
    </div>
  );
} 