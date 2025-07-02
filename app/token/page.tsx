import React from 'react';
import Link from 'next/link';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Lock,
  History,
  Star,
  CheckCircle,
  Clock,
  TrendingUp as TrendingUpIcon,
  DollarSign,
} from 'lucide-react';

export default function TokenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EHBGC Token</h1>
                <p className="text-yellow-600 font-medium">EHB Global Currency Token</p>
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
              Blockchain-Based Global Currency Token
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              EHBGC Token is the native cryptocurrency powering the EHB ecosystem. Trade, stake, and
              earn rewards with our secure blockchain platform.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>100% Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-5 w-5" />
                <span>Port 5007</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <TrendingUpIcon className="h-5 w-5" />
                <span>Blockchain Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Token Price Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Token Price</h3>
            <div className="text-4xl font-bold text-yellow-600 mb-2">$0.85</div>
            <div className="flex justify-center items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-medium">+12.5% (24h)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Market Cap</div>
                <div className="font-semibold">$156.7M</div>
              </div>
              <div>
                <div className="text-gray-600">24h Volume</div>
                <div className="font-semibold">$2.4M</div>
              </div>
              <div>
                <div className="text-gray-600">Circulating Supply</div>
                <div className="font-semibold">184.3M EHBGC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Buy Tokens</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Purchase EHBGC tokens using various payment methods and cryptocurrencies.
            </p>
            <Link href="/token/buy" className="text-yellow-600 hover:text-yellow-800 font-medium">
              Buy Now →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Sell Tokens</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Sell your EHBGC tokens and convert them to fiat or other cryptocurrencies.
            </p>
            <Link href="/token/sell" className="text-red-600 hover:text-red-800 font-medium">
              Sell Tokens →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Stake Tokens</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Stake your tokens to earn rewards and participate in network governance.
            </p>
            <Link href="/token/stake" className="text-green-600 hover:text-green-800 font-medium">
              Start Staking →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <History className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
            </div>
            <p className="text-gray-600 mb-4">
              View your complete transaction history and token transfer records.
            </p>
            <Link href="/token/history" className="text-blue-600 hover:text-blue-800 font-medium">
              View History →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Earn Rewards</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Earn passive income through staking, liquidity provision, and yield farming.
            </p>
            <Link
              href="/token/rewards"
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              Earn Rewards →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Star className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Governance</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Participate in protocol governance and vote on important proposals.
            </p>
            <Link
              href="/token/governance"
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Participate →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Token Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">184.3M</div>
              <div className="text-gray-600">Circulating Supply</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">45.2K</div>
              <div className="text-gray-600">Holders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">$2.4M</div>
              <div className="text-gray-600">24h Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">12.5%</div>
              <div className="text-gray-600">APY Staking</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/token/buy"
              className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <div className="text-yellow-600 font-medium">Buy</div>
            </Link>
            <Link
              href="/token/sell"
              className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <div className="text-red-600 font-medium">Sell</div>
            </Link>
            <Link
              href="/token/stake"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="text-green-600 font-medium">Stake</div>
            </Link>
            <Link
              href="/token/history"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 font-medium">History</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
