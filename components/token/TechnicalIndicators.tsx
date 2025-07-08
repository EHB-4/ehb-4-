'use client';

import React from 'react';

interface TechnicalIndicatorsProps {
  showRSI: boolean;
  onRSIChange: (value: boolean) => void;
  rsiPeriod: number;
  onRSIPeriodChange: (value: number) => void;
  showMACD: boolean;
  onMACDChange: (value: boolean) => void;
  macdFastPeriod: number;
  onMACDFastPeriodChange: (value: number) => void;
  macdSlowPeriod: number;
  onMACDSlowPeriodChange: (value: number) => void;
  showBollingerBands: boolean;
  onBollingerBandsChange: (value: boolean) => void;
  bollingerPeriod: number;
  onBollingerPeriodChange: (value: number) => void;
  bollingerMultiplier: number;
  onBollingerMultiplierChange: (value: number) => void;
  compareWith: string;
  onCompareWithChange: (value: string) => void;
}

export default function TechnicalIndicators({
  showRSI,
  onRSIChange,
  rsiPeriod,
  onRSIPeriodChange,
  showMACD,
  onMACDChange,
  macdFastPeriod,
  onMACDFastPeriodChange,
  macdSlowPeriod,
  onMACDSlowPeriodChange,
  showBollingerBands,
  onBollingerBandsChange,
  bollingerPeriod,
  onBollingerPeriodChange,
  bollingerMultiplier,
  onBollingerMultiplierChange,
  compareWith,
  onCompareWithChange,
}: TechnicalIndicatorsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h4 className="text-sm font-medium text-gray-700 mb-4">Technical Analysis</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* RSI Settings */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showRSI}
              onChange={e => onRSIChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Relative Strength Index (RSI)</span>
          </label>
          {showRSI && (
            <select
              value={rsiPeriod}
              onChange={e => onRSIPeriodChange(Number(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              aria-label="RSI Period"
            >
              <option value="7">7 Period</option>
              <option value="14">14 Period</option>
              <option value="21">21 Period</option>
            </select>
          )}
        </div>

        {/* MACD Settings */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showMACD}
              onChange={e => onMACDChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">MACD</span>
          </label>
          {showMACD && (
            <div className="space-y-2">
              <select
                value={macdFastPeriod}
                onChange={e => onMACDFastPeriodChange(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                aria-label="MACD Fast Period"
              >
                <option value="12">Fast Period (12)</option>
                <option value="8">Fast Period (8)</option>
                <option value="16">Fast Period (16)</option>
              </select>
              <select
                value={macdSlowPeriod}
                onChange={e => onMACDSlowPeriodChange(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                aria-label="MACD Slow Period"
              >
                <option value="26">Slow Period (26)</option>
                <option value="21">Slow Period (21)</option>
                <option value="30">Slow Period (30)</option>
              </select>
            </div>
          )}
        </div>

        {/* Bollinger Bands Settings */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showBollingerBands}
              onChange={e => onBollingerBandsChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Bollinger Bands</span>
          </label>
          {showBollingerBands && (
            <div className="space-y-2">
              <select
                value={bollingerPeriod}
                onChange={e => onBollingerPeriodChange(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                aria-label="Bollinger Bands Period"
              >
                <option value="20">20 Period</option>
                <option value="14">14 Period</option>
                <option value="30">30 Period</option>
              </select>
              <select
                value={bollingerMultiplier}
                onChange={e => onBollingerMultiplierChange(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                aria-label="Bollinger Bands Standard Deviation"
              >
                <option value="2">2 Standard Deviations</option>
                <option value="2.5">2.5 Standard Deviations</option>
                <option value="3">3 Standard Deviations</option>
              </select>
            </div>
          )}
        </div>

        {/* Chart Comparison */}
        <div className="space-y-2">
          <label htmlFor="compare-with" className="block text-sm font-medium text-gray-700">
            Compare With
          </label>
          <select
            id="compare-with"
            value={compareWith}
            onChange={e => onCompareWithChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            aria-label="Chart Comparison Type"
          >
            <option value="none">No Comparison</option>
            <option value="previous">Previous Period</option>
            <option value="average">Historical Average</option>
            <option value="target">Target Value</option>
          </select>
        </div>
      </div>
    </div>
  );
}
