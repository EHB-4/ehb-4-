import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

interface FAQ {
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'rewards' | 'security';
}

interface Documentation {
  title: string;
  description: string;
  link: string;
  category: 'getting-started' | 'advanced' | 'api' | 'security';
}

interface SupportChannel {
  name: string;
  description: string;
  link: string;
  icon: string;
}

const faqs: FAQ[] = [
  {
    question: 'What is EHBGC Token?',
    answer:
      "EHBGC is a utility token that allows users to participate in the platform's ecosystem. Users can lock their tokens to earn rewards, participate in governance, and access premium features.",
    category: 'general',
  },
  {
    question: 'How do I start earning rewards?',
    answer:
      'To start earning rewards, you need to lock your EHBGC tokens for a specific duration. The longer you lock your tokens, the higher your rewards rate will be. You can also earn additional rewards through referrals and bonuses.',
    category: 'rewards',
  },
  {
    question: 'What is the minimum lock amount?',
    answer:
      'The minimum lock amount is 100 EHBGC tokens. This ensures that the platform remains efficient and rewards are distributed fairly among participants.',
    category: 'technical',
  },
  {
    question: 'How secure is the platform?',
    answer:
      'The platform implements multiple security measures including two-factor authentication, encrypted data storage, and regular security audits. All smart contracts are thoroughly tested and audited by leading security firms.',
    category: 'security',
  },
  {
    question: 'How do referral rewards work?',
    answer:
      'When you refer someone to the platform, you earn a percentage of their lock amounts as rewards. The referral rate depends on your referral level, which increases as you refer more users.',
    category: 'rewards',
  },
  {
    question: 'Can I unlock my tokens early?',
    answer:
      'Yes, you can unlock your tokens before the lock period ends, but this will result in a penalty fee. The penalty fee is calculated based on the remaining lock duration.',
    category: 'technical',
  },
  {
    question: 'What happens if I lose my 2FA device?',
    answer:
      'If you lose your 2FA device, you can recover your account through a secure recovery process. This involves verifying your identity and waiting for a security cooldown period.',
    category: 'security',
  },
  {
    question: 'How are rewards calculated?',
    answer:
      'Rewards are calculated based on your lock amount, lock duration, and any applicable bonuses. The base reward rate is 5% APY, which can be increased through various bonus mechanisms.',
    category: 'rewards',
  },
];

const documentation: Documentation[] = [
  {
    title: 'Getting Started Guide',
    description:
      'Learn the basics of the EHBGC platform and how to get started with token locking.',
    link: '/docs/getting-started',
    category: 'getting-started',
  },
  {
    title: 'Advanced Features',
    description:
      'Explore advanced features like auto-compounding, referral programs, and bonus rewards.',
    link: '/docs/advanced',
    category: 'advanced',
  },
  {
    title: 'API Documentation',
    description: 'Integrate with our platform using our comprehensive API documentation.',
    link: '/docs/api',
    category: 'api',
  },
  {
    title: 'Security Best Practices',
    description: 'Learn about security features and best practices to protect your account.',
    link: '/docs/security',
    category: 'security',
  },
];

const supportChannels: SupportChannel[] = [
  {
    name: 'Discord',
    description: 'Join our Discord community for real-time support and discussions.',
    link: 'https://discord.gg/ehbgc',
    icon: '💬',
  },
  {
    name: 'Telegram',
    description: 'Connect with us on Telegram for quick support and updates.',
    link: 'https://t.me/ehbgc',
    icon: '📱',
  },
  {
    name: 'Email',
    description: 'Contact our support team via email for detailed assistance.',
    link: 'mailto:support@ehbgc.com',
    icon: '📧',
  },
  {
    name: 'Twitter',
    description: 'Follow us on Twitter for the latest news and announcements.',
    link: 'https://twitter.com/ehbgc',
    icon: '🐦',
  },
];

export default function HelpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const filteredFaqs =
    activeCategory === 'all' ? faqs : faqs.filter(faq => faq.category === activeCategory);

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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                title="Search"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {supportChannels.map((channel, index) => (
            <a
              key={index}
              href={channel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">{channel.icon}</div>
              <h3 className="text-lg font-medium text-gray-900">{channel.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{channel.description}</p>
            </a>
          ))}
        </div>

        {/* Documentation */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentation.map((doc, index) => (
              <a
                key={index}
                href={doc.link}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-medium text-gray-900">{doc.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{doc.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeCategory === 'all'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('general')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeCategory === 'general'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setActiveCategory('technical')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeCategory === 'technical'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Technical
              </button>
              <button
                onClick={() => setActiveCategory('security')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeCategory === 'security'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveCategory('rewards')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeCategory === 'rewards'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Rewards
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <div className="border border-gray-200 rounded-lg">
                    <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span>{faq.question}</span>
                      <ChevronUpIcon
                        className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-4 text-sm text-gray-500">
                      {faq.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
