'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Download,
  Eye,
  Trash,
  Plus,
  Edit,
  Save,
  Loader,
  BarChart3,
  Settings,
  HelpCircle,
} from 'lucide-react';

// ========================================
// 1. BULK UPLOAD COMPONENT
// ========================================

interface ProductTemplate {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  brand: string;
  stock: number;
  sku: string;
  tags: string[];
  features: string[];
  images: string[];
  shipping: {
    free: boolean;
    cost: number;
    estimatedDays: string;
  };
}

interface UploadProgress {
  total: number;
  completed: number;
  failed: number;
  inProgress: number;
  errors: string[];
}

interface BulkUploadProps {
  onClose?: () => void;
  onSuccess?: (products: ProductTemplate[]) => void;
}

export default function BulkUpload({ onClose, onSuccess }: BulkUploadProps) {
  const [activeStep, setActiveStep] = useState<'upload' | 'review' | 'process' | 'complete'>(
    'upload'
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [products, setProducts] = useState<ProductTemplate[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    total: 0,
    completed: 0,
    failed: 0,
    inProgress: 0,
    errors: [],
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'csv' | 'excel' | 'json'>('csv');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ========================================
  // 2. FILE HANDLING
  // ========================================

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setActiveStep('review');

    try {
      const parsedProducts = await parseFile(file);
      setProducts(parsedProducts);
      setUploadProgress(prev => ({ ...prev, total: parsedProducts.length }));
    } catch (error) {
      console.error('Error parsing file:', error);
      setValidationErrors(['Failed to parse file. Please check the format.']);
    }
  };

  const parseFile = async (file: File): Promise<ProductTemplate[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        try {
          const content = e.target?.result as string;
          let parsedProducts: ProductTemplate[] = [];

          if (selectedTemplate === 'csv') {
            parsedProducts = parseCSV(content);
          } else if (selectedTemplate === 'json') {
            parsedProducts = parseJSON(content);
          } else {
            parsedProducts = parseExcel(content);
          }

          resolve(parsedProducts);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));

      if (selectedTemplate === 'json') {
        reader.readAsText(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const parseCSV = (content: string): ProductTemplate[] => {
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const products: ProductTemplate[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const values = lines[i].split(',').map(v => v.trim());
      const product: any = {};

      headers.forEach((header, index) => {
        product[header] = values[index] || '';
      });

      products.push({
        name: product.name || 'Untitled Product',
        description: product.description || '',
        price: parseFloat(product.price) || 0,
        originalPrice: parseFloat(product.originalPrice) || undefined,
        category: product.category || 'General',
        subcategory: product.subcategory || '',
        brand: product.brand || '',
        stock: parseInt(product.stock) || 0,
        sku: product.sku || `SKU-${Date.now()}-${i}`,
        tags: product.tags ? product.tags.split('|') : [],
        features: product.features ? product.features.split('|') : [],
        images: product.images ? product.images.split('|') : [],
        shipping: {
          free: product.freeShipping === 'true',
          cost: parseFloat(product.shippingCost) || 0,
          estimatedDays: product.estimatedDays || '3-5 days',
        },
      });
    }

    return products;
  };

  const parseJSON = (content: string): ProductTemplate[] => {
    const data = JSON.parse(content);
    return Array.isArray(data) ? data : [data];
  };

  const parseExcel = (content: string): ProductTemplate[] => {
    // Simplified Excel parsing - in real implementation, use a library like xlsx
    return parseCSV(content);
  };

  // ========================================
  // 3. VALIDATION
  // ========================================

  const validateProducts = (products: ProductTemplate[]): string[] => {
    const errors: string[] = [];

    products.forEach((product, index) => {
      if (!product.name.trim()) {
        errors.push(`Row ${index + 1}: Product name is required`);
      }
      if (product.price <= 0) {
        errors.push(`Row ${index + 1}: Price must be greater than 0`);
      }
      if (product.stock < 0) {
        errors.push(`Row ${index + 1}: Stock cannot be negative`);
      }
      if (!product.sku.trim()) {
        errors.push(`Row ${index + 1}: SKU is required`);
      }
    });

    return errors;
  };

  // ========================================
  // 4. PROCESSING
  // ========================================

  const handleProcessUpload = async () => {
    const errors = validateProducts(products);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    setIsProcessing(true);
    setActiveStep('process');

    try {
      await processProducts(products);
      setActiveStep('complete');
      onSuccess?.(products);
    } catch (error) {
      console.error('Error processing products:', error);
      setValidationErrors(['Failed to process products. Please try again.']);
    } finally {
      setIsProcessing(false);
    }
  };

  const processProducts = async (products: ProductTemplate[]): Promise<void> => {
    return new Promise(resolve => {
      let completed = 0;
      let failed = 0;

      const processBatch = async () => {
        for (let i = 0; i < products.length; i++) {
          try {
            setUploadProgress(prev => ({
              ...prev,
              inProgress: 1,
            }));

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Simulate random failure
            if (Math.random() < 0.1) {
              failed++;
              setUploadProgress(prev => ({
                ...prev,
                failed,
                errors: [...prev.errors, `Failed to upload product: ${products[i].name}`],
              }));
            } else {
              completed++;
              setUploadProgress(prev => ({
                ...prev,
                completed,
              }));
            }

            setUploadProgress(prev => ({
              ...prev,
              inProgress: 0,
            }));
          } catch (error) {
            failed++;
            setUploadProgress(prev => ({
              ...prev,
              failed,
              errors: [...prev.errors, `Error uploading product: ${products[i].name}`],
            }));
          }
        }

        resolve();
      };

      processBatch();
    });
  };

  // ========================================
  // 5. TEMPLATE DOWNLOAD
  // ========================================

  const downloadTemplate = () => {
    const template = `name,description,price,originalPrice,category,subcategory,brand,stock,sku,tags,features,images,freeShipping,shippingCost,estimatedDays
"Wireless Headphones","High-quality wireless headphones",299.99,399.99,Electronics,Audio,AudioTech,50,AUD-001,"wireless|premium|audio","Noise Cancellation|Bluetooth 5.0|30h Battery","/images/headphones1.jpg|/images/headphones2.jpg",true,0,"2-3 days"
"Smart Watch","Advanced fitness tracking",199.99,249.99,Electronics,Wearables,FitTech,25,WEAR-001,"smartwatch|fitness|health","Heart Rate Monitor|GPS|Water Resistant","/images/watch1.jpg|/images/watch2.jpg",false,9.99,"3-5 days"`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gosellr-product-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // ========================================
  // 6. RENDER FUNCTIONS
  // ========================================

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bulk Product Upload</h2>
        <p className="text-gray-600">
          Upload multiple products at once using CSV, Excel, or JSON format
        </p>
      </div>

      {/* Template Selection */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Template Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'csv', label: 'CSV', icon: FileText, description: 'Comma-separated values' },
            { id: 'excel', label: 'Excel', icon: BarChart3, description: 'Microsoft Excel format' },
            {
              id: 'json',
              label: 'JSON',
              icon: Settings,
              description: 'JavaScript Object Notation',
            },
          ].map(template => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id as any)}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <template.icon className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{template.label}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your file</h3>
        <p className="text-gray-600 mb-4">Drag and drop your file here, or click to browse</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Choose File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={
            selectedTemplate === 'json'
              ? '.json'
              : selectedTemplate === 'excel'
                ? '.xlsx,.xls'
                : '.csv'
          }
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Template Download */}
      <div className="text-center">
        <button
          onClick={downloadTemplate}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <Download className="w-4 h-4" />
          Download Template
        </button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Review Products</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{products.length} products found</span>
          <button
            onClick={() => setActiveStep('upload')}
            className="text-blue-600 hover:text-blue-700"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-medium text-red-900">Validation Errors</h3>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.slice(0, 10).map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.sku}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price}</div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Ready
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length > 10 && (
          <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600">
            Showing first 10 of {products.length} products
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setActiveStep('upload')}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleProcessUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Process Upload
        </button>
      </div>
    </div>
  );

  const renderProcessStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Products</h2>
        <p className="text-gray-600">Please wait while we upload your products</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Progress</span>
            <span className="text-sm text-gray-600">
              {uploadProgress.completed + uploadProgress.failed} / {uploadProgress.total}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((uploadProgress.completed + uploadProgress.failed) / uploadProgress.total) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{uploadProgress.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{uploadProgress.failed}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{uploadProgress.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </div>
        </div>

        {uploadProgress.errors.length > 0 && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-medium text-red-900 mb-2">Errors</h3>
            <ul className="text-sm text-red-700 space-y-1">
              {uploadProgress.errors.slice(0, 5).map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
              {uploadProgress.errors.length > 5 && (
                <li>... and {uploadProgress.errors.length - 5} more errors</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Complete!</h2>
        <p className="text-gray-600">
          Successfully uploaded {uploadProgress.completed} products
          {uploadProgress.failed > 0 && ` (${uploadProgress.failed} failed)`}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Upload Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{uploadProgress.completed}</div>
            <div className="text-sm text-gray-600">Successfully Uploaded</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{uploadProgress.failed}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            setActiveStep('upload');
            setUploadedFile(null);
            setProducts([]);
            setUploadProgress({ total: 0, completed: 0, failed: 0, inProgress: 0, errors: [] });
            setValidationErrors([]);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Upload More Products
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Bulk Product Upload</h1>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close bulk upload"
              aria-label="Close bulk upload modal"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeStep === 'upload' && renderUploadStep()}
          {activeStep === 'review' && renderReviewStep()}
          {activeStep === 'process' && renderProcessStep()}
          {activeStep === 'complete' && renderCompleteStep()}
        </div>
      </motion.div>
    </div>
  );
}
