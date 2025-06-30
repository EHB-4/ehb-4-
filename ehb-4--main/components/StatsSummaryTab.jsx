import React from 'react';

const mockStats = {
  sqlLevel: 'Normal', // Free, Basic, Normal, High, VIP
  kpis: [
    { label: 'Total Cases Submitted', value: 14, icon: '📁', tooltip: 'Includes all case types' },
    { label: 'Active Cases', value: 3, icon: '⏳', tooltip: 'Still ongoing' },
    { label: 'Cases Successfully Resolved', value: 9, icon: '✅', tooltip: 'Resolved via platform' },
    { label: 'Verified Documents Uploaded', value: 38, icon: '🧾', tooltip: 'Total across cases' },
    { label: 'SQL Upgrade Count', value: 2, icon: '🏅', tooltip: 'No. of SQL transitions' },
    { label: 'Lawyer Assigned Times', value: 5, icon: '👨‍⚖️', tooltip: 'Total unique lawyer connections' },
  ],
  caseActivity: [
    { month: 'Jan', cases: 1, resolved: 0, docs: 2, sql: 0 },
    { month: 'Feb', cases: 2, resolved: 1, docs: 3, sql: 1 },
    { month: 'Mar', cases: 3, resolved: 2, docs: 4, sql: 0 },
    { month: 'Apr', cases: 2, resolved: 2, docs: 5, sql: 0 },
    { month: 'May', cases: 3, resolved: 2, docs: 6, sql: 1 },
    { month: 'Jun', cases: 3, resolved: 2, docs: 7, sql: 0 },
  ],
  sqlJourney: [
    { date: 'Jan 2024', level: 'Free', by: '-', reason: 'New User' },
    { date: 'Mar 2024', level: 'Basic', by: 'PSS', reason: 'KYC Verified' },
    { date: 'Jul 2024', level: 'Normal', by: 'EDR', reason: 'Passed Legal Test' },
    { date: 'Feb 2025', level: 'High', by: 'Admin', reason: 'Manual Upgrade' },
  ],
  lawyerPerformance: [
    { name: 'Barrister Sana', cases: 4, rating: 4, avgResponse: 18 },
    { name: 'Mr. Adnan', cases: 2, rating: 5, avgResponse: 7 },
    { name: 'Advocate Nimra', cases: 1, rating: 3, avgResponse: 25 },
  ],
  franchiseLog: { complaints: 2, resolved: 2, delays: 0 },
};

const sqlAccess = {
  Free: ['Total Cases Submitted', 'Active Cases'],
  Basic: ['Total Cases Submitted', 'Active Cases', 'Verified Documents Uploaded'],
  Normal: 'all',
  High: 'all',
  VIP: 'all',
};

const StatsSummaryTab = ({ stats = mockStats }) => {
  // Access control
  const allowedKPIs = sqlAccess[stats.sqlLevel] === 'all'
    ? stats.kpis
    : stats.kpis.filter(k => sqlAccess[stats.sqlLevel].includes(k.label));

  // Bar chart data
  const maxCases = Math.max(...stats.caseActivity.map(m => m.cases));

  // Helper for stars
  const stars = n => Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < n ? 'text-yellow-400' : 'text-gray-300'}>★</span>
  ));

  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-lg font-bold mb-4">📊 Legal Stats & Summary</h2>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {allowedKPIs.map((k, i) => (
          <div key={i} className="bg-white border rounded p-4 flex flex-col items-center shadow hover:shadow-lg transition relative group">
            <span className="text-3xl mb-2">{k.icon}</span>
            <div className="text-2xl font-bold">{k.value}</div>
            <div className="text-xs text-gray-500 text-center">{k.label}</div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 pointer-events-none z-10">{k.tooltip}</div>
          </div>
        ))}
      </div>
      {/* Bar Chart */}
      {['Normal', 'High', 'VIP'].includes(stats.sqlLevel) && (
        <div className="mb-8">
          <div className="font-semibold mb-2">Case Activity Timeline (Last 6 Months)</div>
          <div className="flex items-end gap-4 h-40">
            {stats.caseActivity.map((m, i) => (
              <div key={i} className="flex flex-col items-center w-12">
                <div className="bg-blue-500 rounded-t w-full" style={{ height: `${(m.cases / maxCases) * 100 || 10}%` }} title={`Cases: ${m.cases}`} />
                <div className="text-xs mt-1">{m.month}</div>
                <div className="text-xs text-gray-500">{m.cases} cases</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* SQL Journey Timeline */}
      {['Normal', 'High', 'VIP'].includes(stats.sqlLevel) && (
        <div className="mb-8">
          <div className="font-semibold mb-2">SQL Journey Timeline</div>
          <div className="border-l-2 border-blue-200 pl-6 space-y-4">
            {stats.sqlJourney.map((j, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-4 top-1 text-2xl">🏅</span>
                <div className="flex gap-2 items-center">
                  <span className="font-semibold text-gray-800">{j.date}</span>
                  <span className="text-xs text-gray-500">{j.level} (by {j.by})</span>
                  <span className="text-xs text-gray-400">{j.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Lawyer Performance Snapshot */}
      {['Normal', 'High', 'VIP'].includes(stats.sqlLevel) && (
        <div className="mb-8">
          <div className="font-semibold mb-2">Lawyer Performance Snapshot</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.lawyerPerformance.map((l, i) => (
              <div key={i} className="bg-white border rounded p-4 flex flex-col items-center">
                <span className="text-lg font-bold mb-1">{l.name}</span>
                <span className="text-xs text-gray-500 mb-1">Cases: {l.cases}</span>
                <span className="mb-1">{stars(l.rating)}</span>
                <span className="text-xs text-gray-500">Avg Response: {l.avgResponse} hrs</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Franchise Interaction Log */}
      {['Normal', 'High', 'VIP'].includes(stats.sqlLevel) && (
        <div className="mb-8">
          <div className="font-semibold mb-2">Franchise Interaction Log</div>
          <div className="bg-white border rounded p-4 flex gap-6">
            <div>Complaints raised: <span className="font-bold">{stats.franchiseLog.complaints}</span></div>
            <div>Resolved: <span className="font-bold">{stats.franchiseLog.resolved}</span></div>
            <div>Delays: <span className="font-bold">{stats.franchiseLog.delays}</span></div>
          </div>
        </div>
      )}
      {/* Download Report Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow text-xs">Download Report PDF</button>
      </div>
    </section>
  );
};

export default StatsSummaryTab; 