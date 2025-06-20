'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaRobot,
  FaBrain,
  FaCode,
  FaChartLine,
  FaShieldAlt,
  FaRocket,
  FaStar,
  FaUsers,
  FaLightbulb,
  FaCog,
  FaSearch,
  FaFilter,
  FaArrowRight,
} from 'react-icons/fa';

export default function AIMarketplacePage() {
  const aiTools = [
    {
      id: 'chatbot',
      name: 'AI Chatbot',
      description: 'Intelligent conversational AI for customer support',
      category: 'Communication',
      price: 'Free',
      rating: 4.8,
      users: '2.5K',
      icon: FaRobot,
      features: ['Natural Language Processing', '24/7 Availability', 'Multi-language Support'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'analytics',
      name: 'Predictive Analytics',
      description: 'Advanced data analysis and business intelligence',
      category: 'Analytics',
      price: '$99/month',
      rating: 4.9,
      users: '1.8K',
      icon: FaChartLine,
      features: ['Machine Learning Models', 'Real-time Insights', 'Custom Dashboards'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'code-assistant',
      name: 'Code Assistant',
      description: 'AI-powered code generation and debugging',
      category: 'Development',
      price: '$49/month',
      rating: 4.7,
      users: '3.2K',
      icon: FaCode,
      features: ['Code Generation', 'Bug Detection', 'Documentation'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'security',
      name: 'AI Security',
      description: 'Intelligent threat detection and prevention',
      category: 'Security',
      price: '$199/month',
      rating: 4.9,
      users: '950',
      icon: FaShieldAlt,
      features: ['Threat Detection', 'Automated Response', 'Compliance Monitoring'],
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 'automation',
      name: 'Process Automation',
      description: 'Streamline workflows with intelligent automation',
      category: 'Automation',
      price: '$79/month',
      rating: 4.6,
      users: '1.5K',
      icon: FaCog,
      features: ['Workflow Automation', 'Task Scheduling', 'Integration APIs'],
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: 'recommendations',
      name: 'Smart Recommendations',
      description: 'Personalized recommendations engine',
      category: 'Recommendations',
      price: '$69/month',
      rating: 4.8,
      users: '2.1K',
      icon: FaLightbulb,
      features: ['Personalization', 'A/B Testing', 'Performance Analytics'],
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const categories = [
    'All',
    'Communication',
    'Analytics',
    'Development',
    'Security',
    'Automation',
    'Recommendations',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <FaBrain className="w-12 h-12" />
              <h1 className="text-5xl font-bold">AI Marketplace</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover cutting-edge AI tools and services to transform your business. From chatbots
              to predictive analytics, find the perfect AI solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                <FaSearch />
                Browse Tools
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-2">
                <FaRocket />
                Launch AI Project
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">AI Tools Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-2 rounded-full bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured AI Tools</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked AI solutions that deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${tool.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <tool.icon className="w-8 h-8" />
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-blue-100">{tool.description}</p>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">{tool.rating}</span>
                      <span className="text-gray-500">({tool.users} users)</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{tool.price}</div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <FaArrowRight className="w-3 h-3 text-blue-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Try Now
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using AI to drive growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Started Free
                </button>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                  Contact Sales
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
