'use client';

import { motion } from 'framer-motion';
import { FaRobot, FaGraduationCap, FaHeartbeat, FaShoppingCart, FaGlobe } from 'react-icons/fa';

import AIChat from '@/components/ai/AIChat';

export default function AIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <FaRobot className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">EHB AI Assistant</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your intelligent assistant for education, health, and shopping services across Pakistan.
            I can help you find tutors, doctors, products, and much more!
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <FaGraduationCap className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Education</h3>
            </div>
            <p className="text-sm text-gray-600">Find qualified tutors and educational services</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <FaHeartbeat className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">Healthcare</h3>
            </div>
            <p className="text-sm text-gray-600">Connect with doctors and healthcare providers</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <FaShoppingCart className="w-6 h-6 text-orange-600" />
              <h3 className="font-semibold text-gray-900">Shopping</h3>
            </div>
            <p className="text-sm text-gray-600">Discover products and local shops</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <FaGlobe className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Multi-Language</h3>
            </div>
            <p className="text-sm text-gray-600">Supports English, Urdu, and Roman Urdu</p>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h2 className="text-xl font-semibold text-white">Chat with AI Assistant</h2>
            <p className="text-blue-100 mt-1">Ask me anything about services in Pakistan</p>
          </div>
          <div className="h-96">
            <AIChat />
          </div>
        </motion.div>

        {/* Example Queries */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Try asking:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="text-sm text-gray-600">"Find me a math tutor in Karachi"</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="text-sm text-gray-600">"Show me doctors in Lahore"</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="text-sm text-gray-600">"Where can I buy electronics in Islamabad?"</p>
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p>Powered by EHB AI Technology</p>
          <p className="mt-1">Available 24/7 to help you find the best services</p>
        </motion.div>
      </div>
    </div>
  );
}
