'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Star,
  Download,
  Play,
  Heart,
  Share2,
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredApps = [
    {
      id: 1,
      name: 'EHB Wallet',
      category: 'Finance',
      rating: 4.8,
      downloads: '10K+',
      price: 'Free',
      image: 'https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=EHB+Wallet',
      featured: true,
    },
    {
      id: 2,
      name: 'EHB AI Assistant',
      category: 'Productivity',
      rating: 4.9,
      downloads: '50K+',
      price: 'Free',
      image: 'https://via.placeholder.com/200x200/10B981/FFFFFF?text=EHB+AI',
      featured: true,
    },
    {
      id: 3,
      name: 'EHB Marketplace',
      category: 'Shopping',
      rating: 4.7,
      downloads: '25K+',
      price: 'Free',
      image: 'https://via.placeholder.com/200x200/F59E0B/FFFFFF?text=EHB+Market',
      featured: true,
    },
    {
      id: 4,
      name: 'EHB Analytics',
      category: 'Business',
      rating: 4.6,
      downloads: '15K+',
      price: '$9.99',
      image: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=EHB+Analytics',
      featured: true,
    },
  ];

  const categories = [
    { name: 'Gaming', icon: '🎮', color: 'bg-purple-500' },
    { name: 'Productivity', icon: '⚡', color: 'bg-blue-500' },
    { name: 'Finance', icon: '💰', color: 'bg-green-500' },
    { name: 'Entertainment', icon: '🎬', color: 'bg-red-500' },
    { name: 'Education', icon: '📚', color: 'bg-yellow-500' },
    { name: 'Health', icon: '🏥', color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                EHB Store
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search apps, games, movies, and more..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="h-6 w-6 text-gray-600" />
              </Link>
              <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <button
                type="button"
                aria-label="Open menu"
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to EHB Store</h1>
            <p className="text-xl mb-6 opacity-90">
              Discover amazing apps, games, and digital content
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Now
              </button>
              <button
                type="button"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <div
                key={category.name}
                className={`${category.color} p-6 rounded-xl text-white text-center cursor-pointer hover:scale-105 transition-transform`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold">{category.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Apps */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Apps</h2>
            <Link href="/apps" className="text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredApps.map(app => (
              <div
                key={app.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={app.image}
                    alt={app.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  {app.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      className="p-1 bg-black bg-opacity-50 rounded text-white hover:bg-opacity-70"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Share app"
                      className="p-1 bg-black bg-opacity-50 rounded text-white hover:bg-opacity-70"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{app.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{app.category}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{app.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{app.downloads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600">{app.price}</span>
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                    >
                      <Download className="h-4 w-4" />
                      <span>Get</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/dashboard"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Dashboard</h3>
                  <p className="text-gray-600">Manage your account and apps</p>
                </div>
              </div>
            </Link>
            <Link
              href="/admin"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Menu className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Admin Panel</h3>
                  <p className="text-gray-600">Administrative controls</p>
                </div>
              </div>
            </Link>
            <Link
              href="/marketplace"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Marketplace</h3>
                  <p className="text-gray-600">Browse and shop</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EHB Store</h3>
              <p className="text-gray-300">
                Your one-stop destination for digital content and applications.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/apps" className="hover:text-white">
                    Apps
                  </Link>
                </li>
                <li>
                  <Link href="/games" className="hover:text-white">
                    Games
                  </Link>
                </li>
                <li>
                  <Link href="/movies" className="hover:text-white">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/books" className="hover:text-white">
                    Books
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="hover:text-white">
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-white">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/licenses" className="hover:text-white">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 EHB Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
