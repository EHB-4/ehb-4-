# 🔒 EHB Next.js 04 - Security Implementation Guide

## 📋 Overview

This document outlines the comprehensive security implementation for the EHB Next.js 04 project, covering authentication, authorization, rate limiting, validation, error handling, and security headers.

---

## 🔐 Authentication System

### NextAuth.js Integration

- **Provider**: Credentials Provider with JWT strategy
- **Session Management**: Server-side sessions
- **Password Hashing**: bcryptjs with salt rounds
- **Token Security**: JWT with secure secret

### Authentication Features

```typescript
// Check if user is authenticated
const isAuth = await AuthHelper.isAuthenticated();

// Get current user
const user = await AuthHelper.getCurrentUser();

// Check user role
const isAdmin = await AuthHelper.hasRole(UserRole.ADMIN);
```

---

## 🛡️ Authorization System

### Role-Based Access Control (RBAC)

```typescript
enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  TUTOR = 'tutor',
  SHOP = 'shop',
  FRANCHISE = 'franchise',
}
```

### Permission-Based Access Control (PBAC)

```typescript
enum Permission {
  READ_USERS = 'read_users',
  WRITE_USERS = 'write_users',
  DELETE_USERS = 'delete_users',
  READ_PRODUCTS = 'read_products',
  WRITE_PRODUCTS = 'write_products',
  // ... more permissions
}
```

### Role-Permission Mapping

```typescript
const ROLE_PERMISSIONS = {
  [UserRole.USER]: [
    Permission.READ_PRODUCTS,
    Permission.READ_ORDERS,
    Permission.WRITE_ORDERS,
    // ... basic permissions
  ],
  [UserRole.ADMIN]: [
    // All permissions including system admin
    Permission.SYSTEM_ADMIN,
    Permission.VIEW_ANALYTICS,
    // ... admin permissions
  ],
  // ... other roles
};
```

### Authorization Middleware

```typescript
// Role-based authorization
export function withRole(requiredRole: UserRole);

// Permission-based authorization
export function withPermission(requiredPermission: Permission);

// Multiple permissions
export function withAnyPermission(requiredPermissions: Permission[]);

// Resource ownership
export function withResourceAccess(getResourceUserId: Function);
```

---

## ⚡ Rate Limiting System

### Redis-Based Rate Limiting

- **Backend**: Upstash Redis
- **Algorithm**: Sliding window with sorted sets
- **Granularity**: Per user/IP and endpoint type

### Rate Limit Configurations

```typescript
const RATE_LIMITS = {
  default: { requests: 100, window: 60 }, // General API
  auth: { requests: 5, window: 300 }, // Authentication
  openai: { requests: 10, window: 60 }, // AI endpoints
  payment: { requests: 20, window: 300 }, // Payment endpoints
  upload: { requests: 10, window: 300 }, // File uploads
  admin: { requests: 50, window: 60 }, // Admin endpoints
};
```

### Rate Limiting Features

- **Automatic Detection**: Based on endpoint path
- **User/IP Identification**: Fallback to IP if no user
- **Headers**: X-RateLimit-\* headers in responses
- **Graceful Degradation**: Allows requests if Redis unavailable

### Usage Example

```typescript
// Apply rate limiting to any request
return await withRateLimit(req, async () => {
  // Your API logic here
  return NextResponse.json({ success: true });
});
```

---

## ✅ Input Validation System

### Zod Schema Validation

Comprehensive validation schemas for all data types:

#### Common Schemas

```typescript
const commonSchemas = {
  id: z.string().min(1, 'ID is required'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain...'),
  name: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  amount: z.number().positive('Amount must be positive'),
  // ... more schemas
};
```

#### Domain-Specific Schemas

- **Authentication**: register, login, profile
- **Wallet**: walletAction, transaction
- **Products**: create, update, filter
- **Orders**: create, update
- **Healthcare**: medicalRecord, prescription, appointment
- **Education**: assignment, grade, course
- **Payments**: payoneer, shopify
- **Blockchain**: moonbeam
- **AI**: openai, aiRouter

### Validation Helper Functions

```typescript
class ValidationHelper {
  // Validate request body
  static async validateBody<T>(req: Request, schema: z.ZodSchema<T>): Promise<T>;

  // Validate query parameters
  static validateQuery<T>(url: URL, schema: z.ZodSchema<T>): T;

  // Validate path parameters
  static validateParams<T>(params: Record<string, string>, schema: z.ZodSchema<T>): T;

  // Sanitize input string
  static sanitizeString(input: string): string;

  // Validate file upload
  static validateFile(file: File, options: FileValidationOptions): void;
}
```

---

## 🚨 Error Handling System

### Error Types and Hierarchy

```typescript
enum ErrorType {
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

enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}
```

### Error Classes

```typescript
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly severity: ErrorSeverity;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, any>;
}

// Specific error classes
export class ValidationError extends AppError
export class AuthenticationError extends AppError
export class AuthorizationError extends AppError
export class NotFoundError extends AppError
export class RateLimitError extends AppError
export class DatabaseError extends AppError
export class ExternalAPIError extends AppError
export class BusinessLogicError extends AppError
```

### Consistent Error Response Format

```typescript
interface ErrorResponse {
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
```

### Error Handling Features

- **Automatic Logging**: Different levels based on severity
- **Request Tracking**: Unique request IDs
- **Development Details**: Stack traces in development
- **Global Handlers**: Unhandled rejections and exceptions
- **Decorators**: Easy error handling for API routes

---

## 🔒 Security Headers

### Automatic Security Headers

```typescript
function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // CSP in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Content-Security-Policy', "default-src 'self'; ...");
  }

  return response;
}
```

### Security Headers Explained

- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-XSS-Protection**: Enables XSS filtering
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features
- **Content-Security-Policy**: Prevents XSS and injection attacks

---

## 🔄 Middleware Integration

### Global Middleware

```typescript
export async function middleware(request: NextRequest) {
  const requestId = ErrorHandler.generateRequestId();

  try {
    // Add request tracking
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-request-id', requestId);

    // Apply rate limiting for API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return await withRateLimit(modifiedRequest, async () => {
        const response = NextResponse.next({ request: modifiedRequest });
        return addSecurityHeaders(response);
      });
    }

    // Add security headers for all routes
    const response = NextResponse.next({ request: modifiedRequest });
    return addSecurityHeaders(response);
  } catch (error) {
    // Handle middleware errors
    return ErrorHandler.handle(error, requestId);
  }
}
```

---

## 🧪 Testing Security Features

### Authentication Testing

```typescript
// Test authentication
const isAuth = await AuthHelper.isAuthenticated();
expect(isAuth).toBe(true);

// Test user roles
const isAdmin = await AuthHelper.hasRole(UserRole.ADMIN);
expect(isAdmin).toBe(true);

// Test permissions
const canReadUsers = await AuthHelper.hasPermission(Permission.READ_USERS);
expect(canReadUsers).toBe(true);
```

### Rate Limiting Testing

```typescript
// Test rate limiting
const result = await rateLimiter.checkLimit('user:123', 'default');
expect(result.success).toBe(true);
expect(result.remaining).toBeGreaterThan(0);
```

### Validation Testing

```typescript
// Test input validation
const validData = await ValidationHelper.validateBody(req, schemas.auth.register);
expect(validData.email).toBe('test@example.com');

// Test invalid data
await expect(ValidationHelper.validateBody(req, schemas.auth.register)).rejects.toThrow(
  'Validation failed'
);
```

---

## 📊 Security Monitoring

### Logging Levels

- **LOW**: Validation errors, not found errors
- **MEDIUM**: Authentication/authorization errors, rate limiting
- **HIGH**: Database errors, external API errors
- **CRITICAL**: Unhandled exceptions, system failures

### Request Tracking

- **Request IDs**: Unique identifier for each request
- **User Context**: User ID, role, permissions
- **Performance Metrics**: Response time, error rates
- **Security Events**: Failed logins, permission violations

### Error Reporting

```typescript
// Development: Console logging with stack traces
// Production: Error tracking service integration
if (process.env.NODE_ENV === 'production') {
  // Send to error tracking service (Sentry, LogRocket, etc.)
}
```

---

## 🚀 Implementation Examples

### Secure API Route Pattern

```typescript
export async function GET(req: NextRequest) {
  return await withErrorHandling()(async () => {
    return await withRateLimit(req, async () => {
      return await withAuth(req, async () => {
        return await withPermission(Permission.READ_USERS)(req, async () => {
          try {
            // Validate input
            const query = ValidationHelper.validateQuery(req.nextUrl, schemas.common.pagination);

            // Business logic
            const users = await prisma.user.findMany({
              /* ... */
            });

            // Return response
            return NextResponse.json({
              success: true,
              data: users,
              timestamp: new Date().toISOString(),
            });
          } catch (error) {
            throw error;
          }
        });
      });
    });
  });
}
```

### Decorator Pattern

```typescript
class UserController {
  @withAuthDecorator()
  @withPermissionDecorator(Permission.READ_USERS)
  @withErrorHandling()
  async getUsers(req: NextRequest) {
    // Implementation
  }
}
```

---

## 🔧 Configuration

### Environment Variables

```bash
# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Rate Limiting
UPSTASH_REDIS_URL="your-redis-url"
UPSTASH_REDIS_TOKEN="your-redis-token"

# Security
NODE_ENV="development" # or "production"
```

### Security Settings

```typescript
// Rate limit configurations
const RATE_LIMITS = {
  // Configure based on your needs
};

// Permission mappings
const ROLE_PERMISSIONS = {
  // Define role-permission relationships
};

// Error handling
const ERROR_CONFIG = {
  logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
  enableStackTraces: process.env.NODE_ENV === 'development',
};
```

---

## 📈 Security Metrics

### Key Performance Indicators (KPIs)

- **Authentication Success Rate**: > 95%
- **Authorization Failure Rate**: < 1%
- **Rate Limit Hit Rate**: < 5%
- **Validation Error Rate**: < 2%
- **Security Incident Rate**: 0

### Monitoring Dashboard

- **Real-time Alerts**: Security violations, rate limit breaches
- **Error Tracking**: Error types, frequencies, trends
- **Performance Metrics**: Response times, throughput
- **User Activity**: Login patterns, permission usage

---

## 🔄 Continuous Security

### Security Best Practices

1. **Regular Updates**: Keep dependencies updated
2. **Security Audits**: Regular code reviews and penetration testing
3. **Monitoring**: Real-time security monitoring
4. **Incident Response**: Plan for security incidents
5. **User Education**: Security awareness training

### Security Checklist

- [ ] Authentication implemented
- [ ] Authorization configured
- [ ] Rate limiting active
- [ ] Input validation in place
- [ ] Error handling consistent
- [ ] Security headers set
- [ ] HTTPS enforced
- [ ] CORS configured
- [ ] SQL injection prevented
- [ ] XSS protection active
- [ ] CSRF protection enabled
- [ ] File upload validation
- [ ] Logging configured
- [ ] Monitoring active

---

## 📞 Support and Maintenance

### Security Contact

- **Security Issues**: security@ehb-platform.com
- **Emergency Contact**: +1-XXX-XXX-XXXX
- **Bug Reports**: GitHub Issues with security label

### Maintenance Schedule

- **Daily**: Security log review
- **Weekly**: Rate limit analysis
- **Monthly**: Permission audit
- **Quarterly**: Security assessment
- **Annually**: Penetration testing

---

_This security implementation provides enterprise-grade protection for the EHB Next.js 04 platform, ensuring data integrity, user privacy, and system reliability._
