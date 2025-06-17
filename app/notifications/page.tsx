import React from 'react';
import UserNotifications from '../../../components/UserNotifications';

// Placeholder data (in a real app, fetch from backend)
const notificationsData = [
  {
    id: 1,
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #123 has been shipped',
    timestamp: '2024-03-15T10:00:00Z',
    read: false,
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 20% off on your next purchase',
    timestamp: '2024-03-14T15:30:00Z',
    read: true,
  },
  {
    id: 3,
    type: 'system',
    title: 'Account Update',
    message: 'Your account information has been updated',
    timestamp: '2024-03-13T09:15:00Z',
    read: true,
  },
];

export default function NotificationsPage() {
  const handleMarkAsRead = (id: number) => {
    // In a real app, this would call the backend to mark the notification as read
    console.log('Marking notification as read:', id);
  };

  const handleDeleteNotification = (id: number) => {
    // In a real app, this would call the backend to delete the notification
    console.log('Deleting notification:', id);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications</h1>
      
      <UserNotifications
        notifications={notificationsData}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDeleteNotification}
      />
    </div>
  );
}

// AI Guidance: This page displays user notifications.
// In a real app, notifications would be fetched from the backend and updated in real-time. 