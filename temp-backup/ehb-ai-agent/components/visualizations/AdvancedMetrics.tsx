import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Treemap,
  ScatterChart,
  Scatter,
  ZAxis,
  Surface,
  Symbols,
  ComposedChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

import { useAIAgent } from '../../context/AIAgentContext';
import { MetricsService } from '../../services/metricsService';

interface AdvancedMetricsProps {
  module: 'security' | 'performance' | 'system';
  timeRange: '1h' | '24h' | '7d' | '30d';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const AdvancedMetrics: React.FC<AdvancedMetricsProps> = ({ module, timeRange }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<'treemap' | 'heatmap' | '3d' | 'composed' | 'radar'>(
    'treemap'
  );
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const { dispatch } = useAIAgent();
  const metricsService = MetricsService.getInstance();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const history = metricsService.getMetricsHistory(module, timeRange);
        setData(history);

        // Set default selected metrics based on module
        if (module === 'security') {
          setSelectedMetrics(['alerts.total', 'threats.active', 'vulnerabilities.total']);
        } else if (module === 'performance') {
          setSelectedMetrics(['responseTime', 'requestsPerSecond', 'errorRate']);
        } else {
          setSelectedMetrics(['cpu.usage', 'memory.usage', 'network.bytesIn']);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
        dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            id: Date.now().toString(),
            type: 'log',
            role: 'system',
            content: `Error fetching ${module} metrics: ${error}`,
            timestamp: new Date(),
            severity: 'error',
            metadata: { module, timeRange },
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [module, timeRange, dispatch]);

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metric) ? prev.filter(m => m !== metric) : [...prev, metric]
    );
  };

  const renderTreemap = () => {
    const treemapData = data.map(item => ({
      name: new Date(item.timestamp).toLocaleTimeString(),
      size: item[selectedMetrics[0]] || 0,
      fill: COLORS[0],
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
        <Treemap data={treemapData} dataKey="size" stroke="#fff" fill="#8884d8">
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    );
  };

  const renderHeatmap = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = Array.from({ length: 7 }, (_, i) => i);

    interface HeatmapDataPoint {
      day: string;
      [hour: number]: number;
    }

    const heatmapData: HeatmapDataPoint[] = days.map(day => ({
      day: `Day ${day + 1}`,
      ...hours.reduce(
        (acc, hour) => ({
          ...acc,
          [hour]: Math.random() * 100,
        }),
        {} as { [key: number]: number }
      ),
    }));

    return (
      <div className="w-full h-[400px] overflow-auto">
        <div className="grid grid-cols-24 gap-1">
          {days.map((day, y) => (
            <div key={day} className="flex gap-1">
              {hours.map((hour, x) => (
                <div
                  key={hour}
                  className="w-8 h-8"
                  style={{
                    backgroundColor: `rgba(0, 128, 255, ${heatmapData[y][hour] / 100})`,
                  }}
                  title={`Day ${day + 1}, Hour ${hour}: ${heatmapData[y][hour].toFixed(1)}%`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const render3DChart = () => {
    const scatterData = data.map(item => ({
      x: new Date(item.timestamp).getTime(),
      y: item[selectedMetrics[0]] || 0,
      z: item[selectedMetrics[1]] || 0,
      name: new Date(item.timestamp).toLocaleTimeString(),
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis
            dataKey="x"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={value => new Date(value).toLocaleTimeString()}
          />
          <YAxis dataKey="y" />
          <ZAxis dataKey="z" range={[50, 400]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => [value, name]} />
          <Scatter name="Metrics" data={scatterData} fill="#8884d8">
            {scatterData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    );
  };

  const renderComposedChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={value => new Date(value).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={value => new Date(value).toLocaleString()}
            formatter={(value: number) => [value.toFixed(2), '']}
          />
          <Legend />
          {selectedMetrics.map((metric, index) => (
            <React.Fragment key={metric}>
              <Line
                type="monotone"
                dataKey={metric}
                stroke={COLORS[index % COLORS.length]}
                activeDot={{ r: 8 }}
              />
              <Area
                type="monotone"
                dataKey={metric}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={0.3}
              />
            </React.Fragment>
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const renderRadarChart = () => {
    const radarData = data[data.length - 1] || {};
    const radarMetrics = selectedMetrics.map(metric => ({
      subject: metric.split('.').pop() || metric,
      A: radarData[metric] || 0,
      fullMark: 100,
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={radarMetrics}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Metrics" dataKey="A" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  const renderChart = () => {
    if (loading) {
      return <div className="flex items-center justify-center h-64">Loading metrics...</div>;
    }

    switch (chartType) {
      case 'treemap':
        return renderTreemap();
      case 'heatmap':
        return renderHeatmap();
      case '3d':
        return render3DChart();
      case 'composed':
        return renderComposedChart();
      case 'radar':
        return renderRadarChart();
      default:
        return null;
    }
  };

  const availableMetrics =
    module === 'security'
      ? [
          'alerts.total',
          'alerts.critical',
          'alerts.high',
          'alerts.medium',
          'alerts.low',
          'threats.active',
          'threats.blocked',
          'threats.suspicious',
          'vulnerabilities.total',
          'vulnerabilities.critical',
          'vulnerabilities.high',
          'vulnerabilities.medium',
          'vulnerabilities.low',
        ]
      : module === 'performance'
        ? [
            'responseTime',
            'requestsPerSecond',
            'errorRate',
            'systemMetrics.cpu.usage',
            'systemMetrics.memory.usage',
            'systemMetrics.network.bytesIn',
            'systemMetrics.network.bytesOut',
          ]
        : [
            'cpu.usage',
            'memory.usage',
            'network.bytesIn',
            'network.bytesOut',
            'network.connections',
          ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {['treemap', 'heatmap', '3d', 'composed', 'radar'].map(type => (
            <button
              key={type}
              onClick={() => setChartType(type as any)}
              className={`px-3 py-1 rounded ${
                chartType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          {availableMetrics.map(metric => (
            <button
              key={metric}
              onClick={() => handleMetricToggle(metric)}
              className={`px-3 py-1 rounded ${
                selectedMetrics.includes(metric)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {metric.split('.').pop()}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">{renderChart()}</div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Latest Metrics</h3>
          {data.length > 0 && (
            <div className="space-y-2">
              {selectedMetrics.map(metric => (
                <div key={metric} className="flex justify-between">
                  <span className="text-gray-600">{metric}</span>
                  <span className="font-medium">
                    {data[data.length - 1][metric]?.toFixed(2) || 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Statistics</h3>
          {data.length > 0 && (
            <div className="space-y-2">
              {selectedMetrics.map(metric => {
                const values = data.map(d => d[metric]).filter(v => v !== undefined);
                const avg = values.reduce((a, b) => a + b, 0) / values.length;
                const max = Math.max(...values);
                const min = Math.min(...values);
                const stdDev = Math.sqrt(
                  values.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / values.length
                );
                return (
                  <div key={metric} className="space-y-1">
                    <div className="text-sm text-gray-600">{metric}</div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div>Avg: {avg.toFixed(2)}</div>
                      <div>Max: {max.toFixed(2)}</div>
                      <div>Min: {min.toFixed(2)}</div>
                      <div>StdDev: {stdDev.toFixed(2)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedMetrics;
