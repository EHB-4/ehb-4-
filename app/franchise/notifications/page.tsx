'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bell,
  BellOff,
  CheckCircle,
  AlertCircle,
  Info,
  XCircle,
  Clock,
  Star,
  Filter,
  Search,
  Settings,
  Trash2,
  Archive,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  User,
  Building,
  DollarSign,
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'application' | 'revenue' | 'system' | 'franchise' | 'general';
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
  sender?: string;
  relatedId?: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  categories: {
    application: boolean;
    revenue: boolean;
    system: boolean;
    franchise: boolean;
    general: boolean;
  };
  priority: {
    low: boolean;
    medium: boolean;
    high: boolean;
    urgent: boolean;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Franchise Application',
    message: 'A new application has been submitted for Health & Wellness franchise in Karachi',
    type: 'info',
    priority: 'high',
    category: 'application',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    actionRequired: true,
    sender: 'System',
    relatedId: 'APP001',
  },
  {
    id: '2',
    title: 'Application Approved',
    message: 'Education franchise application for Lahore has been approved',
    type: 'success',
    priority: 'medium',
    category: 'application',
    timestamp: '2024-01-15T09:15:00Z',
    read: false,
    actionRequired: false,
    sender: 'Sarah Johnson',
    relatedId: 'APP002',
  },
  {
    id: '3',
    title: 'Revenue Milestone Achieved',
    message: 'Technology franchise has achieved PKR 2M monthly revenue target',
    type: 'success',
    priority: 'high',
    category: 'revenue',
    timestamp: '2024-01-15T08:45:00Z',
    read: true,
    actionRequired: false,
    sender: 'System',
    relatedId: 'FR001',
  },
  {
    id: '4',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM',
    type: 'warning',
    priority: 'medium',
    category: 'system',
    timestamp: '2024-01-15T07:30:00Z',
    read: false,
    actionRequired: false,
    sender: 'IT Team',
  },
  {
    id: '5',
    title: 'Franchise Performance Alert',
    message: 'Travel franchise in Rawalpindi is underperforming this month',
    type: 'error',
    priority: 'urgent',
    category: 'franchise',
    timestamp: '2024-01-15T06:20:00Z',
    read: false,
    actionRequired: true,
    sender: 'Analytics System',
    relatedId: 'FR002',
  },
  {
    id: '6',
    title: 'Document Update Required',
    message: 'Please update your business license documents by end of month',
    type: 'warning',
    priority: 'high',
    category: 'general',
    timestamp: '2024-01-14T16:45:00Z',
    read: true,
    actionRequired: true,
    sender: 'Compliance Team',
  },
];

const mockSettings: NotificationSettings = {
  email: true,
  push: true,
  sms: false,
  categories: {
    application: true,
    revenue: true,
    system: true,
    franchise: true,
    general: true,
  },
  priority: {
    low: true,
    medium: true,
    high: true,
    urgent: true,
  },
};

export default function FranchiseNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [settings, setSettings] = useState<NotificationSettings>(mockSettings);
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'unread' && !notification.read) ||
      (filter === 'read' && notification.read) ||
      (filter === 'action' && notification.actionRequired);

    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || notification.category === categoryFilter;
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesPriority && matchesCategory && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'application':
        return <User className="h-4 w-4" />;
      case 'revenue':
        return <DollarSign className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      case 'franchise':
        return <Building className="h-4 w-4" />;
      case 'general':
        return <Bell className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const archiveNotification = (id: string) => {
    // In a real app, this would move to archived notifications
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date.toLocaleDateString('en-PK', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const updateSettings = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateCategorySettings = (category: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: value,
      },
    }));
  };

  const updatePrioritySettings = (priority: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      priority: {
        ...prev.priority,
        [priority]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">Stay updated with franchise activities</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Action Required</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{actionRequiredCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  notifications.filter(n => {
                    const today = new Date().toDateString();
                    return new Date(n.timestamp).toDateString() === today;
                  }).length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Delivery Methods */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Delivery Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <Label>Email Notifications</Label>
                      </div>
                      <Switch
                        checked={settings.email}
                        onCheckedChange={checked => updateSettings('email', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <Label>Push Notifications</Label>
                      </div>
                      <Switch
                        checked={settings.push}
                        onCheckedChange={checked => updateSettings('push', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <Label>SMS Notifications</Label>
                      </div>
                      <Switch
                        checked={settings.sms}
                        onCheckedChange={checked => updateSettings('sms', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Categories</h3>
                  <div className="space-y-3">
                    {Object.entries(settings.categories).map(([category, enabled]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(category)}
                          <Label className="capitalize">{category}</Label>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={checked => updateCategorySettings(category, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Levels */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Priority Levels</h3>
                  <div className="space-y-3">
                    {Object.entries(settings.priority).map(([priority, enabled]) => (
                      <div key={priority} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(priority)}>{priority}</Badge>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={checked => updatePrioritySettings(priority, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="filter">Filter</Label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="action">Action Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="franchise">Franchise</SelectItem>
                    <SelectItem value="general">General</SelectItem>
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

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              {filteredNotifications.length} notification
              {filteredNotifications.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <BellOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications found</p>
                </div>
              ) : (
                filteredNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{getTypeIcon(notification.type)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3
                              className={`font-medium ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}
                            >
                              {notification.title}
                            </h3>
                            {notification.actionRequired && (
                              <Badge variant="destructive" className="text-xs">
                                Action Required
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              {getCategoryIcon(notification.category)}
                              <span className="capitalize">{notification.category}</span>
                            </div>
                            {notification.sender && (
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <User className="h-3 w-3" />
                                <span>{notification.sender}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            {!notification.read && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark Read
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => archiveNotification(notification.id)}
                            >
                              <Archive className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
