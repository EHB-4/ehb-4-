'use client';

interface WalletActionsProps {
  actionAmount: string;
  selectedLoyaltyType: string;
  onAmountChange: (value: string) => void;
  onLoyaltyTypeChange: (value: string) => void;
  onLock: () => void;
  onUnlock: () => void;
  onUpdateLoyalty: () => void;
  error?: string | null;
}

export function WalletActions({
  actionAmount,
  selectedLoyaltyType,
  onAmountChange,
  onLoyaltyTypeChange,
  onLock,
  onUnlock,
  onUpdateLoyalty,
  error,
}: WalletActionsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Wallet Actions</h2>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              value={actionAmount}
              onChange={e => onAmountChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={onLock}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Lock Coins
            </button>
            <button
              onClick={onUnlock}
              className="flex-1 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Unlock Coins
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lock Duration</label>
            <select
              value={selectedLoyaltyType}
              onChange={e => onLoyaltyTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select lock duration"
            >
              <option value="">Select lock duration</option>
              <option value="1yr">1 Year (0.5% monthly)</option>
              <option value="2yr">2 Years (1.0% monthly)</option>
              <option value="3yr">3 Years (1.1% monthly)</option>
            </select>
          </div>
          <button
            onClick={onUpdateLoyalty}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update Lock Duration
          </button>
        </div>
      </div>
    </div>
  );
}
