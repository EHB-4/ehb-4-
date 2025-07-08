'use client';

import React from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FileWithPreview {
  id: string;
  name: string;
  type: string;
  size: number;
  preview?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

interface FilePreviewProps {
  file: FileWithPreview | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilePreview({ file, isOpen, onClose }: FilePreviewProps) {
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleDownload = () => {
    if (file?.preview) {
      const link = document.createElement('a');
      link.href = file.preview;
      link.download = file.name;
      link.click();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return '🖼️';
    } else if (type === 'application/pdf') {
      return '📄';
    } else if (type.includes('word') || type.includes('document')) {
      return '📝';
    } else {
      return '📁';
    }
  };

  if (!file) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>{getFileTypeIcon(file.type)}</span>
              <span className="truncate">{file.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* File Info */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  File Type: {file.type}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Size: {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto">
            {file.type.startsWith('image/') && file.preview ? (
              <div className="flex flex-col items-center">
                {/* Image Controls */}
                <div className="flex items-center space-x-2 mb-4">
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRotate}>
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Reset
                  </Button>
                </div>

                {/* Image Preview */}
                <div className="overflow-auto max-w-full max-h-[60vh]">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="max-w-none"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  />
                </div>
              </div>
            ) : file.type === 'application/pdf' ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  PDF Preview
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  PDF files are not previewed in the browser for security reasons.
                </p>
                <Button onClick={handleDownload} variant="default">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📁</div>
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  File Preview Not Available
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This file type cannot be previewed in the browser.
                </p>
                <Button onClick={handleDownload} variant="default">
                  <Download className="w-4 h-4 mr-2" />
                  Download File
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
