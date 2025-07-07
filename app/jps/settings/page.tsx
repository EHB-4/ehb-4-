'use client';

import React, { useState } from 'react';
import { useJPSRole } from '../../../components/JPS/JPSRoleContext';
import {
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  UserIcon,
  ChartBarIcon,
  CloudIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    jobAlerts: boolean;
    matchUpdates: boolean;
    interviewReminders: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'employers_only';
    showContactInfo: boolean;
    showSalary: boolean;
    allowMessaging: boolean;
  };
  matching: {
    autoMatch: boolean;
    matchThreshold: number;
    skillWeight: number;
    experienceWeight: number;
    locationWeight: number;
  };
  integrations: {
    linkedin: boolean;
    github: boolean;
    indeed: boolean;
    glassdoor: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
  };
}

const SettingsPage: React.FC = () => {
  const { role } = useJPSRole();
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: true,
      sms: false,
      jobAlerts: true,
      matchUpdates: true,
      interviewReminders: true,
    },
    privacy: {
      profileVisibility: 'employers_only',
      showContactInfo: true,
      showSalary: false,
      allowMessaging: true,
    },
    matching: {
      autoMatch: true,
      matchThreshold: 75,
      skillWeight: 40,
      experienceWeight: 30,
      locationWeight: 30,
    },
    integrations: {
      linkedin: true,
      github: false,
      indeed: false,
      glassdoor: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
  });
  const [activeTab, setActiveTab] = useState('notifications');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSettingChange = (category: keyof Settings, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const saveSettings = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    // Show success message
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon },
    { id: 'matching', name: 'Matching', icon: ChartBarIcon },
    { id: 'integrations', name: 'Integrations', icon: CloudIcon },
    { id: 'security', name: 'Security', icon: LockClosedIcon },
    { id: 'account', name: 'Account', icon: UserIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">JPS Settings</h1>
              <p className="text-sm text-gray-500">
                Configure your preferences and system settings
              </p>
            </div>
            <button
              onClick={saveSettings}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </header>

      {/* Role-based Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {role === 'jobseeker' && (
          <div className="mb-4">Manage your account, privacy, and notification preferences.</div>
        )}
        {role === 'employer' && (
          <div className="mb-4">Configure your company profile and team settings.</div>
        )}
        {role === 'admin' && (
          <div className="mb-4">Access advanced system settings and user management.</div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Notification Preferences
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">
                        Notification Channels
                      </h4>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.notifications.email}
                            onChange={e =>
                              handleSettingChange('notifications', 'email', e.target.checked)
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">Email notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.notifications.push}
                            onChange={e =>
                              handleSettingChange('notifications', 'push', e.target.checked)
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">Push notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.notifications.sms}
                            onChange={e =>
                              handleSettingChange('notifications', 'sms', e.target.checked)
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">SMS notifications</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Notification Types</h4>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.notifications.jobAlerts}
                            onChange={e =>
                              handleSettingChange('notifications', 'jobAlerts', e.target.checked)
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            Job alerts and recommendations
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.notifications.matchUpdates}
                            onChange={e =>
                              handleSettingChange('notifications', 'matchUpdates', e.target.checked)
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            Match updates and new opportunities
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.notifications.interviewReminders}
                            onChange={e =>
                              handleSettingChange(
                                'notifications',
                                'interviewReminders',
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            Interview reminders and updates
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Visibility
                      </label>
                      <select
                        value={settings.privacy.profileVisibility}
                        onChange={e =>
                          handleSettingChange('privacy', 'profileVisibility', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Profile Visibility"
                      >
                        <option value="public">Public - Visible to everyone</option>
                        <option value="employers_only">
                          Employers Only - Visible to registered employers
                        </option>
                        <option value="private">Private - Only visible to you</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.privacy.showContactInfo}
                          onChange={e =>
                            handleSettingChange('privacy', 'showContactInfo', e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Show contact information to employers
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.privacy.showSalary}
                          onChange={e =>
                            handleSettingChange('privacy', 'showSalary', e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">Show salary expectations</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.privacy.allowMessaging}
                          onChange={e =>
                            handleSettingChange('privacy', 'allowMessaging', e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Allow employers to message me
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {/* Matching Tab */}
              {activeTab === 'matching' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    AI Matching Preferences
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.matching.autoMatch}
                          onChange={e =>
                            handleSettingChange('matching', 'autoMatch', e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Enable automatic job matching
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Match Threshold ({settings.matching.matchThreshold}%)
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={settings.matching.matchThreshold}
                        onChange={e =>
                          handleSettingChange(
                            'matching',
                            'matchThreshold',
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum match percentage to show recommendations
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Skill Weight ({settings.matching.skillWeight}%)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={settings.matching.skillWeight}
                          onChange={e =>
                            handleSettingChange('matching', 'skillWeight', parseInt(e.target.value))
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience Weight ({settings.matching.experienceWeight}%)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={settings.matching.experienceWeight}
                          onChange={e =>
                            handleSettingChange(
                              'matching',
                              'experienceWeight',
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location Weight ({settings.matching.locationWeight}%)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={settings.matching.locationWeight}
                          onChange={e =>
                            handleSettingChange(
                              'matching',
                              'locationWeight',
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Third-Party Integrations
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.integrations.linkedin}
                          onChange={e =>
                            handleSettingChange('integrations', 'linkedin', e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">LinkedIn Profile Sync</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.integrations.github}
                          onChange={e =>
                            handleSettingChange('integrations', 'github', e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">GitHub Portfolio Sync</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.integrations.indeed}
                          onChange={e =>
                            handleSettingChange('integrations', 'indeed', e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">Indeed Job Import</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.integrations.glassdoor}
                          onChange={e =>
                            handleSettingChange('integrations', 'glassdoor', e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Glassdoor Company Reviews
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactorAuth}
                          onChange={e =>
                            handleSettingChange('security', 'twoFactorAuth', e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Enable Two-Factor Authentication
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout ({settings.security.sessionTimeout} minutes)
                      </label>
                      <input
                        type="range"
                        min="15"
                        max="120"
                        step="15"
                        value={settings.security.sessionTimeout}
                        onChange={e =>
                          handleSettingChange(
                            'security',
                            'sessionTimeout',
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Expiry ({settings.security.passwordExpiry} days)
                      </label>
                      <input
                        type="range"
                        min="30"
                        max="365"
                        step="30"
                        value={settings.security.passwordExpiry}
                        onChange={e =>
                          handleSettingChange(
                            'security',
                            'passwordExpiry',
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="john.doe@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Zone
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="pst">Pacific Standard Time (PST)</option>
                        <option value="est">Eastern Standard Time (EST)</option>
                        <option value="cst">Central Standard Time (CST)</option>
                        <option value="mst">Mountain Standard Time (MST)</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
