'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Section {
  title: string;
  content: React.ReactNode;
}

const RoadmapPage = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const sections: { [key: string]: Section } = {
    overview: {
      title: 'Company Overview',
      content: (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">EHB Technologies Limited</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700">Mission</h4>
                <p className="text-gray-600">To provide 100% verified, AI-powered, blockchain-backed global services and products through a decentralized ecosystem accessible to every individual.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Vision</h4>
                <p className="text-gray-600">To become the world's leading unified service platform where users can trust, earn, learn, and transact securely, across all industries and countries, with full transparency and automation.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    departments: {
      title: 'Departments',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'PSS', desc: 'Handles verification of users, businesses, services, and products', status: 'In Progress' },
            { name: 'EDR', desc: 'Verifies real-world skills and knowledge through online/offline testing', status: 'In Progress' },
            { name: 'EMO', desc: 'Local physical and digital office hub for documentation and service verification', status: 'Planned' },
            { name: 'JPS', desc: 'Manages all user profiles and connects job seekers with service needs', status: 'In Progress' },
            { name: 'Franchise', desc: 'Manages global franchise network (sub, master, corporate)', status: 'Planned' },
            { name: 'AI/Agents', desc: 'Oversees AI agents across services and system logic', status: 'In Progress' },
          ].map((dept) => (
            <motion.div
              key={dept.name}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold mb-2">{dept.name}</h3>
              <p className="text-gray-600 mb-2">{dept.desc}</p>
              <span className={`inline-block px-2 py-1 rounded text-sm ${
                dept.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {dept.status}
              </span>
            </motion.div>
          ))}
        </div>
      ),
    },
    techStack: {
      title: 'Tech Stack',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { layer: 'Frontend', tech: 'Next.js, React, TailwindCSS, TypeScript', notes: 'Dynamic dashboards, card system' },
            { layer: 'Backend', tech: 'Node.js, Express.js, TypeScript, JWT, Bcrypt', notes: 'RESTful APIs, business logic' },
            { layer: 'Database', tech: 'MongoDB, Mongoose', notes: 'JSON-like structure' },
            { layer: 'Blockchain', tech: 'Solidity, Moonbeam, Polkadot (Planned)', notes: 'Coin lock, validator contracts' },
            { layer: 'AI/Voice', tech: 'OpenAI API, Whisper, LangChain', notes: 'Agent automation' },
            { layer: 'DevOps', tech: 'Vercel, Docker, GitHub Actions, AWS EC2', notes: 'CI/CD, auto-sync' },
          ].map((tech) => (
            <div key={tech.layer} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">{tech.layer}</h3>
              <p className="text-gray-700 mb-1">{tech.tech}</p>
              <p className="text-sm text-gray-500">{tech.notes}</p>
            </div>
          ))}
        </div>
      ),
    },
    phases: {
      title: 'Roadmap Phases',
      content: (
        <div className="space-y-4">
          {[
            { phase: 'Foundation', focus: 'Infrastructure', desc: 'Set up dashboards, routing, MongoDB, wallets, auth, franchises' },
            { phase: 'MVP', focus: 'Core Modules', desc: 'GoSellr, JPS, SQL Engine, Wallet, Complaint System, AI Marketplace' },
            { phase: 'Launch', focus: 'Blockchain + Payout', desc: 'Moonbeam integration, smart contracts, validator payouts' },
            { phase: 'Growth', focus: 'Departments', desc: 'Education, Law, Health, OBS, AGTS full launch' },
            { phase: 'Scale', focus: 'Globalization', desc: 'Multi-language, CDN, i18n, CMS, analytics, auto AI workflows' },
          ].map((phase) => (
            <motion.div
              key={phase.phase}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">{phase.phase}</h3>
                <span className="text-sm text-gray-500">{phase.focus}</span>
              </div>
              <p className="text-gray-600">{phase.desc}</p>
            </motion.div>
          ))}
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">EHB Technologies Master Roadmap</h1>
        
        {/* Navigation */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeSection === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {sections[key].title}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          {sections[activeSection].content}
        </motion.div>
      </div>
    </div>
  );
};

export default RoadmapPage; 