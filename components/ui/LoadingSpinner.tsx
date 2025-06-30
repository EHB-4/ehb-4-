'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loading Spinner Component - Multiple variants for different use cases
 * @param {Object} props - Component props
 * @param {string} props.variant - Spinner variant ('default', 'dots', 'pulse', 'bars')
 * @param {string} props.size - Spinner size ('sm', 'md', 'lg', 'xl')
 * @param {string} props.color - Spinner color ('blue', 'green', 'purple', 'white')
 * @param {string} props.text - Loading text to display
 * @param {boolean} props.fullScreen - Whether to display as full screen overlay
 * @returns {JSX.Element} The loading spinner component
 */
interface LoadingSpinnerProps {
  variant?: 'default' | 'dots' | 'pulse' | 'bars' | 'ripple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'green' | 'purple' | 'white' | 'gray';
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  variant = 'default',
  size = 'md',
  color = 'blue',
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    white: 'text-white',
    gray: 'text-gray-600',
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className={`w-2 h-2 bg-current rounded-full ${colorClasses[color]}`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={`${sizeClasses[size]} bg-current rounded-full ${colorClasses[color]}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );

      case 'bars':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                className={`w-1 bg-current ${colorClasses[color]}`}
                animate={{
                  height: ['20px', '40px', '20px'],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        );

      case 'ripple':
        return (
          <div className="relative">
            <motion.div
              className={`${sizeClasses[size]} border-2 border-current rounded-full ${colorClasses[color]}`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className={`${sizeClasses[size]} border-2 border-current rounded-full absolute top-0 left-0 ${colorClasses[color]}`}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5,
                ease: 'easeOut',
              }}
            />
          </div>
        );

      default:
        return (
          <motion.div
            className={`${sizeClasses[size]} border-2 border-gray-300 border-t-current rounded-full ${colorClasses[color]}`}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderSpinner()}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-600 dark:text-gray-400 text-center"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

/**
 * Page Loading Component - Full page loading with skeleton
 * @returns {JSX.Element} The page loading component
 */
export function PageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Skeleton */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
              <div className="w-24 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Title Skeleton */}
          <div className="space-y-2">
            <div className="w-48 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            <div className="w-64 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
                    <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                    <div className="w-32 h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                      <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                    </div>
                    <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Button Loading Component - Loading state for buttons
 * @param {Object} props - Component props
 * @returns {JSX.Element} The button loading component
 */
export function ButtonLoading({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-white border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

/**
 * Inline Loading Component - Small inline loading indicator
 * @returns {JSX.Element} The inline loading component
 */
export function InlineLoading() {
  return (
    <div className="inline-flex items-center space-x-2">
      <LoadingSpinner variant="dots" size="sm" color="gray" />
      <span className="text-sm text-gray-600 dark:text-gray-400">Loading...</span>
    </div>
  );
}
