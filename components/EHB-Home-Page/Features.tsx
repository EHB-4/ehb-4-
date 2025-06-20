'use client';

import { motion } from 'framer-motion';
import {
  FaBolt,
  FaCloud,
  FaCode,
  FaCompass,
  FaDatabase,
  FaEye,
  FaGift,
  FaInfinity,
  FaLock,
  FaRobot,
  FaShieldAlt,
  FaTrophy,
} from 'react-icons/fa';

export function Features() {
  const features = [
    {
      icon: FaBolt,
      title: 'Ultra-Fast Performance',
      description: 'Optimized for speed with Next.js and Vercel edge network.',
    },
    {
      icon: FaShieldAlt,
      title: 'Enterprise-Grade Security',
      description: 'Robust security features to protect your data and users.',
    },
    {
      icon: FaInfinity,
      title: 'Infinite Scalability',
      description: 'Cloud-native architecture that scales with your business.',
    },
    {
      icon: FaRobot,
      title: 'AI-Powered Core',
      description: 'Intelligent automation and insights integrated at every level.',
    },
    {
      icon: FaCode,
      title: 'Developer-Friendly API',
      description: 'Well-documented and easy-to-use API for custom integrations.',
    },
    {
      icon: FaDatabase,
      title: 'Multi-Database Support',
      description: 'Works seamlessly with PostgreSQL, MongoDB, and more.',
    },
    {
      icon: FaCompass,
      title: 'Guided E-commerce (GoSellr)',
      description: 'AI-driven e-commerce platform for seamless online selling.',
    },
    {
      icon: FaTrophy,
      title: 'Rewards & Affiliate Program',
      description: 'In-built rewards and affiliate system to drive growth.',
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
            Platform Core Features
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built on a foundation of cutting-edge technology to deliver unparalleled performance and
            reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
