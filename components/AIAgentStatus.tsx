'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AIAgentStatus() {
  const [status, setStatus] = useState<'idle' | 'thinking' | 'working'>('idle');
  const [lastAction, setLastAction] = useState<string>('');

  useEffect(() => {
    // Listen for Cursor AI events
    const handleCursorAIEvent = (event: CustomEvent) => {
      const { type, action } = event.detail;
      setStatus(type);
      if (action) setLastAction(action);
    };

    window.addEventListener('cursor-ai-event', handleCursorAIEvent as EventListener);
    return () =>
      window.removeEventListener('cursor-ai-event', handleCursorAIEvent as EventListener);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div
              className={`w-3 h-3 rounded-full ${
                status === 'idle'
                  ? 'bg-gray-400'
                  : status === 'thinking'
                    ? 'bg-yellow-400'
                    : 'bg-green-400'
              }`}
            >
              {status === 'thinking' && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-yellow-400"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Cursor AI Status: {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
            {lastAction && (
              <p className="text-xs text-gray-500 dark:text-gray-400">Last Action: {lastAction}</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
