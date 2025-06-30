'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Shield,
  Settings,
  BarChart3,
  Activity,
  UserCheck,
  Package,
  FileText,
  Database,
  Globe,
  Zap,
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeModules: number;
  pendingApprovals: number;
  systemHealth: string;
  recentActivity: number;
  securityAlerts: number;
}

interface ModuleStatus {
  name: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  users: number;
  performance: number;
  lastUpdated: string;
}

interface RecentActivity {
  id: string;
  type:
    | 'user_registration'
    | 'order_placed'
    | 'payment_received'
    | 'system_alert'
    | 'module_update';
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [modules, setModules] = useState<ModuleStatus[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState('all');

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 15420,
        totalOrders: 8923,
        totalRevenue: 456789.12,
        activeModules: 8,
        pendingApprovals: 23,
        systemHealth: 'excellent',
        recentActivity: 156,
        securityAlerts: 2,
      });

      setModules([
        {
          name: 'PSS (Professional Security Services)',
          status: 'active',
          users: 2341,
          performance: 98,
          lastUpdated: '2024-01-15 14:30',
        },
        {
          name: 'EMO (E-commerce Management)',
          status: 'active',
          users: 1892,
          performance: 95,
          lastUpdated: '2024-01-15 14:25',
        },
        {
          name: 'EDR (Emergency Decision Registration)',
          status: 'active',
          users: 3456,
          performance: 92,
          lastUpdated: '2024-01-15 14:20',
        },
        {
          name: 'GoSellr (E-commerce Platform)',
          status: 'active',
          users: 2789,
          performance: 89,
          lastUpdated: '2024-01-15 14:15',
        },
        {
          name: 'Wallet System',
          status: 'active',
          users: 1234,
          performance: 97,
          lastUpdated: '2024-01-15 14:10',
        },
        {
          name: 'AI Marketplace',
          status: 'maintenance',
          users: 567,
          performance: 75,
          lastUpdated: '2024-01-15 14:05',
        },
        {
          name: 'Franchise Management',
          status: 'active',
          users: 890,
          performance: 91,
          lastUpdated: '2024-01-15 14:00',
        },
        {
          name: 'Token System',
          status: 'active',
          users: 2156,
          performance: 94,
          lastUpdated: '2024-01-15 13:55',
        },
      ]);

      setActivities([
        {
          id: '1',
          type: 'user_registration',
          description: 'New user registered: john.doe@example.com',
          timestamp: '2024-01-15 14:35:22',
          severity: 'low',
        },
        {
          id: '2',
          type: 'order_placed',
          description: 'Large order placed: $2,450.00',
          timestamp: '2024-01-15 14:32:15',
          severity: 'medium',
        },
        {
          id: '3',
          type: 'payment_received',
          description: 'Payment received: $1,200.00',
          timestamp: '2024-01-15 14:30:08',
          severity: 'low',
        },
        {
          id: '4',
          type: 'system_alert',
          description: 'AI Marketplace maintenance scheduled',
          timestamp: '2024-01-15 14:28:45',
          severity: 'medium',
        },
        {
          id: '5',
          type: 'module_update',
          description: 'PSS module updated to v2.1.0',
          timestamp: '2024-01-15 14:25:30',
          severity: 'low',
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        );
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'maintenance':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Maintenance
          </Badge>
        );
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return <UserCheck className="h-4 w-4" />;
      case 'order_placed':
        return <ShoppingCart className="h-4 w-4" />;
      case 'payment_received':
        return <DollarSign className="h-4 w-4" />;
      case 'system_alert':
        return <AlertTriangle className="h-4 w-4" />;
      case 'module_update':
        return <Package className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System Overview & Management</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Zap className="h-4 w-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 capitalize">
                {stats.systemHealth}
              </div>
              <p className="text-xs text-muted-foreground">{stats.activeModules} active modules</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats?.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.recentActivity}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.securityAlerts}</div>
            <p className="text-xs text-muted-foreground">Low priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">Module Status</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          {/* Module Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Module Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Input placeholder="Search modules..." className="pl-10" />
                  <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  Global Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Modules Table */}
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Module</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Users</th>
                      <th className="text-left p-2">Performance</th>
                      <th className="text-left p-2">Last Updated</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map(module => (
                      <tr key={module.name} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div className="font-medium">{module.name}</div>
                        </td>
                        <td className="p-2">{getStatusBadge(module.status)}</td>
                        <td className="p-2">{module.users.toLocaleString()}</td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  module.performance >= 90
                                    ? 'bg-green-500'
                                    : module.performance >= 70
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${module.performance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{module.performance}%</span>
                          </div>
                        </td>
                        <td className="p-2 text-sm text-gray-500">{module.lastUpdated}</td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Manage
                            </Button>
                            <Button size="sm" variant="outline">
                              Settings
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 border rounded-lg"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        activity.severity === 'high'
                          ? 'bg-red-100'
                          : activity.severity === 'medium'
                          ? 'bg-yellow-100'
                          : 'bg-green-100'
                      }`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <p className={`text-sm ${getSeverityColor(activity.severity)}`}>
                        {activity.timestamp}
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {activity.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Performance Overview</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Performance Chart</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Module Usage</h3>
                  <div className="space-y-2">
                    {modules.slice(0, 5).map((module, index) => (
                      <div
                        key={module.name}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="font-medium">
                          #{index + 1} {module.name.split(' ')[0]}
                        </span>
                        <span className="text-sm text-gray-600">{module.users} users</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
