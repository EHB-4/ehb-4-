import React from 'react';

interface ChartSettingsProps {
  aggregation: 'daily' | 'weekly' | 'monthly';
  onAggregationChange: (value: 'daily' | 'weekly' | 'monthly') => void;
  showTrendLine: boolean;
  onTrendLineChange: (value: boolean) => void;
  showMovingAverage: boolean;
  onMovingAverageChange: (value: boolean) => void;
  movingAveragePeriod: number;
  onMovingAveragePeriodChange: (value: number) => void;
}

export default function ChartSettings({
  aggregation,
  onAggregationChange,
  showTrendLine,
  onTrendLineChange,
  showMovingAverage,
  onMovingAverageChange,
  movingAveragePeriod,
  onMovingAveragePeriodChange,
}: ChartSettingsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Data Aggregation */}
        <div>
          <label htmlFor="aggregation" className="block text-sm font-medium text-gray-700 mb-1">
            Data Aggregation
          </label>
          <select
            id="aggregation"
            value={aggregation}
            onChange={e => onAggregationChange(e.target.value as 'daily' | 'weekly' | 'monthly')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Trend Line */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showTrendLine}
              onChange={e => onTrendLineChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Show Trend Line</span>
          </label>
        </div>

        {/* Moving Average */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showMovingAverage}
              onChange={e => onMovingAverageChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Show Moving Average</span>
          </label>
        </div>

        {/* Moving Average Period */}
        <div>
          <label
            htmlFor="moving-average-period"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Moving Average Period
          </label>
          <select
            id="moving-average-period"
            value={movingAveragePeriod}
            onChange={e => onMovingAveragePeriodChange(Number(e.target.value))}
            disabled={!showMovingAverage}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:opacity-50"
          >
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
          </select>
        </div>
      </div>
    </div>
  );
}
