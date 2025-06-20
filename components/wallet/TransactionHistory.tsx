'use client';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  description?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <div className="space-y-4">
        {transactions.map(transaction => (
          <div key={transaction.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-800">{transaction.type}</span>
              <span
                className={`font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {transaction.amount >= 0 ? '+' : '-'}
                {Math.abs(transaction.amount)} coins
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-1">
              {new Date(transaction.date).toLocaleString()}
            </div>
            {transaction.description && (
              <div className="text-sm text-gray-600">{transaction.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
