'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Users,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  FileText,
  Download,
  Send,
} from 'lucide-react';

interface FranchiseApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  investment: number;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedDate: string;
  assignedManager?: string;
  notes?: string;
  documents: string[];
}

interface Manager {
  id: string;
  name: string;
  email: string;
  assignedApplications: number;
  specialization: string[];
}

const mockApplications: FranchiseApplication[] = [
  {
    id: 'APP001',
    applicantName: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92-300-1234567',
    category: 'Health & Wellness',
    location: 'Karachi',
    investment: 5000000,
    status: 'pending',
    submittedDate: '2024-01-15',
    documents: ['business_plan.pdf', 'financial_statement.pdf'],
  },
  {
    id: 'APP002',
    applicantName: 'Fatima Ali',
    email: 'fatima.ali@email.com',
    phone: '+92-301-2345678',
    category: 'Education',
    location: 'Lahore',
    investment: 3000000,
    status: 'under_review',
    submittedDate: '2024-01-14',
    assignedManager: 'Manager001',
    notes: 'Strong business background, good location',
    documents: ['business_plan.pdf', 'financial_statement.pdf', 'location_photos.pdf'],
  },
  {
    id: 'APP003',
    applicantName: 'Muhammad Hassan',
    email: 'm.hassan@email.com',
    phone: '+92-302-3456789',
    category: 'Technology',
    location: 'Islamabad',
    investment: 8000000,
    status: 'approved',
    submittedDate: '2024-01-10',
    assignedManager: 'Manager002',
    notes: 'Excellent technical background, approved for development',
    documents: ['business_plan.pdf', 'financial_statement.pdf', 'technical_proposal.pdf'],
  },
  {
    id: 'APP004',
    applicantName: 'Ayesha Malik',
    email: 'ayesha.malik@email.com',
    phone: '+92-303-4567890',
    category: 'Legal',
    location: 'Rawalpindi',
    investment: 4000000,
    status: 'rejected',
    submittedDate: '2024-01-08',
    assignedManager: 'Manager001',
    notes: 'Insufficient financial backing, location concerns',
    documents: ['business_plan.pdf', 'financial_statement.pdf'],
  },
];

const mockManagers: Manager[] = [
  {
    id: 'Manager001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@ehb.com',
    assignedApplications: 8,
    specialization: ['Health & Wellness', 'Education'],
  },
  {
    id: 'Manager002',
    name: 'David Chen',
    email: 'david.chen@ehb.com',
    assignedApplications: 5,
    specialization: ['Technology', 'Legal'],
  },
  {
    id: 'Manager003',
    name: 'Maria Garcia',
    email: 'maria.garcia@ehb.com',
    assignedApplications: 3,
    specialization: ['Travel', 'Retail'],
  },
];

export default function FranchiseManagement() {
  const [applications, setApplications] = useState<FranchiseApplication[]>(mockApplications);
  const [managers, setManagers] = useState<Manager[]>(mockManagers);
  const [selectedApplication, setSelectedApplication] = useState<FranchiseApplication | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState('');
  const [notes, setNotes] = useState('');

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || app.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'under_review':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const updateApplicationStatus = (id: string, status: string) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: status as any } : app))
    );
  };

  const assignManager = (applicationId: string, managerId: string) => {
    setApplications(prev =>
      prev.map(app => (app.id === applicationId ? { ...app, assignedManager: managerId } : app))
    );
    setIsAssignDialogOpen(false);
    setSelectedManager('');
  };

  const addNotes = (applicationId: string, newNotes: string) => {
    setApplications(prev =>
      prev.map(app => (app.id === applicationId ? { ...app, notes: newNotes } : app))
    );
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Franchise Management</h1>
            <p className="text-gray-600 mt-2">Manage franchise applications and assignments</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Send Notifications</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.filter(app => app.status === 'pending').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.filter(app => app.status === 'under_review').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.filter(app => app.status === 'approved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Franchise Applications</CardTitle>
            <CardDescription>Manage and review franchise applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map(application => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.applicantName}</div>
                        <div className="text-sm text-gray-500">{application.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{application.category}</TableCell>
                    <TableCell>{application.location}</TableCell>
                    <TableCell>{formatCurrency(application.investment)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(application.status)}
                          <span>{application.status.replace('_', ' ')}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(application.submittedDate)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Application Details - {application.id}</DialogTitle>
                              <DialogDescription>
                                Detailed view of the franchise application
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Applicant Name</Label>
                                  <p className="font-medium">{application.applicantName}</p>
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <p className="font-medium">{application.email}</p>
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <p className="font-medium">{application.phone}</p>
                                </div>
                                <div>
                                  <Label>Category</Label>
                                  <p className="font-medium">{application.category}</p>
                                </div>
                                <div>
                                  <Label>Location</Label>
                                  <p className="font-medium">{application.location}</p>
                                </div>
                                <div>
                                  <Label>Investment</Label>
                                  <p className="font-medium">
                                    {formatCurrency(application.investment)}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <Label>Documents</Label>
                                <div className="flex space-x-2 mt-2">
                                  {application.documents.map((doc, index) => (
                                    <Badge key={index} variant="outline">
                                      {doc}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <Label>Notes</Label>
                                <Textarea
                                  value={application.notes || ''}
                                  onChange={e => addNotes(application.id, e.target.value)}
                                  placeholder="Add notes about this application..."
                                />
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  onClick={() =>
                                    updateApplicationStatus(application.id, 'approved')
                                  }
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Approve
                                </Button>
                                <Button
                                  onClick={() =>
                                    updateApplicationStatus(application.id, 'rejected')
                                  }
                                  variant="destructive"
                                >
                                  Reject
                                </Button>
                                <Button
                                  onClick={() =>
                                    updateApplicationStatus(application.id, 'under_review')
                                  }
                                  variant="outline"
                                >
                                  Mark Under Review
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Users className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Assign Manager</DialogTitle>
                              <DialogDescription>
                                Assign a manager to review this application
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="manager">Select Manager</Label>
                                <Select value={selectedManager} onValueChange={setSelectedManager}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose a manager" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {managers.map(manager => (
                                      <SelectItem key={manager.id} value={manager.id}>
                                        {manager.name} - {manager.specialization.join(', ')}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button
                                onClick={() => assignManager(application.id, selectedManager)}
                                disabled={!selectedManager}
                              >
                                Assign Manager
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Managers Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Manager Overview</CardTitle>
            <CardDescription>Current manager assignments and workload</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {managers.map(manager => (
                <div key={manager.id} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{manager.name}</h3>
                      <p className="text-sm text-gray-600">{manager.email}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      Assigned Applications:{' '}
                      <span className="font-medium">{manager.assignedApplications}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Specialization:{' '}
                      <span className="font-medium">{manager.specialization.join(', ')}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
