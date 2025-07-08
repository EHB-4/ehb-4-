'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Circle,
  Building,
  MapPin,
  DollarSign,
  Users,
  FileText,
  Upload,
  Send,
} from 'lucide-react';

interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const steps: ApplicationStep[] = [
  {
    id: 1,
    title: 'Personal Information',
    description: 'Basic details about yourself',
    completed: false,
  },
  {
    id: 2,
    title: 'Business Details',
    description: 'Information about your business',
    completed: false,
  },
  {
    id: 3,
    title: 'Franchise Selection',
    description: 'Choose your preferred franchise',
    completed: false,
  },
  {
    id: 4,
    title: 'Financial Information',
    description: 'Investment and financial details',
    completed: false,
  },
  {
    id: 5,
    title: 'Documents & Review',
    description: 'Upload documents and review',
    completed: false,
  },
];

const franchiseCategories = [
  { id: 'health', name: 'Health & Wellness', investment: 'PKR 2M - 8M' },
  { id: 'education', name: 'Education & Training', investment: 'PKR 1M - 5M' },
  { id: 'technology', name: 'Technology & IT', investment: 'PKR 3M - 10M' },
  { id: 'retail', name: 'Retail & E-commerce', investment: 'PKR 1M - 6M' },
  { id: 'food', name: 'Food & Beverage', investment: 'PKR 2M - 8M' },
  { id: 'travel', name: 'Travel & Tourism', investment: 'PKR 2M - 10M' },
];

export default function FranchiseApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Pakistan',

    // Business Details
    businessName: '',
    businessType: '',
    experience: '',
    motivation: '',

    // Franchise Selection
    category: '',
    location: '',
    investment: '',

    // Financial Information
    annualIncome: '',
    netWorth: '',
    fundingSource: '',

    // Documents
    documents: [] as File[],
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.businessName && formData.businessType && formData.experience;
      case 3:
        return formData.category && formData.location && formData.investment;
      case 4:
        return formData.annualIncome && formData.netWorth && formData.fundingSource;
      case 5:
        return formData.documents.length > 0;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitApplication = async () => {
    // Mock submission
    console.log('Submitting application:', formData);
    alert('Application submitted successfully!');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    updateFormData('documents', [...formData.documents, ...files]);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={e => updateFormData('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={e => updateFormData('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => updateFormData('email', e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={e => updateFormData('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={e => updateFormData('address', e.target.value)}
                placeholder="Enter your address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={e => updateFormData('city', e.target.value)}
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={value => updateFormData('country', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={e => updateFormData('businessName', e.target.value)}
                placeholder="Enter your business name"
              />
            </div>
            <div>
              <Label htmlFor="businessType">Business Type *</Label>
              <Select
                value={formData.businessType}
                onValueChange={value => updateFormData('businessType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="llc">LLC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">Business Experience *</Label>
              <Select
                value={formData.experience}
                onValueChange={value => updateFormData('experience', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No experience</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="motivation">Motivation for Franchise</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={e => updateFormData('motivation', e.target.value)}
                placeholder="Tell us why you want to join our franchise program"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="category">Franchise Category *</Label>
              <Select
                value={formData.category}
                onValueChange={value => updateFormData('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select franchise category" />
                </SelectTrigger>
                <SelectContent>
                  {franchiseCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} - {category.investment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Preferred Location *</Label>
              <Select
                value={formData.location}
                onValueChange={value => updateFormData('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karachi">Karachi</SelectItem>
                  <SelectItem value="lahore">Lahore</SelectItem>
                  <SelectItem value="islamabad">Islamabad</SelectItem>
                  <SelectItem value="faisalabad">Faisalabad</SelectItem>
                  <SelectItem value="multan">Multan</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="investment">Investment Range *</Label>
              <Select
                value={formData.investment}
                onValueChange={value => updateFormData('investment', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select investment range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m-3m">PKR 1M - 3M</SelectItem>
                  <SelectItem value="3m-5m">PKR 3M - 5M</SelectItem>
                  <SelectItem value="5m-8m">PKR 5M - 8M</SelectItem>
                  <SelectItem value="8m+">PKR 8M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="annualIncome">Annual Income *</Label>
              <Select
                value={formData.annualIncome}
                onValueChange={value => updateFormData('annualIncome', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select annual income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500k-1m">PKR 500K - 1M</SelectItem>
                  <SelectItem value="1m-3m">PKR 1M - 3M</SelectItem>
                  <SelectItem value="3m-5m">PKR 3M - 5M</SelectItem>
                  <SelectItem value="5m+">PKR 5M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="netWorth">Net Worth *</Label>
              <Select
                value={formData.netWorth}
                onValueChange={value => updateFormData('netWorth', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select net worth range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m-3m">PKR 1M - 3M</SelectItem>
                  <SelectItem value="3m-5m">PKR 3M - 5M</SelectItem>
                  <SelectItem value="5m-10m">PKR 5M - 10M</SelectItem>
                  <SelectItem value="10m+">PKR 10M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fundingSource">Funding Source *</Label>
              <Select
                value={formData.fundingSource}
                onValueChange={value => updateFormData('fundingSource', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select funding source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Savings</SelectItem>
                  <SelectItem value="loan">Bank Loan</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label>Required Documents</Label>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="cnic" />
                  <Label htmlFor="cnic">CNIC Copy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="bankStatement" />
                  <Label htmlFor="bankStatement">Bank Statement (Last 6 months)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="businessPlan" />
                  <Label htmlFor="businessPlan">Business Plan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="experience" />
                  <Label htmlFor="experience">Experience Certificates</Label>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="documents">Upload Documents</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                <Input
                  id="documents"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="mt-4"
                />
              </div>
            </div>
            {formData.documents.length > 0 && (
              <div>
                <Label>Uploaded Documents</Label>
                <div className="space-y-2">
                  {formData.documents.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="secondary">{file.size} bytes</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Franchise Application</h1>
          <p className="text-gray-600">
            Complete your application to join the EHB franchise network
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step.id <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.id < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>
              Step {currentStep} of {steps.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep === steps.length ? (
            <Button
              onClick={submitApplication}
              className="flex items-center bg-green-600 hover:bg-green-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Application
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
              className="flex items-center"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
