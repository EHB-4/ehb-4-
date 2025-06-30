import React, { useEffect, useState } from "react";
import APIAgent from "@/agents/APIAgent";

const FILTER_TYPES = [
  { value: "all", label: "All" },
  { value: "order", label: "Order" },
  { value: "refund", label: "Refund" },
  { value: "franchise", label: "Franchise" },
  { value: "bonus", label: "Bonus" },
  { value: "withdraw", label: "Withdrawal" },
  { value: "sql", label: "SQL" },
];

const mockUserId = "U1029";

const WalletHistory = () => {
  const [filter, setFilter] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  // Totals
  const totalIn = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalOut = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // AI Tag Suggestions (mock)
  const aiTags = [
    "Franchise Commission",
    "Late Refunds",
    "SQL Upgrades",
    "Suspicious Activity",
  ];

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      let url = `/wallet/history?userId=${mockUserId}`;
      if (from) url += `&from=${from}`;
      if (to) url += `&to=${to}`;
      const res = await APIAgent.get(url);
      let data = res.data;
      if (filter !== "all") {
        data = data.filter((t) => t.type === filter);
      }
      setTransactions(data);
    } catch (err) {
      setError("Failed to fetch wallet history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [filter, from, to]);

  // CSV Export (mock)
  const exportCSV = () => {
    const header = "Date,Amount,Type,Description,Status,OrderId\n";
    const rows = transactions.map(t => `${t.date},${t.amount},${t.type},${t.description},${t.status},${t.relatedOrderId || ""}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wallet-history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">💼 EHB Wallet – Transaction History</h2>
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <span className="font-semibold">🔎 Filter by:</span>
        {FILTER_TYPES.map((f) => (
          <button
            key={f.value}
            className={`px-2 py-1 rounded text-sm ${filter === f.value ? "bg-ehb-primary text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-4 font-semibold">📅</span>
        <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="border rounded px-2 py-1 text-sm" />
        <input type="date" value={to} onChange={e => setTo(e.target.value)} className="border rounded px-2 py-1 text-sm" />
        <button onClick={fetchHistory} className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded">🔄 Refresh</button>
        <button onClick={exportCSV} className="ml-2 px-2 py-1 text-xs bg-ehb-primary text-white rounded">⬇️ Export CSV</button>
      </div>
      {/* AI Tag Suggestions */}
      <div className="mb-2 text-xs text-gray-500">
        <span className="font-semibold">🧠 AI Tags:</span> {aiTags.map(tag => <span key={tag} className="ml-1 bg-ehb-primary/10 text-ehb-primary px-2 py-0.5 rounded-full">{tag}</span>)}
      </div>
      <div className="mb-2 text-sm text-gray-700">
        <span className="font-semibold">📊 Total In:</span> ${totalIn.toFixed(2)} &nbsp; | &nbsp;
        <span className="font-semibold">Total Out:</span> ${totalOut.toFixed(2)}
      </div>
      <div className="border-t pt-2 mt-2">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : transactions.length === 0 ? (
          <div>No transactions found.</div>
        ) : (
          <ul>
            {transactions.map((t) => (
              <li key={t.id} className="mb-4 border-b pb-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">📌 {new Date(t.date).toLocaleDateString()} – {t.type === "order" && t.relatedOrderId ? `Order #${t.relatedOrderId}` : t.description}</span>
                </div>
                <div className="flex items-center gap-2 text-xs mt-1">
                  <span className={t.amount > 0 ? "text-green-600" : "text-red-600"}>{t.amount > 0 ? `💰 +$${t.amount.toFixed(2)}` : `💳 -$${Math.abs(t.amount).toFixed(2)}`}</span>
                  <span>| {t.description}</span>
                  <span>| Status: {t.status.charAt(0).toUpperCase() + t.status.slice(1)}</span>
                  {t.relatedOrderId && (
                    <a href={`/orders/${t.relatedOrderId}`} className="ml-2 text-ehb-primary underline">View Order</a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WalletHistory; 