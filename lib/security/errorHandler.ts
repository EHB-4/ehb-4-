import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

// Error types
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  RATE_LIMIT = 'RATE_LIMIT_ERROR',
  DATABASE = 'DATABASE_ERROR',
  EXTERNAL_API = 'EXTERNAL_API_ERROR',
  INTERNAL = 'INTERNAL_ERROR',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC_ERROR',
}

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Base error class
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly severity: ErrorSeverity;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    type: ErrorType,
    statusCode: number,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    isOperational: boolean = true,
    context?: Record<string, any>
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.severity = severity;
    this.isOperational = isOperational;
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error classes
export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, ErrorType.VALIDATION, 400, ErrorSeverity.LOW, true, context);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, ErrorType.AUTHENTICATION, 401, ErrorSeverity.MEDIUM, true);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, ErrorType.AUTHORIZATION, 403, ErrorSeverity.MEDIUM, true);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, ErrorType.NOT_FOUND, 404, ErrorSeverity.LOW, true);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded', retryAfter?: number) {
    super(message, ErrorType.RATE_LIMIT, 429, ErrorSeverity.MEDIUM, true, { retryAfter });
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, ErrorType.DATABASE, 500, ErrorSeverity.HIGH, true, context);
  }
}

export class ExternalAPIError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, ErrorType.EXTERNAL_API, 502, ErrorSeverity.HIGH, true, context);
  }
}

export class BusinessLogicError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, ErrorType.BUSINESS_LOGIC, 400, ErrorSeverity.MEDIUM, true, context);
  }
}

// Error response interface
export interface ErrorResponse {
  success: false;
  error: {
    type: ErrorType;
    message: string;
    code: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId?: string;
  };
}

// Error handler class
export class ErrorHandler {
  private static isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Handle and format errors for API responses
   */
  static handle(error: unknown, requestId?: string): NextResponse {
    let appError: AppError;

    // Convert different error types to AppError
    if (error instanceof AppError) {
      appError = error;
    } else if (error instanceof ZodError) {
      appError = new ValidationError('Validation failed', {
        errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
      });
    } else if (error instanceof Error) {
      appError = new AppError(error.message, ErrorType.INTERNAL, 500, ErrorSeverity.HIGH, false);
    } else {
      appError = new AppError(
        'An unexpected error occurred',
        ErrorType.INTERNAL,
        500,
        ErrorSeverity.CRITICAL,
        false
      );
    }

    // Log error
    this.logError(appError, requestId);

    // Create error response
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        type: appError.type,
        message: appError.message,
        code: this.getErrorCode(appError.type),
        details: this.isDevelopment ? appError.context : undefined,
        timestamp: new Date().toISOString(),
        requestId,
      },
    };

    // Add headers for rate limiting
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (appError.type === ErrorType.RATE_LIMIT && appError.context?.retryAfter) {
      headers['Retry-After'] = appError.context.retryAfter.toString();
    }

    return NextResponse.json(errorResponse, {
      status: appError.statusCode,
      headers,
    });
  }

  /**
   * Log error with appropriate level
   */
  private static logError(error: AppError, requestId?: string): void {
    const logData = {
      type: error.type,
      message: error.message,
      statusCode: error.statusCode,
      severity: error.severity,
      stack: this.isDevelopment ? error.stack : undefined,
      context: error.context,
      requestId,
      timestamp: new Date().toISOString(),
    };

    switch (error.severity) {
      case ErrorSeverity.LOW:
        console.log('🔍 [LOW]', logData);
        break;
      case ErrorSeverity.MEDIUM:
        console.warn('⚠️ [MEDIUM]', logData);
        break;
      case ErrorSeverity.HIGH:
        console.error('🚨 [HIGH]', logData);
        break;
      case ErrorSeverity.CRITICAL:
        console.error('💥 [CRITICAL]', logData);
        // In production, you might want to send this to an error tracking service
        break;
    }
  }

  /**
   * Get error code for client
   */
  private static getErrorCode(type: ErrorType): string {
    const codes: Record<ErrorType, string> = {
      [ErrorType.VALIDATION]: 'VALIDATION_ERROR',
      [ErrorType.AUTHENTICATION]: 'AUTH_REQUIRED',
      [ErrorType.AUTHORIZATION]: 'INSUFFICIENT_PERMISSIONS',
      [ErrorType.NOT_FOUND]: 'RESOURCE_NOT_FOUND',
      [ErrorType.RATE_LIMIT]: 'RATE_LIMIT_EXCEEDED',
      [ErrorType.DATABASE]: 'DATABASE_ERROR',
      [ErrorType.EXTERNAL_API]: 'EXTERNAL_API_ERROR',
      [ErrorType.INTERNAL]: 'INTERNAL_ERROR',
      [ErrorType.BUSINESS_LOGIC]: 'BUSINESS_LOGIC_ERROR',
    };
    return codes[type];
  }

  /**
   * Generate request ID for tracking
   */
  static generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Check if error is operational (expected)
   */
  static isOperational(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }

  /**
   * Handle unhandled promise rejections
   */
  static handleUnhandledRejection(reason: any, promise: Promise<any>): void {
    console.error('Unhandled Promise Rejection:', {
      reason,
      promise,
      timestamp: new Date().toISOString(),
    });

    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
    }
  }

  /**
   * Handle uncaught exceptions
   */
  static handleUncaughtException(error: Error, origin: string): void {
    console.error('Uncaught Exception:', {
      error: error.message,
      stack: error.stack,
      origin,
      timestamp: new Date().toISOString(),
    });

    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
    }

    // Exit process for uncaught exceptions
    process.exit(1);
  }
}

// Error handling decorator for API routes
export function withErrorHandling() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, ...args: any[]) {
      const requestId = ErrorHandler.generateRequestId();

      try {
        return await originalMethod.apply(this, [req, ...args]);
      } catch (error) {
        return ErrorHandler.handle(error, requestId);
      }
    };

    return descriptor;
  };
}

// Async error handler wrapper
export function asyncHandler<T extends any[], R>(
  handler: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    try {
      return await handler(...args);
    } catch (error) {
      throw error; // Let the error handler middleware catch it
    }
  };
}

// Set up global error handlers
if (typeof window === 'undefined' && typeof process !== 'undefined' && process.on) {
  // Server-side error handlers (only in Node.js environment, not Edge Runtime)
  process.on('unhandledRejection', ErrorHandler.handleUnhandledRejection);
  process.on('uncaughtException', ErrorHandler.handleUncaughtException);
}
