'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  QrCode,
  Video,
  Mail,
  Share2,
  Download,
  Copy,
  CheckCircle,
  Mic,
  MessageSquare,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  WhatsApp,
  Telegram,
  Email,
  Link,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Calendar,
  Clock,
  Target,
  Zap,
  Sparkles,
} from 'lucide-react';

interface MarketingTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  status: 'available' | 'coming-soon' | 'premium';
}

/**
 * Marketing Tools Component
 * Provides various tools for affiliate marketing campaigns
 */
export default function MarketingTools() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('tools');
  const [campaignName, setCampaignName] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');

  const marketingTools: MarketingTool[] = [
    {
      id: 'qr-code',
      name: 'QR Code Generator',
      description: 'Generate QR codes for easy sharing',
      icon: <QrCode className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      status: 'available',
    },
    {
      id: 'video-invites',
      name: 'Video Invites',
      description: 'Create personalized video invitations',
      icon: <Video className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      status: 'available',
    },
    {
      id: 'email-campaigns',
      name: 'Email Campaigns',
      description: 'Send automated email campaigns',
      icon: <Mail className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      status: 'available',
    },
    {
      id: 'social-media',
      name: 'Social Media',
      description: 'Share on social media platforms',
      icon: <Share2 className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      status: 'available',
    },
    {
      id: 'analytics',
      name: 'Performance Analytics',
      description: 'Track your marketing performance',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      status: 'available',
    },
    {
      id: 'mobile-app',
      name: 'Mobile App',
      description: 'Download mobile app for tracking',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      status: 'coming-soon',
    },
    {
      id: 'ai-assistant',
      name: 'AI Marketing Assistant',
      description: 'AI-powered marketing recommendations',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      status: 'premium',
    },
    {
      id: 'voice-invites',
      name: 'Voice Invites',
      description: 'Create voice-based invitations',
      icon: <Mic className="w-6 h-6" />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      status: 'coming-soon',
    },
  ];

  const socialPlatforms = [
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: 'text-blue-600' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, color: 'text-blue-400' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, color: 'text-pink-600' },
    { name: 'LinkedIn', icon: <LinkedIn className="w-5 h-5" />, color: 'text-blue-700' },
    { name: 'WhatsApp', icon: <WhatsApp className="w-5 h-5" />, color: 'text-green-600' },
    { name: 'Telegram', icon: <Telegram className="w-5 h-5" />, color: 'text-blue-500' },
  ];

  const copyToClipboard = async (text: string, toolId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(toolId);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const generateQRCode = () => {
    // QR code generation logic
    console.log('Generating QR code...');
  };

  const createVideoInvite = () => {
    // Video invite creation logic
    console.log('Creating video invite...');
  };

  const sendEmailCampaign = () => {
    // Email campaign logic
    console.log('Sending email campaign...');
  };

  const shareOnSocial = (platform: string) => {
    // Social sharing logic
    console.log(`Sharing on ${platform}...`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <Badge variant="default" className="text-xs">
            Available
          </Badge>
        );
      case 'coming-soon':
        return (
          <Badge variant="secondary" className="text-xs">
            Coming Soon
          </Badge>
        );
      case 'premium':
        return (
          <Badge variant="outline" className="text-xs text-yellow-600">
            Premium
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tools">Marketing Tools</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Marketing Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingTools.map(tool => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${tool.bgColor}`}>
                      <div className={tool.color}>{tool.icon}</div>
                    </div>
                    {getStatusBadge(tool.status)}
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    disabled={tool.status !== 'available'}
                    onClick={() => {
                      switch (tool.id) {
                        case 'qr-code':
                          generateQRCode();
                          break;
                        case 'video-invites':
                          createVideoInvite();
                          break;
                        case 'email-campaigns':
                          sendEmailCampaign();
                          break;
                        case 'social-media':
                          shareOnSocial('all');
                          break;
                        default:
                          console.log(`Using ${tool.name}`);
                      }
                    }}
                  >
                    {tool.status === 'available' ? (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Use Tool
                      </>
                    ) : tool.status === 'coming-soon' ? (
                      <>
                        <Clock className="w-4 h-4 mr-2" />
                        Coming Soon
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Premium
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create Campaign */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Campaign</CardTitle>
                <CardDescription>Set up a new marketing campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    value={campaignName}
                    onChange={e => setCampaignName(e.target.value)}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-message">Campaign Message</Label>
                  <Textarea
                    id="campaign-message"
                    value={campaignMessage}
                    onChange={e => setCampaignMessage(e.target.value)}
                    placeholder="Enter your campaign message"
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>

            {/* Social Media Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Sharing</CardTitle>
                <CardDescription>Share your referral links on social platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialPlatforms.map(platform => (
                    <Button
                      key={platform.name}
                      variant="outline"
                      className="justify-start"
                      onClick={() => shareOnSocial(platform.name)}
                    >
                      <div className={platform.color}>{platform.icon}</div>
                      <span className="ml-2">{platform.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign History */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign History</CardTitle>
              <CardDescription>Track your previous campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Summer Referral Campaign</h4>
                    <p className="text-sm text-gray-600">Created on July 15, 2024</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">1,247</p>
                      <p className="text-sm text-gray-600">Clicks</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">89</p>
                      <p className="text-sm text-gray-600">Conversions</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Holiday Special</h4>
                    <p className="text-sm text-gray-600">Created on December 1, 2024</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">2,156</p>
                      <p className="text-sm text-gray-600">Clicks</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">156</p>
                      <p className="text-sm text-gray-600">Conversions</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,847</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9.7%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,456</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Platform Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>
                How your campaigns perform across different platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socialPlatforms.map(platform => (
                  <div
                    key={platform.name}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={platform.color}>{platform.icon}</div>
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-medium">2,847</p>
                        <p className="text-sm text-gray-600">Clicks</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">247</p>
                        <p className="text-sm text-gray-600">Conversions</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">8.7%</p>
                        <p className="text-sm text-gray-600">Rate</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
