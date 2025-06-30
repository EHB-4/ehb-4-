import React from 'react';
import { sampleImportHistory, ImportHistory } from '../../types/hps';

const BulkImportDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>School/Institute Bulk Import History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Import Date</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Institute</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Students Imported</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Teachers Imported</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleImportHistory.map((imp: ImportHistory, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{imp.importDate}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{imp.institute}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{imp.studentsImported}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{imp.teachersImported}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{imp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BulkImportDashboard; 