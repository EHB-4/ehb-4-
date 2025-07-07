'use client';

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  Clock,
  MapPin,
  User,
  Building,
  Globe,
  Settings,
  RefreshCw,
  Download,
  Filter,
  Search,
  Calendar,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  HelpCircle,
  FileText,
  Image,
  Video,
  Music,
  File,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderX,
  FilePlus,
  FileMinus,
  FileX,
  FileCheck,
  FileSearch,
  FileEdit,
  FileCode,
  FileJson,
  FileCsv,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileArchive,
  FileAudio,
  FileVideo,
  FileImage,
  Database,
  Server,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudOff,
  CloudDrizzle,
  CloudFog,
  Sun,
  Moon,
  Star as StarIcon,
  Sunrise,
  Sunset,
  Thermometer,
  Droplets,
  Wind,
  Umbrella,
  Snowflake,
  Cloudy,
  PartlyCloudy,
  Clear,
  Rain,
  Thunderstorm,
  Fog,
  Haze,
  Dust,
  Sandstorm,
  Tornado,
  Hurricane,
  Earthquake,
  Volcano,
  Tsunami,
  Flood,
  Drought,
  Wildfire,
  Avalanche,
  Landslide,
  Sinkhole,
  Meteor,
  Comet,
  Asteroid,
  Planet,
  Galaxy,
  Universe,
  Telescope,
  Satellite,
  Rocket,
  SpaceShuttle,
  SpaceStation,
  Moon as MoonIcon,
  Mars,
  Venus,
  Mercury,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
  Pluto,
  Sun as SunIcon,
  Star as StarIcon2,
  Constellation,
  Zodiac,
  Horoscope,
  Astrology,
  Astronomy,
  Physics,
  Chemistry,
  Biology,
  Mathematics,
  Geometry,
  Algebra,
  Calculus,
  Statistics,
  Probability,
  Logic,
  Philosophy,
  Psychology,
  Sociology,
  Anthropology,
  Archaeology,
  History,
  Geography,
  Geology,
  Meteorology,
  Oceanography,
  Ecology,
  Botany,
  Zoology,
  Microbiology,
  Genetics,
  Evolution,
  Medicine,
  Healthcare,
  Hospital,
  Doctor,
  Nurse,
  Patient,
  Ambulance,
  FirstAid,
  Bandage,
  Pill,
  Syringe,
  Stethoscope,
  Thermometer as ThermometerIcon,
  Heart as HeartIcon,
  Brain,
  Eye as EyeIcon,
  Ear,
  Nose,
  Mouth,
  Tooth,
  Bone,
  Muscle,
  Skin,
  Hair,
  Nail,
  Blood,
  Dna,
  Cell,
  Virus,
  Bacteria,
  Parasite,
  Vaccine,
  Antibiotic,
  Antiviral,
  Painkiller,
  Sedative,
  Stimulant,
  Depressant,
  Hallucinogen,
  Narcotic,
  Opioid,
  Cannabis,
  Alcohol,
  Tobacco,
  Caffeine,
  Sugar,
  Salt,
  Fat,
  Protein,
  Carbohydrate,
  Vitamin,
  Mineral,
  Fiber,
  Water,
  Oxygen,
  Carbon,
  Nitrogen,
  Hydrogen,
  Helium,
  Lithium,
  Beryllium,
  Boron,
  Carbon as CarbonIcon,
  Nitrogen as NitrogenIcon,
  Oxygen as OxygenIcon,
  Fluorine,
  Neon,
  Sodium,
  Magnesium,
  Aluminum,
  Silicon,
  Phosphorus,
  Sulfur,
  Chlorine,
  Argon,
  Potassium,
  Calcium,
  Scandium,
  Titanium,
  Vanadium,
  Chromium,
  Manganese,
  Iron,
  Cobalt,
  Nickel,
  Copper,
  Zinc,
  Gallium,
  Germanium,
  Arsenic,
  Selenium,
  Bromine,
  Krypton,
  Rubidium,
  Strontium,
  Yttrium,
  Zirconium,
  Niobium,
  Molybdenum,
  Technetium,
  Ruthenium,
  Rhodium,
  Palladium,
  Silver,
  Cadmium,
  Indium,
  Tin,
  Antimony,
  Tellurium,
  Iodine,
  Xenon,
  Cesium,
  Barium,
  Lanthanum,
  Cerium,
  Praseodymium,
  Neodymium,
  Promethium,
  Samarium,
  Europium,
  Gadolinium,
  Terbium,
  Dysprosium,
  Holmium,
  Erbium,
  Thulium,
  Ytterbium,
  Lutetium,
  Hafnium,
  Tantalum,
  Tungsten,
  Rhenium,
  Osmium,
  Iridium,
  Platinum,
  Gold,
  Mercury,
  Thallium,
  Lead,
  Bismuth,
  Polonium,
  Astatine,
  Radon,
  Francium,
  Radium,
  Actinium,
  Thorium,
  Protactinium,
  Uranium,
  Neptunium,
  Plutonium,
  Americium,
  Curium,
  Berkelium,
  Californium,
  Einsteinium,
  Fermium,
  Mendelevium,
  Nobelium,
  Lawrencium,
  Rutherfordium,
  Dubnium,
  Seaborgium,
  Bohrium,
  Hassium,
  Meitnerium,
  Darmstadtium,
  Roentgenium,
  Copernicium,
  Nihonium,
  Flerovium,
  Moscovium,
  Livermorium,
  Tennessine,
  Oganesson,
} from 'lucide-react';

// ========================================
// 1. REAL-TIME DATA VISUALIZATION SYSTEM
// ========================================

interface DataPoint {
  timestamp: Date;
  value: number;
  label: string;
  category: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

interface MetricCard {
  title: string;
  value: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
}

export default function RealTimeDataVisualization() {
  const [activeUsers, setActiveUsers] = useState(1247);
  const [revenue, setRevenue] = useState(45678);
  const [orders, setOrders] = useState(89);
  const [pageViews, setPageViews] = useState(15678);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'comparison'>('overview');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [realTimeMode, setRealTimeMode] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock real-time data generation
  useEffect(() => {
    if (!realTimeMode) return;

    intervalRef.current = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
      setRevenue(prev => prev + Math.floor(Math.random() * 1000) - 500);
      setOrders(prev => prev + Math.floor(Math.random() * 5) - 2);
      setPageViews(prev => prev + Math.floor(Math.random() * 100) - 50);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [realTimeMode]);

  // Mock chart data
  const generateChartData = (): ChartData => {
    const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const datasets = [
      {
        label: 'Active Users',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 1000) + 500),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Page Views',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 5000) + 2000),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ];

    return { labels, datasets };
  };

  const chartData = generateChartData();

  const metricCards: MetricCard[] = [
    {
      title: 'Active Users',
      value: activeUsers,
      change: 23,
      changePercent: 1.9,
      trend: 'up',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Revenue',
      value: revenue,
      change: 1234,
      changePercent: 2.8,
      trend: 'up',
      icon: DollarSign,
      color: 'green',
    },
    {
      title: 'Orders',
      value: orders,
      change: -5,
      changePercent: -5.3,
      trend: 'down',
      icon: ShoppingCart,
      color: 'orange',
    },
    {
      title: 'Page Views',
      value: pageViews,
      change: 456,
      changePercent: 3.0,
      trend: 'up',
      icon: Eye,
      color: 'purple',
    },
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Real-Time Data Visualization
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Live analytics and interactive data insights
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setRealTimeMode(!realTimeMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  realTimeMode
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    realTimeMode ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                  }`}
                ></div>
                {realTimeMode ? 'Live' : 'Static'}
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
        </motion.div>

        {/* Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metricCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 bg-${card.color}-100 dark:bg-${card.color}-900/30 rounded-lg`}
                  >
                    <Icon
                      className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`}
                    />
                  </div>
                  {getTrendIcon(card.trend)}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {card.value.toLocaleString()}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">{card.title}</p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(card.trend)}`}>
                  {card.change > 0 ? '+' : ''}
                  {card.change.toLocaleString()}
                  <span>
                    ({card.changePercent > 0 ? '+' : ''}
                    {card.changePercent}%)
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              {[
                { key: 'overview', label: 'Overview', icon: BarChart3 },
                { key: 'detailed', label: 'Detailed', icon: LineChart },
                { key: 'comparison', label: 'Comparison', icon: PieChart },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setViewMode(key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === key
                      ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={e => setTimeRange(e.target.value as any)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>

              <select
                value={selectedMetric}
                onChange={e => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              >
                <option value="all">All Metrics</option>
                <option value="users">Active Users</option>
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
                <option value="pageviews">Page Views</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Line Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Real-Time Activity
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Active Users</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Page Views</span>
              </div>
            </div>

            <div className="h-64 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
              <div className="h-full flex items-end justify-between gap-1">
                {chartData.datasets[0].data.map((value, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${(value / 1500) * 200}px` }}
                    ></div>
                    <div
                      className="w-8 bg-green-500 rounded-t"
                      style={{ height: `${(chartData.datasets[1].data[index] / 7000) * 200}px` }}
                    ></div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {chartData.labels[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Traffic Sources
            </h3>

            <div className="flex items-center justify-center h-64">
              <div className="relative w-48 h-48">
                {/* Mock pie chart */}
                <div
                  className="absolute inset-0 rounded-full bg-blue-500"
                  style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full bg-green-500"
                  style={{ clipPath: 'polygon(50% 50%, 50% 0%, 75% 0%, 75% 50%)' }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full bg-orange-500"
                  style={{ clipPath: 'polygon(50% 50%, 75% 50%, 75% 100%, 50% 100%)' }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full bg-purple-500"
                  style={{ clipPath: 'polygon(50% 50%, 25% 50%, 25% 100%, 50% 100%)' }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Direct (40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Organic (30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Social (20%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Referral (10%)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Analytics */}
        {viewMode === 'detailed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Geographic Distribution */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Geographic Distribution
              </h3>

              <div className="space-y-3">
                {[
                  { country: 'United States', users: 456, percentage: 45 },
                  { country: 'United Kingdom', users: 234, percentage: 23 },
                  { country: 'Germany', users: 123, percentage: 12 },
                  { country: 'France', users: 89, percentage: 9 },
                  { country: 'Others', users: 111, percentage: 11 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900 dark:text-white">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 w-12 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Types */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Device Types
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Mobile</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">65%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Desktop</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">30%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Tablet</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">5%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-orange-500 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-Time Events */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Real-Time Events
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {[
                  { event: 'User Login', user: 'john.doe@example.com', time: '2 min ago' },
                  {
                    event: 'Purchase Completed',
                    user: 'jane.smith@example.com',
                    time: '3 min ago',
                  },
                  { event: 'Page View', user: 'bob.wilson@example.com', time: '4 min ago' },
                  {
                    event: 'User Registration',
                    user: 'alice.brown@example.com',
                    time: '5 min ago',
                  },
                  { event: 'Cart Abandoned', user: 'charlie.davis@example.com', time: '6 min ago' },
                  { event: 'Product View', user: 'diana.miller@example.com', time: '7 min ago' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {item.event}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.user} • {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Comparison View */}
        {viewMode === 'comparison' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Performance Comparison
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { metric: 'Conversion Rate', current: 3.2, previous: 2.8, change: '+14.3%' },
                { metric: 'Bounce Rate', current: 23.4, previous: 25.1, change: '-6.8%' },
                { metric: 'Avg Session Duration', current: 245, previous: 218, change: '+12.4%' },
                { metric: 'Pages per Session', current: 4.2, previous: 3.8, change: '+10.5%' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                >
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {item.metric}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {item.current}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-500 mb-2">
                    vs {item.previous} (prev)
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.change}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
