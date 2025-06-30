import React, { useState } from 'react';
import HomeWidgets from './HomeWidgets';

const TABS = [
  { key: 'home', label: 'Dashboard Home', icon: '🏠' },
  { key: 'users', label: 'Users', icon: '👤' },
  { key: 'lawyers', label: 'Lawyers', icon: '👨‍⚖️' },
  { key: 'cases', label: 'Cases', icon: '⚖️' },
  { key: 'docs', label: 'Documents', icon: '🧾' },
  { key: 'sql', label: 'SQL Queue', icon: '🧪' },
  { key: 'complaints', label: 'Complaints', icon: '📢' },
  { key: 'analytics', label: 'Analytics', icon: '📊' },
  { key: 'settings', label: 'Settings', icon: '⚙️' },
];

const AdminDashboardMain = ({ admin = { name: 'Admin User', role: 'Corporate Admin' } }) => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-white border-r p-4 flex md:flex-col gap-2 md:gap-0 md:space-y-2 shadow-sm">
        <div className="mb-6 hidden md:block">
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`flex items-center gap-2 px-3 py-2 rounded text-left w-full font-medium ${activeTab === tab.key ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl font-bold">Welcome, {admin.name}</div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800`}>Role: {admin.role}</span>
        </div>
        {/* Tab Content */}
        {activeTab === 'home' && <HomeWidgets />}
        {activeTab !== 'home' && (
          <div className="bg-white border rounded p-8 text-gray-500 text-center">{TABS.find(t => t.key === activeTab)?.label} section coming soon...</div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardMain; 