'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCode, FaUsers, FaChartLine } from 'react-icons/fa';
import { roadmapData } from './data/roadmapData';
import { roadmapAgentMap } from './roadmapAgentMap';

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  planned: 'bg-blue-100 text-blue-800',
  error: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
  error: 'Error',
};

const RoadmapPage = () => {
  const modules = roadmapData.modules;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Project Roadmap</h1>
          <p className="text-xl text-gray-300">Our journey to build something amazing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{module.name}</h2>
                  <p className="text-gray-600">{module.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center ${statusColors[module.status]}`}>{statusLabels[module.status]}</div>
              </div>
              <div className="mb-2 text-xs text-gray-500">Progress: {module.progress}%</div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Team:</span> {module.team.join(', ')}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Features:</span>
                <ul className="list-disc ml-6 text-gray-700">
                  {module.features.map((feature, idx) => (
                    <li key={idx}>{typeof feature === 'string' ? feature : feature.name}</li>
                  ))}
                </ul>
              </div>
              {roadmapAgentMap[module.name as keyof typeof roadmapAgentMap] && (
                <div className="mt-2">
                  <span className="font-semibold text-gray-700">Agents:</span>
                  <ul className="list-disc ml-6 text-blue-700">
                    {(roadmapAgentMap[module.name as keyof typeof roadmapAgentMap] || []).map((agent: string) => (
                      <li key={agent}>{agent}</li>
                    ))}
                  </ul>
                </div>
              )}
              {module.status === 'error' && module.error && (
                <div className="mt-2 text-red-600 text-sm">Error: {module.error}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage; 