'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import {
  Heart,
  Stethoscope,
  Pill,
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
  Activity,
  Brain,
  Eye,
  Microscope,
  Syringe,
  Thermometer,
  HeartPulse,
} from 'lucide-react';

interface HealthService {
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

const healthServices: HealthService[] = [
  {
    id: 'health-001',
    name: 'EHB Medical Clinic',
    description: 'Comprehensive medical care center offering primary healthcare services',
    duration: '8-12 months setup',
    investment: 5000000,
    roi: 40,
    popularity: 95,
    category: 'Primary Care',
    features: [
      'General consultation services',
      'Laboratory testing',
      'Pharmacy services',
      'Emergency care',
      'Preventive health programs',
      'Health screenings',
    ],
    requirements: [
      'Minimum 3000 sq ft space',
      'Medical license required',
      'Certified medical staff',
      'Investment: PKR 5M - 8M',
    ],
    benefits: [
      'High demand market',
      'Recurring patient base',
      'Insurance partnerships',
      'Government support',
      'Community trust',
    ],
    icon: <Stethoscope className="h-8 w-8" />,
  },
  {
    id: 'health-002',
    name: 'EHB Dental Clinic',
    description: 'Specialized dental care and oral health services',
    duration: '6-10 months setup',
    investment: 3500000,
    roi: 45,
    popularity: 88,
    category: 'Dental Care',
    features: [
      'General dentistry',
      'Cosmetic procedures',
      'Orthodontics',
      'Oral surgery',
      'Preventive care',
      'Emergency dental services',
    ],
    requirements: [
      'Minimum 2000 sq ft space',
      'Dental license required',
      'Specialized equipment',
      'Investment: PKR 3.5M - 6M',
    ],
    benefits: [
      'High-value procedures',
      'Regular patient visits',
      'Insurance coverage',
      'Cosmetic market growth',
      'Specialized services',
    ],
    icon: <Heart className="h-8 w-8" />,
  },
  {
    id: 'health-003',
    name: 'EHB Diagnostic Center',
    description: 'Advanced diagnostic and laboratory testing services',
    duration: '10-15 months setup',
    investment: 8000000,
    roi: 50,
    popularity: 92,
    category: 'Diagnostics',
    features: [
      'Blood testing',
      'Imaging services (X-ray, MRI, CT)',
      'Pathology services',
      'Cardiac diagnostics',
      'Cancer screening',
      'Genetic testing',
    ],
    requirements: [
      'Minimum 4000 sq ft space',
      'Advanced equipment',
      'Certified technicians',
      'Investment: PKR 8M - 12M',
    ],
    benefits: [
      'High-value services',
      'Insurance partnerships',
      'Referral networks',
      'Technology advantage',
      'Specialized expertise',
    ],
    icon: <Microscope className="h-8 w-8" />,
  },
  {
    id: 'health-004',
    name: 'EHB Pharmacy',
    description: 'Modern pharmacy with healthcare consultation services',
    duration: '3-6 months setup',
    investment: 2000000,
    roi: 30,
    popularity: 85,
    category: 'Pharmacy',
    features: [
      'Prescription medications',
      'Over-the-counter products',
      'Health consultations',
      'Vaccination services',
      'Health monitoring',
      'Home delivery',
    ],
    requirements: [
      'Minimum 1000 sq ft space',
      'Pharmacy license required',
      'Qualified pharmacist',
      'Investment: PKR 2M - 4M',
    ],
    benefits: [
      'Steady demand',
      'Recurring customers',
      'Insurance partnerships',
      'Low operational costs',
      'Community service',
    ],
    icon: <Pill className="h-8 w-8" />,
  },
];

export default function HealthFranchise() {
  const [selectedService, setSelectedService] = useState<HealthService | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'text-green-600';
    if (popularity >= 80) return 'text-blue-600';
    if (popularity >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getROIColor = (roi: number) => {
    if (roi >= 40) return 'text-green-600';
    if (roi >= 30) return 'text-blue-600';
    if (roi >= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="h-10 w-10 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            EHB Health & Wellness Franchises
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join the healthcare revolution with EHB Technologies. Build a successful health business
            that makes a difference in people's lives while generating sustainable profits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Explore Health Franchises
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
              <p className="text-gray-600">Health Franchises</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">95%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">40%</div>
              <p className="text-gray-600">Average ROI</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Health Franchise</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From medical clinics to pharmacies, we offer comprehensive healthcare franchise
              opportunities designed for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthServices.map(service => (
              <Card
                key={service.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedService(service)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      {service.icon}
                    </div>
                    <Badge variant="secondary">{service.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Investment:</span>
                      <span className="font-semibold">{formatCurrency(service.investment)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">ROI:</span>
                      <span className={`font-semibold ${getROIColor(service.roi)}`}>
                        {service.roi}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Popularity:</span>
                      <span className={`font-semibold ${getPopularityColor(service.popularity)}`}>
                        {service.popularity}%
                      </span>
                    </div>
                    <Progress value={service.popularity} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Health Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose EHB Health Franchises?
            </h2>
            <p className="text-lg text-gray-600">
              Discover the advantages of partnering with EHB Technologies in the healthcare sector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Business Model</h3>
              <p className="text-gray-600">
                Established healthcare business models with proven track records and high success
                rates
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growing Market</h3>
              <p className="text-gray-600">
                Healthcare industry is experiencing rapid growth with increasing demand for quality
                services
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Support</h3>
              <p className="text-gray-600">
                Comprehensive training, ongoing support, and professional guidance throughout your
                journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Health Business?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the healthcare industry and make a positive impact on people's lives with EHB
            Technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Apply for Health Franchise
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              View All Categories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
