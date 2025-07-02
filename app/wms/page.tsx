import React from 'react';
import Link from 'next/link';
import {
  Shield,
  User,
  Calendar,
  FileText,
  Activity,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Heart,
} from 'lucide-react';

export default function WMSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">WMS</h1>
                <p className="text-red-600 font-medium">World Medical Services</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">100% Complete</span>
              </div>
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-green-800 text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Online + Offline Verified Healthcare System
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive healthcare platform connecting patients with verified medical
              professionals. From online consultations to offline appointments, we ensure quality
              healthcare delivery worldwide.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>100% Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-5 w-5" />
                <span>Port 4009</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <TrendingUp className="h-5 w-5" />
                <span>Healthcare Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <User className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Doctor Directory</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Verified medical professionals with detailed profiles, specializations, and ratings.
            </p>
            <Link href="/wms/doctors" className="text-red-600 hover:text-red-800 font-medium">
              Find Doctors →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Appointment Booking</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Easy online appointment scheduling with real-time availability and reminders.
            </p>
            <Link
              href="/wms/appointments"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Book Appointment →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Prescriptions</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Digital prescription management with medication tracking and refill reminders.
            </p>
            <Link
              href="/wms/prescriptions"
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              View Prescriptions →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Health Records</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Secure digital health records with comprehensive medical history and test results.
            </p>
            <Link
              href="/wms/health-records"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Access Records →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Telemedicine</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Virtual consultations with healthcare providers from the comfort of your home.
            </p>
            <Link
              href="/wms/telemedicine"
              className="text-orange-600 hover:text-orange-800 font-medium"
            >
              Start Consultation →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Shield className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Emergency Services</h3>
            </div>
            <p className="text-gray-600 mb-4">
              24/7 emergency response system with rapid medical assistance coordination.
            </p>
            <Link href="/wms/emergency" className="text-gray-600 hover:text-gray-800 font-medium">
              Emergency Contact →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Healthcare Network Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">2,847</div>
              <div className="text-gray-600">Verified Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">156</div>
              <div className="text-gray-600">Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">89,234</div>
              <div className="text-gray-600">Patients Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98.7%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/wms/doctors"
              className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <div className="text-red-600 font-medium">Doctors</div>
            </Link>
            <Link
              href="/wms/appointments"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 font-medium">Appointments</div>
            </Link>
            <Link
              href="/wms/prescriptions"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="text-purple-600 font-medium">Prescriptions</div>
            </Link>
            <Link
              href="/wms/health-records"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="text-green-600 font-medium">Health Records</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
