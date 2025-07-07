'use client';

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaEye,
  FaCode,
  FaMobile,
  FaCloud,
  FaShieldAlt,
} from 'react-icons/fa';

export default function DevelopmentPortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'EHB Dashboard',
      category: 'web-development',
      description:
        'Comprehensive analytics and management dashboard with real-time data visualization.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
      status: 'completed',
      link: '/ehb-dashboard',
      github: '#',
      features: [
        'Real-time Analytics',
        'User Management',
        'Data Visualization',
        'Responsive Design',
      ],
    },
    {
      id: 2,
      title: 'GoSellr E-commerce',
      category: 'web-development',
      description:
        'Full-featured e-commerce platform with payment integration and inventory management.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'completed',
      link: '/gosellr',
      github: '#',
      features: ['Payment Processing', 'Inventory Management', 'Order Tracking', 'Admin Panel'],
    },
    {
      id: 3,
      title: 'EMO Health Platform',
      category: 'web-development',
      description: 'Healthcare management system with appointment booking and medical records.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'PostgreSQL', 'Redis', 'WebRTC'],
      status: 'completed',
      link: '/emo',
      github: '#',
      features: ['Appointment Booking', 'Medical Records', 'Telemedicine', 'Prescription System'],
    },
    {
      id: 4,
      title: 'PSS Security System',
      category: 'security-audit',
      description: 'Public safety system with emergency response and incident tracking.',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Google Maps', 'Push Notifications'],
      status: 'completed',
      link: '/pss',
      github: '#',
      features: ['Emergency Response', 'Incident Tracking', 'Real-time Alerts', 'GPS Integration'],
    },
    {
      id: 5,
      title: 'AI Marketplace',
      category: 'ai-integration',
      description: 'AI-powered marketplace for services and automation tools.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'OpenAI API', 'MongoDB', 'WebSocket'],
      status: 'in-progress',
      link: '/ai-marketplace',
      github: '#',
      features: ['AI Agents', 'Service Discovery', 'Task Automation', 'Performance Metrics'],
    },
    {
      id: 6,
      title: 'EHB Wallet',
      category: 'web-development',
      description: 'Cryptocurrency wallet with blockchain integration and secure transactions.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Ethers.js', 'Web3', 'MetaMask'],
      status: 'completed',
      link: '/wallet',
      github: '#',
      features: [
        'Multi-chain Support',
        'Secure Transactions',
        'Portfolio Tracking',
        'DeFi Integration',
      ],
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'mobile-app', label: 'Mobile Apps' },
    { id: 'ai-integration', label: 'AI Integration' },
    { id: 'security-audit', label: 'Security' },
  ];

  const filteredProjects = projects.filter(
    project => activeFilter === 'all' || project.category === activeFilter
  );

  const stats = [
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '25+' },
    { label: 'Success Rate', value: '98%' },
    { label: 'Technologies Used', value: '20+' },
  ];

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
            <h1 className="text-5xl font-bold mb-4">Our Portfolio</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our successful projects and see how we've helped businesses achieve their
              goals.
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
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <FaCode className="w-16 h-16 text-white opacity-20" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.features.slice(0, 3).map(feature => (
                        <li key={feature} className="flex items-center">
                          <FaEye className="w-3 h-3 text-blue-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={project.link}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <FaExternalLinkAlt className="w-4 h-4 inline mr-1" />
                      View Project
                    </a>
                    <a
                      href={project.github}
                      className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              Let's discuss how we can help bring your vision to life
            </p>
            <a
              href="/development/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
            >
              Get Started Today
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
