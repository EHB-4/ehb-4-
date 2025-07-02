"use client";

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  ArrowUp,
  Heart,
} from 'lucide-react';

/**
 * EHB Footer Component - Comprehensive footer with modern design
 * @returns {JSX.Element} The footer component
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'GoSellr', href: '/gosellr', description: 'E-commerce Platform' },
        { name: 'WMS', href: '/wms', description: 'Healthcare System' },
        { name: 'PSS', href: '/pss', description: 'Security Verification' },
        { name: 'OBS', href: '/obs', description: 'Educational Resources' },
        { name: 'JPS', href: '/jps', description: 'Job Marketplace' },
        { name: 'AI Tools', href: '/ai-marketplace', description: 'AI Services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', description: 'Learn about EHB' },
        { name: 'Careers', href: '/careers', description: 'Join our team' },
        { name: 'Press', href: '/press', description: 'Media resources' },
        { name: 'Blog', href: '/blog', description: 'Latest updates' },
        { name: 'Contact', href: '/contact', description: 'Get in touch' },
        { name: 'Partners', href: '/partners', description: 'Partnership opportunities' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help', description: 'Find answers' },
        { name: 'Documentation', href: '/docs', description: 'API & guides' },
        { name: 'Community', href: '/community', description: 'User forum' },
        { name: 'Status', href: '/status', description: 'System status' },
        { name: 'Security', href: '/security', description: 'Security info' },
        { name: 'Privacy', href: '/privacy', description: 'Privacy policy' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms', description: 'Service terms' },
        { name: 'Privacy Policy', href: '/privacy', description: 'Data protection' },
        { name: 'Cookie Policy', href: '/cookies', description: 'Cookie usage' },
        { name: 'GDPR', href: '/gdpr', description: 'Data rights' },
        { name: 'Accessibility', href: '/accessibility', description: 'Accessibility info' },
        { name: 'Compliance', href: '/compliance', description: 'Regulatory info' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  const contactInfo = [
    { icon: Mail, text: 'contact@ehb-platform.com', href: 'mailto:contact@ehb-platform.com' },
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, text: 'New York, NY 10001, USA', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold">EHB</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Next Generation Digital Ecosystem providing comprehensive solutions for e-commerce,
              healthcare, education, and AI-powered services.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
                >
                  <contact.icon className="w-4 h-4" />
                  <span className="text-sm">{contact.text}</span>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                      <span className="block group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-400">
                        {link.description}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Get the latest updates on new features, services, and industry insights.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>&copy; {currentYear} EHB Platform. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">
                Made with <Heart className="w-4 h-4 inline text-red-500" /> for the community
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cookies
              </Link>
              <button
                onClick={scrollToTop}
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button (Mobile) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 md:hidden w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 mx-auto" />
      </motion.button>
    </footer>
  );
}
