import React from 'react';
import { sampleWalletTransactions, WalletTransaction } from '../../types/hps';

const WalletTransactionHistoryDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Wallet & Transaction History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>User ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Date</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Type</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Amount</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {sampleWalletTransactions.map((txn: WalletTransaction, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{txn.userId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{txn.date}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{txn.type}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{txn.amount}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{txn.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletTransactionHistoryDashboard; 