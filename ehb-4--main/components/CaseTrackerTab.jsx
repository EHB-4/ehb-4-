import React, { useState } from 'react';

// Mock data for demonstration
const mockCases = [
  { id: 'CASE-1743', title: 'Property Dispute', status: 'Ongoing', assignedLawyer: 'Barrister Sana', sql_level: 'High' },
  { id: 'CASE-1744', title: 'Family Law', status: 'Waiting', assignedLawyer: 'Barrister Hamza', sql_level: 'Normal' },
];
const mockTimeline = {
  'CASE-1743': [
    {
      date: '2025-06-26T14:35:00Z',
      by: 'Lawyer',
      message: 'Hearing confirmed for 1 July',
      statusChange: { from: 'Waiting', to: 'Ongoing' },
      attachment: 'hearing-summon.pdf',
    },
    {
      date: '2025-06-25T10:00:00Z',
      by: 'Admin',
      message: 'Case assigned to Barrister Sana',
      statusChange: { from: 'Unassigned', to: 'Waiting' },
    },
    {
      date: '2025-06-24T09:00:00Z',
      by: 'User',
      message: 'Case submitted by user',
    },
  ],
  'CASE-1744': [
    {
      date: '2025-06-20T12:00:00Z',
      by: 'User',
      message: 'Case submitted by user',
    },
  ],
};

const ICONS = {
  document: '📁',
  status: '🔄',
  lawyer: '👩‍⚖️',
  admin: '🚨',
  default: '📝',
};

const CaseTrackerTab = ({ userRole = 'User', userCases = mockCases, userTimeline = mockTimeline }) => {
  const [selectedCase, setSelectedCase] = useState(userCases[0]?.id || '');
  const [filters, setFilters] = useState({ status: false, lawyer: false, admin: false });

  const timeline = (userTimeline[selectedCase] || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filtering logic
  const filteredTimeline = timeline.filter(entry => {
    if (filters.status && !entry.statusChange) return false;
    if (filters.lawyer && entry.by !== 'Lawyer') return false;
    if (filters.admin && entry.by !== 'Admin') return false;
    return true;
  });

  // Info card data
  const caseInfo = userCases.find(c => c.id === selectedCase);

  // Icon logic
  const getIcon = entry => {
    if (entry.attachment) return ICONS.document;
    if (entry.statusChange) return ICONS.status;
    if (entry.by === 'Lawyer') return ICONS.lawyer;
    if (entry.by === 'Admin') return ICONS.admin;
    return ICONS.default;
  };

  return (
    <section className="max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h2 className="text-lg font-bold">📈 Case Progress Tracker</h2>
        {/* Info Card */}
        {caseInfo && (
          <div className="bg-gray-50 border rounded p-3 text-xs md:text-sm min-w-[220px]">
            <div><span className="font-semibold">Case:</span> {caseInfo.id}</div>
            <div><span className="font-semibold">Title:</span> {caseInfo.title}</div>
            <div><span className="font-semibold">Status:</span> {caseInfo.status}</div>
            <div><span className="font-semibold">Assigned Lawyer:</span> {caseInfo.assignedLawyer}</div>
            <div><span className="font-semibold">SQL Level:</span> {caseInfo.sql_level}</div>
          </div>
        )}
      </div>
      {/* Select Case Dropdown */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Select a Case to View Timeline</label>
        <select value={selectedCase} onChange={e => setSelectedCase(e.target.value)} className="border rounded px-3 py-2 w-full md:w-80">
          {userCases.map(c => <option key={c.id} value={c.id}>{c.title} ({c.id})</option>)}
        </select>
      </div>
      {/* Entry Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <label className="flex items-center gap-1 text-xs">
          <input type="checkbox" checked={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.checked }))} />
          Show only status changes
        </label>
        <label className="flex items-center gap-1 text-xs">
          <input type="checkbox" checked={filters.lawyer} onChange={e => setFilters(f => ({ ...f, lawyer: e.target.checked }))} />
          Show only lawyer updates
        </label>
        <label className="flex items-center gap-1 text-xs">
          <input type="checkbox" checked={filters.admin} onChange={e => setFilters(f => ({ ...f, admin: e.target.checked }))} />
          Show only admin remarks
        </label>
      </div>
      {/* Timeline View */}
      <div className="border-l-2 border-blue-200 pl-6 space-y-8 relative">
        {filteredTimeline.length === 0 && <div className="text-gray-400">No timeline entries found.</div>}
        {filteredTimeline.map((entry, idx) => (
          <div key={idx} className="relative">
            <span className="absolute -left-7 top-2 text-2xl">{getIcon(entry)}</span>
            <div className="flex flex-col md:flex-row md:items-center md:gap-2">
              <span className="font-semibold text-gray-800">{entry.by}</span>
              <span className="text-xs text-gray-400">{new Date(entry.date).toLocaleString()}</span>
            </div>
            <div className="text-gray-700 mb-1">{entry.message}</div>
            {entry.statusChange && (
              <div className="text-xs text-blue-700 mb-1">Status changed from <b>{entry.statusChange.from}</b> to <b>{entry.statusChange.to}</b></div>
            )}
            {entry.attachment && (
              <a href={entry.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline">📎 View Attachment</a>
            )}
          </div>
        ))}
      </div>
      {/* Add Entry (Lawyer/Admin only) */}
      {(userRole === 'Lawyer' || userRole === 'Admin') && (
        <div className="mt-8 bg-gray-50 border rounded p-4">
          <div className="font-semibold mb-2">Add Timeline Entry (Demo Only)</div>
          <input type="text" placeholder="Message" className="border rounded px-3 py-2 w-full mb-2" />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">Add Entry</button>
        </div>
      )}
    </section>
  );
};

export default CaseTrackerTab; 