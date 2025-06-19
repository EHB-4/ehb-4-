import { toast } from 'react-hot-toast';

import { prisma } from '@/lib/prisma';

export type NotificationType = 'success' | 'warning' | 'error' | 'info' | 'destructive' | 'default';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
}

export const showNotification = (type: NotificationType, message: string) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'warning':
      toast(message, {
        icon: '⚠️',
        style: {
          background: '#FEF3C7',
          color: '#92400E',
          border: '1px solid #F59E0B',
        },
      });
      break;
    case 'error':
    case 'destructive':
      toast.error(message);
      break;
    case 'info':
    case 'default':
      toast(message);
      break;
  }
};

export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: NotificationType = 'default'
) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        read: false,
      },
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

export const markAsRead = async (notificationId: string) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
    return notification;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return null;
  }
};

export const deleteNotification = async (notificationId: string) => {
  try {
    await prisma.notification.delete({
      where: { id: notificationId },
    });
    return true;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
};

export const markAllAsRead = async (userId: string) => {
  try {
    await prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });
    return true;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }
};
