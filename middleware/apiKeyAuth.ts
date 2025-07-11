import { NextApiRequest, NextApiResponse } from 'next';

export type ApiKeyRole = 'admin' | 'public' | 'internal';

interface ApiKeyConfig {
  requiredRole?: ApiKeyRole;
  requireApiKey?: boolean;
}

export function apiKeyAuth(config: ApiKeyConfig = { requireApiKey: true }) {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const apiKey = req.headers['x-api-key'] as string;

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
