"use client";

/**
 * SOT (Services of Technology) - Main Page
 *
 * Entry point for the SOT system with AI agent integration
 *
 * @author EHB AI System
 * @version 2.0.0
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  Code,
  Shield,
  Users,
  TrendingUp,
  Zap,
  ArrowRight,
  Star,
  Clock,
  CheckCircle,
  Search,
  Settings,
  BarChart3,
  MessageSquare,
  Globe,
  Smartphone,
  Database,
  Server,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  CreditCard,
  Wallet,
  PiggyBank,
  Banknote,
  Coins,
  Bitcoin,
  DollarSign,
  Euro,
  PoundSterling
} from 'lucide-react';

export default function SOTPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions = [
    {
      title: 'SOT Marketplace',
      description: 'Browse AI tools, services, and developers',
      icon: <Globe className="h-6 w-6" />,
      href: '/sot/marketplace',
      color: 'bg-blue-500',
    },
    {
      title: 'SOT Admin Dashboard',
      description: 'Monitor AI agents and system performance',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/sot/admin',
      color: 'bg-green-500',
    },
    {
      title: 'SOT AI Agents',
      description: 'Manage and interact with AI agents',
      icon: <Brain className="h-6 w-6" />,
      href: '/sot/agents',
      color: 'bg-purple-500',
    },
    {
      title: 'SOT Development',
      description: 'Create and manage development projects',
      icon: <Code className="h-6 w-6" />,
      href: '/sot/development',
      color: 'bg-orange-500',
    },
    {
      title: 'SOT Security',
      description: 'Security monitoring and fraud detection',
      icon: <Shield className="h-6 w-6" />,
      href: '/sot/security',
      color: 'bg-red-500',
    },
    {
      title: 'SOT Analytics',
      description: 'System analytics and performance metrics',
      icon: <TrendingUp className="h-6 w-6" />,
      href: '/sot/analytics',
      color: 'bg-indigo-500',
    },
  ];

  const aiAgents = [
    {
      name: 'DevMatchAgent',
      description: 'Smart Developer Matching',
      icon: <Users className="h-6 w-6" />,
      accuracy: '98.5%',
      status: 'online',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'CodeCheckAgent',
      description: 'AI Code Review',
      icon: <Code className="h-6 w-6" />,
      accuracy: '96.2%',
      status: 'online',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'SchedulerAgent',
      description: 'Intelligent Scheduling',
      icon: <Clock className="h-6 w-6" />,
      accuracy: '99.1%',
      status: 'online',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'FraudWatchAgent',
      description: 'Fraud Detection',
      icon: <Shield className="h-6 w-6" />,
      accuracy: '97.8%',
      status: 'online',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      name: 'ComplaintBot',
      description: 'AI Support',
      icon: <MessageSquare className="h-6 w-6" />,
      accuracy: '94.5%',
      status: 'online',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      name: 'SQLScoreAgent',
      description: 'SQL Level Management',
      icon: <Star className="h-6 w-6" />,
      accuracy: '99.3%',
      status: 'online',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              🤖 AI-Powered Technology Services
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Services of Technology (SOT)</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              The world's most advanced AI-powered marketplace for technology services. Connect with
              verified developers, access cutting-edge AI tools, and manage your projects with
              intelligent automation.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for AI tools, services, developers, or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sot/marketplace">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sot/development">
                <Button size="lg" variant="outline">
                  Start Development
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className={`h-12 w-12 ${action.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                            {action.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{action.title}</CardTitle>
                            <p className="text-sm text-gray-500">{action.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* System Statistics */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">System Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">15,420</p>
                        <p className="text-sm text-gray-500">Active Users</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Code className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">45,670</p>
                        <p className="text-sm text-gray-500">Total Tasks</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Brain className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">6</p>
                        <p className="text-sm text-gray-500">AI Agents</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">99.8%</p>
                        <p className="text-sm text-gray-500">Uptime</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">SOT Marketplace</h2>
              <p className="text-gray-600 mb-8">Browse AI tools, services, and connect with verified developers</p>
              <Link href="/sot/marketplace">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Open Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* AI Agents Tab */}
          <TabsContent value="agents">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Agents Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiAgents.map((agent, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`h-12 w-12 ${agent.bgColor} rounded-lg flex items-center justify-center`}>
                          <div className={agent.color}>{agent.icon}</div>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <p className="text-sm text-gray-500">{agent.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`h-2 w-2 rounded-full ${agent.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm text-gray-500 capitalize">{agent.status}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{agent.accuracy} accuracy</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/sot/agents">
                  <Button variant="outline">
                    Manage AI Agents
                    <Settings className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* Development Tab */}
          <TabsContent value="development">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">SOT Development Hub</h2>
              <p className="text-gray-600 mb-8">Create, manage, and deploy projects with AI assistance</p>
              <Link href="/sot/development">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
                  Start Development
                  <Code className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
