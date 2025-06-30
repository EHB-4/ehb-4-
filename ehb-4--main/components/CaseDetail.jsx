import React from 'react';

/**
 * CaseDetail Component
 * Props:
 * - caseId: string
 * - title: string
 * - status: string (Ongoing, Waiting, Completed, Rejected, Escalated)
 * - submittedBy: string
 * - assignedLawyer: { name, id, contact, sql_level }
 * - description: string
 * - documents: array of { name, url }
 * - history: array of { date, by, message, attachment }
 * - lastUpdated: string (date)
 * - role: string (User, Lawyer, Admin, Franchise)
 * - isVerified: boolean (PSS/EDR completed)
 */

const statusColors = {
  Ongoing: 'bg-blue-100 text-blue-700',
  Waiting: 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
  Escalated: 'bg-orange-100 text-orange-700',
};

const sqlLevelColors = {
  Free: 'bg-gray-300 text-gray-800',
  Basic: 'bg-blue-200 text-blue-800',
  Normal: 'bg-green-200 text-green-800',
  High: 'bg-yellow-200 text-yellow-800',
  VIP: 'bg-purple-200 text-purple-800',
};

const CaseDetail = ({
  caseId,
  title,
  status,
  submittedBy,
  assignedLawyer = {},
  description,
  documents = [],
  history = [],
  lastUpdated,
  role = 'User',
  isVerified = false,
}) => {
  if (!isVerified) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center mt-6">
        <h2 className="text-xl font-bold text-yellow-700 mb-2">Access Restricted</h2>
        <p className="mb-2">Please complete PSS/EDR verification to view full case details.</p>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 mt-6" itemScope itemType="https://schema.org/LegalService">
      {/* SEO Tags */}
      <h1 className="text-2xl font-bold mb-2" itemProp="name">Legal Case Progress Tracker – Ref #{caseId}</h1>
      <meta name="description" content="Track the progress of your verified legal case including lawyer updates, status, and documents." />
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div>
          <span className="text-lg font-semibold text-gray-800">{title}</span>
          <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${sqlLevelColors[assignedLawyer.sql_level] || sqlLevelColors['Free']}`}>{assignedLawyer.sql_level || 'Free'}</span>
        </div>
        <div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>
        </div>
      </div>
      {/* Assigned Lawyer Info */}
      <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded border border-gray-200">
        <div className="font-semibold text-gray-700">Assigned Lawyer:</div>
        <div className="flex flex-col">
          <span className="text-gray-900">{assignedLawyer.name}</span>
          <span className="text-xs text-gray-500">SQL: {assignedLawyer.sql_level}</span>
          <span className="text-xs text-gray-500">Contact: {assignedLawyer.contact}</span>
        </div>
      </div>
      {/* Description */}
      <div className="mb-4">
        <div className="font-semibold text-gray-700 mb-1">Case Description</div>
        <div className="text-gray-800 whitespace-pre-line">{description}</div>
      </div>
      {/* Documents */}
      <div className="mb-4">
        <div className="font-semibold text-gray-700 mb-1">Uploaded Documents</div>
        <div className="flex flex-wrap gap-2">
          {documents.length === 0 && <span className="text-gray-400">No documents uploaded.</span>}
          {documents.map((doc, idx) => (
            <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" download className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold border border-blue-200 hover:bg-blue-200 transition">
              {doc.name}
            </a>
          ))}
        </div>
      </div>
      {/* Timeline */}
      <div className="mb-4">
        <div className="font-semibold text-gray-700 mb-2">Case Timeline</div>
        <ol className="border-l-2 border-blue-200 pl-4 space-y-4">
          {history.length === 0 && <li className="text-gray-400">No updates yet.</li>}
          {history.map((entry, idx) => (
            <li key={idx} className="relative">
              <span className="absolute -left-3 top-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-white"></span>
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <span className="font-semibold text-gray-800">{entry.by}</span>
                <span className="text-xs text-gray-400">{new Date(entry.date).toLocaleString()}</span>
              </div>
              <div className="text-gray-700 mb-1">{entry.message}</div>
              {entry.attachment && (
                <a href={entry.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline">View Attachment</a>
              )}
            </li>
          ))}
        </ol>
      </div>
      {/* Footer / Actions */}
      <div className="flex flex-wrap gap-3 mt-6">
        {(role === 'User' || role === 'Lawyer') && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">Upload New File</button>
        )}
        {role === 'User' && (
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded shadow">Request Admin Help</button>
        )}
        {role === 'Admin' && (
          <>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow">Update Status</button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow">Flag Case</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow">Reassign Lawyer</button>
          </>
        )}
        {role === 'Franchise' && (
          <span className="text-xs text-gray-500">Read-only view (VIP Franchise)</span>
        )}
      </div>
      <div className="text-xs text-gray-400 mt-4">Last updated: {new Date(lastUpdated).toLocaleString()}</div>
    </section>
  );
};

export default CaseDetail; 