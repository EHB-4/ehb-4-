import { Server as IOServer } from 'socket.io';

let io;

export function getSocketServer(server) {
  if (!io) {
    io = new IOServer(server, {
      path: '/api/socketio',
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
    // Example event listeners (can be extended)
    io.on('connection', (socket) => {
      // Order status updates
      socket.on('order:status', (data) => {
        io.emit(`order:status:${data.orderId}`, data);
      });
      // Delivery tracking
      socket.on('delivery:location', (data) => {
        io.emit(`delivery:location:${data.orderId}`, data);
      });
      // Stock updates
      socket.on('product:stock', (data) => {
        io.emit(`product:stock:${data.productId}`, data);
      });
      // Franchise/admin alerts
      socket.on('alert', (data) => {
        io.emit('alert', data);
      });
    });
  }
  return io;
} 