import React, { useState } from 'react';
import MyCasesTab from './MyCasesTab';
import AssignedLawyerTab from './AssignedLawyerTab';
import UploadDocumentsTab from './UploadDocumentsTab';
import CaseTrackerTab from './CaseTrackerTab';
import SQLLevelTab from './SQLLevelTab';
import NotificationsTab from './NotificationsTab';
import StatsSummaryTab from './StatsSummaryTab';

const TABS = [
  { key: 'cases', label: 'My Legal Cases', icon: '📁' },
  { key: 'lawyer', label: 'Assigned Lawyer', icon: '👨‍⚖️' },
  { key: 'docs', label: 'Upload Documents', icon: '📤' },
  { key: 'tracker', label: 'Case Tracker', icon: '🧭' },
  { key: 'sql', label: 'SQL Level Info', icon: '🏅' },
  { key: 'notifications', label: 'Notifications', icon: '📧' },
  { key: 'stats', label: 'Stats Summary', icon: '📊' },
];

const DashboardMain = ({ user = { name: 'User', sql_level: 'Normal' } }) => {
  const [activeTab, setActiveTab] = useState('cases');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-56 bg-white border-r p-4 flex md:flex-col gap-2 md:gap-0 md:space-y-2 shadow-sm">
        <div className="mb-6 hidden md:block">
          <span className="font-bold text-lg">Dashboard</span>
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
          <div className="text-xl font-bold">Welcome, {user.name}</div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800`}>SQL Level: {user.sql_level}</span>
        </div>
        {/* Tab Content */}
        {activeTab === 'cases' && <MyCasesTab />}
        {activeTab === 'lawyer' && <AssignedLawyerTab />}
        {activeTab === 'docs' && <UploadDocumentsTab />}
        {activeTab === 'tracker' && <CaseTrackerTab />}
        {activeTab === 'sql' && <SQLLevelTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'stats' && <StatsSummaryTab />}
      </main>
    </div>
  );
};

export default DashboardMain; 