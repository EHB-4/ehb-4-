'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

import { BalanceSummary } from '@/components/wallet/BalanceSummary';
import { WalletActions } from '@/components/wallet/WalletActions';
import { TransactionHistory } from '@/components/wallet/TransactionHistory';
import { Wallet, Transaction } from '@/lib/models/Wallet';

export default function WalletPage() {
  const { data: session } = useSession();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionAmount, setActionAmount] = useState('');
  const [selectedLoyaltyType, setSelectedLoyaltyType] = useState<string>('');

  useEffect(() => {
    fetchWallet();
  }, [session, fetchWallet]);

  const fetchWallet = async () => {
    try {
      const response = await fetch('/api/wallet');
      if (!response.ok) {
        throw new Error('Failed to fetch wallet');
      }
      const data = await response.json();
      setWallet(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: 'lock' | 'unlock' | 'updateLoyalty' | 'create') => {
    try {
      const payload: any = { action };

      if (action === 'updateLoyalty') {
        payload.loyaltyType = selectedLoyaltyType;
      } else if (action !== 'create') {
        const amount = parseFloat(actionAmount);
        if (isNaN(amount) || amount <= 0) {
          setError('Please enter a valid amount');
          return;
        }
        payload.amount = amount;
      }

      const response = await fetch('/api/wallet', {
        method: action === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to perform action');
      }

      await fetchWallet();
      setActionAmount('');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Wallet Found</h2>
          <button
            onClick={() => handleAction('create')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Wallet
          </button>
        </div>
      </div>
    );
  }

  const monthlyBonus = wallet.lockedBalance * wallet.loyaltyBonus;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold mb-6">Your Trusty Wallet</h1>

        <BalanceSummary
          balance={wallet.balance}
          lockedBalance={wallet.lockedBalance}
          monthlyBonus={monthlyBonus}
          loyaltyBonus={wallet.loyaltyBonus}
        />

        <WalletActions
          actionAmount={actionAmount}
          selectedLoyaltyType={selectedLoyaltyType}
          onAmountChange={setActionAmount}
          onLoyaltyTypeChange={setSelectedLoyaltyType}
          onLock={() => handleAction('lock')}
          onUnlock={() => handleAction('unlock')}
          onUpdateLoyalty={() => handleAction('updateLoyalty')}
          error={error}
        />

        <TransactionHistory transactions={wallet.transactionHistory} />
      </motion.div>
    </div>
  );
}
