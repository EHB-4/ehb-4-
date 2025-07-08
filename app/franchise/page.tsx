'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Building,
  Users,
  DollarSign,
  MapPin,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Star,
  Award,
  Shield,
  Crown,
  Target,
  BarChart3,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
  Eye,
  Edit,
  Download,
} from 'lucide-react';

interface FranchiseCategory {
  id: string;
  name: string;
  description: string;
  investment: string;
  roi: string;
  popularity: number;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

interface QuickStat {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const franchiseCategories: FranchiseCategory[] = [
  {
    id: 'health',
    name: 'Health & Wellness',
    description:
      'Comprehensive healthcare and wellness services including clinics, pharmacies, and fitness centers.',
    investment: 'PKR 2M - 8M',
    roi: '15-25%',
    popularity: 95,
    icon: <Star className="h-6 w-6" />,
    color: 'bg-green-100 text-green-800',
    features: ['Medical Clinics', 'Pharmacies', 'Fitness Centers', 'Wellness Programs'],
  },
  {
    id: 'education',
    name: 'Education & Training',
    description: 'Educational institutions, training centers, and skill development programs.',
    investment: 'PKR 1M - 5M',
    roi: '12-20%',
    popularity: 88,
    icon: <Award className="h-6 w-6" />,
    color: 'bg-blue-100 text-blue-800',
    features: ['Schools', 'Training Centers', 'Skill Development', 'Online Education'],
  },
  {
    id: 'technology',
    name: 'Technology & IT',
    description: 'IT services, software development, and technology solutions.',
    investment: 'PKR 3M - 10M',
    roi: '18-30%',
    popularity: 92,
    icon: <Shield className="h-6 w-6" />,
    color: 'bg-purple-100 text-purple-800',
    features: ['Software Development', 'IT Services', 'Digital Solutions', 'Tech Support'],
  },
  {
    id: 'legal',
    name: 'Legal Services',
    description: 'Legal consultation, document services, and compliance solutions.',
    investment: 'PKR 2M - 6M',
    roi: '10-18%',
    popularity: 75,
    icon: <Crown className="h-6 w-6" />,
    color: 'bg-yellow-100 text-yellow-800',
    features: ['Legal Consultation', 'Document Services', 'Compliance', 'Notary Services'],
  },
  {
    id: 'travel',
    name: 'Travel & Tourism',
    description: 'Travel agencies, tour packages, and tourism services.',
    investment: 'PKR 2M - 10M',
    roi: '8-15%',
    popularity: 70,
    icon: <MapPin className="h-6 w-6" />,
    color: 'bg-red-100 text-red-800',
    features: ['Travel Agencies', 'Tour Packages', 'Hotel Booking', 'Tourism Services'],
  },
  {
    id: 'books',
    name: 'Books & Publishing',
    description: 'Bookstores, publishing services, and educational materials.',
    investment: 'PKR 1M - 4M',
    roi: '10-16%',
    popularity: 65,
    icon: <FileText className="h-6 w-6" />,
    color: 'bg-indigo-100 text-indigo-800',
    features: ['Bookstores', 'Publishing', 'Educational Materials', 'Digital Books'],
  },
];

const quickStats: QuickStat[] = [
  {
    title: 'Total Franchises',
    value: '156',
    change: '+12%',
    icon: <Building className="h-4 w-4" />,
    color: 'text-blue-600',
  },
  {
    title: 'Active Franchises',
    value: '142',
    change: '+8%',
    icon: <CheckCircle className="h-4 w-4" />,
    color: 'text-green-600',
  },
  {
    title: 'Total Revenue',
    value: 'PKR 48M',
    change: '+15%',
    icon: <DollarSign className="h-4 w-4" />,
    color: 'text-purple-600',
  },
  {
    title: 'Pending Applications',
    value: '23',
    change: '-5%',
    icon: <Clock className="h-4 w-4" />,
    color: 'text-yellow-600',
  },
];

const quickActions = [
  {
    title: 'Apply for Franchise',
    description: 'Start your franchise journey',
    icon: <Plus className="h-5 w-5" />,
    href: '/franchise/apply',
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    title: 'View Dashboard',
    description: 'Monitor your franchise performance',
    icon: <BarChart3 className="h-5 w-5" />,
    href: '/franchise/dashboard',
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    title: 'Check Status',
    description: 'Track your application status',
    icon: <Eye className="h-5 w-5" />,
    href: '/franchise/status',
    color: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    title: 'View Reports',
    description: 'Analytics and insights',
    icon: <FileText className="h-5 w-5" />,
    href: '/franchise/reports',
    color: 'bg-orange-500 hover:bg-orange-600',
  },
];

export default function FranchiseOverview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">EHB Franchise Network</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Join Pakistan's fastest-growing franchise network with proven business models
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/franchise/apply">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/franchise/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Franchise Categories */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Franchise Categories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our diverse range of proven franchise models across multiple industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {franchiseCategories.map(category => (
              <Card
                key={category.id}
                className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}
                    >
                      {category.icon}
                    </div>
                    <Badge className={category.color}>{category.popularity}% Popular</Badge>
                  </div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Investment</p>
                      <p className="font-semibold">{category.investment}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">ROI</p>
                      <p className="font-semibold text-green-600">{category.roi}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/franchise/${category.id}`} className="flex-1">
                      <Button className="w-full" variant="outline">
                        Learn More
                      </Button>
                    </Link>
                    <Link href="/franchise/apply" className="flex-1">
                      <Button className="w-full">Apply Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose EHB */}
        <div className="bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EHB Franchise?</h2>
            <p className="text-lg text-gray-600">
              Join thousands of successful entrepreneurs who have built their businesses with EHB
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Proven Business Models</h3>
              <p className="text-gray-600">
                Tested and successful franchise models with high success rates
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Strong ROI</h3>
              <p className="text-gray-600">Average ROI of 15-25% across all franchise categories</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Support</h3>
              <p className="text-gray-600">
                Training, marketing, and operational support from day one
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Network Benefits</h3>
              <p className="text-gray-600">
                Access to a network of 150+ successful franchise owners
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Franchise Journey?</h2>
          <p className="text-xl mb-6 text-green-100">
            Join the EHB family and build your successful business today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/franchise/apply">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Apply for Franchise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/franchise/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                View Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
