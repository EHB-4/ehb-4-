import React from 'react';
import { sampleSkillRefreshLogs, SkillRefreshLog } from '../../types/hps';

const SkillRefreshDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Six-Monthly Skill/SQL Refresh Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>User ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Test Date</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Result</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>New SQL Level</th>
          </tr>
        </thead>
        <tbody>
          {sampleSkillRefreshLogs.map((log: SkillRefreshLog, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.userId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.testDate}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.result}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.newSQLLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillRefreshDashboard; 