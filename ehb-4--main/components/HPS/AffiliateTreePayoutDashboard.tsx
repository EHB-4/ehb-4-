import React from 'react';
import { sampleAffiliatePayoutLogs, AffiliatePayoutLog } from '../../types/hps';

const AffiliateTreePayoutDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Multi-Level Affiliate Tree & Payout</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Teacher ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Level 1 Earning</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Level 2 Earning</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {sampleAffiliatePayoutLogs.map((log: AffiliatePayoutLog, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.teacherId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.level1Earning}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.level2Earning}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AffiliateTreePayoutDashboard; 