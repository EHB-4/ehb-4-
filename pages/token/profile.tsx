import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContract } from '@/lib/contracts';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

interface UserProfile {
  address: string;
  displayName: string;
  email: string;
  joinDate: number;
  totalLocks: number;
  totalUnlocks: number;
  totalRewards: bigint;
  totalReferrals: number;
  referralEarnings: bigint;
  lastActivity: number;
  preferences: {
    notifications: {
      email: boolean;
      telegram: boolean;
      discord: boolean;
    };
    security: {
      twoFactor: boolean;
      sessionTimeout: number;
      ipWhitelist: string[];
    };
    display: {
      language: string;
      timezone: string;
      theme: 'light' | 'dark' | 'system';
    };
  };
}

export default function TokenProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<
    'general' | 'security' | 'notifications' | 'preferences'
  >('general');
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    language: '',
    timezone: '',
    theme: 'system' as const,
    emailNotifications: false,
    telegramNotifications: false,
    discordNotifications: false,
    twoFactor: false,
    sessionTimeout: 30,
    ipWhitelist: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const contract = await getContract();

        // TODO: Fetch profile from contract
        // For now using mock data
        const mockProfile: UserProfile = {
          address: '0x123...abc',
          displayName: 'John Doe',
          email: 'john@example.com',
          joinDate: Date.now() - 2592000000, // 30 days ago
          totalLocks: 10,
          totalUnlocks: 5,
          totalRewards: ethers.parseEther('1000'),
          totalReferrals: 3,
          referralEarnings: ethers.parseEther('500'),
          lastActivity: Date.now() - 3600000, // 1 hour ago
          preferences: {
            notifications: {
              email: true,
              telegram: false,
              discord: true,
            },
            security: {
              twoFactor: true,
              sessionTimeout: 30,
              ipWhitelist: ['192.168.1.1', '10.0.0.1'],
            },
            display: {
              language: 'en',
              timezone: 'UTC',
              theme: 'system',
            },
          },
        };

        setProfile(mockProfile);
        setFormData({
          displayName: mockProfile.displayName,
          email: mockProfile.email,
          language: mockProfile.preferences.display.language,
          timezone: mockProfile.preferences.display.timezone,
          theme: mockProfile.preferences.display.theme,
          emailNotifications: mockProfile.preferences.notifications.email,
          telegramNotifications: mockProfile.preferences.notifications.telegram,
          discordNotifications: mockProfile.preferences.notifications.discord,
          twoFactor: mockProfile.preferences.security.twoFactor,
          sessionTimeout: mockProfile.preferences.security.sessionTimeout,
          ipWhitelist: mockProfile.preferences.security.ipWhitelist.join('\n'),
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const contract = await getContract();

      // TODO: Save profile to contract
      // For now just showing success message
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to save profile:', err);
      toast.error('Failed to update profile');
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

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        {/* Profile Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{profile.displayName}</h2>
              <p className="text-gray-500">{profile.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {formatDistanceToNow(profile.joinDate, { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Locks</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{profile.totalLocks}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Rewards</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(profile.totalRewards)} EHBGC
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Referrals</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{profile.totalReferrals}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Referral Earnings</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {ethers.formatEther(profile.referralEarnings)} EHBGC
              </p>
            </div>
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {(['general', 'security', 'notifications', 'preferences'] as const).map(tab => (
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
                <div>
                  <label htmlFor="display-name" className="block text-sm font-medium text-gray-700">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="display-name"
                    value={formData.displayName}
                    onChange={e => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select
                    id="language"
                    value={formData.language}
                    onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Time Zone
                  </label>
                  <select
                    id="timezone"
                    value={formData.timezone}
                    onChange={e => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                    <option value="GMT">GMT</option>
                  </select>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      formData.twoFactor ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.twoFactor ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label
                    htmlFor="session-timeout"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    id="session-timeout"
                    value={formData.sessionTimeout}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))
                    }
                    min="5"
                    max="120"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="ip-whitelist" className="block text-sm font-medium text-gray-700">
                    IP Whitelist
                  </label>
                  <textarea
                    id="ip-whitelist"
                    value={formData.ipWhitelist}
                    onChange={e => setFormData(prev => ({ ...prev, ipWhitelist: e.target.value }))}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter IP addresses (one per line)"
                  />
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        emailNotifications: !prev.emailNotifications,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      formData.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Telegram Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via Telegram</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        telegramNotifications: !prev.telegramNotifications,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      formData.telegramNotifications ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.telegramNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Discord Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via Discord</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        discordNotifications: !prev.discordNotifications,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      formData.discordNotifications ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.discordNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Display Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                    Theme
                  </label>
                  <select
                    id="theme"
                    value={formData.theme}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        theme: e.target.value as 'light' | 'dark' | 'system',
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
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
