import React, { useState } from 'react';

const FILTERS = [
  { key: 'case', label: '📁 Case Updates' },
  { key: 'lawyer', label: '👨‍⚖️ Lawyer Responses' },
  { key: 'doc', label: '🧾 Document Actions' },
  { key: 'sql', label: '🧩 SQL Reminders' },
  { key: 'admin', label: '🏢 Admin Alerts' },
];

const ICONS = {
  case: '📩',
  lawyer: '👨‍⚖️',
  doc: '🧾',
  sql: '🧩',
  admin: '🏢',
  alert: '⚠️',
  success: '✅',
};

const mockNotifications = [
  {
    id: 'NOTIF_1',
    type: 'sql',
    title: 'SQL Expiry Alert',
    message: 'Your SQL level expired on 22 June. Please reverify via EDR to avoid service interruption.',
    timestamp: '2025-06-26T16:42:00Z',
    linkedEntity: null,
    priority: true,
    unread: true,
    action: 'reverify',
    color: 'red',
  },
  {
    id: 'NOTIF_2',
    type: 'case',
    title: 'Case Update: Hearing scheduled',
    message: 'Your lawyer submitted a new document for CASE-0143',
    timestamp: '2025-06-25T10:00:00Z',
    linkedEntity: 'case_0143',
    priority: false,
    unread: true,
    action: 'view_case',
    color: 'blue',
  },
  {
    id: 'NOTIF_3',
    type: 'lawyer',
    title: 'Lawyer Response',
    message: 'Your lawyer replied to your message.',
    timestamp: '2025-06-24T09:00:00Z',
    linkedEntity: 'chat_lawyer',
    priority: false,
    unread: false,
    action: 'open_chat',
    color: 'green',
  },
  {
    id: 'NOTIF_4',
    type: 'doc',
    title: 'Document Verified',
    message: 'Your uploaded document "FIR Copy" has been verified.',
    timestamp: '2025-06-23T14:00:00Z',
    linkedEntity: 'doc_fir',
    priority: false,
    unread: false,
    action: 'view_doc',
    color: 'green',
  },
  {
    id: 'NOTIF_5',
    type: 'admin',
    title: 'Admin Notice',
    message: 'System maintenance scheduled for 30 June.',
    timestamp: '2025-06-22T08:00:00Z',
    linkedEntity: null,
    priority: false,
    unread: true,
    action: null,
    color: 'yellow',
  },
];

const colorMap = {
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  gray: 'bg-gray-100 text-gray-700',
};

const NotificationsTab = ({ notifications = mockNotifications }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifs, setNotifs] = useState(notifications);

  // Priority alerts sticky at top
  const priorityAlerts = notifs.filter(n => n.priority);
  const filtered = notifs.filter(n =>
    activeFilter === 'all' || n.type === activeFilter
  ).filter(n => !n.priority);

  // Actions
  const markAsRead = id => setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  const deleteNotif = id => setNotifs(prev => prev.filter(n => n.id !== id));
  const snoozeNotif = id => setNotifs(prev => prev.map(n => n.id === id ? { ...n, snoozed: true } : n));

  // Action buttons
  const renderAction = notif => {
    if (notif.action === 'reverify') {
      return <button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded">🔁 Reverify Now</button>;
    }
    if (notif.action === 'view_case') {
      return <a href="#" className="ml-2 text-blue-600 underline text-xs">🔗 View Case</a>;
    }
    if (notif.action === 'open_chat') {
      return <a href="#" className="ml-2 text-green-600 underline text-xs">🔗 Open Lawyer Chat</a>;
    }
    if (notif.action === 'view_doc') {
      return <a href="#" className="ml-2 text-blue-600 underline text-xs">🔗 View Document</a>;
    }
    return null;
  };

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-lg font-bold mb-4">🔔 Notification Center</h2>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded text-xs font-semibold ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveFilter('all')}
        >All</button>
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`px-3 py-1 rounded text-xs font-semibold ${activeFilter === f.key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveFilter(f.key)}
          >{f.label}</button>
        ))}
      </div>
      {/* Priority Alerts */}
      {priorityAlerts.length > 0 && (
        <div className="mb-4 space-y-2">
          {priorityAlerts.map(n => (
            <div key={n.id} className={`flex items-center p-3 rounded shadow-sm font-semibold ${colorMap[n.color] || 'bg-red-100 text-red-700'}`}> 
              <span className="text-2xl mr-3">{ICONS[n.type] || ICONS.alert}</span>
              <div className="flex-1">
                <div>{n.title}</div>
                <div className="text-xs font-normal">{n.message}</div>
              </div>
              {renderAction(n)}
            </div>
          ))}
        </div>
      )}
      {/* Notification List */}
      <div className="space-y-2">
        {filtered.length === 0 && <div className="text-gray-400">No notifications found.</div>}
        {filtered.map(n => (
          <div key={n.id} className={`flex items-center p-3 rounded shadow-sm ${colorMap[n.color] || 'bg-gray-100 text-gray-700'} ${n.unread ? 'border-l-4 border-blue-500' : ''}`}> 
            <span className="text-2xl mr-3">{ICONS[n.type] || ICONS.alert}</span>
            <div className="flex-1">
              <div className="font-semibold">{n.title}</div>
              <div className="text-xs">{n.message}</div>
              <div className="text-xs text-gray-500 mt-1">{new Date(n.timestamp).toLocaleString()}</div>
            </div>
            {renderAction(n)}
            <button className="ml-2 text-xs text-green-700 hover:underline" onClick={() => markAsRead(n.id)}>Mark as Read</button>
            <button className="ml-2 text-xs text-red-700 hover:underline" onClick={() => deleteNotif(n.id)}>🗑️</button>
            <button className="ml-2 text-xs text-yellow-700 hover:underline" onClick={() => snoozeNotif(n.id)}>Snooze 24h</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotificationsTab; 