"use client";

'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Calendar,
  Upload,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';

/**
 * Field Type Definition
 */
export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'file'
  | 'url'
  | 'tel';

/**
 * Validation Rule Interface
 */
interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'email' | 'url' | 'custom';
  value?: any;
  message: string;
}

/**
 * Field Definition Interface
 */
interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  options?: { label: string; value: string }[];
  conditional?: {
    field: string;
    value: any;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  };
  defaultValue?: any;
  helpText?: string;
  order: number;
}

/**
 * Form Definition Interface
 */
interface FormDefinition {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  settings: {
    allowMultipleSubmissions: boolean;
    requireCaptcha: boolean;
    redirectUrl?: string;
    successMessage?: string;
  };
}

/**
 * Advanced Form Builder Props
 */
interface AdvancedFormBuilderProps {
  initialForm?: FormDefinition;
  onSave?: (form: FormDefinition) => void;
  onPreview?: (form: FormDefinition) => void;
  onExport?: (form: FormDefinition) => void;
  className?: string;
}

/**
 * Advanced Form Builder Component
 * Allows dynamic creation and editing of forms with validation and conditional logic
 */
export function AdvancedFormBuilder({
  initialForm,
  onSave,
  onPreview,
  onExport,
  className = '',
}: AdvancedFormBuilderProps) {
  const [form, setForm] = useState<FormDefinition>(
    initialForm || {
      id: `form-${Date.now()}`,
      title: 'New Form',
      description: '',
      fields: [],
      settings: {
        allowMultipleSubmissions: true,
        requireCaptcha: false,
        successMessage: 'Thank you for your submission!',
      },
    }
  );

  const [activeTab, setActiveTab] = useState<'fields' | 'settings' | 'preview'>('fields');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Generate unique field ID
  const generateFieldId = useCallback(() => {
    return `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Add new field
  const addField = useCallback(
    (type: FieldType) => {
      const newField: FormField = {
        id: generateFieldId(),
        type,
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
        placeholder: `Enter ${type}`,
        required: false,
        validation: [],
        order: form.fields.length,
      };

      setForm(prev => ({
        ...prev,
        fields: [...prev.fields, newField],
      }));

      setSelectedField(newField.id);
    },
    [form.fields.length, generateFieldId]
  );

  // Update field
  const updateField = useCallback((fieldId: string, updates: Partial<FormField>) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.map(field => (field.id === fieldId ? { ...field, ...updates } : field)),
    }));
  }, []);

  // Delete field
  const deleteField = useCallback((fieldId: string) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId),
    }));
    setSelectedField(null);
  }, []);

  // Duplicate field
  const duplicateField = useCallback(
    (fieldId: string) => {
      const fieldToDuplicate = form.fields.find(f => f.id === fieldId);
      if (!fieldToDuplicate) return;

      const newField: FormField = {
        ...fieldToDuplicate,
        id: generateFieldId(),
        label: `${fieldToDuplicate.label} (Copy)`,
        order: form.fields.length,
      };

      setForm(prev => ({
        ...prev,
        fields: [...prev.fields, newField],
      }));
    },
    [form.fields, generateFieldId]
  );

  // Move field up/down
  const moveField = useCallback((fieldId: string, direction: 'up' | 'down') => {
    setForm(prev => {
      const fields = [...prev.fields];
      const index = fields.findIndex(f => f.id === fieldId);

      if (direction === 'up' && index > 0) {
        [fields[index], fields[index - 1]] = [fields[index - 1], fields[index]];
      } else if (direction === 'down' && index < fields.length - 1) {
        [fields[index], fields[index + 1]] = [fields[index + 1], fields[index]];
      }

      return { ...prev, fields };
    });
  }, []);

  // Add validation rule
  const addValidationRule = useCallback(
    (fieldId: string, rule: ValidationRule) => {
      updateField(fieldId, {
        validation: [...(form.fields.find(f => f.id === fieldId)?.validation || []), rule],
      });
    },
    [updateField, form.fields]
  );

  // Remove validation rule
  const removeValidationRule = useCallback(
    (fieldId: string, ruleIndex: number) => {
      const field = form.fields.find(f => f.id === fieldId);
      if (!field) return;

      const newValidation = field.validation?.filter((_, index) => index !== ruleIndex) || [];
      updateField(fieldId, { validation: newValidation });
    },
    [updateField, form.fields]
  );

  // Handle form save
  const handleSave = useCallback(() => {
    onSave?.(form);
  }, [form, onSave]);

  // Handle form preview
  const handlePreview = useCallback(() => {
    onPreview?.(form);
    setIsPreviewMode(true);
  }, [form, onPreview]);

  // Handle form export
  const handleExport = useCallback(() => {
    onExport?.(form);
  }, [form, onExport]);

  // Render field editor
  const renderFieldEditor = (field: FormField) => {
    return (
      <motion.div
        key={field.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{field.label}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{field.type}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => moveField(field.id, 'up')}
              disabled={field.order === 0}
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => moveField(field.id, 'down')}
              disabled={field.order === form.fields.length - 1}
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => duplicateField(field.id)}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => deleteField(field.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Basic Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Label
              </label>
              <input
                type="text"
                value={field.label}
                onChange={e => updateField(field.id, { label: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Placeholder
              </label>
              <input
                type="text"
                value={field.placeholder || ''}
                onChange={e => updateField(field.id, { placeholder: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Field Type Specific Settings */}
          {field.type === 'select' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Options
              </label>
              <div className="space-y-2">
                {(field.options || []).map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option.label}
                      onChange={e => {
                        const newOptions = [...(field.options || [])];
                        newOptions[index] = { ...option, label: e.target.value };
                        updateField(field.id, { options: newOptions });
                      }}
                      placeholder="Option label"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={option.value}
                      onChange={e => {
                        const newOptions = [...(field.options || [])];
                        newOptions[index] = { ...option, value: e.target.value };
                        updateField(field.id, { options: newOptions });
                      }}
                      placeholder="Option value"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newOptions = field.options?.filter((_, i) => i !== index) || [];
                        updateField(field.id, { options: newOptions });
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newOptions = [...(field.options || []), { label: '', value: '' }];
                    updateField(field.id, { options: newOptions });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>
          )}

          {/* Validation Rules */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Validation Rules
            </label>
            <div className="space-y-2">
              {field.validation?.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <Badge variant="secondary">{rule.type}</Badge>
                  {rule.value && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">{rule.value}</span>
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">{rule.message}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeValidationRule(field.id, index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addValidationRule(field.id, {
                    type: 'required',
                    message: 'This field is required',
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Validation
              </Button>
            </div>
          </div>

          {/* Required Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={field.required}
              onChange={e => updateField(field.id, { required: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Required field</label>
          </div>
        </div>
      </motion.div>
    );
  };

  // Render form preview
  const renderFormPreview = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{form.title}</h2>
        {form.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-6">{form.description}</p>
        )}

        <div className="space-y-4">
          {form.fields.map(field => (
            <div key={field.id} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'text' && (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}

              {field.type === 'email' && (
                <input
                  type="email"
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}

              {field.type === 'select' && (
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select an option</option>
                  {field.options?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'checkbox' && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {field.label}
                  </label>
                </div>
              )}

              {field.helpText && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{field.helpText}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button className="w-full">Submit Form</Button>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-gray-50 dark:bg-gray-900 min-h-screen ${className}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Form Builder</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and customize your forms with advanced features
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Upload className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleSave}>
              <Check className="w-4 h-4 mr-2" />
              Save Form
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Form Settings
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Form Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Add Fields</h3>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    'text',
                    'email',
                    'password',
                    'number',
                    'textarea',
                    'select',
                    'checkbox',
                    'radio',
                    'date',
                    'file',
                    'url',
                    'tel',
                  ] as FieldType[]
                ).map(type => (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    onClick={() => addField(type)}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <span className="text-xs font-medium capitalize">{type}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Form Fields ({form.fields.length})
              </h3>
              <div className="space-y-2">
                {form.fields.map(field => (
                  <div
                    key={field.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedField === field.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedField(field.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {field.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {field.type}
                        </p>
                      </div>
                      {field.required && (
                        <Badge variant="destructive" size="sm">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {selectedField ? (
            renderFieldEditor(form.fields.find(f => f.id === selectedField)!)
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No field selected
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select a field from the sidebar to edit its properties
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdvancedFormBuilder;
