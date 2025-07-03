'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Briefcase,
  Calendar,
  BarChart3,
  CreditCard,
  Mail,
  Globe,
  Shield,
  Move,
  PenTool,
  Settings,
  Menu,
  X,
  Home,
  Search,
  Bell,
  User,
  LogOut
} from 'lucide-react';

// Roman Urdu: Import all JPS components
import JPSDashboard from './JPSDashboard';
import JobListings from './JobListings';
import CandidateProfiles from './CandidateProfiles';
import InterviewScheduler from './InterviewScheduler';
import JPSAnalytics from './JPSAnalytics';
import PaymentSystem from './PaymentSystem';
import EmailNotification from './EmailNotification';
import MobileResponsive from './MobileResponsive';
import MultiLanguageSupport from './MultiLanguageSupport';
import AdvancedSecurity from './AdvancedSecurity';
import DragAndDrop from './DragAndDrop';
import ContentWriting from './ContentWriting';

interface JPSCompleteSystemProps {
  userType: 'jobseeker' | 'employer' | 'admin';
}

/**
 * Roman Urdu: JPS Complete System Component
 * Tamam JPS features ko integrate karta hai
 */
export default function JPSCompleteSystem({ userType }: JPSCompleteSystemProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [securityValid, setSecurityValid] = useState(false);

  // Roman Urdu: Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Roman Urdu: Mock notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'interview',
        message: 'New interview scheduled for Senior Developer position',
        recipient: 'ahmed.khan@email.com',
        status: 'success'
      },
      {
        id: 2,
        type: 'placement',
        message: 'Congratulations! You have been placed at TechCorp Solutions',
        recipient: 'sarah.ahmed@email.com',
        status: 'success'
      },
      {
        id: 3,
        type: 'job',
        message: 'New job posting: React Developer at Digital Solutions',
        recipient: 'admin@jps.com',
        status: 'info'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  // Roman Urdu: Navigation tabs
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'interviews', label: 'Interviews', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Mail },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'dragdrop', label: 'Drag & Drop', icon: Move },
    { id: 'content', label: 'Content', icon: PenTool }
  ];

  // Roman Urdu: Render active component
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">JPS Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Active Jobs</h3>
                <p className="text-3xl font-bold text-blue-600">15</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Candidates</h3>
                <p className="text-3xl font-bold text-green-600">42</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Placements</h3>
                <p className="text-3xl font-bold text-purple-600">8</p>
              </div>
            </div>
          </div>
        );
      case 'jobs':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Listings</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Job listings component will be rendered here</p>
            </div>
          </div>
        );
      case 'candidates':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Candidate Profiles</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Candidate profiles component will be rendered here</p>
            </div>
          </div>
        );
      case 'interviews':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Interview Scheduler</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Interview scheduler component will be rendered here</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Analytics component will be rendered here</p>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment System</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Payment system component will be rendered here</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Email Notifications</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium">{notification.type}</h4>
                  <p className="text-gray-600">{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'language':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Multi-Language Support</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Language support component will be rendered here</p>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Validation</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Security component will be rendered here</p>
            </div>
          </div>
        );
      case 'dragdrop':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Drag & Drop Management</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Drag & drop component will be rendered here</p>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Generation</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Content generation component will be rendered here</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">JPS Dashboard</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Welcome to JPS System</p>
            </div>
          </div>
        );
    }
  };

  // Roman Urdu: Mobile view
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Mobile View</h2>
          <p className="text-gray-600">Mobile responsive component will be rendered here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-lg bg-gray-100 lg:hidden"
            >
              {showSidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">JPS System</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700 capitalize">{userType}</span>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white shadow-sm ${showSidebar ? 'block' : 'hidden'} lg:block lg:w-64`}>
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveComponent()}
          </motion.div>
        </main>
      </div>

      {/* System Status */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
        <div className="flex items-center space-x-2 text-sm">
          <div className={`h-2 w-2 rounded-full ${securityValid ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-gray-600">
            {securityValid ? 'System Secure' : 'Security Check Required'}
          </span>
        </div>
      </div>
    </div>
  );
} 