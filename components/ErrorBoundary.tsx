'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Bug, Shield } from 'lucide-react';
import Link from 'next/link';

/**
 * Error Boundary Interface
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Error Boundary State Interface
 */
interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

/**
 * Error Boundary Component - Catches JavaScript errors in child components
 * @extends {Component<Props, State>}
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Generate unique error ID
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    this.setState({ error, errorInfo, errorId });

    // Log error to console
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Send error to error reporting service (e.g., Sentry)
    this.reportError(error, errorInfo, errorId);
  }

  reportError = (error: Error, errorInfo: ErrorInfo, errorId: string) => {
    // Here you would typically send the error to your error reporting service
    // For example, Sentry, LogRocket, etc.

    const errorReport = {
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.group('Error Report');
      console.log('Error ID:', errorId);
      console.log('Error:', error);
      console.log('Error Info:', errorInfo);
      console.log('Error Report:', errorReport);
      console.groupEnd();
    }

    // Send to error reporting service
    // Example: Sentry.captureException(error, { extra: errorReport });
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorId: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorId={this.state.errorId}
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
          onGoBack={this.handleGoBack}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Error Fallback Component - Default error UI
 * @param {Object} props - Component props
 * @returns {JSX.Element} The error fallback component
 */
interface ErrorFallbackProps {
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
  onRetry: () => void;
  onGoHome: () => void;
  onGoBack: () => void;
}

function ErrorFallback({
  error,
  errorInfo,
  errorId,
  onRetry,
  onGoHome,
  onGoBack,
}: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        {/* Error Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We encountered an unexpected error. Please try again or contact support if the problem
            persists.
          </p>
        </div>

        {/* Error ID */}
        {errorId && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-6">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Error ID: <span className="font-mono">{errorId}</span>
            </p>
          </div>
        )}

        {/* Error Details (Collapsible) */}
        {error && (
          <div className="mb-6">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Bug className="w-4 h-4" />
              <span>{showDetails ? 'Hide' : 'Show'} error details</span>
            </button>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                  {error.message}
                </p>
                {error.stack && (
                  <pre className="text-xs text-red-700 dark:text-red-300 overflow-auto max-h-32">
                    {error.stack}
                  </pre>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onGoBack}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>

            <button
              onClick={onGoHome}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </button>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Still having issues?</p>
          <Link
            href="/support"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Error Boundary Hook - Functional component error boundary
 * @param {Object} props - Component props
 * @returns {JSX.Element} The error boundary component
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

/**
 * Error Alert Component - Inline error display
 * @param {Object} props - Component props
 * @returns {JSX.Element} The error alert component
 */
interface ErrorAlertProps {
  error: Error | string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'inline' | 'banner';
}

export function ErrorAlert({ error, onRetry, onDismiss, variant = 'inline' }: ErrorAlertProps) {
  const errorMessage = typeof error === 'string' ? error : error.message;

  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">{errorMessage}</p>
          </div>
          <div className="flex items-center space-x-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium"
              >
                Retry
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="inline-flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
      <AlertTriangle className="w-4 h-4" />
      <span>{errorMessage}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium"
        >
          Retry
        </button>
      )}
    </div>
  );
}
