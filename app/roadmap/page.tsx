'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCode, FaUsers, FaChartLine } from 'react-icons/fa';

const RoadmapPage = () => {
  const phases = [
    {
      title: 'Phase 1: Foundation',
      icon: <FaRocket className="w-8 h-8 text-blue-500" />,
      items: [
        'Project Setup & Architecture',
        'Core Features Implementation',
        'Basic UI/UX Design',
        'Initial Testing & QA'
      ],
      status: 'completed'
    },
    {
      title: 'Phase 2: Development',
      icon: <FaCode className="w-8 h-8 text-green-500" />,
      items: [
        'Advanced Features Development',
        'API Integration',
        'Performance Optimization',
        'Security Implementation'
      ],
      status: 'in-progress'
    },
    {
      title: 'Phase 3: Growth',
      icon: <FaUsers className="w-8 h-8 text-purple-500" />,
      items: [
        'User Acquisition Strategy',
        'Community Building',
        'Feedback Collection',
        'Feature Refinement'
      ],
      status: 'upcoming'
    },
    {
      title: 'Phase 4: Scale',
      icon: <FaChartLine className="w-8 h-8 text-orange-500" />,
      items: [
        'Market Expansion',
        'Advanced Analytics',
        'Enterprise Features',
        'Global Deployment'
      ],
      status: 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Project Roadmap</h1>
          <p className="text-xl text-gray-300">Our journey to build something amazing</p>
        </div>

        <div className="space-y-12">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 border-2 border-gray-700">
                    {phase.icon}
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{phase.title}</h3>
                  <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <ul className="space-y-4">
                      {phase.items.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.2) + (itemIndex * 0.1) }}
                          className="flex items-center text-gray-300"
                        >
                          <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                        phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {index < phases.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-700"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage; 