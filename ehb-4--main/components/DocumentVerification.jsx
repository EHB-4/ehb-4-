import React, { useState } from 'react';

const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Verified: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};
const ROLE_COLORS = {
  User: 'bg-blue-100 text-blue-800',
  Lawyer: 'bg-purple-100 text-purple-800',
  Franchise: 'bg-pink-100 text-pink-800',
};
const DOC_TYPES = ['CNIC', 'Degree', 'License', 'Evidence', 'Court Notice'];
const STATUS = ['Pending', 'Verified', 'Rejected'];
const ROLES = ['User', 'Lawyer', 'Franchise'];
const mockDocs = [
  { id: 'DOC-001', by: { name: 'Ali Raza', id: 'U001', role: 'User' }, type: 'CNIC', status: 'Pending', date: '2025-06-01', file: 'cnic-ali.pdf', history: [{ action: 'Uploaded', by: 'Ali Raza', date: '2025-06-01' }], attempts: 1 },
  { id: 'DOC-002', by: { name: 'Hamza Ali', id: 'L001', role: 'Lawyer' }, type: 'License', status: 'Verified', date: '2025-05-20', file: 'license-hamza.pdf', history: [{ action: 'Uploaded', by: 'Hamza Ali', date: '2025-05-20' }, { action: 'Verified', by: 'Admin', date: '2025-05-21' }], attempts: 1 },
  { id: 'DOC-003', by: { name: 'Sara Khan', id: 'U002', role: 'User' }, type: 'Evidence', status: 'Rejected', date: '2025-06-10', file: 'evidence-sara.jpg', history: [{ action: 'Uploaded', by: 'Sara Khan', date: '2025-06-10' }, { action: 'Rejected', by: 'Admin', date: '2025-06-11', reason: 'Blurry image' }], attempts: 2 },
];

const DocumentVerification = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [viewDoc, setViewDoc] = useState(null);
  const [approveComment, setApproveComment] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  // Filtered docs
  const filtered = mockDocs.filter(d =>
    (!search || d.by.id.toLowerCase().includes(search.toLowerCase()) || d.by.name.toLowerCase().includes(search.toLowerCase())) &&
    (!typeFilter || d.type === typeFilter) &&
    (!statusFilter || d.status === statusFilter) &&
    (!roleFilter || d.by.role === roleFilter)
  );

  return (
    <section>
      <h2 className="text-lg font-bold mb-4">🧾 Document Verification</h2>
      {/* Filter Panel */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input type="text" placeholder="Search by User/Lawyer ID or Name" value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-3 py-2 text-sm" />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Doc Types</option>
          {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Status</option>
          {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Roles</option>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">📁 Doc ID</th>
              <th className="p-2">🧑 Submitted By</th>
              <th className="p-2">📄 Doc Type</th>
              <th className="p-2">⏳ Status</th>
              <th className="p-2">📅 Upload Date</th>
              <th className="p-2">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="text-center text-gray-400 py-4">No documents found.</td></tr>
            )}
            {filtered.map(d => (
              <tr key={d.id} className={`border-b ${d.status === 'Rejected' ? 'border-red-400' : ''}`}>
                <td className="p-2">{d.id}</td>
                <td className="p-2 flex items-center gap-2">{d.by.name} <span className={`px-2 py-1 rounded text-xs font-semibold ${ROLE_COLORS[d.by.role]}`}>{d.by.role}</span></td>
                <td className="p-2">{d.type}</td>
                <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[d.status]}`}>{d.status}</span></td>
                <td className="p-2">{d.date}</td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button className="text-blue-600 hover:underline" onClick={() => setViewDoc(d)}>👁 View</button>
                  {d.status === 'Pending' && <button className="text-green-600 hover:underline" onClick={() => setViewDoc(d)}>✔ Approve</button>}
                  {d.status === 'Pending' && <button className="text-red-600 hover:underline" onClick={() => setViewDoc(d)}>❌ Reject</button>}
                  <button className="text-yellow-600 hover:underline" onClick={() => setViewDoc(d)}>📝 Comment</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* View Document Modal */}
      {viewDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg ${viewDoc.status === 'Rejected' ? 'border-2 border-red-400' : ''}`}>
            <h3 className="text-lg font-bold mb-2">Document: {viewDoc.id}</h3>
            <div className="mb-2">Type: {viewDoc.type}</div>
            <div className="mb-2">Submitted By: {viewDoc.by.name} ({viewDoc.by.role})</div>
            <div className="mb-2">Upload Date: {viewDoc.date}</div>
            <div className="mb-2">Linked Entity: <a href="#" className="text-blue-600 underline">{viewDoc.by.id}</a></div>
            <div className="mb-2">Previous Attempts: {viewDoc.attempts}</div>
            {/* Preview (mock) */}
            <div className="mb-4 bg-gray-100 rounded p-4 text-center">[Preview: {viewDoc.file}]</div>
            {/* Approve/Reject Controls */}
            {viewDoc.status === 'Pending' && (
              <div className="mb-4 flex flex-col gap-2">
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded" onClick={() => setApproveComment('')}>Approve</button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded" onClick={() => setRejectReason('')}>Reject</button>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded">Request Reupload</button>
              </div>
            )}
            {/* Add Admin Comment */}
            <div className="mb-2">
              <input type="text" className="border rounded px-2 py-1 w-full" placeholder="Add admin comment..." />
              <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded text-xs">Add Comment</button>
            </div>
            {/* Document History Panel */}
            <div className="mt-4">
              <button className="text-xs text-blue-600 underline mb-2" onClick={() => setShowHistory(h => !h)}>{showHistory ? 'Hide' : 'Show'} Document History</button>
              {showHistory && (
                <div className="bg-gray-50 border rounded p-2 text-xs">
                  {viewDoc.history.map((h, i) => (
                    <div key={i} className="mb-1">{h.action} by {h.by} ({h.date}){h.reason && <> – <span className="text-red-600">{h.reason}</span></>}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setViewDoc(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DocumentVerification; 