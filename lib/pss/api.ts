// PSS API Service Layer

import { PSSDatabaseService } from './prisma';

export interface VerificationRequest {
  id: string;
  applicant: string;
  role: string;
  submitted: string;
  risk: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'rejected';
  personalInfo: {
    fullName: string;
    contactNumber: string;
    dateOfBirth: string;
    address: string;
  };
  documents: {
    idCard?: string;
    license?: string;
  };
  liveness: {
    selfie?: string;
  };
  payment: {
    amount: number;
    method: string;
    transactionId?: string;
  };
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitRequestData {
  role: string;
  personalInfo: {
    fullName: string;
    contactNumber: string;
    dateOfBirth: string;
    address: string;
  };
  documents: {
    idCard?: string;
    license?: string;
  };
  liveness: {
    selfie?: string;
  };
  payment: {
    amount: number;
    method: string;
    transactionId?: string;
  };
}

export interface UpdateRequestData {
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface RequestsResponse {
  success: boolean;
  data: VerificationRequest[];
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface SingleRequestResponse {
  success: boolean;
  data: VerificationRequest;
}

export interface SubmitResponse {
  success: boolean;
  data: VerificationRequest;
  message: string;
}

export interface UpdateResponse {
  success: boolean;
  data: VerificationRequest;
  message: string;
}

// API Base URL
const API_BASE = '/api/pss';

// Fetch all verification requests
export async function fetchVerificationRequests(params?: {
  status?: string;
  role?: string;
  search?: string;
}): Promise<RequestsResponse> {
  const url = new URL(`${API_BASE}/requests`, window.location.origin);

  if (params?.status) url.searchParams.append('status', params.status);
  if (params?.role) url.searchParams.append('role', params.role);
  if (params?.search) url.searchParams.append('search', params.search);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch requests: ${response.statusText}`);
  }

  return response.json();
}

// Fetch single verification request
export async function fetchVerificationRequest(id: string): Promise<SingleRequestResponse> {
  const response = await fetch(`${API_BASE}/requests/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch request: ${response.statusText}`);
  }

  return response.json();
}

// Submit new verification request
export async function submitVerificationRequest(data: SubmitRequestData): Promise<SubmitResponse> {
  const response = await fetch(`${API_BASE}/requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to submit request: ${response.statusText}`);
  }

  return response.json();
}

// Update verification request status
export async function updateVerificationRequest(
  id: string,
  data: UpdateRequestData
): Promise<UpdateResponse> {
  const response = await fetch(`${API_BASE}/requests/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to update request: ${response.statusText}`);
  }

  return response.json();
}

// Get statistics for dashboard
export async function getDashboardStats(): Promise<{
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  highRisk: number;
}> {
  const stats = await PSSDatabaseService.getDashboardStats();

  return {
    total: stats.total,
    pending: stats.pending,
    approved: stats.approved,
    rejected: stats.rejected,
    highRisk: stats.highRisk,
  };
}
