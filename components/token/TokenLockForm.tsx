'use client';

import { ethers } from 'ethers';
import React, { useState } from 'react';

interface TokenLockFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const LOCK_DURATIONS = [
  { value: 30, label: '30 Days' },
  { value: 60, label: '60 Days' },
  { value: 90, label: '90 Days' },
  { value: 180, label: '180 Days' },
  { value: 365, label: '365 Days' },
];

export default function TokenLockForm({ onSuccess, onError }: TokenLockFormProps) {
  const [amount, setAmount] = useState('');
  const [lockDuration, setLockDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !lockDuration) {
      onError?.('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      // Convert amount to wei
      const amountInWei = ethers.parseEther(amount);

      const response = await fetch('/api/token/lock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInWei.toString(),
          lockDuration: parseInt(lockDuration),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to lock tokens');
      }

      onSuccess?.();
      setAmount('');
      setLockDuration('');
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to lock tokens');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount to Lock (EHBGC)
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="amount"
            id="amount"
            step="0.000001"
            min="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter amount"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="lockDuration" className="block text-sm font-medium text-gray-700">
          Lock Duration
        </label>
        <div className="mt-1">
          <select
            id="lockDuration"
            name="lockDuration"
            value={lockDuration}
            onChange={e => setLockDuration(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="">Select Lock Duration</option>
            {LOCK_DURATIONS.map(duration => (
              <option key={duration.value} value={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Choose how long you want to lock your tokens. Longer lock periods may offer higher
          rewards.
        </p>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Locking Tokens...' : 'Lock Tokens'}
        </button>
      </div>
    </form>
  );
}
