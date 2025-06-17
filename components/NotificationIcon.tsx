import React, { useState } from 'react';

// Placeholder notification data (in a real app, fetch from backend)
const notifications = [
  { id: 1, message: 'New order received', time: '2 hours ago' },
  { id: 2, message: 'Product out of stock', time: '1 day ago' },
];

export default function NotificationIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Notifications"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Notifications</h3>
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li key={notification.id} className="text-sm">
                <p>{notification.message}</p>
                <p className="text-gray-500">{notification.time}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// AI Guidance: This component displays a notification icon with a dropdown.
// In a real app, notifications are fetched from the backend. 