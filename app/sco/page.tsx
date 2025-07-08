'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Shield, Zap, Star, TrendingUp, Users, Target } from 'lucide-react';

interface ServiceTier {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  sla: {
    responseTime: string;
    resolutionTime: string;
    uptime: string;
    support: string;
  };
  color: string;
  popular?: boolean;
}

interface ProgressData {
  uptime: number;
  responseTime: number;
  resolutionTime: number;
  customerSatisfaction: number;
}

const ServiceTiers: ServiceTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Essential services for small projects',
    price: '$99/month',
    color: 'bg-blue-500',
    features: [
      'Basic support (8/5)',
      'Email support',
      'Standard response time',
      'Basic monitoring',
      'Community forum access',
    ],
    sla: {
      responseTime: '24 hours',
      resolutionTime: '72 hours',
      uptime: '99.5%',
      support: 'Email only',
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Advanced features for growing businesses',
    price: '$299/month',
    color: 'bg-purple-500',
    popular: true,
    features: [
      'Priority support (12/7)',
      'Phone & email support',
      'Fast response time',
      'Advanced monitoring',
      'Dedicated account manager',
      'Custom integrations',
    ],
    sla: {
      responseTime: '4 hours',
      resolutionTime: '24 hours',
      uptime: '99.9%',
      support: 'Phone & Email',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Premium services for large organizations',
    price: '$999/month',
    color: 'bg-green-500',
    features: [
      '24/7 dedicated support',
      'Phone, email & chat support',
      'Instant response time',
      'Real-time monitoring',
      'Dedicated team',
      'Custom development',
      'SLA guarantees',
      'On-site support',
    ],
    sla: {
      responseTime: '1 hour',
      resolutionTime: '8 hours',
      uptime: '99.99%',
      support: '24/7 Dedicated',
    },
  },
];

const ProgressBar: React.FC<{
  value: number;
  label: string;
  color: string;
  icon: React.ReactNode;
}> = ({ value, label, color, icon }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <span className="text-sm font-bold text-gray-900">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className={`h-3 rounded-full transition-all duration-1000 ease-out ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const SLACard: React.FC<{ sla: ServiceTier['sla']; tier: string }> = ({ sla, tier }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{tier} SLA Details</h3>
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Response Time</span>
        <span className="text-sm font-medium text-gray-900">{sla.responseTime}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Resolution Time</span>
        <span className="text-sm font-medium text-gray-900">{sla.resolutionTime}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Uptime Guarantee</span>
        <span className="text-sm font-medium text-gray-900">{sla.uptime}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Support Level</span>
        <span className="text-sm font-medium text-gray-900">{sla.support}</span>
      </div>
    </div>
  </div>
);

export default function SCOPage() {
  const [selectedTier, setSelectedTier] = useState<string>('professional');
  const [progressData, setProgressData] = useState<ProgressData>({
    uptime: 99.8,
    responseTime: 85,
    resolutionTime: 92,
    customerSatisfaction: 96,
  });

  useEffect(() => {
    // Simulate real-time progress updates
    const interval = setInterval(() => {
      setProgressData(prev => ({
        uptime: Math.max(99.5, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.1)),
        responseTime: Math.max(80, Math.min(95, prev.responseTime + (Math.random() - 0.5) * 2)),
        resolutionTime: Math.max(85, Math.min(98, prev.resolutionTime + (Math.random() - 0.5) * 2)),
        customerSatisfaction: Math.max(
          90,
          Math.min(99, prev.customerSatisfaction + (Math.random() - 0.5) * 1)
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const selectedService = ServiceTiers.find(tier => tier.id === selectedTier);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Service Level Agreements (SLA)
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect service tier for your business needs with guaranteed performance
              metrics and support levels
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Service Tiers */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Tiers</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {ServiceTiers.map(tier => (
                  <div
                    key={tier.id}
                    className={`relative bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                      selectedTier === tier.id
                        ? 'border-blue-500 shadow-blue-100'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div
                        className={`w-16 h-16 ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <Star className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                      <div className="text-3xl font-bold text-gray-900">{tier.price}</div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        selectedTier === tier.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedTier === tier.id ? 'Selected' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Real-Time Performance Metrics
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <ProgressBar
                    value={progressData.uptime}
                    label="System Uptime"
                    color="bg-green-500"
                    icon={<Shield className="w-5 h-5 text-green-500" />}
                  />
                  <ProgressBar
                    value={progressData.responseTime}
                    label="Response Time Compliance"
                    color="bg-blue-500"
                    icon={<Zap className="w-5 h-5 text-blue-500" />}
                  />
                </div>
                <div>
                  <ProgressBar
                    value={progressData.resolutionTime}
                    label="Resolution Time Compliance"
                    color="bg-purple-500"
                    icon={<Clock className="w-5 h-5 text-purple-500" />}
                  />
                  <ProgressBar
                    value={progressData.customerSatisfaction}
                    label="Customer Satisfaction"
                    color="bg-yellow-500"
                    icon={<Star className="w-5 h-5 text-yellow-500" />}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected SLA Details */}
            {selectedService && <SLACard sla={selectedService.sla} tier={selectedService.name} />}

            {/* SLA Benefits */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SLA Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-700">Guaranteed performance metrics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Dedicated support team</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-700">Continuous improvement</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-700">Risk mitigation</span>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Need Custom SLA?</h3>
              <p className="text-sm mb-4 opacity-90">
                Contact our team to discuss custom service level agreements tailored to your
                specific requirements.
              </p>
              <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
