import React, { useState } from 'react';

const STATUS_COLORS = {
  Submitted: 'bg-gray-100 text-gray-700',
  'In Review': 'bg-yellow-100 text-yellow-800',
  Ongoing: 'bg-blue-100 text-blue-800',
  Resolved: 'bg-green-100 text-green-800',
  Escalated: 'bg-red-100 text-red-800',
};
const SQL_COLORS = {
  Free: 'bg-gray-300 text-gray-800',
  Basic: 'bg-blue-200 text-blue-800',
  Normal: 'bg-green-200 text-green-800',
  High: 'bg-yellow-200 text-yellow-800',
  VIP: 'bg-yellow-100 text-yellow-700 border border-yellow-400',
};
const mockCases = [
  { id: 'CASE-001', user: { name: 'Ali Raza', id: 'U001' }, lawyer: { name: 'Hamza Ali', id: 'L001' }, type: 'Civil', status: 'Ongoing', area: 'Lahore', sql: 'Normal', submission: '2025-06-01', details: 'Property dispute', franchise: 'Lahore Franchise', timeline: [{ step: 'Submitted', by: 'User', date: '2025-06-01' }, { step: 'Lawyer Assigned', by: 'Admin', date: '2025-06-02' }, { step: 'Docs Uploaded', by: 'User', date: '2025-06-03' }], comments: [] },
  { id: 'CASE-002', user: { name: 'Sara Khan', id: 'U002' }, lawyer: null, type: 'Criminal', status: 'Submitted', area: 'Karachi', sql: 'VIP', submission: '2025-06-05', details: 'Fraud complaint', franchise: 'Karachi Franchise', timeline: [{ step: 'Submitted', by: 'User', date: '2025-06-05' }], comments: [] },
  { id: 'CASE-003', user: { name: 'Bilal Ahmed', id: 'U003' }, lawyer: { name: 'Sana Tariq', id: 'L002' }, type: 'Family', status: 'Resolved', area: 'Islamabad', sql: 'High', submission: '2025-05-10', details: 'Child custody', franchise: 'Islamabad Franchise', timeline: [{ step: 'Submitted', by: 'User', date: '2025-05-10' }, { step: 'Lawyer Assigned', by: 'Admin', date: '2025-05-11' }, { step: 'Resolved', by: 'Lawyer', date: '2025-05-20' }], comments: [{ by: 'Admin', text: 'Case closed successfully.', date: '2025-05-21' }] },
];
const mockLawyers = [
  { id: 'L001', name: 'Hamza Ali', city: 'Lahore', specialty: 'Civil' },
  { id: 'L002', name: 'Sana Tariq', city: 'Islamabad', specialty: 'Family' },
];
const AREAS = ['Lahore', 'Karachi', 'Islamabad'];
const TYPES = ['Civil', 'Criminal', 'Property', 'Family'];
const SQL_LEVELS = ['Free', 'Basic', 'Normal', 'High', 'VIP'];
const STATUS = ['Submitted', 'In Review', 'Ongoing', 'Resolved', 'Escalated'];

const CasesManagement = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sqlFilter, setSqlFilter] = useState('');
  const [viewCase, setViewCase] = useState(null);
  const [reassignCase, setReassignCase] = useState(null);
  const [timelineCase, setTimelineCase] = useState(null);

  // Filtered cases
  const filtered = mockCases.filter(c =>
    (!search || c.id.toLowerCase().includes(search.toLowerCase()) || c.user.name.toLowerCase().includes(search.toLowerCase()) || (c.lawyer && c.lawyer.name.toLowerCase().includes(search.toLowerCase()))) &&
    (!statusFilter || c.status === statusFilter) &&
    (!areaFilter || c.area === areaFilter) &&
    (!typeFilter || c.type === typeFilter) &&
    (!sqlFilter || c.sql === sqlFilter)
  );

  return (
    <section>
      <h2 className="text-lg font-bold mb-4">⚖️ Cases Management</h2>
      {/* Filters & Search */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input type="text" placeholder="Search by Case ID, User, or Lawyer" value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-3 py-2 text-sm" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Status</option>
          {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={areaFilter} onChange={e => setAreaFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Areas</option>
          {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Types</option>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={sqlFilter} onChange={e => setSqlFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All SQL Levels</option>
          {SQL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      {/* Cases Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">📁 Case ID</th>
              <th className="p-2">👤 User</th>
              <th className="p-2">👨‍⚖️ Assigned Lawyer</th>
              <th className="p-2">🗂️ Type</th>
              <th className="p-2">🟡 Status</th>
              <th className="p-2">📍 Area</th>
              <th className="p-2">🛡 SQL</th>
              <th className="p-2">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="text-center text-gray-400 py-4">No cases found.</td></tr>
            )}
            {filtered.map(c => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{c.id}</td>
                <td className="p-2">{c.user.name} ({c.user.id})</td>
                <td className="p-2">{c.lawyer ? `${c.lawyer.name} (${c.lawyer.id})` : <span className="text-gray-400">Not Assigned</span>}</td>
                <td className="p-2">{c.type}</td>
                <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[c.status]}`}>{c.status}</span></td>
                <td className="p-2">{c.area}</td>
                <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-semibold ${SQL_COLORS[c.sql]}`}>{c.sql}</span></td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button className="text-blue-600 hover:underline" onClick={() => setViewCase(c)}>👁 View</button>
                  <button className="text-yellow-600 hover:underline" onClick={() => setReassignCase(c)}>🔁 Reassign</button>
                  <button className="text-green-600 hover:underline" onClick={() => setTimelineCase(c)}>📄 Timeline</button>
                  <button className="text-gray-600 hover:underline">🗑 Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Case Profile Modal */}
      {viewCase && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-2">Case Profile: {viewCase.id}</h3>
            <div className="mb-2">User: {viewCase.user.name} ({viewCase.user.id})</div>
            <div className="mb-2">Contact: 0300-0000000</div>
            <div className="mb-2">Assigned Lawyer: {viewCase.lawyer ? `${viewCase.lawyer.name} (${viewCase.lawyer.id})` : 'Not Assigned'}</div>
            <div className="mb-2">Type: {viewCase.type}</div>
            <div className="mb-2">Description: {viewCase.details}</div>
            <div className="mb-2">Submission Date: {viewCase.submission}</div>
            <div className="mb-2">SQL Level: {viewCase.sql}</div>
            <div className="mb-2">Area & Franchise: {viewCase.area} / {viewCase.franchise}</div>
            <div className="flex gap-2 mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setViewCase(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
      {/* Reassign Lawyer Panel */}
      {reassignCase && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-2">Reassign Lawyer for {reassignCase.id}</h3>
            <div className="mb-2">Current Lawyer: {reassignCase.lawyer ? `${reassignCase.lawyer.name} (${reassignCase.lawyer.id})` : 'Not Assigned'}</div>
            <div className="mb-2">Reason for Change:
              <input type="text" className="ml-2 border rounded px-2 py-1 w-2/3" placeholder="Enter reason..." />
            </div>
            <div className="mb-2">New Lawyer:
              <select className="ml-2 border rounded px-2 py-1">
                <option value="">Select Lawyer</option>
                {mockLawyers.map(l => <option key={l.id} value={l.id}>{l.name} ({l.city})</option>)}
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">Confirm & Log</button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setReassignCase(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Timeline Panel */}
      {timelineCase && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-2">Case Timeline: {timelineCase.id}</h3>
            <div className="border-l-2 border-blue-200 pl-6 space-y-4 mb-4">
              {timelineCase.timeline.map((t, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-4 top-1 text-2xl">📍</span>
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold text-gray-800">{t.step}</span>
                    <span className="text-xs text-gray-500">by {t.by}</span>
                    <span className="text-xs text-gray-400">{t.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="font-semibold mb-1">Admin Comments</div>
            <div className="mb-2 text-xs text-gray-500">{timelineCase.comments.length > 0 ? timelineCase.comments.map((c, i) => (<div key={i}>{c.by}: {c.text} ({c.date})</div>)) : 'No comments yet.'}</div>
            <div className="flex gap-2 mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setTimelineCase(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CasesManagement; 