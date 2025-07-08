'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Settings,
  Zap,
  Database,
  Globe,
  Shield,
  Key,
  Link,
  Unlink,
  TestTube,
  Play,
  Pause,
  RefreshCw,
  Download,
  Upload,
  Code,
  Webhook,
  Api,
  CreditCard,
  Truck,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Users,
  Building,
  DollarSign,
  TrendingUp,
  Activity,
  BarChart3,
  FileText,
  Image,
  Video,
  Music,
  MapPin,
  Navigation,
  Car,
  Home,
  ShoppingCart,
  Package,
  Star,
  Heart,
  ThumbsUp,
  Share,
  Copy,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff,
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive' | 'error' | 'pending';
  apiKey?: string;
  webhookUrl?: string;
  lastSync?: string;
  syncFrequency: string;
  features: string[];
  config: Record<string, any>;
  health: {
    status: 'healthy' | 'warning' | 'error';
    lastCheck: string;
    responseTime: number;
    uptime: number;
  };
}

const integrations: Integration[] = [
  // Payment Gateways
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payment',
    description: 'Online payment processing and subscription management',
    status: 'active',
    apiKey: 'sk_test_...',
    webhookUrl: 'https://api.ehb.com/webhooks/stripe',
    lastSync: '2024-01-20T10:30:00Z',
    syncFrequency: 'Real-time',
    features: ['Payment Processing', 'Subscription Management', 'Refunds', 'Disputes'],
    config: {
      webhookEvents: ['payment_intent.succeeded', 'payment_intent.failed'],
      currency: 'PKR',
      autoCapture: true,
    },
    health: {
      status: 'healthy',
      lastCheck: '2024-01-20T10:30:00Z',
      responseTime: 120,
      uptime: 99.9,
    },
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'Payment',
    description: 'Global payment solution with buyer protection',
    status: 'active',
    apiKey: 'client_id_...',
    webhookUrl: 'https://api.ehb.com/webhooks/paypal',
    lastSync: '2024-01-20T10:25:00Z',
    syncFrequency: 'Real-time',
    features: ['Payment Processing', 'Buyer Protection', 'International Payments'],
    config: {
      webhookEvents: ['PAYMENT.CAPTURE.COMPLETED', 'PAYMENT.CAPTURE.DENIED'],
      currency: 'USD',
      sandbox: false,
    },
    health: {
      status: 'healthy',
      lastCheck: '2024-01-20T10:25:00Z',
      responseTime: 180,
      uptime: 99.8,
    },
  },
  // CRM Systems
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM',
    description: 'Customer relationship management and sales automation',
    status: 'active',
    apiKey: 'access_token_...',
    webhookUrl: 'https://api.ehb.com/webhooks/salesforce',
    lastSync: '2024-01-20T10:20:00Z',
    syncFrequency: 'Every 15 minutes',
    features: ['Lead Management', 'Contact Sync', 'Opportunity Tracking', 'Reports'],
    config: {
      syncFields: ['name', 'email', 'phone', 'company'],
      autoCreateLeads: true,
      syncDirection: 'bidirectional',
    },
    health: {
      status: 'healthy',
      lastCheck: '2024-01-20T10:20:00Z',
      responseTime: 250,
      uptime: 99.7,
    },
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM',
    description: 'Inbound marketing and sales platform',
    status: 'inactive',
    apiKey: 'hapikey_...',
    webhookUrl: 'https://api.ehb.com/webhooks/hubspot',
    lastSync: '2024-01-19T15:45:00Z',
    syncFrequency: 'Every 30 minutes',
    features: ['Contact Management', 'Email Marketing', 'Analytics', 'Workflows'],
    config: {
      syncFields: ['firstname', 'lastname', 'email', 'phone'],
      autoEnroll: false,
      syncDirection: 'unidirectional',
    },
    health: {
      status: 'warning',
      lastCheck: '2024-01-19T15:45:00Z',
      responseTime: 500,
      uptime: 95.2,
    },
  },
  // Communication
  {
    id: 'twilio',
    name: 'Twilio',
    category: 'Communication',
    description: 'SMS and voice communication services',
    status: 'active',
    apiKey: 'account_sid_...',
    webhookUrl: 'https://api.ehb.com/webhooks/twilio',
    lastSync: '2024-01-20T10:35:00Z',
    syncFrequency: 'Real-time',
    features: ['SMS', 'Voice Calls', 'WhatsApp', 'Video'],
    config: {
      defaultCountry: 'PK',
      webhookEvents: ['message.sent', 'message.delivered'],
      autoReply: true,
    },
    health: {
      status: 'healthy',
      lastCheck: '2024-01-20T10:35:00Z',
      responseTime: 80,
      uptime: 99.9,
    },
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    category: 'Communication',
    description: 'Email delivery and marketing automation',
    status: 'active',
    apiKey: 'SG.api_key_...',
    webhookUrl: 'https://api.ehb.com/webhooks/sendgrid',
    lastSync: '2024-01-20T10:28:00Z',
    syncFrequency: 'Real-time',
    features: ['Email Delivery', 'Template Management', 'Analytics', 'Automation'],
    config: {
      defaultFrom: 'noreply@ehb.com',
      webhookEvents: ['delivered', 'bounced', 'opened'],
      tracking: true,
    },
    health: {
      status: 'healthy',
      lastCheck: '2024-01-20T10:28:00Z',
      responseTime: 150,
      uptime: 99.8,
    },
  },
  // Analytics
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'Analytics',
    description: 'Website and app analytics tracking',
    status: 'active',
    apiKey: 'ga4_measurement_id_...',
    webhookUrl: 'https://api.ehb.com/webhooks/ga',
    lastSync: '2024-01-20T10:15:00Z',
    syncFrequency: 'Every hour',
    features: ['Page Views', 'User Behavior', 'Conversion Tracking', 'Reports'],
    config: {
      trackingId: 'G-XXXXXXXXXX',
      enhancedEcommerce: true,
      customDimensions: ['franchise_id', 'user_type'],
    },
    health: {
      status: 'healthy',
      lastCheck: '2024-01-20T10:15:00Z',
      responseTime: 300,
      uptime: 99.5,
    },
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    category: 'Analytics',
    description: 'Product analytics and user behavior tracking',
    status: 'error',
    apiKey: 'project_token_...',
    webhookUrl: 'https://api.ehb.com/webhooks/mixpanel',
    lastSync: '2024-01-20T08:30:00Z',
    syncFrequency: 'Every 30 minutes',
    features: ['Event Tracking', 'Funnel Analysis', 'Cohort Analysis', 'A/B Testing'],
    config: {
      projectId: '123456',
      events: ['franchise_viewed', 'application_started'],
      userProperties: ['franchise_category', 'location'],
    },
    health: {
      status: 'error',
      lastCheck: '2024-01-20T08:30:00Z',
      responseTime: 2000,
      uptime: 85.3,
    },
  },
  // Logistics
  {
    id: 'fedex',
    name: 'FedEx',
    category: 'Logistics',
    description: 'Shipping and logistics services',
    status: 'active',
    apiKey: 'api_key_...',
    webhookUrl: 'https://api.ehb.com/webhooks/fedex',
    lastSync: '2024-01-20T10:40:00Z',
    syncFrequency: 'Real-time',
    features: ['Shipping Rates', 'Tracking', 'Label Generation', 'Pickup Scheduling'],
    config: {
      accountNumber: '123456789',
      serviceTypes: ['PRIORITY', 'GROUND', 'EXPRESS'],
      webhookEvents: ['shipment.created', 'shipment.delivered'],
    },
    health: {
      status: 'healthy',
      lastCheck: '2024-01-20T10:40:00Z',
      responseTime: 200,
      uptime: 99.6,
    },
  },
  {
    id: 'dhl',
    name: 'DHL',
    category: 'Logistics',
    description: 'International shipping and express delivery',
    status: 'pending',
    apiKey: 'api_key_...',
    webhookUrl: 'https://api.ehb.com/webhooks/dhl',
    lastSync: null,
    syncFrequency: 'Real-time',
    features: ['International Shipping', 'Express Delivery', 'Tracking', 'Customs'],
    config: {
      accountNumber: '987654321',
      serviceTypes: ['EXPRESS', 'GROUND', 'ECONOMY'],
      webhookEvents: ['shipment.created', 'shipment.delivered'],
    },
    health: {
      status: 'warning',
      lastCheck: null,
      responseTime: 0,
      uptime: 0,
    },
  },
];

const categories = [
  'Payment',
  'CRM',
  'Communication',
  'Analytics',
  'Logistics',
  'Marketing',
  'Accounting',
  'HR',
];

export default function IntegrationPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showApiKeys, setShowApiKeys] = useState(false);

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'inactive':
        return <Pause className="h-4 w-4" />;
      case 'error':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      case 'error':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-PK');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
            <p className="text-gray-600 mt-2">Manage third-party service integrations</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Status</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Integration</span>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold">
                    {integrations.filter(i => i.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Errors</p>
                  <p className="text-2xl font-bold">
                    {integrations.filter(i => i.status === 'error').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold">{integrations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search Integrations</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or description..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Filter by Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="show-api-keys" checked={showApiKeys} onCheckedChange={setShowApiKeys} />
                <Label htmlFor="show-api-keys">Show API Keys</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integrations List */}
        <div className="space-y-4">
          {filteredIntegrations.map(integration => (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{integration.category}</Badge>
                        <Badge className={getStatusColor(integration.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(integration.status)}
                            <span>{integration.status}</span>
                          </div>
                        </Badge>
                        <Badge className={getHealthColor(integration.health.status)}>
                          <div className="flex items-center space-x-1">
                            {getHealthIcon(integration.health.status)}
                            <span>{integration.health.status}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">Last Sync</div>
                    <div className="font-medium">{formatDate(integration.lastSync)}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label>Sync Frequency</Label>
                    <p className="font-medium">{integration.syncFrequency}</p>
                  </div>
                  <div>
                    <Label>Response Time</Label>
                    <p className="font-medium">{integration.health.responseTime}ms</p>
                  </div>
                  <div>
                    <Label>Uptime</Label>
                    <p className="font-medium">{integration.health.uptime}%</p>
                  </div>
                </div>

                {/* API Key (if enabled) */}
                {showApiKeys && integration.apiKey && (
                  <div className="mb-4">
                    <Label>API Key</Label>
                    <div className="flex items-center space-x-2">
                      <Input value={integration.apiKey} readOnly className="font-mono text-sm" />
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setSelectedIntegration(integration)}
                    className="flex items-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Configure</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <TestTube className="h-4 w-4" />
                    <span>Test</span>
                  </Button>
                  {integration.status === 'active' ? (
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Pause className="h-4 w-4" />
                      <span>Pause</span>
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Activate</span>
                    </Button>
                  )}
                  <Button variant="outline" className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>Sync Now</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Configuration Modal */}
        {selectedIntegration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedIntegration.name} Configuration</h2>
                    <p className="text-gray-600">{selectedIntegration.description}</p>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedIntegration(null)}>
                    Close
                  </Button>
                </div>

                <Tabs defaultValue="general" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="api">API Settings</TabsTrigger>
                    <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                    <TabsTrigger value="sync">Sync Settings</TabsTrigger>
                    <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Integration Name</Label>
                            <Input value={selectedIntegration.name} />
                          </div>
                          <div>
                            <Label>Category</Label>
                            <Select defaultValue={selectedIntegration.category}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(category => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea value={selectedIntegration.description} />
                        </div>
                        <div>
                          <Label>Status</Label>
                          <Select defaultValue={selectedIntegration.status}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="error">Error</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="api" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>API Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>API Key</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type={showApiKeys ? 'text' : 'password'}
                              value={selectedIntegration.apiKey || ''}
                              placeholder="Enter API key"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowApiKeys(!showApiKeys)}
                            >
                              {showApiKeys ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label>Webhook URL</Label>
                          <Input value={selectedIntegration.webhookUrl || ''} />
                        </div>
                        <div className="flex space-x-2">
                          <Button>
                            <TestTube className="h-4 w-4 mr-2" />
                            Test Connection
                          </Button>
                          <Button variant="outline">
                            <Key className="h-4 w-4 mr-2" />
                            Generate New Key
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="webhooks" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Webhook Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Webhook URL</Label>
                          <Input value={selectedIntegration.webhookUrl || ''} />
                        </div>
                        <div>
                          <Label>Events to Listen</Label>
                          <div className="space-y-2">
                            {Object.entries(selectedIntegration.config).map(([key, value]) => (
                              <div key={key} className="flex items-center space-x-2">
                                <input type="checkbox" id={key} />
                                <Label htmlFor={key}>{key}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button>
                            <TestTube className="h-4 w-4 mr-2" />
                            Test Webhook
                          </Button>
                          <Button variant="outline">
                            <Webhook className="h-4 w-4 mr-2" />
                            View Logs
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="sync" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Synchronization Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Sync Frequency</Label>
                          <Select defaultValue={selectedIntegration.syncFrequency}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Real-time">Real-time</SelectItem>
                              <SelectItem value="Every 5 minutes">Every 5 minutes</SelectItem>
                              <SelectItem value="Every 15 minutes">Every 15 minutes</SelectItem>
                              <SelectItem value="Every 30 minutes">Every 30 minutes</SelectItem>
                              <SelectItem value="Every hour">Every hour</SelectItem>
                              <SelectItem value="Daily">Daily</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Last Sync</Label>
                          <p className="text-sm text-gray-600">
                            {formatDate(selectedIntegration.lastSync)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Sync Now
                          </Button>
                          <Button variant="outline">
                            <Activity className="h-4 w-4 mr-2" />
                            View Sync History
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="monitoring" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Health Monitoring</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Status</Label>
                            <Badge className={getHealthColor(selectedIntegration.health.status)}>
                              {selectedIntegration.health.status}
                            </Badge>
                          </div>
                          <div>
                            <Label>Response Time</Label>
                            <p className="font-medium">
                              {selectedIntegration.health.responseTime}ms
                            </p>
                          </div>
                          <div>
                            <Label>Uptime</Label>
                            <p className="font-medium">{selectedIntegration.health.uptime}%</p>
                          </div>
                        </div>
                        <div>
                          <Label>Last Health Check</Label>
                          <p className="text-sm text-gray-600">
                            {formatDate(selectedIntegration.health.lastCheck)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button>
                            <Activity className="h-4 w-4 mr-2" />
                            Run Health Check
                          </Button>
                          <Button variant="outline">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Metrics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
