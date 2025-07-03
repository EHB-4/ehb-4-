// EHB SQL Level System Dashboard Page
'use client';

import React, { useState } from 'react';
import SQLUserInfo from '../../components/SQL/SQLUserInfo';
import SQLProgress from '../../components/SQL/SQLProgress';
import SQLUpgradeSteps from '../../components/SQL/SQLUpgradeSteps';
import SQLApplyDialog from '../../components/SQL/SQLApplyDialog';
import { SQLLevel } from '../../components/SQL/SQLLevelBadge';
import useSQLLevelData from '../../hooks/useSQLLevelData';
import { toast } from 'sonner';

export default function SQLLevelPage() {
  const { data, loading, error } = useSQLLevelData();
  const [showApplyDialog, setShowApplyDialog] = useState(false);

  // Roman Urdu: Jab user upgrade apply kare, notification show karo
  const handleUpgradeApply = () => {
    setShowApplyDialog(false);
    toast.success('Upgrade request successfully submit ho gaya!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">SQL Level data load ho raha hai...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow mb-4 max-w-md text-center">
          <h3 className="font-semibold mb-2">Error</h3>
          <p>{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data || !data.user || !data.progress) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Data Available Nahin Hai</h3>
          <p>SQL Level information load nahin ho sakta.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            EHB SQL Level System
          </h1>
          <p className="text-gray-600">
            Service Quality Level - Trust, Performance, aur Commitment ka system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* User Info */}
            <SQLUserInfo
              currentLevel={data.user.currentLevel}
              issuedBy={data.user.issuedBy}
              issuedAt={data.user.issuedAt}
              expiryDate={data.user.expiryDate}
              verificationStatus={data.user.verificationStatus}
              benefits={data.user.benefits}
              restrictions={data.user.restrictions || []}
              aiScore={data.user.aiScore}
              fraudScore={data.user.fraudScore}
              complaintCount={data.user.complaintCount}
              badgeNftHash={data.user.badgeNftHash}
              upgradeEligibility={data.user.upgradeEligibility}
              activeCoinLocks={data.user.activeCoinLocks}
              totalLockedAmount={data.user.totalLockedAmount}
              recentSkillTests={data.user.recentSkillTests}
            />

            {/* Progress Section */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Progress to Next Level
              </h2>
              <SQLProgress
                currentLevel={data.progress.currentLevel as SQLLevel}
                progress={data.progress.progress}
                nextLevelRequirements={data.progress.nextLevelRequirements}
              />
            </div>

            {/* Upgrade Steps */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Upgrade Steps
              </h2>
              <SQLUpgradeSteps
                currentLevel={data.progress.currentLevel as SQLLevel}
                targetLevel={(data.progress.currentLevel + 1) as SQLLevel}
                steps={data.upgradeSteps}
                onStepClick={(stepId) => {
                  // Handle step click - navigate to specific page
                  console.log('Step clicked:', stepId);
                }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Score</span>
                  <span className="text-sm font-medium text-gray-900">
                    {data.user.aiScore}/500
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Coin Locks</span>
                  <span className="text-sm font-medium text-gray-900">
                    {data.user.activeCoinLocks}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Locked</span>
                  <span className="text-sm font-medium text-gray-900">
                    {data.user.totalLockedAmount.toLocaleString()} EHBGC
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Complaints</span>
                  <span className="text-sm font-medium text-gray-900">
                    {data.user.complaintCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            {data.progress.recentActivity && data.progress.recentActivity.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {data.progress.recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          SQL {activity.fromLevel} → {activity.toLevel}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upgrade Button */}
            {data.user.upgradeEligibility?.eligible && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Upgrade?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Aap next SQL level ke liye eligible hain. Upgrade apply karein.
                </p>
                <button
                  onClick={() => setShowApplyDialog(true)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Upgrade Apply Karein
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Apply Dialog */}
      {showApplyDialog && (
        <SQLApplyDialog
          isOpen={showApplyDialog}
          onClose={() => setShowApplyDialog(false)}
          onApply={handleUpgradeApply}
          currentLevel={data.user.currentLevel}
          nextLevel={data.user.currentLevel + 1}
        />
      )}
    </div>
  );
} 