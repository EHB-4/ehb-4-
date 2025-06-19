import { formatDistanceToNow } from 'date-fns';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { getContract } from '@/lib/contracts';

interface Transaction {
  id: string;
  type: 'lock' | 'unlock' | 'reward' | 'transfer';
  amount: bigint;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  from: string;
  to: string;
  hash: string;
  blockNumber: number;
}

interface TransactionStats {
  totalTransactions: number;
  totalVolume: bigint;
  averageAmount: bigint;
  successRate: number;
  last24Hours: number;
}

export default function TokenTransactions() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [filter, setFilter] = useState<'all' | 'lock' | 'unlock' | 'reward' | 'transfer'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>(
    'all'
  );
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

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
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            type: 'lock',
            amount: ethers.parseEther('1000'),
            timestamp: Date.now() - 86400000, // 1 day ago
            status: 'completed',
            from: '0x123...abc',
            to: '0x456...def',
            hash: '0x789...ghi',
            blockNumber: 12345678,
          },
          {
            id: '2',
            type: 'unlock',
            amount: ethers.parseEther('500'),
            timestamp: Date.now() - 172800000, // 2 days ago
            status: 'pending',
            from: '0x123...abc',
            to: '0x456...def',
            hash: '0x789...ghi',
            blockNumber: 12345677,
          },
          {
            id: '3',
            type: 'reward',
            amount: ethers.parseEther('50'),
            timestamp: Date.now() - 259200000, // 3 days ago
            status: 'failed',
            from: '0x123...abc',
            to: '0x456...def',
            hash: '0x789...ghi',
            blockNumber: 12345676,
          },
        ];

        const mockStats: TransactionStats = {
          totalTransactions: 150,
          totalVolume: ethers.parseEther('50000'),
          averageAmount: ethers.parseEther('333.33'),
          successRate: 95.5,
          last24Hours: 25,
        };

        setTransactions(mockTransactions);
        setStats(mockStats);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        toast.error('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      // TODO: Fetch more transactions
      // For now just showing loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasMore(false);
    } catch (err) {
      console.error('Failed to load more transactions:', err);
      toast.error('Failed to load more transactions');
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredTransactions = transactions
    .filter(tx => {
      const matchesType = filter === 'all' || tx.type === filter;
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
      const matchesSearch =
        searchQuery === '' ||
        tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.to.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Transactions</h1>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalTransactions}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Volume</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(stats.totalVolume)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Average Amount</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(stats.averageAmount)} EHBGC
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.successRate}%</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Last 24 Hours</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.last24Hours}</p>
            </div>
          </div>
        )}

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Type:</label>
                  <select
                    value={filter}
                    onChange={e => setFilter(e.target.value as typeof filter)}
                    className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                    title="Filter by Transaction Type"
                    aria-label="Filter by Transaction Type"
                  >
                    <option value="all">All</option>
                    <option value="lock">Lock</option>
                    <option value="unlock">Unlock</option>
                    <option value="reward">Reward</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
                    className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                    title="Filter by Transaction Status"
                    aria-label="Filter by Transaction Status"
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as typeof sortBy)}
                    className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                    title="Sort Transactions"
                    aria-label="Sort Transactions"
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

                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by hash or address..."
                    className="block w-full rounded-md border-gray-300 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    title="Search Transactions"
                    aria-label="Search Transactions"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredTransactions.map(tx => (
              <div key={tx.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        tx.type === 'lock'
                          ? 'bg-blue-100 text-blue-600'
                          : tx.type === 'unlock'
                            ? 'bg-green-100 text-green-600'
                            : tx.type === 'reward'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-purple-100 text-purple-600'
                      }`}
                    >
                      {tx.type === 'lock'
                        ? '🔒'
                        : tx.type === 'unlock'
                          ? '🔓'
                          : tx.type === 'reward'
                            ? '🎁'
                            : '↔️'}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {ethers.formatEther(tx.amount)} EHBGC
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            tx.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : tx.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>From: {tx.from}</p>
                        <p>To: {tx.to}</p>
                        <p>Hash: {tx.hash}</p>
                        <p>Block: {tx.blockNumber}</p>
                        <p>{formatDistanceToNow(tx.timestamp, { addSuffix: true })}</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                    title="View on Etherscan"
                    aria-label="View transaction on Etherscan"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}

            {filteredTransactions.length === 0 && (
              <div className="px-6 py-4 text-center text-gray-500">No transactions found</div>
            )}
          </div>

          {hasMore && (
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                  loadingMore
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
