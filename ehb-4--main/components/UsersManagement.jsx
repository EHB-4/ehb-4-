import React, { useState } from 'react';

const SQL_COLORS = {
  Free: 'bg-gray-300 text-gray-800',
  Basic: 'bg-blue-200 text-blue-800',
  Normal: 'bg-green-200 text-green-800',
  High: 'bg-yellow-200 text-yellow-800',
  VIP: 'bg-yellow-100 text-yellow-700 border border-yellow-400',
};
const STATUS_COLORS = {
  Active: 'bg-green-100 text-green-800',
  Blocked: 'bg-red-100 text-red-800',
  Pending: 'bg-gray-100 text-gray-700',
};
const mockUsers = [
  { id: 'U001', name: 'Ali Raza', email: 'ali@email.com', sql: 'Normal', area: 'Lahore', status: 'Active', kyc: true, kycDate: '2025-01-10', sqlTimeline: ['Free', 'Basic', 'Normal'], cases: ['CASE-1', 'CASE-2'], franchise: 'Lahore Franchise', phone: '0300-1234567' },
  { id: 'U002', name: 'Sara Khan', email: 'sara@email.com', sql: 'VIP', area: 'Karachi', status: 'Active', kyc: true, kycDate: '2025-02-15', sqlTimeline: ['Free', 'Basic', 'Normal', 'High', 'VIP'], cases: ['CASE-3'], franchise: 'Karachi Franchise', phone: '0311-9876543' },
  { id: 'U003', name: 'Bilal Ahmed', email: 'bilal@email.com', sql: 'Free', area: 'Islamabad', status: 'Blocked', kyc: false, kycDate: '', sqlTimeline: ['Free'], cases: [], franchise: 'Islamabad Franchise', phone: '0322-5555555' },
];
const AREAS = ['Lahore', 'Karachi', 'Islamabad'];
const SQL_LEVELS = ['Free', 'Basic', 'Normal', 'High', 'VIP'];
const STATUS = ['Active', 'Blocked', 'Pending'];

const UsersManagement = () => {
  const [search, setSearch] = useState('');
  const [sqlFilter, setSqlFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  // Filtered users
  const filtered = mockUsers.filter(u =>
    (!search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.id.toLowerCase().includes(search.toLowerCase())) &&
    (!sqlFilter || u.sql === sqlFilter) &&
    (!statusFilter || u.status === statusFilter) &&
    (!areaFilter || u.area === areaFilter)
  );

  return (
    <section>
      <h2 className="text-lg font-bold mb-4">👤 Users Management</h2>
      {/* Search & Filters Bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input type="text" placeholder="Search by name, email, or ID" value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-3 py-2 text-sm" />
        <select value={sqlFilter} onChange={e => setSqlFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All SQL Levels</option>
          {SQL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Status</option>
          {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={areaFilter} onChange={e => setAreaFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Areas</option>
          {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">🆔 User ID</th>
              <th className="p-2">👤 Name</th>
              <th className="p-2">📧 Email</th>
              <th className="p-2">🛡️ SQL Level</th>
              <th className="p-2">📍 Area</th>
              <th className="p-2">🟢 Status</th>
              <th className="p-2">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center text-gray-400 py-4">No users found.</td></tr>
            )}
            {filtered.map(u => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-semibold ${SQL_COLORS[u.sql]}`}>{u.sql}</span></td>
                <td className="p-2">{u.area}</td>
                <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[u.status]}`}>{u.status}</span></td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button className="text-blue-600 hover:underline" onClick={() => setViewUser(u)}>👁 View</button>
                  <button className="text-green-600 hover:underline" onClick={() => setEditUser(u)}>✏️ Edit</button>
                  <button className="text-red-600 hover:underline">🛑 Block</button>
                  <button className="text-yellow-600 hover:underline">⬆ Upgrade SQL</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* View Profile Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-2">User Profile: {viewUser.name}</h3>
            <div className="mb-2 text-xs text-gray-500">ID: {viewUser.id}</div>
            <div className="mb-2">Email: {viewUser.email}</div>
            <div className="mb-2">Phone: {viewUser.phone}</div>
            <div className="mb-2">KYC Status: {viewUser.kyc ? '✅ Verified' : '❌ Not Verified'} {viewUser.kycDate && <span className="text-xs text-gray-400">({viewUser.kycDate})</span>}</div>
            <div className="mb-2">SQL Timeline: {viewUser.sqlTimeline.join(' → ')}</div>
            <div className="mb-2">Active Cases: {viewUser.cases.length > 0 ? viewUser.cases.join(', ') : 'None'}</div>
            <div className="mb-2">Linked Franchise: {viewUser.franchise}</div>
            <div className="flex gap-2 mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setViewUser(null)}>Close</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Download Profile (PDF)</button>
            </div>
          </div>
        </div>
      )}
      {/* Edit/Upgrade Panel */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-2">Edit User: {editUser.name}</h3>
            <div className="mb-2">Area/Franchise:
              <select className="ml-2 border rounded px-2 py-1" defaultValue={editUser.area}>
                {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="mb-2">SQL Level:
              <select className="ml-2 border rounded px-2 py-1" defaultValue={editUser.sql}>
                {SQL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="mb-2">Block/Unblock:
              <select className="ml-2 border rounded px-2 py-1" defaultValue={editUser.status}>
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <div className="mb-2">Reason (for SQL/Status change):
              <input type="text" className="ml-2 border rounded px-2 py-1 w-2/3" placeholder="Enter reason..." />
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setEditUser(null)}>Cancel</button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UsersManagement; 