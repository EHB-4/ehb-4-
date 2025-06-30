import React from 'react';
import { sampleVerificationLogs, VerificationLog } from '../../types/hps';

const SQLBadgeVerificationDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>SQL Level Badge & Verification</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>User ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Level Requested</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Docs Submitted</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Status</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {sampleVerificationLogs.map((log: VerificationLog, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.userId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.levelRequested}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.docs.join(', ')}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.status}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SQLBadgeVerificationDashboard; 