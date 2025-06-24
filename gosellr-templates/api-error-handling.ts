// GoSellr API Error Handling Template
// Comprehensive error handling and authentication for all GoSellr APIs

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// ========================================
// 1. ERROR TYPES AND CODES
// ========================================

export enum ErrorCode {
  // Authentication Errors (1000-1999)
  UNAUTHORIZED = 1000,
  INVALID_TOKEN = 1001,
  TOKEN_EXPIRED = 1002,
  INVALID_CREDENTIALS = 1003,
  ACCOUNT_LOCKED = 1004,
  INSUFFICIENT_PERMISSIONS = 1005,
  KYC_REQUIRED = 1006,
  EMAIL_NOT_VERIFIED = 1007,
  PHONE_NOT_VERIFIED = 1008,

  // Validation Errors (2000-2999)
  VALIDATION_ERROR = 2000,
  REQUIRED_FIELD_MISSING = 2001,
  INVALID_FORMAT = 2002,
  FIELD_TOO_LONG = 2003,
  FIELD_TOO_SHORT = 2004,
  INVALID_EMAIL = 2005,
  INVALID_PHONE = 2006,
  INVALID_PASSWORD = 2007,
  INVALID_AMOUNT = 2008,
  INVALID_DATE = 2009,

  // Business Logic Errors (3000-3999)
  PRODUCT_NOT_FOUND = 3000,
  ORDER_NOT_FOUND = 3001,
  USER_NOT_FOUND = 3002,
  INSUFFICIENT_STOCK = 3003,
  ORDER_ALREADY_CANCELLED = 3004,
  PAYMENT_FAILED = 3005,
  DISPUTE_NOT_FOUND = 3006,
  REVIEW_NOT_FOUND = 3007,
  TRANSACTION_NOT_FOUND = 3008,
  WALLET_NOT_FOUND = 3009,

  // Payment Errors (4000-4999)
  PAYMENT_METHOD_NOT_SUPPORTED = 4000,
  INSUFFICIENT_FUNDS = 4001,
  PAYMENT_DECLINED = 4002,
  PAYMENT_PROCESSING_ERROR = 4003,
  REFUND_FAILED = 4004,
  ESCROW_RELEASE_FAILED = 4005,
  BLOCKCHAIN_TRANSACTION_FAILED = 4006,

  // Blockchain Errors (5000-5999)
  SMART_CONTRACT_ERROR = 5000,
  GAS_LIMIT_EXCEEDED = 5001,
  INSUFFICIENT_GAS = 5002,
  TRANSACTION_TIMEOUT = 5003,
  NETWORK_ERROR = 5004,
  WALLET_CONNECTION_FAILED = 5005,

  // AI/ML Errors (6000-6999)
  AI_SCORING_FAILED = 6000,
  TRUST_SCORE_CALCULATION_ERROR = 6001,
  FRAUD_DETECTION_ERROR = 6002,
  RECOMMENDATION_ENGINE_ERROR = 6003,

  // External Service Errors (7000-7999)
  EMAIL_SERVICE_ERROR = 7000,
  SMS_SERVICE_ERROR = 7001,
  PAYMENT_GATEWAY_ERROR = 7002,
  SHIPPING_SERVICE_ERROR = 7003,
  KYC_SERVICE_ERROR = 7004,
  BLOCKCHAIN_NODE_ERROR = 7005,

  // System Errors (8000-8999)
  DATABASE_ERROR = 8000,
  CACHE_ERROR = 8001,
  FILE_UPLOAD_ERROR = 8002,
  IMAGE_PROCESSING_ERROR = 8003,
  ENCRYPTION_ERROR = 8004,
  DECRYPTION_ERROR = 8005,

  // Rate Limiting (9000-9999)
  RATE_LIMIT_EXCEEDED = 9000,
  TOO_MANY_REQUESTS = 9001,
  API_QUOTA_EXCEEDED = 9002,

  // Generic Errors (10000+)
  INTERNAL_SERVER_ERROR = 10000,
  SERVICE_UNAVAILABLE = 10001,
  BAD_REQUEST = 10002,
  NOT_FOUND = 10003,
  METHOD_NOT_ALLOWED = 10004,
  CONFLICT = 10005,
  UNPROCESSABLE_ENTITY = 10006,
}

// ========================================
// 2. ERROR MESSAGES
// ========================================

export const ErrorMessages: Record<ErrorCode, string> = {
  // Authentication Errors
  [ErrorCode.UNAUTHORIZED]: 'You are not authorized to access this resource',
  [ErrorCode.INVALID_TOKEN]: 'Invalid authentication token',
  [ErrorCode.TOKEN_EXPIRED]: 'Authentication token has expired',
  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password',
  [ErrorCode.ACCOUNT_LOCKED]: 'Your account has been locked due to suspicious activity',
  [ErrorCode.INSUFFICIENT_PERMISSIONS]:
    'You do not have sufficient permissions to perform this action',
  [ErrorCode.KYC_REQUIRED]: 'KYC verification is required to complete this action',
  [ErrorCode.EMAIL_NOT_VERIFIED]: 'Please verify your email address before proceeding',
  [ErrorCode.PHONE_NOT_VERIFIED]: 'Please verify your phone number before proceeding',

  // Validation Errors
  [ErrorCode.VALIDATION_ERROR]: 'Validation error occurred',
  [ErrorCode.REQUIRED_FIELD_MISSING]: 'Required field is missing',
  [ErrorCode.INVALID_FORMAT]: 'Invalid format provided',
  [ErrorCode.FIELD_TOO_LONG]: 'Field value is too long',
  [ErrorCode.FIELD_TOO_SHORT]: 'Field value is too short',
  [ErrorCode.INVALID_EMAIL]: 'Invalid email address format',
  [ErrorCode.INVALID_PHONE]: 'Invalid phone number format',
  [ErrorCode.INVALID_PASSWORD]: 'Password does not meet requirements',
  [ErrorCode.INVALID_AMOUNT]: 'Invalid amount provided',
  [ErrorCode.INVALID_DATE]: 'Invalid date format',

  // Business Logic Errors
  [ErrorCode.PRODUCT_NOT_FOUND]: 'Product not found',
  [ErrorCode.ORDER_NOT_FOUND]: 'Order not found',
  [ErrorCode.USER_NOT_FOUND]: 'User not found',
  [ErrorCode.INSUFFICIENT_STOCK]: 'Insufficient stock available',
  [ErrorCode.ORDER_ALREADY_CANCELLED]: 'Order has already been cancelled',
  [ErrorCode.PAYMENT_FAILED]: 'Payment processing failed',
  [ErrorCode.DISPUTE_NOT_FOUND]: 'Dispute not found',
  [ErrorCode.REVIEW_NOT_FOUND]: 'Review not found',
  [ErrorCode.TRANSACTION_NOT_FOUND]: 'Transaction not found',
  [ErrorCode.WALLET_NOT_FOUND]: 'Wallet not found',

  // Payment Errors
  [ErrorCode.PAYMENT_METHOD_NOT_SUPPORTED]: 'Payment method not supported',
  [ErrorCode.INSUFFICIENT_FUNDS]: 'Insufficient funds in wallet',
  [ErrorCode.PAYMENT_DECLINED]: 'Payment was declined by the payment processor',
  [ErrorCode.PAYMENT_PROCESSING_ERROR]: 'Error occurred while processing payment',
  [ErrorCode.REFUND_FAILED]: 'Refund processing failed',
  [ErrorCode.ESCROW_RELEASE_FAILED]: 'Failed to release escrow funds',
  [ErrorCode.BLOCKCHAIN_TRANSACTION_FAILED]: 'Blockchain transaction failed',

  // Blockchain Errors
  [ErrorCode.SMART_CONTRACT_ERROR]: 'Smart contract execution failed',
  [ErrorCode.GAS_LIMIT_EXCEEDED]: 'Gas limit exceeded for transaction',
  [ErrorCode.INSUFFICIENT_GAS]: 'Insufficient gas for transaction',
  [ErrorCode.TRANSACTION_TIMEOUT]: 'Blockchain transaction timed out',
  [ErrorCode.NETWORK_ERROR]: 'Blockchain network error',
  [ErrorCode.WALLET_CONNECTION_FAILED]: 'Failed to connect to wallet',

  // AI/ML Errors
  [ErrorCode.AI_SCORING_FAILED]: 'AI scoring calculation failed',
  [ErrorCode.TRUST_SCORE_CALCULATION_ERROR]: 'Trust score calculation error',
  [ErrorCode.FRAUD_DETECTION_ERROR]: 'Fraud detection system error',
  [ErrorCode.RECOMMENDATION_ENGINE_ERROR]: 'Recommendation engine error',

  // External Service Errors
  [ErrorCode.EMAIL_SERVICE_ERROR]: 'Email service temporarily unavailable',
  [ErrorCode.SMS_SERVICE_ERROR]: 'SMS service temporarily unavailable',
  [ErrorCode.PAYMENT_GATEWAY_ERROR]: 'Payment gateway temporarily unavailable',
  [ErrorCode.SHIPPING_SERVICE_ERROR]: 'Shipping service temporarily unavailable',
  [ErrorCode.KYC_SERVICE_ERROR]: 'KYC service temporarily unavailable',
  [ErrorCode.BLOCKCHAIN_NODE_ERROR]: 'Blockchain node temporarily unavailable',

  // System Errors
  [ErrorCode.DATABASE_ERROR]: 'Database operation failed',
  [ErrorCode.CACHE_ERROR]: 'Cache operation failed',
  [ErrorCode.FILE_UPLOAD_ERROR]: 'File upload failed',
  [ErrorCode.IMAGE_PROCESSING_ERROR]: 'Image processing failed',
  [ErrorCode.ENCRYPTION_ERROR]: 'Data encryption failed',
  [ErrorCode.DECRYPTION_ERROR]: 'Data decryption failed',

  // Rate Limiting
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
  [ErrorCode.TOO_MANY_REQUESTS]: 'Too many requests',
  [ErrorCode.API_QUOTA_EXCEEDED]: 'API quota exceeded',

  // Generic Errors
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [ErrorCode.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable',
  [ErrorCode.BAD_REQUEST]: 'Bad request',
  [ErrorCode.NOT_FOUND]: 'Resource not found',
  [ErrorCode.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [ErrorCode.CONFLICT]: 'Resource conflict',
  [ErrorCode.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
};

// ========================================
// 3. ERROR RESPONSE INTERFACE
// ========================================

export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: any;
  timestamp: string;
  requestId: string;
  path: string;
  method: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// ========================================
// 4. ERROR HANDLER CLASS
// ========================================

export class ApiErrorHandler {
  private static instance: ApiErrorHandler;

  private constructor() {}

  static getInstance(): ApiErrorHandler {
    if (!ApiErrorHandler.instance) {
      ApiErrorHandler.instance = new ApiErrorHandler();
    }
    return ApiErrorHandler.instance;
  }

  createError(code: ErrorCode, details?: any, request?: NextApiRequest): ApiError {
    const error: ApiError = {
      code,
      message: ErrorMessages[code],
      details,
      timestamp: new Date().toISOString(),
      requestId: this.generateRequestId(),
      path: request?.url || '',
      method: request?.method || '',
      userId: request?.headers['x-user-id'] as string,
      ipAddress: this.getClientIP(request),
      userAgent: request?.headers['user-agent'],
    };

    return error;
  }

  handleError(error: any, req: NextApiRequest, res: NextApiResponse): void {
    let apiError: ApiError;

    // Handle known API errors
    if (error.code && Object.values(ErrorCode).includes(error.code)) {
      apiError = this.createError(error.code, error.details, req);
    }
    // Handle validation errors
    else if (error.name === 'ValidationError') {
      apiError = this.createError(ErrorCode.VALIDATION_ERROR, error.errors, req);
    }
    // Handle JWT errors
    else if (error.name === 'JsonWebTokenError') {
      apiError = this.createError(ErrorCode.INVALID_TOKEN, null, req);
    } else if (error.name === 'TokenExpiredError') {
      apiError = this.createError(ErrorCode.TOKEN_EXPIRED, null, req);
    }
    // Handle database errors
    else if (error.code === 'P2002') {
      apiError = this.createError(ErrorCode.CONFLICT, 'Duplicate entry', req);
    } else if (error.code === 'P2025') {
      apiError = this.createError(ErrorCode.NOT_FOUND, 'Record not found', req);
    }
    // Handle rate limiting
    else if (error.code === 'RATE_LIMIT_EXCEEDED') {
      apiError = this.createError(ErrorCode.RATE_LIMIT_EXCEEDED, null, req);
    }
    // Handle unknown errors
    else {
      apiError = this.createError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        {
          originalError: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        },
        req
      );
    }

    // Log error
    this.logError(apiError, error);

    // Send error response
    const response: ApiResponse = {
      success: false,
      error: apiError,
      meta: {
        timestamp: apiError.timestamp,
        requestId: apiError.requestId,
        version: '1.0.0',
      },
    };

    const statusCode = this.getStatusCode(apiError.code);
    res.status(statusCode).json(response);
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getClientIP(req: NextApiRequest | undefined): string {
    if (!req) return '';

    return (
      (req.headers['x-forwarded-for'] as string) ||
      (req.headers['x-real-ip'] as string) ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      ''
    );
  }

  private getStatusCode(errorCode: ErrorCode): number {
    const statusMap: Record<ErrorCode, number> = {
      // Authentication Errors - 401/403
      [ErrorCode.UNAUTHORIZED]: 401,
      [ErrorCode.INVALID_TOKEN]: 401,
      [ErrorCode.TOKEN_EXPIRED]: 401,
      [ErrorCode.INVALID_CREDENTIALS]: 401,
      [ErrorCode.ACCOUNT_LOCKED]: 403,
      [ErrorCode.INSUFFICIENT_PERMISSIONS]: 403,
      [ErrorCode.KYC_REQUIRED]: 403,
      [ErrorCode.EMAIL_NOT_VERIFIED]: 403,
      [ErrorCode.PHONE_NOT_VERIFIED]: 403,

      // Validation Errors - 400
      [ErrorCode.VALIDATION_ERROR]: 400,
      [ErrorCode.REQUIRED_FIELD_MISSING]: 400,
      [ErrorCode.INVALID_FORMAT]: 400,
      [ErrorCode.FIELD_TOO_LONG]: 400,
      [ErrorCode.FIELD_TOO_SHORT]: 400,
      [ErrorCode.INVALID_EMAIL]: 400,
      [ErrorCode.INVALID_PHONE]: 400,
      [ErrorCode.INVALID_PASSWORD]: 400,
      [ErrorCode.INVALID_AMOUNT]: 400,
      [ErrorCode.INVALID_DATE]: 400,

      // Business Logic Errors - 404/409
      [ErrorCode.PRODUCT_NOT_FOUND]: 404,
      [ErrorCode.ORDER_NOT_FOUND]: 404,
      [ErrorCode.USER_NOT_FOUND]: 404,
      [ErrorCode.INSUFFICIENT_STOCK]: 409,
      [ErrorCode.ORDER_ALREADY_CANCELLED]: 409,
      [ErrorCode.PAYMENT_FAILED]: 400,
      [ErrorCode.DISPUTE_NOT_FOUND]: 404,
      [ErrorCode.REVIEW_NOT_FOUND]: 404,
      [ErrorCode.TRANSACTION_NOT_FOUND]: 404,
      [ErrorCode.WALLET_NOT_FOUND]: 404,

      // Payment Errors - 400/402
      [ErrorCode.PAYMENT_METHOD_NOT_SUPPORTED]: 400,
      [ErrorCode.INSUFFICIENT_FUNDS]: 402,
      [ErrorCode.PAYMENT_DECLINED]: 400,
      [ErrorCode.PAYMENT_PROCESSING_ERROR]: 400,
      [ErrorCode.REFUND_FAILED]: 400,
      [ErrorCode.ESCROW_RELEASE_FAILED]: 400,
      [ErrorCode.BLOCKCHAIN_TRANSACTION_FAILED]: 400,

      // Blockchain Errors - 400/503
      [ErrorCode.SMART_CONTRACT_ERROR]: 400,
      [ErrorCode.GAS_LIMIT_EXCEEDED]: 400,
      [ErrorCode.INSUFFICIENT_GAS]: 400,
      [ErrorCode.TRANSACTION_TIMEOUT]: 408,
      [ErrorCode.NETWORK_ERROR]: 503,
      [ErrorCode.WALLET_CONNECTION_FAILED]: 503,

      // AI/ML Errors - 500
      [ErrorCode.AI_SCORING_FAILED]: 500,
      [ErrorCode.TRUST_SCORE_CALCULATION_ERROR]: 500,
      [ErrorCode.FRAUD_DETECTION_ERROR]: 500,
      [ErrorCode.RECOMMENDATION_ENGINE_ERROR]: 500,

      // External Service Errors - 503
      [ErrorCode.EMAIL_SERVICE_ERROR]: 503,
      [ErrorCode.SMS_SERVICE_ERROR]: 503,
      [ErrorCode.PAYMENT_GATEWAY_ERROR]: 503,
      [ErrorCode.SHIPPING_SERVICE_ERROR]: 503,
      [ErrorCode.KYC_SERVICE_ERROR]: 503,
      [ErrorCode.BLOCKCHAIN_NODE_ERROR]: 503,

      // System Errors - 500
      [ErrorCode.DATABASE_ERROR]: 500,
      [ErrorCode.CACHE_ERROR]: 500,
      [ErrorCode.FILE_UPLOAD_ERROR]: 500,
      [ErrorCode.IMAGE_PROCESSING_ERROR]: 500,
      [ErrorCode.ENCRYPTION_ERROR]: 500,
      [ErrorCode.DECRYPTION_ERROR]: 500,

      // Rate Limiting - 429
      [ErrorCode.RATE_LIMIT_EXCEEDED]: 429,
      [ErrorCode.TOO_MANY_REQUESTS]: 429,
      [ErrorCode.API_QUOTA_EXCEEDED]: 429,

      // Generic Errors
      [ErrorCode.INTERNAL_SERVER_ERROR]: 500,
      [ErrorCode.SERVICE_UNAVAILABLE]: 503,
      [ErrorCode.BAD_REQUEST]: 400,
      [ErrorCode.NOT_FOUND]: 404,
      [ErrorCode.METHOD_NOT_ALLOWED]: 405,
      [ErrorCode.CONFLICT]: 409,
      [ErrorCode.UNPROCESSABLE_ENTITY]: 422,
    };

    return statusMap[errorCode] || 500;
  }

  private logError(apiError: ApiError, originalError?: any): void {
    const logData = {
      ...apiError,
      originalError: originalError
        ? {
            message: originalError.message,
            stack: originalError.stack,
            name: originalError.name,
          }
        : undefined,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', logData);
    }

    // TODO: Send to logging service (e.g., Sentry, LogRocket)
    // logger.error('API Error', logData);
  }
}

// ========================================
// 5. AUTHENTICATION MIDDLEWARE
// ========================================

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
    role: string;
    permissions: string[];
    kycVerified: boolean;
    emailVerified: boolean;
    phoneVerified: boolean;
  };
}

export class AuthMiddleware {
  private static instance: AuthMiddleware;
  private jwtSecret: string;

  private constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'default-secret';
  }

  static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  authenticate = async (
    req: AuthenticatedRequest,
    res: NextApiResponse,
    next: () => void
  ): Promise<void> => {
    try {
      const token = this.extractToken(req);

      if (!token) {
        const error = ApiErrorHandler.getInstance().createError(
          ErrorCode.UNAUTHORIZED,
          'No authentication token provided',
          req
        );
        res.status(401).json({ success: false, error });
        return;
      }

      const decoded = jwt.verify(token, this.jwtSecret) as any;

      // Verify user exists and is active
      const user = await this.getUserById(decoded.userId);

      if (!user) {
        const error = ApiErrorHandler.getInstance().createError(
          ErrorCode.USER_NOT_FOUND,
          'User not found',
          req
        );
        res.status(404).json({ success: false, error });
        return;
      }

      if (!user.isActive) {
        const error = ApiErrorHandler.getInstance().createError(
          ErrorCode.ACCOUNT_LOCKED,
          'Account is locked',
          req
        );
        res.status(403).json({ success: false, error });
        return;
      }

      // Attach user to request
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        kycVerified: user.kycVerified,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
      };

      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        const apiError = ApiErrorHandler.getInstance().createError(
          ErrorCode.INVALID_TOKEN,
          null,
          req
        );
        res.status(401).json({ success: false, error: apiError });
      } else if (error.name === 'TokenExpiredError') {
        const apiError = ApiErrorHandler.getInstance().createError(
          ErrorCode.TOKEN_EXPIRED,
          null,
          req
        );
        res.status(401).json({ success: false, error: apiError });
      } else {
        const apiError = ApiErrorHandler.getInstance().createError(
          ErrorCode.INTERNAL_SERVER_ERROR,
          null,
          req
        );
        res.status(500).json({ success: false, error: apiError });
      }
    }
  };

  requireKYC = (req: AuthenticatedRequest, res: NextApiResponse, next: () => void): void => {
    if (!req.user?.kycVerified) {
      const error = ApiErrorHandler.getInstance().createError(
        ErrorCode.KYC_REQUIRED,
        'KYC verification required',
        req
      );
      res.status(403).json({ success: false, error });
      return;
    }
    next();
  };

  requireEmailVerification = (
    req: AuthenticatedRequest,
    res: NextApiResponse,
    next: () => void
  ): void => {
    if (!req.user?.emailVerified) {
      const error = ApiErrorHandler.getInstance().createError(
        ErrorCode.EMAIL_NOT_VERIFIED,
        'Email verification required',
        req
      );
      res.status(403).json({ success: false, error });
      return;
    }
    next();
  };

  requirePhoneVerification = (
    req: AuthenticatedRequest,
    res: NextApiResponse,
    next: () => void
  ): void => {
    if (!req.user?.phoneVerified) {
      const error = ApiErrorHandler.getInstance().createError(
        ErrorCode.PHONE_NOT_VERIFIED,
        'Phone verification required',
        req
      );
      res.status(403).json({ success: false, error });
      return;
    }
    next();
  };

  requirePermission = (permission: string) => {
    return (req: AuthenticatedRequest, res: NextApiResponse, next: () => void): void => {
      if (!req.user?.permissions.includes(permission)) {
        const error = ApiErrorHandler.getInstance().createError(
          ErrorCode.INSUFFICIENT_PERMISSIONS,
          `Permission '${permission}' required`,
          req
        );
        res.status(403).json({ success: false, error });
        return;
      }
      next();
    };
  };

  private extractToken(req: NextApiRequest): string | null {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    return req.cookies?.token || null;
  }

  private async getUserById(userId: string): Promise<any> {
    // TODO: Implement database query to get user
    // This is a placeholder implementation
    return {
      id: userId,
      email: 'user@example.com',
      role: 'user',
      permissions: ['read', 'write'],
      kycVerified: true,
      emailVerified: true,
      phoneVerified: true,
      isActive: true,
    };
  }
}

// ========================================
// 6. RATE LIMITING MIDDLEWARE
// ========================================

export class RateLimitMiddleware {
  private static instance: RateLimitMiddleware;
  private requests: Map<string, { count: number; resetTime: number }>;

  private constructor() {
    this.requests = new Map();
  }

  static getInstance(): RateLimitMiddleware {
    if (!RateLimitMiddleware.instance) {
      RateLimitMiddleware.instance = new RateLimitMiddleware();
    }
    return RateLimitMiddleware.instance;
  }

  limit = (maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) => {
    return (req: NextApiRequest, res: NextApiResponse, next: () => void): void => {
      const key = this.getClientKey(req);
      const now = Date.now();

      const clientData = this.requests.get(key);

      if (!clientData || now > clientData.resetTime) {
        this.requests.set(key, {
          count: 1,
          resetTime: now + windowMs,
        });
        next();
        return;
      }

      if (clientData.count >= maxRequests) {
        const error = ApiErrorHandler.getInstance().createError(
          ErrorCode.RATE_LIMIT_EXCEEDED,
          `Rate limit exceeded. Maximum ${maxRequests} requests per ${windowMs / 1000 / 60} minutes.`,
          req
        );
        res.status(429).json({ success: false, error });
        return;
      }

      clientData.count++;
      next();
    };
  };

  private getClientKey(req: NextApiRequest): string {
    const ip =
      (req.headers['x-forwarded-for'] as string) ||
      (req.headers['x-real-ip'] as string) ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      'unknown';

    const userId = (req.headers['x-user-id'] as string) || 'anonymous';

    return `${ip}:${userId}`;
  }
}

// ========================================
// 7. VALIDATION MIDDLEWARE
// ========================================

export class ValidationMiddleware {
  static validate = (schema: any) => {
    return async (req: NextApiRequest, res: NextApiResponse, next: () => void): Promise<void> => {
      try {
        const data = {
          ...req.body,
          ...req.query,
          ...req.params,
        };

        await schema.validate(data, { abortEarly: false });
        next();
      } catch (error: any) {
        const validationError = ApiErrorHandler.getInstance().createError(
          ErrorCode.VALIDATION_ERROR,
          error.errors,
          req
        );
        res.status(400).json({ success: false, error: validationError });
      }
    };
  };
}

// ========================================
// 8. RESPONSE HELPER
// ========================================

export class ApiResponseHelper {
  static success<T>(data: T, req: NextApiRequest, meta?: any): ApiResponse<T> {
    return {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        version: '1.0.0',
        ...meta,
      },
    };
  }

  static error(code: ErrorCode, details?: any, req?: NextApiRequest): ApiResponse {
    const error = ApiErrorHandler.getInstance().createError(code, details, req);

    return {
      success: false,
      error,
      meta: {
        timestamp: error.timestamp,
        requestId: error.requestId,
        version: '1.0.0',
      },
    };
  }

  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    req: NextApiRequest
  ): ApiResponse<T[]> {
    return {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        version: '1.0.0',
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  }
}

// ========================================
// 9. API WRAPPER
// ========================================

export const withErrorHandling = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      ApiErrorHandler.getInstance().handleError(error, req, res);
    }
  };
};

export const withAuth = (
  handler: Function,
  options?: {
    requireKYC?: boolean;
    requireEmailVerification?: boolean;
    requirePhoneVerification?: boolean;
    requirePermission?: string;
  }
) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const auth = AuthMiddleware.getInstance();

    // Apply authentication
    await auth.authenticate(req, res, () => {
      // Apply additional requirements
      if (options?.requireKYC) {
        auth.requireKYC(req, res, () => {
          if (options?.requireEmailVerification) {
            auth.requireEmailVerification(req, res, () => {
              if (options?.requirePhoneVerification) {
                auth.requirePhoneVerification(req, res, () => {
                  if (options?.requirePermission) {
                    auth.requirePermission(options.requirePermission)(req, res, () => {
                      handler(req, res);
                    });
                  } else {
                    handler(req, res);
                  }
                });
              } else if (options?.requirePermission) {
                auth.requirePermission(options.requirePermission)(req, res, () => {
                  handler(req, res);
                });
              } else {
                handler(req, res);
              }
            });
          } else if (options?.requirePhoneVerification) {
            auth.requirePhoneVerification(req, res, () => {
              if (options?.requirePermission) {
                auth.requirePermission(options.requirePermission)(req, res, () => {
                  handler(req, res);
                });
              } else {
                handler(req, res);
              }
            });
          } else if (options?.requirePermission) {
            auth.requirePermission(options.requirePermission)(req, res, () => {
              handler(req, res);
            });
          } else {
            handler(req, res);
          }
        });
      } else if (options?.requireEmailVerification) {
        auth.requireEmailVerification(req, res, () => {
          if (options?.requirePhoneVerification) {
            auth.requirePhoneVerification(req, res, () => {
              if (options?.requirePermission) {
                auth.requirePermission(options.requirePermission)(req, res, () => {
                  handler(req, res);
                });
              } else {
                handler(req, res);
              }
            });
          } else if (options?.requirePermission) {
            auth.requirePermission(options.requirePermission)(req, res, () => {
              handler(req, res);
            });
          } else {
            handler(req, res);
          }
        });
      } else if (options?.requirePhoneVerification) {
        auth.requirePhoneVerification(req, res, () => {
          if (options?.requirePermission) {
            auth.requirePermission(options.requirePermission)(req, res, () => {
              handler(req, res);
            });
          } else {
            handler(req, res);
          }
        });
      } else if (options?.requirePermission) {
        auth.requirePermission(options.requirePermission)(req, res, () => {
          handler(req, res);
        });
      } else {
        handler(req, res);
      }
    });
  };
};

export const withRateLimit = (maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) => {
  return (handler: Function) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const rateLimit = RateLimitMiddleware.getInstance();
      rateLimit.limit(maxRequests, windowMs)(req, res, () => {
        handler(req, res);
      });
    };
  };
};

export const withValidation = (schema: any) => {
  return (handler: Function) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      ValidationMiddleware.validate(schema)(req, res, () => {
        handler(req, res);
      });
    };
  };
};

// ========================================
// 10. USAGE EXAMPLE
// ========================================

/*
Example API endpoint using all middleware:

export default withErrorHandling(
  withRateLimit(100, 15 * 60 * 1000)(
    withAuth(
      withValidation(userRegistrationSchema)(
        async (req: AuthenticatedRequest, res: NextApiResponse) => {
          // Your API logic here
          const result = await createUser(req.body);
          
          res.status(201).json(
            ApiResponseHelper.success(result, req)
          );
        }
      ),
      { requireKYC: true, requireEmailVerification: true }
    )
  )
);
*/
