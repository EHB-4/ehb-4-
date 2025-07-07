export const runtime = 'nodejs';

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export type ApiKeyRole = 'admin' | 'public' | 'internal';

interface ApiKeyConfig {
  requiredRole?: ApiKeyRole;
  requireApiKey?: boolean;
  allowedIPs?: string[];
}

export function apiKeyCheck(config: ApiKeyConfig = { requireApiKey: true }) {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const apiKey = req.headers['x-api-key'] as string;
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // If API key is not required, proceed
    if (!config.requireApiKey) {
      return next();
    }

    // Check if API key is present
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        error: 'API key is required',
      });
    }

    try {
      // TODO: Replace with AWS data access
      // Validate API key from database
      // const keyData = await prisma.apiKey.findUnique({
      //   where: { key: apiKey },
      //   include: { user: true },
      // });

      if (!keyData) {
        return res.status(401).json({
          success: false,
          error: 'Invalid API key',
        });
      }

      // Check if key is active
      if (!keyData.isActive) {
        return res.status(401).json({
          success: false,
          error: 'API key is inactive',
        });
      }

      // Check IP restrictions if configured
      if (config.allowedIPs && clientIP) {
        const isAllowedIP = config.allowedIPs.includes(clientIP as string);
        if (!isAllowedIP) {
          return res.status(403).json({
            success: false,
            error: 'IP address not authorized',
          });
        }
      }

      // Check role if required
      if (config.requiredRole && keyData.role !== config.requiredRole) {
        return res.status(403).json({
          success: false,
          error: `API key role '${keyData.role}' is not authorized for this endpoint`,
        });
      }

      // Add user and key info to request
      req.user = keyData.user;
      req.apiKey = keyData;

      // Log API access
      // await prisma.apiAccessLog.create({
      //   data: {
      //     apiKeyId: keyData.id,
      //     endpoint: req.url || '',
      //     method: req.method,
      //     ip: clientIP as string,
      //     userAgent: req.headers['user-agent'] || '',
      //   },
      // });

      next();
    } catch (error) {
      console.error('API key validation error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  };
}

// Export common configurations
export const apiKeyConfigs = {
  admin: {
    requireApiKey: true,
    requiredRole: 'admin' as ApiKeyRole,
  },
  public: {
    requireApiKey: true,
    requiredRole: 'public' as ApiKeyRole,
  },
  internal: {
    requireApiKey: true,
    requiredRole: 'internal' as ApiKeyRole,
  },
  optional: {
    requireApiKey: false,
  },
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Allow only /development-portal and static assets
  if (
    pathname === '/development-portal' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/manifest.json') ||
    pathname.startsWith('/assets')
  ) {
    return NextResponse.next();
  }
  // Redirect all other routes to /development-portal
  const url = request.nextUrl.clone();
  url.pathname = '/development-portal';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/:path*',
};
