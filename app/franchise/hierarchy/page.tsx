'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Crown,
  Shield,
  Award,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface FranchiseLevel {
  id: string;
  name: string;
  type: 'corporate' | 'master' | 'sub';
  parentId?: string;
  location: string;
  category: string;
  investment: number;
  revenue: number;
  growth: number;
  status: 'active' | 'pending' | 'suspended' | 'expired';
  licenseNumber: string;
  licenseExpiry: string;
  manager: string;
  employees: number;
  children: FranchiseLevel[];
}

interface LicenseInfo {
  licenseNumber: string;
  type: string;
  issuedDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending' | 'suspended';
  territory: string;
  restrictions: string[];
  fees: number;
  lastRenewal: string;
}

const mockHierarchy: FranchiseLevel[] = [
  {
    id: 'CORP001',
    name: 'EHB Corporate Headquarters',
    type: 'corporate',
    location: 'Karachi',
    category: 'Multi-Category',
    investment: 50000000,
    revenue: 200000000,
    growth: 18.5,
    status: 'active',
    licenseNumber: 'CORP-LIC-001',
    licenseExpiry: '2025-12-31',
    manager: 'CEO - EHB Group',
    employees: 150,
    children: [
      {
        id: 'MAST001',
        name: 'EHB Health Master Franchise',
        type: 'master',
        parentId: 'CORP001',
        location: 'Karachi',
        category: 'Health & Wellness',
        investment: 15000000,
        revenue: 45000000,
        growth: 15.2,
        status: 'active',
        licenseNumber: 'MAST-HEALTH-001',
        licenseExpiry: '2025-06-30',
        manager: 'Dr. Sarah Ahmed',
        employees: 45,
        children: [
          {
            id: 'SUB001',
            name: 'EHB Health Plus - Clifton',
            type: 'sub',
            parentId: 'MAST001',
            location: 'Clifton, Karachi',
            category: 'Health & Wellness',
            investment: 5000000,
            revenue: 8500000,
            growth: 12.8,
            status: 'active',
            licenseNumber: 'SUB-HEALTH-001',
            licenseExpiry: '2024-12-31',
            manager: 'Dr. Ali Khan',
            employees: 12,
            children: [],
          },
          {
            id: 'SUB002',
            name: 'EHB Health Plus - DHA',
            type: 'sub',
            parentId: 'MAST001',
            location: 'DHA, Karachi',
            category: 'Health & Wellness',
            investment: 4500000,
            revenue: 7200000,
            growth: 10.5,
            status: 'active',
            licenseNumber: 'SUB-HEALTH-002',
            licenseExpiry: '2024-12-31',
            manager: 'Dr. Fatima Ali',
            employees: 10,
            children: [],
          },
        ],
      },
      {
        id: 'MAST002',
        name: 'EHB Education Master Franchise',
        type: 'master',
        parentId: 'CORP001',
        location: 'Lahore',
        category: 'Education',
        investment: 12000000,
        revenue: 38000000,
        growth: 14.8,
        status: 'active',
        licenseNumber: 'MAST-EDU-001',
        licenseExpiry: '2025-08-31',
        manager: 'Prof. Muhammad Hassan',
        employees: 38,
        children: [
          {
            id: 'SUB003',
            name: 'EHB Education Hub - Gulberg',
            type: 'sub',
            parentId: 'MAST002',
            location: 'Gulberg, Lahore',
            category: 'Education',
            investment: 4000000,
            revenue: 6200000,
            growth: 13.2,
            status: 'active',
            licenseNumber: 'SUB-EDU-001',
            licenseExpiry: '2024-12-31',
            manager: 'Ms. Ayesha Malik',
            employees: 15,
            children: [],
          },
        ],
      },
      {
        id: 'MAST003',
        name: 'EHB Technology Master Franchise',
        type: 'master',
        parentId: 'CORP001',
        location: 'Islamabad',
        category: 'Technology',
        investment: 18000000,
        revenue: 52000000,
        growth: 22.1,
        status: 'active',
        licenseNumber: 'MAST-TECH-001',
        licenseExpiry: '2025-10-31',
        manager: 'Eng. David Chen',
        employees: 52,
        children: [
          {
            id: 'SUB004',
            name: 'EHB Tech Solutions - Blue Area',
            type: 'sub',
            parentId: 'MAST003',
            location: 'Blue Area, Islamabad',
            category: 'Technology',
            investment: 6000000,
            revenue: 5800000,
            growth: 18.5,
            status: 'active',
            licenseNumber: 'SUB-TECH-001',
            licenseExpiry: '2024-12-31',
            manager: 'Eng. Ahmed Raza',
            employees: 18,
            children: [],
          },
        ],
      },
    ],
  },
];

const mockLicenses: LicenseInfo[] = [
  {
    licenseNumber: 'CORP-LIC-001',
    type: 'Corporate License',
    issuedDate: '2020-01-01',
    expiryDate: '2025-12-31',
    status: 'active',
    territory: 'Pakistan',
    restrictions: ['No sub-licensing without approval'],
    fees: 5000000,
    lastRenewal: '2023-12-31',
  },
  {
    licenseNumber: 'MAST-HEALTH-001',
    type: 'Master Franchise License',
    issuedDate: '2021-03-15',
    expiryDate: '2025-06-30',
    status: 'active',
    territory: 'Karachi Region',
    restrictions: ['Max 10 sub-franchises', 'Health category only'],
    fees: 1500000,
    lastRenewal: '2023-06-30',
  },
  {
    licenseNumber: 'SUB-HEALTH-001',
    type: 'Sub-Franchise License',
    issuedDate: '2022-01-01',
    expiryDate: '2024-12-31',
    status: 'active',
    territory: 'Clifton, Karachi',
    restrictions: ['Single location', 'Health services only'],
    fees: 500000,
    lastRenewal: '2023-12-31',
  },
];

export default function FranchiseHierarchy() {
  const [hierarchy, setHierarchy] = useState<FranchiseLevel[]>(mockHierarchy);
  const [licenses, setLicenses] = useState<LicenseInfo[]>(mockLicenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('hierarchy');

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'corporate':
        return <Crown className="h-5 w-5 text-purple-600" />;
      case 'master':
        return <Shield className="h-5 w-5 text-blue-600" />;
      case 'sub':
        return <Award className="h-5 w-5 text-green-600" />;
      default:
        return <Building className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'corporate':
        return 'bg-purple-100 text-purple-800';
      case 'master':
        return 'bg-blue-100 text-blue-800';
      case 'sub':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderHierarchyNode = (node: FranchiseLevel, level: number = 0) => {
    const indent = level * 24;

    return (
      <div key={node.id} className="space-y-2">
        <div
          className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
          style={{ marginLeft: `${indent}px` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getTypeIcon(node.type)}
              <div>
                <h3 className="font-semibold">{node.name}</h3>
                <p className="text-sm text-gray-600">
                  {node.location} • {node.category}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getTypeColor(node.type)}>{node.type.toUpperCase()}</Badge>
                  <Badge className={getStatusColor(node.status)}>{node.status}</Badge>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold">{formatCurrency(node.revenue)}</div>
              <div className="flex items-center space-x-2 text-sm">
                {node.growth > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={node.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                  {node.growth > 0 ? '+' : ''}
                  {node.growth}%
                </span>
              </div>
              <p className="text-xs text-gray-500">License: {node.licenseNumber}</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Investment:</span>
                <div className="font-medium">{formatCurrency(node.investment)}</div>
              </div>
              <div>
                <span className="text-gray-500">Manager:</span>
                <div className="font-medium">{node.manager}</div>
              </div>
              <div>
                <span className="text-gray-500">Employees:</span>
                <div className="font-medium">{node.employees}</div>
              </div>
              <div>
                <span className="text-gray-500">Expiry:</span>
                <div className="font-medium">{formatDate(node.licenseExpiry)}</div>
              </div>
            </div>
          </div>
        </div>

        {node.children && node.children.length > 0 && (
          <div className="space-y-2">
            {node.children.map(child => renderHierarchyNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const flattenHierarchy = (nodes: FranchiseLevel[]): FranchiseLevel[] => {
    let result: FranchiseLevel[] = [];
    nodes.forEach(node => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        result = result.concat(flattenHierarchy(node.children));
      }
    });
    return result;
  };

  const allFranchises = flattenHierarchy(hierarchy);
  const filteredFranchises = allFranchises.filter(franchise => {
    const matchesSearch =
      franchise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchise.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchise.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || franchise.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || franchise.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || franchise.category === categoryFilter;

    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Franchise Hierarchy</h1>
            <p className="text-gray-600 mt-2">Corporate, Master, and Sub-Franchise Management</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Franchise</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Franchises</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allFranchises.length}</div>
              <p className="text-xs text-muted-foreground">Across all levels</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Corporate</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {allFranchises.filter(f => f.type === 'corporate').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Master Franchises</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {allFranchises.filter(f => f.type === 'master').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sub-Franchises</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {allFranchises.filter(f => f.type === 'sub').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="licenses">License Management</TabsTrigger>
          </TabsList>

          <TabsContent value="hierarchy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Franchise Hierarchy</CardTitle>
                <CardDescription>Visual representation of franchise structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">{hierarchy.map(node => renderHierarchyNode(node))}</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search franchises..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
                        <SelectItem value="sub">Sub-Franchise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
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

            {/* Franchises Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Franchises</CardTitle>
                <CardDescription>
                  {filteredFranchises.length} franchise{filteredFranchises.length !== 1 ? 's' : ''}{' '}
                  found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFranchises.map(franchise => (
                      <TableRow key={franchise.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(franchise.type)}
                            <div>
                              <div className="font-medium">{franchise.name}</div>
                              <div className="text-sm text-gray-500">ID: {franchise.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(franchise.type)}>
                            {franchise.type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{franchise.location}</TableCell>
                        <TableCell>{franchise.category}</TableCell>
                        <TableCell>
                          <div className="font-medium">{formatCurrency(franchise.revenue)}</div>
                          <div className="text-sm text-gray-500">+{franchise.growth}%</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(franchise.status)}>
                            {franchise.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{franchise.licenseNumber}</div>
                          <div className="text-xs text-gray-500">
                            Expires: {formatDate(franchise.licenseExpiry)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="licenses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>License Management</CardTitle>
                <CardDescription>Manage franchise licenses and renewals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>License Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Territory</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issued</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Fees</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {licenses.map(license => (
                      <TableRow key={license.licenseNumber}>
                        <TableCell className="font-medium">{license.licenseNumber}</TableCell>
                        <TableCell>{license.type}</TableCell>
                        <TableCell>{license.territory}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(license.status)}>{license.status}</Badge>
                        </TableCell>
                        <TableCell>{formatDate(license.issuedDate)}</TableCell>
                        <TableCell>{formatDate(license.expiryDate)}</TableCell>
                        <TableCell>{formatCurrency(license.fees)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
