import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Building2,
  MapPin,
  DollarSign,
  TrendingUp,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Users,
} from 'lucide-react';

interface FranchiseCardProps {
  franchise: {
    id: string;
    name: string;
    email: string;
    phone: string;
    category: string;
    status: 'pending' | 'approved' | 'review' | 'rejected' | 'active';
    investment: number;
    location: string;
    applicationDate: string;
    roi: number;
    popularity: number;
    businessName?: string;
    experienceLevel?: string;
    motivation?: string;
  };
  showActions?: boolean;
  compact?: boolean;
}

const categoryIcons = {
  health: '🏥',
  education: '🎓',
  law: '⚖️',
  travel: '✈️',
  books: '📚',
};

const categoryNames = {
  health: 'Health & Wellness',
  education: 'Education & Training',
  law: 'Legal Services',
  travel: 'Travel & Tourism',
  books: 'Books & Publishing',
};

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    icon: Clock,
  },
  approved: {
    label: 'Approved',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    icon: CheckCircle,
  },
  review: {
    label: 'Under Review',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    icon: AlertCircle,
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    icon: AlertCircle,
  },
  active: {
    label: 'Active',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    icon: CheckCircle,
  },
};

export default function FranchiseCard({
  franchise,
  showActions = true,
  compact = false,
}: FranchiseCardProps) {
  const status = statusConfig[franchise.status];
  const StatusIcon = status.icon;
  const categoryIcon = categoryIcons[franchise.category as keyof typeof categoryIcons] || '🏢';
  const categoryName = categoryNames[franchise.category as keyof typeof categoryNames] || 'Unknown';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (compact) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{categoryIcon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{franchise.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{categoryName}</p>
              </div>
            </div>
            <Badge className={status.color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {status.label}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <DollarSign className="h-4 w-4 mr-1" />
              {formatCurrency(franchise.investment)}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              {franchise.location}
            </div>
          </div>

          {showActions && (
            <div className="mt-4 flex gap-2">
              <Link href={`/franchise/status?id=${franchise.id}`}>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{categoryIcon}</div>
            <div>
              <CardTitle className="text-lg">{franchise.name}</CardTitle>
              <CardDescription>{categoryName}</CardDescription>
            </div>
          </div>
          <Badge className={status.color}>
            <StatusIcon className="h-4 w-4 mr-1" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <DollarSign className="h-4 w-4 mr-2" />
              Investment: {formatCurrency(franchise.investment)}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-2" />
              Location: {franchise.location}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              Applied: {formatDate(franchise.applicationDate)}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="h-4 w-4 mr-2" />
              ROI: {franchise.roi}%
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Star className="h-4 w-4 mr-2" />
              Popularity: {franchise.popularity}%
            </div>
            {franchise.businessName && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Building2 className="h-4 w-4 mr-2" />
                Business: {franchise.businessName}
              </div>
            )}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>ROI Potential</span>
            <span>{franchise.roi}%</span>
          </div>
          <Progress value={franchise.roi} className="h-2" />

          <div className="flex justify-between text-sm">
            <span>Market Popularity</span>
            <span>{franchise.popularity}%</span>
          </div>
          <Progress value={franchise.popularity} className="h-2" />
        </div>

        {/* Additional Details */}
        {franchise.experienceLevel && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Experience:</strong> {franchise.experienceLevel}
          </div>
        )}

        {franchise.motivation && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Motivation:</strong> {franchise.motivation.substring(0, 100)}
            {franchise.motivation.length > 100 && '...'}
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 pt-4 border-t">
            <Link href={`/franchise/status?id=${franchise.id}`}>
              <Button variant="outline" size="sm" className="flex-1">
                View Details
              </Button>
            </Link>
            <Link href={`/franchise/dashboard`}>
              <Button size="sm" className="flex-1">
                Manage
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
