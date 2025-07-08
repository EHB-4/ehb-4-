'use client';

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaPhone,
  FaComments,
  FaCheckCircle,
  FaRocket,
} from 'react-icons/fa';

export default function DevelopmentConsultationPage() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const consultationServices = [
    {
      id: 'tech-consultation',
      title: 'Technology Consultation',
      description: 'Get expert advice on technology stack, architecture, and best practices.',
      duration: '60 minutes',
      price: 'Free',
      icon: FaRocket,
      features: [
        'Technology stack recommendations',
        'Architecture review',
        'Performance optimization',
        'Security best practices',
        'Scalability planning',
      ],
    },
    {
      id: 'project-planning',
      title: 'Project Planning',
      description: 'Comprehensive project planning and roadmap development.',
      duration: '90 minutes',
      price: 'Free',
      icon: FaCalendarAlt,
      features: [
        'Project scope definition',
        'Timeline planning',
        'Resource allocation',
        'Risk assessment',
        'Budget estimation',
      ],
    },
    {
      id: 'code-review',
      title: 'Code Review',
      description: 'Professional code review and optimization suggestions.',
      duration: '45 minutes',
      price: 'Free',
      icon: FaCheckCircle,
      features: [
        'Code quality assessment',
        'Performance optimization',
        'Security vulnerabilities',
        'Best practices review',
        'Refactoring suggestions',
      ],
    },
    {
      id: 'ai-integration',
      title: 'AI Integration',
      description: 'AI and machine learning integration consultation.',
      duration: '75 minutes',
      price: 'Free',
      icon: FaRocket,
      features: [
        'AI strategy development',
        'Model selection',
        'Integration planning',
        'Data requirements',
        'ROI analysis',
      ],
    },
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  const consultationTypes = [
    {
      id: 'video',
      title: 'Video Call',
      description: 'Face-to-face consultation via Zoom or Google Meet',
      icon: FaVideo,
      recommended: true,
    },
    {
      id: 'phone',
      title: 'Phone Call',
      description: 'Audio consultation for quick discussions',
      icon: FaPhone,
      recommended: false,
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Real-time messaging consultation',
      icon: FaComments,
      recommended: false,
    },
  ];

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      alert('Please select all required fields');
      return;
    }

    // Here you would typically send the booking to your backend
    alert('Consultation booked successfully! We will contact you shortly.');
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
            <h1 className="text-5xl font-bold mb-4">Free Consultation</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get expert advice from our development team. Book a free consultation to discuss your
              project.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Consultation Services */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Consultation Services</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultationServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <service.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-500">{service.duration}</span>
                      <div className="text-lg font-bold text-green-600">{service.price}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <FaCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 h-fit"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Your Consultation</h3>

            <div className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Type
                </label>
                <div className="space-y-3">
                  {consultationTypes.map(type => (
                    <div
                      key={type.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedService === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedService(type.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <type.icon className="w-5 h-5 text-blue-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">{type.title}</div>
                            <div className="text-sm text-gray-600">{type.description}</div>
                          </div>
                        </div>
                        {type.recommended && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedTime === time
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Free Consultation
              </button>

              <p className="text-sm text-gray-500 text-center">
                We'll confirm your appointment within 24 hours
              </p>
            </div>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Consultation?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Get advice from experienced developers with 10+ years in the industry
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Completely Free</h3>
              <p className="text-gray-600">
                No hidden costs or obligations. Our consultation is 100% free
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Choose a time that works best for you, including evenings and weekends
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
