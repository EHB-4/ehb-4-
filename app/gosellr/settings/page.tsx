'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UserIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  BellIcon,
  GlobeIcon,
  KeyIcon,
  CameraIcon,
  SaveIcon,
  XIcon,
  CheckIcon,
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-react';
import Link from 'next/link';

// ========================================
// 1. GOSELLR SETTINGS PAGE
// ========================================

export default function GoSellrSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: 'individual',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    notifications: {
      orders: true,
      messages: true,
      marketing: false,
      security: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
    },
  });

  // ========================================
  // 2. COMPONENT INITIALIZATION
  // ========================================

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);

      // Simulate API call
      const userData = {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        avatar: '/api/placeholder/40/40',
        kycVerified: true,
        trustScore: 85,
        walletBalance: 1250.5,
        isSeller: true,
        sellerInfo: {
          businessName: "John's Tech Store",
          businessType: 'individual',
          verified: true,
          rating: 4.8,
          totalSales: 45600,
          totalProducts: 45,
          sellerSince: new Date('2023-01-15'),
          businessAddress: '123 Business St, New York, NY 10001',
          businessPhone: '+1 (555) 987-6543',
          businessEmail: 'business@johntech.com',
        },
        notifications: {
          orders: true,
          messages: true,
          marketing: false,
          security: true,
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showPhone: false,
        },
      };

      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        businessName: userData.sellerInfo.businessName,
        businessType: userData.sellerInfo.businessType,
        businessAddress: userData.sellerInfo.businessAddress,
        businessPhone: userData.sellerInfo.businessPhone,
        businessEmail: userData.sellerInfo.businessEmail,
        notifications: userData.notifications,
        privacy: userData.privacy,
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 3. FORM HANDLERS
  // ========================================

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user data
      setUser(prev => ({
        ...prev,
        ...formData,
        sellerInfo: {
          ...prev.sellerInfo,
          businessName: formData.businessName,
          businessType: formData.businessType,
          businessAddress: formData.businessAddress,
          businessPhone: formData.businessPhone,
          businessEmail: formData.businessEmail,
        },
      }));

      // Show success message
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // 4. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/gosellr" className="text-blue-600 hover:text-blue-700">
                ← Back to GoSellr
              </Link>
              <div className="ml-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500">Manage your account and preferences</p>
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <SaveIcon className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'profile', name: 'Profile', icon: UserIcon },
                { id: 'business', name: 'Business', icon: ShieldCheckIcon },
                { id: 'notifications', name: 'Notifications', icon: BellIcon },
                { id: 'privacy', name: 'Privacy', icon: KeyIcon },
                { id: 'security', name: 'Security', icon: ShieldCheckIcon },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <ProfileTab formData={formData} onInputChange={handleInputChange} user={user} />
            )}
            {activeTab === 'business' && (
              <BusinessTab formData={formData} onInputChange={handleInputChange} user={user} />
            )}
            {activeTab === 'notifications' && (
              <NotificationsTab formData={formData} onNestedChange={handleNestedChange} />
            )}
            {activeTab === 'privacy' && (
              <PrivacyTab formData={formData} onNestedChange={handleNestedChange} />
            )}
            {activeTab === 'security' && <SecurityTab user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 5. PROFILE TAB COMPONENT
// ========================================

function ProfileTab({
  formData,
  onInputChange,
  user,
}: {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  user: any;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>

        {/* Avatar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover"
            />
            <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition-colors">
              <CameraIcon className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
            <p className="text-sm text-gray-500">Profile picture</p>
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => onInputChange('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => onInputChange('email', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => onInputChange('phone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Verification Status</h4>
        <div className="flex items-center space-x-2">
          {user.kycVerified ? (
            <CheckIcon className="h-5 w-5 text-green-600" />
          ) : (
            <XIcon className="h-5 w-5 text-red-600" />
          )}
          <span className="text-sm text-gray-600">
            {user.kycVerified ? 'KYC Verified' : 'KYC Not Verified'}
          </span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">Trust Score: {user.trustScore}/100</span>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 6. BUSINESS TAB COMPONENT
// ========================================

function BusinessTab({
  formData,
  onInputChange,
  user,
}: {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  user: any;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={e => onInputChange('businessName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            <select
              value={formData.businessType}
              onChange={e => onInputChange('businessType', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="individual">Individual</option>
              <option value="business">Business</option>
              <option value="corporation">Corporation</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
            <textarea
              value={formData.businessAddress}
              onChange={e => onInputChange('businessAddress', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Phone</label>
            <input
              type="tel"
              value={formData.businessPhone}
              onChange={e => onInputChange('businessPhone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
            <input
              type="email"
              value={formData.businessEmail}
              onChange={e => onInputChange('businessEmail', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Business Stats */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Business Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Total Sales</p>
            <p className="text-sm font-medium text-gray-900">
              ${user.sellerInfo.totalSales.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Products</p>
            <p className="text-sm font-medium text-gray-900">{user.sellerInfo.totalProducts}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Rating</p>
            <p className="text-sm font-medium text-gray-900">{user.sellerInfo.rating}/5.0</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Member Since</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(user.sellerInfo.sellerSince).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 7. NOTIFICATIONS TAB COMPONENT
// ========================================

function NotificationsTab({
  formData,
  onNestedChange,
}: {
  formData: any;
  onNestedChange: (parent: string, field: string, value: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>

        <div className="space-y-4">
          {[
            {
              key: 'orders',
              label: 'Order Updates',
              description: 'Get notified about order status changes',
            },
            {
              key: 'messages',
              label: 'Messages',
              description: 'Receive notifications for new messages',
            },
            {
              key: 'marketing',
              label: 'Marketing',
              description: 'Receive promotional emails and offers',
            },
            {
              key: 'security',
              label: 'Security Alerts',
              description: 'Get notified about security events',
            },
          ].map(notification => (
            <div key={notification.key} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{notification.label}</h4>
                <p className="text-sm text-gray-500">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifications[notification.key]}
                  onChange={e =>
                    onNestedChange('notifications', notification.key, e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========================================
// 8. PRIVACY TAB COMPONENT
// ========================================

function PrivacyTab({
  formData,
  onNestedChange,
}: {
  formData: any;
  onNestedChange: (parent: string, field: string, value: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Visibility
            </label>
            <select
              value={formData.privacy.profileVisibility}
              onChange={e => onNestedChange('privacy', 'profileVisibility', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Contact Information</h4>

            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-medium text-gray-900">Show Email Address</h5>
                <p className="text-sm text-gray-500">Allow others to see your email address</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacy.showEmail}
                  onChange={e => onNestedChange('privacy', 'showEmail', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-medium text-gray-900">Show Phone Number</h5>
                <p className="text-sm text-gray-500">Allow others to see your phone number</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacy.showPhone}
                  onChange={e => onNestedChange('privacy', 'showPhone', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 9. SECURITY TAB COMPONENT
// ========================================

function SecurityTab({ user }: { user: any }) {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // Simulate password change
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>

        <div className="space-y-6">
          {/* Password Change */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Change Password</h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handlePasswordChange}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Security Status</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-900">Two-Factor Authentication</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Enabled</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-900">KYC Verification</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Verified</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-900">Trust Score</span>
                </div>
                <span className="text-sm text-gray-900 font-medium">{user.trustScore}/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
