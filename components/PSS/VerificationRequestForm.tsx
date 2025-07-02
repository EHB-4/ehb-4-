"use client";

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  role: string;
  personalInfo: {
    fullName: string;
    contactNumber: string;
    dateOfBirth: string;
    address: string;
  };
  documents: {
    idCard: string;
    license: string;
  };
  liveness: {
    selfie: string;
  };
  payment: {
    amount: number;
    method: string;
    transactionId: string;
  };
}

export default function VerificationRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    role: '',
    personalInfo: {
      fullName: '',
      contactNumber: '',
      dateOfBirth: '',
      address: '',
    },
    documents: {
      idCard: '',
      license: '',
    },
    liveness: {
      selfie: '',
    },
    payment: {
      amount: 50,
      method: 'credit_card',
      transactionId: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (section: keyof FormData, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/pss/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          role: '',
          personalInfo: {
            fullName: '',
            contactNumber: '',
            dateOfBirth: '',
            address: '',
          },
          documents: {
            idCard: '',
            license: '',
          },
          liveness: {
            selfie: '',
          },
          payment: {
            amount: 50,
            method: 'credit_card',
            transactionId: '',
          },
        });
      } else {
        setError(data.error || 'Failed to submit request');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Request Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your verification request has been submitted. We will review your application and
              contact you within 24-48 hours.
            </p>
            <Button onClick={() => setSuccess(false)}>Submit Another Request</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Professional Security Services</h1>
        <p className="text-gray-600 mt-2">Complete verification request form</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Selection */}
        <Card>
          <CardHeader>
            <CardTitle>1. Select Your Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="role">Professional Role *</Label>
              <Select
                value={formData.role}
                onValueChange={value => setFormData(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your professional role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="business">Business Owner</SelectItem>
                  <SelectItem value="franchise">Franchise Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>2. Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.personalInfo.fullName}
                  onChange={e => handleInputChange('personalInfo', 'fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactNumber">Contact Number *</Label>
                <Input
                  id="contactNumber"
                  value={formData.personalInfo.contactNumber}
                  onChange={e => handleInputChange('personalInfo', 'contactNumber', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={e => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.personalInfo.address}
                  onChange={e => handleInputChange('personalInfo', 'address', e.target.value)}
                  placeholder="Enter your complete address"
                  rows={3}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle>3. Document Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idCard">ID Card Number</Label>
                <Input
                  id="idCard"
                  value={formData.documents.idCard}
                  onChange={e => handleInputChange('documents', 'idCard', e.target.value)}
                  placeholder="Enter your ID card number"
                />
              </div>
              <div>
                <Label htmlFor="license">License Number</Label>
                <Input
                  id="license"
                  value={formData.documents.license}
                  onChange={e => handleInputChange('documents', 'license', e.target.value)}
                  placeholder="Enter your license number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liveness Verification */}
        <Card>
          <CardHeader>
            <CardTitle>4. Liveness Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="selfie">Selfie Verification</Label>
              <Input
                id="selfie"
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // In a real app, you would upload the file and get a URL
                    handleInputChange('liveness', 'selfie', file.name);
                  }
                }}
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload a clear photo of yourself for identity verification
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>5. Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.payment.amount}
                  onChange={e => handleInputChange('payment', 'amount', parseFloat(e.target.value))}
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="method">Payment Method</Label>
                <Select
                  value={formData.payment.method}
                  onValueChange={value => handleInputChange('payment', 'method', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="debit_card">Debit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  value={formData.payment.transactionId}
                  onChange={e => handleInputChange('payment', 'transactionId', e.target.value)}
                  placeholder="Enter transaction ID (optional)"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" disabled={loading} className="w-full max-w-md">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Verification Request'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
