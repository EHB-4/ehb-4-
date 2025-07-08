'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [agentStatus, setAgentStatus] = useState('🟢 Agent Running');
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    // Update time every second to show continuous operation
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
      setUpdateCount(prev => prev + 1);
    }, 1000);

    // Simulate agent status updates
    const statusInterval = setInterval(() => {
      const statuses = [
        '🟢 Agent Running',
        '🟡 Agent Monitoring',
        '🔵 Agent Processing',
        '🟢 Agent Running'
      ];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setAgentStatus(randomStatus);
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            EHB Next.js 04 - Continuous Agent
          </h1>
          <p className="text-xl text-gray-600">
            Frontend Development Platform with Continuous Agent Monitoring
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Agent Status */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Agent Status</h3>
            <p className="text-2xl font-bold text-green-600">{agentStatus}</p>
            <p className="text-sm text-gray-500 mt-2">Continuous monitoring active</p>
          </div>

          {/* Current Time */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Time</h3>
            <p className="text-2xl font-bold text-blue-600">
              {currentTime.toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">Live updates every second</p>
          </div>

          {/* Update Counter */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Updates</h3>
            <p className="text-2xl font-bold text-purple-600">{updateCount}</p>
            <p className="text-sm text-gray-500 mt-2">Total updates since start</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend Features */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Frontend Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Next.js 14+ App Router
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                TypeScript Support
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Tailwind CSS Styling
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Responsive Design
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Component Library
              </li>
            </ul>
          </div>

          {/* Agent Features */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Agent Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Continuous Monitoring
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Auto-Recovery
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Memory Management
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Process Cleanup
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Health Checks
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            EHB Next.js 04 - Continuous Agent is running smoothly! 🚀
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {currentTime.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
