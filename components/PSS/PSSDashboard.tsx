'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
} from 'lucide-react';
import { usePSSWebSocket } from '@/hooks/usePSSWebSocket';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/contexts/LanguageContext';
import AdvancedSearch from './AdvancedSearch';
import BulkActions from './BulkActions';

interface VerificationRequest {
  id: string;
  applicant: string;
  role: string;
  submitted: string;
  status: string;
  risk: string;
  fullName: string;
  contactNumber: string;
  amount: number;
  method: string;
  createdAt: string;
  updatedAt: string;
}

interface SearchFilters {
  searchTerm: string;
  status: string[];
  role: string[];
  priority: string[];
  riskLevel: string[];
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  hasDocuments: boolean;
  hasNotes: boolean;
  amountRange: {
    min: number;
    max: number;
  };
}

interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  highRisk: number;
}

export default function PSSDashboard() {
  const { t } = useLanguage();
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<VerificationRequest[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchTerm: '',
    status: [],
    role: [],
    priority: [],
    riskLevel: [],
    dateRange: {
      from: undefined,
      to: undefined,
    },
    hasDocuments: false,
    hasNotes: false,
    amountRange: {
      min: 0,
      max: 10000,
    },
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // WebSocket for real-time updates
  const { isConnected, lastMessage, error: wsError } = usePSSWebSocket();

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const statsResponse = await fetch('/api/pss/stats');
      const statsData = await statsResponse.json();

      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch requests
      const requestsResponse = await fetch('/api/pss/requests');
      const requestsData = await requestsResponse.json();

      if (requestsData.success) {
        setRequests(requestsData.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply advanced filters
  const applyFilters = (requests: VerificationRequest[], filters: SearchFilters) => {
    return requests.filter(request => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (
          !request.fullName.toLowerCase().includes(searchLower) &&
          !request.contactNumber.includes(searchLower) &&
          !request.id.includes(searchLower)
        ) {
          return false;
        }
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(request.status)) {
        return false;
      }

      // Role filter
      if (filters.role.length > 0 && !filters.role.includes(request.role)) {
        return false;
      }

      // Risk level filter
      if (filters.riskLevel.length > 0 && !filters.riskLevel.includes(request.risk)) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const requestDate = new Date(request.createdAt);
        if (filters.dateRange.from && requestDate < filters.dateRange.from) {
          return false;
        }
        if (filters.dateRange.to && requestDate > filters.dateRange.to) {
          return false;
        }
      }

      // Amount range filter
      if (request.amount < filters.amountRange.min || request.amount > filters.amountRange.max) {
        return false;
      }

      return true;
    });
  };

  // Handle filter changes
  const handleFiltersChange = (filters: SearchFilters) => {
    setSearchFilters(filters);
    const filtered = applyFilters(requests, filters);
    setFilteredRequests(filtered);
  };

  // Handle export
  const handleExport = async (format: 'csv' | 'excel' | 'pdf') => {
    try {
      const data = filteredRequests.map(req => ({
        ID: req.id,
        Name: req.fullName,
        Contact: req.contactNumber,
        Role: req.role,
        Status: req.status,
        Risk: req.risk,
        Amount: req.amount,
        Created: new Date(req.createdAt).toLocaleDateString(),
      }));

      if (format === 'csv') {
        const csvContent = [
          Object.keys(data[0] || {}).join(','),
          ...data.map(row => Object.values(row || {}).join(',')),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pss-requests-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else if (format === 'excel') {
        // Excel export logic would go here
        console.log('Excel export:', data);
      } else if (format === 'pdf') {
        // PDF export logic would go here
        console.log('PDF export:', data);
      }
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  // Bulk actions handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredRequests.map(req => req.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleBulkApprove = async () => {
    try {
      for (const id of selectedItems) {
        await updateRequestStatus(id, 'approved');
      }
      setSelectedItems([]);
    } catch (error) {
      console.error('Bulk approve error:', error);
    }
  };

  const handleBulkReject = async () => {
    try {
      for (const id of selectedItems) {
        await updateRequestStatus(id, 'rejected');
      }
      setSelectedItems([]);
    } catch (error) {
      console.error('Bulk reject error:', error);
    }
  };

  const handleBulkExport = () => {
    const selectedRequests = filteredRequests.filter(req => selectedItems.includes(req.id));
    const data = selectedRequests.map(req => ({
      ID: req.id,
      Name: req.fullName,
      Contact: req.contactNumber,
      Role: req.role,
      Status: req.status,
      Risk: req.risk,
      Amount: req.amount,
      Created: new Date(req.createdAt).toLocaleDateString(),
    }));

    const csvContent = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row || {}).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pss-selected-requests-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleBulkDelete = async () => {
    try {
      // In a real app, this would call the API to delete the requests
      console.log('Deleting requests:', selectedItems);
      setSelectedItems([]);
    } catch (error) {
      console.error('Bulk delete error:', error);
    }
  };

  const handleViewSelected = () => {
    console.log('Viewing selected requests:', selectedItems);
  };

  // Update request status
  const updateRequestStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/pss/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes: notes }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh data
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  // Handle real-time updates
  useEffect(() => {
    if (lastMessage) {
      switch (lastMessage.type) {
        case 'status_update':
          // Update specific request status
          setRequests(prev =>
            prev.map(req =>
              req.id === lastMessage.data.verificationId
                ? { ...req, status: lastMessage.data.status }
                : req
            )
          );
          break;
        case 'verification_complete':
          // Refresh dashboard data
          fetchDashboardData();
          break;
        case 'fraud_alert':
          // Handle fraud alert
          console.log('Fraud alert:', lastMessage.data);
          break;
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const filtered = applyFilters(requests, searchFilters);
    setFilteredRequests(filtered);
  }, [requests, searchFilters]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            High Risk
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Medium Risk
          </Badge>
        );
      case 'low':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Low Risk
          </Badge>
        );
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PSS Dashboard</h1>
          <p className="text-gray-600 mt-1">Professional Security Services Management</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* WebSocket Status */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="text-sm text-gray-600">
              {isConnected ? 'Live Updates' : 'Offline'}
            </span>
          </div>
          <Button type="button" onClick={fetchDashboardData} variant="outline">
            Refresh
          </Button>
        </div>
      </div>

      {/* WebSocket Error Alert */}
      {wsError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Real-time updates are unavailable: {wsError}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.highRisk}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Advanced Search */}
      <AdvancedSearch
        onFiltersChange={handleFiltersChange}
        onExport={handleExport}
        totalResults={filteredRequests.length}
        loading={loading}
      />

      {/* Bulk Actions */}
      <BulkActions
        selectedItems={selectedItems}
        totalItems={filteredRequests.length}
        onSelectAll={handleSelectAll}
        onBulkApprove={handleBulkApprove}
        onBulkReject={handleBulkReject}
        onBulkExport={handleBulkExport}
        onBulkDelete={handleBulkDelete}
        onViewSelected={handleViewSelected}
        loading={loading}
      />

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 w-12">
                    <Checkbox
                      checked={
                        selectedItems.length === filteredRequests.length &&
                        filteredRequests.length > 0
                      }
                      ref={(el: HTMLInputElement | null) => {
                        if (el) {
                          el.indeterminate =
                            selectedItems.length > 0 &&
                            selectedItems.length < filteredRequests.length;
                        }
                      }}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left p-2">Applicant</th>
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Risk</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Submitted</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map(request => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <Checkbox
                        checked={selectedItems.includes(request.id)}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            setSelectedItems(prev => [...prev, request.id]);
                          } else {
                            setSelectedItems(prev => prev.filter(id => id !== request.id));
                          }
                        }}
                      />
                    </td>
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{request.fullName}</div>
                        <div className="text-sm text-gray-500">{request.contactNumber}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline" className="capitalize">
                        {request.role}
                      </Badge>
                    </td>
                    <td className="p-2">{getStatusBadge(request.status)}</td>
                    <td className="p-2">{getRiskBadge(request.risk)}</td>
                    <td className="p-2">
                      <div className="font-medium">${request.amount}</div>
                      <div className="text-sm text-gray-500">{request.method}</div>
                    </td>
                    <td className="p-2 text-sm text-gray-500">{request.submitted}</td>
                    <td className="p-2">
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => updateRequestStatus(request.id, 'approved')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateRequestStatus(request.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">No verification requests found</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
