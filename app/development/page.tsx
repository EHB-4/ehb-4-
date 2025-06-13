import React from 'react';
import Link from 'next/link';
import { FaMap, FaRobot, FaCogs, FaFolderOpen } from 'react-icons/fa';

const companyInfo = {
  name: 'EHB Technologies',
  description: 'A modern software house delivering innovative solutions.',
  version: '1.0.0',
  contact: 'info@ehb.com',
  address: 'Karachi, Pakistan',
};

const roadmapPhases = [
  { phase: 'Foundation', status: 'Completed', color: 'bg-green-500' },
  { phase: 'Development', status: 'In Progress', color: 'bg-blue-500' },
  { phase: 'Growth', status: 'Upcoming', color: 'bg-yellow-500' },
  { phase: 'Scale', status: 'Upcoming', color: 'bg-gray-400' },
];

const agents = [
  { name: 'Alpha', role: 'Lead AI Agent', status: 'Active' },
  { name: 'Beta', role: 'QA Agent', status: 'Active' },
  { name: 'Gamma', role: 'DevOps Agent', status: 'Idle' },
];

const services = [
  'ehb-ai-agent', 'config', 'api', 'admin', 'dashboard', 'contracts', 'roadmap', 'ehb-dashboard', 'obs', 'ehb-franchise', 'ehb-home-page', 'ehb-wallet', 'am-affiliate', 'ehb-ai-market-place', 'ehb-tube', 'ehb-ads', 'hps', 'gosellr', 'emo', 'wallet', 'edr', 'ai', 'unauthorized', 'profile', 'signup', 'login', 'assistant', 'franchise', 'pss', 'jps'
];

export default function DevelopmentPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-10 px-4">
      {/* Roadmap Section */}
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 mb-10">
        <div className="flex items-center mb-6">
          <FaMap className="text-blue-400 w-8 h-8 mr-3" />
          <h1 className="text-3xl font-bold text-white">Project Roadmap</h1>
        </div>
        <div className="mb-4 text-gray-300">
          <div><b>Company:</b> {companyInfo.name}</div>
          <div><b>Description:</b> {companyInfo.description}</div>
          <div><b>Version:</b> {companyInfo.version}</div>
          <div><b>Contact:</b> {companyInfo.contact}</div>
          <div><b>Address:</b> {companyInfo.address}</div>
        </div>
        <div className="flex space-x-4 mt-4">
          {roadmapPhases.map((phase) => (
            <div key={phase.phase} className={`flex-1 rounded-lg p-4 text-center text-white ${phase.color}`}>
              <div className="font-bold text-lg">{phase.phase}</div>
              <div className="text-sm">{phase.status}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-gray-400 text-sm">
          <b>Note:</b> Roadmap par multiple agents kaam kar rahe hain jo development ko monitor karte hain, har phase ki zimmedari alag agent ke paas hai.
        </div>
      </div>

      {/* EHB AI Agent Section */}
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 mb-10">
        <div className="flex items-center mb-6">
          <FaRobot className="text-green-400 w-8 h-8 mr-3" />
          <h2 className="text-2xl font-bold text-white">EHB AI Agents</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent.name} className="bg-gray-900 rounded-lg p-4 flex flex-col items-center">
              <FaCogs className="text-blue-300 w-6 h-6 mb-2" />
              <div className="text-lg text-white font-semibold">{agent.name}</div>
              <div className="text-gray-400 text-sm">{agent.role}</div>
              <div className={`mt-2 px-2 py-1 rounded-full text-xs font-bold ${agent.status === 'Active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}>{agent.status}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-gray-400 text-sm">
          <b>Note:</b> Har agent roadmap ke ek hissa ko handle karta hai, aur development ki nagrani karta hai.
        </div>
      </div>

      {/* All Services/Components Section */}
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 mb-10">
        <div className="flex items-center mb-6">
          <FaFolderOpen className="text-yellow-400 w-8 h-8 mr-3" />
          <h2 className="text-2xl font-bold text-white">All Project Services & Components</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link key={service} href={`/${service}`}>
              <div className="bg-gray-900 hover:bg-blue-900 transition rounded-lg p-4 cursor-pointer flex items-center space-x-3">
                <FaCogs className="text-blue-400 w-5 h-5" />
                <span className="text-white font-medium">{service.replace(/-/g, ' ').toUpperCase()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
