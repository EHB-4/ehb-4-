'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Code,
  Copy,
  Play,
  BookOpen,
  FileText,
  Database,
  Users,
  Building,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Globe,
  Shield,
  Key,
} from 'lucide-react';

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  category: string;
  parameters?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  requestBody?: {
    type: string;
    description: string;
    example: string;
  };
  responses: {
    code: number;
    description: string;
    example: string;
  }[];
  authentication: boolean;
  rateLimit?: string;
}

const apiEndpoints: ApiEndpoint[] = [
  // Franchise Management
  {
    method: 'GET',
    path: '/api/franchises',
    description: 'Get all franchises with optional filtering',
    category: 'Franchise Management',
    parameters: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: 'Filter by franchise category',
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Filter by franchise status',
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: 'Filter by location',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results to return',
      },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: 'Page number for pagination',
      },
    ],
    responses: [
      {
        code: 200,
        description: 'Success',
        example: `{
  "success": true,
  "data": [
    {
      "id": "FR001",
      "name": "EHB Health Plus",
      "category": "Health & Wellness",
      "location": "Karachi",
      "status": "active",
      "revenue": 8500000,
      "investment": 5000000
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 156
  }
}`,
      },
      {
        code: 401,
        description: 'Unauthorized',
        example: `{
  "success": false,
  "error": "Unauthorized access"
}`,
      },
    ],
    authentication: true,
    rateLimit: '100 requests/hour',
  },
  {
    method: 'POST',
    path: '/api/franchises',
    description: 'Create a new franchise',
    category: 'Franchise Management',
    requestBody: {
      type: 'application/json',
      description: 'Franchise data',
      example: `{
  "name": "EHB Health Plus",
  "category": "Health & Wellness",
  "location": "Karachi",
  "investment": 5000000,
  "manager": "Dr. Sarah Ahmed",
  "contact": {
    "email": "sarah.ahmed@ehb.com",
    "phone": "+92-300-1234567"
  }
}`,
    },
    responses: [
      {
        code: 201,
        description: 'Created successfully',
        example: `{
  "success": true,
  "data": {
    "id": "FR001",
    "name": "EHB Health Plus",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}`,
      },
      {
        code: 400,
        description: 'Bad request',
        example: `{
  "success": false,
  "error": "Validation failed",
  "details": {
    "name": "Name is required",
    "category": "Invalid category"
  }
}`,
      },
    ],
    authentication: true,
    rateLimit: '50 requests/hour',
  },
  {
    method: 'GET',
    path: '/api/franchises/{id}',
    description: 'Get franchise by ID',
    category: 'Franchise Management',
    parameters: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Franchise ID',
      },
    ],
    responses: [
      {
        code: 200,
        description: 'Success',
        example: `{
  "success": true,
  "data": {
    "id": "FR001",
    "name": "EHB Health Plus",
    "category": "Health & Wellness",
    "location": "Karachi",
    "status": "active",
    "revenue": 8500000,
    "investment": 5000000,
    "manager": "Dr. Sarah Ahmed",
    "employees": 12,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:15:00Z"
  }
}`,
      },
      {
        code: 404,
        description: 'Not found',
        example: `{
  "success": false,
  "error": "Franchise not found"
}`,
      },
    ],
    authentication: true,
    rateLimit: '200 requests/hour',
  },
  // Applications
  {
    method: 'GET',
    path: '/api/applications',
    description: 'Get all franchise applications',
    category: 'Applications',
    parameters: [
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Filter by application status',
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: 'Filter by franchise category',
      },
    ],
    responses: [
      {
        code: 200,
        description: 'Success',
        example: `{
  "success": true,
  "data": [
    {
      "id": "APP001",
      "applicantName": "Ahmed Khan",
      "category": "Health & Wellness",
      "status": "under_review",
      "submittedDate": "2024-01-15T10:30:00Z"
    }
  ]
}`,
      },
    ],
    authentication: true,
    rateLimit: '100 requests/hour',
  },
  {
    method: 'POST',
    path: '/api/applications',
    description: 'Submit a new franchise application',
    category: 'Applications',
    requestBody: {
      type: 'application/json',
      description: 'Application data',
      example: `{
  "applicantName": "Ahmed Khan",
  "email": "ahmed.khan@email.com",
  "phone": "+92-300-1234567",
  "category": "Health & Wellness",
  "location": "Karachi",
  "investment": 5000000,
  "businessPlan": "base64_encoded_file",
  "financialStatement": "base64_encoded_file"
}`,
    },
    responses: [
      {
        code: 201,
        description: 'Application submitted',
        example: `{
  "success": true,
  "data": {
    "id": "APP001",
    "status": "submitted",
    "trackingNumber": "TRK-2024-001"
  }
}`,
      },
    ],
    authentication: false,
    rateLimit: '20 requests/hour',
  },
  // Analytics
  {
    method: 'GET',
    path: '/api/analytics/revenue',
    description: 'Get revenue analytics',
    category: 'Analytics',
    parameters: [
      {
        name: 'period',
        type: 'string',
        required: false,
        description: 'Time period (day, week, month, quarter, year)',
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: 'Filter by franchise category',
      },
    ],
    responses: [
      {
        code: 200,
        description: 'Success',
        example: `{
  "success": true,
  "data": {
    "totalRevenue": 48000000,
    "growth": 12.5,
    "period": "month",
    "breakdown": [
      {
        "category": "Health & Wellness",
        "revenue": 16800000,
        "growth": 15.2
      }
    ]
  }
}`,
      },
    ],
    authentication: true,
    rateLimit: '60 requests/hour',
  },
  {
    method: 'GET',
    path: '/api/analytics/predictions',
    description: 'Get AI-powered predictions',
    category: 'Analytics',
    responses: [
      {
        code: 200,
        description: 'Success',
        example: `{
  "success": true,
  "data": {
    "predictiveRevenue": 52000000,
    "marketTrend": 8.5,
    "riskScore": 12,
    "opportunities": [
      {
        "category": "Technology",
        "potential": 85,
        "recommendation": "Increase investment"
      }
    ]
  }
}`,
      },
    ],
    authentication: true,
    rateLimit: '30 requests/hour',
  },
  // Notifications
  {
    method: 'GET',
    path: '/api/notifications',
    description: 'Get user notifications',
    category: 'Notifications',
    parameters: [
      {
        name: 'unread',
        type: 'boolean',
        required: false,
        description: 'Filter unread notifications',
      },
    ],
    responses: [
      {
        code: 200,
        description: 'Success',
        example: `{
  "success": true,
  "data": [
    {
      "id": "NOT001",
      "title": "Application Approved",
      "message": "Your franchise application has been approved",
      "type": "success",
      "read": false,
      "createdAt": "2024-01-20T10:30:00Z"
    }
  ]
}`,
      },
    ],
    authentication: true,
    rateLimit: '200 requests/hour',
  },
  {
    method: 'POST',
    path: '/api/notifications/mark-read',
    description: 'Mark notifications as read',
    category: 'Notifications',
    requestBody: {
      type: 'application/json',
      description: 'Notification IDs',
      example: `{
  "notificationIds": ["NOT001", "NOT002"]
}`,
    },
    responses: [
      {
        code: 200,
        description: 'Success',
        example: `{
  "success": true,
  "message": "Notifications marked as read"
}`,
      },
    ],
    authentication: true,
    rateLimit: '100 requests/hour',
  },
];

const categories = [
  'Franchise Management',
  'Applications',
  'Analytics',
  'Notifications',
  'Reports',
  'Users',
];

export default function ApiDocumentation() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);

  const filteredEndpoints = apiEndpoints.filter(endpoint => {
    const matchesCategory = selectedCategory === 'all' || endpoint.category === selectedCategory;
    const matchesSearch =
      endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800';
      case 'POST':
        return 'bg-blue-100 text-blue-800';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      case 'PATCH':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
            <p className="text-gray-600 mt-2">
              Complete API reference for the EHB Franchise System
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Try API</span>
            </Button>
          </div>
        </div>

        {/* API Overview */}
        <Card>
          <CardHeader>
            <CardTitle>API Overview</CardTitle>
            <CardDescription>Base URL and authentication information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Base URL</h3>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                  https://api.ehb.com/v1
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Authentication</h3>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm">Bearer Token</p>
                  <p className="text-xs text-gray-600">Include in Authorization header</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rate Limits</h3>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm">Varies by endpoint</p>
                  <p className="text-xs text-gray-600">Check individual endpoints</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search Endpoints</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by path or description..."
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

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints List */}
        <div className="space-y-4">
          {filteredEndpoints.map((endpoint, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                    <div>
                      <h3 className="font-mono font-semibold">{endpoint.path}</h3>
                      <p className="text-sm text-gray-600">{endpoint.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{endpoint.category}</Badge>
                    {endpoint.authentication && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Shield className="h-3 w-3 mr-1" />
                        Auth Required
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {endpoint.parameters && endpoint.parameters.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Parameters</h4>
                      <div className="space-y-1">
                        {endpoint.parameters.map((param, idx) => (
                          <div key={idx} className="text-xs">
                            <span className="font-mono">{param.name}</span>
                            <span className="text-gray-500"> ({param.type})</span>
                            {param.required && <span className="text-red-500"> *</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.requestBody && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Request Body</h4>
                      <p className="text-xs text-gray-600">{endpoint.requestBody.description}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Rate Limit</h4>
                    <p className="text-xs text-gray-600">{endpoint.rateLimit || 'No limit'}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className="flex items-center space-x-2"
                  >
                    <Eye className="h-3 w-3" />
                    <span>View Details</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(endpoint.path)}
                    className="flex items-center space-x-2"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copy Path</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center space-x-2">
                    <Play className="h-3 w-3" />
                    <span>Try It</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Endpoint Modal */}
        {selectedEndpoint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className={getMethodColor(selectedEndpoint.method)}>
                        {selectedEndpoint.method}
                      </Badge>
                      <h2 className="text-xl font-bold font-mono">{selectedEndpoint.path}</h2>
                    </div>
                    <p className="text-gray-600">{selectedEndpoint.description}</p>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedEndpoint(null)}>
                    Close
                  </Button>
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="parameters">Parameters</TabsTrigger>
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="responses">Responses</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Endpoint Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Category</Label>
                            <p className="font-medium">{selectedEndpoint.category}</p>
                          </div>
                          <div>
                            <Label>Authentication</Label>
                            <p className="font-medium">
                              {selectedEndpoint.authentication ? 'Required' : 'Not Required'}
                            </p>
                          </div>
                          <div>
                            <Label>Rate Limit</Label>
                            <p className="font-medium">
                              {selectedEndpoint.rateLimit || 'No limit'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="parameters" className="space-y-4">
                    {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>Parameters</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedEndpoint.parameters.map((param, index) => (
                              <div key={index} className="border-b pb-4 last:border-b-0">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-mono font-semibold">{param.name}</span>
                                    <Badge variant="outline">{param.type}</Badge>
                                    {param.required && (
                                      <Badge variant="destructive">Required</Badge>
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600">{param.description}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="text-center py-8">
                          <p className="text-gray-500">No parameters for this endpoint</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="request" className="space-y-4">
                    {selectedEndpoint.requestBody ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>Request Body</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <Label>Content Type</Label>
                              <p className="font-medium">{selectedEndpoint.requestBody.type}</p>
                            </div>
                            <div>
                              <Label>Description</Label>
                              <p className="text-sm text-gray-600">
                                {selectedEndpoint.requestBody.description}
                              </p>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <Label>Example</Label>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    copyToClipboard(selectedEndpoint.requestBody!.example)
                                  }
                                >
                                  <Copy className="h-3 w-3 mr-1" />
                                  Copy
                                </Button>
                              </div>
                              <div className="bg-gray-100 p-4 rounded-lg">
                                <pre className="text-xs overflow-x-auto">
                                  <code>{selectedEndpoint.requestBody.example}</code>
                                </pre>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="text-center py-8">
                          <p className="text-gray-500">No request body for this endpoint</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="responses" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Response Codes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedEndpoint.responses.map((response, index) => (
                            <div key={index} className="border-b pb-4 last:border-b-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge
                                  className={
                                    response.code >= 200 && response.code < 300
                                      ? 'bg-green-100 text-green-800'
                                      : response.code >= 400 && response.code < 500
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                  }
                                >
                                  {response.code}
                                </Badge>
                                <span className="font-medium">{response.description}</span>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <Label>Example Response</Label>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copyToClipboard(response.example)}
                                >
                                  <Copy className="h-3 w-3 mr-1" />
                                  Copy
                                </Button>
                              </div>
                              <div className="bg-gray-100 p-4 rounded-lg">
                                <pre className="text-xs overflow-x-auto">
                                  <code>{response.example}</code>
                                </pre>
                              </div>
                            </div>
                          ))}
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
