import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import {
  UserCircleIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

interface Activity {
  id: string;
  type: 'lock' | 'unlock' | 'reward' | 'referral';
  amount: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  details: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  completed: boolean;
  reward: string;
}

interface Stats {
  totalLocked: number;
  totalRewards: number;
  referralCount: number;
  activeLocks: number;
  averageLockDuration: number;
  securityScore: number;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'lock',
    amount: 1000,
    timestamp: '2024-03-15T10:30:00Z',
    status: 'completed',
    details: 'Locked 1000 EHBGC for 12 months',
  },
  {
    id: '2',
    type: 'reward',
    amount: 50,
    timestamp: '2024-03-14T15:45:00Z',
    status: 'completed',
    details: 'Received monthly rewards',
  },
  {
    id: '3',
    type: 'referral',
    amount: 100,
    timestamp: '2024-03-13T09:15:00Z',
    status: 'completed',
    details: 'Referral bonus from user123',
  },
  {
    id: '4',
    type: 'unlock',
    amount: 500,
    timestamp: '2024-03-12T14:20:00Z',
    status: 'completed',
    details: 'Unlocked 500 EHBGC',
  },
];

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Early Adopter',
    description: 'Join the platform within the first month',
    icon: '🌟',
    progress: 100,
    completed: true,
    reward: '100 EHBGC',
  },
  {
    id: '2',
    title: 'Loyal Holder',
    description: 'Lock tokens for 12 consecutive months',
    icon: '💎',
    progress: 75,
    completed: false,
    reward: '500 EHBGC',
  },
  {
    id: '3',
    title: 'Referral Master',
    description: 'Refer 10 active users',
    icon: '👥',
    progress: 40,
    completed: false,
    reward: '1000 EHBGC',
  },
  {
    id: '4',
    title: 'Security Champion',
    description: 'Enable all security features',
    icon: '🔒',
    progress: 100,
    completed: true,
    reward: '200 EHBGC',
  },
];

const stats: Stats = {
  totalLocked: 5000,
  totalRewards: 250,
  referralCount: 4,
  activeLocks: 2,
  averageLockDuration: 8,
  securityScore: 95,
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserCircleIcon className="h-20 w-20 text-gray-400" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {session?.user?.name || 'User'}
                </h1>
                <p className="text-sm text-gray-500">
                  {session?.user?.email || 'user@example.com'}
                </p>
                <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active Member
                  </span>
                  <span className="ml-2 text-sm text-gray-500">Joined March 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Locked</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalLocked} EHBGC</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrophyIcon className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Rewards</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalRewards} EHBGC</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <StarIcon className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Referrals</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.referralCount} Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tab.Group onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Activity History
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Achievements
            </Tab>
          </Tab.List>
          <Tab.Panels>
            {/* Activity History Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {activities.map(activity => (
                    <div key={activity.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {activity.type === 'lock' && (
                              <ClockIcon className="h-6 w-6 text-blue-500" />
                            )}
                            {activity.type === 'unlock' && (
                              <ClockIcon className="h-6 w-6 text-green-500" />
                            )}
                            {activity.type === 'reward' && (
                              <TrophyIcon className="h-6 w-6 text-yellow-500" />
                            )}
                            {activity.type === 'referral' && (
                              <StarIcon className="h-6 w-6 text-purple-500" />
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{activity.details}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              activity.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : activity.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {activity.status}
                          </span>
                          <span className="ml-4 text-sm font-medium text-gray-900">
                            {activity.amount} EHBGC
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>

            {/* Achievements Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Achievements</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {achievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className={`border rounded-lg p-6 ${
                        achievement.completed ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 text-3xl">{achievement.icon}</div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{achievement.title}</h3>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Progress</span>
                          <span className="text-sm font-medium text-gray-900">
                            {achievement.progress}%
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="relative">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                              <div
                                style={{ width: `${achievement.progress}%` }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                  achievement.completed ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="text-sm font-medium text-gray-900">Reward: </span>
                        <span className="text-sm text-gray-500">{achievement.reward}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
