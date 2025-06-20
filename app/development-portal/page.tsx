'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaCode,
  FaRocket,
  FaUsers,
  FaChartLine,
  FaTools,
  FaBook,
  FaLaptopCode,
  FaDatabase,
  FaCloud,
  FaMobile,
  FaShieldAlt,
  FaLightbulb,
  FaHome,
  FaTachometerAlt,
  FaRoute,
} from 'react-icons/fa';

export default function DevelopmentPortalPage() {
  const services = [
    {
      icon: FaHome,
      title: 'EHB Home Page',
      description: 'The main landing page with a Microsoft Store-like design.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      href: '/ehb-home-page',
    },
    {
      icon: FaTachometerAlt,
      title: 'EHB Dashboard',
      description: 'The central dashboard for analytics and management.',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      href: '/ehb-dashboard',
    },
    {
      icon: FaLaptopCode,
      title: 'Web Development',
      description: 'Modern web applications with React, Next.js, and TypeScript.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      href: '/development/web',
    },
    {
      icon: FaRoute,
      title: 'Project Roadmap',
      description: 'Track the progress of ongoing and future projects.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      href: '/roadmap',
      progress: 75,
    },
    {
      icon: FaMobile,
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps with React Native.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      href: '/development/mobile',
    },
    {
      icon: FaDatabase,
      title: 'Database Design',
      description: 'MongoDB, PostgreSQL, and cloud database solutions.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      href: '/development/database',
    },
    {
      icon: FaCloud,
      title: 'Cloud Services',
      description: 'AWS, Azure, and Google Cloud deployment.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      href: '/development/cloud',
    },
    {
      icon: FaShieldAlt,
      title: 'Security & Testing',
      description: 'Security audits, penetration testing, and QA.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      href: '/development/security',
    },
    {
      icon: FaLightbulb,
      title: 'AI & ML Integration',
      description: 'Machine learning and AI-powered solutions.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      href: '/development/ai',
    },
  ];

  const stats = [
    { label: 'Projects Completed', value: '150+', icon: FaRocket },
    { label: 'Happy Clients', value: '50+', icon: FaUsers },
    { label: 'Success Rate', value: '98%', icon: FaChartLine },
    { label: 'Team Members', value: '25+', icon: FaCode },
  ];

  const features = [
    {
      title: 'Modern Tech Stack',
      description: 'Latest technologies and frameworks for optimal performance',
      icon: FaTools,
    },
    {
      title: 'Scalable Architecture',
      description: 'Design systems that grow with your business needs',
      icon: FaRocket,
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock technical support and maintenance',
      icon: FaUsers,
    },
    {
      title: 'Documentation',
      description: 'Comprehensive documentation and training materials',
      icon: FaBook,
    },
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
            <div className="flex items-center justify-center space-x-3 mb-6">
              <FaCode className="w-12 h-12" />
              <h1 className="text-5xl font-bold">EHB Development Portal</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Your gateway to world-class software development services. From concept to deployment,
              we build solutions that drive success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/development/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Your Project
              </Link>
              <Link
                href="/development/portfolio"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Portfolio
              </Link>
            </div>
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
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
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

      {/* Services Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive development solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group"
              >
                <Link href={service.href}>
                  <div
                    className={`${service.bgColor} p-6 rounded-xl hover:shadow-xl transition-all duration-300 group-hover:scale-105 h-full flex flex-col`}
                  >
                    <div className={`${service.color} mb-4`}>
                      <service.icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 flex-grow">{service.description}</p>
                    {service.progress !== undefined && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                          <span>Progress</span>
                          <span>{service.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${service.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EHB Development?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver excellence through innovation, expertise, and dedication
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss your project and turn your vision into reality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/development/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started Today
              </Link>
              <Link
                href="/development/consultation"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 EHB Development Portal. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Building the future, one project at a time</p>
        </div>
      </div>
    </div>
  );
}
