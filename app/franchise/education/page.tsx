'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import {
  GraduationCap,
  BookOpen,
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
  BookMarked,
  Monitor,
  Smartphone,
  Headphones,
  Video,
  FileText,
  Presentation,
  Code,
  Palette,
  Music,
  Languages,
  Calculator,
  Atom,
  Heart,
  Car,
  Plane,
  Camera,
  Gamepad2,
  Dumbbell,
  Utensils,
  Leaf,
  Zap,
} from 'lucide-react';

interface EducationProgram {
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

const educationPrograms: EducationProgram[] = [
  {
    id: 'edu-001',
    name: 'EHB Language Academy',
    description:
      'Comprehensive language learning centers offering multiple languages with certified instructors',
    duration: '6-12 months setup',
    investment: 2500000,
    roi: 35,
    popularity: 95,
    category: 'Language Learning',
    features: [
      'Multiple language programs (English, Arabic, Chinese, French)',
      'Certified native instructors',
      'Interactive learning technology',
      'Online and offline classes',
      'Corporate training programs',
      'Exam preparation courses',
    ],
    requirements: [
      'Minimum 2000 sq ft space',
      'Educational background preferred',
      'Strong communication skills',
      'Investment: PKR 2.5M - 4M',
    ],
    benefits: [
      'High demand market',
      'Recurring revenue model',
      'Scalable business',
      'Government support',
      'International partnerships',
    ],
    icon: <Languages className="h-8 w-8" />,
  },
  {
    id: 'edu-002',
    name: 'EHB STEM Center',
    description: 'Science, Technology, Engineering, and Mathematics education for all age groups',
    duration: '8-15 months setup',
    investment: 3500000,
    roi: 40,
    popularity: 90,
    category: 'STEM Education',
    features: [
      'Robotics and coding classes',
      '3D printing and design',
      'Science experiments lab',
      'Mathematics tutoring',
      'Competition preparation',
      'Project-based learning',
    ],
    requirements: [
      'Minimum 2500 sq ft space',
      'Technical background preferred',
      'Equipment investment',
      'Investment: PKR 3.5M - 5M',
    ],
    benefits: [
      'Growing market demand',
      'High-value services',
      'Government initiatives support',
      'Corporate partnerships',
      'International recognition',
    ],
    icon: <Code className="h-8 w-8" />,
  },
  {
    id: 'edu-003',
    name: 'EHB Creative Arts Academy',
    description: 'Comprehensive arts and creative skills development center',
    duration: '4-8 months setup',
    investment: 1800000,
    roi: 30,
    popularity: 85,
    category: 'Creative Arts',
    features: [
      'Fine arts and painting',
      'Digital art and design',
      'Music and instruments',
      'Dance and performing arts',
      'Photography and videography',
      'Craft and DIY workshops',
    ],
    requirements: [
      'Minimum 1500 sq ft space',
      'Creative background preferred',
      'Equipment and materials',
      'Investment: PKR 1.8M - 3M',
    ],
    benefits: [
      'Growing creative economy',
      'Diverse revenue streams',
      'Event and exhibition opportunities',
      'Online course potential',
      'Corporate training',
    ],
    icon: <Palette className="h-8 w-8" />,
  },
  {
    id: 'edu-004',
    name: 'EHB Business School',
    description: 'Professional business education and management training',
    duration: '6-12 months setup',
    investment: 4000000,
    roi: 45,
    popularity: 88,
    category: 'Business Education',
    features: [
      'MBA preparation courses',
      'Business management training',
      'Entrepreneurship programs',
      'Professional certifications',
      'Corporate training',
      'Consulting services',
    ],
    requirements: [
      'Minimum 3000 sq ft space',
      'Business background required',
      'Professional certifications',
      'Investment: PKR 4M - 6M',
    ],
    benefits: [
      'High-value market',
      'Corporate partnerships',
      'International accreditation',
      'Recurring corporate clients',
      'Consulting opportunities',
    ],
    icon: <Building className="h-8 w-8" />,
  },
  {
    id: 'edu-005',
    name: 'EHB Early Learning Center',
    description: 'Comprehensive early childhood education and development',
    duration: '3-6 months setup',
    investment: 1500000,
    roi: 25,
    popularity: 92,
    category: 'Early Childhood',
    features: [
      'Montessori-style learning',
      'Play-based education',
      'Child development programs',
      'Parent education workshops',
      'After-school programs',
      'Summer camps',
    ],
    requirements: [
      'Minimum 2000 sq ft space',
      'Early childhood education background',
      'Safety certifications',
      'Investment: PKR 1.5M - 2.5M',
    ],
    benefits: [
      'High demand market',
      'Recurring monthly fees',
      'Multiple revenue streams',
      'Community trust building',
      'Scalable model',
    ],
    icon: <BookMarked className="h-8 w-8" />,
  },
  {
    id: 'edu-006',
    name: 'EHB Online Learning Hub',
    description: 'Digital education platform and virtual learning center',
    duration: '2-4 months setup',
    investment: 1200000,
    roi: 50,
    popularity: 98,
    category: 'Online Education',
    features: [
      'Virtual classrooms',
      'Course creation tools',
      'Assessment systems',
      'Mobile learning apps',
      'Live tutoring sessions',
      'Progress tracking',
    ],
    requirements: [
      'Technical infrastructure',
      'Digital marketing skills',
      'Content creation capability',
      'Investment: PKR 1.2M - 2M',
    ],
    benefits: [
      'Low overhead costs',
      'Global reach potential',
      'Scalable technology',
      '24/7 availability',
      'Data-driven insights',
    ],
    icon: <Monitor className="h-8 w-8" />,
  },
];

const educationStats = {
  totalCenters: 150,
  activeStudents: 25000,
  averageROI: 35,
  successRate: 92,
  marketGrowth: 15,
  averageInvestment: 2500000,
  popularLocations: ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Multan'],
  topCategories: [
    'Language Learning',
    'STEM Education',
    'Online Learning',
    'Business Education',
    'Creative Arts',
  ],
};

export default function EducationFranchise() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<EducationProgram | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredPrograms = educationPrograms.filter(
    program => selectedCategory === 'all' || program.category === selectedCategory
  );

  const categories = ['all', ...Array.from(new Set(educationPrograms.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                <GraduationCap className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Education
              <span className="text-blue-600 dark:text-blue-400"> Franchise</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform education and empower communities with our comprehensive franchise
              opportunities. Join the future of learning and build a legacy of knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
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
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {educationStats.totalCenters}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Centers</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {educationStats.activeStudents.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Students Enrolled</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {educationStats.averageROI}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average ROI</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {educationStats.successRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Education Programs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose from our diverse range of education franchise opportunities
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
                {category === 'all' ? 'All Programs' : category}
              </Button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map(program => (
              <Card
                key={program.id}
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedProgram(program)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        {program.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        <CardDescription>{program.category}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{program.popularity}% Popular</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{program.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Investment:</span>
                      <span className="font-medium">{formatCurrency(program.investment)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">ROI:</span>
                      <span className="font-medium text-green-600">{program.roi}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Setup Time:</span>
                      <span className="font-medium">{program.duration}</span>
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

      {/* Why Choose Education */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Education Franchise?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Education is the foundation of progress and our franchises offer exceptional
              opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Growing Market</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Education sector is growing at {educationStats.marketGrowth}% annually with
                  increasing demand for quality education
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
                  {educationStats.successRate}% success rate with comprehensive support and training
                  programs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">High ROI</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Average {educationStats.averageROI}% return on investment with multiple revenue
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
              Our education franchises are thriving in these cities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {educationStats.popularLocations.map(location => (
              <Card key={location} className="text-center">
                <CardContent className="p-4">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
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
            Ready to Start Your Education Journey?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join our network of successful education entrepreneurs and make a difference in your
            community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Apply for Education Franchise
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    {selectedProgram.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{selectedProgram.name}</CardTitle>
                    <CardDescription>{selectedProgram.category}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedProgram(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400">{selectedProgram.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Investment</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(selectedProgram.investment)}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">ROI</h4>
                  <p className="text-2xl font-bold text-green-600">{selectedProgram.roi}%</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Setup Time</h4>
                  <p className="text-lg">{selectedProgram.duration}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Popularity</h4>
                  <p className="text-lg">{selectedProgram.popularity}%</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="space-y-1">
                  {selectedProgram.features.map((feature, index) => (
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
                  {selectedProgram.requirements.map((req, index) => (
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
                  {selectedProgram.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1">
                  Apply for This Program
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => setSelectedProgram(null)}>
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
