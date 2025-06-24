// ========================================
// 1. GOSELLR SERVICE - API INTEGRATION
// ========================================

import { ethers } from 'ethers';

// ========================================
// 2. TYPE DEFINITIONS
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
  createdAt: Date;
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

// ========================================
// 3. API CONFIGURATION
// ========================================

const API_BASE_URL = process.env.NEXT_PUBLIC_GOSELLR_API_URL || 'http://localhost:3000/api/gosellr';
const BLOCKCHAIN_RPC_URL = process.env.NEXT_PUBLIC_BLOCKCHAIN_RPC_URL || 'https://polygon-rpc.com';

class GoSellrService {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Signer | null = null;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(BLOCKCHAIN_RPC_URL);
  }

  // ========================================
  // 4. WALLET CONNECTION
  // ========================================

  async connectWallet(): Promise<string> {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.signer = this.provider.getSigner();
        const address = await this.signer.getAddress();
        return address;
      } else {
        throw new Error('MetaMask not found');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  async getWalletBalance(address: string): Promise<number> {
    try {
      const balance = await this.provider.getBalance(address);
      return parseFloat(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      throw error;
    }
  }

  // ========================================
  // 5. USER MANAGEMENT
  // ========================================

  async getUser(userId: string): Promise<GoSellrUser> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async updateUser(userId: string, userData: Partial<GoSellrUser>): Promise<GoSellrUser> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Failed to update user');
      return response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async verifyKYC(userId: string, kycData: Partial<GoSellrKYC>): Promise<GoSellrKYC> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/kyc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kycData),
      });
      if (!response.ok) throw new Error('Failed to submit KYC');
      return response.json();
    } catch (error) {
      console.error('Error submitting KYC:', error);
      throw error;
    }
  }

  // ========================================
  // 6. PRODUCT MANAGEMENT
  // ========================================

  async getProducts(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: GoSellrProduct[]; total: number; page: number; limit: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) queryParams.append(key, value.toString());
        });
      }

      const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProduct(productId: string): Promise<GoSellrProduct> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async createProduct(
    sellerId: string,
    productData: Partial<GoSellrProduct>
  ): Promise<GoSellrProduct> {
    try {
      const response = await fetch(`${API_BASE_URL}/sellers/${sellerId}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(
    productId: string,
    productData: Partial<GoSellrProduct>
  ): Promise<GoSellrProduct> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // ========================================
  // 7. ORDER MANAGEMENT
  // ========================================

  async createOrder(orderData: {
    userId: string;
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethod: PaymentMethod;
  }): Promise<GoSellrOrder> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error('Failed to create order');
      return response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getOrder(orderId: string): Promise<GoSellrOrder> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      if (!response.ok) throw new Error('Failed to fetch order');
      return response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  async getUserOrders(userId: string, status?: OrderStatus): Promise<GoSellrOrder[]> {
    try {
      const queryParams = status ? `?status=${status}` : '';
      const response = await fetch(`${API_BASE_URL}/users/${userId}/orders${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch user orders');
      return response.json();
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<GoSellrOrder> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update order status');
      return response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  // ========================================
  // 8. PAYMENT & BLOCKCHAIN
  // ========================================

  async processPayment(
    orderId: string,
    paymentData: {
      method: PaymentMethod;
      amount: number;
      walletAddress: string;
    }
  ): Promise<BlockchainTransaction> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) throw new Error('Failed to process payment');
      return response.json();
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  async releaseEscrow(orderId: string, sellerAddress: string): Promise<BlockchainTransaction> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/release-escrow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sellerAddress }),
      });
      if (!response.ok) throw new Error('Failed to release escrow');
      return response.json();
    } catch (error) {
      console.error('Error releasing escrow:', error);
      throw error;
    }
  }

  async getTransactionStatus(txHash: string): Promise<BlockchainTransaction> {
    try {
      const response = await fetch(`${API_BASE_URL}/blockchain/transaction/${txHash}`);
      if (!response.ok) throw new Error('Failed to get transaction status');
      return response.json();
    } catch (error) {
      console.error('Error getting transaction status:', error);
      throw error;
    }
  }

  // ========================================
  // 9. REVIEWS & RATINGS
  // ========================================

  async createReview(reviewData: {
    productId: string;
    userId: string;
    orderId: string;
    rating: number;
    title: string;
    content: string;
    images?: string[];
  }): Promise<GoSellrReview> {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error('Failed to create review');
      return response.json();
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }

  async getProductReviews(
    productId: string,
    page?: number,
    limit?: number
  ): Promise<{
    reviews: GoSellrReview[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append('page', page.toString());
      if (limit) queryParams.append('limit', limit.toString());

      const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  // ========================================
  // 10. DISPUTES & SUPPORT
  // ========================================

  async createDispute(disputeData: {
    orderId: string;
    userId: string;
    sellerId: string;
    type: DisputeType;
    reason: string;
    amount: number;
    evidence?: string[];
  }): Promise<GoSellrDispute> {
    try {
      const response = await fetch(`${API_BASE_URL}/disputes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(disputeData),
      });
      if (!response.ok) throw new Error('Failed to create dispute');
      return response.json();
    } catch (error) {
      console.error('Error creating dispute:', error);
      throw error;
    }
  }

  async getDispute(disputeId: string): Promise<GoSellrDispute> {
    try {
      const response = await fetch(`${API_BASE_URL}/disputes/${disputeId}`);
      if (!response.ok) throw new Error('Failed to fetch dispute');
      return response.json();
    } catch (error) {
      console.error('Error fetching dispute:', error);
      throw error;
    }
  }

  async updateDispute(
    disputeId: string,
    updateData: Partial<GoSellrDispute>
  ): Promise<GoSellrDispute> {
    try {
      const response = await fetch(`${API_BASE_URL}/disputes/${disputeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) throw new Error('Failed to update dispute');
      return response.json();
    } catch (error) {
      console.error('Error updating dispute:', error);
      throw error;
    }
  }

  // ========================================
  // 11. AI & ANALYTICS
  // ========================================

  async calculateAIScore(userId: string): Promise<AIScore> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/calculate-score/${userId}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to calculate AI score');
      return response.json();
    } catch (error) {
      console.error('Error calculating AI score:', error);
      throw error;
    }
  }

  async getAnalytics(userId: string, period: 'day' | 'week' | 'month' | 'year'): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/${userId}?period=${period}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  // ========================================
  // 12. NOTIFICATIONS
  // ========================================

  async getNotifications(userId: string, unreadOnly?: boolean): Promise<any[]> {
    try {
      const queryParams = unreadOnly ? '?unread=true' : '';
      const response = await fetch(`${API_BASE_URL}/users/${userId}/notifications${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch notifications');
      return response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Failed to mark notification as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  // ========================================
  // 13. ERROR HANDLING
  // ========================================

  private handleError(error: any, context: string): never {
    console.error(`GoSellr Service Error in ${context}:`, error);

    if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network Error: Unable to connect to GoSellr API');
    } else {
      throw new Error(`GoSellr Error: ${error.message}`);
    }
  }

  // ========================================
  // 14. UTILITY METHODS
  // ========================================

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  shortenAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  validateAddress(address: string): boolean {
    return ethers.utils.isAddress(address);
  }

  async estimateGas(transaction: any): Promise<number> {
    try {
      const gasEstimate = await this.provider.estimateGas(transaction);
      return gasEstimate.toNumber();
    } catch (error) {
      console.error('Error estimating gas:', error);
      throw error;
    }
  }
}

// ========================================
// 15. EXPORT SINGLETON INSTANCE
// ========================================

export const goSellrService = new GoSellrService();

// ========================================
// 16. HOOKS FOR REACT COMPONENTS
// ========================================

export function useGoSellrService() {
  return goSellrService;
}

// ========================================
// 17. CONSTANTS
// ========================================

export const GOSELLR_CONSTANTS = {
  SUPPORTED_CURRENCIES: ['USD', 'EUR', 'GBP', 'CAD'],
  SUPPORTED_BLOCKCHAINS: ['ethereum', 'polygon', 'binance'],
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_IMAGES_PER_PRODUCT: 10,
  MIN_PRODUCT_PRICE: 0.01,
  MAX_PRODUCT_PRICE: 1000000,
  ESCROW_FEE_PERCENTAGE: 2.5,
  PLATFORM_FEE_PERCENTAGE: 1.5,
  KYC_REQUIRED_AMOUNT: 1000, // USD
  DISPUTE_TIMEOUT_DAYS: 30,
  ORDER_CANCELLATION_WINDOW_HOURS: 24,
} as const;
