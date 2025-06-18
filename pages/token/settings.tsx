import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContract } from '@/lib/contracts';
import { toast } from 'react-hot-toast';
import { Switch } from '@headlessui/react';

interface SettingsData {
  notifications: {
    email: boolean;
    push: boolean;
    telegram: boolean;
    discord: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: number;
    loginHistory: {
      date: number;
      ip: string;
      device: string;
      location: string;
    }[];
  };
  preferences: {
    language: string;
    theme: 'light' | 'dark' | 'system';
    currency: string;
    timezone: string;
  };
  api: {
    apiKey: string;
    apiSecret: string;
    lastUsed: number;
    permissions: string[];
  };
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsData | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const contract = await getContract();

        // TODO: Fetch settings from contract/backend
        // For now using mock data
        const mockData: SettingsData = {
          notifications: {
            email: true,
            push: true,
            telegram: false,
            discord: false,
          },
          security: {
            twoFactorEnabled: false,
            lastPasswordChange: Date.now() - 2592000000, // 30 days ago
            loginHistory: [
              {
                date: Date.now() - 3600000, // 1 hour ago
                ip: '192.168.1.1',
                device: 'Chrome on Windows',
                location: 'New York, USA',
              },
              {
                date: Date.now() - 86400000, // 1 day ago
                ip: '192.168.1.1',
                device: 'Firefox on MacOS',
                location: 'New York, USA',
              },
              {
                date: Date.now() - 172800000, // 2 days ago
                ip: '192.168.1.1',
                device: 'Safari on iOS',
                location: 'New York, USA',
              },
            ],
          },
          preferences: {
            language: 'en',
            theme: 'system',
            currency: 'USD',
            timezone: 'America/New_York',
          },
          api: {
            apiKey: 'sk_test_123456789',
            apiSecret: 'sk_test_987654321',
            lastUsed: Date.now() - 3600000, // 1 hour ago
            permissions: ['read', 'write'],
          },
        };

        setSettings(mockData);
      } catch (err) {
        console.error('Failed to fetch settings:', err);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleNotificationChange = async (
    type: keyof SettingsData['notifications'],
    value: boolean
  ) => {
    if (!settings) return;
    try {
      setSaving(true);
      // TODO: Update notification settings in contract/backend
      setSettings({
        ...settings,
        notifications: {
          ...settings.notifications,
          [type]: value,
        },
      });
      toast.success('Notification settings updated');
    } catch (err) {
      console.error('Failed to update notification settings:', err);
      toast.error('Failed to update notification settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSecurityChange = async (type: keyof SettingsData['security'], value: boolean) => {
    if (!settings) return;
    try {
      setSaving(true);
      // TODO: Update security settings in contract/backend
      setSettings({
        ...settings,
        security: {
          ...settings.security,
          [type]: value,
        },
      });
      toast.success('Security settings updated');
    } catch (err) {
      console.error('Failed to update security settings:', err);
      toast.error('Failed to update security settings');
    } finally {
      setSaving(false);
    }
  };

  const handlePreferenceChange = async (type: keyof SettingsData['preferences'], value: string) => {
    if (!settings) return;
    try {
      setSaving(true);
      // TODO: Update preference settings in contract/backend
      setSettings({
        ...settings,
        preferences: {
          ...settings.preferences,
          [type]: value,
        },
      });
      toast.success('Preferences updated');
    } catch (err) {
      console.error('Failed to update preferences:', err);
      toast.error('Failed to update preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerateApiKey = async () => {
    if (!settings) return;
    try {
      setSaving(true);
      // TODO: Regenerate API key in contract/backend
      const newApiKey = 'sk_test_' + Math.random().toString(36).substring(2, 15);
      setSettings({
        ...settings,
        api: {
          ...settings.api,
          apiKey: newApiKey,
          lastUsed: Date.now(),
        },
      });
      toast.success('API key regenerated');
    } catch (err) {
      console.error('Failed to regenerate API key:', err);
      toast.error('Failed to regenerate API key');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onChange={checked => handleNotificationChange('email', checked)}
                className={`${
                  settings.notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-500">Receive push notifications</p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onChange={checked => handleNotificationChange('push', checked)}
                className={`${
                  settings.notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Telegram Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications via Telegram</p>
              </div>
              <Switch
                checked={settings.notifications.telegram}
                onChange={checked => handleNotificationChange('telegram', checked)}
                className={`${
                  settings.notifications.telegram ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    settings.notifications.telegram ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Discord Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications via Discord</p>
              </div>
              <Switch
                checked={settings.notifications.discord}
                onChange={checked => handleNotificationChange('discord', checked)}
                className={`${
                  settings.notifications.discord ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    settings.notifications.discord ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={settings.security.twoFactorEnabled}
                onChange={checked => handleSecurityChange('twoFactorEnabled', checked)}
                className={`${
                  settings.security.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    settings.security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Login History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Device
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {settings.security.loginHistory.map((login, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(login.date).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {login.ip}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {login.device}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {login.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                id="language"
                value={settings.preferences.language}
                onChange={e => handlePreferenceChange('language', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                id="theme"
                value={settings.preferences.theme}
                onChange={e => handlePreferenceChange('theme', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                id="currency"
                value={settings.preferences.currency}
                onChange={e => handlePreferenceChange('currency', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="INR">INR</option>
              </select>
            </div>

            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                Timezone
              </label>
              <select
                id="timezone"
                value={settings.preferences.timezone}
                onChange={e => handlePreferenceChange('timezone', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">API Settings</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                API Key
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="apiKey"
                  value={settings.api.apiKey}
                  readOnly
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <button
                  onClick={handleRegenerateApiKey}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Regenerate
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="apiSecret" className="block text-sm font-medium text-gray-700">
                API Secret
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id="apiSecret"
                  value={settings.api.apiSecret}
                  readOnly
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Permissions</h3>
              <div className="mt-2 space-y-2">
                {settings.api.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      {permission.charAt(0).toUpperCase() + permission.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Last used: {new Date(settings.api.lastUsed).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
