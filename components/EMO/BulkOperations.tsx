'use client';

import React, { useState, useCallback } from 'react';
import {
  FiCheck,
  FiX,
  FiDownload,
  FiUpload,
  FiTrash2,
  FiEdit,
  FiEye,
  FiMoreVertical,
} from 'react-icons/fi';

interface BulkOperationItem {
  id: string;
  name: string;
  status: string;
  selected: boolean;
}

interface BulkOperationsProps {
  items: BulkOperationItem[];
  onSelectionChange: (selectedIds: string[]) => void;
  onBulkAction: (action: string, selectedIds: string[]) => void;
  loading?: boolean;
  type: 'products' | 'orders' | 'complaints';
}

const BulkOperations: React.FC<BulkOperationsProps> = ({
  items,
  onSelectionChange,
  onBulkAction,
  loading = false,
  type,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>('');

  const selectedItems = items.filter(item => item.selected);
  const selectedIds = selectedItems.map(item => item.id);

  // Handle select all
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectAll(checked);
      const allIds = items.map(item => item.id);
      onSelectionChange(checked ? allIds : []);
    },
    [items, onSelectionChange]
  );

  // Handle individual item selection
  const handleItemSelection = useCallback(
    (itemId: string, checked: boolean) => {
      const newSelectedIds = checked
        ? [...selectedIds, itemId]
        : selectedIds.filter(id => id !== itemId);

      onSelectionChange(newSelectedIds);
      setSelectAll(newSelectedIds.length === items.length);
    },
    [selectedIds, items.length, onSelectionChange]
  );

  // Handle bulk action
  const handleBulkAction = useCallback(
    (action: string) => {
      if (selectedIds.length === 0) return;

      setSelectedAction(action);
      onBulkAction(action, selectedIds);
      setShowActions(false);
    },
    [selectedIds, onBulkAction]
  );

  // Get available actions based on type
  const getAvailableActions = () => {
    switch (type) {
      case 'products':
        return [
          { id: 'activate', label: 'Activate', icon: FiCheck, color: 'text-green-600' },
          { id: 'deactivate', label: 'Deactivate', icon: FiX, color: 'text-red-600' },
          { id: 'delete', label: 'Delete', icon: FiTrash2, color: 'text-red-600' },
          { id: 'export', label: 'Export', icon: FiDownload, color: 'text-blue-600' },
        ];
      case 'orders':
        return [
          { id: 'confirm', label: 'Confirm', icon: FiCheck, color: 'text-green-600' },
          { id: 'ship', label: 'Ship', icon: FiEye, color: 'text-blue-600' },
          { id: 'cancel', label: 'Cancel', icon: FiX, color: 'text-red-600' },
          { id: 'export', label: 'Export', icon: FiDownload, color: 'text-blue-600' },
        ];
      case 'complaints':
        return [
          { id: 'resolve', label: 'Resolve', icon: FiCheck, color: 'text-green-600' },
          { id: 'escalate', label: 'Escalate', icon: FiMoreVertical, color: 'text-orange-600' },
          { id: 'assign', label: 'Assign', icon: FiEdit, color: 'text-blue-600' },
          { id: 'export', label: 'Export', icon: FiDownload, color: 'text-blue-600' },
        ];
      default:
        return [];
    }
  };

  const actions = getAvailableActions();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Bulk Operations Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={e => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                disabled={loading}
              />
              <span className="text-sm font-medium text-gray-700">Select All ({items.length})</span>
            </label>

            {selectedIds.length > 0 && (
              <span className="text-sm text-gray-500">
                {selectedIds.length} item{selectedIds.length !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>

          {selectedIds.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                disabled={loading}
              >
                <span>Bulk Actions</span>
                <FiMoreVertical className="h-4 w-4" />
              </button>

              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    {actions.map(action => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleBulkAction(action.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${action.color}`}
                          disabled={loading}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="divide-y divide-gray-200">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FiEye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No {type} found</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={e => handleItemSelection(item.id, e.target.checked)}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                />

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">ID: {item.id}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'active' ||
                      item.status === 'completed' ||
                      item.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : item.status === 'cancelled' || item.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bulk Action Confirmation Modal */}
      {selectedAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Bulk Action</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to {selectedAction} {selectedIds.length} selected item
              {selectedIds.length !== 1 ? 's' : ''}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedAction('')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleBulkAction(selectedAction);
                  setSelectedAction('');
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Bulk Export Component
export const BulkExport: React.FC<{
  data: any[];
  filename: string;
  onExport: (format: 'csv' | 'excel' | 'json') => void;
  loading?: boolean;
}> = ({ data, filename, onExport, loading = false }) => {
  const [showExportOptions, setShowExportOptions] = useState(false);

  const exportFormats = [
    { id: 'csv', label: 'CSV', icon: FiDownload },
    { id: 'excel', label: 'Excel', icon: FiDownload },
    { id: 'json', label: 'JSON', icon: FiDownload },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowExportOptions(!showExportOptions)}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        disabled={loading || data.length === 0}
      >
        <FiDownload className="h-4 w-4" />
        <span>Export ({data.length})</span>
      </button>

      {showExportOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {exportFormats.map(format => {
              const Icon = format.icon;
              return (
                <button
                  key={format.id}
                  onClick={() => {
                    onExport(format.id as 'csv' | 'excel' | 'json');
                    setShowExportOptions(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-gray-700"
                  disabled={loading}
                >
                  <Icon className="h-4 w-4" />
                  <span>{format.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Bulk Import Component
export const BulkImport: React.FC<{
  onImport: (file: File) => void;
  loading?: boolean;
  acceptedTypes?: string[];
}> = ({ onImport, loading = false, acceptedTypes = ['.csv', '.xlsx', '.json'] }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onImport(e.dataTransfer.files[0]);
      }
    },
    [onImport]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onImport(e.target.files[0]);
      }
    },
    [onImport]
  );

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <FiUpload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 mb-2">
          Drag and drop a file here, or{' '}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-500 hover:text-blue-600 underline"
            disabled={loading}
          >
            browse
          </button>
        </p>
        <p className="text-sm text-gray-500">Accepted formats: {acceptedTypes.join(', ')}</p>
      </div>
    </div>
  );
};

export default BulkOperations;
