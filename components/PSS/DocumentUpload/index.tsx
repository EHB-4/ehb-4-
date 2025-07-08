'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Upload, CheckCircle } from 'lucide-react';
import DragAndDropZone from './DragAndDropZone';
import FilePreview from './FilePreview';
import UploadProgress from './UploadProgress';

interface FileWithPreview {
  id: string;
  name: string;
  type: string;
  size: number;
  preview?: string;
  status: 'pending' | 'uploading' | 'paused' | 'success' | 'error';
  uploadProgress?: number;
  error?: string;
}

interface DocumentUploadProps {
  onUploadComplete?: (files: FileWithPreview[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
  title?: string;
  description?: string;
  showPreview?: boolean;
  autoUpload?: boolean;
}

export default function DocumentUpload({
  onUploadComplete,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['image/*', 'application/pdf', 'application/msword'],
  title = 'Upload Documents',
  description = 'Upload your verification documents',
  showPreview = true,
  autoUpload = false,
}: DocumentUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [previewFile, setPreviewFile] = useState<FileWithPreview | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFilesSelected = (selectedFiles: FileWithPreview[]) => {
    setFiles(selectedFiles);
    setErrors([]);
  };

  const handleFilePreview = (file: FileWithPreview) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setErrors(['Please select files to upload']);
      return;
    }

    setUploading(true);
    setErrors([]);

    try {
      // Simulate upload process
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Update status to uploading
        setFiles(prev =>
          prev.map(f => (f.id === file.id ? { ...f, status: 'uploading' as const } : f))
        );

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));

          setFiles(prev =>
            prev.map(f =>
              f.id === file.id
                ? {
                    ...f,
                    uploadProgress: progress,
                    status: progress === 100 ? ('success' as const) : ('uploading' as const),
                  }
                : f
            )
          );
        }
      }

      // Call completion callback
      if (onUploadComplete) {
        onUploadComplete(files);
      }
    } catch (error) {
      setErrors(['Upload failed. Please try again.']);
      setFiles(prev => prev.map(f => ({ ...f, status: 'error' as const, error: 'Upload failed' })));
    } finally {
      setUploading(false);
    }
  };

  const handlePauseUpload = (fileId: string) => {
    setFiles(prev => prev.map(f => (f.id === fileId ? { ...f, status: 'paused' as const } : f)));
  };

  const handleResumeUpload = (fileId: string) => {
    setFiles(prev => prev.map(f => (f.id === fileId ? { ...f, status: 'uploading' as const } : f)));
  };

  const handleCancelUpload = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleRetryUpload = (fileId: string) => {
    setFiles(prev =>
      prev.map(f => (f.id === fileId ? { ...f, status: 'pending' as const, error: undefined } : f))
    );
  };

  const getUploadStatus = () => {
    const total = files.length;
    const completed = files.filter(f => f.status === 'success').length;
    const failed = files.filter(f => f.status === 'error').length;
    const inProgress = files.filter(f => f.status === 'uploading' || f.status === 'paused').length;

    if (total === 0) return 'No files selected';
    if (completed === total) return 'All files uploaded successfully';
    if (failed === total) return 'All uploads failed';
    if (inProgress > 0) return `${completed} completed, ${inProgress} in progress`;
    return `${completed} completed, ${failed} failed`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">{description}</p>

          <DragAndDropZone
            onFilesSelected={handleFilesSelected}
            maxFiles={maxFiles}
            maxSize={maxSize}
            acceptedTypes={acceptedTypes}
            title="Drop files here"
            description="or click to browse"
          />

          {/* Upload Status */}
          {files.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">{getUploadStatus()}</span>
              <Button
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
                className="ml-4"
              >
                {uploading ? 'Uploading...' : 'Upload Files'}
              </Button>
            </div>
          )}

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Upload Progress */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Upload Progress:
              </h4>
              {files.map(file => (
                <div key={file.id} className="space-y-2">
                  <UploadProgress
                    fileId={file.id}
                    fileName={file.name}
                    progress={file.uploadProgress || 0}
                    status={file.status}
                    onPause={() => handlePauseUpload(file.id)}
                    onResume={() => handleResumeUpload(file.id)}
                    onCancel={() => handleCancelUpload(file.id)}
                    onRetry={() => handleRetryUpload(file.id)}
                    error={file.error}
                  />

                  {showPreview && file.preview && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilePreview(file)}
                      className="w-full"
                    >
                      Preview {file.name}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Preview Modal */}
      <FilePreview
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
