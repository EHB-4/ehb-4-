'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

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
                <p className="text-gray-600">
                  To provide 100% verified, AI-powered, blockchain-backed global services and
                  products through a decentralized ecosystem accessible to every individual.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Vision</h4>
                <p className="text-gray-600">
                  To become the world's leading unified service platform where users can trust,
                  earn, learn, and transact securely, across all industries and countries, with full
                  transparency and automation.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    services: {
      title: 'All EHB Services',
      content: (
        <div className="space-y-6">
          {/* Core Services */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-600">🚀 Core Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'GoSellr',
                  desc: 'E-commerce & Delivery Platform',
                  status: 'Active',
                  category: 'E-commerce',
                },
                {
                  name: 'EHB Wallet',
                  desc: 'Digital Wallet & Transactions',
                  status: 'Active',
                  category: 'Finance',
                },
                {
                  name: 'EHB Dashboard',
                  desc: 'Unified User Dashboard',
                  status: 'Active',
                  category: 'Platform',
                },
                {
                  name: 'AI Marketplace',
                  desc: 'AI-Powered Service Discovery',
                  status: 'Active',
                  category: 'Technology',
                },
                {
                  name: 'EHB Franchise',
                  desc: 'Franchise Management System',
                  status: 'Active',
                  category: 'Business',
                },
                {
                  name: 'EHB-Tube',
                  desc: 'Video Content Platform',
                  status: 'Active',
                  category: 'Media',
                },
                {
                  name: 'EHB-Ads',
                  desc: 'Advertising Platform',
                  status: 'Active',
                  category: 'Marketing',
                },
              ].map(service => (
                <motion.div
                  key={service.name}
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                >
                  <h4 className="font-bold text-blue-800">{service.name}</h4>
                  <p className="text-blue-600 text-sm mb-2">{service.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-500">{service.category}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {service.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Department Services */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-green-600">🏢 Department Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'PSS',
                  desc: 'Public Safety System - Verification & KYC',
                  status: 'In Progress',
                  category: 'Security',
                },
                {
                  name: 'EDR',
                  desc: 'Education & Digital Resources',
                  status: 'In Progress',
                  category: 'Education',
                },
                {
                  name: 'EMO',
                  desc: 'Health & Medical Services',
                  status: 'Planned',
                  category: 'Healthcare',
                },
                {
                  name: 'JPS',
                  desc: 'Justice & Public Services',
                  status: 'In Progress',
                  category: 'Legal',
                },
                {
                  name: 'OBS',
                  desc: 'Online Book Store & Study Pool',
                  status: 'Active',
                  category: 'Education',
                },
                {
                  name: 'HPS',
                  desc: 'Health & Public Services',
                  status: 'Active',
                  category: 'Healthcare',
                },
                {
                  name: 'AGTS',
                  desc: 'Travel & Tourism Services',
                  status: 'Active',
                  category: 'Travel',
                },
                { name: 'OLS', desc: 'Online Legal Services', status: 'Active', category: 'Legal' },
                {
                  name: 'WMS',
                  desc: 'Warehouse Management System',
                  status: 'Active',
                  category: 'Logistics',
                },
              ].map(service => (
                <motion.div
                  key={service.name}
                  whileHover={{ scale: 1.02 }}
                  className="bg-green-50 p-4 rounded-lg border border-green-200"
                >
                  <h4 className="font-bold text-green-800">{service.name}</h4>
                  <p className="text-green-600 text-sm mb-2">{service.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-500">{service.category}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        service.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : service.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Support Services */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-purple-600">🛠️ Support Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'AI Assistant',
                  desc: 'AI-Powered Customer Support',
                  status: 'Active',
                  category: 'AI',
                },
                {
                  name: 'Admin Panel',
                  desc: 'Administrative Management',
                  status: 'Active',
                  category: 'Management',
                },
                {
                  name: 'Profile System',
                  desc: 'User Profile Management',
                  status: 'Active',
                  category: 'User',
                },
                {
                  name: 'Authentication',
                  desc: 'Login/Signup System',
                  status: 'Active',
                  category: 'Security',
                },
                {
                  name: 'Notifications',
                  desc: 'Push & Email Notifications',
                  status: 'Active',
                  category: 'Communication',
                },
                {
                  name: 'Analytics',
                  desc: 'Data Analytics & Reports',
                  status: 'Active',
                  category: 'Analytics',
                },
                {
                  name: 'Search',
                  desc: 'Global Search System',
                  status: 'Active',
                  category: 'Search',
                },
                {
                  name: 'Cart System',
                  desc: 'Shopping Cart Management',
                  status: 'Active',
                  category: 'E-commerce',
                },
                {
                  name: 'Wishlist',
                  desc: 'User Wishlist Management',
                  status: 'Active',
                  category: 'E-commerce',
                },
              ].map(service => (
                <motion.div
                  key={service.name}
                  whileHover={{ scale: 1.02 }}
                  className="bg-purple-50 p-4 rounded-lg border border-purple-200"
                >
                  <h4 className="font-bold text-purple-800">{service.name}</h4>
                  <p className="text-purple-600 text-sm mb-2">{service.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-purple-500">{service.category}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {service.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    affiliate: {
      title: 'EHB Affiliate Program',
      content: (
        <div className="space-y-6">
          {/* Program Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-orange-600">
              🌟 EHB Affiliate Program Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Program Details</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    • <strong>Type:</strong> Hybrid (Referral + Binary + Performance)
                  </li>
                  <li>
                    • <strong>Access:</strong> Active by default for all EHB users
                  </li>
                  <li>
                    • <strong>Goal:</strong> Global User Acquisition & Passive Income
                  </li>
                  <li>
                    • <strong>Structure:</strong> 5-Level Referral + Binary Tree
                  </li>
                  <li>
                    • <strong>Integration:</strong> All EHB Services & Franchise
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Key Features</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Affiliate Store (Auto-generated)</li>
                  <li>• Share-to-Earn System</li>
                  <li>• Video Link Earnings</li>
                  <li>• AI Affiliate Link Generator</li>
                  <li>• Loyalty Wallet System</li>
                  <li>• BEP20 Auto Withdraw</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SQL Level System */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-600">
              📊 SQL Level System (Affiliate Eligibility)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="p-3 text-left font-semibold text-blue-800">SQL Level</th>
                    <th className="p-3 text-left font-semibold text-blue-800">Requirements</th>
                    <th className="p-3 text-left font-semibold text-blue-800">
                      Affiliate Eligibility
                    </th>
                    <th className="p-3 text-left font-semibold text-blue-800">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      level: 'SQL-Free',
                      req: 'Registered only',
                      eligibility: '❌ Not eligible for withdrawals',
                      notes: 'Balance usable to activate own account',
                    },
                    {
                      level: 'SQL-Basic',
                      req: 'PSS KYC Done',
                      eligibility: '✅ Limited withdrawal unlocked',
                      notes: 'Eligible for L1 direct earnings',
                    },
                    {
                      level: 'SQL-Normal',
                      req: 'PSS + EDR verified',
                      eligibility: '✅ L1-L2 activated',
                      notes: 'Auto coin burn discount starts',
                    },
                    {
                      level: 'SQL-High',
                      req: 'Full EDR + EMO',
                      eligibility: '✅ Full 5-Level tree & Binary unlocked',
                      notes: 'Can activate validator option',
                    },
                    {
                      level: 'SQL-VIP',
                      req: 'Rank + Validator Hold',
                      eligibility: '✅ All bonuses + validator node',
                      notes: 'Smart contract earnings active',
                    },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-blue-100">
                      <td className="p-3 font-medium text-blue-700">{row.level}</td>
                      <td className="p-3 text-blue-600">{row.req}</td>
                      <td className="p-3 text-blue-600">{row.eligibility}</td>
                      <td className="p-3 text-blue-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Commission Structure */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-purple-600">💰 Commission Structure</h3>

            {/* 5-Level Referral System */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-purple-700 mb-3">
                🎯 5-Level Referral System
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { level: 'L1 (Direct)', commission: '20%', color: 'bg-purple-100' },
                  { level: 'L2', commission: '10%', color: 'bg-blue-100' },
                  { level: 'L3', commission: '5%', color: 'bg-green-100' },
                  { level: 'L4', commission: '3%', color: 'bg-yellow-100' },
                  { level: 'L5', commission: '2%', color: 'bg-red-100' },
                  { level: 'Total', commission: '40%', color: 'bg-purple-200' },
                ].map(item => (
                  <div key={item.level} className={`${item.color} p-4 rounded-lg border`}>
                    <h5 className="font-bold text-gray-800">{item.level}</h5>
                    <p className="text-2xl font-bold text-purple-600">{item.commission}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Binary Tree */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-purple-700 mb-3">
                🎯 Binary Tree (SQL-High or Validator only)
              </h4>
              <div className="bg-purple-50 p-4 rounded-lg">
                <ul className="space-y-2 text-purple-700">
                  <li>
                    • <strong>Left & Right Matching:</strong> Weekly payout based on weaker leg
                  </li>
                  <li>
                    • <strong>Max Capping:</strong> Based on package level
                  </li>
                  <li>
                    • <strong>Carry Over:</strong> Yes (Lifetime till inactivity for 60 days)
                  </li>
                </ul>
              </div>
            </div>

            {/* Bonus Types */}
            <div>
              <h4 className="text-lg font-semibold text-purple-700 mb-3">🎯 Bonus Types</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    type: 'Quick Bonus',
                    criteria: '5 Franchise Sales in 1 Month',
                    reward: 'Free franchise of lowest level sold',
                  },
                  {
                    type: 'Weekly Rank Bonus',
                    criteria: '5 Directs in 7 Days',
                    reward: 'Auto upgrade to one level above',
                  },
                  {
                    type: 'Loyalty Coin Lock Bonus',
                    criteria: 'Lock EHBGC for 1–3 years',
                    reward: '0.5% – 1.1% Monthly',
                  },
                  {
                    type: 'Milestone Bonus',
                    criteria: 'Team size (25, 100, 500, 1000)',
                    reward: 'Ranks + Special gifts',
                  },
                  {
                    type: 'Franchise Reward',
                    criteria: 'From Sub-Franchise sale',
                    reward: '5% of total sale to local franchise',
                  },
                  {
                    type: 'Validator Monthly Bonus',
                    criteria: 'Locked validator coins',
                    reward: 'Staking rewards auto in EHBGC',
                  },
                ].map(bonus => (
                  <div
                    key={bonus.type}
                    className="bg-purple-50 p-4 rounded-lg border border-purple-200"
                  >
                    <h5 className="font-bold text-purple-800 mb-2">{bonus.type}</h5>
                    <p className="text-sm text-purple-600 mb-1">
                      <strong>Criteria:</strong> {bonus.criteria}
                    </p>
                    <p className="text-sm text-purple-600">
                      <strong>Reward:</strong> {bonus.reward}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Program Features */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-green-600">🚀 Advanced Program Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'Affiliate Store',
                  desc: 'Mini store like Amazon for each user (auto-generated)',
                  status: 'Active',
                },
                {
                  name: 'Share-to-Earn',
                  desc: 'One-click share via WhatsApp, TikTok, FB, etc.',
                  status: 'Active',
                },
                {
                  name: 'Video Link Earnings',
                  desc: 'EHB-Tube integrated — product review video earns',
                  status: 'Active',
                },
                { name: 'OBS Integration', desc: 'Bookstore affiliate tracking', status: 'Active' },
                {
                  name: 'AI Affiliate Link Generator',
                  desc: 'Auto-tag all links per user ID',
                  status: 'Active',
                },
                {
                  name: 'Franchise Auto-Profit',
                  desc: "Earn even if you didn't sell (unassigned franchise)",
                  status: 'Active',
                },
                {
                  name: 'Loyalty Wallet System',
                  desc: 'All bonuses go to Trusty Wallet (with lock + unlock options)',
                  status: 'Active',
                },
                {
                  name: 'BEP20 Auto Withdraw',
                  desc: 'Wallet setup → Auto send in USDT (optional)',
                  status: 'Active',
                },
                {
                  name: 'Country-Specific Tax Config',
                  desc: 'Tax, GST, or VAT auto deducted (by region)',
                  status: 'Active',
                },
              ].map(feature => (
                <motion.div
                  key={feature.name}
                  whileHover={{ scale: 1.02 }}
                  className="bg-green-50 p-4 rounded-lg border border-green-200"
                >
                  <h4 className="font-bold text-green-800">{feature.name}</h4>
                  <p className="text-green-600 text-sm mb-2">{feature.desc}</p>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    {feature.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tools & Dashboard */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-600">🛠️ Tools & Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'Affiliate Dashboard',
                  desc: 'Earnings, team, bonus, ranks',
                  status: 'Active',
                },
                { name: 'My Network', desc: 'Tree view (5-level + binary)', status: 'Active' },
                {
                  name: 'Commission Tracker',
                  desc: 'Real-time commission graph + earnings list',
                  status: 'Active',
                },
                {
                  name: 'Withdrawal Panel',
                  desc: 'Instant withdraw to EHB wallet or BEP20',
                  status: 'Active',
                },
                {
                  name: 'Storefront Manager',
                  desc: 'Add banners, review links, products',
                  status: 'Active',
                },
                { name: 'Package Booster', desc: 'Upgrade/reward tracker', status: 'Active' },
                {
                  name: 'Training Resources',
                  desc: 'How-to guides, video training, AI assistant',
                  status: 'Active',
                },
              ].map(tool => (
                <motion.div
                  key={tool.name}
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                >
                  <h4 className="font-bold text-blue-800">{tool.name}</h4>
                  <p className="text-blue-600 text-sm mb-2">{tool.desc}</p>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {tool.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-red-600">📋 Terms & Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { rule: 'Minimum Withdrawal', value: '$5' },
                { rule: 'Unlock Time', value: 'Instant (except Free SQL)' },
                { rule: 'Free SQL', value: "Can't withdraw, only self-upgrade" },
                { rule: 'Fake Referral Penalty', value: 'Auto-block & fine by PSS agent' },
                {
                  rule: 'Reward Distribution',
                  value: 'Smart contract-controlled (if onchain active)',
                },
                {
                  rule: 'Franchise Reward Lock',
                  value: "Can't convert to cash unless claimed manually",
                },
                { rule: 'Binary Freeze', value: '60 days inactivity → binary payout halted' },
                { rule: 'Package Expiry', value: 'Monthly (if not renewed, bonuses stop)' },
              ].map(term => (
                <div key={term.rule} className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-bold text-red-800">{term.rule}</h4>
                  <p className="text-red-600">{term.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Automation Ready */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4">✅ Ready for Automation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: '🧠',
                  title: 'Cursor AI',
                  desc: 'Dashboard, Smart Wallet Logic, Reward System',
                },
                {
                  icon: '🧾',
                  title: 'MongoDB Schema',
                  desc: 'affiliateUsers, affiliatePayouts, affiliateRanks',
                },
                {
                  icon: '💳',
                  title: 'Binance Smart Chain',
                  desc: 'USDT BEP20 integration (auto smart contract)',
                },
                { icon: '📱', title: 'Frontend UI', desc: 'User dashboard + store setup page' },
                {
                  icon: '🛠️',
                  title: 'Agent Automation',
                  desc: 'Affiliate Agent, Wallet Agent, PSS Agent, Franchise Agent',
                },
              ].map(item => (
                <div key={item.title} className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-indigo-600">🔧 Technical Details</h3>

            {/* API Endpoints */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-700 mb-3">🌐 API Endpoints</h4>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-indigo-600 mb-3">
                  <strong>Prefix:</strong>{' '}
                  <code className="bg-indigo-100 px-2 py-1 rounded">/api/affiliate/</code>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      method: 'POST',
                      endpoint: '/register-affiliate',
                      desc: 'New affiliate activate kare',
                    },
                    { method: 'GET', endpoint: '/my-referrals', desc: 'User ka 5-level tree' },
                    {
                      method: 'GET',
                      endpoint: '/my-commissions',
                      desc: 'Total earned, withdrawable, pending',
                    },
                    {
                      method: 'POST',
                      endpoint: '/withdraw-request',
                      desc: 'EHB Wallet ya USDT BEP20',
                    },
                    {
                      method: 'POST',
                      endpoint: '/share-product',
                      desc: 'Link tracking, share to earn',
                    },
                    {
                      method: 'GET',
                      endpoint: '/quick-bonus-status',
                      desc: 'Monthly bonus tracker',
                    },
                  ].map(api => (
                    <div
                      key={api.endpoint}
                      className="bg-white p-3 rounded border border-indigo-200"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            api.method === 'GET'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {api.method}
                        </span>
                        <code className="text-indigo-700 font-mono text-sm">{api.endpoint}</code>
                      </div>
                      <p className="text-indigo-600 text-sm">{api.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Database Schema */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-700 mb-3">
                🧾 Database Collections (MongoDB)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { collection: 'affiliateUsers', desc: 'Affiliate profile' },
                  { collection: 'affiliateEarnings', desc: 'Each bonus earned' },
                  { collection: 'affiliateWithdrawals', desc: 'Logs of all withdrawals' },
                  { collection: 'affiliateRanks', desc: 'Current rank, status' },
                  { collection: 'affiliateStoreLinks', desc: 'Store, video, banners' },
                ].map(db => (
                  <div
                    key={db.collection}
                    className="bg-indigo-50 p-4 rounded-lg border border-indigo-200"
                  >
                    <h5 className="font-bold text-indigo-800 mb-1">{db.collection}</h5>
                    <p className="text-indigo-600 text-sm">{db.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-indigo-700 mb-3">
                  🎨 Frontend Tech Stack
                </h4>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-indigo-700">
                    <li>
                      • <strong>Framework:</strong> Next.js + Tailwind CSS + Framer Motion
                    </li>
                    <li>
                      • <strong>Theme:</strong> Dark Mode Compatible + Gradient Touch
                    </li>
                    <li>
                      • <strong>Colors:</strong> Indigo (#6D28D9) + Teal (#14B8A6) + Gold (#FACC15)
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-indigo-700 mb-3">
                  🔗 Integration Details
                </h4>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-indigo-700">
                    <li>
                      • <strong>Payments:</strong> Stripe, Bank API, BSC, Easypaisa
                    </li>
                    <li>
                      • <strong>Email:</strong> Mailgun/SendinBlue
                    </li>
                    <li>
                      • <strong>Social:</strong> WhatsApp, TikTok, FB SDK
                    </li>
                    <li>
                      • <strong>AI:</strong> Voice, File Upload, Screen Recording
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Business Rules */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-teal-600">📋 Business Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Commission Validation */}
              <div>
                <h4 className="text-lg font-semibold text-teal-700 mb-3">
                  💰 Commission Validation
                </h4>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-teal-700">
                    <li>• Direct commission tab milega jab SQL-Basic ya above active ho</li>
                    <li>• L1-L5 tak commissions sirf jab levels unlocked hon</li>
                    <li>• Agar user invalid/Fake SQL se join kare → no bonus</li>
                    <li>• Coin lock bonuses tabhi milenge jab amount + time match ho</li>
                  </ul>
                </div>
              </div>

              {/* Withdrawal Rules */}
              <div>
                <h4 className="text-lg font-semibold text-teal-700 mb-3">💳 Withdrawal Rules</h4>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-teal-700">
                    <li>
                      • <strong>Minimum:</strong> $5
                    </li>
                    <li>
                      • <strong>Free SQL:</strong> Can't withdraw
                    </li>
                    <li>
                      • <strong>Verified SQL:</strong> Instant EHB wallet
                    </li>
                    <li>
                      • <strong>Auto-Send BEP20:</strong> Direct USDT transfer
                    </li>
                  </ul>
                </div>
              </div>

              {/* Error Handling */}
              <div>
                <h4 className="text-lg font-semibold text-teal-700 mb-3">⚠️ Error Handling</h4>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-teal-700">
                    <li>
                      • <strong>Frontend:</strong> Toast + red banner
                    </li>
                    <li>
                      • <strong>Backend:</strong> 409 Conflict, 422 Validation, 200 Success
                    </li>
                    <li>
                      • <strong>Validation:</strong> Real-time SQL level checks
                    </li>
                  </ul>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <h4 className="text-lg font-semibold text-teal-700 mb-3">🔔 Notifications</h4>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-teal-700">
                    <li>• Toast popup in dashboard</li>
                    <li>• Weekly bonus email summary</li>
                    <li>• In-app notification (agent by Notification Agent)</li>
                    <li>• Auto message if commission lost due to SQL rule</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* User Flow */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-600">🔄 User Flow</h3>

            {/* Registration Flow */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">
                👤 User Registration Flow
              </h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-3">
                  {[
                    { step: 1, action: 'User signs up on EHB via JPS (Job Providing Service)' },
                    {
                      step: 2,
                      action: 'User enters referral code (optional but required for affiliate)',
                    },
                    {
                      step: 3,
                      action: 'System checks SQL level → if Free, shows upgrade suggestion',
                    },
                    {
                      step: 4,
                      action: 'Once SQL is Basic or above, affiliate features auto-enabled',
                    },
                    {
                      step: 5,
                      action: 'Affiliate card appears in dashboard, linking to affiliate tools',
                    },
                  ].map(item => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {item.step}
                      </span>
                      <p className="text-blue-700">{item.action}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>📌 Auto-Triggers:</strong> Referral ID tracking, Wallet activation, SQL
                    check
                  </p>
                </div>
              </div>
            </div>

            {/* Referral Process */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">🔗 Referral Process</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-bold text-blue-800 mb-2">Referral Link</h5>
                  <p className="text-blue-700 text-sm mb-3">
                    User gets a smart affiliate link (e.g.,{' '}
                    <code className="bg-blue-100 px-1 rounded">ehb.com/invite/username</code>)
                  </p>

                  <h6 className="font-semibold text-blue-700 mb-2">Product Sharing:</h6>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Specific product links</li>
                    <li>• Category links</li>
                    <li>• Full GoSellr store</li>
                    <li>• EHB Bookstore page</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-bold text-blue-800 mb-2">Referral Tracking</h5>
                  <ul className="text-blue-700 text-sm space-y-2">
                    <li>• 5 levels of referrals tracked</li>
                    <li>• Referral tree visible in dashboard</li>
                    <li>• Each user in tree linked with SQL + earnings view</li>
                  </ul>
                  <div className="mt-3 p-2 bg-blue-100 rounded">
                    <p className="text-blue-800 text-xs">
                      <strong>📌 Integration:</strong> Works across GoSellr, Bookstore, EHB Tube,
                      and services
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commission Earning Flow */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">
                💸 Commission Earning Flow
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    event: 'L1 Purchase',
                    desc: 'Direct commission instantly credited (to Affiliate Wallet)',
                  },
                  {
                    event: 'L2-L5 Purchases',
                    desc: 'Indirect team commission calculated and logged',
                  },
                  {
                    event: 'Coin Lock / Rank Bonus',
                    desc: 'Coin-based loyalty or rank-up bonuses credited',
                  },
                  {
                    event: 'Bonus Unlock',
                    desc: 'Bonus becomes withdrawable after meeting SQL/rank criteria',
                  },
                ].map(item => (
                  <div
                    key={item.event}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                  >
                    <h5 className="font-bold text-blue-800 mb-2">{item.event}</h5>
                    <p className="text-blue-700 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>📌 Trigger:</strong> WalletAgent auto-sends to EHB Wallet OR USDT (if set)
                </p>
              </div>
            </div>

            {/* Withdrawal Process */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">💳 Withdrawal Process</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    option: '💰 EHB Wallet Transfer',
                    desc: 'Click → Transfer to EHB Wallet (internal use or savings)',
                  },
                  {
                    option: '🔁 Auto-Withdraw',
                    desc: 'If enabled → USDT BEP20 auto sent to saved wallet',
                  },
                  {
                    option: '🏦 Manual Withdraw',
                    desc: 'Bank/Stripe/Local Gateway withdrawal via dashboard',
                  },
                  {
                    option: '⏱️ Time/Threshold',
                    desc: 'Default: $5 minimum, no hold time for Basic+ SQL',
                  },
                ].map(item => (
                  <div
                    key={item.option}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                  >
                    <h5 className="font-bold text-blue-800 mb-2">{item.option}</h5>
                    <p className="text-blue-700 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>📌 Settings:</strong> User sets default withdrawal method once
                </p>
              </div>
            </div>

            {/* Custom Store Setup Flow */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">
                🏪 Custom Store Setup Flow
              </h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-blue-700">
                      User logs into Affiliate Dashboard → Clicks "My Store"
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </span>
                    <div className="text-blue-700">
                      <p className="mb-2">Picks layout:</p>
                      <ul className="ml-4 space-y-1 text-sm">
                        <li>• Mini Amazon-style store</li>
                        <li>• Carousel/slider sharing page</li>
                        <li>• Bookstore front</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-blue-700">
                      Auto-sync: All shared products get referral codes appended
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-blue-700">
                      User gets branded sublink:{' '}
                      <code className="bg-blue-100 px-1 rounded">ehb.com/store/username</code>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-blue-700">
                      Video Banners (EHB-Tube) auto-integrated if enabled
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>📌 Also Auto-Generates:</strong> Banner Kits, TikTok/FB share tools
                  </p>
                </div>
              </div>
            </div>

            {/* Dashboard Navigation */}
            <div>
              <h4 className="text-lg font-semibold text-blue-700 mb-3">📊 Dashboard Navigation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    section: 'Overview',
                    desc: 'Shows total earnings, team size, commissions, withdrawals',
                  },
                  {
                    section: 'Referrals',
                    desc: 'Tree view (L1 to L5), SQL level, active/inactive flag',
                  },
                  { section: 'Bonus', desc: 'Quick bonus tracker (monthly franchise reward)' },
                  { section: 'Tools', desc: 'Product share, video banners, store link generator' },
                  { section: 'Withdraw', desc: 'Set method, request transfer, auto-sync to BEP20' },
                  { section: 'Rank', desc: 'Current affiliate rank, next target, reward status' },
                  {
                    section: 'Settings',
                    desc: 'Profile, withdrawal preferences, BEP20 wallet save option',
                  },
                ].map(item => (
                  <div
                    key={item.section}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                  >
                    <h5 className="font-bold text-blue-800 mb-2">{item.section}</h5>
                    <p className="text-blue-700 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>📌 Fully mobile-responsive</strong> and integrated with EHB AI Help
                  Assistant
                </p>
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
            {
              name: 'PSS',
              desc: 'Handles verification of users, businesses, services, and products',
              status: 'In Progress',
            },
            {
              name: 'EDR',
              desc: 'Verifies real-world skills and knowledge through online/offline testing',
              status: 'In Progress',
            },
            {
              name: 'EMO',
              desc: 'Local physical and digital office hub for documentation and service verification',
              status: 'Planned',
            },
            {
              name: 'JPS',
              desc: 'Manages all user profiles and connects job seekers with service needs',
              status: 'In Progress',
            },
            {
              name: 'Franchise',
              desc: 'Manages global franchise network (sub, master, corporate)',
              status: 'Planned',
            },
            {
              name: 'AI/Agents',
              desc: 'Oversees AI agents across services and system logic',
              status: 'In Progress',
            },
          ].map(dept => (
            <motion.div
              key={dept.name}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold mb-2">{dept.name}</h3>
              <p className="text-gray-600 mb-2">{dept.desc}</p>
              <span
                className={`inline-block px-2 py-1 rounded text-sm ${
                  dept.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
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
            {
              layer: 'Frontend',
              tech: 'Next.js, React, TailwindCSS, TypeScript',
              notes: 'Dynamic dashboards, card system',
            },
            {
              layer: 'Backend',
              tech: 'Node.js, Express.js, TypeScript, JWT, Bcrypt',
              notes: 'RESTful APIs, business logic',
            },
            { layer: 'Database', tech: 'MongoDB, Mongoose', notes: 'JSON-like structure' },
            {
              layer: 'Blockchain',
              tech: 'Solidity, Moonbeam, Polkadot (Planned)',
              notes: 'Coin lock, validator contracts',
            },
            {
              layer: 'AI/Voice',
              tech: 'OpenAI API, Whisper, LangChain',
              notes: 'Agent automation',
            },
            {
              layer: 'DevOps',
              tech: 'Vercel, Docker, GitHub Actions, AWS EC2',
              notes: 'CI/CD, auto-sync',
            },
          ].map(tech => (
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
            {
              phase: 'Foundation',
              focus: 'Infrastructure',
              desc: 'Set up dashboards, routing, MongoDB, wallets, auth, franchises',
            },
            {
              phase: 'MVP',
              focus: 'Core Modules',
              desc: 'GoSellr, JPS, SQL Engine, Wallet, Complaint System, AI Marketplace',
            },
            {
              phase: 'Launch',
              focus: 'Blockchain + Payout',
              desc: 'Moonbeam integration, smart contracts, validator payouts',
            },
            {
              phase: 'Growth',
              focus: 'Departments',
              desc: 'Education, Law, Health, OBS, AGTS full launch',
            },
            {
              phase: 'Scale',
              focus: 'Globalization',
              desc: 'Multi-language, CDN, i18n, CMS, analytics, auto AI workflows',
            },
          ].map(phase => (
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
          {Object.keys(sections).map(key => (
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
