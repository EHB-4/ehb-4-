'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Edit,
  Camera,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Star,
  Award,
  TrendingUp,
  Users,
  Activity,
} from 'lucide-react';

interface UserProfileProps {
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
    joinDate?: string;
    followers?: number;
    following?: number;
    posts?: number;
    rating?: number;
    badges?: string[];
  };
  isEditable?: boolean;
  onEdit?: () => void;
}

/**
 * UserProfile Component - Modern user profile display with social features
 * @param {UserProfileProps} props - Component props
 * @returns {JSX.Element} The user profile component
 */
export default function UserProfile({ user, isEditable = false, onEdit }: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Default user data
  const defaultUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/api/placeholder/150/150',
    bio: 'Full-stack developer passionate about creating innovative digital solutions. Specialized in React, Node.js, and cloud technologies.',
    location: 'New York, NY',
    website: 'https://johndoe.dev',
    joinDate: '2023-01-15',
    followers: 1247,
    following: 892,
    posts: 156,
    rating: 4.8,
    badges: ['Verified', 'Top Contributor', 'Early Adopter'],
  };

  const profileUser = user || defaultUser;

  const stats = [
    { label: 'Followers', value: profileUser.followers, icon: Users, color: 'text-blue-600' },
    { label: 'Following', value: profileUser.following, icon: Users, color: 'text-green-600' },
    { label: 'Posts', value: profileUser.posts, icon: Activity, color: 'text-purple-600' },
    { label: 'Rating', value: profileUser.rating, icon: Star, color: 'text-yellow-600' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black/20"></div>
        {isEditable && (
          <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
            <Camera className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            {profileUser.avatar ? (
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          {isEditable && (
            <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Name and Actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profileUser.name}
              </h1>
              {profileUser.badges?.map((badge, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{profileUser.bio}</p>
          </div>

          <div className="flex items-center space-x-2">
            {!isEditable && (
              <>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </>
            )}
            {isEditable && (
              <button
                onClick={onEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
            <button
              onClick={() => setShowMore(!showMore)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{profileUser.email}</span>
          </div>
          {profileUser.location && (
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{profileUser.location}</span>
            </div>
          )}
          {profileUser.website && (
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
              <Globe className="w-4 h-4" />
              <a
                href={profileUser.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {profileUser.website}
              </a>
            </div>
          )}
          {profileUser.joinDate && (
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                Joined {new Date(profileUser.joinDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className={`${stat.color} mb-2 flex justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {stat.label === 'Rating' ? stat.value : stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { action: 'Posted a new article', time: '2 hours ago', icon: Activity },
              { action: 'Earned "Top Contributor" badge', time: '1 day ago', icon: Award },
              { action: 'Reached 1000 followers', time: '3 days ago', icon: TrendingUp },
              { action: 'Completed profile setup', time: '1 week ago', icon: User },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
