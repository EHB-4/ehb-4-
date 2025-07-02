"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartType,
  ChartData,
  ChartOptions,
  ChartEvent,
  ChartArea,
  LineControllerDatasetOptions,
  FillerControllerDatasetOptions,
  Plugin,
  ScriptableContext,
} from 'chart.js';
import { ethers } from 'ethers';
import React, { useState, useRef } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

import ChartAnnotations from './ChartAnnotations';
import ChartControls from './ChartControls';
import ChartSettings from './ChartSettings';
import TechnicalIndicators from './TechnicalIndicators';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Transaction {
  type: 'lock' | 'unlock' | 'reward';
  amount: bigint;
  timestamp: number;
  transactionHash: string;
  sqlLevel?: string;
}

interface Annotation {
  id: string;
  type: 'text' | 'line' | 'box';
  color: string;
  x: number;
  y: number;
  text?: string;
}

type LineDataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderDash?: number[];
  borderWidth?: number;
  yAxisID?: string;
  pointRadius?: number;
  type: 'line';
} & Partial<LineControllerDatasetOptions & FillerControllerDatasetOptions>;

type BarDataset = {
  label: string;
  data: number[];
  backgroundColor: string;
  yAxisID?: string;
  type: 'bar';
};

type DoughnutDataset = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor?: string[];
  borderWidth?: number;
};

interface TransactionChartsProps {
  transactions: Transaction[];
}

export default function TransactionCharts({ transactions }: TransactionChartsProps) {
  const [timeRange, setTimeRange] = useState('30d');
  const [aggregation, setAggregation] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [showTrendLine, setShowTrendLine] = useState(false);
  const [showMovingAverage, setShowMovingAverage] = useState(false);
  const [movingAveragePeriod, setMovingAveragePeriod] = useState(7);

  // Technical indicators state
  const [showRSI, setShowRSI] = useState(false);
  const [rsiPeriod, setRSIPeriod] = useState(14);
  const [showMACD, setShowMACD] = useState(false);
  const [macdFastPeriod, setMACDFastPeriod] = useState(12);
  const [macdSlowPeriod, setMACDSlowPeriod] = useState(26);
  const [showBollingerBands, setShowBollingerBands] = useState(false);
  const [bollingerPeriod, setBollingerPeriod] = useState(20);
  const [bollingerMultiplier, setBollingerMultiplier] = useState(2);
  const [compareWith, setCompareWith] = useState('none');

  const [showAnnotations, setShowAnnotations] = useState(false);
  const [annotationType, setAnnotationType] = useState<'text' | 'line' | 'box'>('text');
  const [annotationColor, setAnnotationColor] = useState('#000000');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [customIndicators, setCustomIndicators] = useState<string[]>([]);
  const chartRef = useRef<ChartJS<'line'>>(null);
  const typeDistributionRef = useRef<ChartJS<'doughnut'>>(null);
  const sqlLevelRef = useRef<ChartJS<'bar'>>(null);

  // Filter transactions based on time range
  const filteredTransactions = transactions.filter(tx => {
    const now = Date.now();
    const txDate = tx.timestamp * 1000;
    const daysAgo =
      {
        '7d': 7,
        '30d': 30,
        '90d': 90,
        '1y': 365,
        all: Infinity,
      }[timeRange] ?? 30;

    return now - txDate <= daysAgo * 24 * 60 * 60 * 1000;
  });

  // Aggregate data based on selected period
  const aggregateData = (
    data: Record<string, { lock: bigint; unlock: bigint; reward: bigint }>
  ) => {
    const aggregated: Record<string, { lock: bigint; unlock: bigint; reward: bigint }> = {};

    Object.entries(data).forEach(([date, values]) => {
      const dateObj = new Date(date);
      let key: string;

      switch (aggregation) {
        case 'weekly':
          const weekStart = new Date(dateObj);
          weekStart.setDate(dateObj.getDate() - dateObj.getDay());
          key = weekStart.toLocaleDateString();
          break;
        case 'monthly':
          key = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`;
          break;
        default:
          key = date;
      }

      if (!aggregated[key]) {
        aggregated[key] = {
          lock: BigInt(0),
          unlock: BigInt(0),
          reward: BigInt(0),
        };
      }

      aggregated[key].lock += values.lock;
      aggregated[key].unlock += values.unlock;
      aggregated[key].reward += values.reward;
    });

    return aggregated;
  };

  // Calculate moving average
  const calculateMovingAverage = (data: number[], period: number) => {
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - period + 1);
      const values = data.slice(start, i + 1);
      const average = values.reduce((a, b) => a + b, 0) / values.length;
      result.push(average);
    }
    return result;
  };

  // Calculate RSI
  const calculateRSI = (data: number[], period: number) => {
    const changes = data.slice(1).map((value, index) => value - data[index]);
    const gains = changes.map(change => (change > 0 ? change : 0));
    const losses = changes.map(change => (change < 0 ? -change : 0));

    const avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

    const rsi = [100 - 100 / (1 + avgGain / avgLoss)];

    for (let i = period; i < changes.length; i++) {
      const gain = gains[i];
      const loss = losses[i];
      const avgGain = (rsi[rsi.length - 1] * (period - 1) + gain) / period;
      const avgLoss = (rsi[rsi.length - 1] * (period - 1) + loss) / period;
      rsi.push(100 - 100 / (1 + avgGain / avgLoss));
    }

    return rsi;
  };

  // Calculate MACD
  const calculateMACD = (data: number[], fastPeriod: number, slowPeriod: number) => {
    const ema = (data: number[], period: number) => {
      const k = 2 / (period + 1);
      const ema = [data[0]];
      for (let i = 1; i < data.length; i++) {
        ema.push(data[i] * k + ema[i - 1] * (1 - k));
      }
      return ema;
    };

    const fastEMA = ema(data, fastPeriod);
    const slowEMA = ema(data, slowPeriod);
    const macdLine = fastEMA.map((fast, i) => fast - slowEMA[i]);
    const signalLine = ema(macdLine, 9);
    const histogram = macdLine.map((macd, i) => macd - signalLine[i]);

    return { macdLine, signalLine, histogram };
  };

  // Calculate Bollinger Bands
  const calculateBollingerBands = (data: number[], period: number, multiplier: number) => {
    const sma = data.map((_, i) => {
      if (i < period - 1) return null;
      const slice = data.slice(i - period + 1, i + 1);
      return slice.reduce((a, b) => a + b, 0) / period;
    });

    const stdDev = data.map((_, i) => {
      if (i < period - 1) return null;
      const slice = data.slice(i - period + 1, i + 1);
      const mean = slice.reduce((a, b) => a + b, 0) / period;
      const squaredDiffs = slice.map(value => Math.pow(value - mean, 2));
      return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / period);
    });

    return {
      middle: sma,
      upper: sma.map((value, i) => (value && stdDev[i] ? value + stdDev[i]! * multiplier : null)),
      lower: sma.map((value, i) => (value && stdDev[i] ? value - stdDev[i]! * multiplier : null)),
    };
  };

  // Prepare data for daily volume chart
  const dailyData = filteredTransactions.reduce(
    (acc, tx) => {
      const date = new Date(tx.timestamp * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          lock: BigInt(0),
          unlock: BigInt(0),
          reward: BigInt(0),
        };
      }
      acc[date][tx.type] = acc[date][tx.type] + tx.amount;
      return acc;
    },
    {} as Record<string, { lock: bigint; unlock: bigint; reward: bigint }>
  );

  const aggregatedData = aggregateData(dailyData);
  const dates = Object.keys(aggregatedData).sort();

  const dailyVolumeData: ChartData<'line'> = {
    labels: dates,
    datasets: [
      {
        label: 'Lock',
        data: dates.map(date => Number(ethers.formatEther(aggregatedData[date].lock))),
        borderColor: 'rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        type: 'line',
      } as LineDataset,
      {
        label: 'Unlocks',
        data: dates.map(date => Number(ethers.formatEther(aggregatedData[date].unlock))),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        type: 'line',
      } as LineDataset,
      {
        label: 'Rewards',
        data: dates.map(date => Number(ethers.formatEther(aggregatedData[date].reward))),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        type: 'line',
      } as LineDataset,
    ],
  };

  // Add trend line and moving average if enabled
  if (showTrendLine || showMovingAverage) {
    const lockData = dates.map(date => Number(ethers.formatEther(aggregatedData[date].lock)));

    if (showTrendLine) {
      const trendLine = calculateMovingAverage(lockData, lockData.length);
      dailyVolumeData.datasets.push({
        label: 'Trend Line',
        data: trendLine,
        borderColor: 'rgba(75, 85, 99, 0.5)',
        backgroundColor: 'rgba(75, 85, 99, 0.1)',
        borderDash: [5, 5],
        pointRadius: 0,
      } as LineDataset);
    }

    if (showMovingAverage) {
      const movingAvg = calculateMovingAverage(lockData, movingAveragePeriod);
      dailyVolumeData.datasets.push({
        label: `${movingAveragePeriod}-Day Moving Average`,
        data: movingAvg,
        borderColor: 'rgba(234, 179, 8, 0.8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
      } as LineDataset);
    }
  }

  // Prepare comparison data
  const prepareComparisonData = (data: number[]) => {
    switch (compareWith) {
      case 'previous':
        const previousPeriod = data.slice(0, Math.floor(data.length / 2));
        return previousPeriod;
      case 'average':
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        return data.map(() => avg);
      case 'target':
        const max = Math.max(...data);
        return data.map(() => max * 0.8); // 80% of max as target
      default:
        return null;
    }
  };

  // Add technical indicators to the chart
  if (showRSI || showMACD || showBollingerBands) {
    const lockData = dates.map(date => Number(ethers.formatEther(aggregatedData[date].lock)));

    if (showRSI) {
      const rsi = calculateRSI(lockData, rsiPeriod);
      dailyVolumeData.datasets.push({
        label: `RSI (${rsiPeriod})`,
        data: rsi,
        borderColor: 'rgba(139, 92, 246, 0.8)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        yAxisID: 'rsi',
        pointRadius: 0,
      } as LineDataset);
    }

    if (showMACD) {
      const { macdLine, signalLine, histogram } = calculateMACD(
        lockData,
        macdFastPeriod,
        macdSlowPeriod
      );
      dailyVolumeData.datasets.push(
        {
          label: 'MACD',
          data: macdLine,
          borderColor: 'rgba(59, 130, 246, 0.8)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          yAxisID: 'macd',
          pointRadius: 0,
        } as LineDataset,
        {
          label: 'Signal',
          data: signalLine,
          borderColor: 'rgba(234, 179, 8, 0.8)',
          backgroundColor: 'rgba(234, 179, 8, 0.1)',
          yAxisID: 'macd',
          pointRadius: 0,
        } as LineDataset,
        {
          label: 'Histogram',
          data: histogram,
          type: 'bar',
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          yAxisID: 'macd',
        } as LineDataset
      );
    }

    if (showBollingerBands) {
      const { middle, upper, lower } = calculateBollingerBands(
        lockData,
        bollingerPeriod,
        bollingerMultiplier
      );
      dailyVolumeData.datasets.push(
        {
          label: 'Bollinger Middle',
          data: middle,
          borderColor: 'rgba(75, 85, 99, 0.8)',
          backgroundColor: 'rgba(75, 85, 99, 0.1)',
          pointRadius: 0,
        } as LineDataset,
        {
          label: 'Bollinger Upper',
          data: upper,
          borderColor: 'rgba(239, 68, 68, 0.8)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          pointRadius: 0,
        } as LineDataset,
        {
          label: 'Bollinger Lower',
          data: lower,
          borderColor: 'rgba(34, 197, 94, 0.8)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          pointRadius: 0,
        } as LineDataset
      );
    }
  }

  // Add comparison data if enabled
  if (compareWith !== 'none') {
    const lockData = dates.map(date => Number(ethers.formatEther(aggregatedData[date].lock)));
    const comparisonData = prepareComparisonData(lockData);
    if (comparisonData) {
      dailyVolumeData.datasets.push({
        label: 'Comparison',
        data: comparisonData,
        borderColor: 'rgba(156, 163, 175, 0.8)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderDash: [5, 5],
        pointRadius: 0,
      } as LineDataset);
    }
  }

  // Prepare data for transaction type distribution
  const typeCounts = filteredTransactions.reduce(
    (acc, tx) => {
      acc[tx.type] = (acc[tx.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const typeDistributionData: ChartData<'doughnut'> = {
    labels: ['Lock', 'Unlock', 'Reward'],
    datasets: [
      {
        label: 'Transaction Types',
        data: [typeCounts.lock || 0, typeCounts.unlock || 0, typeCounts.reward || 0],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderColor: ['rgb(34, 197, 94)', 'rgb(59, 130, 246)', 'rgb(168, 85, 247)'],
        borderWidth: 1,
      } as DoughnutDataset,
    ],
  };

  // Prepare data for SQL level distribution
  const sqlLevelDistribution = filteredTransactions
    .filter(tx => tx.type === 'lock' && tx.sqlLevel)
    .reduce(
      (acc, tx) => {
        const level = tx.sqlLevel!;
        acc[level] = (acc[level] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

  const sqlLevelData: ChartData<'bar'> = {
    labels: Object.keys(sqlLevelDistribution),
    datasets: [
      {
        label: 'SQL Level Distribution',
        data: Object.values(sqlLevelDistribution),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        type: 'bar',
      },
    ],
  };

  const handleAddAnnotation = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    const elements = chart.getElementsAtEventForMode(
      event.nativeEvent,
      'nearest',
      { intersect: true },
      false
    );

    if (elements.length === 0) return;

    const { index } = elements[0];
    const datasetIndex = elements[0].datasetIndex;
    const dataset = chart.data.datasets[datasetIndex];
    const value = dataset.data[index];

    const newAnnotation: Annotation = {
      id: Math.random().toString(36).substr(2, 9),
      type: annotationType,
      color: annotationColor,
      x: index,
      y: value as number,
      text: annotationType === 'text' ? 'New Annotation' : undefined,
    };

    setAnnotations([...annotations, newAnnotation]);
  };

  const handleClearAnnotations = () => {
    setAnnotations([]);
  };

  // Update chart options
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'EHBGC',
        },
      },
      rsi: {
        position: 'right',
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'RSI',
        },
      },
      macd: {
        position: 'right',
        title: {
          display: true,
          text: 'MACD',
        },
      },
    },
  };

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'EHBGC',
        },
      },
    },
  };

  const doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: context => {
            const label = context.label || '';
            const value = (context.raw as number) || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Add annotations plugin
  const annotationPlugin: Plugin<'line'> = {
    id: 'annotation',
    afterDraw: (chart: ChartJS) => {
      const ctx = chart.ctx;
      annotations.forEach(annotation => {
        ctx.save();
        ctx.strokeStyle = annotation.color;
        ctx.fillStyle = annotation.color;
        ctx.lineWidth = 2;

        if (annotation.type === 'line') {
          ctx.beginPath();
          ctx.moveTo(annotation.x, 0);
          ctx.lineTo(annotation.x, chart.height);
          ctx.stroke();
        } else if (annotation.type === 'box') {
          ctx.strokeRect(annotation.x - 10, annotation.y - 10, 20, 20);
        } else if (annotation.type === 'text' && annotation.text) {
          ctx.font = '12px Arial';
          ctx.fillText(annotation.text, annotation.x + 5, annotation.y - 5);
        }

        ctx.restore();
      });
    },
  };

  const handleExportChart = (format: 'png' | 'jpg') => {
    const charts = [
      { ref: chartRef, name: 'daily-volume' },
      { ref: typeDistributionRef, name: 'type-distribution' },
      { ref: sqlLevelRef, name: 'sql-level' },
    ];

    charts.forEach(({ ref, name }) => {
      if (ref.current) {
        const canvas = ref.current.canvas;
        const dataUrl = canvas.toDataURL(`image/${format}`);
        const link = document.createElement('a');
        link.download = `${name}.${format}`;
        link.href = dataUrl;
        link.click();
      }
    });
  };

  const handleChartClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    handleAddAnnotation(event);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Transaction Analytics</h3>

      <ChartControls
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onExportChart={handleExportChart}
      />

      <ChartSettings
        aggregation={aggregation}
        onAggregationChange={setAggregation}
        showTrendLine={showTrendLine}
        onTrendLineChange={setShowTrendLine}
        showMovingAverage={showMovingAverage}
        onMovingAverageChange={setShowMovingAverage}
        movingAveragePeriod={movingAveragePeriod}
        onMovingAveragePeriodChange={setMovingAveragePeriod}
      />

      <TechnicalIndicators
        showRSI={showRSI}
        onRSIChange={setShowRSI}
        rsiPeriod={rsiPeriod}
        onRSIPeriodChange={setRSIPeriod}
        showMACD={showMACD}
        onMACDChange={setShowMACD}
        macdFastPeriod={macdFastPeriod}
        onMACDFastPeriodChange={setMACDFastPeriod}
        macdSlowPeriod={macdSlowPeriod}
        onMACDSlowPeriodChange={setMACDSlowPeriod}
        showBollingerBands={showBollingerBands}
        onBollingerBandsChange={setShowBollingerBands}
        bollingerPeriod={bollingerPeriod}
        onBollingerPeriodChange={setBollingerPeriod}
        bollingerMultiplier={bollingerMultiplier}
        onBollingerMultiplierChange={setBollingerMultiplier}
        compareWith={compareWith}
        onCompareWithChange={setCompareWith}
      />

      <ChartAnnotations
        showAnnotations={showAnnotations}
        onShowAnnotationsChange={setShowAnnotations}
        annotationType={annotationType}
        onAnnotationTypeChange={setAnnotationType}
        annotationColor={annotationColor}
        onAnnotationColorChange={setAnnotationColor}
        customIndicators={customIndicators}
        onCustomIndicatorsChange={setCustomIndicators}
        onAddAnnotation={handleAddAnnotation}
        onClearAnnotations={handleClearAnnotations}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Daily Volume</h4>
          <Line
            ref={chartRef}
            data={dailyVolumeData}
            options={lineChartOptions}
            height={300}
            onClick={handleChartClick}
            plugins={[annotationPlugin]}
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-500 mb-4">Transaction Type Distribution</h4>
          <div className="h-64">
            <Doughnut
              ref={typeDistributionRef}
              data={typeDistributionData}
              options={doughnutChartOptions}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 lg:col-span-2">
          <h4 className="text-sm font-medium text-gray-500 mb-4">SQL Level Distribution</h4>
          <div className="h-64">
            <Bar ref={sqlLevelRef} data={sqlLevelData} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
