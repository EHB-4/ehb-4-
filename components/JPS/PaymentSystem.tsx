'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  Receipt,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  Building,
  CheckCircle,
  X,
  Plus,
  Edit,
  Trash2,
  Download,
  Share,
  Copy,
  Eye,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Filter,
  Search,
  Settings,
  Bell,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Award,
  Shield,
  UserCheck,
  FileText,
  Briefcase,
  Users,
  Target,
  Brain,
  Wallet,
  Banknote,
  Coins,
  PiggyBank,
  Calculator,
  Percent,
  Hash,
  AtSign,
  Tag,
  Archive,
  Save,
  RefreshCw,
  RotateCcw,
  Maximize,
  Minimize,
  Link as LinkIcon,
  Upload,
  Scan,
  QrCode,
  Fingerprint,
  Key,
  Unlock,
  Lock,
  Wifi,
  Cloud,
  Desktop,
  Laptop,
  Tablet,
  Smartphone,
  Monitor,
  Headphones,
  Mic,
  Camera,
  Palette,
  Code,
  Server,
  Database,
  GitBranch,
  Workflow,
  Languages,
  Globe,
  GraduationCap,
  BookOpen,
  Heart,
  Star,
  MessageCircle,
  Video,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle as CheckCircleIcon,
  ExclamationTriangle,
  AlertCircle,
  Info,
} from 'lucide-react';
import api/jps-api from '@/lib/api/jps-api';

interface PaymentSystemProps {
  userType: 'jobseeker' | 'employer' | 'admin';
}

interface Payment {
  id: string;
  placementId: string;
  candidateName: string;
  jobTitle: string;
  company: string;
  amount: number;
  commission: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDate: string;
  paymentMethod: 'bank_transfer' | 'credit_card' | 'paypal' | 'crypto';
  transactionId?: string;
  notes?: string;
}

interface BillingInfo {
  id: string;
  userId: string;
  type: 'employer' | 'candidate' | 'admin';
  companyName?: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  taxId?: string;
  paymentMethod: 'bank_transfer' | 'credit_card' | 'paypal' | 'crypto';
  autoPay: boolean;
}

interface CommissionRate {
  level: number;
  rate: number;
  description: string;
}

/**
 * Payment System Component
 * Complete payment management for JPS platform
 */
export default function PaymentSystem({ userType }: PaymentSystemProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [placements, setPlacements] = useState<JPSPlacement[]>([]);
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Commission rates based on SQL Level
  const commissionRates: CommissionRate[] = [
    { level: 0, rate: 5, description: 'Free Level - 5% commission' },
    { level: 1, rate: 4, description: 'Basic Level - 4% commission' },
    { level: 2, rate: 3, description: 'Normal Level - 3% commission' },
    { level: 3, rate: 2, description: 'High Level - 2% commission' },
    { level: 4, rate: 1, description: 'VIP Level - 1% commission' },
  ];

  useEffect(() => {
    loadPaymentData();
  }, []);

  const loadPaymentData = async () => {
    try {
      setLoading(true);

      // Load placements data
      const placementsData = await JPSApiService.getPlacements();
      setPlacements(placementsData);

      // Generate mock payments from placements
      const mockPayments: Payment[] = placementsData.map(placement => ({
        id: `payment-${placement.id}`,
        placementId: placement.id,
        candidateName: placement.candidateName,
        jobTitle: placement.jobTitle,
        company: placement.company,
        amount: placement.salary,
        commission: Math.round(placement.salary * 0.03), // 3% commission
        status: placement.status === 'completed' ? 'completed' : 'pending',
        paymentDate: placement.placementDate,
        paymentMethod: 'bank_transfer',
        transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        notes: `Payment for ${placement.jobTitle} placement`,
      }));

      setPayments(mockPayments);

      // Mock billing info
      setBillingInfo({
        id: 'billing-1',
        userId: 'user-1',
        type: userType as any,
        companyName: userType === 'employer' ? 'TechCorp Solutions' : undefined,
        contactName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+92-300-1234567',
        address: 'Karachi, Pakistan',
        taxId: userType === 'employer' ? 'TAX-123456' : undefined,
        paymentMethod: 'bank_transfer',
        autoPay: true,
      });
    } catch (error) {
      console.error('Error loading payment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentStatusChange = async (paymentId: string, newStatus: string) => {
    setPayments(
      payments.map(payment =>
        payment.id === paymentId ? { ...payment, status: newStatus as any } : payment
      )
    );
    alert('Payment status updated successfully!');
  };

  const handleProcessPayment = async (payment: Payment) => {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      setPayments(payments.map(p => (p.id === payment.id ? { ...p, status: 'completed' } : p)));

      alert('Payment processed successfully!');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment');
    }
  };

  const calculateTotalEarnings = () => {
    return payments.filter(p => p.status === 'completed').reduce((acc, p) => acc + p.amount, 0);
  };

  const calculateTotalCommissions = () => {
    return payments.filter(p => p.status === 'completed').reduce((acc, p) => acc + p.commission, 0);
  };

  const calculatePendingPayments = () => {
    return payments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'refunded':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CreditCard className="h-4 w-4" />;
      case 'bank_transfer':
        return <Building className="h-4 w-4" />;
      case 'paypal':
        return <DollarSign className="h-4 w-4" />;
      case 'crypto':
        return <Coins className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesSearch =
      payment.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.company.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading Payment System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
                Payment System
              </h1>
              <p className="text-gray-600 mt-2">
                Manage payments, commissions, and billing information
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={e => setSelectedTimeframe(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={() => setShowBillingForm(true)}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Settings className="h-4 w-4 mr-2" />
                Billing Settings
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-green-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">
                  {calculateTotalEarnings().toLocaleString()} PKR
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15% from last month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-blue-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Commissions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {calculateTotalCommissions().toLocaleString()} PKR
                </p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Percent className="h-4 w-4 mr-1" />
                  3% average rate
                </p>
              </div>
              <Receipt className="h-8 w-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-yellow-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-3xl font-bold text-gray-900">
                  {calculatePendingPayments().toLocaleString()} PKR
                </p>
                <p className="text-sm text-yellow-600 flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {payments.filter(p => p.status === 'pending').length} payments
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Commission Rates */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Rates</h3>
              <div className="space-y-4">
                {commissionRates.map(rate => (
                  <div
                    key={rate.level}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">SQL Level {rate.level}</div>
                      <div className="text-sm text-gray-600">{rate.description}</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{rate.rate}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Information */}
            {billingInfo && (
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Billing Information</h3>
                  <button
                    onClick={() => setShowBillingForm(true)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Contact Name</label>
                    <p className="text-gray-900">{billingInfo.contactName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{billingInfo.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-gray-900">{billingInfo.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Payment Method</label>
                    <p className="text-gray-900 capitalize">
                      {billingInfo.paymentMethod.replace('_', ' ')}
                    </p>
                  </div>
                  {billingInfo.autoPay && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Auto-pay enabled
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Payment History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Search payments..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredPayments.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No payments found</p>
                  </div>
                ) : (
                  filteredPayments.map(payment => (
                    <motion.div
                      key={payment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-gray-900">{payment.candidateName}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}
                            >
                              {payment.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {payment.jobTitle} at {payment.company}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(payment.paymentDate).toLocaleDateString()}
                            <span className="mx-2">•</span>
                            {getPaymentMethodIcon(payment.paymentMethod)}
                            <span className="ml-1 capitalize">
                              {payment.paymentMethod.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {payment.amount.toLocaleString()} PKR
                          </div>
                          <div className="text-sm text-blue-600">
                            Commission: {payment.commission.toLocaleString()} PKR
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Transaction ID: {payment.transactionId}
                        </div>
                        <div className="flex items-center space-x-2">
                          {payment.status === 'pending' && (
                            <button
                              onClick={() => handleProcessPayment(payment)}
                              className="flex items-center px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Process
                            </button>
                          )}
                          <button className="flex items-center px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </button>
                          <button className="flex items-center px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700">
                            <Download className="h-3 w-3 mr-1" />
                            Receipt
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
