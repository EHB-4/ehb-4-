'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'GoSellr', path: '/gosellr', description: 'E-Commerce Platform' },
    { name: 'WMS', path: '/wms', description: 'World Medical Services' },
    { name: 'PSS', path: '/pss', description: 'Personal Security System' },
    { name: 'OBS', path: '/obs', description: 'Online Book Store' },
    { name: 'JPS', path: '/jps', description: 'Job Providing Service' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Become a Franchise', path: '/franchise' },
    { name: 'Support Center', path: '/support' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, path: 'https://facebook.com/ehb' },
    { name: 'Twitter', icon: Twitter, path: 'https://twitter.com/ehb' },
    { name: 'Instagram', icon: Instagram, path: 'https://instagram.com/ehb' },
    { name: 'LinkedIn', icon: Linkedin, path: 'https://linkedin.com/company/ehb' },
    { name: 'YouTube', icon: Youtube, path: 'https://youtube.com/ehb' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-[#2452FF] to-[#8B3DFF] bg-clip-text text-transparent mb-4">
                EHB Technologies
              </div>
              <p className="text-gray-600 mb-6">
                Empowering global communities through verified services, AI-powered solutions, and
                franchise-backed delivery systems.
              </p>

              {/* Download App */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-[#2452FF] text-white px-4 py-2 rounded-lg hover:bg-[#8B3DFF] transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download EHB App</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Services</h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <a
                      href={service.path}
                      className="text-gray-600 hover:text-[#2452FF] transition-colors flex items-center space-x-2"
                    >
                      <span>{service.name}</span>
                      <span className="text-xs text-gray-400">({service.description})</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <a
                      href={link.path}
                      className="text-gray-600 hover:text-[#2452FF] transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact & Social */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Support</h3>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>support@ehb.global</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Global Network</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Globe className="h-4 w-4" />
                  <span>www.ehb.global</span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-gray-100 hover:bg-[#2452FF] hover:text-white rounded-lg transition-colors"
                    >
                      <social.icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-200 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © {currentYear} EHB Technologies. All rights reserved.
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="/privacy" className="hover:text-[#2452FF] transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-[#2452FF] transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-[#2452FF] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
