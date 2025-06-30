import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = '/api/socketio';

export function useSocket() {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        path: '/api/socketio',
        transports: ['websocket'],
      });
    }
    const socket = socketRef.current;
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.disconnect();
      }
    };
  }, []);

  const on = (event, handler) => {
    socketRef.current?.on(event, handler);
  };
  const off = (event, handler) => {
    socketRef.current?.off(event, handler);
  };
  const emit = (event, data) => {
    socketRef.current?.emit(event, data);
  };

  return {
    socket: socketRef.current,
    isConnected,
    on,
    off,
    emit,
  };
} 