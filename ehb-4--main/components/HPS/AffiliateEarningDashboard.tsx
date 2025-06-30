import React, { useEffect, useState } from 'react';
import { sampleAffiliates, Affiliate, sampleAffiliatePayoutLogs, AffiliatePayoutLog } from '../../types/hps';

const AffiliateEarningDashboard: React.FC = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hps/affiliates')
      .then((res) => res.json())
      .then((data) => {
        setAffiliates(data);
        setLoading(false);
      })
      .catch(() => {
        setAffiliates(sampleAffiliates);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading affiliates...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Affiliate/Earning Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', marginBottom: 32 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>User</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Downline</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Upline</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Level</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Bonus</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Wallet Log</th>
          </tr>
        </thead>
        <tbody>
          {(affiliates || []).map((aff: Affiliate) => (
            <tr key={aff.id}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{aff.userId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{aff.downline.join(', ')}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{aff.upline}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{aff.level}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{aff.bonus}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>
                {aff.walletLog.map((log, idx) => (
                  <div key={idx} style={{ marginBottom: 4 }}>
                    {log.date} - {log.type} - {log.amount}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Multi-Level Affiliate Payout Logs</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Teacher</th>
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

export default AffiliateEarningDashboard; 