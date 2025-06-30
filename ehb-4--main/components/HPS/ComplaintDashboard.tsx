import React from 'react';
import { sampleComplaints, Complaint, sampleComplaintResponses, ComplaintResponse } from '../../types/hps';

const ComplaintDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Complaint Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', marginBottom: 32 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Complaint ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>User</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Type</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Status</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Assigned To</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Resolution Note</th>
          </tr>
        </thead>
        <tbody>
          {sampleComplaints.map((comp: Complaint) => (
            <tr key={comp.id}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{comp.id}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{comp.user}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{comp.type}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{comp.status}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{comp.assignedTo}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{comp.resolutionNote || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Complaint Response History</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Complaint ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Responder</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Response</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {sampleComplaintResponses.map((resp: ComplaintResponse, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{resp.complaintId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{resp.responder}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{resp.response}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{resp.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintDashboard; 