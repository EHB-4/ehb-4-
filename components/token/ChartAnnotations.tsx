"use client";

import React from 'react';

interface ChartAnnotationsProps {
  showAnnotations: boolean;
  onShowAnnotationsChange: (value: boolean) => void;
  annotationType: 'text' | 'line' | 'box';
  onAnnotationTypeChange: (value: 'text' | 'line' | 'box') => void;
  annotationColor: string;
  onAnnotationColorChange: (value: string) => void;
  customIndicators: string[];
  onCustomIndicatorsChange: (value: string[]) => void;
  onAddAnnotation: () => void;
  onClearAnnotations: () => void;
}

const INDICATOR_COMBINATIONS = {
  'Trend Following': ['RSI', 'MACD', 'Moving Average'],
  Volatility: ['Bollinger Bands', 'ATR', 'Standard Deviation'],
  Momentum: ['RSI', 'Stochastic', 'MACD'],
  Volume: ['Volume', 'OBV', 'Chaikin Money Flow'],
  Custom: [],
};

export default function ChartAnnotations({
  showAnnotations,
  onShowAnnotationsChange,
  annotationType,
  onAnnotationTypeChange,
  annotationColor,
  onAnnotationColorChange,
  customIndicators,
  onCustomIndicatorsChange,
  onAddAnnotation,
  onClearAnnotations,
}: ChartAnnotationsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h4 className="text-sm font-medium text-gray-700 mb-4">
        Chart Annotations & Custom Indicators
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Annotation Controls */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showAnnotations}
              onChange={e => onShowAnnotationsChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Enable Annotations</span>
          </div>

          {showAnnotations && (
            <>
              <div>
                <label
                  htmlFor="annotation-type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Annotation Type
                </label>
                <select
                  id="annotation-type"
                  value={annotationType}
                  onChange={e => onAnnotationTypeChange(e.target.value as 'text' | 'line' | 'box')}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  aria-label="Annotation Type"
                >
                  <option value="text">Text</option>
                  <option value="line">Line</option>
                  <option value="box">Box</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="annotation-color"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Color
                </label>
                <input
                  type="color"
                  id="annotation-color"
                  value={annotationColor}
                  onChange={e => onAnnotationColorChange(e.target.value)}
                  className="w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  aria-label="Annotation Color"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={onAddAnnotation}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Annotation
                </button>
                <button
                  onClick={onClearAnnotations}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear All
                </button>
              </div>
            </>
          )}
        </div>

        {/* Custom Indicators */}
        <div className="space-y-4">
          <label
            htmlFor="indicator-combination"
            className="block text-sm font-medium text-gray-700"
          >
            Indicator Combination
          </label>
          <select
            id="indicator-combination"
            value={customIndicators.join(',')}
            onChange={e => {
              const value = e.target.value;
              if (value === 'Custom') {
                onCustomIndicatorsChange([]);
              } else {
                onCustomIndicatorsChange(
                  INDICATOR_COMBINATIONS[value as keyof typeof INDICATOR_COMBINATIONS]
                );
              }
            }}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            aria-label="Indicator Combination"
          >
            <option value="">Select Combination</option>
            {Object.entries(INDICATOR_COMBINATIONS).map(([name, indicators]) => (
              <option key={name} value={indicators.join(',')}>
                {name}
              </option>
            ))}
            <option value="Custom">Custom</option>
          </select>

          {customIndicators.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Selected Indicators</label>
              <div className="flex flex-wrap gap-2">
                {customIndicators.map(indicator => (
                  <span
                    key={indicator}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {indicator}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
