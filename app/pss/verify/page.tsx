"use client";

'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  User,
  Briefcase,
  Building,
  Heart,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  Camera,
  Wallet,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import AIChatAssistant from '@/components/PSS/AIChatAssistant';
import { submitVerificationRequest } from '@/lib/pss/api';

const steps = [
  { id: '01', name: 'Select Your Role', fields: ['role'] },
  { id: '02', name: 'Personal Information', fields: ['fullName', 'contactNumber'] },
  { id: '03', name: 'Document Upload', fields: ['idCard'] },
  { id: '04', name: 'Liveness Check', fields: ['selfie'] },
  { id: '05', name: 'Review & Payment', fields: [] },
];

const roles = [
  {
    id: 'patient',
    title: 'Patient / User',
    description: 'For general users to verify their identity.',
    icon: <User className="h-8 w-8 text-blue-500" />,
  },
  {
    id: 'doctor',
    title: 'Doctor / Professional',
    description: 'For certified professionals like doctors, lawyers etc.',
    icon: <Heart className="h-8 w-8 text-red-500" />,
  },
  {
    id: 'business',
    title: 'Business / Service Provider',
    description: 'For registered businesses and service providers.',
    icon: <Briefcase className="h-8 w-8 text-yellow-500" />,
    fee: 2000,
  },
  {
    id: 'franchise',
    title: 'Franchise',
    description: 'For EHB-affiliated franchise owners.',
    icon: <Building className="h-8 w-8 text-purple-500" />,
    fee: 10000,
  },
];

// Full form data structure
interface FormData {
  role: string;
  personalInfo: {
    fullName: string;
    contactNumber: string;
    dateOfBirth: string;
    address: string;
  };
  documents: {
    idCard: File | null;
    license: File | null;
  };
  liveness: {
    selfie: string | null; // Will store image data URL
  };
  // ... other steps data will be added here
}

export default function VerificationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    role: '',
    personalInfo: {
      fullName: '',
      contactNumber: '',
      dateOfBirth: '',
      address: '',
    },
    documents: {
      idCard: null,
      license: null,
    },
    liveness: {
      selfie: null,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [name]: files[0],
        },
      }));
    }
  };

  const handleSelfieCapture = () => {
    // In a real app, this would trigger the camera and return a base64 image
    const mockSelfie =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    setFormData(prev => ({
      ...prev,
      liveness: { ...prev.liveness, selfie: mockSelfie },
    }));
  };

  const getFeeForRole = (roleId: string) => {
    return roles.find(r => r.id === roleId)?.fee || 0;
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    const currentFields = steps[currentStep]?.fields;
    if (!currentFields) return true; // No fields to validate

    if (currentFields.includes('role') && !formData.role) return false;
    if (currentFields.includes('fullName') && !formData.personalInfo.fullName) return false;
    if (currentFields.includes('contactNumber') && !formData.personalInfo.contactNumber)
      return false;
    if (currentFields.includes('idCard') && !formData.documents.idCard) return false;
    if (currentFields.includes('selfie') && !formData.liveness.selfie) return false;

    return true;
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // Prepare data for API
      const submitData = {
        role: formData.role,
        personalInfo: formData.personalInfo,
        documents: {
          ...(formData.documents.idCard && { idCard: 'uploaded' }),
          ...(formData.documents.license && { license: 'uploaded' }),
        },
        liveness: {
          ...(formData.liveness.selfie && { selfie: formData.liveness.selfie }),
        },
        payment: {
          amount: getFeeForRole(formData.role),
          method: 'card',
          transactionId: `TXN-${Date.now()}`,
        },
      };

      // Submit to API
      const response = await submitVerificationRequest(submitData);

      if (response.success) {
        setSubmitted(true);
      } else {
        setError('Failed to submit verification request');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error submitting verification request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/pss">
            <Button variant="link" className="text-green-600 dark:text-green-400">
              Back to PSS Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mt-2">AI Verification Process</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Securely verify your identity in just a few steps.
          </p>
        </div>

        {/* Success State */}
        {submitted && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Verification Request Submitted!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your verification request has been successfully submitted. Our team will review your
                application and you'll receive updates via email.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>• You'll receive a confirmation email shortly</p>
                <p>• Review typically takes 24-48 hours</p>
                <p>• You can check your status anytime</p>
              </div>
              <div className="mt-8 space-x-4">
                <Link href="/pss">
                  <Button variant="outline">Back to PSS Home</Button>
                </Link>
                <Button onClick={() => window.location.reload()}>Submit Another Request</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Form - Hide when submitted */}
        {!submitted && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Stepper */}
            <div className="md:col-span-1">
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={step.id} className="flex items-center">
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${index <= currentStep ? 'bg-green-600' : 'bg-gray-400'}`}
                    >
                      {index < currentStep ? '✔' : step.id}
                    </span>
                    <span
                      className={`ml-4 font-medium ${index <= currentStep ? 'text-green-700 dark:text-green-300' : 'text-gray-500'}`}
                    >
                      {step.name}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Form Card */}
            <div className="md:col-span-3">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {steps[currentStep]?.name || 'Verification Step'}
                  </CardTitle>
                  <CardDescription>
                    {currentStep < steps.length
                      ? 'Please complete the step below to proceed.'
                      : 'Review your details.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[300px]">
                  {/* Step 1: Role Selection */}
                  {currentStep === 0 && (
                    <RadioGroup
                      value={formData.role}
                      onValueChange={role => setFormData(prev => ({ ...prev, role }))}
                      className="space-y-4"
                    >
                      {roles.map(role => (
                        <Label
                          key={role.id}
                          htmlFor={role.id}
                          className={`flex items-start space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.role === role.id ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                        >
                          {role.icon}
                          <div className="flex-1">
                            <RadioGroupItem value={role.id} id={role.id} className="sr-only" />
                            <h4 className="font-bold text-lg">{role.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {role.description}
                            </p>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  )}
                  {/* Step 2: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-in fade-in-50">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.personalInfo.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input
                          id="contactNumber"
                          name="contactNumber"
                          value={formData.personalInfo.contactNumber}
                          onChange={handleInputChange}
                          placeholder="+92 300 1234567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.personalInfo.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Full Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.personalInfo.address}
                          onChange={handleInputChange}
                          placeholder="123, Main Street, City, Country"
                        />
                      </div>
                    </div>
                  )}
                  {/* Step 3: Document Upload */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in-50">
                      <div>
                        <Label htmlFor="idCard" className="text-lg font-semibold">
                          National ID Card / CNIC
                        </Label>
                        <p className="text-sm text-gray-500 mb-2">
                          Please upload a clear image of the front and back.
                        </p>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="idCard"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and
                                drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG, or PDF (MAX. 5MB)</p>
                            </div>
                            <Input
                              id="idCard"
                              name="idCard"
                              type="file"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        {formData.documents.idCard && (
                          <p className="text-sm text-green-600 mt-2">
                            File selected: {formData.documents.idCard.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="license" className="text-lg font-semibold">
                          Professional License / Certificate
                        </Label>
                        <p className="text-sm text-gray-500 mb-2">
                          Required for Doctors, Service Providers etc.
                        </p>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="license"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and
                                drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG, or PDF (MAX. 5MB)</p>
                            </div>
                            <Input
                              id="license"
                              name="license"
                              type="file"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        {formData.documents.license && (
                          <p className="text-sm text-green-600 mt-2">
                            File selected: {formData.documents.license.name}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Step 4: Liveness Check */}
                  {currentStep === 3 && (
                    <div className="space-y-6 text-center animate-in fade-in-50">
                      <h3 className="text-lg font-semibold">Liveness Check</h3>
                      <p className="text-sm text-gray-500">
                        Please look into the camera and hold still.
                      </p>
                      <div className="w-64 h-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                        {formData.liveness.selfie ? (
                          <img
                            src={formData.liveness.selfie}
                            alt="Selfie Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="w-16 h-16 text-gray-400" />
                        )}
                      </div>
                      <Button onClick={handleSelfieCapture}>
                        {formData.liveness.selfie ? 'Retake Selfie' : 'Take Selfie'}
                      </Button>
                    </div>
                  )}
                  {/* Step 5: Review & Payment */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-in fade-in-50">
                      <div>
                        <h3 className="text-lg font-semibold border-b pb-2">
                          Review Your Information
                        </h3>
                        <div className="mt-4 space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>
                              <strong>Role:</strong>
                            </span>{' '}
                            <span>{roles.find(r => r.id === formData.role)?.title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>
                              <strong>Full Name:</strong>
                            </span>{' '}
                            <span>{formData.personalInfo.fullName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>
                              <strong>Contact:</strong>
                            </span>{' '}
                            <span>{formData.personalInfo.contactNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>
                              <strong>ID Card:</strong>
                            </span>{' '}
                            <span>{formData.documents.idCard?.name || 'Not uploaded'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>
                              <strong>License:</strong>
                            </span>{' '}
                            <span>{formData.documents.license?.name || 'Not uploaded'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>
                              <strong>Selfie Taken:</strong>
                            </span>{' '}
                            <span>{formData.liveness.selfie ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold border-b pb-2 mt-6">Payment</h3>
                        <div className="flex items-center justify-between mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <p className="font-semibold text-gray-600 dark:text-gray-300">
                            One-Time Verification Fee
                          </p>
                          <p className="text-2xl font-bold">Rs. {getFeeForRole(formData.role)}</p>
                        </div>
                        <Button
                          className="w-full mt-6 bg-green-600 hover:bg-green-700"
                          onClick={handleSubmit}
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Wallet className="mr-2 h-4 w-4" />
                              Pay and Submit for Verification
                            </>
                          )}
                        </Button>
                        {error && <p className="text-xs text-red-500 mt-2 text-center">{error}</p>}
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          By clicking, you agree to our terms and conditions.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={goToPrevStep} disabled={currentStep === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  {currentStep < steps.length - 1 && (
                    <Button onClick={goToNextStep} disabled={!isStepComplete()}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
}
