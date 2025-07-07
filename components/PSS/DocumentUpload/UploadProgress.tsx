'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { X, Pause, Play, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadProgressProps {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'paused' | 'success' | 'error';
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
  onRetry?: () => void;
  error?: string;
}

export default function UploadProgress({
  fileId,
  fileName,
  progress,
  status,
  onPause,
  onResume,
  onCancel,
  onRetry,
  error,
}: UploadProgressProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Waiting to upload...';
      case 'uploading':
        return 'Uploading...';
      case 'paused':
        return 'Paused';
      case 'success':
        return 'Upload complete';
      case 'error':
        return 'Upload failed';
      default:
        return '';
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'paused':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{fileName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{getStatusText()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {status === 'uploading' && onPause && (
            <Button variant="ghost" size="sm" onClick={onPause}>
              <Pause className="w-4 h-4" />
            </Button>
          )}

          {status === 'paused' && onResume && (
            <Button variant="ghost" size="sm" onClick={onResume}>
              <Play className="w-4 h-4" />
            </Button>
          )}

          {status === 'error' && onRetry && (
            <Button variant="ghost" size="sm" onClick={onRetry}>
              <Play className="w-4 h-4" />
            </Button>
          )}

          {(status === 'pending' || status === 'uploading' || status === 'paused') && onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{Math.round(progress)}%</span>
          <span>
            {status === 'success' ? 'Complete' : status === 'error' ? 'Failed' : 'In Progress'}
          </span>
        </div>

        <Progress
          value={progress}
          className="h-2"
          style={
            {
              '--progress-color':
                status === 'success'
                  ? '#10b981'
                  : status === 'error'
                    ? '#ef4444'
                    : status === 'paused'
                      ? '#f59e0b'
                      : '#3b82f6',
            } as React.CSSProperties
          }
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
