import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { getContractReadOnly } from '@/lib/contracts';
import { toast } from 'react-hot-toast';

interface UserProfile {
  address: string;
  username: string;
  email: string;
  telegramUsername: string;
  discordUsername: string;
  twitterUsername: string;
  bio: string;
  avatar: string;
  joinDate: number;
  totalLocks: number;
  totalUnlocks: number;
  totalRewards: bigint;
  referralCode: string;
  referredBy: string | null;
  referralCount: number;
  referralRewards: bigint;
}

export default function TokenProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userAddress, setUserAddress] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
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
    const fetchProfile = async () => {
      if (!userAddress) return;

      try {
        setLoading(true);
        const contract = await getContractReadOnly();

        // Fetch user profile data
        const [
          username,
          email,
          telegramUsername,
          discordUsername,
          twitterUsername,
          bio,
          avatar,
          joinDate,
          totalLocks,
          totalUnlocks,
          totalRewards,
          referralCode,
          referredBy,
          referralCount,
          referralRewards,
        ] = await Promise.all([
          contract.getUsername(userAddress),
          contract.getEmail(userAddress),
          contract.getTelegramUsername(userAddress),
          contract.getDiscordUsername(userAddress),
          contract.getTwitterUsername(userAddress),
          contract.getBio(userAddress),
          contract.getAvatar(userAddress),
          contract.getJoinDate(userAddress),
          contract.getTotalLocks(userAddress),
          contract.getTotalUnlocks(userAddress),
          contract.getTotalRewards(userAddress),
          contract.getReferralCode(userAddress),
          contract.getReferredBy(userAddress),
          contract.getReferralCount(userAddress),
          contract.getReferralRewards(userAddress),
        ]);

        setProfile({
          address: userAddress,
          username,
          email,
          telegramUsername,
          discordUsername,
          twitterUsername,
          bio,
          avatar,
          joinDate,
          totalLocks,
          totalUnlocks,
          totalRewards,
          referralCode,
          referredBy,
          referralCount,
          referralRewards,
        });
      } catch (err) {
        setError('Failed to fetch profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userAddress]);

  const handleSaveProfile = async () => {
    if (!userAddress || !profile) return;

    try {
      setSaving(true);
      const contract = await getContract();

      // Update profile
      const tx = await contract.updateProfile(
        profile.username,
        profile.email,
        profile.telegramUsername,
        profile.discordUsername,
        profile.twitterUsername,
        profile.bio,
        profile.avatar
      );

      await tx.wait();
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyReferralCode = () => {
    if (!profile) return;
    navigator.clipboard.writeText(profile.referralCode);
    toast.success('Referral code copied to clipboard!');
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
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>

          {/* Edit/Save Profile Button */}
          <button
            onClick={editing ? handleSaveProfile : () => setEditing(true)}
            disabled={saving}
            className={`px-6 py-3 rounded-lg font-medium ${
              saving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {saving ? 'Saving...' : editing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {profile && (
          <div className="space-y-6">
            {/* Profile Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <img
                    src={profile.avatar || '/default-avatar.png'}
                    alt="Profile"
                    className="h-24 w-24 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{profile.username}</h2>
                  <p className="text-sm text-gray-500">
                    Member since {new Date(profile.joinDate * 1000).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-gray-600">{profile.bio}</p>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
                  <p className="mt-1 text-sm text-gray-900">{profile.address}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  {editing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={e =>
                        setProfile(prev => (prev ? { ...prev, email: e.target.value } : null))
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Telegram</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.telegramUsername}
                      onChange={e =>
                        setProfile(prev =>
                          prev ? { ...prev, telegramUsername: e.target.value } : null
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">
                      {profile.telegramUsername || 'Not set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Discord</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.discordUsername}
                      onChange={e =>
                        setProfile(prev =>
                          prev ? { ...prev, discordUsername: e.target.value } : null
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">
                      {profile.discordUsername || 'Not set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Twitter</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.twitterUsername}
                      onChange={e =>
                        setProfile(prev =>
                          prev ? { ...prev, twitterUsername: e.target.value } : null
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">
                      {profile.twitterUsername || 'Not set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  {editing ? (
                    <textarea
                      value={profile.bio}
                      onChange={e =>
                        setProfile(prev => (prev ? { ...prev, bio: e.target.value } : null))
                      }
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profile.bio || 'No bio yet'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Locks</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{profile.totalLocks}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Unlocks</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {profile.totalUnlocks}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Rewards</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {ethers.formatEther(profile.totalRewards)} EHBGC
                  </p>
                </div>
              </div>
            </div>

            {/* Referral Program */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Referral Program</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your Referral Code
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      readOnly
                      value={profile.referralCode}
                      className="flex-1 rounded-l-md border-gray-300 bg-gray-50 sm:text-sm"
                    />
                    <button
                      onClick={handleCopyReferralCode}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Referred By</h3>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {profile.referredBy || 'No one'}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Referrals</h3>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {profile.referralCount}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Referral Rewards</h3>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {ethers.formatEther(profile.referralRewards)} EHBGC
                    </p>
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
