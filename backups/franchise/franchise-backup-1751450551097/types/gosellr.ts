export type FranchiseType = 'retail' | 'wholesale' | 'dropship';

export interface FranchiseConfig {
  id: FranchiseType;
  name: string;
  description: string;
  features: string[];
  requirements: {
    sqlLevel: number;
    investment: string;
    documents: string[];
  };
  benefits: string[];
}

export interface StoreSetup {
  id: string;
  franchiseType: FranchiseType;
  name: string;
  description: string;
  logo?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  variants?: {
    id: string;
    name: string;
    price: number;
    stock: number;
  }[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'cod';
  details: {
    name: string;
    number?: string;
    expiry?: string;
    upiId?: string;
    bankName?: string;
  };
  isDefault: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  isAvailable: boolean;
}

export interface Order {
  id: string;
  storeId: string;
  customerId: string;
  products: {
    id: string;
    quantity: number;
    price: number;
    variantId?: string;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ========================================
// GOSELLR TYPE DEFINITIONS
// ========================================

export interface GoSellrUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  kycVerified: boolean;
  trustScore: number;
  walletBalance: number;
  isSeller: boolean;
  sellerInfo?: SellerInfo;
  blockchainAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SellerInfo {
  businessName: string;
  businessType: string;
  verified: boolean;
  rating: number;
  totalSales: number;
  totalProducts: number;
  sellerSince: Date;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
}

export interface GoSellrProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  currency: string;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  rating: number;
  reviewCount: number;
  seller: GoSellrSeller;
  stock: number;
  shipping: ShippingInfo;
  features: string[];
  tags: string[];
  blockchain: BlockchainInfo;
  aiScore: AIScore;
  sku: string;
  sizes?: string[];
  colors?: ColorOption[];
  status: 'active' | 'inactive' | 'out_of_stock';
  createdAt: Date;
  updatedAt: Date;
}

export interface GoSellrSeller {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
  location: string;
  blockchainAddress: string;
  trustScore: number;
  totalSales: number;
  totalProducts: number;
}

export interface ShippingInfo {
  free: boolean;
  cost: number;
  estimatedDays: string;
  methods: ShippingMethod[];
}

export interface ShippingMethod {
  id: string;
  name: string;
  cost: number;
  estimatedDays: string;
  available: boolean;
}

export interface BlockchainInfo {
  escrowEnabled: boolean;
  smartContract: string;
  nftAvailable: boolean;
  tokenId?: string;
  blockchain: 'ethereum' | 'polygon' | 'binance';
  gasEstimate: number;
}

export interface AIScore {
  trustScore: number;
  riskScore: number;
  recommendationScore: number;
  fraudScore: number;
  reliabilityScore: number;
  calculatedAt: Date;
}

export interface ColorOption {
  name: string;
  value: string;
  available: boolean;
}

export interface GoSellrOrder {
  id: string;
  userId: string;
  sellerId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  blockchainTransaction: BlockchainTransaction;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  sellerId: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'disputed';

export type PaymentMethod = 'escrow' | 'direct' | 'crypto' | 'credit_card';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BlockchainTransaction {
  hash: string;
  blockNumber: number;
  gasUsed: number;
  gasPrice: number;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations: number;
  timestamp: Date;
}

export interface GoSellrReview {
  id: string;
  productId: string;
  userId: string;
  orderId: string;
  rating: number;
  title: string;
  content: string;
  images: string[];
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: Date;
}

export interface GoSellrDispute {
  id: string;
  orderId: string;
  userId: string;
  sellerId: string;
  type: DisputeType;
  reason: string;
  status: DisputeStatus;
  amount: number;
  evidence: string[];
  resolution?: string;
  resolvedAt?: Date;
}

export type DisputeType =
  | 'item_not_received'
  | 'item_not_as_described'
  | 'damaged_item'
  | 'wrong_item';

export type DisputeStatus = 'open' | 'under_review' | 'resolved' | 'closed';

export interface GoSellrKYC {
  id: string;
  userId: string;
  documentType: string;
  documentNumber: string;
  documentImages: string[];
  status: KYCStatus;
  submittedAt: Date;
  verifiedAt?: Date;
  rejectionReason?: string;
}

export type KYCStatus = 'pending' | 'approved' | 'rejected';

export interface GoSellrAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  customerRating: number;
  totalCustomers: number;
  newCustomers: number;
  disputeRate: number;
  completionRate: number;
  averageOrderValue: number;
  topSellingCategory: string;
  blockchainTransactions: number;
  escrowFunds: number;
  aiTrustScore: number;
  aiRiskScore: number;
}

export interface GoSellrNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: string;
  userId: string;
}

export interface GoSellrShop {
  id: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  ownerId: string;
  category: string;
  rating: number;
  totalProducts: number;
  totalSales: number;
  verified: boolean;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}
