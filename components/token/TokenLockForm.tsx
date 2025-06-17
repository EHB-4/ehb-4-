import React, { useState } from 'react';
import { ethers } from 'ethers';

interface TokenLockFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const SQL_LEVELS = [
  { value: 'BEGINNER', label: 'Beginner (0%)' },
  { value: 'INTERMEDIATE', label: 'Intermediate (25%)' },
  { value: 'ADVANCED', label: 'Advanced (50%)' },
  { value: 'EXPERT', label: 'Expert (75%)' },
  { value: 'MASTER', label: 'Master (100%)' },
];

export default function TokenLockForm({ onSuccess, onError }: TokenLockFormProps) {
  const [amount, setAmount] = useState('');
  const [sqlLevel, setSqlLevel] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !sqlLevel) {
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
          sqlLevel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to lock tokens');
      }

      onSuccess?.();
      setAmount('');
      setSqlLevel('');
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
        <label htmlFor="sqlLevel" className="block text-sm font-medium text-gray-700">
          SQL Level
        </label>
        <div className="mt-1">
          <select
            id="sqlLevel"
            name="sqlLevel"
            value={sqlLevel}
            onChange={e => setSqlLevel(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="">Select SQL Level</option>
            {SQL_LEVELS.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Your SQL level determines your reward multiplier (0% to 100% of base 5% reward)
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
