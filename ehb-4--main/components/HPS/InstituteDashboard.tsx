import React, { useEffect, useState } from 'react';
import { sampleInstitutes, Institute, sampleImportHistory, ImportHistory } from '../../types/hps';

const getImportHistory = (instituteId: string): ImportHistory[] => {
  return sampleImportHistory.filter((imp) => imp.institute === instituteId);
};

const InstituteDashboard: React.FC = () => {
  const [institutes, setInstitutes] = useState<Institute[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hps/institutes')
      .then((res) => res.json())
      .then((data) => {
        setInstitutes(data);
        setLoading(false);
      })
      .catch(() => {
        setInstitutes(sampleInstitutes);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading institutes...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Institute Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', marginBottom: 32 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Name</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Type</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Address</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Registered Students</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Registered Teachers</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Affiliation Level</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Wallet</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Complaints</th>
          </tr>
        </thead>
        <tbody>
          {(institutes || []).map((inst: Institute) => (
            <tr key={inst.id}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{inst.name}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{inst.type}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{inst.address}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{inst.registeredStudents.join(', ')}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{inst.registeredTeachers.join(', ')}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{inst.affiliationLevel}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{inst.wallet}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{inst.complaints && inst.complaints.length > 0 ? inst.complaints.join(', ') : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Bulk Import History</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Institute</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Import Date</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Students Imported</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Teachers Imported</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {(institutes || []).map((inst) =>
            getImportHistory(inst.id).map((imp, idx) => (
              <tr key={inst.id + '-' + idx}>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{inst.name}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{imp.importDate}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{imp.studentsImported}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{imp.teachersImported}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{imp.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InstituteDashboard; 