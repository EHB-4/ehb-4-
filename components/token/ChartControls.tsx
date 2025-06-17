import React from 'react';

interface ChartControlsProps {
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  onExportChart: (format: 'png' | 'jpg') => void;
}

export default function ChartControls({
  timeRange,
  onTimeRangeChange,
  onExportChart,
}: ChartControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <label htmlFor="time-range" className="text-sm font-medium text-gray-700">
          Time Range:
        </label>
        <select
          id="time-range"
          value={timeRange}
          onChange={e => onTimeRangeChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="1y">Last Year</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">Export:</span>
        <button
          onClick={() => onExportChart('png')}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          PNG
        </button>
        <button
          onClick={() => onExportChart('jpg')}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          JPG
        </button>
      </div>
    </div>
  );
}
