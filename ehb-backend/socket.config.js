const { Server } = require('socket.io');

module.exports = httpServer => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on('connection', socket => {
    console.log('✅ New WebSocket client connected:', socket.id);

    // Send welcome message
    socket.emit('welcome', {
      message: 'Welcome to EHB WebSocket Server',
      timestamp: new Date().toISOString(),
      serverTime: Date.now(),
    });

    // Handle authentication
    socket.on('authenticate', data => {
      try {
        // TODO: Implement proper authentication
        socket.authenticated = true;
        socket.emit('authenticated', {
          success: true,
          message: 'Authentication successful',
          userId: data.userId,
        });
      } catch (error) {
        socket.emit('error', {
          type: 'authentication',
          message: error.message,
        });
      }
    });

    // Handle real-time updates
    socket.on('subscribe', channel => {
      if (!socket.authenticated) {
        socket.emit('error', {
          type: 'subscription',
          message: 'Not authenticated',
        });
        return;
      }

      socket.join(channel);
      socket.emit('subscribed', {
        channel,
        message: `Successfully subscribed to ${channel}`,
      });
    });

    // Handle messages
    socket.on('message', data => {
      if (!socket.authenticated) {
        socket.emit('error', {
          type: 'message',
          message: 'Not authenticated',
        });
        return;
      }

      // Broadcast to all clients in the same channel
      socket.to(data.channel).emit('message', {
        ...data,
        sender: socket.id,
        timestamp: new Date().toISOString(),
        serverTime: Date.now(),
      });
    });

    // Handle disconnection
    socket.on('disconnect', reason => {
      console.log(`WebSocket client disconnected: ${socket.id}, reason: ${reason}`);
      // Remove from all channels
      Object.keys(socket.rooms).forEach(room => {
        socket.leave(room);
      });
    });

    // Handle errors
    socket.on('error', error => {
      console.error(`WebSocket error for client ${socket.id}:`, error);
      socket.emit('error', {
        type: 'system',
        message: 'An error occurred',
        error: error.message,
      });
    });

    // Heartbeat
    socket.on('heartbeat', () => {
      socket.emit('heartbeat', { timestamp: Date.now() });
    });
  });

  return io;
};
