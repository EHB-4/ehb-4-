'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { FiAward, FiCalendar, FiShield, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import { SQLLevelBadge } from './SQLLevelBadge';

interface SQLUserInfoProps {
  currentLevel: number;
  issuedBy: string;
  issuedAt: string;
  expiryDate?: string;
  verificationStatus: 'verified' | 'pending' | 'expired';
  benefits: string[];
  restrictions: string[];
  aiScore: number;
  fraudScore: number;
  complaintCount: number;
  badgeNftHash?: string;
  upgradeEligibility?: any;
  activeCoinLocks: number;
  totalLockedAmount: number;
  recentSkillTests: any[];
  className?: string;
}

const levelNames = {
  0: 'Free',
  1: 'Basic',
  2: 'Normal',
  3: 'High',
  4: 'VIP',
};

const levelColors = {
  0: 'blue',
  1: 'green',
  2: 'yellow',
  3: 'orange',
  4: 'purple',
};

export default function SQLUserInfo({
  currentLevel,
  issuedBy,
  issuedAt,
  expiryDate,
  verificationStatus,
  benefits,
  restrictions,
  aiScore,
  fraudScore,
  complaintCount,
  badgeNftHash,
  upgradeEligibility,
  activeCoinLocks,
  totalLockedAmount,
  recentSkillTests,
  className = '',
}: SQLUserInfoProps) {
  const levelName = levelNames[currentLevel as keyof typeof levelNames];
  const levelColor = levelColors[currentLevel as keyof typeof levelColors];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'expired':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <FiShield className="w-4 h-4" />;
      case 'pending':
        return <FiAlertCircle className="w-4 h-4" />;
      case 'expired':
        return <FiAlertCircle className="w-4 h-4" />;
      default:
        return <FiAlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Current Level Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <SQLLevelBadge level={currentLevel as any} size="lg" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{levelName} Level</h2>
              <p className="text-sm text-gray-500">Service Quality Level</p>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-1 ${getStatusColor(verificationStatus)}`}
          >
            {getStatusIcon(verificationStatus)}
            <span className="capitalize">{verificationStatus}</span>
          </div>
        </div>

        {/* Level Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FiAward className="w-4 h-4" />
              <span>Issued by: {issuedBy}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FiCalendar className="w-4 h-4" />
              <span>Issued: {new Date(issuedAt).toLocaleDateString()}</span>
            </div>
            {expiryDate && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiCalendar className="w-4 h-4" />
                <span>Expires: {new Date(expiryDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FiTrendingUp className="w-4 h-4" />
              <span>AI Score: {aiScore}/500</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FiShield className="w-4 h-4" />
              <span>Fraud Score: {(fraudScore * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FiAlertCircle className="w-4 h-4" />
              <span>Complaints: {complaintCount}</span>
            </div>
          </div>
        </div>

        {/* Benefits and Restrictions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Benefits</h3>
            <ul className="space-y-1">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Restrictions</h3>
            <ul className="space-y-1">
              {restrictions.map((restriction, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>{restriction}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Financial Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FiShield className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Active Locks</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{activeCoinLocks}</p>
            <p className="text-sm text-blue-700">Coin locks active</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FiTrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Total Locked</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {totalLockedAmount.toLocaleString()}
            </p>
            <p className="text-sm text-green-700">EHBGC coins locked</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FiAward className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">AI Score</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{aiScore}</p>
            <p className="text-sm text-purple-700">Trust score</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Skill Tests */}
      {recentSkillTests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Skill Tests</h3>
          <div className="space-y-3">
            {recentSkillTests.map((test, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${test.passed ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{test.type} Test</p>
                    <p className="text-xs text-gray-500">
                      {new Date(test.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{test.score}%</p>
                  <p className="text-xs text-gray-500">{test.passed ? 'Passed' : 'Failed'}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Upgrade Eligibility */}
      {upgradeEligibility && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upgrade Eligibility</h3>
          <div
            className={`p-4 rounded-lg ${upgradeEligibility.eligible ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}
          >
            <div className="flex items-center space-x-2 mb-2">
              {upgradeEligibility.eligible ? (
                <FiAward className="w-5 h-5 text-green-600" />
              ) : (
                <FiAlertCircle className="w-5 h-5 text-yellow-600" />
              )}
              <span
                className={`font-medium ${upgradeEligibility.eligible ? 'text-green-900' : 'text-yellow-900'}`}
              >
                {upgradeEligibility.eligible ? 'Eligible for Upgrade' : 'Requirements Pending'}
              </span>
            </div>
            <p
              className={`text-sm ${upgradeEligibility.eligible ? 'text-green-700' : 'text-yellow-700'}`}
            >
              {upgradeEligibility.eligible
                ? 'You meet all requirements for the next SQL level upgrade.'
                : 'Complete the remaining requirements to become eligible for upgrade.'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
