'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaShoppingCart,
  FaStethoscope,
  FaWallet,
  FaRobot,
  FaUsers,
  FaHandshake,
  FaCheckCircle,
} from 'react-icons/fa';

export function ServicesGrid() {
  const services = [
    {
      id: 'gosellr',
      title: 'GoSellr Marketplace',
      description: 'Complete e-commerce solution with AI-powered recommendations',
      icon: FaShoppingCart,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      link: '/gosellr',
      features: ['AI Recommendations', 'Multi-vendor Support', 'Secure Payments'],
    },
    {
      id: 'edr',
      title: 'EDR Health Directory',
      description: 'Comprehensive healthcare provider directory and booking system',
      icon: FaStethoscope,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      link: '/edr',
      features: ['Provider Search', 'Online Booking', 'Health Records'],
    },
    {
      id: 'wallet',
      title: 'EHB Digital Wallet',
      description: 'Secure digital wallet with cryptocurrency support',
      icon: FaWallet,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      link: '/wallet',
      features: ['Multi-currency', 'Crypto Support', 'Instant Transfers'],
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      description: 'Intelligent AI assistant for business and personal use',
      icon: FaRobot,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      link: '/ai',
      features: ['Natural Language', '24/7 Support', 'Smart Automation'],
    },
    {
      id: 'jps',
      title: 'Job Portal (JPS)',
      description: 'Advanced job portal with AI matching and career guidance',
      icon: FaUsers,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50',
      link: '/jps',
      features: ['AI Matching', 'Career Guidance', 'Skill Assessment'],
    },
    {
      id: 'franchise',
      title: 'Franchise Management',
      description: 'Complete franchise management and expansion platform',
      icon: FaHandshake,
      color: 'from-teal-500 to-green-500',
      bgColor: 'bg-gradient-to-br from-teal-50 to-green-50',
      link: '/franchise',
      features: ['Franchise Setup', 'Management Tools', 'Growth Analytics'],
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Digital Ecosystem
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A suite of integrated platforms designed to empower your digital life and business
            operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={service.link}>
                <div
                  className={`${service.bgColor} dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col`}
                >
                  <div className="p-8 flex-grow">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl mb-6 bg-gradient-to-br ${service.color}`}
                    >
                      <service.icon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                  </div>
                  <div className="p-8 bg-black/5 dark:bg-black/20">
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                          <FaCheckCircle className="text-green-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
