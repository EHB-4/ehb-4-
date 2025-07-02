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
        <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded shadow mb-4">
          {error}
        </div>
      </div>
    );
  }

  if (!data || !data.user || !data.progress) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        Data available nahi hai.
      </div>
    );
  }

  // Roman Urdu: Main container ko responsive aur center kar rahe hain
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 min-h-screen flex flex-col gap-6">
      {/* User Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <SQLUserInfo
          currentLevel={data.user.currentLevel as SQLLevel}
          issuedBy={data.user.issuedBy}
          issuedAt={data.user.issuedAt}
          expiryDate={data.user.expiryDate ?? ''}
          verificationStatus={data.user.verificationStatus}
          benefits={data.user.benefits}
        />
      </div>

      {/* Progress Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <SQLProgress
          currentLevel={data.progress.currentLevel as SQLLevel}
          progress={data.progress.progress}
          nextLevelRequirements={data.progress.nextLevelRequirements ?? []}
        />
      </div>

      {/* Upgrade Steps Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <SQLUpgradeSteps
          currentLevel={data.user.currentLevel as SQLLevel}
          targetLevel={(data.user.currentLevel + 1) as SQLLevel}
          steps={data.upgradeSteps}
        />
      </div>

      {/* Apply Dialog (hidden by default) */}
      <SQLApplyDialog
        isOpen={showApplyDialog}
        onClose={() => setShowApplyDialog(false)}
        onSubmit={handleUpgradeApply}
        currentLevel={data.user.currentLevel as SQLLevel}
        targetLevel={(data.user.currentLevel + 1) as SQLLevel}
      />
    </div>
  );
} 