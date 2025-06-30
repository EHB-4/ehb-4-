import React from 'react';
import { sampleComplaintResponses, ComplaintResponse } from '../../types/hps';

const ComplaintSupportWorkflowDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Complaint/Support Workflow</h2>
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

export default ComplaintSupportWorkflowDashboard; 