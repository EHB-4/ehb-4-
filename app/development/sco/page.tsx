'use client';

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaRocket,
  FaCrown,
  FaStar,
  FaChartLine,
  FaUsers,
  FaTools,
  FaHeadset,
} from 'react-icons/fa';

interface SCOOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  sla: {
    responseTime: string;
    resolutionTime: string;
    uptime: string;
    support: string;
  };
  progress: number;
  color: string;
  icon: any;
  popular?: boolean;
}

export default function SCOPage() {
  const [selectedSCO, setSelectedSCO] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const scoOptions: SCOOption[] = [
    {
      id: 'basic',
      name: 'Basic SCO',
      description: 'Essential development services with standard support',
      price: 5000,
      duration: '2-4 weeks',
      features: [
        'Basic project planning',
        'Standard development',
        'Email support',
        'Basic testing',
        'Documentation',
        '1 revision cycle',
      ],
      sla: {
        responseTime: '24 hours',
        resolutionTime: '3-5 business days',
        uptime: '99.5%',
        support: 'Email only',
      },
      progress: 75,
      color: 'blue',
      icon: FaTools,
    },
    {
      id: 'professional',
      name: 'Professional SCO',
      description: 'Advanced development with priority support and faster delivery',
      price: 15000,
      duration: '3-6 weeks',
      features: [
        'Advanced project planning',
        'Priority development',
        'Phone & email support',
        'Comprehensive testing',
        'Detailed documentation',
        '3 revision cycles',
        'Performance optimization',
        'Security audit',
      ],
      sla: {
        responseTime: '8 hours',
        resolutionTime: '1-2 business days',
        uptime: '99.8%',
        support: 'Phone & Email',
      },
      progress: 85,
      color: 'green',
      icon: FaRocket,
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise SCO',
      description: 'Premium development with dedicated team and 24/7 support',
      price: 50000,
      duration: '6-12 weeks',
      features: [
        'Dedicated project manager',
        'Custom development',
        '24/7 priority support',
        'Advanced testing suite',
        'Comprehensive documentation',
        'Unlimited revisions',
        'Performance optimization',
        'Security audit',
        'Deployment support',
        'Training & handover',
        '3 months maintenance',
        'Analytics dashboard',
      ],
      sla: {
        responseTime: '2 hours',
        resolutionTime: 'Same day',
        uptime: '99.9%',
        support: '24/7 Dedicated',
      },
      progress: 95,
      color: 'purple',
      icon: FaCrown,
    },
  ];

  const stats = [
    { label: 'Projects Delivered', value: '150+', icon: FaCheckCircle },
    { label: 'Client Satisfaction', value: '98%', icon: FaStar },
    { label: 'Average Delivery Time', value: '4.2 weeks', icon: FaClock },
    { label: 'Support Response', value: '< 8 hours', icon: FaHeadset },
  ];

  const handleSCOSelect = (scoId: string) => {
    setSelectedSCO(scoId);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <FaShieldAlt className="w-12 h-12" />
              <h1 className="text-5xl font-bold">Service Level Agreements (SCO)</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Choose the perfect service level for your project. Our SCO options ensure quality,
              reliability, and peace of mind throughout your development journey.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* SCO Options */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your SCO Level</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the service level that best matches your project requirements and timeline
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scoOptions.map((sco, index) => (
              <motion.div
                key={sco.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                  selectedSCO === sco.id ? 'ring-2 ring-blue-500' : ''
                } ${sco.popular ? 'border-2 border-blue-500' : ''}`}
              >
                {sco.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`bg-${sco.color}-100 p-3 rounded-lg`}>
                        <sco.icon className={`w-8 h-8 text-${sco.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{sco.name}</h3>
                        <p className="text-gray-600">{sco.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      ${sco.price.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Duration: {sco.duration}</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>Project Progress</span>
                      <span>{sco.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${getProgressColor(sco.progress)} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${sco.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* SLA Information */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Service Level Agreement</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time:</span>
                        <span className="font-medium">{sco.sla.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Resolution Time:</span>
                        <span className="font-medium">{sco.sla.resolutionTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uptime Guarantee:</span>
                        <span className="font-medium">{sco.sla.uptime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Support Level:</span>
                        <span className="font-medium">{sco.sla.support}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Included Features</h4>
                    <ul className="space-y-2">
                      {sco.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <FaCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleSCOSelect(sco.id)}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                        selectedSCO === sco.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedSCO === sco.id ? 'Selected' : 'Select This SCO'}
                    </button>

                    <button
                      onClick={() => setShowDetails(showDetails === sco.id ? null : sco.id)}
                      className="w-full py-2 px-4 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {showDetails === sco.id ? 'Hide Details' : 'View Full Details'}
                    </button>
                  </div>
                </div>

                {/* Detailed View */}
                {showDetails === sco.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 p-6 bg-gray-50"
                  >
                    <h4 className="font-semibold text-gray-900 mb-4">Detailed SCO Breakdown</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Development Process</h5>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Planning Phase:</span>
                            <span>15% of timeline</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Development Phase:</span>
                            <span>60% of timeline</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Testing Phase:</span>
                            <span>20% of timeline</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Deployment:</span>
                            <span>5% of timeline</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Quality Metrics</h5>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Code Coverage:</span>
                            <span>{sco.progress + 5}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Performance Score:</span>
                            <span>{sco.progress + 10}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Security Rating:</span>
                            <span>A+</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Accessibility:</span>
                            <span>WCAG 2.1 AA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Choose your SCO level and let's build something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => selectedSCO && console.log(`Selected SCO: ${selectedSCO}`)}
                disabled={!selectedSCO}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedSCO ? 'Proceed with Selected SCO' : 'Select an SCO Level'}
              </button>
              <a
                href="/development/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Sales Team
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
