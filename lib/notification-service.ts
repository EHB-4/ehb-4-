import { Server as NetServer } from 'http';

import { Server as SocketIOServer } from 'socket.io';

export class NotificationService {
  private io: SocketIOServer;

  constructor(server: NetServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.io.on('connection', socket => {
      console.log('Client connected:', socket.id);

      socket.on('join-room', room => {
        socket.join(room);
        console.log(`Client ${socket.id} joined room: ${room}`);
      });

      socket.on('leave-room', room => {
        socket.leave(room);
        console.log(`Client ${socket.id} left room: ${room}`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  public sendNotification(userId: string, notification: any) {
    this.io.to(`user-${userId}`).emit('notification', notification);
  }

  public sendBroadcast(notification: any) {
    this.io.emit('broadcast', notification);
  }

  public sendToRoom(room: string, notification: any) {
    this.io.to(room).emit('room-notification', notification);
  }
}

export default NotificationService;
