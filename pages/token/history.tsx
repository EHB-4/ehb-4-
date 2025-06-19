import { formatDistanceToNow } from 'date-fns';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { getContract } from '@/lib/contracts';

interface Transaction {
  id: string;
  type: 'lock' | 'unlock' | 'claim' | 'referral' | 'bonus';
  amount: bigint;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  txHash: string;
  details: {
    lockDuration?: number;
    referralCode?: string;
    bonusType?: string;
    rewardAmount?: bigint;
  };
}

export default function TokenHistory() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<{
    type: string[];
    status: string[];
    dateRange: { start: Date | null; end: Date | null };
  }>({
    type: [],
    status: [],
    dateRange: { start: null, end: null },
  });
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'type'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const contract = await getContract();

        // TODO: Fetch transactions from contract
        // For now using mock data
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            type: 'lock',
            amount: ethers.parseEther('1000'),
            timestamp: Date.now() - 86400000, // 1 day ago
            status: 'completed',
            txHash: '0x123...',
            details: {
              lockDuration: 30,
            },
          },
          {
            id: '2',
            type: 'claim',
            amount: ethers.parseEther('50'),
            timestamp: Date.now() - 172800000, // 2 days ago
            status: 'completed',
            txHash: '0x456...',
            details: {
              rewardAmount: ethers.parseEther('50'),
            },
          },
          {
            id: '3',
            type: 'referral',
            amount: ethers.parseEther('25'),
            timestamp: Date.now() - 259200000, // 3 days ago
            status: 'completed',
            txHash: '0x789...',
            details: {
              referralCode: 'REF123',
            },
          },
          {
            id: '4',
            type: 'bonus',
            amount: ethers.parseEther('100'),
            timestamp: Date.now() - 345600000, // 4 days ago
            status: 'completed',
            txHash: '0xabc...',
            details: {
              bonusType: 'early_adopter',
            },
          },
        ];

        setTransactions(mockTransactions);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
        toast.error('Failed to load transaction history');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions
    .filter(tx => {
      if (filter.type.length > 0 && !filter.type.includes(tx.type)) return false;
      if (filter.status.length > 0 && !filter.status.includes(tx.status)) return false;
      if (filter.dateRange.start && tx.timestamp < filter.dateRange.start.getTime()) return false;
      if (filter.dateRange.end && tx.timestamp > filter.dateRange.end.getTime()) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          tx.id.toLowerCase().includes(query) ||
          tx.type.toLowerCase().includes(query) ||
          tx.txHash.toLowerCase().includes(query) ||
          (tx.details.referralCode && tx.details.referralCode.toLowerCase().includes(query)) ||
          (tx.details.bonusType && tx.details.bonusType.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = a.timestamp - b.timestamp;
          break;
        case 'amount':
          comparison = Number(a.amount - b.amount);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'lock':
        return '🔒';
      case 'unlock':
        return '🔓';
      case 'claim':
        return '💰';
      case 'referral':
        return '👥';
      case 'bonus':
        return '🎁';
      default:
        return '📝';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Transaction History</h1>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Type
                </label>
                <select
                  multiple
                  value={filter.type}
                  onChange={e =>
                    setFilter(prev => ({
                      ...prev,
                      type: Array.from(e.target.selectedOptions, option => option.value),
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="lock">Lock</option>
                  <option value="unlock">Unlock</option>
                  <option value="claim">Claim</option>
                  <option value="referral">Referral</option>
                  <option value="bonus">Bonus</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  multiple
                  value={filter.status}
                  onChange={e =>
                    setFilter(prev => ({
                      ...prev,
                      status: Array.from(e.target.selectedOptions, option => option.value),
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={filter.dateRange.start?.toISOString().split('T')[0] || ''}
                  onChange={e =>
                    setFilter(prev => ({
                      ...prev,
                      dateRange: {
                        ...prev.dateRange,
                        start: e.target.value ? new Date(e.target.value) : null,
                      },
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={filter.dateRange.end?.toISOString().split('T')[0] || ''}
                  onChange={e =>
                    setFilter(prev => ({
                      ...prev,
                      dateRange: {
                        ...prev.dateRange,
                        end: e.target.value ? new Date(e.target.value) : null,
                      },
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Search */}
            <div className="mt-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by ID, type, hash, etc."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Sort */}
            <div className="mt-4 flex items-center space-x-4">
              <label className="block text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'date' | 'amount' | 'type')}
                className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="type">Type</option>
              </select>

              <button
                onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                className="text-gray-500 hover:text-gray-700"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map(tx => (
              <div key={tx.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{getTransactionIcon(tx.type)}</span>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 capitalize">{tx.type}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900">
                      {ethers.formatEther(tx.amount)} EHBGC
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Transaction Hash</p>
                    <p className="text-sm font-medium text-gray-900">{tx.txHash}</p>
                  </div>

                  {tx.details.lockDuration && (
                    <div>
                      <p className="text-sm text-gray-500">Lock Duration</p>
                      <p className="text-sm font-medium text-gray-900">
                        {tx.details.lockDuration} days
                      </p>
                    </div>
                  )}

                  {tx.details.referralCode && (
                    <div>
                      <p className="text-sm text-gray-500">Referral Code</p>
                      <p className="text-sm font-medium text-gray-900">{tx.details.referralCode}</p>
                    </div>
                  )}

                  {tx.details.bonusType && (
                    <div>
                      <p className="text-sm text-gray-500">Bonus Type</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {tx.details.bonusType.replace('_', ' ')}
                      </p>
                    </div>
                  )}

                  {tx.details.rewardAmount && (
                    <div>
                      <p className="text-sm text-gray-500">Reward Amount</p>
                      <p className="text-sm font-medium text-gray-900">
                        {ethers.formatEther(tx.details.rewardAmount)} EHBGC
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredTransactions.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-gray-500">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
