import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContract } from '@/lib/contracts';
import { toast } from 'react-hot-toast';

interface NotificationSettings {
  emailNotifications: boolean;
  telegramNotifications: boolean;
  discordNotifications: boolean;
  lockNotifications: boolean;
  unlockNotifications: boolean;
  rewardNotifications: boolean;
  securityNotifications: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  ipWhitelist: string[];
  sessionTimeout: number;
  requireConfirmation: boolean;
}

export default function TokenSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'security'>('account');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    telegramNotifications: false,
    discordNotifications: false,
    lockNotifications: true,
    unlockNotifications: true,
    rewardNotifications: true,
    securityNotifications: true,
  });
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    ipWhitelist: [],
    sessionTimeout: 30,
    requireConfirmation: true,
  });
  const [newIpAddress, setNewIpAddress] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        // TODO: Fetch settings from contract
        // For now using default values
      } catch (err) {
        console.error('Failed to fetch settings:', err);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      const contract = await getContract();

      // TODO: Save settings to contract
      // For now just showing success message
      toast.success('Settings saved successfully!');
    } catch (err) {
      console.error('Failed to save settings:', err);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleAddIpAddress = () => {
    if (!newIpAddress) return;

    setSecuritySettings(prev => ({
      ...prev,
      ipWhitelist: [...prev.ipWhitelist, newIpAddress],
    }));
    setNewIpAddress('');
  };

  const handleRemoveIpAddress = (ip: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      ipWhitelist: prev.ipWhitelist.filter(address => address !== ip),
    }));
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className={`px-6 py-3 rounded-lg font-medium ${
              saving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('account')}
              className={`${
                activeTab === 'account'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Security
            </button>
          </nav>
        </div>

        {/* Account Settings */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Display Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter your display name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  title="Language"
                  aria-label="Select Language"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  title="Time Zone"
                  aria-label="Select Time Zone"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={e =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          emailNotifications: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      title="Email Notifications"
                      aria-label="Email Notifications"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Email Notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.telegramNotifications}
                      onChange={e =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          telegramNotifications: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      title="Telegram Notifications"
                      aria-label="Telegram Notifications"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Telegram Notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.discordNotifications}
                      onChange={e =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          discordNotifications: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      title="Discord Notifications"
                      aria-label="Discord Notifications"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Discord Notifications
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.lockNotifications}
                      onChange={e =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          lockNotifications: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      title="Lock Notifications"
                      aria-label="Lock Notifications"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Lock Notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.unlockNotifications}
                      onChange={e =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          unlockNotifications: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      title="Unlock Notifications"
                      aria-label="Unlock Notifications"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Unlock Notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.rewardNotifications}
                      onChange={e =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          rewardNotifications: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      title="Reward Notifications"
                      aria-label="Reward Notifications"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Reward Notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.securityNotifications}
                      onChange={e =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          securityNotifications: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      title="Security Notifications"
                      aria-label="Security Notifications"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Security Notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={e =>
                      setSecuritySettings(prev => ({
                        ...prev,
                        twoFactorAuth: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    title="Two-Factor Authentication"
                    aria-label="Two-Factor Authentication"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Enable Two-Factor Authentication
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={e =>
                    setSecuritySettings(prev => ({
                      ...prev,
                      sessionTimeout: parseInt(e.target.value),
                    }))
                  }
                  min="5"
                  max="120"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  title="Session Timeout"
                  aria-label="Session Timeout in minutes"
                  placeholder="Enter session timeout in minutes"
                />
              </div>

              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={securitySettings.requireConfirmation}
                    onChange={e =>
                      setSecuritySettings(prev => ({
                        ...prev,
                        requireConfirmation: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    title="Require Confirmation for Transactions"
                    aria-label="Require Confirmation for Transactions"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Require Confirmation for Transactions
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newIpAddress}
                    onChange={e => setNewIpAddress(e.target.value)}
                    placeholder="Enter IP address"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    title="IP Address"
                    aria-label="Enter IP Address"
                  />
                  <button
                    onClick={handleAddIpAddress}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  {securitySettings.ipWhitelist.map((ip, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md"
                    >
                      <span className="text-sm text-gray-700">{ip}</span>
                      <button
                        onClick={() => handleRemoveIpAddress(ip)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
