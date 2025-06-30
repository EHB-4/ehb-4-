import React, { useState } from 'react';

const SQL_COLORS = {
  Basic: 'bg-blue-200 text-blue-800',
  Normal: 'bg-green-200 text-green-800',
  High: 'bg-yellow-200 text-yellow-800',
  VIP: 'bg-yellow-100 text-yellow-700 border border-yellow-400',
};
const STATUS_COLORS = {
  Pending: 'bg-gray-100 text-gray-700',
  Verified: 'bg-green-100 text-green-800',
  Blacklisted: 'bg-red-100 text-red-800',
};
const mockLawyers = [
  { id: 'L001', name: 'Hamza Ali', bar: 'BAR-1234', city: 'Lahore', sql: 'High', status: 'Verified', docs: true, rating: 4.7, cases: 12, avgResponse: 10, kyc: true, kycId: 'KYC-001', kycEdu: 'LLB', kycPSS: true, email: 'hamza@law.com', contact: '0300-1111111', licenseAuth: 'Punjab Bar', licenseExp: '2026-01-01', practice: ['Civil', 'Corporate'], assignedCases: ['CASE-1', 'CASE-2'], sqlContrib: 8 },
  { id: 'L002', name: 'Sana Tariq', bar: 'BAR-5678', city: 'Karachi', sql: 'VIP', status: 'Pending', docs: true, rating: 4.9, cases: 20, avgResponse: 7, kyc: false, kycId: '', kycEdu: '', kycPSS: false, email: 'sana@law.com', contact: '0311-2222222', licenseAuth: 'Sindh Bar', licenseExp: '2025-09-01', practice: ['Criminal'], assignedCases: ['CASE-3'], sqlContrib: 12 },
  { id: 'L003', name: 'Adnan Rauf', bar: 'BAR-9999', city: 'Islamabad', sql: 'Normal', status: 'Blacklisted', docs: true, rating: 3.2, cases: 5, avgResponse: 25, kyc: true, kycId: 'KYC-003', kycEdu: 'LLM', kycPSS: true, email: 'adnan@law.com', contact: '0322-3333333', licenseAuth: 'Islamabad Bar', licenseExp: '2024-12-01', practice: ['Civil', 'Criminal'], assignedCases: [], sqlContrib: 2 },
];
const CITIES = ['Lahore', 'Karachi', 'Islamabad'];
const SQL_LEVELS = ['Basic', 'Normal', 'High', 'VIP'];
const STATUS = ['Pending', 'Verified', 'Blacklisted'];

const LawyersManagement = () => {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sqlFilter, setSqlFilter] = useState('');
  const [viewLawyer, setViewLawyer] = useState(null);
  const [approveLawyer, setApproveLawyer] = useState(null);

  // Filtered lawyers
  const filtered = mockLawyers.filter(l =>
    (!search || l.name.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase()) || l.bar.toLowerCase().includes(search.toLowerCase())) &&
    (!cityFilter || l.city === cityFilter) &&
    (!statusFilter || l.status === statusFilter) &&
    (!sqlFilter || l.sql === sqlFilter)
  );

  return (
    <section>
      <h2 className="text-lg font-bold mb-4">👨‍⚖️ Lawyers Management</h2>
      {/* Filters & Search */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input type="text" placeholder="Search by name, ID, or Bar No." value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-3 py-2 text-sm" />
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Cities</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Status</option>
          {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={sqlFilter} onChange={e => setSqlFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All SQL Levels</option>
          {SQL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      {/* Lawyers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">🆔 Lawyer ID</th>
              <th className="p-2">👨‍⚖️ Name</th>
              <th className="p-2">📜 Bar License</th>
              <th className="p-2">📍 City</th>
              <th className="p-2">🛡️ SQL Level</th>
              <th className="p-2">📁 Docs</th>
              <th className="p-2">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center text-gray-400 py-4">No lawyers found.</td></tr>
            )}
            {filtered.map(l => (
              <tr key={l.id} className={`border-b ${l.status === 'Verified' ? 'border-yellow-400' : ''}`}>
                <td className="p-2">{l.id}</td>
                <td className="p-2 flex items-center gap-2">{l.name} {l.status === 'Verified' && <span className="ml-1 text-yellow-500">✔️</span>}</td>
                <td className="p-2">{l.bar}</td>
                <td className="p-2">{l.city}</td>
                <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-semibold ${SQL_COLORS[l.sql]}`}>{l.sql}</span></td>
                <td className="p-2"><button className="text-blue-600 hover:underline">View</button></td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button className="text-blue-600 hover:underline" onClick={() => setViewLawyer(l)}>👁 View</button>
                  {l.status === 'Pending' && <button className="text-green-600 hover:underline" onClick={() => setApproveLawyer(l)}>✔ Approve</button>}
                  <button className="text-yellow-600 hover:underline">✏️ Edit</button>
                  <button className="text-red-600 hover:underline">❌ Suspend</button>
                  <button className="text-orange-600 hover:underline">⚠ Flag</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Lawyer Profile Modal */}
      {viewLawyer && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-2">Lawyer Profile: {viewLawyer.name}</h3>
            <div className="mb-2 text-xs text-gray-500">ID: {viewLawyer.id}</div>
            <div className="mb-2">Email: {viewLawyer.email}</div>
            <div className="mb-2">Contact: {viewLawyer.contact}</div>
            <div className="mb-2">Bar License: {viewLawyer.bar} ({viewLawyer.licenseAuth})</div>
            <div className="mb-2">License Expiry: {viewLawyer.licenseExp}</div>
            <div className="mb-2">KYC Status: {viewLawyer.kyc ? '✅ Verified' : '❌ Not Verified'} {viewLawyer.kycId && <span className="text-xs text-gray-400">({viewLawyer.kycId})</span>}</div>
            <div className="mb-2">Education: {viewLawyer.kycEdu || 'N/A'}</div>
            <div className="mb-2">PSS Verified: {viewLawyer.kycPSS ? '✅' : '❌'}</div>
            <div className="mb-2">Practice Areas: {viewLawyer.practice.join(', ')}</div>
            <div className="mb-2">Activity: {viewLawyer.cases} cases, Avg Rating: {viewLawyer.rating}, Avg Response: {viewLawyer.avgResponse} hrs</div>
            <div className="mb-2">Assigned Cases: {viewLawyer.assignedCases.length > 0 ? viewLawyer.assignedCases.join(', ') : 'None'}</div>
            <div className="mb-2">SQL Contribution: {viewLawyer.sqlContrib}</div>
            <div className="flex gap-2 mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setViewLawyer(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
      {/* Approval Panel for Pending Lawyers */}
      {approveLawyer && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-2">Approve Lawyer: {approveLawyer.name}</h3>
            <div className="mb-2">View all submitted documents: <button className="text-blue-600 underline">Open Docs</button></div>
            <div className="mb-2">Notes (optional): <input type="text" className="border rounded px-2 py-1 w-2/3" placeholder="Enter notes..." /></div>
            <div className="flex gap-2 mt-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">Approve</button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Reject</button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded">Hold</button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setApproveLawyer(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LawyersManagement; 