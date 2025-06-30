import React, { useEffect, useState } from "react";
import APIAgent from "@/agents/APIAgent";

// Mock hook (replace with real one)
const useSQLLevel = () => "normal"; // or "high", "enterprise"
const useFranchiseId = () => "lahore-001"; // mock franchiseId

const FranchiseStatsBox = () => {
  const sqlLevel = useSQLLevel();
  const franchiseId = useFranchiseId();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAreaModal, setShowAreaModal] = useState(false);

  useEffect(() => {
    if (!franchiseId) return;
    setLoading(true);
    APIAgent.get(`/franchise/${franchiseId}`)
      .then((res) => setStats(res.data))
      .catch((err) => setError("Failed to load stats"))
      .finally(() => setLoading(false));
  }, [franchiseId]);

  if (sqlLevel !== "normal" && sqlLevel !== "high" && sqlLevel !== "enterprise") {
    return null;
  }

  if (loading) return <div className="p-4">Loading franchise stats...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!stats) return null;

  return (
    <div className="border rounded-lg p-6 bg-white shadow max-w-xl mx-auto">
      <div className="mb-2 text-lg font-bold flex items-center">
        🏢 Franchise: {stats.name} (Level {stats.level} - SQL Verified)
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[120px]">
          <span className="block text-gray-500">📦 Total Orders</span>
          <span className="text-xl font-semibold">{stats.orders.toLocaleString()}</span>
        </div>
        <div className="flex-1 min-w-[120px]">
          <span className="block text-gray-500">💰 Total Income</span>
          <span className="text-xl font-semibold">${stats.income.toLocaleString()}</span>
        </div>
        <div className="flex-1 min-w-[120px]">
          <span className="block text-gray-500">🛠️ Pending Complaints</span>
          <span className="text-xl font-semibold">{stats.pendingComplaints}</span>
        </div>
        <div className="flex-1 min-w-[120px]">
          <span className="block text-gray-500">❌ Missed Orders</span>
          <span className="text-xl font-semibold">{stats.missedOrders} <span className="text-xs">(⏱ fines applicable)</span></span>
        </div>
      </div>
      <div className="mb-4">
        <span className="block text-gray-500">🎖️ SQL Score</span>
        <span className="text-lg font-bold">{stats.sqlScore} / 5.0 {stats.sqlScore >= 4 ? <span className="text-green-600">(↑ High)</span> : <span className="text-yellow-600">(Average)</span>}</span>
      </div>
      <div className="flex gap-4">
        <button
          className="bg-ehb-primary text-white px-4 py-2 rounded"
          onClick={() => setShowAreaModal(true)}
        >
          📊 View Area Breakdown
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
          onClick={() => window.location.href = "/franchise/complaints"}
        >
          📁 View Complaint Logs
        </button>
      </div>
      {showAreaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 min-w-[320px] max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowAreaModal(false)}
            >✖</button>
            <h3 className="text-lg font-bold mb-2">Area Breakdown</h3>
            <ul>
              {stats.areaStats && stats.areaStats.length > 0 ? (
                stats.areaStats.map((area) => (
                  <li key={area.area} className="mb-1 flex justify-between">
                    <span>{area.area}</span>
                    <span>
                      {area.orders} orders, ${area.income}
                    </span>
                  </li>
                ))
              ) : (
                <li>No area stats available.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FranchiseStatsBox; 