import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContractReadOnly, getContract } from '@/lib/contracts';
import { toast } from 'react-hot-toast';

interface TokenSettings {
  autoClaim: boolean;
  autoLock: boolean;
  lockDuration: number;
  notificationPreferences: {
    email: boolean;
    push: boolean;
    telegram: boolean;
  };
  displayPreferences: {
    currency: 'USD' | 'EUR' | 'GBP' | 'INR';
    timezone: string;
    dateFormat: string;
  };
  securitySettings: {
    requireConfirmation: boolean;
    maxTransactionAmount: bigint;
    whitelistedAddresses: string[];
  };
}

export default function TokenSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userAddress, setUserAddress] = useState<string>('');
  const [settings, setSettings] = useState<TokenSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const getAddress = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setUserAddress(address);
        }
      } catch (err) {
        setError('Failed to get wallet address. Please make sure your wallet is connected.');
      }
    };

    getAddress();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!userAddress) return;

      try {
        setLoading(true);
        const contract = await getContractReadOnly();

        // Fetch user settings
        const [
          autoClaim,
          autoLock,
          lockDuration,
          notificationPreferences,
          displayPreferences,
          securitySettings,
        ] = await Promise.all([
          contract.getAutoClaim(userAddress),
          contract.getAutoLock(userAddress),
          contract.getLockDuration(userAddress),
          contract.getNotificationPreferences(userAddress),
          contract.getDisplayPreferences(userAddress),
          contract.getSecuritySettings(userAddress),
        ]);

        setSettings({
          autoClaim,
          autoLock,
          lockDuration,
          notificationPreferences,
          displayPreferences,
          securitySettings,
        });
      } catch (err) {
        setError('Failed to fetch settings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [userAddress]);

  const handleSaveSettings = async () => {
    if (!userAddress || !settings) return;

    try {
      setSaving(true);
      const contract = await getContract();

      // Update settings
      const tx = await contract.updateSettings(
        settings.autoClaim,
        settings.autoLock,
        settings.lockDuration,
        settings.notificationPreferences,
        settings.displayPreferences,
        settings.securitySettings
      );

      await tx.wait();
      toast.success('Settings updated successfully!');
    } catch (err) {
      console.error('Failed to update settings:', err);
      toast.error('Failed to update settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddWhitelistedAddress = (address: string) => {
    if (!settings) return;

    setSettings(prev =>
      prev
        ? {
            ...prev,
            securitySettings: {
              ...prev.securitySettings,
              whitelistedAddresses: [...prev.securitySettings.whitelistedAddresses, address],
            },
          }
        : null
    );
  };

  const handleRemoveWhitelistedAddress = (address: string) => {
    if (!settings) return;

    setSettings(prev =>
      prev
        ? {
            ...prev,
            securitySettings: {
              ...prev.securitySettings,
              whitelistedAddresses: prev.securitySettings.whitelistedAddresses.filter(
                addr => addr !== address
              ),
            },
          }
        : null
    );
  };

  if (status === 'loading' || loading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Token Settings</h1>

          {/* Save Settings Button */}
          <button
            onClick={handleSaveSettings}
            disabled={!settings || saving}
            className={`px-6 py-3 rounded-lg font-medium ${
              settings && !saving
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {settings && (
          <div className="space-y-6">
            {/* Automation Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Automation Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Auto Claim Rewards</h3>
                    <p className="text-sm text-gray-500">
                      Automatically claim rewards when available
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoClaim}
                      onChange={e =>
                        setSettings(prev =>
                          prev ? { ...prev, autoClaim: e.target.checked } : null
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Auto Lock Tokens</h3>
                    <p className="text-sm text-gray-500">Automatically lock tokens when received</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoLock}
                      onChange={e =>
                        setSettings(prev => (prev ? { ...prev, autoLock: e.target.checked } : null))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="lock-duration"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Default Lock Duration (days)
                  </label>
                  <input
                    type="number"
                    id="lock-duration"
                    value={settings.lockDuration / (24 * 60 * 60)}
                    onChange={e =>
                      setSettings(prev =>
                        prev
                          ? { ...prev, lockDuration: Number(e.target.value) * 24 * 60 * 60 }
                          : null
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    min="1"
                    max="365"
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notificationPreferences.email}
                      onChange={e =>
                        setSettings(prev =>
                          prev
                            ? {
                                ...prev,
                                notificationPreferences: {
                                  ...prev.notificationPreferences,
                                  email: e.target.checked,
                                },
                              }
                            : null
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Push Notifications</h3>
                    <p className="text-sm text-gray-500">Receive push notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notificationPreferences.push}
                      onChange={e =>
                        setSettings(prev =>
                          prev
                            ? {
                                ...prev,
                                notificationPreferences: {
                                  ...prev.notificationPreferences,
                                  push: e.target.checked,
                                },
                              }
                            : null
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Telegram Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via Telegram</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notificationPreferences.telegram}
                      onChange={e =>
                        setSettings(prev =>
                          prev
                            ? {
                                ...prev,
                                notificationPreferences: {
                                  ...prev.notificationPreferences,
                                  telegram: e.target.checked,
                                },
                              }
                            : null
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Display Preferences */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Display Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select
                    id="currency"
                    value={settings.displayPreferences.currency}
                    onChange={e =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              displayPreferences: {
                                ...prev.displayPreferences,
                                currency: e.target.value as 'USD' | 'EUR' | 'GBP' | 'INR',
                              },
                            }
                          : null
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    value={settings.displayPreferences.timezone}
                    onChange={e =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              displayPreferences: {
                                ...prev.displayPreferences,
                                timezone: e.target.value,
                              },
                            }
                          : null
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                    <option value="IST">IST</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date-format" className="block text-sm font-medium text-gray-700">
                    Date Format
                  </label>
                  <select
                    id="date-format"
                    value={settings.displayPreferences.dateFormat}
                    onChange={e =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              displayPreferences: {
                                ...prev.displayPreferences,
                                dateFormat: e.target.value,
                              },
                            }
                          : null
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Require Confirmation</h3>
                    <p className="text-sm text-gray-500">
                      Require confirmation for all transactions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.securitySettings.requireConfirmation}
                      onChange={e =>
                        setSettings(prev =>
                          prev
                            ? {
                                ...prev,
                                securitySettings: {
                                  ...prev.securitySettings,
                                  requireConfirmation: e.target.checked,
                                },
                              }
                            : null
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label htmlFor="max-amount" className="block text-sm font-medium text-gray-700">
                    Maximum Transaction Amount
                  </label>
                  <input
                    type="number"
                    id="max-amount"
                    value={ethers.formatEther(settings.securitySettings.maxTransactionAmount)}
                    onChange={e =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              securitySettings: {
                                ...prev.securitySettings,
                                maxTransactionAmount: ethers.parseEther(e.target.value),
                              },
                            }
                          : null
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Whitelisted Addresses
                  </label>
                  <div className="space-y-2">
                    {settings.securitySettings.whitelistedAddresses.map((address, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">{address}</span>
                        <button
                          onClick={() => handleRemoveWhitelistedAddress(address)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter address"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            const input = e.target as HTMLInputElement;
                            handleAddWhitelistedAddress(input.value);
                            input.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector(
                            'input[placeholder="Enter address"]'
                          ) as HTMLInputElement;
                          handleAddWhitelistedAddress(input.value);
                          input.value = '';
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
