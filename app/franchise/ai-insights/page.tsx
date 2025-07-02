'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Brain,
  Lightbulb,
  TrendingUp,
  Target,
  Users,
  DollarSign,
  MapPin,
  Calendar,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  Building,
  Globe,
  Shield,
  Clock,
  BarChart3,
  Search,
  FileText,
  MessageSquare,
  Zap,
  Eye,
  PieChart,
  LineChart,
  Activity,
  Brain2,
  Eye2,
  Tooth,
  Baby,
  Senior,
  Microscope,
  Syringe,
  Thermometer,
  Bandage,
  HeartPulse,
  BrainCircuit,
  Bone,
  Lungs,
  Kidney,
  Liver,
  Stomach,
  Spine,
  Footprints,
  Brain3,
  HeartHandshake,
  GraduationCap,
  BookOpen,
  Users2,
  DollarSign2,
  MapPin2,
  Calendar2,
  Star2,
  TrendingUp2,
  Award2,
  Target2,
  CheckCircle2,
  ArrowRight2,
  Building2,
  Globe2,
  Lightbulb2,
  Shield2,
  Clock2,
  BarChart32,
  Search2,
  FileText2,
  MessageSquare2,
  Zap2,
  Eye3,
  PieChart2,
  LineChart2,
  Activity2,
  Brain4,
  Eye4,
  Tooth2,
  Baby2,
  Senior2,
  Microscope2,
  Syringe2,
  Thermometer2,
  Bandage2,
  HeartPulse2,
  BrainCircuit2,
  Bone2,
  Lungs2,
  Kidney2,
  Liver2,
  Stomach2,
  Spine2,
  Footprints2,
  Brain5,
  HeartHandshake2,
  Scale,
  Gavel,
  FileText3,
  Users3,
  DollarSign3,
  MapPin3,
  Calendar3,
  Star3,
  TrendingUp3,
  Award3,
  Target3,
  CheckCircle3,
  ArrowRight3,
  Building3,
  Globe3,
  Lightbulb3,
  Shield3,
  Clock3,
  BarChart33,
  Search3,
  FileText4,
  MessageSquare3,
  Zap3,
  Eye5,
  PieChart3,
  LineChart3,
  Activity3,
  Brain6,
  Eye6,
  Tooth3,
  Baby3,
  Senior3,
  Microscope3,
  Syringe3,
  Thermometer3,
  Bandage3,
  HeartPulse3,
  BrainCircuit3,
  Bone3,
  Lungs3,
  Kidney3,
  Liver3,
  Stomach3,
  Spine3,
  Footprints3,
  Brain7,
  HeartHandshake3,
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  timestamp: string;
  dataPoints: string[];
  recommendations: string[];
}

const mockAIInsights: AIInsight[] = [
  {
    id: 'INS001',
    type: 'opportunity',
    title: 'High Demand for Mental Health Services',
    description:
      'Analysis shows 45% increase in mental health service inquiries in major cities. Market gap identified for specialized mental health franchises.',
    confidence: 92,
    impact: 'high',
    category: 'Health',
    timestamp: '2024-01-20T10:00:00Z',
    dataPoints: [
      '45% increase in mental health inquiries',
      'Market gap in 3 major cities',
      'High ROI potential (40-50%)',
      'Growing awareness and acceptance',
    ],
    recommendations: [
      'Launch specialized mental health franchise program',
      'Target major cities with highest demand',
      'Partner with certified mental health professionals',
      'Develop online therapy platform',
    ],
  },
  {
    id: 'INS002',
    type: 'trend',
    title: 'Rising Popularity of Online Education',
    description:
      'Online education sector showing 30% growth with increasing demand for STEM and language learning programs.',
    confidence: 88,
    impact: 'medium',
    category: 'Education',
    timestamp: '2024-01-20T09:30:00Z',
    dataPoints: [
      '30% growth in online education',
      'High demand for STEM programs',
      'Language learning market expansion',
      'Technology integration opportunities',
    ],
    recommendations: [
      'Expand online education franchise offerings',
      'Invest in technology infrastructure',
      'Develop hybrid learning models',
      'Partner with ed-tech companies',
    ],
  },
  {
    id: 'INS003',
    type: 'risk',
    title: 'Competition Increase in Legal Services',
    description:
      'New competitors entering legal services market in major cities. Need for differentiation and specialization.',
    confidence: 85,
    impact: 'medium',
    category: 'Law',
    timestamp: '2024-01-20T09:00:00Z',
    dataPoints: [
      '15% increase in legal service providers',
      'Price competition in major cities',
      'Need for specialization',
      'Technology adoption gap',
    ],
    recommendations: [
      'Focus on specialized legal services',
      'Implement technology solutions',
      'Develop unique value propositions',
      'Expand to underserved markets',
    ],
  },
  {
    id: 'INS004',
    type: 'recommendation',
    title: 'Optimize Location Selection Strategy',
    description:
      'AI analysis suggests optimal locations for new franchises based on market demand, competition, and demographic data.',
    confidence: 95,
    impact: 'high',
    category: 'Strategy',
    timestamp: '2024-01-20T08:30:00Z',
    dataPoints: [
      'Market demand analysis completed',
      'Competition mapping finished',
      'Demographic data processed',
      'ROI projections calculated',
    ],
    recommendations: [
      'Focus on emerging cities with low competition',
      'Target areas with high disposable income',
      'Consider proximity to educational institutions',
      'Evaluate transportation accessibility',
    ],
  },
];

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>(mockAIInsights);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [userQuery, setUserQuery] = useState('');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'risk':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'trend':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'recommendation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="h-4 w-4" />;
      case 'risk':
        return <Shield className="h-4 w-4" />;
      case 'trend':
        return <BarChart3 className="h-4 w-4" />;
      case 'recommendation':
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const filteredInsights = insights.filter(insight => {
    if (selectedType !== 'all' && insight.type !== selectedType) return false;
    if (selectedCategory !== 'all' && insight.category !== selectedCategory) return false;
    return true;
  });

  const generateAIInsight = () => {
    if (!userQuery.trim()) return;

    // Simulate AI analysis
    const newInsight: AIInsight = {
      id: `INS${Date.now()}`,
      type: 'recommendation',
      title: `AI Analysis: ${userQuery.substring(0, 50)}...`,
      description: `AI analysis of your query: "${userQuery}". Based on current market data and trends, here are the key insights...`,
      confidence: Math.floor(Math.random() * 20) + 80,
      impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
      category: 'Custom Analysis',
      timestamp: new Date().toISOString(),
      dataPoints: [
        'Market analysis completed',
        'Trend identification finished',
        'Risk assessment processed',
        'Opportunity mapping done',
      ],
      recommendations: [
        'Consider market expansion opportunities',
        'Evaluate competitive positioning',
        'Assess technology integration needs',
        'Review operational efficiency',
      ],
    };

    setInsights([newInsight, ...insights]);
    setUserQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Brain className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Leverage artificial intelligence to discover opportunities, identify trends, and make
            data-driven decisions for your franchise business.
          </p>
        </div>

        {/* AI Query Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Ask AI for Insights
            </CardTitle>
            <CardDescription>
              Get personalized AI analysis and recommendations for your franchise business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Textarea
                placeholder="Ask about market opportunities, competition analysis, location selection, or any franchise-related insights..."
                value={userQuery}
                onChange={e => setUserQuery(e.target.value)}
                className="flex-1"
                rows={3}
              />
              <Button onClick={generateAIInsight} disabled={!userQuery.trim()}>
                <Brain className="h-4 w-4 mr-2" />
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="opportunity">Opportunities</SelectItem>
              <SelectItem value="risk">Risks</SelectItem>
              <SelectItem value="trend">Trends</SelectItem>
              <SelectItem value="recommendation">Recommendations</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Law">Law</SelectItem>
              <SelectItem value="Strategy">Strategy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredInsights.map(insight => (
            <Card
              key={insight.id}
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedInsight(insight)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(insight.type)}
                    <Badge className={getTypeColor(insight.type)}>
                      {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(insight.timestamp).toLocaleDateString()}
                    </div>
                    <div className={`text-sm font-medium ${getImpactColor(insight.impact)}`}>
                      {insight.impact.toUpperCase()} Impact
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg">{insight.title}</CardTitle>
                <CardDescription>{insight.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{insight.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${insight.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {insights.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Insights</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {insights.filter(i => i.type === 'opportunity').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Opportunities</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {insights.filter(i => i.type === 'trend').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Trends</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {Math.round(insights.reduce((acc, i) => acc + i.confidence, 0) / insights.length)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Confidence</div>
            </CardContent>
          </Card>
        </div>

        {/* Insight Details Modal */}
        {selectedInsight && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(selectedInsight.type)}`}>
                      {getTypeIcon(selectedInsight.type)}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{selectedInsight.title}</CardTitle>
                      <CardDescription>{selectedInsight.category}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedInsight(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 dark:text-gray-400">{selectedInsight.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Confidence Level</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: `${selectedInsight.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedInsight.confidence}%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Impact Level</h4>
                    <Badge className={`${getImpactColor(selectedInsight.impact)} bg-opacity-20`}>
                      {selectedInsight.impact.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Key Data Points</h4>
                  <ul className="space-y-2">
                    {selectedInsight.dataPoints.map((point, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-3">AI Recommendations</h4>
                  <ul className="space-y-2">
                    {selectedInsight.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask Follow-up Question
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedInsight(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
