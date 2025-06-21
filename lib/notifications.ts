import { useState, useCallback, useEffect } from 'react';

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

// Simple notification display function
export const showNotification = (type: NotificationType, message: string) => {
  // Create a simple notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
    type === 'success'
      ? 'bg-green-500 text-white'
      : type === 'error'
        ? 'bg-red-500 text-white'
        : type === 'warning'
          ? 'bg-yellow-500 text-black'
          : 'bg-blue-500 text-white'
  }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
};

// Create notification
export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: NotificationType = 'default'
) => {
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        title,
        message,
        type,
        time: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create notification');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

// Mark notification as read
export const markAsRead = async (notificationId: string) => {
  try {
    const response = await fetch(`/api/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }

    return await response.json();
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Delete notification
export const deleteNotification = async (notificationId: string) => {
  try {
    const response = await fetch(`/api/notifications/${notificationId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete notification');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllAsRead = async (userId: string) => {
  try {
    const response = await fetch(`/api/notifications/${userId}/read-all`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error('Failed to mark all notifications as read');
    }

    return await response.json();
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// EMO Notification Types
export interface EMONotification {
  id: string;
  userId: string;
  type:
    | 'PRODUCT_APPROVED'
    | 'PRODUCT_REJECTED'
    | 'NEW_ORDER'
    | 'COMPLAINT_UPDATED'
    | 'WALLET_CREDIT'
    | 'SYSTEM_ALERT';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: string;
  expiresAt?: string;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  productUpdates: boolean;
  orderUpdates: boolean;
  complaintUpdates: boolean;
  walletUpdates: boolean;
  systemAlerts: boolean;
}

// Notification Service Class
export class NotificationService {
  private static instance: NotificationService;
  private eventSource: EventSource | null = null;
  private listeners: Map<string, (notification: EMONotification) => void> = new Map();

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  connect(userId: string): void {
    if (this.eventSource) {
      this.disconnect();
    }

    try {
      this.eventSource = new EventSource(`/api/notifications/stream?userId=${userId}`);

      this.eventSource.onmessage = event => {
        try {
          const notification: EMONotification = JSON.parse(event.data);
          this.handleNotification(notification);
        } catch (error) {
          console.error('Error parsing notification:', error);
        }
      };

      this.eventSource.onerror = error => {
        console.error('EventSource error:', error);
        // Reconnect after 5 seconds
        setTimeout(() => this.connect(userId), 5000);
      };
    } catch (error) {
      console.error('Error connecting to notification stream:', error);
    }
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  addListener(id: string, callback: (notification: EMONotification) => void): void {
    this.listeners.set(id, callback);
  }

  removeListener(id: string): void {
    this.listeners.delete(id);
  }

  private handleNotification(notification: EMONotification): void {
    // Notify all listeners
    this.listeners.forEach(callback => {
      try {
        callback(notification);
      } catch (error) {
        console.error('Error in notification listener:', error);
      }
    });

    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      this.showBrowserNotification(notification);
    }
  }

  private showBrowserNotification(notification: EMONotification): void {
    try {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id,
      });
    } catch (error) {
      console.error('Error showing browser notification:', error);
    }
  }

  async requestPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  async getNotifications(params?: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
  }): Promise<{ notifications: EMONotification[]; pagination: any }> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.unreadOnly) searchParams.append('unreadOnly', 'true');

      const response = await fetch(`/api/notifications?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch notifications');

      return await response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return { notifications: [], pagination: {} };
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, { method: 'PATCH' });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      await fetch('/api/notifications/read-all', { method: 'PATCH' });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await fetch(`/api/notifications/${notificationId}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  async getPreferences(): Promise<NotificationPreferences> {
    try {
      const response = await fetch('/api/notifications/preferences');
      if (!response.ok) throw new Error('Failed to fetch preferences');
      return await response.json();
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      throw error;
    }
  }

  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<void> {
    await this.request('/api/notifications/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  private async request(url: string, options?: RequestInit): Promise<any> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
  }
}

// Notification Hook
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<EMONotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const service = NotificationService.getInstance();

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const { notifications: fetchedNotifications } = await service.getNotifications();
      setNotifications(fetchedNotifications);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchNotifications();

    const handleNewNotification = (notification: EMONotification) => {
      setNotifications(prev => [notification, ...prev]);
    };

    const listenerId = `listener_${Date.now()}`;
    service.addListener(listenerId, handleNewNotification);

    return () => {
      service.removeListener(listenerId);
    };
  }, [fetchNotifications, service]);

  const markNotificationAsRead = useCallback(
    async (id: string) => {
      await service.markAsRead(id);
      setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
    },
    [service]
  );

  const deleteNotification = useCallback(
    async (id: string) => {
      await service.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    },
    [service]
  );

  const markAllNotificationsAsRead = useCallback(async () => {
    await service.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, [service]);

  return {
    notifications,
    isLoading,
    error,
    fetchNotifications,
    markNotificationAsRead,
    deleteNotification,
    markAllNotificationsAsRead,
  };
};
