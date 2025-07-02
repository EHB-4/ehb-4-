'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Shield,
  Truck,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  User,
  Mail,
  Phone,
  Building,
  Globe,
  Wallet,
  Bitcoin,
  Ethereum,
  AlertCircle,
  Info,
} from 'lucide-react';
import Link from 'next/link';

// ========================================
// 1. CHECKOUT PAGE COMPONENT
// ========================================

export default function GoSellrCheckout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [cryptoWallet, setCryptoWallet] = useState<string>('');
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [showCvv, setShowCvv] = useState(false);
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    currency: 'USD',
  });

  // ========================================
  // 2. COMPONENT INITIALIZATION
  // ========================================

  useEffect(() => {
    initializeCheckout();
  }, []);

  useEffect(() => {
    if (useSameAddress) {
      setBillingAddress(shippingAddress);
    }
  }, [shippingAddress, useSameAddress]);

  const initializeCheckout = async () => {
    try {
      setLoading(true);

      // Load cart items
      const savedCart = localStorage.getItem('gosellr-cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        calculateOrderSummary(items);
      }

      // Load user data
      const userData = await loadUserData();
      setUser(userData);

      // Pre-fill shipping address with user data
      if (userData) {
        setShippingAddress(prev => ({
          ...prev,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
        }));
      }
    } catch (error) {
      console.error('Error initializing checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 3. DATA LOADING FUNCTIONS
  // ========================================

  const loadUserData = async (): Promise<User> => {
    // Simulate API call
    return {
      id: 'user-123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1-555-0123',
      avatar: '/api/placeholder/40/40',
      kycVerified: true,
      trustScore: 85,
      walletBalance: 1250.5,
      isSeller: false,
    };
  };

  // ========================================
  // 4. UTILITY FUNCTIONS
  // ========================================

  const calculateOrderSummary = (items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    setOrderSummary({
      subtotal,
      shipping,
      tax,
      total,
      currency: 'USD',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Shipping
        return !!(
          shippingAddress.firstName &&
          shippingAddress.lastName &&
          shippingAddress.email &&
          shippingAddress.address1 &&
          shippingAddress.city &&
          shippingAddress.state &&
          shippingAddress.zipCode
        );
      case 2: // Payment
        if (paymentMethod === 'card') {
          return !!(
            cardDetails.number &&
            cardDetails.expiry &&
            cardDetails.cvv &&
            cardDetails.name
          );
        } else if (paymentMethod === 'crypto') {
          return !!cryptoWallet;
        }
        return false;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      // Validate final step
      if (!validateStep(currentStep)) {
        throw new Error('Please complete all required fields');
      }

      // Create order
      const order = {
        id: `order-${Date.now()}`,
        items: cartItems,
        shippingAddress,
        billingAddress: useSameAddress ? shippingAddress : billingAddress,
        paymentMethod,
        orderSummary,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart
      localStorage.removeItem('gosellr-cart');

      // Redirect to order confirmation
      window.location.href = `/gosellr/order-confirmation/${order.id}`;
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 5. RENDER FUNCTIONS
  // ========================================

  if (loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart to continue</p>
          <Link
            href="/gosellr"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <Link href="/gosellr" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Shopping
              </Link>
              <div className="text-2xl font-bold text-gray-900">GoSellr Checkout</div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-4 h-4 mr-1" />
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {step === 1 && 'Shipping'}
                        {step === 2 && 'Payment'}
                        {step === 3 && 'Review'}
                      </div>
                    </div>
                    {step < 3 && <div className="ml-4 w-16 h-0.5 bg-gray-200"></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <ShippingStep
                  shippingAddress={shippingAddress}
                  setShippingAddress={setShippingAddress}
                  useSameAddress={useSameAddress}
                  setUseSameAddress={setUseSameAddress}
                  billingAddress={billingAddress}
                  setBillingAddress={setBillingAddress}
                />
              )}

              {currentStep === 2 && (
                <PaymentStep
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  cardDetails={cardDetails}
                  setCardDetails={setCardDetails}
                  cryptoWallet={cryptoWallet}
                  setCryptoWallet={setCryptoWallet}
                  showCvv={showCvv}
                  setShowCvv={setShowCvv}
                />
              )}

              {currentStep === 3 && (
                <ReviewStep
                  cartItems={cartItems}
                  shippingAddress={shippingAddress}
                  billingAddress={billingAddress}
                  paymentMethod={paymentMethod}
                  orderSummary={orderSummary}
                  formatCurrency={formatCurrency}
                />
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!validateStep(currentStep)}
                    className="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading || !validateStep(currentStep)}
                    className="flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Place Order
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummarySidebar
              cartItems={cartItems}
              orderSummary={orderSummary}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 6. STEP COMPONENTS
// ========================================

function ShippingStep({
  shippingAddress,
  setShippingAddress,
  useSameAddress,
  setUseSameAddress,
  billingAddress,
  setBillingAddress,
}: {
  shippingAddress: Address;
  setShippingAddress: (address: Address) => void;
  useSameAddress: boolean;
  setUseSameAddress: (use: boolean) => void;
  billingAddress: Address;
  setBillingAddress: (address: Address) => void;
}) {
  const handleShippingChange = (field: keyof Address, value: string) => {
    setShippingAddress({ ...shippingAddress, [field]: value });
  };

  const handleBillingChange = (field: keyof Address, value: string) => {
    setBillingAddress({ ...billingAddress, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>

      {/* Shipping Address */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              type="text"
              value={shippingAddress.firstName}
              onChange={e => handleShippingChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              type="text"
              value={shippingAddress.lastName}
              onChange={e => handleShippingChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={shippingAddress.email}
              onChange={e => handleShippingChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={e => handleShippingChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={shippingAddress.company}
              onChange={e => handleShippingChange('company', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
            <input
              type="text"
              value={shippingAddress.address1}
              onChange={e => handleShippingChange('address1', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
            <input
              type="text"
              value={shippingAddress.address2}
              onChange={e => handleShippingChange('address2', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input
              type="text"
              value={shippingAddress.city}
              onChange={e => handleShippingChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
            <input
              type="text"
              value={shippingAddress.state}
              onChange={e => handleShippingChange('state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              value={shippingAddress.zipCode}
              onChange={e => handleShippingChange('zipCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
            <select
              value={shippingAddress.country}
              onChange={e => handleShippingChange('country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="same-address"
            checked={useSameAddress}
            onChange={e => setUseSameAddress(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="same-address" className="ml-2 text-sm text-gray-700">
            Use same address for billing
          </label>
        </div>

        {!useSameAddress && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={billingAddress.firstName}
                  onChange={e => handleBillingChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={billingAddress.lastName}
                  onChange={e => handleBillingChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  value={billingAddress.address1}
                  onChange={e => handleBillingChange('address1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  value={billingAddress.city}
                  onChange={e => handleBillingChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province *
                </label>
                <input
                  type="text"
                  value={billingAddress.state}
                  onChange={e => handleBillingChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP/Postal Code *
                </label>
                <input
                  type="text"
                  value={billingAddress.zipCode}
                  onChange={e => handleBillingChange('zipCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentStep({
  paymentMethod,
  setPaymentMethod,
  cardDetails,
  setCardDetails,
  cryptoWallet,
  setCryptoWallet,
  showCvv,
  setShowCvv,
}: {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  cardDetails: CardDetails;
  setCardDetails: (details: CardDetails) => void;
  cryptoWallet: string;
  setCryptoWallet: (wallet: string) => void;
  showCvv: boolean;
  setShowCvv: (show: boolean) => void;
}) {
  const handleCardChange = (field: keyof CardDetails, value: string) => {
    setCardDetails({ ...cardDetails, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <div className="space-y-4">
          <div
            className={`border rounded-lg p-4 cursor-pointer ${
              paymentMethod === 'card'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3 flex items-center">
                <CreditCard className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Credit/Debit Card</span>
              </div>
            </div>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer ${
              paymentMethod === 'crypto'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => setPaymentMethod('crypto')}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                checked={paymentMethod === 'crypto'}
                onChange={() => setPaymentMethod('crypto')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3 flex items-center">
                <Bitcoin className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Cryptocurrency</span>
              </div>
            </div>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer ${
              paymentMethod === 'escrow'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => setPaymentMethod('escrow')}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                checked={paymentMethod === 'escrow'}
                onChange={() => setPaymentMethod('escrow')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3 flex items-center">
                <Shield className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Blockchain Escrow</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
            <input
              type="text"
              value={cardDetails.number}
              onChange={e => handleCardChange('number', e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={e => handleCardChange('expiry', e.target.value)}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
              <div className="relative">
                <input
                  type={showCvv ? 'text' : 'password'}
                  value={cardDetails.cvv}
                  onChange={e => handleCardChange('cvv', e.target.value)}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCvv(!showCvv)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showCvv ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name *
            </label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={e => handleCardChange('name', e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      )}

      {paymentMethod === 'crypto' && (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <Info className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Cryptocurrency Payment</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Connect your wallet to pay with Bitcoin, Ethereum, or other supported
                  cryptocurrencies.
                </p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address *</label>
            <input
              type="text"
              value={cryptoWallet}
              onChange={e => setCryptoWallet(e.target.value)}
              placeholder="0x1234...5678"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      )}

      {paymentMethod === 'escrow' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <Shield className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Blockchain Escrow Protection</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Your payment will be held in escrow until you receive and approve your order.
                </p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Connect Wallet *</label>
            <button
              type="button"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Wallet className="w-4 h-4 inline mr-2" />
              Connect MetaMask
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewStep({
  cartItems,
  shippingAddress,
  billingAddress,
  paymentMethod,
  orderSummary,
  formatCurrency,
}: {
  cartItems: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  orderSummary: OrderSummary;
  formatCurrency: (amount: number) => string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Review</h2>

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="text-sm font-medium text-gray-900">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-900">
            {shippingAddress.firstName} {shippingAddress.lastName}
          </p>
          <p className="text-sm text-gray-600">{shippingAddress.email}</p>
          <p className="text-sm text-gray-600">{shippingAddress.phone}</p>
          <p className="text-sm text-gray-600">
            {shippingAddress.address1}
            {shippingAddress.address2 && <br />}
            {shippingAddress.address2}
          </p>
          <p className="text-sm text-gray-600">
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
          </p>
          <p className="text-sm text-gray-600">{shippingAddress.country}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            {paymentMethod === 'card' && <CreditCard className="w-5 h-5 text-gray-600 mr-2" />}
            {paymentMethod === 'crypto' && <Bitcoin className="w-5 h-5 text-gray-600 mr-2" />}
            {paymentMethod === 'escrow' && <Shield className="w-5 h-5 text-gray-600 mr-2" />}
            <span className="text-sm font-medium text-gray-900 capitalize">
              {paymentMethod === 'card' && 'Credit/Debit Card'}
              {paymentMethod === 'crypto' && 'Cryptocurrency'}
              {paymentMethod === 'escrow' && 'Blockchain Escrow'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSummarySidebar({
  cartItems,
  orderSummary,
  formatCurrency,
}: {
  cartItems: CartItem[];
  orderSummary: OrderSummary;
  formatCurrency: (amount: number) => string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

      {/* Order Items */}
      <div className="space-y-3 mb-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>{formatCurrency(orderSummary.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>
            {orderSummary.shipping === 0 ? 'Free' : formatCurrency(orderSummary.shipping)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax</span>
          <span>{formatCurrency(orderSummary.tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-gray-900 border-t border-gray-200 pt-2">
          <span>Total</span>
          <span>{formatCurrency(orderSummary.total)}</span>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center">
          <Shield className="w-5 h-5 text-green-600 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-green-800">Secure Checkout</h4>
            <p className="text-xs text-green-700 mt-1">
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 7. TYPE DEFINITIONS
// ========================================

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  kycVerified: boolean;
  trustScore: number;
  walletBalance: number;
  isSeller: boolean;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  sellerId: string;
}

interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

type PaymentMethod = 'card' | 'crypto' | 'escrow';

interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
}
