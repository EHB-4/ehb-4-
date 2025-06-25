/**
 * SOT (Services of Technology) - Main Page
 *
 * Entry point for the SOT system with AI agent integration
 *
 * @author EHB AI System
 * @version 1.0.0
 */

import React from 'react';
import SOTMarketplace from '@/components/SOT/SOTMarketplace';
import SOTAdminDashboard from '@/components/SOT/SOTAdminDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
} from 'lucide-react';

export default function SOTPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              🤖 AI-Powered Services
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Services of Technology</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              The world's most advanced AI-powered marketplace for technology services. Connect with
              verified developers, access cutting-edge AI tools, and manage your projects with
              intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Explore Marketplace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Advanced AI Agents</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our intelligent AI agents work 24/7 to ensure the best experience for developers and
              clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* DevMatchAgent */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">DevMatchAgent</CardTitle>
                    <p className="text-sm text-gray-500">Smart Developer Matching</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Automatically matches tasks with the most suitable developers based on skills,
                  experience, and availability using advanced AI algorithms.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>98.5% accuracy rate</span>
                </div>
              </CardContent>
            </Card>

            {/* CodeCheckAgent */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Code className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">CodeCheckAgent</CardTitle>
                    <p className="text-sm text-gray-500">AI Code Review</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Automatically reviews submitted code for quality, security, and best practices
                  using state-of-the-art AI models and static analysis.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>96.2% detection rate</span>
                </div>
              </CardContent>
            </Card>

            {/* SchedulerAgent */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">SchedulerAgent</CardTitle>
                    <p className="text-sm text-gray-500">Intelligent Scheduling</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Manages project timelines, deadlines, and escalations with intelligent automation
                  and proactive monitoring.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>99.1% on-time delivery</span>
                </div>
              </CardContent>
            </Card>

            {/* FraudWatchAgent */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">FraudWatchAgent</CardTitle>
                    <p className="text-sm text-gray-500">Fraud Detection</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Continuously monitors for fraud, fake profiles, and suspicious activities using
                  advanced behavioral analysis and AI detection.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>97.8% detection accuracy</span>
                </div>
              </CardContent>
            </Card>

            {/* ComplaintBot */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">ComplaintBot</CardTitle>
                    <p className="text-sm text-gray-500">AI Support</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Handles user complaints and support requests with natural language processing and
                  intelligent resolution routing.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>94.5% resolution rate</span>
                </div>
              </CardContent>
            </Card>

            {/* SQLScoreAgent */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">SQLScoreAgent</CardTitle>
                    <p className="text-sm text-gray-500">Reputation Management</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Manages SQL (Service Quality Level) scores and reputation systems with
                  blockchain-verified transparency and fairness.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>99.3% accuracy</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">15,420+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">45,670+</div>
              <div className="text-gray-600">Tasks Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">99.8%</div>
              <div className="text-gray-600">System Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Levels Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Quality Levels (SQL)</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our reputation system ensures quality and trust through verified levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { level: 'Free', color: 'bg-gray-100 text-gray-800', maxEarnings: 100 },
              { level: 'Basic', color: 'bg-yellow-100 text-yellow-800', maxEarnings: 500 },
              { level: 'Normal', color: 'bg-green-100 text-green-800', maxEarnings: 2000 },
              { level: 'High', color: 'bg-blue-100 text-blue-800', maxEarnings: 10000 },
              { level: 'VIP', color: 'bg-purple-100 text-purple-800', maxEarnings: 50000 },
            ].map(sql => (
              <Card key={sql.level} className="text-center">
                <CardContent className="p-6">
                  <Badge className={`mb-3 ${sql.color}`}>{sql.level}</Badge>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    ${sql.maxEarnings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Max Earnings</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Future of Tech Services?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers and clients using AI-powered technology services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SOT System</h3>
              <p className="text-gray-400">
                Advanced AI-powered marketplace for technology services
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">AI Agents</h4>
              <ul className="space-y-2 text-gray-400">
                <li>DevMatchAgent</li>
                <li>CodeCheckAgent</li>
                <li>SchedulerAgent</li>
                <li>FraudWatchAgent</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Tools</li>
                <li>Development Tasks</li>
                <li>Code Review</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Contact Support</li>
                <li>Status Page</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EHB Services of Technology. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
