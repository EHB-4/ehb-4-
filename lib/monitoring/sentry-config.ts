import * as Sentry from '@sentry/nextjs';

// Sentry Configuration
export const initSentry = () => {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,

      // Performance monitoring
      integrations: [
        new Sentry.BrowserTracing({
          tracePropagationTargets: ['localhost', 'your-domain.com'],
        }),
        new Sentry.Replay({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],

      // Error filtering
      beforeSend(event) {
        // Filter out certain errors
        if (event.exception) {
          const exception = event.exception.values?.[0];
          if (exception?.type === 'NetworkError') {
            return null; // Don't send network errors
          }
        }
        return event;
      },
    });
  }
};

// Error tracking functions
export const captureException = (error: Error, context?: any) => {
  if (process.env.SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    });
  }
  console.error('Error captured:', error, context);
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  if (process.env.SENTRY_DSN) {
    Sentry.captureMessage(message, level);
  }
  console.log(`[${level.toUpperCase()}] ${message}`);
};

// Performance monitoring
export const startTransaction = (name: string, operation: string) => {
  if (process.env.SENTRY_DSN) {
    return Sentry.startTransaction({
      name,
      op: operation,
    });
  }
  return null;
};

// User tracking
export const setUser = (user: { id: string; email: string; username?: string }) => {
  if (process.env.SENTRY_DSN) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  }
};

// Custom metrics
export const addBreadcrumb = (message: string, category: string, data?: any) => {
  if (process.env.SENTRY_DSN) {
    Sentry.addBreadcrumb({
      message,
      category,
      data,
      level: 'info',
    });
  }
};
