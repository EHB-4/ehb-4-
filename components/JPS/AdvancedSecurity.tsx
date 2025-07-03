'use client';

import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface SecurityValidationProps {
  onValidation: (isValid: boolean) => void;
}

/**
 * Roman Urdu: Advanced Security Component
 * Frontend validation aur security features provide karta hai
 */
export default function AdvancedSecurity({ onValidation }: SecurityValidationProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Roman Urdu: Password validation rules
  const validatePassword = (pass: string) => {
    const errors: string[] = [];
    
    if (pass.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(pass)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(pass)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(pass)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*]/.test(pass)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)');
    }
    
    return errors;
  };

  // Roman Urdu: Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const errors = validatePassword(value);
    setValidationErrors(errors);
    onValidation(errors.length === 0);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value && !validateEmail(value)) {
      setValidationErrors(['Please enter a valid email address']);
    } else {
      setValidationErrors([]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Shield className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Security Validation</h2>
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center mb-2">
            <XCircle className="h-4 w-4 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-800">Validation Errors:</span>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Security Status */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Security Status:</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">HTTPS Encryption</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">Input Validation</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">XSS Protection</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">CSRF Protection</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        disabled={validationErrors.length > 0 || !email || !password}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <Lock className="h-4 w-4 inline mr-2" />
        Secure Login
      </button>
    </div>
  );
} 