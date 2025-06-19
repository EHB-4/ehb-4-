import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { AuthenticationError, AuthorizationError } from './errorHandler';

// User roles and permissions
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  TUTOR = 'tutor',
  SHOP = 'shop',
  FRANCHISE = 'franchise',
}

// Permission types
export enum Permission {
  // User management
  READ_USERS = 'read_users',
  WRITE_USERS = 'write_users',
  DELETE_USERS = 'delete_users',

  // Product management
  READ_PRODUCTS = 'read_products',
  WRITE_PRODUCTS = 'write_products',
  DELETE_PRODUCTS = 'delete_products',

  // Order management
  READ_ORDERS = 'read_orders',
  WRITE_ORDERS = 'write_orders',
  DELETE_ORDERS = 'delete_orders',

  // Wallet management
  READ_WALLET = 'read_wallet',
  WRITE_WALLET = 'write_wallet',

  // Healthcare
  READ_MEDICAL_RECORDS = 'read_medical_records',
  WRITE_MEDICAL_RECORDS = 'write_medical_records',

  // Education
  READ_ASSIGNMENTS = 'read_assignments',
  WRITE_ASSIGNMENTS = 'write_assignments',
  GRADE_ASSIGNMENTS = 'grade_assignments',

  // Admin
  SYSTEM_ADMIN = 'system_admin',
  VIEW_ANALYTICS = 'view_analytics',

  // EHB Platform
  MANAGE_ADS = 'manage_ads',
  MANAGE_FRANCHISE = 'manage_franchise',
  MANAGE_AI_AGENTS = 'manage_ai_agents',
}

// Role-based permissions mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.USER]: [
    Permission.READ_PRODUCTS,
    Permission.READ_ORDERS,
    Permission.WRITE_ORDERS,
    Permission.READ_WALLET,
    Permission.WRITE_WALLET,
    Permission.READ_MEDICAL_RECORDS,
    Permission.READ_ASSIGNMENTS,
  ],

  [UserRole.ADMIN]: [
    Permission.READ_PRODUCTS,
    Permission.READ_ORDERS,
    Permission.WRITE_ORDERS,
    Permission.READ_WALLET,
    Permission.WRITE_WALLET,
    Permission.READ_MEDICAL_RECORDS,
    Permission.READ_ASSIGNMENTS,
    Permission.READ_USERS,
    Permission.WRITE_USERS,
    Permission.DELETE_USERS,
    Permission.WRITE_PRODUCTS,
    Permission.DELETE_PRODUCTS,
    Permission.WRITE_ORDERS,
    Permission.DELETE_ORDERS,
    Permission.WRITE_MEDICAL_RECORDS,
    Permission.WRITE_ASSIGNMENTS,
    Permission.GRADE_ASSIGNMENTS,
    Permission.SYSTEM_ADMIN,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_ADS,
    Permission.MANAGE_FRANCHISE,
    Permission.MANAGE_AI_AGENTS,
  ],

  [UserRole.DOCTOR]: [
    Permission.READ_PRODUCTS,
    Permission.READ_ORDERS,
    Permission.WRITE_ORDERS,
    Permission.READ_WALLET,
    Permission.WRITE_WALLET,
    Permission.READ_MEDICAL_RECORDS,
    Permission.READ_ASSIGNMENTS,
    Permission.WRITE_MEDICAL_RECORDS,
  ],

  [UserRole.TUTOR]: [
    Permission.READ_PRODUCTS,
    Permission.READ_ORDERS,
    Permission.WRITE_ORDERS,
    Permission.READ_WALLET,
    Permission.WRITE_WALLET,
    Permission.READ_MEDICAL_RECORDS,
    Permission.READ_ASSIGNMENTS,
    Permission.WRITE_ASSIGNMENTS,
    Permission.GRADE_ASSIGNMENTS,
  ],

  [UserRole.SHOP]: [
    Permission.READ_PRODUCTS,
    Permission.READ_ORDERS,
    Permission.WRITE_ORDERS,
    Permission.READ_WALLET,
    Permission.WRITE_WALLET,
    Permission.READ_MEDICAL_RECORDS,
    Permission.READ_ASSIGNMENTS,
    Permission.WRITE_PRODUCTS,
  ],

  [UserRole.FRANCHISE]: [
    Permission.READ_PRODUCTS,
    Permission.READ_ORDERS,
    Permission.WRITE_ORDERS,
    Permission.READ_WALLET,
    Permission.WRITE_WALLET,
    Permission.READ_MEDICAL_RECORDS,
    Permission.READ_ASSIGNMENTS,
    Permission.MANAGE_ADS,
    Permission.READ_USERS,
    Permission.WRITE_USERS,
  ],
};

// Authentication helper class
export class AuthHelper {
  /**
   * Get current session
   */
  static async getSession() {
    return await getServerSession(authOptions);
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session?.user;
  }

  /**
   * Get current user
   */
  static async getCurrentUser() {
    const session = await this.getSession();
    if (!session?.user) {
      throw new AuthenticationError();
    }
    return session.user;
  }

  /**
   * Check if user has specific role
   */
  static async hasRole(requiredRole: UserRole): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user.role === requiredRole;
  }

  /**
   * Check if user has any of the required roles
   */
  static async hasAnyRole(requiredRoles: UserRole[]): Promise<boolean> {
    const user = await this.getCurrentUser();
    return requiredRoles.includes(user.role as UserRole);
  }

  /**
   * Check if user has specific permission
   */
  static async hasPermission(permission: Permission): Promise<boolean> {
    const user = await this.getCurrentUser();
    const userRole = user.role as UserRole;
    const permissions = ROLE_PERMISSIONS[userRole] || [];
    return permissions.includes(permission);
  }

  /**
   * Check if user has any of the required permissions
   */
  static async hasAnyPermission(permissions: Permission[]): Promise<boolean> {
    const user = await this.getCurrentUser();
    const userRole = user.role as UserRole;
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];
    return permissions.some(permission => userPermissions.includes(permission));
  }

  /**
   * Check if user has all required permissions
   */
  static async hasAllPermissions(permissions: Permission[]): Promise<boolean> {
    const user = await this.getCurrentUser();
    const userRole = user.role as UserRole;
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];
    return permissions.every(permission => userPermissions.includes(permission));
  }

  /**
   * Get user permissions
   */
  static async getUserPermissions(): Promise<Permission[]> {
    const user = await this.getCurrentUser();
    const userRole = user.role as UserRole;
    return ROLE_PERMISSIONS[userRole] || [];
  }

  /**
   * Check if user can access resource (owner or admin)
   */
  static async canAccessResource(resourceUserId: string): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user.id === resourceUserId || user.role === UserRole.ADMIN;
  }

  /**
   * Check if user can manage franchise
   */
  static async canManageFranchise(franchiseId: string): Promise<boolean> {
    const user = await this.getCurrentUser();
    return (
      user.role === UserRole.ADMIN ||
      (user.role === UserRole.FRANCHISE && (user as any).franchiseId === franchiseId)
    );
  }
}

// Authentication middleware
export async function withAuth(
  req: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const session = await AuthHelper.getSession();
    if (!session?.user) {
      throw new AuthenticationError();
    }
    return await handler();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            type: 'AUTHENTICATION_ERROR',
            message: error.message,
            code: 'AUTH_REQUIRED',
            timestamp: new Date().toISOString(),
          },
        },
        { status: 401 }
      );
    }
    throw error;
  }
}

// Role-based authorization middleware
export function withRole(requiredRole: UserRole) {
  return async function (
    req: NextRequest,
    handler: () => Promise<NextResponse>
  ): Promise<NextResponse> {
    try {
      const hasRole = await AuthHelper.hasRole(requiredRole);
      if (!hasRole) {
        throw new AuthorizationError(`Role ${requiredRole} required`);
      }
      return await handler();
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return NextResponse.json(
          {
            success: false,
            error: {
              type: 'AUTHORIZATION_ERROR',
              message: error.message,
              code: 'INSUFFICIENT_PERMISSIONS',
              timestamp: new Date().toISOString(),
            },
          },
          { status: 403 }
        );
      }
      throw error;
    }
  };
}

// Permission-based authorization middleware
export function withPermission(requiredPermission: Permission) {
  return async function (
    req: NextRequest,
    handler: () => Promise<NextResponse>
  ): Promise<NextResponse> {
    try {
      const hasPermission = await AuthHelper.hasPermission(requiredPermission);
      if (!hasPermission) {
        throw new AuthorizationError(`Permission ${requiredPermission} required`);
      }
      return await handler();
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return NextResponse.json(
          {
            success: false,
            error: {
              type: 'AUTHORIZATION_ERROR',
              message: error.message,
              code: 'INSUFFICIENT_PERMISSIONS',
              timestamp: new Date().toISOString(),
            },
          },
          { status: 403 }
        );
      }
      throw error;
    }
  };
}

// Multiple permissions authorization middleware
export function withAnyPermission(requiredPermissions: Permission[]) {
  return async function (
    req: NextRequest,
    handler: () => Promise<NextResponse>
  ): Promise<NextResponse> {
    try {
      const hasPermission = await AuthHelper.hasAnyPermission(requiredPermissions);
      if (!hasPermission) {
        throw new AuthorizationError(
          `One of permissions ${requiredPermissions.join(', ')} required`
        );
      }
      return await handler();
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return NextResponse.json(
          {
            success: false,
            error: {
              type: 'AUTHORIZATION_ERROR',
              message: error.message,
              code: 'INSUFFICIENT_PERMISSIONS',
              timestamp: new Date().toISOString(),
            },
          },
          { status: 403 }
        );
      }
      throw error;
    }
  };
}

// Resource ownership middleware
export function withResourceAccess(
  getResourceUserId: (req: NextRequest) => string | Promise<string>
) {
  return async function (
    req: NextRequest,
    handler: () => Promise<NextResponse>
  ): Promise<NextResponse> {
    try {
      const resourceUserId = await getResourceUserId(req);
      const canAccess = await AuthHelper.canAccessResource(resourceUserId);
      if (!canAccess) {
        throw new AuthorizationError('Access denied to this resource');
      }
      return await handler();
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return NextResponse.json(
          {
            success: false,
            error: {
              type: 'AUTHORIZATION_ERROR',
              message: error.message,
              code: 'INSUFFICIENT_PERMISSIONS',
              timestamp: new Date().toISOString(),
            },
          },
          { status: 403 }
        );
      }
      throw error;
    }
  };
}

// Authentication decorator
export function withAuthDecorator() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextRequest, ...args: any[]) {
      const session = await AuthHelper.getSession();
      if (!session?.user) {
        return NextResponse.json(
          {
            success: false,
            error: {
              type: 'AUTHENTICATION_ERROR',
              message: 'Authentication required',
              code: 'AUTH_REQUIRED',
              timestamp: new Date().toISOString(),
            },
          },
          { status: 401 }
        );
      }
      return originalMethod.apply(this, [req, ...args]);
    };

    return descriptor;
  };
}

// Role-based authorization decorator
export function withRoleDecorator(requiredRole: UserRole) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextRequest, ...args: any[]) {
      const hasRole = await AuthHelper.hasRole(requiredRole);
      if (!hasRole) {
        return NextResponse.json(
          {
            success: false,
            error: {
              type: 'AUTHORIZATION_ERROR',
              message: `Role ${requiredRole} required`,
              code: 'INSUFFICIENT_PERMISSIONS',
              timestamp: new Date().toISOString(),
            },
          },
          { status: 403 }
        );
      }
      return originalMethod.apply(this, [req, ...args]);
    };

    return descriptor;
  };
}

// Permission-based authorization decorator
export function withPermissionDecorator(requiredPermission: Permission) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextRequest, ...args: any[]) {
      const hasPermission = await AuthHelper.hasPermission(requiredPermission);
      if (!hasPermission) {
        return NextResponse.json(
          {
            success: false,
            error: {
              type: 'AUTHORIZATION_ERROR',
              message: `Permission ${requiredPermission} required`,
              code: 'INSUFFICIENT_PERMISSIONS',
              timestamp: new Date().toISOString(),
            },
          },
          { status: 403 }
        );
      }
      return originalMethod.apply(this, [req, ...args]);
    };

    return descriptor;
  };
}

// Security headers middleware
export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Add CSP header in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
    );
  }

  return response;
}
