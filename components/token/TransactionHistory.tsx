import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { TokenLocker } from '../../lib/token-locker';
import TransactionStats from './TransactionStats';
import TransactionCharts from './TransactionCharts';

interface Transaction {
  type: 'lock' | 'unlock' | 'reward';
  amount: bigint;
  timestamp: number;
  transactionHash: string;
  sqlLevel?: string;
}

interface TransactionHistoryProps {
  userAddress: string;
  tokenLockerAddress: string;
}

const ITEMS_PER_PAGE = 10;

export default function TransactionHistory({
  userAddress,
  tokenLockerAddress,
}: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'lock' | 'unlock' | 'reward'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const tokenLocker = new TokenLocker(tokenLockerAddress);
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL!);

        // Get events from the last 30 days
        const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

        // Fetch lock events
        const lockFilter = tokenLocker.getLockEvents(userAddress);
        const lockEvents = await provider.getLogs({
          ...lockFilter,
          fromBlock: 0,
          toBlock: 'latest',
        });

        // Fetch unlock events
        const unlockFilter = tokenLocker.getUnlockEvents(userAddress);
        const unlockEvents = await provider.getLogs({
          ...unlockFilter,
          fromBlock: 0,
          toBlock: 'latest',
        });

        // Fetch reward events
        const rewardFilter = tokenLocker.getRewardEvents(userAddress);
        const rewardEvents = await provider.getLogs({
          ...rewardFilter,
          fromBlock: 0,
          toBlock: 'latest',
        });

        // Process and combine all events
        const allTransactions: Transaction[] = [
          ...lockEvents.map(event => {
            const parsedLog = tokenLocker.contract.interface.parseLog({
              topics: event.topics,
              data: event.data,
            });
            return {
              type: 'lock' as const,
              amount: parsedLog?.args[1],
              timestamp: Number(parsedLog?.args[2]),
              transactionHash: event.transactionHash,
              sqlLevel: parsedLog?.args[3],
            };
          }),
          ...unlockEvents.map(event => {
            const parsedLog = tokenLocker.contract.interface.parseLog({
              topics: event.topics,
              data: event.data,
            });
            return {
              type: 'unlock' as const,
              amount: parsedLog?.args[1],
              timestamp: Number(parsedLog?.args[2]),
              transactionHash: event.transactionHash,
            };
          }),
          ...rewardEvents.map(event => {
            const parsedLog = tokenLocker.contract.interface.parseLog({
              topics: event.topics,
              data: event.data,
            });
            return {
              type: 'reward' as const,
              amount: parsedLog?.args[1],
              timestamp: Number(parsedLog?.args[2]),
              transactionHash: event.transactionHash,
            };
          }),
        ];

        // Sort by timestamp (newest first)
        allTransactions.sort((a, b) => b.timestamp - a.timestamp);

        setTransactions(allTransactions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userAddress, tokenLockerAddress]);

  // Filter transactions based on selected type, date range, and search query
  const filteredTransactions = transactions.filter(tx => {
    const matchesType = filter === 'all' ? true : tx.type === filter;
    const matchesDateRange =
      tx.timestamp >= new Date(dateRange.start).getTime() / 1000 &&
      tx.timestamp <= new Date(dateRange.end).getTime() / 1000;
    const matchesSearch =
      searchQuery === '' ||
      tx.transactionHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sqlLevel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ethers.formatEther(tx.amount).includes(searchQuery);

    return matchesType && matchesDateRange && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = ['Type', 'Amount (EHBGC)', 'Date', 'Transaction Hash', 'SQL Level'];
    const rows = filteredTransactions.map(tx => [
      tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
      ethers.formatEther(tx.amount),
      new Date(tx.timestamp * 1000).toLocaleString(),
      tx.transactionHash,
      tx.sqlLevel || '',
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
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

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h3>
        <p className="text-gray-500">No transactions found in the last 30 days.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <TransactionStats transactions={filteredTransactions} />

      {/* Charts */}
      <TransactionCharts transactions={filteredTransactions} />

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Transaction History</h3>
            <div className="flex space-x-2">
              <button
                onClick={exportToCSV}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Export CSV
              </button>
              <select
                value={filter}
                onChange={e => {
                  setFilter(e.target.value as typeof filter);
                  setCurrentPage(1);
                }}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                aria-label="Filter transactions by type"
              >
                <option value="all">All Transactions</option>
                <option value="lock">Locks</option>
                <option value="unlock">Unlocks</option>
                <option value="reward">Rewards</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search by hash, amount, or SQL level"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                value={dateRange.start}
                onChange={e => handleDateRangeChange('start', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                value={dateRange.end}
                onChange={e => handleDateRangeChange('end', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTransactions.map(tx => (
                <tr key={tx.transactionHash}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        tx.type === 'lock'
                          ? 'bg-green-100 text-green-800'
                          : tx.type === 'unlock'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      {tx.sqlLevel && ` (${tx.sqlLevel})`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ethers.formatEther(tx.amount)} EHBGC
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(tx.timestamp * 1000).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a
                      href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/${tx.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to{' '}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredTransactions.length)} of{' '}
              {filteredTransactions.length} transactions
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
