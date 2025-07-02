'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Building,
  MapPin,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  BrainCircuit,
  Lightbulb,
  TargetIcon,
  TrendingUpIcon,
  AlertCircle,
  Star,
  Award,
  Trophy,
} from 'lucide-react';

interface AdvancedMetrics {
  predictiveRevenue: number;
  marketTrend: number;
  competitorAnalysis: number;
  riskScore: number;
  opportunityScore: number;
  aiInsights: string[];
  recommendations: string[];
  marketPredictions: any[];
  performanceIndicators: any[];
  riskFactors: any[];
  opportunities: any[];
}

const mockAdvancedMetrics: AdvancedMetrics = {
  predictiveRevenue: 52000000,
  marketTrend: 8.5,
  competitorAnalysis: 85,
  riskScore: 12,
  opportunityScore: 78,
  aiInsights: [
    'Health & Wellness category showing 15% growth potential in next quarter',
    'Technology franchises expected to outperform market by 22%',
    'Location-based analysis suggests expansion opportunities in smaller cities',
    'Seasonal trends indicate Q3 will be strongest for education franchises',
  ],
  recommendations: [
    'Increase investment in Health & Wellness category',
    'Focus on technology franchise expansion',
    'Consider geographic diversification',
    'Optimize pricing strategy for education sector',
  ],
  marketPredictions: [
    { month: 'Jul', predicted: 52000000, actual: 48000000, confidence: 85 },
    { month: 'Aug', predicted: 55000000, actual: 0, confidence: 82 },
    { month: 'Sep', predicted: 58000000, actual: 0, confidence: 78 },
    { month: 'Oct', predicted: 60000000, actual: 0, confidence: 75 },
    { month: 'Nov', predicted: 62000000, actual: 0, confidence: 72 },
    { month: 'Dec', predicted: 65000000, actual: 0, confidence: 70 },
  ],
  performanceIndicators: [
    { name: 'Revenue Growth', value: 85, target: 80, status: 'excellent' },
    { name: 'Market Share', value: 72, target: 75, status: 'good' },
    { name: 'Customer Satisfaction', value: 88, target: 85, status: 'excellent' },
    { name: 'Operational Efficiency', value: 78, target: 80, status: 'good' },
    { name: 'Innovation Index', value: 82, target: 75, status: 'excellent' },
    { name: 'Risk Management', value: 90, target: 85, status: 'excellent' },
  ],
  riskFactors: [
    {
      factor: 'Economic Downturn',
      probability: 15,
      impact: 'High',
      mitigation: 'Diversify revenue streams',
    },
    {
      factor: 'Competition Increase',
      probability: 25,
      impact: 'Medium',
      mitigation: 'Enhance value proposition',
    },
    {
      factor: 'Regulatory Changes',
      probability: 10,
      impact: 'High',
      mitigation: 'Stay compliant and agile',
    },
    {
      factor: 'Technology Disruption',
      probability: 20,
      impact: 'Medium',
      mitigation: 'Invest in innovation',
    },
    {
      factor: 'Supply Chain Issues',
      probability: 30,
      impact: 'Low',
      mitigation: 'Multiple suppliers',
    },
  ],
  opportunities: [
    {
      opportunity: 'Digital Transformation',
      potential: 85,
      effort: 'Medium',
      timeline: '6 months',
    },
    { opportunity: 'Market Expansion', potential: 78, effort: 'High', timeline: '12 months' },
    {
      opportunity: 'Product Diversification',
      potential: 72,
      effort: 'Medium',
      timeline: '8 months',
    },
    { opportunity: 'Partnership Growth', potential: 68, effort: 'Low', timeline: '4 months' },
    { opportunity: 'Technology Integration', potential: 82, effort: 'High', timeline: '10 months' },
  ],
};

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

export default function AdvancedAnalytics() {
  const [metrics, setMetrics] = useState<AdvancedMetrics>(mockAdvancedMetrics);
  const [selectedPeriod, setSelectedPeriod] = useState('quarter');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOpportunityColor = (potential: number) => {
    if (potential >= 80) return 'bg-green-100 text-green-800';
    if (potential >= 60) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
            <p className="text-gray-600 mt-2">AI-powered insights and predictive analytics</p>
          </div>
          <div className="flex space-x-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        {/* AI Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Predictive Revenue</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.predictiveRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{metrics.marketTrend}%</span> predicted growth
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.marketTrend}%</div>
              <p className="text-xs text-muted-foreground">Positive market direction</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Competitor Analysis</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.competitorAnalysis}%</div>
              <p className="text-xs text-muted-foreground">Market position strength</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.riskScore}/100</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">Low risk</span> level
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI Insights</span>
            </CardTitle>
            <CardDescription>Machine learning powered insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span>Key Insights</span>
                </h3>
                <div className="space-y-3">
                  {metrics.aiInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500"
                    >
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <TargetIcon className="h-4 w-4 text-green-500" />
                  <span>Recommendations</span>
                </h3>
                <div className="space-y-3">
                  {metrics.recommendations.map((recommendation, index) => (
                    <div
                      key={index}
                      className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500"
                    >
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predictive Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Predictive Revenue Analytics</CardTitle>
            <CardDescription>
              AI-powered revenue predictions with confidence intervals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={metrics.marketPredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [formatCurrency(value), 'Revenue']} />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  name="Predicted"
                />
                <Bar dataKey="actual" fill="#10B981" name="Actual" />
                <Line
                  type="monotone"
                  dataKey="confidence"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="Confidence %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Indicators</CardTitle>
            <CardDescription>Key performance metrics with targets and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metrics.performanceIndicators.map((indicator, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{indicator.name}</span>
                    <Badge className={getStatusColor(indicator.status)}>{indicator.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {indicator.value}%</span>
                      <span>Target: {indicator.target}%</span>
                    </div>
                    <Progress value={indicator.value} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Analysis</CardTitle>
            <CardDescription>
              Identified risks with probability and mitigation strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.riskFactors.map((risk, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{risk.factor}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRiskColor(risk.impact)}>{risk.impact} Impact</Badge>
                      <Badge variant="outline">{risk.probability}% Probability</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Mitigation:</strong> {risk.mitigation}
                  </p>
                  <Progress value={risk.probability} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Opportunities</CardTitle>
            <CardDescription>
              Identified opportunities with potential and effort assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.opportunities.map((opportunity, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{opportunity.opportunity}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getOpportunityColor(opportunity.potential)}>
                        {opportunity.potential}% Potential
                      </Badge>
                      <Badge variant="outline">{opportunity.effort} Effort</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <p className="font-medium">{opportunity.timeline}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">ROI Potential:</span>
                      <p className="font-medium text-green-600">+{opportunity.potential * 0.8}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Market Performance Radar</CardTitle>
            <CardDescription>Multi-dimensional performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart
                data={[
                  { metric: 'Revenue Growth', value: 85, fullMark: 100 },
                  { metric: 'Market Share', value: 72, fullMark: 100 },
                  { metric: 'Customer Satisfaction', value: 88, fullMark: 100 },
                  { metric: 'Operational Efficiency', value: 78, fullMark: 100 },
                  { metric: 'Innovation Index', value: 82, fullMark: 100 },
                  { metric: 'Risk Management', value: 90, fullMark: 100 },
                ]}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Trophy className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold">Strong Performance</h3>
                  <p className="text-green-100">All key metrics above targets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Star className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold">Growth Opportunities</h3>
                  <p className="text-blue-100">Multiple expansion possibilities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold">Low Risk Profile</h3>
                  <p className="text-purple-100">Well-managed risk factors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
