import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContract } from '@/lib/contracts';
import { toast } from 'react-hot-toast';

interface TokenSettings {
  autoCompound: boolean;
  compoundInterval: number;
  minLockAmount: bigint;
  maxLockAmount: bigint;
  defaultLockDuration: number;
  maxLockDuration: number;
  minLockDuration: number;
  rewardsRate: number;
  referralRate: number;
  bonusRates: {
    earlyAdopter: number;
    longTerm: number;
    volume: number;
  };
  security: {
    requireConfirmation: boolean;
    maxDailyLocks: number;
    maxDailyUnlocks: number;
    cooldownPeriod: number;
  };
  notifications: {
    lockExpiry: boolean;
    rewardsAvailable: boolean;
    referralBonus: boolean;
    securityAlerts: boolean;
  };
}

export default function TokenSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<TokenSettings | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'rewards' | 'notifications'>(
    'general'
  );

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

        // TODO: Fetch settings from contract
        // For now using mock data
        const mockSettings: TokenSettings = {
          autoCompound: true,
          compoundInterval: 24, // hours
          minLockAmount: ethers.parseEther('100'),
          maxLockAmount: ethers.parseEther('1000000'),
          defaultLockDuration: 30, // days
          maxLockDuration: 365, // days
          minLockDuration: 7, // days
          rewardsRate: 5, // percentage
          referralRate: 2.5, // percentage
          bonusRates: {
            earlyAdopter: 10,
            longTerm: 5,
            volume: 3,
          },
          security: {
            requireConfirmation: true,
            maxDailyLocks: 5,
            maxDailyUnlocks: 3,
            cooldownPeriod: 24, // hours
          },
          notifications: {
            lockExpiry: true,
            rewardsAvailable: true,
            referralBonus: true,
            securityAlerts: true,
          },
        };

        setSettings(mockSettings);
      } catch (err) {
        console.error('Failed to fetch settings:', err);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      const contract = await getContract();

      // TODO: Save settings to contract
      // For now just showing success message
      toast.success('Settings updated successfully!');
    } catch (err) {
      console.error('Failed to save settings:', err);
      toast.error('Failed to update settings');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Token Settings</h1>

        {/* Settings Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {(['general', 'security', 'rewards', 'notifications'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Auto-Compound</h3>
                    <p className="text-sm text-gray-500">Automatically compound your rewards</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings(prev =>
                        prev ? { ...prev, autoCompound: !prev.autoCompound } : null
                      )
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.autoCompound ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    title={settings.autoCompound ? 'Disable Auto-Compound' : 'Enable Auto-Compound'}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.autoCompound ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label
                    htmlFor="compound-interval"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Compound Interval (hours)
                  </label>
                  <input
                    type="number"
                    id="compound-interval"
                    value={settings.compoundInterval}
                    onChange={e =>
                      setSettings(prev =>
                        prev ? { ...prev, compoundInterval: parseInt(e.target.value) } : null
                      )
                    }
                    min="1"
                    max="168"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="min-lock-amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Minimum Lock Amount (EHBGC)
                  </label>
                  <input
                    type="number"
                    id="min-lock-amount"
                    value={ethers.formatEther(settings.minLockAmount)}
                    onChange={e =>
                      setSettings(prev =>
                        prev ? { ...prev, minLockAmount: ethers.parseEther(e.target.value) } : null
                      )
                    }
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="max-lock-amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Maximum Lock Amount (EHBGC)
                  </label>
                  <input
                    type="number"
                    id="max-lock-amount"
                    value={ethers.formatEther(settings.maxLockAmount)}
                    onChange={e =>
                      setSettings(prev =>
                        prev ? { ...prev, maxLockAmount: ethers.parseEther(e.target.value) } : null
                      )
                    }
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="default-lock-duration"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Default Lock Duration (days)
                  </label>
                  <input
                    type="number"
                    id="default-lock-duration"
                    value={settings.defaultLockDuration}
                    onChange={e =>
                      setSettings(prev =>
                        prev ? { ...prev, defaultLockDuration: parseInt(e.target.value) } : null
                      )
                    }
                    min={settings.minLockDuration}
                    max={settings.maxLockDuration}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Require Confirmation</h3>
                    <p className="text-sm text-gray-500">
                      Require confirmation for all transactions
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              security: {
                                ...prev.security,
                                requireConfirmation: !prev.security.requireConfirmation,
                              },
                            }
                          : null
                      )
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.security.requireConfirmation ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    title={
                      settings.security.requireConfirmation
                        ? 'Disable Confirmation'
                        : 'Enable Confirmation'
                    }
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.security.requireConfirmation ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label
                    htmlFor="max-daily-locks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Maximum Daily Locks
                  </label>
                  <input
                    type="number"
                    id="max-daily-locks"
                    value={settings.security.maxDailyLocks}
                    onChange={e =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              security: {
                                ...prev.security,
                                maxDailyLocks: parseInt(e.target.value),
                              },
                            }
                          : null
                      )
                    }
                    min="1"
                    max="100"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="max-daily-unlocks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Maximum Daily Unlocks
                  </label>
                  <input
                    type="number"
                    id="max-daily-unlocks"
                    value={settings.security.maxDailyUnlocks}
                    onChange={e =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              security: {
                                ...prev.security,
                                maxDailyUnlocks: parseInt(e.target.value),
                              },
                            }
                          : null
                      )
                    }
                    min="1"
                    max="50"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cooldown-period"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cooldown Period (hours)
                  </label>
                  <input
                    type="number"
                    id="cooldown-period"
                    value={settings.security.cooldownPeriod}
                    onChange={e =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              security: {
                                ...prev.security,
                                cooldownPeriod: parseInt(e.target.value),
                              },
                            }
                          : null
                      )
                    }
                    min="0"
                    max="168"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            {/* Rewards Settings */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="rewards-rate" className="block text-sm font-medium text-gray-700">
                    Base Rewards Rate (%)
                  </label>
                  <input
                    type="number"
                    id="rewards-rate"
                    value={settings.rewardsRate}
                    onChange={e =>
                      setSettings(prev =>
                        prev ? { ...prev, rewardsRate: parseFloat(e.target.value) } : null
                      )
                    }
                    min="0"
                    max="100"
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="referral-rate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Referral Rate (%)
                  </label>
                  <input
                    type="number"
                    id="referral-rate"
                    value={settings.referralRate}
                    onChange={e =>
                      setSettings(prev =>
                        prev ? { ...prev, referralRate: parseFloat(e.target.value) } : null
                      )
                    }
                    min="0"
                    max="100"
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Bonus Rates</h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="early-adopter-bonus"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Early Adopter Bonus (%)
                      </label>
                      <input
                        type="number"
                        id="early-adopter-bonus"
                        value={settings.bonusRates.earlyAdopter}
                        onChange={e =>
                          setSettings(prev =>
                            prev
                              ? {
                                  ...prev,
                                  bonusRates: {
                                    ...prev.bonusRates,
                                    earlyAdopter: parseFloat(e.target.value),
                                  },
                                }
                              : null
                          )
                        }
                        min="0"
                        max="100"
                        step="0.1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="long-term-bonus"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Long Term Bonus (%)
                      </label>
                      <input
                        type="number"
                        id="long-term-bonus"
                        value={settings.bonusRates.longTerm}
                        onChange={e =>
                          setSettings(prev =>
                            prev
                              ? {
                                  ...prev,
                                  bonusRates: {
                                    ...prev.bonusRates,
                                    longTerm: parseFloat(e.target.value),
                                  },
                                }
                              : null
                          )
                        }
                        min="0"
                        max="100"
                        step="0.1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="volume-bonus"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Volume Bonus (%)
                      </label>
                      <input
                        type="number"
                        id="volume-bonus"
                        value={settings.bonusRates.volume}
                        onChange={e =>
                          setSettings(prev =>
                            prev
                              ? {
                                  ...prev,
                                  bonusRates: {
                                    ...prev.bonusRates,
                                    volume: parseFloat(e.target.value),
                                  },
                                }
                              : null
                          )
                        }
                        min="0"
                        max="100"
                        step="0.1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Lock Expiry Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Get notified when your locks are about to expire
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                lockExpiry: !prev.notifications.lockExpiry,
                              },
                            }
                          : null
                      )
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.notifications.lockExpiry ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    title={
                      settings.notifications.lockExpiry
                        ? 'Disable Lock Expiry Notifications'
                        : 'Enable Lock Expiry Notifications'
                    }
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.notifications.lockExpiry ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Rewards Available Notifications
                    </h3>
                    <p className="text-sm text-gray-500">
                      Get notified when rewards are available to claim
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                rewardsAvailable: !prev.notifications.rewardsAvailable,
                              },
                            }
                          : null
                      )
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.notifications.rewardsAvailable ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    title={
                      settings.notifications.rewardsAvailable
                        ? 'Disable Rewards Notifications'
                        : 'Enable Rewards Notifications'
                    }
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.notifications.rewardsAvailable ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Referral Bonus Notifications
                    </h3>
                    <p className="text-sm text-gray-500">
                      Get notified when you earn referral bonuses
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                referralBonus: !prev.notifications.referralBonus,
                              },
                            }
                          : null
                      )
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.notifications.referralBonus ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    title={
                      settings.notifications.referralBonus
                        ? 'Disable Referral Notifications'
                        : 'Enable Referral Notifications'
                    }
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.notifications.referralBonus ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Security Alerts</h3>
                    <p className="text-sm text-gray-500">
                      Get notified about security-related events
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings(prev =>
                        prev
                          ? {
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                securityAlerts: !prev.notifications.securityAlerts,
                              },
                            }
                          : null
                      )
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.notifications.securityAlerts ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    title={
                      settings.notifications.securityAlerts
                        ? 'Disable Security Alerts'
                        : 'Enable Security Alerts'
                    }
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.notifications.securityAlerts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full px-6 py-3 rounded-lg font-medium ${
                  saving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
