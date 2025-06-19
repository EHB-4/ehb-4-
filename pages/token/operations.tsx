import { formatDistanceToNow } from 'date-fns';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { getContract } from '@/lib/contracts';

interface Lock {
  id: string;
  amount: bigint;
  startTime: number;
  endTime: number;
  status: 'active' | 'completed' | 'cancelled';
  rewards: bigint;
}

interface TokenBalance {
  total: bigint;
  locked: bigint;
  unlocked: bigint;
  available: bigint;
}

export default function TokenOperations() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [locking, setLocking] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [locks, setLocks] = useState<Lock[]>([]);
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [lockAmount, setLockAmount] = useState('');
  const [lockDuration, setLockDuration] = useState('30'); // days
  const [selectedLock, setSelectedLock] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contract = await getContract();

        // TODO: Fetch data from contract
        // For now using mock data
        const mockLocks: Lock[] = [
          {
            id: '1',
            amount: ethers.parseEther('1000'),
            startTime: Date.now() - 86400000, // 1 day ago
            endTime: Date.now() + 2592000000, // 30 days from now
            status: 'active',
            rewards: ethers.parseEther('50'),
          },
          {
            id: '2',
            amount: ethers.parseEther('500'),
            startTime: Date.now() - 172800000, // 2 days ago
            endTime: Date.now() - 86400000, // 1 day ago
            status: 'completed',
            rewards: ethers.parseEther('25'),
          },
          {
            id: '3',
            amount: ethers.parseEther('200'),
            startTime: Date.now() - 259200000, // 3 days ago
            endTime: Date.now() - 172800000, // 2 days ago
            status: 'cancelled',
            rewards: ethers.parseEther('10'),
          },
        ];

        const mockBalance: TokenBalance = {
          total: ethers.parseEther('5000'),
          locked: ethers.parseEther('1000'),
          unlocked: ethers.parseEther('3000'),
          available: ethers.parseEther('1000'),
        };

        setLocks(mockLocks);
        setBalance(mockBalance);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLockTokens = async () => {
    if (!lockAmount || !lockDuration) return;

    try {
      setLocking(true);
      const contract = await getContract();

      // TODO: Lock tokens through contract
      // For now just showing success message
      toast.success('Tokens locked successfully!');
      setLockAmount('');
      setLockDuration('30');
    } catch (err) {
      console.error('Failed to lock tokens:', err);
      toast.error('Failed to lock tokens');
    } finally {
      setLocking(false);
    }
  };

  const handleUnlockTokens = async () => {
    if (!selectedLock) return;

    try {
      setUnlocking(true);
      const contract = await getContract();

      // TODO: Unlock tokens through contract
      // For now just showing success message
      toast.success('Tokens unlocked successfully!');
      setSelectedLock(null);
    } catch (err) {
      console.error('Failed to unlock tokens:', err);
      toast.error('Failed to unlock tokens');
    } finally {
      setUnlocking(false);
    }
  };

  const filteredLocks = locks
    .filter(lock => filter === 'all' || lock.status === filter)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? a.startTime - b.startTime : b.startTime - a.startTime;
      } else {
        return sortOrder === 'asc' ? Number(a.amount - b.amount) : Number(b.amount - a.amount);
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Token Operations</h1>

        {/* Balance Overview */}
        {balance && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(balance.total)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Locked Tokens</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(balance.locked)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Unlocked Tokens</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(balance.unlocked)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Available Tokens</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(balance.available)} EHBGC
              </p>
            </div>
          </div>
        )}

        {/* Lock Tokens Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Lock Tokens</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="lock-amount" className="block text-sm font-medium text-gray-700">
                Amount to Lock
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="lock-amount"
                  value={lockAmount}
                  onChange={e => setLockAmount(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  title="Amount to Lock"
                  aria-label="Amount to Lock"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">EHBGC</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="lock-duration" className="block text-sm font-medium text-gray-700">
                Lock Duration (days)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="lock-duration"
                  value={lockDuration}
                  onChange={e => setLockDuration(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="30"
                  min="1"
                  max="365"
                  title="Lock Duration"
                  aria-label="Lock Duration in days"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleLockTokens}
              disabled={locking || !lockAmount || !lockDuration}
              className={`w-full px-6 py-3 rounded-lg font-medium ${
                locking || !lockAmount || !lockDuration
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {locking ? 'Locking...' : 'Lock Tokens'}
            </button>
          </div>
        </div>

        {/* Locks List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Filter:</label>
                  <select
                    value={filter}
                    onChange={e => setFilter(e.target.value as typeof filter)}
                    className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                    title="Filter Locks"
                    aria-label="Filter Locks"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                  title="Sort Locks"
                  aria-label="Sort Locks"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                </select>

                <button
                  onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                  className="text-gray-400 hover:text-gray-500"
                  title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                  aria-label={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredLocks.map(lock => (
              <div key={lock.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {lock.status === 'active' && (
                      <input
                        type="radio"
                        checked={selectedLock === lock.id}
                        onChange={() => setSelectedLock(lock.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        title={`Select lock ${lock.id}`}
                        aria-label={`Select lock ${lock.id}`}
                      />
                    )}

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {ethers.formatEther(lock.amount)} EHBGC
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            lock.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : lock.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {lock.status.charAt(0).toUpperCase() + lock.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>Started {formatDistanceToNow(lock.startTime, { addSuffix: true })}</p>
                        <p>Ends {formatDistanceToNow(lock.endTime, { addSuffix: true })}</p>
                        <p>Rewards: {ethers.formatEther(lock.rewards)} EHBGC</p>
                      </div>
                    </div>
                  </div>

                  {lock.status === 'active' && (
                    <button
                      onClick={() => handleUnlockTokens()}
                      disabled={unlocking || selectedLock !== lock.id}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        unlocking || selectedLock !== lock.id
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {unlocking ? 'Unlocking...' : 'Unlock'}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {filteredLocks.length === 0 && (
              <div className="px-6 py-4 text-center text-gray-500">No locks found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
