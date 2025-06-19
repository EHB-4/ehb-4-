import { ethers } from 'ethers';
import React from 'react';

interface Transaction {
  type: 'lock' | 'unlock' | 'reward';
  amount: bigint;
  timestamp: number;
  transactionHash: string;
  sqlLevel?: string;
}

interface TransactionStatsProps {
  transactions: Transaction[];
}

export default function TransactionStats({ transactions }: TransactionStatsProps) {
  // Calculate statistics
  const stats = transactions.reduce(
    (acc, tx) => {
      const amount = tx.amount;
      switch (tx.type) {
        case 'lock':
          acc.totalLocked = acc.totalLocked + amount;
          acc.lockCount++;
          break;
        case 'unlock':
          acc.totalUnlocked = acc.totalUnlocked + amount;
          acc.unlockCount++;
          break;
        case 'reward':
          acc.totalRewards = acc.totalRewards + amount;
          acc.rewardCount++;
          break;
      }
      return acc;
    },
    {
      totalLocked: BigInt(0),
      totalUnlocked: BigInt(0),
      totalRewards: BigInt(0),
      lockCount: 0,
      unlockCount: 0,
      rewardCount: 0,
    }
  );

  // Calculate SQL level distribution
  const sqlLevelDistribution = transactions
    .filter(tx => tx.type === 'lock' && tx.sqlLevel)
    .reduce(
      (acc, tx) => {
        const level = tx.sqlLevel!;
        acc[level] = (acc[level] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Statistics</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Transaction Counts */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Transaction Counts</h4>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Locks</dt>
              <dd className="text-sm font-medium text-gray-900">{stats.lockCount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Unlocks</dt>
              <dd className="text-sm font-medium text-gray-900">{stats.unlockCount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Rewards</dt>
              <dd className="text-sm font-medium text-gray-900">{stats.rewardCount}</dd>
            </div>
          </dl>
        </div>

        {/* Token Amounts */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Token Amounts</h4>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Total Locked</dt>
              <dd className="text-sm font-medium text-gray-900">
                {ethers.formatEther(stats.totalLocked)} EHBGC
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Total Unlocked</dt>
              <dd className="text-sm font-medium text-gray-900">
                {ethers.formatEther(stats.totalUnlocked)} EHBGC
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Total Rewards</dt>
              <dd className="text-sm font-medium text-gray-900">
                {ethers.formatEther(stats.totalRewards)} EHBGC
              </dd>
            </div>
          </dl>
        </div>

        {/* SQL Level Distribution */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">SQL Level Distribution</h4>
          <dl className="space-y-2">
            {Object.entries(sqlLevelDistribution).map(([level, count]) => (
              <div key={level} className="flex justify-between">
                <dt className="text-sm text-gray-500">{level}</dt>
                <dd className="text-sm font-medium text-gray-900">{count}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
