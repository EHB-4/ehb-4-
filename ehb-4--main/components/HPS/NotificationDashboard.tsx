import React from 'react';
import { sampleNotificationLogs, NotificationLog } from '../../types/hps';

const NotificationDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Automated Notification System</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>User ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Type</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Date</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleNotificationLogs.map((log: NotificationLog, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.userId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.type}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.date}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationDashboard; 