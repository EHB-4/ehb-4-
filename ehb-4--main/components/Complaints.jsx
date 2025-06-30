import React, { useState } from 'react';

const STATUS_COLORS = {
  New: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Resolved: 'bg-green-100 text-green-800',
  Escalated: 'bg-red-100 text-red-800',
};
const URGENCY_COLORS = {
  Normal: 'bg-gray-100 text-gray-700',
  High: 'bg-orange-100 text-orange-800',
  Critical: 'bg-red-200 text-red-800',
};
const TYPES = ['Service', 'Behavior', 'Delay', 'Technical'];
const TARGETS = ['User', 'Lawyer', 'Franchise', 'System'];
const STATUS = ['New', 'In Progress', 'Resolved', 'Escalated'];
const URGENCY = ['Normal', 'High', 'Critical'];
const mockComplaints = [
  { id: 'CMP-001', from: 'Ali Raza', against: 'Hamza Ali (Lawyer)', type: 'Behavior', status: 'New', submitted: '2025-06-01 10:00', urgency: 'Normal', summary: 'Rude behavior during call', description: 'Lawyer was unprofessional during consultation.', proof: 'audio.mp3', assignedAdmin: 'Admin1', logs: [{ action: 'Submitted', by: 'Ali Raza', date: '2025-06-01 10:00' }] },
  { id: 'CMP-002', from: 'Sara Khan', against: 'Karachi Franchise', type: 'Service', status: 'Escalated', submitted: '2025-06-02 12:00', urgency: 'Critical', summary: 'No response from franchise', description: 'No one responded to my complaint for 2 days.', proof: 'screenshot.png', assignedAdmin: 'Admin2', logs: [{ action: 'Submitted', by: 'Sara Khan', date: '2025-06-02 12:00' }, { action: 'Escalated', by: 'System', date: '2025-06-03 18:00' }] },
  { id: 'CMP-003', from: 'Bilal Ahmed', against: 'System', type: 'Technical', status: 'Resolved', submitted: '2025-06-03 09:00', urgency: 'High', summary: 'App crash on upload', description: 'App crashes when uploading documents.', proof: '', assignedAdmin: 'Admin3', logs: [{ action: 'Submitted', by: 'Bilal Ahmed', date: '2025-06-03 09:00' }, { action: 'Resolved', by: 'Admin3', date: '2025-06-03 10:00' }] },
];

const Complaints = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [targetFilter, setTargetFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [viewComplaint, setViewComplaint] = useState(null);
  const [adminNote, setAdminNote] = useState('');

  // Stats widget
  const resolvedCount = mockComplaints.filter(c => c.status === 'Resolved').length;
  const avgTime = '8h'; // Mocked
  const resolvedPercent = Math.round((resolvedCount / mockComplaints.length) * 100);

  // Filtered complaints
  const filtered = mockComplaints.filter(c =>
    (!search || c.id.toLowerCase().includes(search.toLowerCase()) || c.from.toLowerCase().includes(search.toLowerCase()) || c.against.toLowerCase().includes(search.toLowerCase())) &&
    (!typeFilter || c.type === typeFilter) &&
    (!targetFilter || c.against.toLowerCase().includes(targetFilter.toLowerCase())) &&
    (!statusFilter || c.status === statusFilter) &&
    (!urgencyFilter || c.urgency === urgencyFilter)
  );

  return (
    <section>
      <h2 className="text-lg font-bold mb-4">📢 Complaints Resolution Hub</h2>
      {/* Stats Widget */}
      <div className="flex gap-4 mb-4">
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded font-semibold">Resolved: {resolvedPercent}%</div>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded font-semibold">Avg Resolution Time: {avgTime}</div>
      </div>
      {/* Filter & Search Panel */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input type="text" placeholder="Search by Complaint ID, User, or Lawyer" value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-3 py-2 text-sm" />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Types</option>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={targetFilter} onChange={e => setTargetFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Targets</option>
          {TARGETS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Status</option>
          {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={urgencyFilter} onChange={e => setUrgencyFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Urgency</option>
          {URGENCY.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
      {/* Complaints Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">🆔 Complaint ID</th>
              <th className="p-2">🙋‍♂️ From</th>
              <th className="p-2">🎯 Against</th>
              <th className="p-2">📝 Type</th>
              <th className="p-2">⏳ Status</th>
              <th className="p-2">🕒 Submitted</th>
              <th className="p-2">⚡ Urgency</th>
              <th className="p-2">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="text-center text-gray-400 py-4">No complaints found.</td></tr>
            )}
            {filtered.map(c => (
              <tr key={c.id} className={`border-b ${c.urgency === 'Critical' ? 'border-red-400' : ''}`}>
                <td className="p-2">{c.id}</td>
                <td className="p-2">{c.from}</td>
                <td className="p-2">{c.against}</td>
                <td className="p-2">{c.type}</td>
                <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[c.status]}`}>{c.status}</span></td>
                <td className="p-2">{c.submitted}</td>
                <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-semibold ${URGENCY_COLORS[c.urgency]}`}>{c.urgency}</span></td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button className="text-blue-600 hover:underline" onClick={() => setViewComplaint(c)}>👁 View</button>
                  <button className="text-green-600 hover:underline">⚡ Resolve</button>
                  <button className="text-yellow-600 hover:underline">⏫ Escalate</button>
                  <button className="text-red-600 hover:underline">🗑 Dismiss</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Complaint Detail Modal */}
      {viewComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg ${viewComplaint.urgency === 'Critical' ? 'border-2 border-red-400' : ''}`}>
            <h3 className="text-lg font-bold mb-2">Complaint: {viewComplaint.id}</h3>
            <div className="mb-2">Summary: {viewComplaint.summary}</div>
            <div className="mb-2">Description: {viewComplaint.description}</div>
            <div className="mb-2">Submitted By: {viewComplaint.from}</div>
            <div className="mb-2">Against: {viewComplaint.against}</div>
            <div className="mb-2">Proof/File: {viewComplaint.proof ? <a href="#" className="text-blue-600 underline">{viewComplaint.proof}</a> : 'None'}</div>
            <div className="mb-2">Current Status: <span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[viewComplaint.status]}`}>{viewComplaint.status}</span></div>
            <div className="mb-2">Assigned Admin: {viewComplaint.assignedAdmin}</div>
            <div className="mb-2">Complaint Logs:</div>
            <ul className="list-disc pl-6 text-xs mb-2">
              {viewComplaint.logs.map((l, i) => (
                <li key={i}>{l.action} by {l.by} ({l.date})</li>
              ))}
            </ul>
            {/* Admin Actions Panel */}
            <div className="mb-2 flex flex-col gap-2">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">⚡ Mark as Resolved</button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded">⏫ Escalate</button>
              <button className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded">🕒 Put On Hold</button>
              <input type="text" className="border rounded px-2 py-1 w-full" placeholder="Add admin note..." value={adminNote} onChange={e => setAdminNote(e.target.value)} />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded text-xs">Add Note</button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded" onClick={() => setViewComplaint(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Complaints; 