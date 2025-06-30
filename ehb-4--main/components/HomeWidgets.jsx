import React from 'react';

const widgets = [
  { label: 'Total Users', value: 1245, icon: '🔢', color: 'bg-blue-100 text-blue-800' },
  { label: 'Active Cases', value: 87, icon: '⚖️', color: 'bg-green-100 text-green-800', filter: true },
  { label: 'Lawyers Online', value: 12, icon: '👨‍⚖️', color: 'bg-purple-100 text-purple-800' },
  { label: 'Pending Docs', value: 23, icon: '🧾', color: 'bg-yellow-100 text-yellow-800' },
  { label: 'SQL Upgrade Requests', value: 7, icon: '🧪', color: 'bg-pink-100 text-pink-800' },
  { label: 'Complaints in Queue', value: 5, icon: '📢', color: 'bg-red-100 text-red-800' },
  { label: 'Daily Platform Stats', value: 'View', icon: '📊', color: 'bg-gray-100 text-gray-800', link: true },
];

const HomeWidgets = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {widgets.map((w, i) => (
        <div key={i} className={`flex flex-col items-center p-6 rounded-lg shadow bg-white hover:shadow-lg transition border-t-4 ${w.color}`}> 
          <span className="text-3xl mb-2">{w.icon}</span>
          <div className="text-2xl font-bold mb-1">{w.value}</div>
          <div className="text-sm text-gray-700 mb-2">{w.label}</div>
          {w.filter && (
            <select className="text-xs border rounded px-2 py-1">
              <option>All</option>
              <option>Ongoing</option>
              <option>Completed</option>
              <option>Escalated</option>
            </select>
          )}
          {w.link && (
            <a href="#" className="text-xs text-blue-600 underline mt-2">View Stats</a>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeWidgets; 