import React, { useEffect, useState } from "react";
import APIAgent from "@/agents/APIAgent";

const mockUserId = "U1029";

const AffiliateTrackerPanel = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  // Mock graph data
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await APIAgent.get(`/affiliate/summary?userId=${mockUserId}`);
        setSummary(res.data);
      } catch (err) {
        setError("Failed to load affiliate summary");
      } finally {
        setLoading(false);
      }
    };
    const fetchGraph = async () => {
      try {
        const res = await APIAgent.get(`/affiliate/graph?userId=${mockUserId}`);
        setGraph(res.data);
      } catch {}
    };
    fetchSummary();
    fetchGraph();
  }, []);

  const handleCopy = () => {
    if (summary?.referralCode) {
      navigator.clipboard.writeText(summary.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  // AI Alert: L3 inactive
  const l3 = summary?.levels?.find(l => l.level === 3);
  const l3Inactive = l3 && l3.earning < 10;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🔗 Your Affiliate Code: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{summary?.referralCode || "-"}</span>
        <button onClick={handleCopy} className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded">📋 Copy</button>
        {copied && <span className="ml-2 text-green-600 text-xs">Copied!</span>}
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : summary ? (
        <>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[120px]">
              <span className="block text-gray-500">📥 Total Referred Users</span>
              <span className="text-xl font-semibold">{summary.totalUsers}</span>
            </div>
            <div className="flex-1 min-w-[120px]">
              <span className="block text-gray-500">💸 Total Earned</span>
              <span className="text-xl font-semibold">${summary.totalEarnings?.toFixed(2)}</span>
            </div>
            <div className="flex-1 min-w-[120px]">
              <span className="block text-gray-500">🎖️ SQL Level</span>
              <span className="text-lg font-bold">{summary.sqlLevel}</span>
            </div>
            <div className="flex-1 min-w-[120px]">
              <span className="block text-gray-500">🏅 Rank</span>
              <span className="text-lg font-bold">{summary.rank} Influencer</span>
            </div>
          </div>
          {/* Chart placeholders */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-gray-50 rounded p-3 text-center">
              📊 <span className="font-semibold">Monthly Earnings Chart</span>
              <div className="h-16 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
            </div>
            <div className="flex-1 bg-gray-50 rounded p-3 text-center">
              📈 <span className="font-semibold">Weekly Growth</span>
              <div className="h-16 flex items-center justify-center text-gray-400">[Line Graph Placeholder]</div>
            </div>
          </div>
          {/* Downline Table */}
          <div className="mb-2 font-semibold">📂 Downline Summary:</div>
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-1 px-2">Level</th>
                <th>Users</th>
                <th>Orders</th>
                <th>Earnings</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {summary.levels?.map((lvl) => (
                <tr key={lvl.level} className="text-center">
                  <td className="py-1 px-2">L{lvl.level}</td>
                  <td>{lvl.users}</td>
                  <td>{lvl.orders}</td>
                  <td>${lvl.earning?.toFixed(2)}</td>
                  <td>{lvl.earning > 0 ? "Active" : "Low Actv"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* AI Alert */}
          {l3Inactive && (
            <div className="mb-2 text-yellow-600 text-xs">🧠 AI: L3 is inactive, consider replacement/refocus</div>
          )}
          <div className="flex gap-3 mt-2">
            <button className="bg-ehb-primary text-white px-4 py-2 rounded">📈 Upgrade Level</button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">🎯 Set Target Bonus Goal</button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AffiliateTrackerPanel; 