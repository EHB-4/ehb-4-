'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Database,
  Key,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Settings Category Interface
 */
interface SettingsCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

/**
 * Setting Item Interface
 */
interface SettingItem {
  id: string;
  name: string;
  description: string;
  type: 'toggle' | 'select' | 'input' | 'textarea' | 'number' | 'color' | 'file';
  value: any;
  options?: { label: string; value: any }[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  category: string;
}

/**
 * Advanced Settings Panel Props
 */
interface AdvancedSettingsPanelProps {
  settings: SettingItem[];
  onSettingChange?: (id: string, value: any) => void;
  onSave?: (settings: SettingItem[]) => void;
  onReset?: () => void;
  onExport?: (settings: SettingItem[]) => void;
  onImport?: (settings: SettingItem[]) => void;
  className?: string;
}

/**
 * Advanced Settings Panel Component
 * Provides comprehensive settings management with categories and validation
 */
export function AdvancedSettingsPanel({
  settings,
  onSettingChange,
  onSave,
  onReset,
  onExport,
  onImport,
  className = '',
}: AdvancedSettingsPanelProps) {
  // State management
  const [currentCategory, setCurrentCategory] = useState<string>('general');
  const [localSettings, setLocalSettings] = useState<SettingItem[]>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Settings categories
  const categories: SettingsCategory[] = [
    {
      id: 'general',
      name: 'General',
      icon: <Settings className="w-5 h-5" />,
      description: 'Basic application settings',
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    },
    {
      id: 'profile',
      name: 'Profile',
      icon: <User className="w-5 h-5" />,
      description: 'User profile and preferences',
      color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    },
    {
      id: 'security',
      name: 'Security',
      icon: <Shield className="w-5 h-5" />,
      description: 'Security and privacy settings',
      color: 'text-red-600 bg-red-100 dark:bg-red-900/30',
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      description: 'Notification preferences',
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
    },
    {
      id: 'appearance',
      name: 'Appearance',
      icon: <Palette className="w-5 h-5" />,
      description: 'Theme and display settings',
      color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
    },
    {
      id: 'language',
      name: 'Language',
      icon: <Globe className="w-5 h-5" />,
      description: 'Language and regional settings',
      color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30',
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: <Database className="w-5 h-5" />,
      description: 'Advanced system settings',
      color: 'text-gray-600 bg-gray-100 dark:bg-gray-700',
    },
  ];

  // Update local settings when props change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Check for changes
  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(localSettings) !== JSON.stringify(settings);
    setHasChanges(hasUnsavedChanges);
  }, [localSettings, settings]);

  // Handle setting change
  const handleSettingChange = (id: string, value: any) => {
    setLocalSettings(prev =>
      prev.map(setting => (setting.id === id ? { ...setting, value } : setting))
    );

    if (onSettingChange) {
      onSettingChange(id, value);
    }
  };

  // Handle save
  const handleSave = async () => {
    setIsSaving(true);

    try {
      if (onSave) {
        await onSave(localSettings);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    setLocalSettings(settings);
    setHasChanges(false);

    if (onReset) {
      onReset();
    }
  };

  // Handle export
  const handleExport = () => {
    if (onExport) {
      onExport(localSettings);
    } else {
      // Default export behavior
      const dataStr = JSON.stringify(localSettings, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `settings-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // Handle import
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string);
        setLocalSettings(importedSettings);
        setHasChanges(true);

        if (onImport) {
          onImport(importedSettings);
        }
      } catch (error) {
        console.error('Failed to import settings:', error);
      }
    };
    reader.readAsText(file);
  };

  // Get current category settings
  const currentSettings = localSettings.filter(setting => setting.category === currentCategory);

  // Render setting input
  const renderSettingInput = (setting: SettingItem) => {
    const { type, value, options, validation } = setting;

    switch (type) {
      case 'toggle':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={value}
              onChange={e => handleSettingChange(setting.id, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {value ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={e => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'input':
        return (
          <input
            type="text"
            value={value}
            onChange={e => handleSettingChange(setting.id, e.target.value)}
            required={validation?.required}
            minLength={validation?.min}
            maxLength={validation?.max}
            pattern={validation?.pattern}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={e => handleSettingChange(setting.id, e.target.value)}
            rows={4}
            required={validation?.required}
            minLength={validation?.min}
            maxLength={validation?.max}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={e => handleSettingChange(setting.id, Number(e.target.value))}
            min={validation?.min}
            max={validation?.max}
            required={validation?.required}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case 'color':
        return (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value}
              onChange={e => handleSettingChange(setting.id, e.target.value)}
              className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
            />
            <input
              type="text"
              value={value}
              onChange={e => handleSettingChange(setting.id, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );

      case 'file':
        return (
          <div className="flex items-center gap-2">
            <input
              type="file"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  handleSettingChange(setting.id, file.name);
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {value && <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-gray-50 dark:bg-gray-900 min-h-screen ${className}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure your application preferences and system settings
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="warning" className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Unsaved Changes
              </Badge>
            )}

            <Button
              variant="outline"
              onClick={handleReset}
              disabled={!hasChanges}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </Button>

            <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>

            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-settings"
            />
            <label htmlFor="import-settings">
              <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                Import
              </Button>
            </label>

            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="flex items-center gap-2"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setCurrentCategory(category.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  currentCategory === category.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${category.color}`}>{category.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Advanced Toggle */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Advanced Mode
              </span>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showAdvanced ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showAdvanced ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">
            {/* Category Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    categories.find(c => c.id === currentCategory)?.color || ''
                  }`}
                >
                  {categories.find(c => c.id === currentCategory)?.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {categories.find(c => c.id === currentCategory)?.name}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {categories.find(c => c.id === currentCategory)?.description}
              </p>
            </div>

            {/* Settings */}
            <div className="space-y-6">
              {currentSettings.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No settings available
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      No settings are configured for this category.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                currentSettings.map(setting => (
                  <Card key={setting.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {setting.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {setting.description}
                          </p>
                        </div>

                        <div>{renderSettingInput(setting)}</div>

                        {setting.validation && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {setting.validation.required && (
                              <span className="block">Required field</span>
                            )}
                            {setting.validation.min && (
                              <span className="block">Minimum: {setting.validation.min}</span>
                            )}
                            {setting.validation.max && (
                              <span className="block">Maximum: {setting.validation.max}</span>
                            )}
                            {setting.validation.pattern && (
                              <span className="block">Pattern: {setting.validation.pattern}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Advanced Settings */}
            {showAdvanced && currentCategory === 'advanced' && (
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Advanced Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                            Advanced Mode Active
                          </span>
                        </div>
                        <Badge variant="warning">Experimental</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Debug Mode
                          </label>
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Performance Monitoring
                          </label>
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSettingsPanel;
