/**
 * SOT Security Page
 *
 * Security monitoring and fraud detection
 *
 * @author EHB AI System
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  BarChart3,
  MessageSquare,
  Globe,
  Smartphone,
  Database,
  Server,
  Network,
  Monitor,
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
  PoundSterling,
  Rupee,
  Won,
  Ruble,
  Lira,
  Real,
  Peso,
  Franc,
  Krona,
  Forint,
  Zloty,
  Koruna,
  Leu,
  Lev,
  Hryvnia,
  Tenge,
  Som,
  Tugrik,
  Kyat,
  Kip,
  Dong,
  Baht,
  Ringgit,
  SingaporeDollar,
  HongKongDollar,
  TaiwanDollar,
  NewZealandDollar,
  AustralianDollar,
  CanadianDollar,
  NorwegianKrone,
  SwedishKrona,
  DanishKrone,
  IcelandicKrone,
  PolishZloty,
  CzechKoruna,
  HungarianForint,
  RomanianLeu,
  BulgarianLev,
  CroatianKuna,
  SerbianDinar,
  BosnianMark,
  AlbanianLek,
  MacedonianDenar,
  MontenegrinEuro,
  KosovoEuro,
  MoldovanLeu,
  UkrainianHryvnia,
  BelarusianRuble,
  GeorgianLari,
  ArmenianDram,
  AzerbaijaniManat,
  KazakhstaniTenge,
  KyrgyzstaniSom,
  TajikistaniSomoni,
  TurkmenistaniManat,
  UzbekistaniSom,
  AfghanAfghani,
  PakistaniRupee,
  IndianRupee,
  BangladeshiTaka,
  SriLankanRupee,
  NepaleseRupee,
  BhutaneseNgultrum,
  MaldivianRufiyaa,
  BurmeseKyat,
  CambodianRiel,
  LaotianKip,
  VietnameseDong,
  ThaiBaht,
  MalaysianRinggit,
  Activity,
  BarChart3 as BarChart3Icon,
  MessageSquare as MessageSquareIcon,
  Star,
  Clock,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Play,
  Pause,
  RotateCcw,
  Eye as EyeIcon,
  Edit,
  Trash2,
  Download,
  Upload,
  GitBranch,
  Terminal,
  FileText,
  Users,
  TrendingUp,
  ArrowRight,
  Zap,
  Brain,
  Code,
} from 'lucide-react';

interface SecurityAlert {
  id: string;
  type: 'fraud' | 'security' | 'performance' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  detectedAt: Date;
  status: 'active' | 'investigating' | 'resolved' | 'false_positive';
  affectedUsers: number;
  confidence: number;
  source: string;
}

interface FraudCase {
  id: string;
  userId: string;
  userName: string;
  type: 'multi_account' | 'fake_profile' | 'stolen_code' | 'suspicious_behavior' | 'payment_fraud';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'confirmed' | 'resolved' | 'false_positive';
  detectedAt: Date;
  lastActivity: Date;
  evidence: string[];
  riskScore: number;
}

interface SecurityMetrics {
  totalAlerts: number;
  activeAlerts: number;
  resolvedAlerts: number;
  fraudCases: number;
  confirmedFraud: number;
  falsePositives: number;
  systemHealth: 'excellent' | 'good' | 'fair' | 'poor';
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  lastIncident: Date;
}

export default function SOTSecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [fraudCases, setFraudCases] = useState<FraudCase[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalAlerts: 0,
    activeAlerts: 0,
    resolvedAlerts: 0,
    fraudCases: 0,
    confirmedFraud: 0,
    falsePositives: 0,
    systemHealth: 'good',
    threatLevel: 'medium',
    lastIncident: new Date(),
  });

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    setAlerts([
      {
        id: 'alert_1',
        type: 'fraud',
        severity: 'high',
        title: 'Multiple Account Detection',
        description: 'User detected creating multiple accounts from same IP address',
        detectedAt: new Date(),
        status: 'active',
        affectedUsers: 1,
        confidence: 85,
        source: 'FraudWatchAgent',
      },
      {
        id: 'alert_2',
        type: 'security',
        severity: 'medium',
        title: 'Suspicious Login Attempt',
        description: 'Multiple failed login attempts detected from unknown location',
        detectedAt: new Date(),
        status: 'investigating',
        affectedUsers: 1,
        confidence: 72,
        source: 'SecurityMonitor',
      },
      {
        id: 'alert_3',
        type: 'performance',
        severity: 'low',
        title: 'System Performance Degradation',
        description: 'Response time increased by 40% in last 30 minutes',
        detectedAt: new Date(),
        status: 'resolved',
        affectedUsers: 150,
        confidence: 95,
        source: 'PerformanceMonitor',
      },
    ]);

    setFraudCases([
      {
        id: 'fraud_1',
        userId: 'user_123',
        userName: 'John Doe',
        type: 'multi_account',
        severity: 'high',
        status: 'investigating',
        detectedAt: new Date(),
        lastActivity: new Date(),
        evidence: ['Same IP address', 'Similar email patterns', 'Identical behavior'],
        riskScore: 85,
      },
      {
        id: 'fraud_2',
        userId: 'user_456',
        userName: 'Jane Smith',
        type: 'stolen_code',
        severity: 'critical',
        status: 'confirmed',
        detectedAt: new Date(),
        lastActivity: new Date(),
        evidence: ['Code matches known repository', 'No git history', 'Suspicious submission time'],
        riskScore: 95,
      },
    ]);

    setMetrics({
      totalAlerts: 156,
      activeAlerts: 23,
      resolvedAlerts: 133,
      fraudCases: 45,
      confirmedFraud: 12,
      falsePositives: 8,
      systemHealth: 'good',
      threatLevel: 'medium',
      lastIncident: new Date(),
    });
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSystemHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SOT Security Center</h1>
              <p className="text-gray-600">Monitor security threats and fraud detection</p>
            </div>
            <Link href="/sot">
              <Button variant="outline">
                Back to SOT
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Alerts</p>
                    <p className="text-lg font-bold text-gray-900">{metrics.activeAlerts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Threat Level</p>
                    <p className={`text-lg font-bold ${getThreatLevelColor(metrics.threatLevel)}`}>
                      {metrics.threatLevel}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">System Health</p>
                    <p className={`text-lg font-bold ${getSystemHealthColor(metrics.systemHealth)}`}>
                      {metrics.systemHealth}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fraud Cases</p>
                    <p className="text-lg font-bold text-gray-900">{metrics.fraudCases}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Cases</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Security Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{metrics.totalAlerts}</p>
                      <p className="text-sm text-gray-500">Total Alerts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{metrics.resolvedAlerts}</p>
                      <p className="text-sm text-gray-500">Resolved Alerts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{metrics.confirmedFraud}</p>
                      <p className="text-sm text-gray-500">Confirmed Fraud</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <XCircle className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{metrics.falsePositives}</p>
                      <p className="text-sm text-gray-500">False Positives</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`h-3 w-3 rounded-full ${alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                        <div>
                          <span className="font-medium">{alert.title}</span>
                          <p className="text-sm text-gray-500">{alert.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {alert.detectedAt.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <div className="space-y-6">
              {alerts.map((alert) => (
                <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{alert.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Source: {alert.source}</span>
                          <span>Confidence: {alert.confidence}%</span>
                          <span>Affected Users: {alert.affectedUsers}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Detected: {alert.detectedAt.toLocaleString()}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Fraud Cases Tab */}
          <TabsContent value="fraud" className="space-y-6">
            <div className="space-y-6">
              {fraudCases.map((case_) => (
                <Card key={case_.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">Fraud Case #{case_.id}</CardTitle>
                          <Badge className={getSeverityColor(case_.severity)}>
                            {case_.severity}
                          </Badge>
                          <Badge className={getStatusColor(case_.status)}>
                            {case_.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">
                          User: {case_.userName} ({case_.userId}) - {case_.type.replace(/_/g, ' ')}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Risk Score: {case_.riskScore}%</span>
                          <span>Detected: {case_.detectedAt.toLocaleDateString()}</span>
                          <span>Last Activity: {case_.lastActivity.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Evidence</h4>
                        <div className="space-y-1">
                          {case_.evidence.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Review Case
                        </Button>
                        <Button size="sm" variant="outline">
                          <Lock className="h-4 w-4 mr-2" />
                          Block User
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Security Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-green-800">System Secure</h3>
                      <p className="text-sm text-green-600">All systems operational</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-yellow-800">Medium Threat Level</h3>
                      <p className="text-sm text-yellow-600">Enhanced monitoring active</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-blue-800">AI Monitoring</h3>
                      <p className="text-sm text-blue-600">FraudWatchAgent active</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>System Health</span>
                              <span>{metrics.systemHealth}</span>
                            </div>
                            <Progress value={80} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Threat Detection</span>
                              <span>95%</span>
                            </div>
                            <Progress value={95} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Response Time</span>
                              <span>1.2s</span>
                            </div>
                            <Progress value={90} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <span>Security scan completed</span>
                            <span className="text-gray-500">2 min ago</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                            <span>New user registration</span>
                            <span className="text-gray-500">5 min ago</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <span>Fraud detection updated</span>
                            <span className="text-gray-500">10 min ago</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 