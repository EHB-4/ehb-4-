'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Brain,
  Coins,
  Network,
  Link,
  Smartphone as Phone,
  Monitor,
  Tablet,
} from 'lucide-react';

/**
 * AM Affiliate Marketing Component
 * AI-based earning network with real-time tracking and payouts
 */
export default function AMAffiliate() {
  const [copied, setCopied] = useState(false);
  const [referralLink] = useState('https://ehb.com/ref/user123');

  // Mock data
  const stats = {
    totalReferrals: 47,
    activeReferrals: 32,
    conversionRate: 68.1,
    totalEarnings: 2847.5,
    monthlyEarnings: 847.3,
    sqlLevel: 'Normal',
    commissionRate: 6,
    lockedCoins: 1500,
    loyaltyBonus: 0.8,
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Tracking',
      description: 'Advanced AI monitors all referrals across users, sales, jobs, and services',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: 'Real-Time Payouts',
      description: 'Instant commission distribution via smart contracts',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Multi-Level Structure',
      description: 'Up to 10 levels deep with tiered commission rates',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Fraud Protection',
      description: 'AI-powered fraud detection and prevention system',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const commissionLevels = [
    { level: 1, rate: 10, description: 'Direct referrals' },
    { level: 2, rate: 5, description: 'Second level' },
    { level: 3, rate: 2, description: 'Third level' },
    { level: 4, rate: 1, description: 'Fourth level' },
    { level: 5, rate: 1, description: 'Fifth level' },
  ];

  const sqlLevels = [
    { name: 'Free', multiplier: 0.5, bonus: 2, required: 'Signup via referral' },
    { name: 'Basic', multiplier: 1.0, bonus: 4, required: 'KYC + 1 referral' },
    { name: 'Normal', multiplier: 1.2, bonus: 6, required: 'Lock 500 EHBGC' },
    { name: 'High', multiplier: 1.5, bonus: 8, required: 'Lock 1500 EHBGC' },
    { name: 'VIP', multiplier: 2.0, bonus: 10, required: 'Lock 5000 EHBGC' },
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

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="p-3 bg-blue-500 rounded-full">
            <Network className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">AM Affiliate Program</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          AI-based earning network that tracks all referrals across users, sales, jobs, and services
          with real-time payouts via smart contracts
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            SQL Level: {stats.sqlLevel}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Commission: {stats.commissionRate}%
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">+{stats.activeReferrals} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +${stats.monthlyEarnings.toFixed(2)} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locked Coins</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lockedCoins} EHBGC</div>
            <p className="text-xs text-muted-foreground">+{stats.loyaltyBonus}% bonus</p>
          </CardContent>
        </Card>
      </div>

      {/* Key Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                    <div className={feature.color}>{feature.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Commission Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Commission Levels
            </CardTitle>
            <CardDescription>Multi-level commission structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commissionLevels.map(level => (
                <div
                  key={level.level}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <span className="font-medium">Level {level.level}</span>
                    <p className="text-sm text-gray-600">{level.description}</p>
                  </div>
                  <Badge variant="outline">{level.rate}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              SQL Level Bonuses
            </CardTitle>
            <CardDescription>Earn more with higher SQL levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sqlLevels.map(level => (
                <div
                  key={level.name}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <span className="font-medium">{level.name}</span>
                    <p className="text-sm text-gray-600">{level.required}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{level.bonus}%</Badge>
                    <p className="text-xs text-gray-500">{level.multiplier}x multiplier</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Generate and share your referral links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Referral Link */}
          <div className="space-y-2">
            <Label htmlFor="referral-link">Your Referral Link</Label>
            <div className="flex space-x-2">
              <Input id="referral-link" value={referralLink} readOnly className="flex-1" />
              <Button onClick={copyToClipboard} variant="outline">
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button variant="outline">
                <QrCode className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full">
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
            <Button variant="outline" className="w-full">
              <Video className="w-4 h-4 mr-2" />
              Video Invite
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Email Campaign
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Platform Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Integration</CardTitle>
          <CardDescription>Earn from all EHB services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium">GoSellr</h4>
              <p className="text-sm text-gray-600">E-commerce</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium">JPS</h4>
              <p className="text-sm text-gray-600">Job Placement</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="font-medium">WMS</h4>
              <p className="text-sm text-gray-600">Healthcare</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium">HPS</h4>
              <p className="text-sm text-gray-600">Education</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement System */}
      <Card>
        <CardHeader>
          <CardTitle>Achievement System</CardTitle>
          <CardDescription>Unlock rewards and bonuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg bg-green-50">
              <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">Bronze</h4>
              <p className="text-sm text-gray-600">10+ referrals</p>
              <Badge variant="secondary" className="mt-2">
                Earned
              </Badge>
            </div>
            <div className="text-center p-4 border rounded-lg bg-gray-50">
              <Star className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h4 className="font-medium">Silver</h4>
              <p className="text-sm text-gray-600">50+ referrals</p>
              <Badge variant="outline" className="mt-2">
                Locked
              </Badge>
            </div>
            <div className="text-center p-4 border rounded-lg bg-gray-50">
              <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h4 className="font-medium">Gold</h4>
              <p className="text-sm text-gray-600">200+ referrals</p>
              <Badge variant="outline" className="mt-2">
                Locked
              </Badge>
            </div>
            <div className="text-center p-4 border rounded-lg bg-gray-50">
              <Gift className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h4 className="font-medium">Platinum</h4>
              <p className="text-sm text-gray-600">500+ referrals</p>
              <Badge variant="outline" className="mt-2">
                Locked
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-lg mb-6">
            Join the AM Affiliate Program and start earning from day one with our AI-powered
            tracking system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <ArrowRight className="w-4 h-4 mr-2" />
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
            >
              <Info className="w-4 h-4 mr-2" />
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
