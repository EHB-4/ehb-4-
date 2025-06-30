import React from 'react';
import { sampleWallets, WalletInfo, sampleWalletTransactions, WalletTransaction } from '../../types/hps';

const WalletSQLFeeDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Wallet & SQL Fee Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', marginBottom: 32 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>User ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Current Balance</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Locked Amount</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Last SQL Fee Paid</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Current SQL Level</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Next Level</th>
          </tr>
        </thead>
        <tbody>
          {sampleWallets.map((wallet: WalletInfo) => (
            <tr key={wallet.userId}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{wallet.userId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{wallet.currentBalance}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{wallet.lockedAmount}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{wallet.lastSQLFeePaid}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{wallet.currentSQLLevel}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{wallet.nextLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Wallet Transaction History</h3>
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

export default WalletSQLFeeDashboard; 