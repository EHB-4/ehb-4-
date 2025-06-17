import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQ {
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'rewards' | 'security';
}

const faqs: FAQ[] = [
  {
    question: 'What is EHBGC Token?',
    answer:
      "EHBGC Token is a utility token that allows users to participate in the platform's ecosystem. It can be used for locking, unlocking, and earning rewards.",
    category: 'general',
  },
  {
    question: 'How do I lock my tokens?',
    answer:
      'To lock your tokens, navigate to the Token Operations page, enter the amount you want to lock, select the duration, and confirm the transaction.',
    category: 'technical',
  },
  {
    question: 'How are rewards calculated?',
    answer:
      'Rewards are calculated based on the amount of tokens locked, the lock duration, and the current reward rate. The longer you lock your tokens, the higher your rewards.',
    category: 'rewards',
  },
  {
    question: 'Is my wallet secure?',
    answer:
      "Yes, we use industry-standard security measures to protect your wallet. However, it's important to keep your private keys safe and never share them with anyone.",
    category: 'security',
  },
  // Add more FAQs as needed
];

const guides = [
  {
    title: 'Getting Started',
    description: 'Learn how to set up your account and start using the platform.',
    link: '/guides/getting-started',
  },
  {
    title: 'Token Operations',
    description: 'Detailed guide on how to lock, unlock, and manage your tokens.',
    link: '/guides/token-operations',
  },
  {
    title: 'Rewards System',
    description: 'Understand how the rewards system works and maximize your earnings.',
    link: '/guides/rewards-system',
  },
  {
    title: 'Security Best Practices',
    description: 'Learn how to keep your account and tokens secure.',
    link: '/guides/security',
  },
];

export default function TokenHelp() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<FAQ['category'] | 'all'>('all');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const filteredFaqs =
    selectedCategory === 'all' ? faqs : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & Support</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                title="Search"
              >
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <button
            onClick={() => router.push('/token/operations')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">Token Operations</h3>
            <p className="text-sm text-gray-500">Learn how to lock and unlock your tokens</p>
          </button>

          <button
            onClick={() => router.push('/token/rewards')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">Rewards</h3>
            <p className="text-sm text-gray-500">Understand the rewards system</p>
          </button>

          <button
            onClick={() => router.push('/token/settings')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
            <p className="text-sm text-gray-500">Manage your account settings</p>
          </button>

          <button
            onClick={() => router.push('/token/profile')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">Profile</h3>
            <p className="text-sm text-gray-500">Update your profile information</p>
          </button>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow mb-12">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          </div>

          {/* Category Filter */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('general')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === 'general'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setSelectedCategory('technical')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === 'technical'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Technical
              </button>
              <button
                onClick={() => setSelectedCategory('rewards')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === 'rewards'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Rewards
              </button>
              <button
                onClick={() => setSelectedCategory('security')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === 'security'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Security
              </button>
            </div>
          </div>

          {/* FAQ List */}
          <div className="divide-y divide-gray-200">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="px-6 py-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  {expandedFaqs.includes(index) ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaqs.includes(index) && <p className="mt-2 text-gray-600">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Guides */}
        <div className="bg-white rounded-lg shadow mb-12">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Guides & Tutorials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => router.push(guide.link)}
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-500">{guide.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Need More Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Email Support</h3>
              <p className="text-sm text-gray-500">support@ehbgc.com</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Telegram Support</h3>
              <p className="text-sm text-gray-500">@EHBGC_Support</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Discord Community</h3>
              <p className="text-sm text-gray-500">Join our Discord server</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
