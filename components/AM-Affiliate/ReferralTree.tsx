'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Eye,
  TrendingUp,
  TrendingDown,
  UserPlus,
  UserMinus,
  DollarSign,
  Star,
  Trophy,
  Award,
  Crown,
} from 'lucide-react';

interface ReferralNode {
  id: number;
  name: string;
  level: number;
  earnings: number;
  status: 'active' | 'inactive' | 'pending';
  sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  joinDate: string;
  lastActivity: string;
  avatar?: string;
}

interface ReferralTreeProps {
  referrals: ReferralNode[];
  onViewDetails?: (referral: ReferralNode) => void;
}

/**
 * Referral Tree Component
 * Displays the user's referral network in a hierarchical structure
 */
export default function ReferralTree({ referrals, onViewDetails }: ReferralTreeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSqlLevelIcon = (level: string) => {
    switch (level) {
      case 'VIP':
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'High':
        return <Award className="w-4 h-4 text-purple-600" />;
      case 'Normal':
        return <Trophy className="w-4 h-4 text-blue-600" />;
      case 'Basic':
        return <Star className="w-4 h-4 text-green-600" />;
      case 'Free':
        return <Users className="w-4 h-4 text-gray-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'border-blue-500 bg-blue-50';
      case 2:
        return 'border-green-500 bg-green-50';
      case 3:
        return 'border-purple-500 bg-purple-50';
      case 4:
        return 'border-orange-500 bg-orange-50';
      case 5:
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const activeReferrals = referrals.filter(r => r.status === 'active');
  const inactiveReferrals = referrals.filter(r => r.status === 'inactive');
  const pendingReferrals = referrals.filter(r => r.status === 'pending');

  const totalEarnings = referrals.reduce((sum, r) => sum + r.earnings, 0);
  const averageEarnings = referrals.length > 0 ? totalEarnings / referrals.length : 0;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold">{referrals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{activeReferrals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Avg. Earnings</p>
                <p className="text-2xl font-bold">${averageEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Referral Network</span>
            <div className="flex space-x-2">
              <Badge variant="outline" className="text-green-600">
                {activeReferrals.length} Active
              </Badge>
              <Badge variant="outline" className="text-gray-600">
                {inactiveReferrals.length} Inactive
              </Badge>
              <Badge variant="outline" className="text-yellow-600">
                {pendingReferrals.length} Pending
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Track all your referrals and their performance across different levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referrals.map(referral => (
              <div
                key={referral.id}
                className={`p-4 border rounded-lg ${getLevelColor(referral.level)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                      {referral.avatar ? (
                        <img
                          src={referral.avatar}
                          alt={referral.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <Users className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">{referral.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Level {referral.level}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getSqlLevelIcon(referral.sqlLevel)}
                          <span className="text-sm text-gray-600">{referral.sqlLevel}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Joined: {new Date(referral.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-lg">${referral.earnings.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(referral.status)}>{referral.status}</Badge>
                      {onViewDetails && (
                        <Button variant="ghost" size="sm" onClick={() => onViewDetails(referral)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Activity Indicator */}
                <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                  <span>Last Activity: {new Date(referral.lastActivity).toLocaleDateString()}</span>
                  {referral.status === 'active' && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Active</span>
                    </div>
                  )}
                  {referral.status === 'inactive' && (
                    <div className="flex items-center space-x-1 text-gray-600">
                      <TrendingDown className="w-4 h-4" />
                      <span>Inactive</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {referrals.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Referrals Yet</h3>
                <p className="text-gray-600 mb-4">
                  Start sharing your referral links to build your network
                </p>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Generate Referral Link
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Level Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Level Breakdown</CardTitle>
          <CardDescription>Distribution of referrals across different levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(level => {
              const levelReferrals = referrals.filter(r => r.level === level);
              const levelEarnings = levelReferrals.reduce((sum, r) => sum + r.earnings, 0);

              return (
                <div
                  key={level}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getLevelColor(level).replace('bg-', 'bg-').replace('border-', '')}`}
                    >
                      {level}
                    </div>
                    <div>
                      <p className="font-medium">Level {level}</p>
                      <p className="text-sm text-gray-600">{levelReferrals.length} referrals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${levelEarnings.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Total earnings</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
