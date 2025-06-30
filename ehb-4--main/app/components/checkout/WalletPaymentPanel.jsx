import React, { useState } from "react";
import APIAgent from "@/agents/APIAgent";

// Mock hooks (replace with real ones if available)
const useWallet = () => {
  const [balance, setBalance] = useState(120); // mock value
  const refresh = () => setBalance(balance); // mock refresh
  return { balance, refresh, loading: false };
};
const useSQLLevel = () => "normal"; // mock value

const WalletPaymentPanel = ({ orderTotal, userId, orderId, onSuccess }) => {
  const { balance, refresh, loading } = useWallet();
  const sqlLevel = useSQLLevel();
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  if (sqlLevel !== "normal" && sqlLevel !== "high" && sqlLevel !== "premium" && sqlLevel !== "enterprise") {
    return null;
  }

  const handlePay = async () => {
    setError("");
    setPaying(true);
    try {
      const res = await APIAgent.post("/wallet/pay", { userId, orderId, amount: orderTotal });
      if (res.data.success) {
        if (onSuccess) onSuccess(res.data);
      } else {
        setError(res.data.error || "Payment failed");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Insufficient balance");
    } finally {
      setPaying(false);
      refresh();
    }
  };

  return (
    <div className="border rounded p-4 bg-white shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">💼 Wallet Balance:</span>
        <span className="text-lg font-bold">${balance.toFixed(2)}</span>
        <button onClick={refresh} disabled={loading} className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded">Refresh</button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">🧾 Order Total:</span>
        <span className="text-lg">${orderTotal.toFixed(2)}</span>
      </div>
      {balance < orderTotal && (
        <div className="text-red-600 mb-2">⚠️ Insufficient balance. Please use another payment method.</div>
      )}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button
        className="w-full bg-ehb-primary text-white py-2 rounded disabled:opacity-50"
        onClick={handlePay}
        disabled={balance < orderTotal || paying}
      >
        {paying ? "Processing..." : "Pay with Wallet"}
      </button>
      <div className="mt-3 text-center text-sm text-gray-500">
        Or use another payment method
      </div>
    </div>
  );
};

export default WalletPaymentPanel; 