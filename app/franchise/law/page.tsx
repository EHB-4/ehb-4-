'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Scale,
  Gavel,
  FileText,
  Users,
  DollarSign,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  Award,
  Target,
  CheckCircle,
  ArrowRight,
  Building,
  Globe,
  Lightbulb,
  Shield,
  Clock,
  BarChart3,
  Users2,
  BookOpen,
  Search,
  Briefcase,
  Handshake,
  Lock,
  Eye,
  FileCheck,
  Scale3,
  Gavel2,
  FileText2,
  Users3,
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
  Users22,
  BookOpen2,
  Search2,
  Briefcase2,
  Handshake2,
  Lock2,
  Eye2,
  FileCheck2,
} from 'lucide-react';

interface LegalService {
  id: string;
  name: string;
  description: string;
  duration: string;
  investment: number;
  roi: number;
  popularity: number;
  category: string;
  features: string[];
  requirements: string[];
  benefits: string[];
  icon: React.ReactNode;
}

const legalServices: LegalService[] = [
  {
    id: 'law-001',
    name: 'EHB Legal Consultancy',
    description: 'Comprehensive legal consultation and advisory services',
    duration: '6-10 months setup',
    investment: 3000000,
    roi: 45,
    popularity: 90,
    category: 'Legal Consultation',
    features: [
      'General legal advice',
      'Contract review and drafting',
      'Business law consultation',
      'Family law services',
      'Property law assistance',
      'Legal document preparation',
    ],
    requirements: [
      'Minimum 2000 sq ft space',
      'Legal license required',
      'Qualified lawyers',
      'Investment: PKR 3M - 5M',
    ],
    benefits: [
      'High-value services',
      'Recurring client base',
      'Corporate partnerships',
      'Government contracts',
      'International opportunities',
    ],
    icon: <Scale className="h-8 w-8" />,
  },
  {
    id: 'law-002',
    name: 'EHB Corporate Law Firm',
    description: 'Specialized corporate and business law services',
    duration: '8-12 months setup',
    investment: 5000000,
    roi: 50,
    popularity: 85,
    category: 'Corporate Law',
    features: [
      'Company formation',
      'Mergers and acquisitions',
      'Corporate governance',
      'Intellectual property',
      'Employment law',
      'Tax law services',
    ],
    requirements: [
      'Minimum 3000 sq ft space',
      'Corporate law expertise',
      'International connections',
      'Investment: PKR 5M - 8M',
    ],
    benefits: [
      'High-value corporate clients',
      'International partnerships',
      'Technology integration',
      'Specialized expertise',
      'Recurring business',
    ],
    icon: <Building className="h-8 w-8" />,
  },
  {
    id: 'law-003',
    name: 'EHB Family Law Center',
    description: 'Specialized family and matrimonial law services',
    duration: '4-8 months setup',
    investment: 2000000,
    roi: 35,
    popularity: 88,
    category: 'Family Law',
    features: [
      'Divorce proceedings',
      'Child custody cases',
      'Marriage contracts',
      'Property division',
      'Family mediation',
      'Adoption services',
    ],
    requirements: [
      'Minimum 1500 sq ft space',
      'Family law specialization',
      'Mediation training',
      'Investment: PKR 2M - 3.5M',
    ],
    benefits: [
      'Growing demand',
      'Emotional support services',
      'Community trust',
      'Recurring cases',
      'Specialized expertise',
    ],
    icon: <Users className="h-8 w-8" />,
  },
  {
    id: 'law-004',
    name: 'EHB Criminal Defense',
    description: 'Criminal law and defense services',
    duration: '6-10 months setup',
    investment: 2500000,
    roi: 40,
    popularity: 82,
    category: 'Criminal Law',
    features: [
      'Criminal defense',
      'Bail applications',
      'Appeal services',
      'Legal representation',
      'Case investigation',
      'Court appearances',
    ],
    requirements: [
      'Minimum 2000 sq ft space',
      'Criminal law expertise',
      'Court experience',
      'Investment: PKR 2.5M - 4M',
    ],
    benefits: [
      'High-value cases',
      'Court partnerships',
      'Specialized expertise',
      'Government contracts',
      'Media exposure',
    ],
    icon: <Gavel className="h-8 w-8" />,
  },
  {
    id: 'law-005',
    name: 'EHB Property Law Services',
    description: 'Real estate and property law specialization',
    duration: '5-9 months setup',
    investment: 2200000,
    roi: 38,
    popularity: 85,
    category: 'Property Law',
    features: [
      'Property transactions',
      'Land disputes',
      'Rental agreements',
      'Property registration',
      'Title verification',
      'Real estate litigation',
    ],
    requirements: [
      'Minimum 1800 sq ft space',
      'Property law expertise',
      'Government connections',
      'Investment: PKR 2.2M - 3.8M',
    ],
    benefits: [
      'Growing real estate market',
      'Recurring transactions',
      'Government partnerships',
      'Specialized services',
      'High-value properties',
    ],
    icon: <MapPin className="h-8 w-8" />,
  },
  {
    id: 'law-006',
    name: 'EHB Legal Tech Solutions',
    description: 'Technology-driven legal services and automation',
    duration: '3-6 months setup',
    investment: 1800000,
    roi: 55,
    popularity: 95,
    category: 'Legal Technology',
    features: [
      'Document automation',
      'Legal research tools',
      'Case management systems',
      'Online consultations',
      'E-filing services',
      'Legal analytics',
    ],
    requirements: [
      'Technical infrastructure',
      'Legal tech expertise',
      'Software development',
      'Investment: PKR 1.8M - 3M',
    ],
    benefits: [
      'High scalability',
      'Technology advantage',
      'Global reach',
      'Low overhead',
      'Innovation leadership',
    ],
    icon: <FileText className="h-8 w-8" />,
  },
];

const legalStats = {
  totalFirms: 120,
  activeClients: 15000,
  averageROI: 42,
  successRate: 88,
  marketGrowth: 18,
  averageInvestment: 2800000,
  popularLocations: ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Multan'],
  topCategories: [
    'Legal Consultation',
    'Corporate Law',
    'Family Law',
    'Property Law',
    'Legal Technology',
  ],
};

export default function LawFranchise() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<LegalService | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredServices = legalServices.filter(
    service => selectedCategory === 'all' || service.category === selectedCategory
  );

  const categories = ['all', ...Array.from(new Set(legalServices.map(s => s.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Scale className="h-12 w-12 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Legal
              <span className="text-purple-600 dark:text-purple-400"> Franchise</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Join the legal profession and provide essential legal services to your community.
              Build a legacy of justice and legal excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {legalStats.totalFirms}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Firms</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {legalStats.activeClients.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Clients Served</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {legalStats.averageROI}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average ROI</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {legalStats.successRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Legal Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose from our comprehensive range of legal franchise opportunities
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category === 'all' ? 'All Services' : category}
              </Button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.category}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{service.popularity}% Popular</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Investment:</span>
                      <span className="font-medium">{formatCurrency(service.investment)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">ROI:</span>
                      <span className="font-medium text-green-600">{service.roi}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Setup Time:</span>
                      <span className="font-medium">{service.duration}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Legal */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Legal Franchise?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Legal services are essential and our franchises offer exceptional opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Growing Market</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Legal sector is growing at {legalStats.marketGrowth}% annually with increasing
                  demand for legal services
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven System</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {legalStats.successRate}% success rate with comprehensive support and training
                  programs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">High ROI</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Average {legalStats.averageROI}% return on investment with multiple revenue
                  streams
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Locations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our legal franchises are thriving in these cities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {legalStats.popularLocations.map(location => (
              <Card key={location} className="text-center">
                <CardContent className="p-4">
                  <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="font-medium">{location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Legal Journey?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join our network of successful legal professionals and make a difference in your
            community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Apply for Legal Franchise
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    {selectedService.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{selectedService.name}</CardTitle>
                    <CardDescription>{selectedService.category}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedService(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400">{selectedService.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Investment</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(selectedService.investment)}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">ROI</h4>
                  <p className="text-2xl font-bold text-green-600">{selectedService.roi}%</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Setup Time</h4>
                  <p className="text-lg">{selectedService.duration}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Popularity</h4>
                  <p className="text-lg">{selectedService.popularity}%</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="space-y-1">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Requirements</h4>
                <ul className="space-y-1">
                  {selectedService.requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Benefits</h4>
                <ul className="space-y-1">
                  {selectedService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1">
                  Apply for This Service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => setSelectedService(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
