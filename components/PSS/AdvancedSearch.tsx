'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar as CalendarIcon,
  X,
  RefreshCw,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

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

interface AdvancedSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  onExport: (format: 'csv' | 'excel' | 'pdf') => void;
  totalResults: number;
  loading?: boolean;
}

export default function AdvancedSearch({
  onFiltersChange,
  onExport,
  totalResults,
  loading = false
}: AdvancedSearchProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    status: [],
    role: [],
    priority: [],
    riskLevel: [],
    dateRange: {
      from: undefined,
      to: undefined
    },
    hasDocuments: false,
    hasNotes: false,
    amountRange: {
      min: 0,
      max: 10000
    }
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Update active filters count
  useEffect(() => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.status.length > 0) count++;
    if (filters.role.length > 0) count++;
    if (filters.priority.length > 0) count++;
    if (filters.riskLevel.length > 0) count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.hasDocuments) count++;
    if (filters.hasNotes) count++;
    if (filters.amountRange.min > 0 || filters.amountRange.max < 10000) count++;
    setActiveFilters(count);
  }, [filters]);

  // Notify parent of filter changes
  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleArrayFilterChange = (key: keyof SearchFilters, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [key]: checked 
        ? [...(prev[key] as string[]), value]
        : (prev[key] as string[]).filter(item => item !== value)
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      status: [],
      role: [],
      priority: [],
      riskLevel: [],
      dateRange: {
        from: undefined,
        to: undefined
      },
      hasDocuments: false,
      hasNotes: false,
      amountRange: {
        min: 0,
        max: 10000
      }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>{t('common.advancedSearch')}</span>
            {activeFilters > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilters} {t('common.activeFilters')}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {isExpanded ? t('common.hideFilters') : t('common.showFilters')}
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  {t('common.export')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => onExport('csv')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {t('common.exportCSV')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => onExport('excel')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {t('common.exportExcel')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => onExport('pdf')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {t('common.exportPDF')}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Basic Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t('common.searchPlaceholder')}
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {loading ? t('common.loading') : `${totalResults} ${t('common.results')}`}
            </span>
            {activeFilters > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                {t('common.clearFilters')}
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFiltersChange(filters)}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {t('common.refresh')}
          </Button>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-6 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {t('pss.dashboard.filters.status')}
                </Label>
                <div className="space-y-2">
                  {['pending', 'approved', 'rejected', 'in-progress'].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={filters.status.includes(status)}
                        onCheckedChange={(checked) => 
                          handleArrayFilterChange('status', status, checked as boolean)
                        }
                      />
                      <Label htmlFor={`status-${status}`} className="flex items-center space-x-1 text-sm">
                        {getStatusIcon(status)}
                        <span>{t(`pss.status.${status}`)}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Role Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {t('pss.dashboard.filters.role')}
                </Label>
                <div className="space-y-2">
                  {['patient', 'doctor', 'business', 'franchise'].map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role}`}
                        checked={filters.role.includes(role)}
                        onCheckedChange={(checked) => 
                          handleArrayFilterChange('role', role, checked as boolean)
                        }
                      />
                      <Label htmlFor={`role-${role}`} className="text-sm">
                        {t(`pss.verification.roles.${role}`)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {t('common.priority')}
                </Label>
                <div className="space-y-2">
                  {['high', 'medium', 'low'].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox
                        id={`priority-${priority}`}
                        checked={filters.priority.includes(priority)}
                        onCheckedChange={(checked) => 
                          handleArrayFilterChange('priority', priority, checked as boolean)
                        }
                      />
                      <Label htmlFor={`priority-${priority}`} className="text-sm">
                        <Badge className={getPriorityColor(priority)}>
                          {t(`pss.priority.${priority}`)}
                        </Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Level Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {t('common.riskLevel')}
                </Label>
                <div className="space-y-2">
                  {['high', 'medium', 'low'].map((risk) => (
                    <div key={risk} className="flex items-center space-x-2">
                      <Checkbox
                        id={`risk-${risk}`}
                        checked={filters.riskLevel.includes(risk)}
                        onCheckedChange={(checked) => 
                          handleArrayFilterChange('riskLevel', risk, checked as boolean)
                        }
                      />
                      <Label htmlFor={`risk-${risk}`} className="text-sm">
                        <Badge className={getRiskColor(risk)}>
                          {t(`pss.risk.${risk}`)}
                        </Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Date Range and Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Range */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {t('pss.dashboard.filters.dateRange')}
                </Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange.from ? (
                          format(filters.dateRange.from, "PPP")
                        ) : (
                          <span>{t('common.selectDate')}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.from}
                        onSelect={(date) => handleFilterChange('dateRange', { ...filters.dateRange, from: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange.to ? (
                          format(filters.dateRange.to, "PPP")
                        ) : (
                          <span>{t('common.selectDate')}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.to}
                        onSelect={(date) => handleFilterChange('dateRange', { ...filters.dateRange, to: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Amount Range */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {t('common.amountRange')}
                </Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder={t('common.min')}
                    value={filters.amountRange.min}
                    onChange={(e) => handleFilterChange('amountRange', {
                      ...filters.amountRange,
                      min: Number(e.target.value)
                    })}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    placeholder={t('common.max')}
                    value={filters.amountRange.max}
                    onChange={(e) => handleFilterChange('amountRange', {
                      ...filters.amountRange,
                      max: Number(e.target.value)
                    })}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Additional Filters */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {t('common.additionalFilters')}
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasDocuments"
                      checked={filters.hasDocuments}
                      onCheckedChange={(checked) => handleFilterChange('hasDocuments', checked)}
                    />
                    <Label htmlFor="hasDocuments" className="text-sm">
                      {t('common.hasDocuments')}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasNotes"
                      checked={filters.hasNotes}
                      onCheckedChange={(checked) => handleFilterChange('hasNotes', checked)}
                    />
                    <Label htmlFor="hasNotes" className="text-sm">
                      {t('common.hasNotes')}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 