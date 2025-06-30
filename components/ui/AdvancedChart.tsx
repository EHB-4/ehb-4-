'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Chart Type Definition
 */
export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'scatter';

/**
 * Chart Data Point Interface
 */
interface DataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

/**
 * Chart Dataset Interface
 */
interface ChartDataset {
  label: string;
  data: DataPoint[];
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  fill?: boolean;
}

/**
 * Chart Configuration Interface
 */
interface ChartConfig {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  animation?: boolean;
  legend?: {
    display?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
  };
  scales?: {
    x?: {
      display?: boolean;
      title?: string;
    };
    y?: {
      display?: boolean;
      title?: string;
      beginAtZero?: boolean;
    };
  };
  plugins?: {
    tooltip?: {
      enabled?: boolean;
    };
    zoom?: {
      enabled?: boolean;
    };
  };
}

/**
 * Advanced Chart Props
 */
interface AdvancedChartProps {
  type: ChartType;
  data: ChartDataset[];
  title?: string;
  subtitle?: string;
  config?: ChartConfig;
  height?: number;
  width?: number;
  className?: string;
  onDataPointClick?: (dataPoint: DataPoint, datasetIndex: number) => void;
  onExport?: (chartData: ChartDataset[]) => void;
  loading?: boolean;
  error?: string;
}

/**
 * Advanced Chart Component
 * Provides comprehensive charting capabilities with multiple chart types and interactive features
 */
export function AdvancedChart({
  type,
  data,
  title,
  subtitle,
  config = {},
  height = 400,
  width,
  className = '',
  onDataPointClick,
  onExport,
  loading = false,
  error,
}: AdvancedChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLegend, setShowLegend] = useState(config.legend?.display !== false);
  const [selectedDataPoint, setSelectedDataPoint] = useState<{
    dataPoint: DataPoint;
    datasetIndex: number;
  } | null>(null);

  // Default configuration
  const defaultConfig: ChartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    animation: true,
    legend: {
      display: true,
      position: 'top',
    },
    scales: {
      x: {
        display: true,
        title: '',
      },
      y: {
        display: true,
        title: '',
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Chart colors
  const defaultColors = [
    '#3B82F6',
    '#EF4444',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#06B6D4',
    '#84CC16',
    '#F97316',
    '#EC4899',
    '#6366F1',
  ];

  // Initialize chart
  useEffect(() => {
    if (!canvasRef.current || loading || error) return;

    // Mock chart initialization (replace with actual chart library like Chart.js)
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Simulate chart creation
    const mockChart = {
      destroy: () => {
        // Cleanup logic
      },
      update: () => {
        // Update logic
      },
    };

    setChartInstance(mockChart);

    return () => {
      if (mockChart) {
        mockChart.destroy();
      }
    };
  }, [type, data, loading, error]);

  // Handle data point click
  const handleDataPointClick = (dataPoint: DataPoint, datasetIndex: number) => {
    setSelectedDataPoint({ dataPoint, datasetIndex });
    onDataPointClick?.(dataPoint, datasetIndex);
  };

  // Handle export
  const handleExport = () => {
    if (onExport) {
      onExport(data);
    } else {
      // Default export behavior
      const csvContent = [
        ['Label', 'Value', 'Dataset'],
        ...data.flatMap((dataset, datasetIndex) =>
          dataset.data.map(point => [point.label, point.value, dataset.label])
        ),
      ]
        .map(row => row.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title || 'chart'}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  // Get chart icon
  const getChartIcon = () => {
    switch (type) {
      case 'line':
        return <LineChart className="w-5 h-5" />;
      case 'bar':
        return <BarChart3 className="w-5 h-5" />;
      case 'pie':
      case 'doughnut':
        return <PieChart className="w-5 h-5" />;
      case 'area':
        return <TrendingUp className="w-5 h-5" />;
      case 'scatter':
        return <TrendingDown className="w-5 h-5" />;
      default:
        return <BarChart3 className="w-5 h-5" />;
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    const allValues = data.flatMap(dataset => dataset.data.map(point => point.value));
    const total = allValues.reduce((sum, value) => sum + value, 0);
    const average = total / allValues.length;
    const max = Math.max(...allValues);
    const min = Math.min(...allValues);

    return { total, average, max, min };
  };

  const stats = calculateStats();

  // Render chart placeholder (replace with actual chart library)
  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Loading chart...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-full">
        <canvas ref={canvasRef} width={width} height={height} className="w-full h-full" />

        {/* Chart overlay for interactions */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Add interactive elements here */}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">{getChartIcon()}</div>
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              )}
              {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLegend(!showLegend)}
              className="flex items-center gap-1"
            >
              {showLegend ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              Legend
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleExport}
              className="flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-1"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Chart Type Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {type.charAt(0).toUpperCase() + type.slice(1)} Chart
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data.length} dataset{data.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.total.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.average.toFixed(2)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Average</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.max.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Maximum</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.min.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Minimum</p>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-6">
        <div className="relative" style={{ height: `${height}px` }}>
          {renderChart()}
        </div>
      </div>

      {/* Legend */}
      {showLegend && data.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Legend</h4>
          <div className="flex flex-wrap gap-3">
            {data.map((dataset, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{
                    backgroundColor: dataset.color || defaultColors[index % defaultColors.length],
                  }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{dataset.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Data Point Info */}
      {selectedDataPoint && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Selected Data Point
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Label</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedDataPoint.dataPoint.label}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Value</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedDataPoint.dataPoint.value.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Dataset</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {data[selectedDataPoint.datasetIndex].label}
              </p>
            </div>
            {selectedDataPoint.dataPoint.metadata && (
              <div>
                <p className="text-gray-600 dark:text-gray-400">Metadata</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {Object.keys(selectedDataPoint.dataPoint.metadata).length} items
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Chart Hook for data management
 */
export function useChartData() {
  const [data, setData] = useState<ChartDataset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addDataset = (dataset: ChartDataset) => {
    setData(prev => [...prev, dataset]);
  };

  const updateDataset = (index: number, updates: Partial<ChartDataset>) => {
    setData(prev => prev.map((dataset, i) => (i === index ? { ...dataset, ...updates } : dataset)));
  };

  const removeDataset = (index: number) => {
    setData(prev => prev.filter((_, i) => i !== index));
  };

  const clearData = () => {
    setData([]);
  };

  const loadData = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to load data');
      }

      const chartData = await response.json();
      setData(chartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    addDataset,
    updateDataset,
    removeDataset,
    clearData,
    loadData,
  };
}

export default AdvancedChart;
