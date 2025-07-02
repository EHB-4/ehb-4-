'use client';

import React from 'react';
import Link from 'next/link';
import {
  Wallet,
  CreditCard,
  ArrowUpDown,
  History,
  Shield,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
} from 'lucide-react';

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Trusty Wallet</h1>
                <p className="text-emerald-600 font-medium">EHB Wallet System</p>
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
              Digital Wallet & Payment Processing
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Secure, fast, and convenient digital wallet for all your financial needs. Send money,
              make payments, and manage your finances with ease.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>100% Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-5 w-5" />
                <span>Port 5001</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <TrendingUp className="h-5 w-5" />
                <span>Payment Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Balance Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Check your wallet balance and manage multiple currency accounts.
            </p>
            <Link
              href="/wallet/balance"
              className="text-emerald-600 hover:text-emerald-800 font-medium"
            >
              View Balance →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ArrowUpDown className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Send & Receive</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Send money to anyone worldwide and receive payments instantly.
            </p>
            <Link href="/wallet/send" className="text-blue-600 hover:text-blue-800 font-medium">
              Send Money →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <History className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Complete transaction history with detailed records and analytics.
            </p>
            <Link
              href="/wallet/transactions"
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              View History →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Add and manage various payment methods including cards and bank accounts.
            </p>
            <Link
              href="/wallet/payment-methods"
              className="text-orange-600 hover:text-orange-800 font-medium"
            >
              Manage Methods →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Advanced security features including 2FA, biometric authentication, and fraud
              protection.
            </p>
            <Link href="/wallet/security" className="text-red-600 hover:text-red-800 font-medium">
              Security Settings →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Star className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Rewards & Benefits</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Earn rewards, cashback, and exclusive benefits with your wallet usage.
            </p>
            <Link href="/wallet/rewards" className="text-gray-600 hover:text-gray-800 font-medium">
              View Rewards →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Wallet Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">2.4M</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">$156M</div>
              <div className="text-gray-600">Total Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">89</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/wallet/balance"
              className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <div className="text-emerald-600 font-medium">Balance</div>
            </Link>
            <Link
              href="/wallet/transactions"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 font-medium">Transactions</div>
            </Link>
            <Link
              href="/wallet/send"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="text-purple-600 font-medium">Send</div>
            </Link>
            <Link
              href="/wallet/receive"
              className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <div className="text-orange-600 font-medium">Receive</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
