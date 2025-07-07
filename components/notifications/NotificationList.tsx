'use client';

import { Bell, Trash2 } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Notification {
  id: number;
  type: 'order' | 'promotion' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export function NotificationList({ notifications, onMarkAsRead, onDelete }: NotificationListProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <CardTitle>Notifications</CardTitle>
          {unreadCount > 0 && <Badge variant="secondary">{unreadCount} unread</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`flex items-start justify-between rounded-lg border p-4 ${
                !notification.read ? 'bg-muted/50' : ''
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      notification.type === 'order'
                        ? 'default'
                        : notification.type === 'promotion'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {notification.type}
                  </Badge>
                  <p className="font-semibold">{notification.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <Button variant="outline" size="sm" onClick={() => onMarkAsRead(notification.id)}>
                    Mark as read
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(notification.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center text-muted-foreground">No notifications</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
