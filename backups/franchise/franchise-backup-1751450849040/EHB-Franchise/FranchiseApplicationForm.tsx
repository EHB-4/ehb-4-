'use client';

import React, { useState } from 'react';
import { ServiceCategory, FranchiseType } from './FranchiseUtils/FranchiseTypes';

interface FranchiseApplicationFormProps {
  onSubmit: (data: FranchiseApplicationData) => void;
  onCancel: () => void;
}

export interface FranchiseApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cnic: string;
  dateOfBirth: string;

  // Business Information
  businessName: string;
  businessExperience: string;
  currentBusiness: string;

  // Franchise Details
  serviceCategory: ServiceCategory;
  franchiseType: FranchiseType;
  preferredLocation: {
    city: string;
    area: string;
    postalCode: string;
  };

  // Financial Information
  investmentAmount: string;
  sourceOfFunds: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };

  // Documents
  documents: {
    cnicFront: File | null;
    cnicBack: File | null;
    bankStatement: File | null;
    experienceCertificate: File | null;
    businessPlan: File | null;
  };

  // Additional Information
  jpsProfile: string;
  walletTokenLock: boolean;
  agreeToTerms: boolean;
}

const FranchiseApplicationForm: React.FC<FranchiseApplicationFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FranchiseApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cnic: '',
    dateOfBirth: '',
    businessName: '',
    businessExperience: '',
    currentBusiness: '',
    serviceCategory: ServiceCategory.GOSELLR,
    franchiseType: FranchiseType.SUB,
    preferredLocation: {
      city: '',
      area: '',
      postalCode: '',
    },
    investmentAmount: '',
    sourceOfFunds: '',
    bankDetails: {
      bankName: '',
      accountNumber: '',
      accountHolder: '',
    },
    documents: {
      cnicFront: null,
      cnicBack: null,
      bankStatement: null,
      experienceCertificate: null,
      businessPlan: null,
    },
    jpsProfile: '',
    walletTokenLock: false,
    agreeToTerms: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Partial<FranchiseApplicationData>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field as keyof FranchiseApplicationData]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleLocationChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      preferredLocation: {
        ...prev.preferredLocation,
        [field]: value,
      },
    }));
  };

  const handleBankDetailsChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [field]: value,
      },
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file,
      },
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FranchiseApplicationData> = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.cnic) newErrors.cnic = 'CNIC is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        break;
      case 2:
        if (!formData.businessName) newErrors.businessName = 'Business name is required';
        if (!formData.businessExperience)
          newErrors.businessExperience = 'Business experience is required';
        break;
      case 3:
        if (!formData.preferredLocation.city)
          newErrors.preferredLocation = { city: 'City is required' };
        if (!formData.preferredLocation.area)
          newErrors.preferredLocation = { area: 'Area is required' };
        if (!formData.investmentAmount)
          newErrors.investmentAmount = 'Investment amount is required';
        break;
      case 4:
        if (!formData.bankDetails.bankName)
          newErrors.bankDetails = { bankName: 'Bank name is required' };
        if (!formData.bankDetails.accountNumber)
          newErrors.bankDetails = { accountNumber: 'Account number is required' };
        break;
      case 5:
        if (!formData.documents.cnicFront)
          newErrors.documents = { cnicFront: 'CNIC front is required' };
        if (!formData.documents.cnicBack)
          newErrors.documents = { cnicBack: 'CNIC back is required' };
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep) && formData.agreeToTerms) {
      onSubmit(formData);
    } else if (!formData.agreeToTerms) {
      setErrors({ agreeToTerms: 'You must agree to the terms and conditions' });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={e => handleInputChange('firstName', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.firstName ? 'border-red-500' : ''
            }`}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={e => handleInputChange('lastName', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.lastName ? 'border-red-500' : ''
            }`}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.phone ? 'border-red-500' : ''
            }`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CNIC *</label>
          <input
            type="text"
            value={formData.cnic}
            onChange={e => handleInputChange('cnic', e.target.value)}
            placeholder="00000-0000000-0"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.cnic ? 'border-red-500' : ''
            }`}
          />
          {errors.cnic && <p className="mt-1 text-sm text-red-600">{errors.cnic}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={e => handleInputChange('dateOfBirth', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.dateOfBirth ? 'border-red-500' : ''
            }`}
          />
          {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Name *</label>
          <input
            type="text"
            value={formData.businessName}
            onChange={e => handleInputChange('businessName', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.businessName ? 'border-red-500' : ''
            }`}
          />
          {errors.businessName && (
            <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Experience *</label>
          <textarea
            value={formData.businessExperience}
            onChange={e => handleInputChange('businessExperience', e.target.value)}
            rows={4}
            placeholder="Describe your business experience and background..."
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.businessExperience ? 'border-red-500' : ''
            }`}
          />
          {errors.businessExperience && (
            <p className="mt-1 text-sm text-red-600">{errors.businessExperience}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Business (if any)
          </label>
          <input
            type="text"
            value={formData.currentBusiness}
            onChange={e => handleInputChange('currentBusiness', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Franchise Details</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Service Category *</label>
          <select
            value={formData.serviceCategory}
            onChange={e => handleInputChange('serviceCategory', e.target.value as ServiceCategory)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={ServiceCategory.GOSELLR}>GoSellr</option>
            <option value={ServiceCategory.HEALTH}>Health Services</option>
            <option value={ServiceCategory.LAW}>Legal Services</option>
            <option value={ServiceCategory.EDUCATION}>Education Services</option>
            <option value={ServiceCategory.TRAVEL}>Travel Services</option>
            <option value={ServiceCategory.BOOKS}>Book Services</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Franchise Type *</label>
          <select
            value={formData.franchiseType}
            onChange={e => handleInputChange('franchiseType', e.target.value as FranchiseType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={FranchiseType.SUB}>Sub Franchise</option>
            <option value={FranchiseType.MASTER}>Master Franchise</option>
            <option value={FranchiseType.CORPORATE}>Corporate Franchise</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">City *</label>
            <input
              type="text"
              value={formData.preferredLocation.city}
              onChange={e => handleLocationChange('city', e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.preferredLocation?.city ? 'border-red-500' : ''
              }`}
            />
            {errors.preferredLocation?.city && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredLocation.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Area *</label>
            <input
              type="text"
              value={formData.preferredLocation.area}
              onChange={e => handleLocationChange('area', e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.preferredLocation?.area ? 'border-red-500' : ''
              }`}
            />
            {errors.preferredLocation?.area && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredLocation.area}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              value={formData.preferredLocation.postalCode}
              onChange={e => handleLocationChange('postalCode', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Investment Amount *</label>
          <input
            type="text"
            value={formData.investmentAmount}
            onChange={e => handleInputChange('investmentAmount', e.target.value)}
            placeholder="e.g., $50,000 - $100,000"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.investmentAmount ? 'border-red-500' : ''
            }`}
          />
          {errors.investmentAmount && (
            <p className="mt-1 text-sm text-red-600">{errors.investmentAmount}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Source of Funds</label>
          <textarea
            value={formData.sourceOfFunds}
            onChange={e => handleInputChange('sourceOfFunds', e.target.value)}
            rows={3}
            placeholder="Describe the source of your investment funds..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Banking Information</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bank Name *</label>
          <input
            type="text"
            value={formData.bankDetails.bankName}
            onChange={e => handleBankDetailsChange('bankName', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.bankDetails?.bankName ? 'border-red-500' : ''
            }`}
          />
          {errors.bankDetails?.bankName && (
            <p className="mt-1 text-sm text-red-600">{errors.bankDetails.bankName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Account Number *</label>
          <input
            type="text"
            value={formData.bankDetails.accountNumber}
            onChange={e => handleBankDetailsChange('accountNumber', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.bankDetails?.accountNumber ? 'border-red-500' : ''
            }`}
          />
          {errors.bankDetails?.accountNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.bankDetails.accountNumber}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
          <input
            type="text"
            value={formData.bankDetails.accountHolder}
            onChange={e => handleBankDetailsChange('accountHolder', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            JPS Profile (if available)
          </label>
          <input
            type="text"
            value={formData.jpsProfile}
            onChange={e => handleInputChange('jpsProfile', e.target.value)}
            placeholder="Your JPS profile ID or username"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.walletTokenLock}
            onChange={e => handleInputChange('walletTokenLock', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            I agree to lock EHBGC tokens for validator eligibility
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Required Documents</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">CNIC Front *</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={e => handleFileChange('cnicFront', e.target.files?.[0] || null)}
            className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
              errors.documents?.cnicFront ? 'border-red-500' : ''
            }`}
          />
          {errors.documents?.cnicFront && (
            <p className="mt-1 text-sm text-red-600">{errors.documents.cnicFront}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CNIC Back *</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={e => handleFileChange('cnicBack', e.target.files?.[0] || null)}
            className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
              errors.documents?.cnicBack ? 'border-red-500' : ''
            }`}
          />
          {errors.documents?.cnicBack && (
            <p className="mt-1 text-sm text-red-600">{errors.documents.cnicBack}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bank Statement (Last 3 months)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e => handleFileChange('bankStatement', e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Experience Certificate</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e => handleFileChange('experienceCertificate', e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Plan</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e => handleFileChange('businessPlan', e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Terms and Conditions</h3>
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Franchise Agreement Terms</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• You agree to maintain service quality standards as defined by EHB</li>
            <li>• You will comply with all local and national regulations</li>
            <li>• You understand the penalty system for violations</li>
            <li>• You agree to participate in training and support programs</li>
            <li>• You will maintain proper documentation and reporting</li>
            <li>• You understand the revenue sharing model</li>
            <li>• You agree to the territory and exclusivity terms</li>
          </ul>
        </div>
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={e => handleInputChange('agreeToTerms', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
          />
          <label className="ml-2 block text-sm text-gray-900">
            I have read and agree to the terms and conditions of the franchise agreement *
          </label>
        </div>
        {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Franchise Application</h2>
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5, 6].map(step => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-500">Step {currentStep} of 6</span>
        </div>
      </div>

      <form onSubmit={e => e.preventDefault()}>
        {renderCurrentStep()}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <div className="flex space-x-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Previous
              </button>
            )}
            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FranchiseApplicationForm;
