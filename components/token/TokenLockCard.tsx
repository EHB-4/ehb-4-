'use client';

import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

import { getContractReadOnly } from '@/lib/contracts';

interface TokenLockCardProps {
  userAddress: string;
}

interface LockInfo {
  amount: bigint;
  lockStartTime: bigint;
  lockEndTime: bigint;
  isActive: boolean;
}

export default function TokenLockCard({ userAddress }: TokenLockCardProps) {
  const [lockInfo, setLockInfo] = useState<LockInfo | null>(null);
  const [reward, setReward] = useState<bigint>(BigInt(0));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);

  const fetchLockInfo = async () => {
    try {
      const contract = await getContractReadOnly();
      const info = await contract.getLockInfo(userAddress);
      setLockInfo(info);

      if (info.isActive) {
        const rewardAmount = await contract.getPendingRewards();
        setReward(rewardAmount);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lock info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLockInfo();
  }, [userAddress, fetchLockInfo]);

  const handleClaimReward = async () => {
    try {
      setClaiming(true);
      setError(null);

      const response = await fetch('/api/token/claim-reward', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to claim reward');
      }

      // Refresh lock info and reward amount
      await fetchLockInfo();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to claim reward');
    } finally {
      setClaiming(false);
    }
  };

  const handleUnlock = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/token/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: lockInfo?.amount.toString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to unlock tokens');
      }

      // Refresh lock info
      await fetchLockInfo();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlock tokens');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!lockInfo || !lockInfo.isActive) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">No Active Lock</h3>
        <p className="text-gray-500">You don't have any tokens locked at the moment.</p>
      </div>
    );
  }

  const lockEndDate = new Date(Number(lockInfo.lockEndTime) * 1000);
  const formattedAmount = ethers.formatEther(lockInfo.amount);
  const formattedReward = ethers.formatEther(reward);
  const canUnlock = lockEndDate <= new Date();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Token Lock Status</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Locked Amount</p>
          <p className="text-xl font-semibold text-gray-900">{formattedAmount} EHBGC</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Lock End Date</p>
          <p className="text-xl font-semibold text-gray-900">{lockEndDate.toLocaleDateString()}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Available Reward</p>
          <p className="text-xl font-semibold text-gray-900">{formattedReward} EHBGC</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-xl font-semibold text-gray-900">
            {canUnlock ? 'Ready to Unlock' : 'Locked'}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {reward > BigInt(0) && (
          <button
            onClick={handleClaimReward}
            disabled={claiming}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {claiming ? 'Claiming Reward...' : 'Claim Reward'}
          </button>
        )}

        {canUnlock && (
          <button
            onClick={handleUnlock}
            disabled={loading}
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Unlocking...' : 'Unlock Tokens'}
          </button>
        )}
      </div>
    </div>
  );
}
