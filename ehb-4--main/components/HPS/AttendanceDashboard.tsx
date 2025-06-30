import React from 'react';
import { sampleAttendanceLogs, AttendanceLog } from '../../types/hps';

const AttendanceDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Daily Lecture/Attendance Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Date</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Student ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Lecture ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Duration (min)</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleAttendanceLogs.map((log: AttendanceLog, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.date}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.studentId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.lectureId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.duration}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDashboard; 