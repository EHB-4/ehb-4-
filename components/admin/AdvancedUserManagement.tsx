'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  UserEdit,
  UserX,
  Shield,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Activity,
  Key,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import AdvancedDataTable from '@/components/ui/AdvancedDataTable';

/**
 * User Role Definition
 */
export type UserRole = 'admin' | 'manager' | 'user' | 'moderator' | 'guest';

/**
 * User Status Definition
 */
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending' | 'verified';

/**
 * User Interface
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
  location?: string;
  department?: string;
  permissions: string[];
  metadata?: Record<string, any>;
}

/**
 * Advanced User Management Props
 */
interface AdvancedUserManagementProps {
  users: User[];
  onUserCreate?: (user: Omit<User, 'id' | 'createdAt'>) => void;
  onUserUpdate?: (id: string, updates: Partial<User>) => void;
  onUserDelete?: (id: string) => void;
  onUserStatusChange?: (id: string, status: UserStatus) => void;
  onUserRoleChange?: (id: string, role: UserRole) => void;
  onBulkAction?: (action: string, userIds: string[]) => void;
  className?: string;
}

/**
 * Advanced User Management Component
 * Provides comprehensive user administration with role-based access control
 */
export function AdvancedUserManagement({
  users,
  onUserCreate,
  onUserUpdate,
  onUserDelete,
  onUserStatusChange,
  onUserRoleChange,
  onBulkAction,
  className = '',
}: AdvancedUserManagementProps) {
  // State management
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<UserStatus | 'all'>('all');

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Table columns
  const columns = [
    {
      key: 'name' as const,
      header: 'Name',
      sortable: true,
      filterable: true,
      render: (value: any, user: User) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.firstName} className="w-8 h-8 rounded-full" />
            ) : (
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role' as const,
      header: 'Role',
      sortable: true,
      filterable: true,
      render: (value: UserRole) => (
        <Badge
          variant={
            value === 'admin'
              ? 'destructive'
              : value === 'manager'
              ? 'warning'
              : value === 'moderator'
              ? 'info'
              : 'default'
          }
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'status' as const,
      header: 'Status',
      sortable: true,
      filterable: true,
      render: (value: UserStatus) => (
        <Badge
          variant={
            value === 'active'
              ? 'success'
              : value === 'inactive'
              ? 'secondary'
              : value === 'suspended'
              ? 'destructive'
              : value === 'pending'
              ? 'warning'
              : 'default'
          }
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'createdAt' as const,
      header: 'Joined',
      sortable: true,
      render: (value: Date) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'lastLogin' as const,
      header: 'Last Login',
      sortable: true,
      render: (value: Date | undefined) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value ? value.toLocaleDateString() : 'Never'}
        </span>
      ),
    },
  ];

  // Get role color
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'manager':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'moderator':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'user':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get status color
  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
      case 'suspended':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'verified':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Handle user actions
  const handleUserAction = (action: string, user: User) => {
    switch (action) {
      case 'view':
        setSelectedUser(user);
        setIsViewModalOpen(true);
        break;
      case 'edit':
        setSelectedUser(user);
        setIsEditModalOpen(true);
        break;
      case 'delete':
        if (onUserDelete) {
          onUserDelete(user.id);
        }
        break;
      case 'activate':
        if (onUserStatusChange) {
          onUserStatusChange(user.id, 'active');
        }
        break;
      case 'suspend':
        if (onUserStatusChange) {
          onUserStatusChange(user.id, 'suspended');
        }
        break;
    }
  };

  // Calculate statistics
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    admins: users.filter(u => u.role === 'admin').length,
    managers: users.filter(u => u.role === 'manager').length,
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage users, roles, and permissions across the platform
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Suspended</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.admins}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{stats.managers}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Managers</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <select
              value={filterRole}
              onChange={e => setFilterRole(e.target.value as UserRole | 'all')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
            </select>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as UserStatus | 'all')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <AdvancedDataTable
            data={filteredUsers}
            columns={columns}
            title="User Management"
            searchable={false} // We have custom search
            filterable={false} // We have custom filters
            sortable={true}
            pagination={true}
            exportable={true}
            selectable={true}
            actions={[
              {
                label: 'Activate Selected',
                icon: <CheckCircle className="w-4 h-4" />,
                onClick: selectedRows => {
                  if (onBulkAction) {
                    onBulkAction(
                      'activate',
                      selectedRows.map(row => row.id)
                    );
                  }
                },
                variant: 'default',
              },
              {
                label: 'Suspend Selected',
                icon: <XCircle className="w-4 h-4" />,
                onClick: selectedRows => {
                  if (onBulkAction) {
                    onBulkAction(
                      'suspend',
                      selectedRows.map(row => row.id)
                    );
                  }
                },
                variant: 'destructive',
              },
            ]}
            onRowClick={user => {
              setSelectedUser(user);
              setIsViewModalOpen(true);
            }}
          />
        </CardContent>
      </Card>

      {/* User View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsViewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    User Details
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsViewModalOpen(false)}>
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {selectedUser.avatar ? (
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.firstName}
                        className="w-16 h-16 rounded-full"
                      />
                    ) : (
                      <span className="text-xl font-medium text-gray-600 dark:text-gray-400">
                        {selectedUser.firstName.charAt(0)}
                        {selectedUser.lastName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getRoleColor(selectedUser.role)}>{selectedUser.role}</Badge>
                      <Badge className={getStatusColor(selectedUser.status)}>
                        {selectedUser.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                      <span className="text-sm font-medium">{selectedUser.email}</span>
                    </div>

                    {selectedUser.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                        <span className="text-sm font-medium">{selectedUser.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Joined:</span>
                      <span className="text-sm font-medium">
                        {selectedUser.createdAt.toLocaleDateString()}
                      </span>
                    </div>

                    {selectedUser.lastLogin && (
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Last Login:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedUser.lastLogin.toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {selectedUser.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Location:</span>
                        <span className="text-sm font-medium">{selectedUser.location}</span>
                      </div>
                    )}

                    {selectedUser.department && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Department:
                        </span>
                        <span className="text-sm font-medium">{selectedUser.department}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Permissions:</span>
                      <span className="text-sm font-medium">
                        {selectedUser.permissions.length} granted
                      </span>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                {selectedUser.permissions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Permissions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      setIsEditModalOpen(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <UserEdit className="w-4 h-4" />
                    Edit User
                  </Button>

                  {selectedUser.status === 'active' ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (onUserStatusChange) {
                          onUserStatusChange(selectedUser.id, 'suspended');
                        }
                        setIsViewModalOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Suspend User
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (onUserStatusChange) {
                          onUserStatusChange(selectedUser.id, 'active');
                        }
                        setIsViewModalOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Activate User
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdvancedUserManagement;
