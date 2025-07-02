import React from 'react';
import Link from 'next/link';
import {
  HeartIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const HealthFranchisePage = () => {
  const healthServices = [
    {
      name: 'Primary Care Clinics',
      description: 'Comprehensive primary healthcare services',
      investment: '$200K - $500K',
      roi: '18-25%',
      popularity: 95,
    },
    {
      name: 'Dental Clinics',
      description: 'Complete dental care and orthodontics',
      investment: '$300K - $800K',
      roi: '20-30%',
      popularity: 92,
    },
    {
      name: 'Fitness Centers',
      description: 'Modern fitness facilities and training',
      investment: '$150K - $400K',
      roi: '15-22%',
      popularity: 88,
    },
    {
      name: 'Wellness Centers',
      description: 'Holistic health and wellness services',
      investment: '$100K - $300K',
      roi: '12-20%',
      popularity: 85,
    },
    {
      name: 'Pharmacy Services',
      description: 'Retail pharmacy and consultation',
      investment: '$250K - $600K',
      roi: '16-24%',
      popularity: 90,
    },
    {
      name: 'Mental Health Clinics',
      description: 'Psychological and psychiatric services',
      investment: '$180K - $450K',
      roi: '14-22%',
      popularity: 87,
    },
  ];

  const requirements = [
    'Medical license or healthcare background preferred',
    'Minimum investment of $100K',
    'Commitment to quality healthcare standards',
    'Business management experience',
    'Strong communication skills',
    'Passion for helping others',
  ];

  const support = [
    'Comprehensive medical training',
    'Marketing and branding support',
    'Technology and software systems',
    'Regulatory compliance assistance',
    'Ongoing operational support',
    'Network of healthcare professionals',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <HeartIcon className="h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Health & Wellness Franchise
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join the healthcare revolution with EHB's proven health and wellness franchise
              opportunities. Make a difference while building a profitable business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/franchise/apply?category=health"
                className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Apply for Health Franchise
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/franchise"
                className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                View All Categories
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">$2.5B</div>
              <div className="text-red-100">Industry Size</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-red-100">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-red-100">Active Franchises</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">25%</div>
              <div className="text-red-100">Average ROI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Health & Wellness Services</h2>
          <p className="text-lg text-gray-600">
            Choose from our range of healthcare franchise opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <HeartIcon className="h-8 w-8 text-red-500" />
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-600">
                    {service.popularity}%
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Investment:</span>
                  <span className="font-medium text-green-600">{service.investment}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">ROI:</span>
                  <span className="font-medium text-blue-600">{service.roi}</span>
                </div>
              </div>

              <Link
                href={`/franchise/apply?category=health&service=${service.name}`}
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Apply Now
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements & Support */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h3>
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">EHB Support</h3>
              <div className="space-y-4">
                {support.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Levels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Investment Options</h2>
          <p className="text-lg text-gray-600">Choose the investment level that fits your goals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Starter</h3>
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-green-600">$100K - $250K</div>
              <div className="text-gray-600">Initial Investment</div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                Single location
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                Basic training
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                Local marketing
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg ring-2 ring-red-500 p-6 scale-105">
            <div className="text-center mb-2">
              <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Professional</h3>
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-red-600">$250K - $500K</div>
              <div className="text-gray-600">Initial Investment</div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                Multiple locations
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                Advanced training
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                Regional marketing
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Enterprise</h3>
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-blue-600">$500K - $1M</div>
              <div className="text-gray-600">Initial Investment</div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                Territory rights
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                Executive training
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                National marketing
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference in Healthcare?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join our network of successful health and wellness franchise owners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/franchise/apply?category=health"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Apply Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/franchise/status"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              Check Application Status
              <ClockIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthFranchisePage;


import {
  Building,
  MapPin,
  Users,
  ChartBar,
  Settings,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Globe,
} from 'lucide-react';

import {
  BuildingOffice2Icon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const FranchisePage = () => {

const franchiseCategories = [
    {
      id: 'health',
      name: 'Health & Wellness',
      description: 'Healthcare, fitness, and wellness franchises',
      icon: '🏥',
      investment: '$50K - $500K',
      roi: '15-25%',
      popularity: 95,
      link: '/franchise/health',
    },
    {
      id: 'education',
      name: 'Education & Training',
      description: 'Schools, training centers, and educational services',
      icon: '🎓',
      investment: '$30K - $300K',
      roi: '12-20%',
      popularity: 88,
      link: '/franchise/education',
    },
    {
      id: 'law',
      name: 'Legal Services',
      description: 'Legal consultation and document services',
      icon: '⚖️',
      investment: '$100K - $1M',
      roi: '20-35%',
      popularity: 92,
      link: '/franchise/law',
    },
    {
      id: 'travel',
      name: 'Travel & Tourism',
      description: 'Travel agencies and tourism services',
      icon: '✈️',
      investment: '$25K - $200K',
      roi: '10-18%',
      popularity: 85,
      link: '/franchise/travel',
    },
    {
      id: 'books',
      name: 'Books & Publishing',
      description: 'Bookstores and publishing services',
      icon: '📚',
      investment: '$40K - $400K',
      roi: '12-22%',
      popularity: 78,
      link: '/franchise/books',
    },
  ];

const franchiseLevels = [
    {
      level: 'Corporate',
      investment: '$1M - $5M',
      territory: 'National/International',
      support: 'Full Support',
      training: 'Comprehensive',
      marketing: 'National Campaigns',
      roi: '25-40%',
    },
    {
      level: 'Master',
      investment: '$500K - $1M',
      territory: 'Regional',
      support: 'High Support',
      training: 'Advanced',
      marketing: 'Regional Campaigns',
      roi: '20-30%',
    },
    {
      level: 'Sub',
      investment: '$50K - $500K',
      territory: 'Local',
      support: 'Standard Support',
      training: 'Basic',
      marketing: 'Local Support',
      roi: '15-25%',
    },
  ];

const benefits = [
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-green-600" />,
      title: 'Proven Business Model',
      description: 'Tested and successful franchise models with proven track records',
    },
    {
      icon: <UserGroupIcon className="h-8 w-8 text-blue-600" />,
      title: 'Comprehensive Support',
      description: 'Training, marketing, and operational support from day one',
    },
    {
      icon: <GlobeAltIcon className="h-8 w-8 text-purple-600" />,
      title: 'Global Network',
      description: "Access to EHB's global network of partners and resources",
    },
    {
      icon: <ChartBarIcon className="h-8 w-8 text-orange-600" />,
      title: 'High ROI Potential',
      description: 'Strong return on investment with proper management',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              EHB Franchise Opportunities
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join the EHB family and build your own successful business with our proven franchise
              models. Choose from multiple industries and investment levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/franchise/apply"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/franchise/status"
                className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Check Status
                <ClockIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Franchise Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Franchise Categories</h2>
          <p className="text-lg text-gray-600">
            Explore our diverse range of franchise opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {franchiseCategories.map(category => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{category.icon}</span>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-600">
                    {category.popularity}%
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Investment:</span>
                  <span className="font-medium text-green-600">{category.investment}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">ROI:</span>
                  <span className="font-medium text-blue-600">{category.roi}</span>
                </div>
              </div>

              <Link
                href={category.link}
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Franchise Levels */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Franchise Investment Levels</h2>
            <p className="text-lg text-gray-600">
              Choose the investment level that fits your goals and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {franchiseLevels.map((level, index) => (
              <div
                key={level.level}
                className={`bg-white rounded-xl shadow-lg p-6 ${
                  index === 1 ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.level}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{level.investment}</div>
                  {index === 1 && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Territory</span>
                    <p className="text-gray-900">{level.territory}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Support</span>
                    <p className="text-gray-900">{level.support}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Training</span>
                    <p className="text-gray-900">{level.training}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Marketing</span>
                    <p className="text-gray-900">{level.marketing}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Expected ROI</span>
                    <p className="text-green-600 font-semibold">{level.roi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EHB Franchise?</h2>
          <p className="text-lg text-gray-600">
            Discover the advantages of joining the EHB franchise family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">{benefit.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Franchise Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful EHB franchise owners worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/franchise/apply"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Apply Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/franchise/dashboard"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Dashboard
              <ChartBarIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchisePage;