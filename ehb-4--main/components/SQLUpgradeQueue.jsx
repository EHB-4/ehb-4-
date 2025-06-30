import React, { useState } from 'react';

const SQL_COLORS = {
  Free: 'bg-gray-300 text-gray-800',
  Basic: 'bg-blue-200 text-blue-800',
  Normal: 'bg-green-200 text-green-800',
  High: 'bg-purple-200 text-purple-800',
  VIP: 'bg-yellow-100 text-yellow-700 border border-yellow-400',
};
const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Hold: 'bg-gray-100 text-gray-700',
};
const DEPTS = ['PSS', 'EDR', 'EMO'];
const SQL_LEVELS = ['Free', 'Basic', 'Normal', 'High', 'VIP'];
const STATUS = ['Pending', 'Approved', 'Rejected', 'Hold'];
const AREAS = ['Lahore', 'Karachi', 'Islamabad'];
const mockRequests = [
  { id: 'REQ-001', user: { name: 'Ali Raza', email: 'ali@email.com', role: 'User', area: 'Lahore' }, currentSQL: 'Normal', requestedSQL: 'High', dept: 'EDR', submitted: '2025-06-01', status: 'Pending', proof: 'EDR Test Passed', notes: '', history: [{ level: 'Free', date: '2024-01-01' }, { level: 'Basic', date: '2024-03-01' }, { level: 'Normal', date: '2024-07-01' }] },
  { id: 'REQ-002', user: { name: 'Sara Khan', email: 'sara@email.com', role: 'Lawyer', area: 'Karachi' }, currentSQL: 'High', requestedSQL: 'VIP', dept: 'PSS', submitted: '2025-06-05', status: 'Pending', proof: 'Franchise Endorsement', notes: '', history: [{ level: 'Free', date: '2024-01-01' }, { level: 'Basic', date: '2024-03-01' }, { level: 'Normal', date: '2024-07-01' }, { level: 'High', date: '2025-01-01' }] },
  { id: 'REQ-003', user: { name: 'Bilal Ahmed', email: 'bilal@email.com', role: 'User', area: 'Islamabad' }, currentSQL: 'Basic', requestedSQL: 'Normal', dept: 'EMO', submitted: '2025-06-10', status: 'Rejected', proof: 'KYC Incomplete', notes: 'Missing docs', history: [{ level: 'Free', date: '2024-01-01' }, { level: 'Basic', date: '2024-03-01' }] },
];

const SQLUpgradeQueue = () => {
  const [search, setSearch] = useState('');
  const [currentSQL, setCurrentSQL] = useState('');
  const [requestedSQL, setRequestedSQL] = useState('');
  const [dept, setDept] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('');
  const [viewReq, setViewReq] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [adminComment, setAdminComment] = useState('');

  // Filtered requests
  const filtered = mockRequests.filter(r =>
    (!search || r.user.email.toLowerCase().includes(search.toLowerCase()) || r.user.name.toLowerCase().includes(search.toLowerCase())) &&
    (!currentSQL || r.currentSQL === currentSQL) &&
    (!requestedSQL || r.requestedSQL === requestedSQL) &&
    (!dept || r.dept === dept) &&
    (!area || r.user.area === area) &&
    (!status || r.status === status)
  );

  return (
    <section>
      <h2 className="text-lg font-bold mb-4">🧪 SQL Upgrade Queue</h2>
      {/* Filter Panel */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input type="text" placeholder="Search by User ID or Email" value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-3 py-2 text-sm" />
        <select value={currentSQL} onChange={e => setCurrentSQL(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">Current SQL</option>
          {SQL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={requestedSQL} onChange={e => setRequestedSQL(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">Requested SQL</option>
          {SQL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={dept} onChange={e => setDept(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">Department</option>
          {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={area} onChange={e => setArea(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Areas</option>
          {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Status</option>
          {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {/* Upgrade Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">🆔 Request ID</th>
              <th className="p-2">👤 User</th>
              <th className="p-2">🛡 Current SQL</th>
              <th className="p-2">📈 Requested SQL</th>
              <th className="p-2">🏢 Dept</th>
              <th className="p-2">📅 Submitted On</th>
              <th className="p-2">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center text-gray-400 py-4">No requests found.</td></tr>
            )}
            {filtered.map(r => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.user.name} ({r.user.role})</td>
                <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-semibold ${SQL_COLORS[r.currentSQL]}`}>{r.currentSQL}</span></td>
                <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-semibold ${SQL_COLORS[r.requestedSQL]}`}>{r.requestedSQL}</span></td>
                <td className="p-2">{r.dept}</td>
                <td className="p-2">{r.submitted}</td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button className="text-blue-600 hover:underline" onClick={() => setViewReq(r)}>👁 View</button>
                  <button className="text-green-600 hover:underline">✔ Approve</button>
                  <button className="text-red-600 hover:underline">❌ Reject</button>
                  <button className="text-yellow-600 hover:underline">📝 Comment</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Review Request Modal */}
      {viewReq && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-2">Review SQL Upgrade Request: {viewReq.id}</h3>
            <div className="mb-2">Name: {viewReq.user.name}</div>
            <div className="mb-2">Email: {viewReq.user.email}</div>
            <div className="mb-2">Role: {viewReq.user.role}</div>
            <div className="mb-2">Area: {viewReq.user.area}</div>
            <div className="mb-2">Upgrade Path: {viewReq.history.map(h => h.level).join(' → ')} → <span className={`px-2 py-1 rounded text-xs font-semibold ${SQL_COLORS[viewReq.requestedSQL]}`}>{viewReq.requestedSQL}</span></div>
            <div className="mb-2">Submitted Proof: {viewReq.proof}</div>
            <div className="mb-2">Admin Notes: {viewReq.notes || 'None'}</div>
            <div className="mb-2">Upgrade History:</div>
            <ul className="list-disc pl-6 text-xs mb-2">
              {viewReq.history.map((h, i) => (
                <li key={i}>{h.level} - {h.date}</li>
              ))}
            </ul>
            {/* Action Panel */}
            <div className="mb-2 flex flex-col gap-2">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">Approve</button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded" onClick={() => setRejectReason('')}>Reject</button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded">Request Additional Proof</button>
              <input type="text" className="border rounded px-2 py-1 w-full" placeholder="Add admin comment..." value={adminComment} onChange={e => setAdminComment(e.target.value)} />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded text-xs">Add Comment</button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setViewReq(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SQLUpgradeQueue; 