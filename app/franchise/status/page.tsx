'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Building,
  Search,
  Download,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';

interface ApplicationStatus {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  investment: number;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'contract_sent' | 'completed';
  submittedDate: string;
  estimatedCompletion: string;
  currentStep: number;
  totalSteps: number;
  assignedManager?: string;
  managerEmail?: string;
  managerPhone?: string;
  notes: string[];
  documents: {
    name: string;
    status: 'pending' | 'approved' | 'rejected';
    uploadedDate: string;
  }[];
  timeline: {
    date: string;
    action: string;
    description: string;
    status: 'completed' | 'pending' | 'in_progress';
  }[];
}

const mockApplications: ApplicationStatus[] = [
  {
    id: 'APP001',
    applicantName: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92-300-1234567',
    category: 'Health & Wellness',
    location: 'Karachi',
    investment: 5000000,
    status: 'under_review',
    submittedDate: '2024-01-15',
    estimatedCompletion: '2024-02-15',
    currentStep: 3,
    totalSteps: 6,
    assignedManager: 'Sarah Johnson',
    managerEmail: 'sarah.johnson@ehb.com',
    managerPhone: '+92-301-2345678',
    notes: [
      'Application received and initial review completed',
      'Financial documents verified',
      'Location assessment scheduled for next week',
    ],
    documents: [
      { name: 'Business Plan', status: 'approved', uploadedDate: '2024-01-15' },
      { name: 'Financial Statement', status: 'approved', uploadedDate: '2024-01-15' },
      { name: 'Location Photos', status: 'pending', uploadedDate: '2024-01-16' },
      { name: 'Legal Documents', status: 'pending', uploadedDate: '2024-01-17' },
    ],
    timeline: [
      {
        date: '2024-01-15',
        action: 'Application Submitted',
        description: 'Initial application received',
        status: 'completed',
      },
      {
        date: '2024-01-16',
        action: 'Document Review',
        description: 'Business plan and financial documents reviewed',
        status: 'completed',
      },
      {
        date: '2024-01-17',
        action: 'Manager Assignment',
        description: 'Sarah Johnson assigned as manager',
        status: 'completed',
      },
      {
        date: '2024-01-20',
        action: 'Location Assessment',
        description: 'Site visit and location evaluation',
        status: 'in_progress',
      },
      {
        date: '2024-01-25',
        action: 'Final Review',
        description: 'Complete application review',
        status: 'pending',
      },
      {
        date: '2024-02-01',
        action: 'Decision',
        description: 'Approval or rejection decision',
        status: 'pending',
      },
    ],
  },
  {
    id: 'APP002',
    applicantName: 'Fatima Ali',
    email: 'fatima.ali@email.com',
    phone: '+92-301-2345678',
    category: 'Education',
    location: 'Lahore',
    investment: 3000000,
    status: 'approved',
    submittedDate: '2024-01-10',
    estimatedCompletion: '2024-01-25',
    currentStep: 5,
    totalSteps: 6,
    assignedManager: 'David Chen',
    managerEmail: 'david.chen@ehb.com',
    managerPhone: '+92-302-3456789',
    notes: [
      'Application approved on 2024-01-20',
      'Contract documents being prepared',
      'Training schedule to be confirmed',
    ],
    documents: [
      { name: 'Business Plan', status: 'approved', uploadedDate: '2024-01-10' },
      { name: 'Financial Statement', status: 'approved', uploadedDate: '2024-01-10' },
      { name: 'Location Photos', status: 'approved', uploadedDate: '2024-01-12' },
      { name: 'Legal Documents', status: 'approved', uploadedDate: '2024-01-15' },
    ],
    timeline: [
      {
        date: '2024-01-10',
        action: 'Application Submitted',
        description: 'Initial application received',
        status: 'completed',
      },
      {
        date: '2024-01-12',
        action: 'Document Review',
        description: 'All documents reviewed and approved',
        status: 'completed',
      },
      {
        date: '2024-01-15',
        action: 'Manager Assignment',
        description: 'David Chen assigned as manager',
        status: 'completed',
      },
      {
        date: '2024-01-18',
        action: 'Location Assessment',
        description: 'Site visit completed successfully',
        status: 'completed',
      },
      {
        date: '2024-01-20',
        action: 'Final Review',
        description: 'Application approved by committee',
        status: 'completed',
      },
      {
        date: '2024-01-25',
        action: 'Contract Signing',
        description: 'Contract documents to be signed',
        status: 'pending',
      },
    ],
  },
  {
    id: 'APP003',
    applicantName: 'Muhammad Hassan',
    email: 'm.hassan@email.com',
    phone: '+92-302-3456789',
    category: 'Technology',
    location: 'Islamabad',
    investment: 8000000,
    status: 'rejected',
    submittedDate: '2024-01-05',
    estimatedCompletion: '2024-01-20',
    currentStep: 6,
    totalSteps: 6,
    assignedManager: 'Maria Garcia',
    managerEmail: 'maria.garcia@ehb.com',
    managerPhone: '+92-303-4567890',
    notes: [
      'Application rejected due to insufficient financial backing',
      'Location concerns identified during assessment',
      'Applicant informed of decision on 2024-01-18',
    ],
    documents: [
      { name: 'Business Plan', status: 'approved', uploadedDate: '2024-01-05' },
      { name: 'Financial Statement', status: 'rejected', uploadedDate: '2024-01-05' },
      { name: 'Location Photos', status: 'rejected', uploadedDate: '2024-01-08' },
      { name: 'Legal Documents', status: 'approved', uploadedDate: '2024-01-10' },
    ],
    timeline: [
      {
        date: '2024-01-05',
        action: 'Application Submitted',
        description: 'Initial application received',
        status: 'completed',
      },
      {
        date: '2024-01-08',
        action: 'Document Review',
        description: 'Financial documents found insufficient',
        status: 'completed',
      },
      {
        date: '2024-01-10',
        action: 'Manager Assignment',
        description: 'Maria Garcia assigned as manager',
        status: 'completed',
      },
      {
        date: '2024-01-15',
        action: 'Location Assessment',
        description: 'Location concerns identified',
        status: 'completed',
      },
      {
        date: '2024-01-18',
        action: 'Final Review',
        description: 'Application rejected by committee',
        status: 'completed',
      },
      {
        date: '2024-01-20',
        action: 'Decision Communicated',
        description: 'Applicant informed of rejection',
        status: 'completed',
      },
    ],
  },
];

export default function FranchiseStatus() {
  const [applications, setApplications] = useState<ApplicationStatus[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<ApplicationStatus | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'contract_sent':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <FileText className="h-4 w-4" />;
      case 'under_review':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'contract_sent':
        return <FileText className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimelineStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateProgress = (current: number, total: number) => {
    return (current / total) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Application Status</h1>
            <p className="text-gray-600 mt-2">Track your franchise application progress</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Status</span>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search Applications</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name, ID, or email..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Filter by Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="contract_sent">Contract Sent</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No applications found</p>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map(application => (
              <Card key={application.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{application.applicantName}</h3>
                        <p className="text-sm text-gray-600">ID: {application.id}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(application.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(application.status)}
                              <span>{application.status.replace('_', ' ')}</span>
                            </div>
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {application.category} • {application.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(application.investment)}</div>
                      <p className="text-sm text-gray-500">Investment</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-500">
                        Step {application.currentStep} of {application.totalSteps}
                      </span>
                    </div>
                    <Progress
                      value={calculateProgress(application.currentStep, application.totalSteps)}
                      className="h-2"
                    />
                  </div>

                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Submitted</p>
                        <p className="font-medium">{formatDate(application.submittedDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Estimated Completion</p>
                        <p className="font-medium">{formatDate(application.estimatedCompletion)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Assigned Manager</p>
                        <p className="font-medium">
                          {application.assignedManager || 'Not assigned'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setSelectedApplication(application)}
                      className="flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </Button>
                    {application.assignedManager && (
                      <Button variant="outline" className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Contact Manager</span>
                      </Button>
                    )}
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download Status</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Detailed View Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    Application Details - {selectedApplication.id}
                  </h2>
                  <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                    Close
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Application Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Applicant Name</Label>
                          <p className="font-medium">{selectedApplication.applicantName}</p>
                        </div>
                        <div>
                          <Label>Email</Label>
                          <p className="font-medium">{selectedApplication.email}</p>
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <p className="font-medium">{selectedApplication.phone}</p>
                        </div>
                        <div>
                          <Label>Category</Label>
                          <p className="font-medium">{selectedApplication.category}</p>
                        </div>
                        <div>
                          <Label>Location</Label>
                          <p className="font-medium">{selectedApplication.location}</p>
                        </div>
                        <div>
                          <Label>Investment</Label>
                          <p className="font-medium">
                            {formatCurrency(selectedApplication.investment)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Manager Information */}
                  {selectedApplication.assignedManager && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Assigned Manager</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Manager Name</Label>
                          <p className="font-medium">{selectedApplication.assignedManager}</p>
                        </div>
                        <div>
                          <Label>Email</Label>
                          <p className="font-medium">{selectedApplication.managerEmail}</p>
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <p className="font-medium">{selectedApplication.managerPhone}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center space-x-2"
                          >
                            <Phone className="h-4 w-4" />
                            <span>Call</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Timeline */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Application Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedApplication.timeline.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0">{getTimelineStatusIcon(item.status)}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{item.action}</h4>
                              <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedApplication.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-500">
                                Uploaded: {formatDate(doc.uploadedDate)}
                              </p>
                            </div>
                          </div>
                          <Badge className={getDocumentStatusColor(doc.status)}>{doc.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Notes & Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedApplication.notes.map((note, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">{note}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
