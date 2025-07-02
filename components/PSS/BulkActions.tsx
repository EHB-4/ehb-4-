'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle, 
  XCircle, 
  Download, 
  Trash2, 
  AlertTriangle,
  Users,
  Eye
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BulkActionsProps {
  selectedItems: string[];
  totalItems: number;
  onSelectAll: (checked: boolean) => void;
  onBulkApprove: () => void;
  onBulkReject: () => void;
  onBulkExport: () => void;
  onBulkDelete: () => void;
  onViewSelected: () => void;
  loading?: boolean;
}

export default function BulkActions({
  selectedItems,
  totalItems,
  onSelectAll,
  onBulkApprove,
  onBulkReject,
  onBulkExport,
  onBulkDelete,
  onViewSelected,
  loading = false
}: BulkActionsProps) {
  const { t } = useLanguage();
  const [showConfirm, setShowConfirm] = useState(false);

  const isAllSelected = selectedItems.length === totalItems && totalItems > 0;
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < totalItems;

  const handleSelectAll = (checked: boolean) => {
    onSelectAll(checked);
  };

  const handleBulkApprove = () => {
    if (selectedItems.length === 0) return;
    onBulkApprove();
  };

  const handleBulkReject = () => {
    if (selectedItems.length === 0) return;
    setShowConfirm(true);
  };

  const confirmBulkReject = () => {
    onBulkReject();
    setShowConfirm(false);
  };

  const handleBulkExport = () => {
    if (selectedItems.length === 0) return;
    onBulkExport();
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    onBulkDelete();
  };

  const handleViewSelected = () => {
    if (selectedItems.length === 0) return;
    onViewSelected();
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isAllSelected}
              ref={(el: HTMLInputElement | null) => {
                if (el) {
                  el.indeterminate = isIndeterminate;
                }
              }}
              onCheckedChange={handleSelectAll}
              disabled={loading}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedItems.length > 0 
                ? `${selectedItems.length} of ${totalItems} selected`
                : `${totalItems} total items`
              }
            </span>
          </div>

          {selectedItems.length > 0 && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{selectedItems.length} {t('common.selected')}</span>
            </Badge>
          )}
        </div>

        {selectedItems.length > 0 && (
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleViewSelected}
              disabled={loading}
            >
              <Eye className="w-4 h-4 mr-2" />
              {t('common.view')}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleBulkExport}
              disabled={loading}
            >
              <Download className="w-4 h-4 mr-2" />
              {t('common.export')}
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
              onClick={handleBulkApprove}
              disabled={loading}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {t('pss.dashboard.actions.approve')}
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              onClick={handleBulkReject}
              disabled={loading}
            >
              <XCircle className="w-4 h-4 mr-2" />
              {t('pss.dashboard.actions.reject')}
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              onClick={handleBulkDelete}
              disabled={loading}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t('common.delete')}
            </Button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('common.confirmBulkReject')}
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('common.bulkRejectWarning', { count: selectedItems.length })}
            </p>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
              >
                {t('common.cancel')}
              </Button>
              <Button
                variant="destructive"
                onClick={confirmBulkReject}
              >
                {t('pss.dashboard.actions.reject')} {selectedItems.length}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 