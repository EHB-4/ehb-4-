'use client';

import { Bell, Check, Trash, AlertCircle, Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  showNotification,
  markAsRead,
  deleteNotification,
  markAllAsRead,
  type Notification,
} from '@/lib/notifications';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      showNotification('error', 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const success = await markAsRead(notificationId);
      if (success) {
        setNotifications(
          notifications.map(notification =>
            notification.id === notificationId ? { ...notification, read: true } : notification
          )
        );
        showNotification('success', 'Notification marked as read');
      } else {
        throw new Error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      showNotification('error', 'Failed to mark notification as read');
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      const success = await deleteNotification(notificationId);
      if (success) {
        setNotifications(notifications.filter(notification => notification.id !== notificationId));
        showNotification('success', 'Notification deleted');
      } else {
        throw new Error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      showNotification('error', 'Failed to delete notification');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const success = await markAllAsRead(notifications[0]?.userId || '');
      if (success) {
        setNotifications(
          notifications.map(notification => ({
            ...notification,
            read: true,
          }))
        );
        showNotification('success', 'All notifications marked as read');
      } else {
        throw new Error('Failed to mark all notifications as read');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      showNotification('error', 'Failed to mark all notifications as read');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button
          variant="outline"
          onClick={handleMarkAllAsRead}
          disabled={notifications.every(n => n.read)}
        >
          <Bell className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(notification => (
            <Card
              key={notification.id}
              className={cn('transition-colors', !notification.read && 'bg-muted/50')}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {notification.type === 'success' && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                      {notification.type === 'warning' && (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      {notification.type === 'destructive' && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      {notification.type === 'default' && (
                        <Info className="h-4 w-4 text-blue-500" />
                      )}
                      <p className="font-medium">{notification.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
