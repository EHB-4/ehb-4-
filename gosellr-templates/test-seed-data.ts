// GoSellr Test & Seed Data Template
// Comprehensive test data and seeding system for GoSellr platform

// ========================================
// 1. TEST DATA GENERATORS
// ========================================

export class TestDataGenerator {
  private static readonly FIRST_NAMES = [
    'John',
    'Jane',
    'Michael',
    'Sarah',
    'David',
    'Emily',
    'James',
    'Jessica',
    'Robert',
    'Amanda',
    'William',
    'Ashley',
    'Richard',
    'Stephanie',
    'Joseph',
    'Nicole',
    'Thomas',
    'Elizabeth',
    'Christopher',
    'Helen',
    'Charles',
    'Deborah',
    'Daniel',
    'Rachel',
    'Matthew',
    'Carolyn',
    'Anthony',
    'Janet',
    'Mark',
    'Catherine',
  ];

  private static readonly LAST_NAMES = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
    'Lee',
    'Perez',
    'Thompson',
    'White',
    'Harris',
    'Sanchez',
    'Clark',
    'Ramirez',
    'Lewis',
    'Robinson',
    'Walker',
    'Young',
    'Allen',
    'King',
  ];

  private static readonly EMAIL_DOMAINS = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'protonmail.com',
    'aol.com',
    'live.com',
    'msn.com',
    'yandex.com',
  ];

  private static readonly PHONE_PREFIXES = [
    '+1',
    '+44',
    '+33',
    '+49',
    '+81',
    '+86',
    '+91',
    '+7',
    '+55',
    '+61',
  ];

  private static readonly COUNTRIES = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
    'India',
    'Brazil',
    'Russia',
    'South Korea',
    'Italy',
    'Spain',
    'Mexico',
    'Netherlands',
    'Sweden',
    'Switzerland',
  ];

  private static readonly CITIES = [
    'New York',
    'London',
    'Toronto',
    'Sydney',
    'Berlin',
    'Paris',
    'Tokyo',
    'Beijing',
    'Mumbai',
    'São Paulo',
    'Moscow',
    'Seoul',
    'Rome',
    'Madrid',
    'Mexico City',
    'Amsterdam',
    'Stockholm',
    'Zurich',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
  ];

  private static readonly PRODUCT_CATEGORIES = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Books',
    'Sports & Outdoors',
    'Automotive',
    'Health & Beauty',
    'Toys & Games',
    'Baby Products',
    'Pet Supplies',
    'Office Products',
    'Tools & Hardware',
    'Jewelry',
    'Watches',
    'Shoes',
    'Bags & Accessories',
    'Food & Beverages',
  ];

  private static readonly PRODUCT_BRANDS = [
    'Apple',
    'Samsung',
    'Nike',
    'Adidas',
    'Sony',
    'LG',
    'Dell',
    'HP',
    'Canon',
    'Nikon',
    'Coca-Cola',
    'Pepsi',
    'Nestle',
    'Unilever',
    'Procter & Gamble',
    'Johnson & Johnson',
    'Toyota',
    'Honda',
  ];

  // ========================================
  // 2. USER DATA GENERATORS
  // ========================================

  static generateUser(overrides: Partial<UserData> = {}): UserData {
    const firstName = this.getRandomElement(this.FIRST_NAMES);
    const lastName = this.getRandomElement(this.LAST_NAMES);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${this.getRandomElement(this.EMAIL_DOMAINS)}`;

    return {
      id: this.generateUUID(),
      firstName,
      lastName,
      email,
      phone: this.generatePhoneNumber(),
      dateOfBirth: this.generateDateOfBirth(),
      address: this.generateAddress(),
      kycVerified: Math.random() > 0.3,
      emailVerified: Math.random() > 0.2,
      phoneVerified: Math.random() > 0.4,
      accountStatus: this.getRandomElement(['active', 'pending', 'suspended']),
      createdAt: this.generateRandomDate(new Date(2020, 0, 1), new Date()),
      ...overrides,
    };
  }

  static generateUsers(count: number, overrides: Partial<UserData> = {}): UserData[] {
    return Array.from({ length: count }, () => this.generateUser(overrides));
  }

  static generateSeller(overrides: Partial<SellerData> = {}): SellerData {
    const user = this.generateUser();

    return {
      ...user,
      businessName: `${user.firstName} ${user.lastName} Store`,
      businessType: this.getRandomElement(['individual', 'company', 'partnership']),
      businessRegistrationNumber: this.generateBusinessRegistrationNumber(),
      businessAddress: this.generateAddress(),
      businessPhone: this.generatePhoneNumber(),
      businessEmail: `business.${user.email}`,
      sellerRating: this.generateRating(1, 5),
      totalSales: this.generateRandomNumber(0, 100000),
      totalProducts: this.generateRandomNumber(1, 1000),
      verifiedSeller: Math.random() > 0.4,
      sellerSince: this.generateRandomDate(new Date(2018, 0, 1), new Date()),
      ...overrides,
    };
  }

  static generateSellers(count: number, overrides: Partial<SellerData> = {}): SellerData[] {
    return Array.from({ length: count }, () => this.generateSeller(overrides));
  }

  // ========================================
  // 3. PRODUCT DATA GENERATORS
  // ========================================

  static generateProduct(overrides: Partial<ProductData> = {}): ProductData {
    const category = this.getRandomElement(this.PRODUCT_CATEGORIES);
    const brand = this.getRandomElement(this.PRODUCT_BRANDS);
    const name = this.generateProductName(category, brand);

    return {
      id: this.generateUUID(),
      name,
      description: this.generateProductDescription(name, category),
      category,
      subcategory: this.generateSubcategory(category),
      brand,
      price: this.generatePrice(10, 2000),
      currency: this.getRandomElement(['USD', 'EUR', 'GBP', 'CAD']),
      quantity: this.generateRandomNumber(0, 1000),
      sku: this.generateSKU(),
      weight: this.generateRandomNumber(0.1, 50),
      dimensions: this.generateDimensions(),
      images: this.generateProductImages(),
      tags: this.generateProductTags(category),
      sellerId: this.generateUUID(),
      rating: this.generateRating(1, 5),
      reviewCount: this.generateRandomNumber(0, 500),
      status: this.getRandomElement(['active', 'inactive', 'out_of_stock']),
      createdAt: this.generateRandomDate(new Date(2020, 0, 1), new Date()),
      ...overrides,
    };
  }

  static generateProducts(count: number, overrides: Partial<ProductData> = {}): ProductData[] {
    return Array.from({ length: count }, () => this.generateProduct(overrides));
  }

  // ========================================
  // 4. ORDER DATA GENERATORS
  // ========================================

  static generateOrder(overrides: Partial<OrderData> = {}): OrderData {
    const items = this.generateOrderItems(this.generateRandomNumber(1, 5));
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = this.generateRandomNumber(5, 25);
    const total = subtotal + tax + shipping;

    return {
      id: this.generateUUID(),
      userId: this.generateUUID(),
      sellerId: this.generateUUID(),
      items,
      subtotal,
      tax,
      shipping,
      total,
      status: this.getRandomElement(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
      paymentMethod: this.getRandomElement(['credit_card', 'paypal', 'crypto', 'bank_transfer']),
      paymentStatus: this.getRandomElement(['pending', 'completed', 'failed', 'refunded']),
      shippingAddress: this.generateAddress(),
      billingAddress: this.generateAddress(),
      trackingNumber: this.generateTrackingNumber(),
      estimatedDelivery: this.generateEstimatedDelivery(),
      createdAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
      ...overrides,
    };
  }

  static generateOrders(count: number, overrides: Partial<OrderData> = {}): OrderData[] {
    return Array.from({ length: count }, () => this.generateOrder(overrides));
  }

  // ========================================
  // 5. TRANSACTION DATA GENERATORS
  // ========================================

  static generateTransaction(overrides: Partial<TransactionData> = {}): TransactionData {
    return {
      id: this.generateUUID(),
      orderId: this.generateUUID(),
      userId: this.generateUUID(),
      sellerId: this.generateUUID(),
      amount: this.generateRandomNumber(10, 5000),
      currency: this.getRandomElement(['USD', 'EUR', 'GBP', 'CAD']),
      type: this.getRandomElement(['purchase', 'refund', 'escrow', 'release', 'fine']),
      status: this.getRandomElement(['pending', 'completed', 'failed', 'cancelled']),
      paymentMethod: this.getRandomElement(['credit_card', 'paypal', 'crypto', 'bank_transfer']),
      blockchainTransactionHash: this.generateBlockchainHash(),
      gasUsed: this.generateRandomNumber(21000, 500000),
      gasPrice: this.generateRandomNumber(1, 100),
      createdAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
      ...overrides,
    };
  }

  static generateTransactions(
    count: number,
    overrides: Partial<TransactionData> = {}
  ): TransactionData[] {
    return Array.from({ length: count }, () => this.generateTransaction(overrides));
  }

  // ========================================
  // 6. REVIEW DATA GENERATORS
  // ========================================

  static generateReview(overrides: Partial<ReviewData> = {}): ReviewData {
    return {
      id: this.generateUUID(),
      productId: this.generateUUID(),
      userId: this.generateUUID(),
      orderId: this.generateUUID(),
      rating: this.generateRating(1, 5),
      title: this.generateReviewTitle(),
      content: this.generateReviewContent(),
      images: this.generateReviewImages(),
      verifiedPurchase: Math.random() > 0.3,
      helpfulCount: this.generateRandomNumber(0, 50),
      createdAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
      ...overrides,
    };
  }

  static generateReviews(count: number, overrides: Partial<ReviewData> = {}): ReviewData[] {
    return Array.from({ length: count }, () => this.generateReview(overrides));
  }

  // ========================================
  // 7. DISPUTE DATA GENERATORS
  // ========================================

  static generateDispute(overrides: Partial<DisputeData> = {}): DisputeData {
    return {
      id: this.generateUUID(),
      orderId: this.generateUUID(),
      userId: this.generateUUID(),
      sellerId: this.generateUUID(),
      type: this.getRandomElement([
        'item_not_received',
        'item_not_as_described',
        'damaged_item',
        'wrong_item',
      ]),
      reason: this.generateDisputeReason(),
      status: this.getRandomElement(['open', 'under_review', 'resolved', 'closed']),
      amount: this.generateRandomNumber(10, 1000),
      evidence: this.generateDisputeEvidence(),
      resolution: this.generateDisputeResolution(),
      createdAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
      resolvedAt:
        Math.random() > 0.5 ? this.generateRandomDate(new Date(2023, 0, 1), new Date()) : null,
      ...overrides,
    };
  }

  static generateDisputes(count: number, overrides: Partial<DisputeData> = {}): DisputeData[] {
    return Array.from({ length: count }, () => this.generateDispute(overrides));
  }

  // ========================================
  // 8. KYC DATA GENERATORS
  // ========================================

  static generateKYC(overrides: Partial<KYCData> = {}): KYCData {
    return {
      id: this.generateUUID(),
      userId: this.generateUUID(),
      documentType: this.getRandomElement(['passport', 'drivers_license', 'national_id', 'ssn']),
      documentNumber: this.generateDocumentNumber(),
      documentImages: this.generateDocumentImages(),
      status: this.getRandomElement(['pending', 'approved', 'rejected']),
      submittedAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
      verifiedAt:
        Math.random() > 0.3 ? this.generateRandomDate(new Date(2023, 0, 1), new Date()) : null,
      rejectionReason: Math.random() > 0.7 ? this.generateRejectionReason() : null,
      ...overrides,
    };
  }

  static generateKYCs(count: number, overrides: Partial<KYCData> = {}): KYCData[] {
    return Array.from({ length: count }, () => this.generateKYC(overrides));
  }

  // ========================================
  // 9. AI SCORING DATA GENERATORS
  // ========================================

  static generateAIScore(overrides: Partial<AIScoreData> = {}): AIScoreData {
    return {
      id: this.generateUUID(),
      userId: this.generateUUID(),
      trustScore: this.generateRandomNumber(0, 100),
      riskScore: this.generateRandomNumber(0, 100),
      fraudScore: this.generateRandomNumber(0, 100),
      reliabilityScore: this.generateRandomNumber(0, 100),
      riskLevel: this.getRandomElement(['low', 'medium', 'high', 'very_high']),
      riskFactors: this.generateRiskFactors(),
      confidenceScore: this.generateRandomNumber(0.5, 1),
      dataQuality: this.generateRandomNumber(0.6, 1),
      calculatedAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
      ...overrides,
    };
  }

  static generateAIScores(count: number, overrides: Partial<AIScoreData> = {}): AIScoreData[] {
    return Array.from({ length: count }, () => this.generateAIScore(overrides));
  }

  // ========================================
  // 10. HELPER METHODS
  // ========================================

  private static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static generateRating(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
  }

  private static generatePhoneNumber(): string {
    const prefix = this.getRandomElement(this.PHONE_PREFIXES);
    const number = Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, '0');
    return `${prefix}${number}`;
  }

  private static generateDateOfBirth(): Date {
    const start = new Date(1960, 0, 1);
    const end = new Date(2005, 0, 1);
    return this.generateRandomDate(start, end);
  }

  private static generateRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private static generateAddress(): Address {
    return {
      street: `${this.generateRandomNumber(1, 9999)} ${this.getRandomElement(['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Maple Dr'])}`,
      city: this.getRandomElement(this.CITIES),
      state: this.getRandomElement(['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI']),
      zipCode: this.generateRandomNumber(10000, 99999).toString(),
      country: this.getRandomElement(this.COUNTRIES),
    };
  }

  private static generateBusinessRegistrationNumber(): string {
    return `BR${this.generateRandomNumber(100000, 999999)}`;
  }

  private static generateProductName(category: string, brand: string): string {
    const adjectives = [
      'Premium',
      'Professional',
      'Advanced',
      'Smart',
      'Ultra',
      'Pro',
      'Elite',
      'Classic',
    ];
    const nouns = ['Device', 'Tool', 'System', 'Solution', 'Kit', 'Set', 'Pack', 'Bundle'];

    return `${this.getRandomElement(adjectives)} ${brand} ${this.getRandomElement(nouns)}`;
  }

  private static generateProductDescription(name: string, category: string): string {
    return `High-quality ${category.toLowerCase()} product. ${name} offers excellent performance and durability. Perfect for everyday use.`;
  }

  private static generateSubcategory(category: string): string {
    const subcategories = {
      Electronics: ['Smartphones', 'Laptops', 'Tablets', 'Accessories', 'Audio'],
      Clothing: ['Men', 'Women', 'Kids', 'Shoes', 'Accessories'],
      'Home & Garden': ['Furniture', 'Decor', 'Kitchen', 'Garden', 'Tools'],
      Books: ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Reference'],
      'Sports & Outdoors': ['Fitness', 'Camping', 'Hiking', 'Swimming', 'Team Sports'],
    };

    return this.getRandomElement(subcategories[category] || ['General']);
  }

  private static generatePrice(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  }

  private static generateSKU(): string {
    return `SKU${this.generateRandomNumber(100000, 999999)}`;
  }

  private static generateDimensions(): Dimensions {
    return {
      length: this.generateRandomNumber(1, 100),
      width: this.generateRandomNumber(1, 100),
      height: this.generateRandomNumber(1, 100),
    };
  }

  private static generateProductImages(): string[] {
    const count = this.generateRandomNumber(1, 5);
    return Array.from(
      { length: count },
      (_, i) => `https://picsum.photos/400/400?random=${this.generateRandomNumber(1, 1000)}`
    );
  }

  private static generateProductTags(category: string): string[] {
    const tags = [category, 'popular', 'trending', 'new', 'sale'];
    return tags.slice(0, this.generateRandomNumber(2, 4));
  }

  private static generateOrderItems(count: number): OrderItem[] {
    return Array.from({ length: count }, () => ({
      productId: this.generateUUID(),
      productName: this.generateProductName('Electronics', 'Brand'),
      quantity: this.generateRandomNumber(1, 5),
      price: this.generatePrice(10, 500),
      total: 0, // Will be calculated
    }));
  }

  private static generateTrackingNumber(): string {
    return `TRK${this.generateRandomNumber(100000000, 999999999)}`;
  }

  private static generateEstimatedDelivery(): Date {
    const now = new Date();
    return new Date(now.getTime() + this.generateRandomNumber(1, 14) * 24 * 60 * 60 * 1000);
  }

  private static generateBlockchainHash(): string {
    return `0x${this.generateUUID().replace(/-/g, '')}`;
  }

  private static generateReviewTitle(): string {
    const titles = [
      'Great product!',
      'Excellent quality',
      'Highly recommended',
      'Good value',
      'Satisfied customer',
    ];
    return this.getRandomElement(titles);
  }

  private static generateReviewContent(): string {
    const contents = [
      'This product exceeded my expectations. Great quality and fast delivery.',
      'Very satisfied with this purchase. Would definitely recommend to others.',
      'Good product for the price. Meets all my needs perfectly.',
      'Excellent service and product quality. Will buy again.',
      'Fast shipping and great customer service. Product works as described.',
    ];
    return this.getRandomElement(contents);
  }

  private static generateReviewImages(): string[] {
    return Math.random() > 0.7 ? [this.generateProductImages()[0]] : [];
  }

  private static generateDisputeReason(): string {
    const reasons = [
      'Item not received within expected timeframe',
      'Product does not match description',
      'Item arrived damaged',
      'Wrong item received',
      'Quality issues with the product',
    ];
    return this.getRandomElement(reasons);
  }

  private static generateDisputeEvidence(): string[] {
    return Math.random() > 0.5 ? [this.generateProductImages()[0]] : [];
  }

  private static generateDisputeResolution(): string {
    const resolutions = [
      'Refund issued',
      'Replacement sent',
      'Partial refund',
      'Dispute closed',
      'Escalated to support',
    ];
    return this.getRandomElement(resolutions);
  }

  private static generateDocumentNumber(): string {
    return `DOC${this.generateRandomNumber(100000000, 999999999)}`;
  }

  private static generateDocumentImages(): string[] {
    return [this.generateProductImages()[0]];
  }

  private static generateRejectionReason(): string {
    const reasons = [
      'Document unclear',
      'Information mismatch',
      'Expired document',
      'Incomplete submission',
    ];
    return this.getRandomElement(reasons);
  }

  private static generateRiskFactors(): string[] {
    const factors = [
      'New account',
      'High transaction value',
      'Multiple locations',
      'Suspicious activity',
    ];
    return factors.slice(0, this.generateRandomNumber(0, 3));
  }
}

// ========================================
// 11. DATA INTERFACES
// ========================================

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: Address;
  kycVerified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  accountStatus: string;
  createdAt: Date;
}

export interface SellerData extends UserData {
  businessName: string;
  businessType: string;
  businessRegistrationNumber: string;
  businessAddress: Address;
  businessPhone: string;
  businessEmail: string;
  sellerRating: number;
  totalSales: number;
  totalProducts: number;
  verifiedSeller: boolean;
  sellerSince: Date;
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  currency: string;
  quantity: number;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  images: string[];
  tags: string[];
  sellerId: string;
  rating: number;
  reviewCount: number;
  status: string;
  createdAt: Date;
}

export interface OrderData {
  id: string;
  userId: string;
  sellerId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber: string;
  estimatedDelivery: Date;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface TransactionData {
  id: string;
  orderId: string;
  userId: string;
  sellerId: string;
  amount: number;
  currency: string;
  type: string;
  status: string;
  paymentMethod: string;
  blockchainTransactionHash: string;
  gasUsed: number;
  gasPrice: number;
  createdAt: Date;
}

export interface ReviewData {
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

export interface DisputeData {
  id: string;
  orderId: string;
  userId: string;
  sellerId: string;
  type: string;
  reason: string;
  status: string;
  amount: number;
  evidence: string[];
  resolution: string;
  createdAt: Date;
  resolvedAt: Date | null;
}

export interface KYCData {
  id: string;
  userId: string;
  documentType: string;
  documentNumber: string;
  documentImages: string[];
  status: string;
  submittedAt: Date;
  verifiedAt: Date | null;
  rejectionReason: string | null;
}

export interface AIScoreData {
  id: string;
  userId: string;
  trustScore: number;
  riskScore: number;
  fraudScore: number;
  reliabilityScore: number;
  riskLevel: string;
  riskFactors: string[];
  confidenceScore: number;
  dataQuality: number;
  calculatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

// ========================================
// 12. SEED DATA FUNCTIONS
// ========================================

export class SeedDataManager {
  private generator: TestDataGenerator;

  constructor() {
    this.generator = TestDataGenerator;
  }

  async seedDatabase(): Promise<void> {
    console.log('🌱 Starting database seeding...');

    try {
      // Generate users
      const users = this.generator.generateUsers(100);
      console.log(`✅ Generated ${users.length} users`);

      // Generate sellers
      const sellers = this.generator.generateSellers(50);
      console.log(`✅ Generated ${sellers.length} sellers`);

      // Generate products
      const products = this.generator.generateProducts(500, {
        sellerId: sellers[0]?.id || 'default-seller-id',
      });
      console.log(`✅ Generated ${products.length} products`);

      // Generate orders
      const orders = this.generator.generateOrders(200, {
        userId: users[0]?.id || 'default-user-id',
        sellerId: sellers[0]?.id || 'default-seller-id',
      });
      console.log(`✅ Generated ${orders.length} orders`);

      // Generate transactions
      const transactions = this.generator.generateTransactions(300, {
        orderId: orders[0]?.id || 'default-order-id',
        userId: users[0]?.id || 'default-user-id',
        sellerId: sellers[0]?.id || 'default-seller-id',
      });
      console.log(`✅ Generated ${transactions.length} transactions`);

      // Generate reviews
      const reviews = this.generator.generateReviews(150, {
        productId: products[0]?.id || 'default-product-id',
        userId: users[0]?.id || 'default-user-id',
        orderId: orders[0]?.id || 'default-order-id',
      });
      console.log(`✅ Generated ${reviews.length} reviews`);

      // Generate disputes
      const disputes = this.generator.generateDisputes(20, {
        orderId: orders[0]?.id || 'default-order-id',
        userId: users[0]?.id || 'default-user-id',
        sellerId: sellers[0]?.id || 'default-seller-id',
      });
      console.log(`✅ Generated ${disputes.length} disputes`);

      // Generate KYC data
      const kycs = this.generator.generateKYCs(80, {
        userId: users[0]?.id || 'default-user-id',
      });
      console.log(`✅ Generated ${kycs.length} KYC records`);

      // Generate AI scores
      const aiScores = this.generator.generateAIScores(100, {
        userId: users[0]?.id || 'default-user-id',
      });
      console.log(`✅ Generated ${aiScores.length} AI scores`);

      console.log('🎉 Database seeding completed successfully!');

      // Log summary
      this.logSeedingSummary({
        users: users.length,
        sellers: sellers.length,
        products: products.length,
        orders: orders.length,
        transactions: transactions.length,
        reviews: reviews.length,
        disputes: disputes.length,
        kycs: kycs.length,
        aiScores: aiScores.length,
      });
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error;
    }
  }

  private logSeedingSummary(summary: Record<string, number>): void {
    console.log('\n📊 Seeding Summary:');
    console.log('==================');
    Object.entries(summary).forEach(([key, count]) => {
      console.log(`${key}: ${count}`);
    });
    console.log('==================\n');
  }

  async clearDatabase(): Promise<void> {
    console.log('🧹 Clearing database...');
    // Implementation would depend on your database
    console.log('✅ Database cleared');
  }

  async resetDatabase(): Promise<void> {
    console.log('🔄 Resetting database...');
    await this.clearDatabase();
    await this.seedDatabase();
    console.log('✅ Database reset completed');
  }
}

// ========================================
// 13. TEST UTILITIES
// ========================================

export class TestUtilities {
  static createMockRequest(data: any = {}): any {
    return {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer mock-token',
      },
      body: data,
      query: {},
      params: {},
    };
  }

  static createMockResponse(): any {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  }

  static createMockUser(overrides: Partial<UserData> = {}): UserData {
    return TestDataGenerator.generateUser(overrides);
  }

  static createMockProduct(overrides: Partial<ProductData> = {}): ProductData {
    return TestDataGenerator.generateProduct(overrides);
  }

  static createMockOrder(overrides: Partial<OrderData> = {}): OrderData {
    return TestDataGenerator.generateOrder(overrides);
  }

  static createMockTransaction(overrides: Partial<TransactionData> = {}): TransactionData {
    return TestDataGenerator.generateTransaction(overrides);
  }

  static createMockReview(overrides: Partial<ReviewData> = {}): ReviewData {
    return TestDataGenerator.generateReview(overrides);
  }

  static createMockDispute(overrides: Partial<DisputeData> = {}): DisputeData {
    return TestDataGenerator.generateDispute(overrides);
  }

  static createMockKYC(overrides: Partial<KYCData> = {}): KYCData {
    return TestDataGenerator.generateKYC(overrides);
  }

  static createMockAIScore(overrides: Partial<AIScoreData> = {}): AIScoreData {
    return TestDataGenerator.generateAIScore(overrides);
  }
}

// ========================================
// 14. EXPORT ALL COMPONENTS
// ========================================

export const testSeedData = {
  TestDataGenerator,
  SeedDataManager,
  TestUtilities,
  UserData,
  SellerData,
  ProductData,
  OrderData,
  TransactionData,
  ReviewData,
  DisputeData,
  KYCData,
  AIScoreData,
  Address,
  Dimensions,
};
