import React from 'react';
import Link from 'next/link';
import {
  Globe,
  Plane,
  Hotel,
  MapPin,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Compass,
} from 'lucide-react';

export default function AGTSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AGTS</h1>
                <p className="text-indigo-600 font-medium">Advanced Global Travel Services</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Travel Ecosystem</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience seamless travel planning with our comprehensive platform. From flights and
              hotels to complete vacation packages, we make travel planning effortless.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>100% Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-5 w-5" />
                <span>Port 4012</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <TrendingUp className="h-5 w-5" />
                <span>Travel Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Plane className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Flight Booking</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Search and book flights worldwide with competitive prices and flexible options.
            </p>
            <Link
              href="/agts/flights"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Search Flights →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Hotel className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Hotel Reservations</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Find and book accommodations from luxury hotels to budget-friendly options.
            </p>
            <Link href="/agts/hotels" className="text-blue-600 hover:text-blue-800 font-medium">
              Find Hotels →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Vacation Packages</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Complete vacation packages with flights, hotels, and activities included.
            </p>
            <Link href="/agts/packages" className="text-green-600 hover:text-green-800 font-medium">
              View Packages →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Travel Bookings</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage all your travel bookings in one place with easy access and modifications.
            </p>
            <Link
              href="/agts/bookings"
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              My Bookings →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Compass className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Travel Planning</h3>
            </div>
            <p className="text-gray-600 mb-4">
              AI-powered travel planning with personalized recommendations and itineraries.
            </p>
            <Link
              href="/agts/planning"
              className="text-orange-600 hover:text-orange-800 font-medium"
            >
              Plan Trip →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Star className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Travel Reviews</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Read and share travel experiences, reviews, and recommendations.
            </p>
            <Link href="/agts/reviews" className="text-red-600 hover:text-red-800 font-medium">
              Read Reviews →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Travel Network Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">2,847</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15,678</div>
              <div className="text-gray-600">Hotels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">89,234</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">98.2%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/agts/flights"
              className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <div className="text-indigo-600 font-medium">Flights</div>
            </Link>
            <Link
              href="/agts/hotels"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 font-medium">Hotels</div>
            </Link>
            <Link
              href="/agts/packages"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="text-green-600 font-medium">Packages</div>
            </Link>
            <Link
              href="/agts/bookings"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="text-purple-600 font-medium">Bookings</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
