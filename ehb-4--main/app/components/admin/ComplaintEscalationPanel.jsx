import React, { useState, useEffect } from 'react';
import { useComplaintEscalation } from '../../hooks/useComplaintEscalation';

export default function ComplaintEscalationPanel() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const { escalateComplaint, loading, error, result } = useComplaintEscalation();
  const [escalateAction, setEscalateAction] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Fetch all complaints (admin/franchise)
    async function fetchComplaints() {
      const res = await fetch('/api/complaints');
      const data = await res.json();
      setComplaints(data.complaints || []);
    }
    fetchComplaints();
  }, [refresh]);

  const handleEscalate = async () => {
    if (!selectedComplaint) return;
    await escalateComplaint({ complaintId: selectedComplaint._id, action: escalateAction });
    setRefresh(r => !r);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Complaint Escalation Panel</h2>
      <div className="flex gap-8">
        {/* Complaint List */}
        <div className="w-1/2">
          <h3 className="font-semibold mb-2">Complaints</h3>
          <ul className="border rounded divide-y">
            {complaints.map(c => (
              <li
                key={c._id}
                className={`p-2 cursor-pointer ${selectedComplaint && selectedComplaint._id === c._id ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedComplaint(c)}
              >
                <div className="font-medium">{c.type} - {c.status}</div>
                <div className="text-xs text-gray-500">{c.description.slice(0, 60)}...</div>
                <div className="text-xs">Escalation Level: {c.escalationLevel}</div>
              </li>
            ))}
          </ul>
        </div>
        {/* Complaint Details & Escalation */}
        <div className="w-1/2">
          {selectedComplaint ? (
            <div className="border rounded p-4">
              <h4 className="font-semibold mb-2">Details</h4>
              <div><b>Type:</b> {selectedComplaint.type}</div>
              <div><b>Status:</b> {selectedComplaint.status}</div>
              <div><b>Description:</b> {selectedComplaint.description}</div>
              <div><b>Escalation Level:</b> {selectedComplaint.escalationLevel}</div>
              <div className="mt-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  onClick={handleEscalate}
                  disabled={loading}
                >
                  Escalate (AI Suggestion)
                </button>
                <select
                  className="border px-2 py-1"
                  value={escalateAction}
                  onChange={e => setEscalateAction(e.target.value)}
                >
                  <option value="">AI Suggestion</option>
                  <option value="escalate_to_master">Escalate to Master Franchise</option>
                  <option value="escalate_to_corporate">Escalate to Corporate</option>
                </select>
              </div>
              {loading && <div className="text-blue-600 mt-2">Escalating...</div>}
              {error && <div className="text-red-600 mt-2">{error}</div>}
              {result && (
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <div><b>AI Suggestion:</b> {result.triageResult?.aiComment}</div>
                  <div><b>Recommended Escalation:</b> {result.triageResult?.recommendedEscalation}</div>
                  <div><b>New Status:</b> {result.newStatus}</div>
                  <div><b>Urgency:</b> {result.triageResult?.urgency}</div>
                  <div><b>Suggested Fine:</b> {result.triageResult?.suggestedFine}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500">Select a complaint to view details and escalate.</div>
          )}
        </div>
      </div>
    </div>
  );
} 