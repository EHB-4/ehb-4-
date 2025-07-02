'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  DollarSign,
  TrendingUp,
  Share2,
  QrCode,
  Copy,
  CheckCircle,
  Star,
  Trophy,
  Target,
  BarChart3,
  Wallet,
  Lock,
  Unlock,
  Globe,
  Smartphone,
  Mail,
  MessageSquare,
  Video,
  Mic,
  Settings,
  Shield,
  Zap,
  Gift,
  Award,
  Users2,
  Activity,
  PieChart,
  Calendar,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  Eye,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  Info,
  HelpCircle,
} from 'lucide-react';

/**
 * AM Affiliate Marketing Dashboard
 * AI-based earning network with real-time tracking and payouts
 */
export default function AMAffiliatePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [referralLink, setReferralLink] = useState('https://ehb.com/ref/user123');
  const [copied, setCopied] = useState(false);
  const [sqlLevel, setSqlLevel] = useState('Normal');
  const [lockedCoins, setLockedCoins] = useState(1500);
  const [totalEarnings, setTotalEarnings] = useState(2847.5);
  const [monthlyEarnings, setMonthlyEarnings] = useState(847.3);

  // Mock data for demonstration
  const affiliateStats = {
    totalReferrals: 47,
    activeReferrals: 32,
    conversionRate: 68.1,
    averageEarnings: 60.6,
    sqlLevel: 'Normal',
    commissionRate: 6,
    loyaltyBonus: 0.8,
  };

  const referralTree = [
    { id: 1, name: 'John Doe', level: 1, earnings: 120, status: 'active', sqlLevel: 'Basic' },
    { id: 2, name: 'Jane Smith', level: 1, earnings: 85, status: 'active', sqlLevel: 'Normal' },
    { id: 3, name: 'Mike Johnson', level: 2, earnings: 45, status: 'active', sqlLevel: 'Free' },
    { id: 4, name: 'Sarah Wilson', level: 2, earnings: 62, status: 'inactive', sqlLevel: 'Basic' },
  ];

  const achievements = [
    {
      id: 1,
      name: 'First Referral',
      description: 'Get your first referral',
      earned: true,
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 2,
      name: 'Bronze Level',
      description: '10+ active referrals',
      earned: true,
      icon: <Star className="w-4 h-4" />,
    },
    {
      id: 3,
      name: 'Silver Level',
      description: '50+ active referrals',
      earned: false,
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      id: 4,
      name: 'Gold Level',
      description: '200+ active referrals',
      earned: false,
      icon: <Award className="w-4 h-4" />,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const generateQRCode = () => {
    // QR code generation logic
    console.log('Generating QR code for:', referralLink);
  };

  const lockCoins = (amount: number) => {
    setLockedCoins(prev => prev + amount);
  };

  const unlockCoins = (amount: number) => {
    setLockedCoins(prev => Math.max(0, prev - amount));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AM Affiliate Program</h1>
              <p className="text-gray-600 mt-2">AI-based earning network with real-time tracking</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                SQL Level: {sqlLevel}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="tools">Marketing Tools</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{affiliateStats.totalReferrals}</div>
                  <p className="text-xs text-muted-foreground">
                    +{affiliateStats.activeReferrals} active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +${monthlyEarnings.toFixed(2)} this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{affiliateStats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Locked Coins</CardTitle>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{lockedCoins} EHBGC</div>
                  <p className="text-xs text-muted-foreground">
                    +{affiliateStats.loyaltyBonus}% bonus
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Generate and share your referral links</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input value={referralLink} readOnly className="flex-1" />
                    <Button onClick={copyToClipboard} variant="outline">
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button onClick={generateQRCode} variant="outline">
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Link
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Video className="w-4 h-4 mr-2" />
                      Video Invite
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SQL Level Progress</CardTitle>
                  <CardDescription>Upgrade your level for higher commissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Level: {sqlLevel}</span>
                      <span>Commission: {affiliateStats.commissionRate}%</span>
                    </div>
                    <Progress value={75} className="w-full" />
                    <p className="text-xs text-muted-foreground">75% to next level (High)</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => lockCoins(500)} size="sm">
                      <Lock className="w-4 h-4 mr-2" />
                      Lock 500 Coins
                    </Button>
                    <Button onClick={() => unlockCoins(500)} variant="outline" size="sm">
                      <Unlock className="w-4 h-4 mr-2" />
                      Unlock
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Tree</CardTitle>
                <CardDescription>Track all your referrals and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralTree.map(referral => (
                    <div
                      key={referral.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{referral.name}</h4>
                          <p className="text-sm text-gray-500">
                            Level {referral.level} • {referral.sqlLevel}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={referral.status === 'active' ? 'default' : 'secondary'}>
                          {referral.status}
                        </Badge>
                        <span className="font-medium">${referral.earnings}</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Your commission breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Direct Commissions</span>
                      <span className="font-medium">${(totalEarnings * 0.7).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loyalty Bonuses</span>
                      <span className="font-medium">${(totalEarnings * 0.2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SQL Level Bonus</span>
                      <span className="font-medium">${(totalEarnings * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total Earnings</span>
                        <span>${totalEarnings.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Withdrawal</CardTitle>
                  <CardDescription>Withdraw your earnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (USD)</Label>
                    <Input id="amount" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wallet">Wallet Address</Label>
                    <Input id="wallet" placeholder="Enter wallet address" />
                  </div>
                  <Button className="w-full">
                    <Wallet className="w-4 h-4 mr-2" />
                    Withdraw Funds
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Marketing Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="w-5 h-5 mr-2" />
                    QR Code Generator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Generate QR codes for easy sharing</p>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="w-5 h-5 mr-2" />
                    Video Invites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Create personalized video invitations
                  </p>
                  <Button className="w-full">
                    <Mic className="w-4 h-4 mr-2" />
                    Record Video
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Campaigns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Send automated email campaigns</p>
                  <Button className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Track your marketing performance</p>
                  <Button className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Share on social media platforms</p>
                  <Button className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Mobile App
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Download mobile app for tracking</p>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download App
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Rewards</CardTitle>
                <CardDescription>Track your progress and unlock rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className={`p-4 border rounded-lg ${
                        achievement.earned
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-full ${
                            achievement.earned
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.name}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.earned && <CheckCircle className="w-5 h-5 text-green-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Detailed analytics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Conversion Rate</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{affiliateStats.conversionRate}%</span>
                        <ArrowUp className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Earnings per Referral</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">${affiliateStats.averageEarnings}</span>
                        <ArrowUp className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active Referrals</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{affiliateStats.activeReferrals}</span>
                        <ArrowUp className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Where your referrals are located</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>United States</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>United Kingdom</span>
                      <span className="font-medium">23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Canada</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Australia</span>
                      <span className="font-medium">14%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
