'use client';

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import {
  Plus,
  Trash2,
  Copy,
  Settings,
  Eye,
  Save,
  Download,
  Upload,
  Type,
  Hash,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CheckSquare,
  Radio,
  List,
  Image,
  FileText,
  Star,
  Lock,
  Unlock,
} from 'lucide-react';

interface FormField {
  id: string;
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'tel'
    | 'url'
    | 'date'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'rating';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  settings?: {
    multiline?: boolean;
    rows?: number;
    multiple?: boolean;
    accept?: string;
  };
}

interface FormBuilderProps {
  initialFields?: FormField[];
  onSave?: (fields: FormField[]) => void;
  onPreview?: (fields: FormField[]) => void;
  readOnly?: boolean;
}

/**
 * FormBuilder Component - Drag-and-drop form builder with field management
 * @param {FormBuilderProps} props - Component props
 * @returns {JSX.Element} The form builder component
 */
export default function FormBuilder({
  initialFields = [],
  onSave,
  onPreview,
  readOnly = false,
}: FormBuilderProps) {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: Type, description: 'Single line text input' },
    { type: 'email', label: 'Email Input', icon: Mail, description: 'Email address input' },
    { type: 'number', label: 'Number Input', icon: Hash, description: 'Numeric input' },
    { type: 'tel', label: 'Phone Input', icon: Phone, description: 'Phone number input' },
    { type: 'url', label: 'URL Input', icon: Type, description: 'Website URL input' },
    { type: 'date', label: 'Date Input', icon: Calendar, description: 'Date picker' },
    { type: 'textarea', label: 'Text Area', icon: FileText, description: 'Multi-line text input' },
    { type: 'select', label: 'Dropdown', icon: List, description: 'Select from options' },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Multiple choice' },
    { type: 'radio', label: 'Radio Buttons', icon: Radio, description: 'Single choice' },
    { type: 'file', label: 'File Upload', icon: Image, description: 'File upload input' },
    { type: 'rating', label: 'Rating', icon: Star, description: 'Star rating input' },
  ];

  const addField = (type: string) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: type as FormField['type'],
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      options:
        type === 'select' || type === 'radio' || type === 'checkbox'
          ? ['Option 1', 'Option 2']
          : undefined,
      settings: {
        multiline: type === 'textarea',
        rows: type === 'textarea' ? 3 : undefined,
        multiple: type === 'file',
        accept: type === 'file' ? 'image/*' : undefined,
      },
    };

    setFields([...fields, newField]);
    setSelectedField(newField.id);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => (field.id === id ? { ...field, ...updates } : field)));
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    if (selectedField === id) {
      setSelectedField(null);
    }
  };

  const duplicateField = (id: string) => {
    const field = fields.find(f => f.id === id);
    if (field) {
      const duplicatedField: FormField = {
        ...field,
        id: `field_${Date.now()}`,
        label: `${field.label} (Copy)`,
      };
      setFields([...fields, duplicatedField]);
    }
  };

  const moveField = (fromIndex: number, toIndex: number) => {
    const newFields = [...fields];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    setFields(newFields);
  };

  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
      case 'url':
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled
          />
        );

      case 'date':
        return (
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled
          />
        );

      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            rows={field.settings?.rows || 3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled
          />
        );

      case 'select':
        return (
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled
          >
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`radio_${field.id}`}
                  className="text-blue-600 focus:ring-blue-500"
                  disabled
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'file':
        return (
          <input
            type="file"
            multiple={field.settings?.multiple}
            accept={field.settings?.accept}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled
          />
        );

      case 'rating':
        return (
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} className="w-6 h-6 text-gray-300" />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const renderFieldEditor = (field: FormField) => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Field Label
          </label>
          <input
            type="text"
            value={field.label}
            onChange={e => updateField(field.id, { label: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Placeholder Text
          </label>
          <input
            type="text"
            value={field.placeholder || ''}
            onChange={e => updateField(field.id, { placeholder: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={e => updateField(field.id, { required: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700 dark:text-gray-300">Required field</label>
        </div>

        {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Options
            </label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={e => {
                      const newOptions = [...(field.options || [])];
                      newOptions[index] = e.target.value;
                      updateField(field.id, { options: newOptions });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => {
                      const newOptions = field.options?.filter((_, i) => i !== index);
                      updateField(field.id, { options: newOptions });
                    }}
                    className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newOptions = [
                    ...(field.options || []),
                    `Option ${(field.options?.length || 0) + 1}`,
                  ];
                  updateField(field.id, { options: newOptions });
                }}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Option</span>
              </button>
            </div>
          </div>
        )}

        {field.type === 'textarea' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Rows
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={field.settings?.rows || 3}
              onChange={e =>
                updateField(field.id, {
                  settings: { ...field.settings, rows: parseInt(e.target.value) },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {field.type === 'file' && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={field.settings?.multiple || false}
                onChange={e =>
                  updateField(field.id, {
                    settings: { ...field.settings, multiple: e.target.checked },
                  })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Allow multiple files
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accepted File Types
              </label>
              <input
                type="text"
                value={field.settings?.accept || ''}
                onChange={e =>
                  updateField(field.id, {
                    settings: { ...field.settings, accept: e.target.value },
                  })
                }
                placeholder="e.g., image/*, .pdf, .doc"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Form Builder</h1>
              <p className="text-gray-600 dark:text-gray-400">Create and customize your forms</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isPreviewMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Eye className="w-4 h-4 mr-2 inline" />
                {isPreviewMode ? 'Edit Mode' : 'Preview'}
              </button>
              <button
                onClick={() => onSave?.(fields)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2 inline" />
                Save Form
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Field Types Panel */}
          {!isPreviewMode && !readOnly && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Field Types
                </h3>
                <div className="space-y-2">
                  {fieldTypes.map(fieldType => {
                    const Icon = fieldType.icon;
                    return (
                      <button
                        key={fieldType.type}
                        onClick={() => addField(fieldType.type)}
                        className="w-full p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {fieldType.label}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {fieldType.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Form Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {isPreviewMode ? 'Form Preview' : 'Form Fields'}
              </h3>

              {fields.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Plus className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No fields yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {readOnly
                      ? 'This form has no fields'
                      : 'Add fields from the left panel to get started'}
                  </p>
                </div>
              ) : (
                <Reorder.Group axis="y" values={fields} onReorder={setFields} className="space-y-4">
                  {fields.map((field, index) => (
                    <Reorder.Item key={field.id} value={field}>
                      <motion.div
                        layout
                        className={`p-4 border-2 rounded-lg transition-colors ${
                          selectedField === field.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        {!isPreviewMode && !readOnly && (
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {field.label}{' '}
                                {field.required && <span className="text-red-500">*</span>}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() =>
                                  setSelectedField(selectedField === field.id ? null : field.id)
                                }
                                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                title="Edit field"
                              >
                                <Settings className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => duplicateField(field.id)}
                                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                title="Duplicate field"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteField(field.id)}
                                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                title="Delete field"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}

                        {renderFieldPreview(field)}

                        {selectedField === field.id && !isPreviewMode && !readOnly && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                          >
                            {renderFieldEditor(field)}
                          </motion.div>
                        )}
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              )}
            </div>
          </div>

          {/* Properties Panel */}
          {selectedField && !isPreviewMode && !readOnly && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Field Properties
                </h3>
                {renderFieldEditor(fields.find(f => f.id === selectedField)!)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
