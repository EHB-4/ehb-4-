// GoSellr Field Validation Template
// Comprehensive validation for all GoSellr forms and data

import * as yup from 'yup';
import { z } from 'zod';

// ========================================
// 1. USER REGISTRATION VALIDATION
// ========================================

export const userRegistrationSchema = yup.object({
  // Basic Information
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),

  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),

  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),

  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  // Business Information
  businessName: yup
    .string()
    .required('Business name is required')
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name must be less than 100 characters'),

  businessType: yup
    .string()
    .required('Business type is required')
    .oneOf(['individual', 'company', 'partnership', 'llc'], 'Please select a valid business type'),

  // KYC Information
  dateOfBirth: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .test('age', 'You must be at least 18 years old', function (value) {
      if (!value) return false;
      const age = new Date().getFullYear() - value.getFullYear();
      return age >= 18;
    }),

  // Address Information
  address: yup.object({
    street: yup
      .string()
      .required('Street address is required')
      .min(5, 'Street address must be at least 5 characters')
      .max(200, 'Street address must be less than 200 characters'),

    city: yup
      .string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters')
      .max(50, 'City must be less than 50 characters'),

    state: yup
      .string()
      .required('State is required')
      .min(2, 'State must be at least 2 characters')
      .max(50, 'State must be less than 50 characters'),

    zipCode: yup
      .string()
      .required('ZIP code is required')
      .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),

    country: yup
      .string()
      .required('Country is required')
      .oneOf(['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'IN'], 'Please select a valid country'),
  }),

  // Terms and Conditions
  acceptTerms: yup
    .boolean()
    .required('You must accept the terms and conditions')
    .oneOf([true], 'You must accept the terms and conditions'),

  acceptPrivacy: yup
    .boolean()
    .required('You must accept the privacy policy')
    .oneOf([true], 'You must accept the privacy policy'),

  // Marketing Preferences
  marketingEmails: yup.boolean().default(false),

  smsNotifications: yup.boolean().default(false),
});

// ========================================
// 2. PRODUCT VALIDATION
// ========================================

export const productSchema = yup.object({
  // Basic Product Information
  title: yup
    .string()
    .required('Product title is required')
    .min(5, 'Product title must be at least 5 characters')
    .max(200, 'Product title must be less than 200 characters'),

  description: yup
    .string()
    .required('Product description is required')
    .min(20, 'Product description must be at least 20 characters')
    .max(2000, 'Product description must be less than 2000 characters'),

  category: yup
    .string()
    .required('Product category is required')
    .oneOf(
      [
        'electronics',
        'clothing',
        'home',
        'books',
        'sports',
        'automotive',
        'health',
        'beauty',
        'toys',
        'other',
      ],
      'Please select a valid category'
    ),

  subcategory: yup.string().required('Product subcategory is required'),

  // Pricing Information
  price: yup
    .number()
    .required('Product price is required')
    .positive('Price must be positive')
    .min(0.01, 'Price must be at least $0.01')
    .max(1000000, 'Price cannot exceed $1,000,000'),

  currency: yup
    .string()
    .required('Currency is required')
    .oneOf(['USD', 'EUR', 'GBP', 'CAD', 'AUD'], 'Please select a valid currency'),

  // Inventory Information
  quantity: yup
    .number()
    .required('Quantity is required')
    .integer('Quantity must be a whole number')
    .min(0, 'Quantity cannot be negative')
    .max(1000000, 'Quantity cannot exceed 1,000,000'),

  sku: yup
    .string()
    .required('SKU is required')
    .min(3, 'SKU must be at least 3 characters')
    .max(50, 'SKU must be less than 50 characters')
    .matches(
      /^[A-Z0-9-_]+$/,
      'SKU can only contain uppercase letters, numbers, hyphens, and underscores'
    ),

  // Shipping Information
  weight: yup
    .number()
    .required('Product weight is required')
    .positive('Weight must be positive')
    .min(0.01, 'Weight must be at least 0.01 kg')
    .max(1000, 'Weight cannot exceed 1000 kg'),

  dimensions: yup.object({
    length: yup
      .number()
      .required('Length is required')
      .positive('Length must be positive')
      .min(0.1, 'Length must be at least 0.1 cm')
      .max(1000, 'Length cannot exceed 1000 cm'),

    width: yup
      .number()
      .required('Width is required')
      .positive('Width must be positive')
      .min(0.1, 'Width must be at least 0.1 cm')
      .max(1000, 'Width cannot exceed 1000 cm'),

    height: yup
      .number()
      .required('Height is required')
      .positive('Height must be positive')
      .min(0.1, 'Height must be at least 0.1 cm')
      .max(1000, 'Height cannot exceed 1000 cm'),
  }),

  // Images
  images: yup
    .array()
    .of(yup.string().url('Please enter a valid image URL'))
    .min(1, 'At least one product image is required')
    .max(10, 'Cannot upload more than 10 images'),

  // SEO Information
  metaTitle: yup.string().max(60, 'Meta title must be less than 60 characters'),

  metaDescription: yup.string().max(160, 'Meta description must be less than 160 characters'),

  // Tags
  tags: yup
    .array()
    .of(yup.string().min(2, 'Tag must be at least 2 characters'))
    .max(20, 'Cannot add more than 20 tags'),
});

// ========================================
// 3. ORDER VALIDATION
// ========================================

export const orderSchema = yup.object({
  // Order Information
  items: yup
    .array()
    .of(
      yup.object({
        productId: yup.string().required('Product ID is required'),

        quantity: yup
          .number()
          .required('Quantity is required')
          .integer('Quantity must be a whole number')
          .min(1, 'Quantity must be at least 1')
          .max(1000, 'Quantity cannot exceed 1000'),

        price: yup.number().required('Price is required').positive('Price must be positive'),
      })
    )
    .min(1, 'Order must contain at least one item'),

  // Shipping Information
  shippingAddress: yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipCode: yup.string().required('ZIP code is required'),
    country: yup.string().required('Country is required'),
    phone: yup.string().required('Phone number is required'),
  }),

  // Payment Information
  paymentMethod: yup
    .string()
    .required('Payment method is required')
    .oneOf(
      ['credit_card', 'debit_card', 'paypal', 'crypto', 'bank_transfer'],
      'Please select a valid payment method'
    ),

  // Delivery Options
  deliveryMethod: yup
    .string()
    .required('Delivery method is required')
    .oneOf(['standard', 'express', 'overnight'], 'Please select a valid delivery method'),

  // Special Instructions
  specialInstructions: yup
    .string()
    .max(500, 'Special instructions must be less than 500 characters'),
});

// ========================================
// 4. PAYMENT VALIDATION
// ========================================

export const paymentSchema = yup.object({
  // Card Information
  cardNumber: yup
    .string()
    .required('Card number is required')
    .matches(/^\d{16}$/, 'Card number must be 16 digits'),

  expiryMonth: yup
    .number()
    .required('Expiry month is required')
    .min(1, 'Month must be between 1 and 12')
    .max(12, 'Month must be between 1 and 12'),

  expiryYear: yup
    .number()
    .required('Expiry year is required')
    .min(new Date().getFullYear(), 'Card has expired')
    .max(new Date().getFullYear() + 20, 'Expiry year is too far in the future'),

  cvv: yup
    .string()
    .required('CVV is required')
    .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),

  cardholderName: yup
    .string()
    .required('Cardholder name is required')
    .min(2, 'Cardholder name must be at least 2 characters')
    .max(100, 'Cardholder name must be less than 100 characters'),

  // Billing Address
  billingAddress: yup.object({
    street: yup.string().required('Billing street is required'),
    city: yup.string().required('Billing city is required'),
    state: yup.string().required('Billing state is required'),
    zipCode: yup.string().required('Billing ZIP code is required'),
    country: yup.string().required('Billing country is required'),
  }),

  // Amount
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .min(0.01, 'Amount must be at least $0.01'),

  currency: yup
    .string()
    .required('Currency is required')
    .oneOf(['USD', 'EUR', 'GBP', 'CAD', 'AUD'], 'Please select a valid currency'),
});

// ========================================
// 5. REVIEW VALIDATION
// ========================================

export const reviewSchema = yup.object({
  // Review Content
  rating: yup
    .number()
    .required('Rating is required')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5')
    .integer('Rating must be a whole number'),

  title: yup
    .string()
    .required('Review title is required')
    .min(5, 'Review title must be at least 5 characters')
    .max(100, 'Review title must be less than 100 characters'),

  content: yup
    .string()
    .required('Review content is required')
    .min(20, 'Review content must be at least 20 characters')
    .max(1000, 'Review content must be less than 1000 characters'),

  // Product Information
  productId: yup.string().required('Product ID is required'),

  orderId: yup.string().required('Order ID is required'),

  // Images
  images: yup
    .array()
    .of(yup.string().url('Please enter a valid image URL'))
    .max(5, 'Cannot upload more than 5 images'),

  // Verification
  verifiedPurchase: yup.boolean().default(false),
});

// ========================================
// 6. DISPUTE VALIDATION
// ========================================

export const disputeSchema = yup.object({
  // Dispute Information
  type: yup
    .string()
    .required('Dispute type is required')
    .oneOf(
      [
        'item_not_received',
        'item_not_as_described',
        'damaged_item',
        'wrong_item',
        'quality_issue',
        'seller_not_responding',
        'other',
      ],
      'Please select a valid dispute type'
    ),

  reason: yup
    .string()
    .required('Dispute reason is required')
    .min(20, 'Dispute reason must be at least 20 characters')
    .max(1000, 'Dispute reason must be less than 1000 characters'),

  // Order Information
  orderId: yup.string().required('Order ID is required'),

  productId: yup.string().required('Product ID is required'),

  // Evidence
  evidence: yup
    .array()
    .of(
      yup.object({
        type: yup
          .string()
          .required('Evidence type is required')
          .oneOf(['image', 'document', 'video'], 'Please select a valid evidence type'),

        url: yup.string().required('Evidence URL is required').url('Please enter a valid URL'),

        description: yup.string().max(200, 'Evidence description must be less than 200 characters'),
      })
    )
    .max(10, 'Cannot upload more than 10 pieces of evidence'),

  // Resolution Preference
  resolutionPreference: yup
    .string()
    .required('Resolution preference is required')
    .oneOf(
      ['refund', 'replacement', 'partial_refund', 'other'],
      'Please select a valid resolution preference'
    ),

  // Contact Information
  contactPhone: yup
    .string()
    .required('Contact phone is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),

  contactEmail: yup
    .string()
    .required('Contact email is required')
    .email('Please enter a valid email address'),
});

// ========================================
// 7. KYC VALIDATION
// ========================================

export const kycSchema = yup.object({
  // Personal Information
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),
  nationality: yup.string().required('Nationality is required'),

  // Identity Documents
  idType: yup
    .string()
    .required('ID type is required')
    .oneOf(['passport', 'drivers_license', 'national_id', 'ssn'], 'Please select a valid ID type'),

  idNumber: yup
    .string()
    .required('ID number is required')
    .min(5, 'ID number must be at least 5 characters')
    .max(50, 'ID number must be less than 50 characters'),

  idFrontImage: yup
    .string()
    .required('Front ID image is required')
    .url('Please enter a valid image URL'),

  idBackImage: yup
    .string()
    .required('Back ID image is required')
    .url('Please enter a valid image URL'),

  // Address Verification
  addressProof: yup
    .string()
    .required('Address proof is required')
    .oneOf(
      ['utility_bill', 'bank_statement', 'lease_agreement', 'government_letter'],
      'Please select a valid address proof type'
    ),

  addressProofImage: yup
    .string()
    .required('Address proof image is required')
    .url('Please enter a valid image URL'),

  // Business Information (if applicable)
  businessName: yup.string().when('userType', {
    is: 'business',
    then: yup.string().required('Business name is required'),
    otherwise: yup.string().optional(),
  }),

  businessRegistrationNumber: yup.string().when('userType', {
    is: 'business',
    then: yup.string().required('Business registration number is required'),
    otherwise: yup.string().optional(),
  }),

  businessLicenseImage: yup.string().when('userType', {
    is: 'business',
    then: yup
      .string()
      .required('Business license image is required')
      .url('Please enter a valid image URL'),
    otherwise: yup.string().optional(),
  }),

  // Selfie Verification
  selfieImage: yup
    .string()
    .required('Selfie image is required')
    .url('Please enter a valid image URL'),

  // Consent
  consentToKYC: yup
    .boolean()
    .required('You must consent to KYC verification')
    .oneOf([true], 'You must consent to KYC verification'),

  consentToDataProcessing: yup
    .boolean()
    .required('You must consent to data processing')
    .oneOf([true], 'You must consent to data processing'),
});

// ========================================
// 8. BLOCKCHAIN TRANSACTION VALIDATION
// ========================================

export const blockchainTransactionSchema = yup.object({
  // Transaction Information
  transactionType: yup
    .string()
    .required('Transaction type is required')
    .oneOf(
      ['escrow', 'payment', 'refund', 'fine', 'reward'],
      'Please select a valid transaction type'
    ),

  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .min(0.000001, 'Amount must be at least 0.000001'),

  currency: yup
    .string()
    .required('Currency is required')
    .oneOf(['ETH', 'BTC', 'USDT', 'USDC', 'DAI'], 'Please select a valid cryptocurrency'),

  // Wallet Information
  fromAddress: yup
    .string()
    .required('From address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid Ethereum address'),

  toAddress: yup
    .string()
    .required('To address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid Ethereum address'),

  // Order Information
  orderId: yup.string().required('Order ID is required'),

  // Smart Contract Information
  contractAddress: yup
    .string()
    .required('Contract address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid contract address'),

  gasLimit: yup
    .number()
    .required('Gas limit is required')
    .positive('Gas limit must be positive')
    .min(21000, 'Gas limit must be at least 21,000')
    .max(10000000, 'Gas limit cannot exceed 10,000,000'),

  gasPrice: yup
    .number()
    .required('Gas price is required')
    .positive('Gas price must be positive')
    .min(1, 'Gas price must be at least 1 Gwei')
    .max(1000, 'Gas price cannot exceed 1000 Gwei'),

  // Metadata
  metadata: yup.object({
    orderId: yup.string().required('Order ID in metadata is required'),
    userId: yup.string().required('User ID in metadata is required'),
    timestamp: yup.number().required('Timestamp in metadata is required'),
    nonce: yup.number().required('Nonce in metadata is required'),
  }),
});

// ========================================
// 9. AI SCORING VALIDATION
// ========================================

export const aiScoringSchema = yup.object({
  // User Information
  userId: yup.string().required('User ID is required'),

  // Transaction History
  totalTransactions: yup
    .number()
    .required('Total transactions is required')
    .min(0, 'Total transactions cannot be negative'),

  successfulTransactions: yup
    .number()
    .required('Successful transactions is required')
    .min(0, 'Successful transactions cannot be negative'),

  failedTransactions: yup
    .number()
    .required('Failed transactions is required')
    .min(0, 'Failed transactions cannot be negative'),

  // Financial Metrics
  totalSpent: yup
    .number()
    .required('Total spent is required')
    .min(0, 'Total spent cannot be negative'),

  averageOrderValue: yup
    .number()
    .required('Average order value is required')
    .min(0, 'Average order value cannot be negative'),

  // Behavioral Metrics
  accountAge: yup
    .number()
    .required('Account age is required')
    .min(0, 'Account age cannot be negative'),

  lastLoginDate: yup.date().required('Last login date is required'),

  loginFrequency: yup
    .number()
    .required('Login frequency is required')
    .min(0, 'Login frequency cannot be negative'),

  // Risk Indicators
  chargebackRate: yup
    .number()
    .required('Chargeback rate is required')
    .min(0, 'Chargeback rate cannot be negative')
    .max(1, 'Chargeback rate cannot exceed 100%'),

  disputeRate: yup
    .number()
    .required('Dispute rate is required')
    .min(0, 'Dispute rate cannot be negative')
    .max(1, 'Dispute rate cannot exceed 100%'),

  // Device Information
  deviceFingerprint: yup.string().required('Device fingerprint is required'),

  ipAddress: yup
    .string()
    .required('IP address is required')
    .matches(
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Please enter a valid IP address'
    ),

  // Location Information
  country: yup.string().required('Country is required'),

  city: yup.string().required('City is required'),

  // Verification Status
  emailVerified: yup.boolean().required('Email verification status is required'),

  phoneVerified: yup.boolean().required('Phone verification status is required'),

  kycVerified: yup.boolean().required('KYC verification status is required'),

  // Social Proof
  socialConnections: yup
    .number()
    .required('Social connections is required')
    .min(0, 'Social connections cannot be negative'),

  reviewsCount: yup
    .number()
    .required('Reviews count is required')
    .min(0, 'Reviews count cannot be negative'),

  averageRating: yup
    .number()
    .required('Average rating is required')
    .min(0, 'Average rating cannot be negative')
    .max(5, 'Average rating cannot exceed 5'),
});

// ========================================
// 10. NOTIFICATION VALIDATION
// ========================================

export const notificationSchema = yup.object({
  // Notification Information
  type: yup
    .string()
    .required('Notification type is required')
    .oneOf(
      [
        'order_confirmation',
        'order_shipped',
        'order_delivered',
        'payment_received',
        'payment_failed',
        'dispute_opened',
        'dispute_resolved',
        'review_received',
        'account_verified',
        'security_alert',
        'promotional',
        'system_maintenance',
      ],
      'Please select a valid notification type'
    ),

  title: yup
    .string()
    .required('Notification title is required')
    .min(5, 'Notification title must be at least 5 characters')
    .max(100, 'Notification title must be less than 100 characters'),

  message: yup
    .string()
    .required('Notification message is required')
    .min(10, 'Notification message must be at least 10 characters')
    .max(500, 'Notification message must be less than 500 characters'),

  // Recipient Information
  recipientId: yup.string().required('Recipient ID is required'),

  recipientEmail: yup
    .string()
    .required('Recipient email is required')
    .email('Please enter a valid email address'),

  // Delivery Channels
  email: yup.boolean().default(true),

  sms: yup.boolean().default(false),

  push: yup.boolean().default(false),

  inApp: yup.boolean().default(true),

  // Priority
  priority: yup
    .string()
    .required('Priority is required')
    .oneOf(['low', 'normal', 'high', 'urgent'], 'Please select a valid priority'),

  // Scheduling
  scheduledAt: yup.date().min(new Date(), 'Scheduled time cannot be in the past'),

  // Metadata
  metadata: yup.object({
    orderId: yup.string().optional(),
    productId: yup.string().optional(),
    transactionId: yup.string().optional(),
    disputeId: yup.string().optional(),
  }),
});

// ========================================
// 11. SEARCH VALIDATION
// ========================================

export const searchSchema = yup.object({
  // Search Query
  query: yup
    .string()
    .required('Search query is required')
    .min(1, 'Search query must be at least 1 character')
    .max(200, 'Search query must be less than 200 characters'),

  // Filters
  category: yup
    .string()
    .oneOf(
      [
        'electronics',
        'clothing',
        'home',
        'books',
        'sports',
        'automotive',
        'health',
        'beauty',
        'toys',
        'other',
      ],
      'Please select a valid category'
    ),

  priceRange: yup.object({
    min: yup.number().min(0, 'Minimum price cannot be negative'),

    max: yup
      .number()
      .min(0, 'Maximum price cannot be negative')
      .test(
        'max-greater-than-min',
        'Maximum price must be greater than minimum price',
        function (value) {
          const min = this.parent.min;
          return !min || !value || value > min;
        }
      ),
  }),

  rating: yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),

  // Sorting
  sortBy: yup
    .string()
    .oneOf(
      ['relevance', 'price_low', 'price_high', 'rating', 'newest', 'popularity'],
      'Please select a valid sort option'
    ),

  sortOrder: yup.string().oneOf(['asc', 'desc'], 'Please select a valid sort order'),

  // Pagination
  page: yup.number().min(1, 'Page number must be at least 1').default(1),

  limit: yup
    .number()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit cannot exceed 100')
    .default(20),

  // Location
  location: yup.object({
    latitude: yup
      .number()
      .min(-90, 'Latitude must be between -90 and 90')
      .max(90, 'Latitude must be between -90 and 90'),

    longitude: yup
      .number()
      .min(-180, 'Longitude must be between -180 and 180')
      .max(180, 'Longitude must be between -180 and 180'),

    radius: yup
      .number()
      .min(1, 'Radius must be at least 1 km')
      .max(1000, 'Radius cannot exceed 1000 km')
      .default(50),
  }),
});

// ========================================
// 12. ANALYTICS VALIDATION
// ========================================

export const analyticsSchema = yup.object({
  // Event Information
  eventType: yup
    .string()
    .required('Event type is required')
    .oneOf(
      [
        'page_view',
        'product_view',
        'add_to_cart',
        'remove_from_cart',
        'purchase',
        'search',
        'filter',
        'sort',
        'review',
        'rating',
        'share',
        'wishlist_add',
        'wishlist_remove',
        'login',
        'logout',
        'signup',
        'password_reset',
        'email_click',
        'banner_click',
        'error',
      ],
      'Please select a valid event type'
    ),

  // User Information
  userId: yup.string().required('User ID is required'),

  sessionId: yup.string().required('Session ID is required'),

  // Page Information
  pageUrl: yup.string().required('Page URL is required').url('Please enter a valid URL'),

  pageTitle: yup.string().required('Page title is required'),

  referrer: yup.string().url('Please enter a valid referrer URL'),

  // Device Information
  userAgent: yup.string().required('User agent is required'),

  deviceType: yup
    .string()
    .oneOf(['desktop', 'mobile', 'tablet'], 'Please select a valid device type'),

  browser: yup.string().required('Browser is required'),

  os: yup.string().required('Operating system is required'),

  // Location Information
  ipAddress: yup
    .string()
    .required('IP address is required')
    .matches(
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Please enter a valid IP address'
    ),

  country: yup.string().required('Country is required'),

  city: yup.string().required('City is required'),

  // Timestamp
  timestamp: yup
    .date()
    .required('Timestamp is required')
    .max(new Date(), 'Timestamp cannot be in the future'),

  // Properties
  properties: yup.object({
    productId: yup.string().optional(),
    productName: yup.string().optional(),
    productCategory: yup.string().optional(),
    productPrice: yup.number().optional(),
    orderId: yup.string().optional(),
    orderValue: yup.number().optional(),
    searchQuery: yup.string().optional(),
    filterValue: yup.string().optional(),
    sortValue: yup.string().optional(),
    rating: yup.number().optional(),
    reviewLength: yup.number().optional(),
    errorMessage: yup.string().optional(),
    errorCode: yup.string().optional(),
  }),
});

// ========================================
// EXPORT ALL SCHEMAS
// ========================================

export const validationSchemas = {
  userRegistration: userRegistrationSchema,
  product: productSchema,
  order: orderSchema,
  payment: paymentSchema,
  review: reviewSchema,
  dispute: disputeSchema,
  kyc: kycSchema,
  blockchainTransaction: blockchainTransactionSchema,
  aiScoring: aiScoringSchema,
  notification: notificationSchema,
  search: searchSchema,
  analytics: analyticsSchema,
};

// ========================================
// VALIDATION UTILITIES
// ========================================

export const validateField = async (schema: any, data: any) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: [] };
  } catch (error: any) {
    return {
      isValid: false,
      errors: error.errors,
    };
  }
};

export const validatePartial = async (schema: any, data: any, fields: string[]) => {
  try {
    const partialSchema = schema.pick(fields);
    await partialSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: [] };
  } catch (error: any) {
    return {
      isValid: false,
      errors: error.errors,
    };
  }
};

export const sanitizeData = (data: any) => {
  // Remove HTML tags and scripts
  const sanitizeString = (str: string) => {
    return str
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .trim();
  };

  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    }
    if (typeof obj === 'object' && obj !== null) {
      const sanitized: any = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    }
    return obj;
  };

  return sanitizeObject(data);
};

export const validateAndSanitize = async (schema: any, data: any) => {
  const sanitizedData = sanitizeData(data);
  const validation = await validateField(schema, sanitizedData);

  return {
    ...validation,
    data: sanitizedData,
  };
};
