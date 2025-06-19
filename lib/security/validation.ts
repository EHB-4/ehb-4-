import { z } from 'zod';

// Common validation schemas
export const commonSchemas = {
  // ID validation
  id: z.string().min(1, 'ID is required'),

  // Email validation
  email: z.string().email('Invalid email format'),

  // Password validation
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),

  // Name validation
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  // Phone validation
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),

  // URL validation
  url: z.string().url('Invalid URL format'),

  // Date validation
  date: z.string().datetime('Invalid date format'),

  // Amount validation
  amount: z.number().positive('Amount must be positive'),

  // Pagination
  pagination: z.object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
};

// Authentication schemas
export const authSchemas = {
  register: z.object({
    email: commonSchemas.email,
    password: commonSchemas.password,
    name: commonSchemas.name,
    role: z.enum(['user', 'admin', 'doctor', 'tutor', 'shop']).default('user'),
  }),

  login: z.object({
    email: commonSchemas.email,
    password: z.string().min(1, 'Password is required'),
  }),

  profile: z.object({
    name: commonSchemas.name.optional(),
    role: z.enum(['user', 'admin', 'doctor', 'tutor', 'shop']).optional(),
    phone: commonSchemas.phone.optional(),
    address: z.string().max(200, 'Address must be less than 200 characters').optional(),
  }),
};

// Wallet schemas
export const walletSchemas = {
  walletAction: z.object({
    action: z.enum(['lock', 'unlock', 'transfer', 'deposit', 'withdraw']),
    amount: commonSchemas.amount,
    loyaltyType: z.enum(['points', 'coins', 'tokens']).optional(),
    recipientId: z.string().optional(),
    description: z.string().max(200).optional(),
  }),

  transaction: z.object({
    amount: commonSchemas.amount,
    type: z.enum(['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'BONUS', 'LOCK', 'UNLOCK']),
    description: z.string().max(200).optional(),
    recipientId: z.string().optional(),
  }),
};

// Product schemas
export const productSchemas = {
  create: z.object({
    name: z.string().min(1, 'Product name is required').max(100),
    description: z.string().max(500),
    price: commonSchemas.amount,
    category: z.string().min(1, 'Category is required'),
    images: z.array(commonSchemas.url).optional(),
    stock: z.number().int().nonnegative().default(0),
    tags: z.array(z.string()).optional(),
    isActive: z.boolean().default(true),
  }),

  update: z.object({
    name: z.string().min(1, 'Product name is required').max(100).optional(),
    description: z.string().max(500).optional(),
    price: commonSchemas.amount.optional(),
    category: z.string().min(1, 'Category is required').optional(),
    images: z.array(commonSchemas.url).optional(),
    stock: z.number().int().nonnegative().optional(),
    tags: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
  }),

  filter: z.object({
    category: z.string().optional(),
    minPrice: z.number().positive().optional(),
    maxPrice: z.number().positive().optional(),
    inStock: z.boolean().optional(),
    search: z.string().optional(),
    ...commonSchemas.pagination.shape,
  }),
};

// Order schemas
export const orderSchemas = {
  create: z.object({
    items: z
      .array(
        z.object({
          productId: commonSchemas.id,
          quantity: z.number().int().positive(),
          price: commonSchemas.amount,
        })
      )
      .min(1, 'At least one item is required'),
    shippingAddress: z.object({
      street: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      zipCode: z.string().min(1),
      country: z.string().min(1),
    }),
    paymentMethod: z.enum(['card', 'wallet', 'payoneer']),
    notes: z.string().max(500).optional(),
  }),

  update: z.object({
    status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).optional(),
    trackingNumber: z.string().optional(),
    notes: z.string().max(500).optional(),
  }),
};

// Healthcare schemas
export const healthcareSchemas = {
  medicalRecord: z.object({
    patientId: commonSchemas.id,
    diagnosis: z.string().min(1, 'Diagnosis is required'),
    prescription: z.string().optional(),
    notes: z.string().max(1000).optional(),
    attachments: z.array(commonSchemas.url).optional(),
    doctorId: commonSchemas.id,
    visitDate: commonSchemas.date,
  }),

  prescription: z.object({
    patientId: commonSchemas.id,
    doctorId: commonSchemas.id,
    medications: z
      .array(
        z.object({
          name: z.string().min(1),
          dosage: z.string().min(1),
          frequency: z.string().min(1),
          duration: z.string().min(1),
          instructions: z.string().optional(),
        })
      )
      .min(1, 'At least one medication is required'),
    diagnosis: z.string().min(1),
    notes: z.string().max(500).optional(),
    validUntil: commonSchemas.date,
  }),

  appointment: z.object({
    patientId: commonSchemas.id,
    doctorId: commonSchemas.id,
    date: commonSchemas.date,
    duration: z.number().int().positive().max(480), // Max 8 hours
    type: z.enum(['consultation', 'follow-up', 'emergency']),
    notes: z.string().max(500).optional(),
  }),
};

// Education schemas
export const educationSchemas = {
  assignment: z.object({
    courseId: commonSchemas.id,
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().max(1000),
    dueDate: commonSchemas.date,
    totalPoints: z.number().int().nonnegative(),
    attachments: z.array(commonSchemas.url).optional(),
    requirements: z.array(z.string()).optional(),
  }),

  grade: z.object({
    studentId: commonSchemas.id,
    courseId: commonSchemas.id,
    assignmentId: commonSchemas.id,
    score: z.number().int().nonnegative(),
    feedback: z.string().max(500).optional(),
    gradedBy: commonSchemas.id,
  }),

  course: z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().max(1000),
    instructorId: commonSchemas.id,
    duration: z.number().int().positive(),
    price: commonSchemas.amount,
    category: z.string().min(1),
    isActive: z.boolean().default(true),
  }),
};

// Payment schemas
export const paymentSchemas = {
  payoneer: z.object({
    action: z.enum(['create_account', 'get_balance', 'transfer', 'get_transactions']),
    amount: commonSchemas.amount.optional(),
    currency: z.enum(['USD', 'EUR', 'GBP']).optional(),
    recipient_id: z.string().optional(),
    description: z.string().max(200).optional(),
  }),

  shopify: z.object({
    action: z.enum([
      'create_shop',
      'get_products',
      'create_product',
      'update_product',
      'delete_product',
      'get_orders',
      'get_customers',
    ]),
    shopId: z.string().optional(),
    productId: z.string().optional(),
    data: z.record(z.any()).optional(),
  }),
};

// Blockchain schemas
export const blockchainSchemas = {
  moonbeam: z.object({
    action: z.enum(['get_balance', 'transfer', 'approve', 'get_allowance']),
    tokenAddress: z.string().optional(),
    recipient: z.string().optional(),
    amount: z.string().optional(),
    spender: z.string().optional(),
  }),
};

// AI schemas
export const aiSchemas = {
  openai: z.object({
    model: z.enum(['gpt-4', 'gpt-3.5-turbo', 'gpt-4-turbo']),
    messages: z
      .array(
        z.object({
          role: z.enum(['system', 'user', 'assistant']),
          content: z.string().min(1),
        })
      )
      .min(1),
    temperature: z.number().min(0).max(2).default(0.7),
    max_tokens: z.number().int().positive().max(4000).default(500),
    stream: z.boolean().default(false),
  }),

  aiRouter: z.object({
    message: z.string().min(1, 'Message is required'),
    language: z.enum(['en', 'ar', 'ur']).default('en'),
  }),
};

// Admin schemas
export const adminSchemas = {
  adminAction: z.object({
    action: z.enum(['updateOrderStatus', 'updateProduct', 'updateUser', 'systemStats']),
    data: z.record(z.any()),
  }),

  userManagement: z.object({
    userId: commonSchemas.id,
    action: z.enum(['suspend', 'activate', 'delete', 'changeRole']),
    reason: z.string().max(500).optional(),
  }),
};

// Feedback schemas
export const feedbackSchemas = {
  submit: z.object({
    feedback: z.string().min(1, 'Feedback is required').max(1000),
    category: z.enum(['bug', 'feature', 'general', 'complaint']).optional(),
    rating: z.number().int().min(1).max(5).optional(),
    contactEmail: commonSchemas.email.optional(),
  }),
};

// Search schemas
export const searchSchemas = {
  query: z.object({
    q: z.string().min(1, 'Search query is required'),
    type: z.enum(['products', 'users', 'courses', 'doctors']).optional(),
    ...commonSchemas.pagination.shape,
  }),
};

// Notification schemas
export const notificationSchemas = {
  create: z.object({
    userId: commonSchemas.id,
    title: z.string().min(1, 'Title is required').max(100),
    message: z.string().min(1, 'Message is required').max(500),
    type: z.enum(['info', 'success', 'warning', 'error']).default('info'),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
    data: z.record(z.any()).optional(),
  }),
};

// Validation helper functions
export class ValidationHelper {
  /**
   * Validate request body with schema
   */
  static async validateBody<T>(req: Request, schema: z.ZodSchema<T>): Promise<T> {
    try {
      const body = await req.json();
      return schema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw new Error('Invalid JSON body');
    }
  }

  /**
   * Validate query parameters with schema
   */
  static validateQuery<T>(url: URL, schema: z.ZodSchema<T>): T {
    try {
      const query: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        query[key] = value;
      });

      return schema.parse(query);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Query validation failed: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw new Error('Invalid query parameters');
    }
  }

  /**
   * Validate path parameters with schema
   */
  static validateParams<T>(params: Record<string, string>, schema: z.ZodSchema<T>): T {
    try {
      return schema.parse(params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Parameter validation failed: ${error.errors.map(e => e.message).join(', ')}`
        );
      }
      throw new Error('Invalid path parameters');
    }
  }

  /**
   * Sanitize input string
   */
  static sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  }

  /**
   * Validate file upload
   */
  static validateFile(
    file: File,
    options: {
      maxSize?: number;
      allowedTypes?: string[];
    } = {}
  ): void {
    const { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/*', 'application/pdf'] } = options;

    if (file.size > maxSize) {
      throw new Error(`File size must be less than ${maxSize / 1024 / 1024}MB`);
    }

    const isValidType = allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });

    if (!isValidType) {
      throw new Error(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    }
  }
}

// Export all schemas
export const schemas = {
  common: commonSchemas,
  auth: authSchemas,
  wallet: walletSchemas,
  product: productSchemas,
  order: orderSchemas,
  healthcare: healthcareSchemas,
  education: educationSchemas,
  payment: paymentSchemas,
  blockchain: blockchainSchemas,
  ai: aiSchemas,
  admin: adminSchemas,
  feedback: feedbackSchemas,
  search: searchSchemas,
  notification: notificationSchemas,
};
