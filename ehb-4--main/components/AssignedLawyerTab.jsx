import React, { useState } from 'react';
import LawyerCard from './LawyerCard';

// Example props/data structure (replace with real API data in integration)
const exampleData = {
  caseId: 'CASE123',
  assignedLawyer: {
    id: 'LAWYER789',
    name: 'Barrister Hamza',
    SQLLevel: 'High',
    rating: 4.7,
    city: 'Lahore',
    contact: {
      email: 'hamza@ehblaw.com',
      phone: '03XX-XXXXXXX',
    },
  },
  assignmentDate: '2025-06-20',
  status: 'Ongoing',
  canChange: true,
  caseTitle: 'Property Dispute',
  timelineStatus: 'Initial hearing scheduled on 28 June',
  lawyerRemoved: false,
  userSQL: 'High', // Free, Normal, High, VIP
};

const AssignedLawyerTab = ({ data = exampleData }) => {
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [changeReason, setChangeReason] = useState('');
  const [changeSubmitted, setChangeSubmitted] = useState(false);

  // Access logic
  if (data.lawyerRemoved) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center mt-6">
        <h2 className="text-xl font-bold text-yellow-700 mb-2">Your previous lawyer is removed.</h2>
        <p className="mb-2">Admin will assign a new one shortly.</p>
      </div>
    );
  }
  if (!data.assignedLawyer) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mt-6">
        <h2 className="text-xl font-bold text-blue-700 mb-2">No lawyer assigned yet.</h2>
        <p className="mb-2">Your case is in the assignment queue.</p>
      </div>
    );
  }

  const isContactEnabled = ['High', 'VIP'].includes(data.userSQL);
  const canRequestChange = data.canChange;
  const assignmentDate = new Date(data.assignmentDate);
  const now = new Date();
  const daysSinceAssignment = Math.floor((now - assignmentDate) / (1000 * 60 * 60 * 24));
  const changeDisabled = !canRequestChange || daysSinceAssignment < 5;

  return (
    <section className="max-w-2xl mx-auto">
      {/* SEO Tag for public profile */}
      <h2 className="text-xl font-bold mb-4" itemProp="name">Assigned Lawyer: Verified by EHB</h2>
      {/* LawyerCard Display */}
      <LawyerCard
        name={data.assignedLawyer.name}
        specialty={data.caseTitle || 'Legal Expert'}
        license={data.assignedLawyer.id}
        city={data.assignedLawyer.city}
        rating={data.assignedLawyer.rating}
        sql_level={data.assignedLawyer.SQLLevel}
        verified_by={['EHB']}
      />
      {/* Contact Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow ${!isContactEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isContactEnabled}
        >
          Chat with Lawyer
        </button>
        <button
          className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow ${!isContactEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isContactEnabled}
        >
          Send Message
        </button>
        <button
          className={`bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded shadow ${!isContactEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isContactEnabled}
        >
          Request Call
        </button>
      </div>
      {!isContactEnabled && (
        <div className="mt-2 text-yellow-700 bg-yellow-100 px-3 py-2 rounded text-xs font-semibold inline-block">Upgrade to High SQL to unlock communication features.</div>
      )}
      {/* Assigned Case Info */}
      <div className="mt-6 bg-gray-50 border rounded p-4">
        <div className="font-semibold text-gray-700">Assigned Case:</div>
        <div className="text-gray-900">{data.caseTitle}</div>
        <div className="text-xs text-gray-500">Status: {data.status}</div>
        <div className="text-xs text-gray-500">Timeline: {data.timelineStatus}</div>
      </div>
      {/* Request Change Button */}
      <div className="mt-6">
        <button
          className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow ${changeDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={changeDisabled}
          onClick={() => setShowChangeModal(true)}
        >
          Request a New Lawyer
        </button>
        {changeDisabled && (
          <div className="mt-2 text-gray-500 text-xs">You can request a change after 5 days of assignment.</div>
        )}
      </div>
      {/* Change Request Modal */}
      {showChangeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-2">Why do you want to change your lawyer?</h3>
            <textarea
              className="w-full border rounded px-3 py-2 mb-4"
              rows={4}
              value={changeReason}
              onChange={e => setChangeReason(e.target.value)}
              placeholder="Please provide a reason..."
            />
            <div className="flex gap-2 justify-end">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
                onClick={() => setShowChangeModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                onClick={() => {
                  setChangeSubmitted(true);
                  setTimeout(() => {
                    setShowChangeModal(false);
                    setChangeReason('');
                    setChangeSubmitted(false);
                  }, 1200);
                }}
                disabled={!changeReason.trim()}
              >
                Submit
              </button>
            </div>
            {changeSubmitted && <div className="mt-2 text-green-600 text-sm">Request submitted!</div>}
          </div>
        </div>
      )}
    </section>
  );
};

export default AssignedLawyerTab; 