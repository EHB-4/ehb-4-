'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Shield className="h-16 w-16 text-red-500" />
              <AlertTriangle className="h-8 w-8 text-red-600 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-gray-600 mt-2">You don't have permission to access this page</p>
        </div>

        {/* Error Card */}
        <Card className="shadow-xl border-red-200">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-red-700">Unauthorized Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Sorry, you don't have the required permissions to access this page. This could be
                because:
              </p>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  You're not logged in
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  Your account doesn't have admin privileges
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  Your session has expired
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  You're trying to access a restricted area
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
            </div>

            {/* Help Section */}
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 text-center">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@ehb.com" className="text-blue-600 hover:underline">
                  support@ehb.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Error Code */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">Error Code: 403 - Forbidden</p>
        </div>
      </div>
    </div>
  );
}
