'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Zap,
  Clock,
  Cpu,
  Memory,
  HardDrive,
  Network,
  Wifi,
  Signal,
  Battery,
  Settings,
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
// 1. PERFORMANCE MONITORING SYSTEM
// ========================================

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  speedIndex: number;
  cpu: number;
  memory: number;
  network: number;
  battery: number;
  bundleSize: number;
  imageOptimization: number;
  caching: number;
  compression: number;
}

interface CoreWebVitals {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  fcp: number;
}

interface PerformanceIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  suggestion: string;
  priority: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 2.3,
    firstContentfulPaint: 1.2,
    largestContentfulPaint: 2.8,
    firstInputDelay: 45,
    cumulativeLayoutShift: 0.08,
    timeToInteractive: 3.2,
    totalBlockingTime: 120,
    speedIndex: 2.1,
    cpu: 23,
    memory: 45,
    network: 78,
    battery: 85,
    bundleSize: 1.2,
    imageOptimization: 92,
    caching: 88,
    compression: 95,
  });

  const [coreWebVitals, setCoreWebVitals] = useState<CoreWebVitals>({
    lcp: 2.8,
    fid: 45,
    cls: 0.08,
    ttfb: 180,
    fcp: 1.2,
  });

  const [issues, setIssues] = useState<PerformanceIssue[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Large Bundle Size',
      description: 'JavaScript bundle size is larger than recommended',
      impact: 'medium',
      suggestion: 'Consider code splitting and lazy loading',
      priority: 2,
    },
    {
      id: '2',
      type: 'error',
      title: 'High Cumulative Layout Shift',
      description: 'CLS score indicates layout instability',
      impact: 'high',
      suggestion: 'Reserve space for images and avoid dynamic content insertion',
      priority: 1,
    },
    {
      id: '3',
      type: 'info',
      title: 'Image Optimization Opportunity',
      description: 'Some images could be further optimized',
      impact: 'low',
      suggestion: 'Use WebP format and implement responsive images',
      priority: 3,
    },
  ]);

  const [viewMode, setViewMode] = useState<'overview' | 'details' | 'issues' | 'optimization'>(
    'overview'
  );
  const [realTimeMode, setRealTimeMode] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate real-time performance monitoring
  useEffect(() => {
    if (!realTimeMode || !autoRefresh) return;

    intervalRef.current = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 8)),
        battery: Math.max(0, Math.min(100, prev.battery - Math.random() * 0.1)),
      }));
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [realTimeMode, autoRefresh]);

  const getPerformanceScore = () => {
    const scores = [
      metrics.loadTime < 2 ? 100 : metrics.loadTime < 4 ? 80 : 60,
      coreWebVitals.lcp < 2.5 ? 100 : coreWebVitals.lcp < 4 ? 80 : 60,
      coreWebVitals.fid < 100 ? 100 : coreWebVitals.fid < 300 ? 80 : 60,
      coreWebVitals.cls < 0.1 ? 100 : coreWebVitals.cls < 0.25 ? 80 : 60,
      metrics.cpu < 50 ? 100 : metrics.cpu < 80 ? 80 : 60,
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return CheckCircle;
    if (score >= 70) return AlertTriangle;
    return AlertCircle;
  };

  const getVitalStatus = (metric: string, value: number) => {
    const thresholds = {
      lcp: { good: 2.5, needsImprovement: 4.0 },
      fid: { good: 100, needsImprovement: 300 },
      cls: { good: 0.1, needsImprovement: 0.25 },
      ttfb: { good: 800, needsImprovement: 1800 },
      fcp: { good: 1.8, needsImprovement: 3.0 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const getVitalColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'poor':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const performanceScore = getPerformanceScore();

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
                Performance Monitor
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Real-time performance monitoring and optimization insights
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

              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  autoRefresh
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <Activity className={`w-4 h-4 ${autoRefresh ? 'animate-pulse' : ''}`} />
                Auto
              </button>
            </div>
          </div>
        </motion.div>

        {/* Performance Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Overall Score */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                  performanceScore
                )}`}
              >
                {performanceScore}/100
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Performance Score
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Overall performance</p>
          </div>

          {/* Load Time */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                  metrics.loadTime < 2 ? 100 : metrics.loadTime < 4 ? 80 : 60
                )}`}
              >
                {metrics.loadTime}s
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Load Time</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Page load duration</p>
          </div>

          {/* CPU Usage */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                  100 - metrics.cpu
                )}`}
              >
                {Math.round(metrics.cpu)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">CPU Usage</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Processor utilization</p>
          </div>

          {/* Memory Usage */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Memory className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                  100 - metrics.memory
                )}`}
              >
                {Math.round(metrics.memory)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Memory Usage</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">RAM utilization</p>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
        >
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            {[
              { key: 'overview', label: 'Overview', icon: Activity },
              { key: 'details', label: 'Details', icon: Settings },
              { key: 'issues', label: 'Issues', icon: AlertCircle },
              { key: 'optimization', label: 'Optimization', icon: Zap },
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
        </motion.div>

        {/* Content Based on View Mode */}
        {viewMode === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Core Web Vitals */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Core Web Vitals
              </h3>
              <div className="space-y-4">
                {Object.entries(coreWebVitals).map(([metric, value]) => {
                  const status = getVitalStatus(metric, value);
                  const colorClass = getVitalColor(status);

                  return (
                    <div key={metric} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
                          {metric.toUpperCase()}
                        </div>
                        <span className="text-slate-900 dark:text-white font-medium">
                          {metric === 'cls'
                            ? value.toFixed(3)
                            : `${value}${metric === 'fid' || metric === 'ttfb' ? 'ms' : 's'}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              status === 'good'
                                ? 'bg-green-500'
                                : status === 'needs-improvement'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{
                              width: `${
                                status === 'good' ? 100 : status === 'needs-improvement' ? 60 : 30
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium ${colorClass}`}>
                          {status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Resources */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                System Resources
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Network</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {Math.round(metrics.network)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metrics.network < 50
                          ? 'bg-green-500'
                          : metrics.network < 80
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${metrics.network}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Battery</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {Math.round(metrics.battery)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metrics.battery > 50
                          ? 'bg-green-500'
                          : metrics.battery > 20
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${metrics.battery}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Bundle Size</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {metrics.bundleSize}MB
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metrics.bundleSize < 1
                          ? 'bg-green-500'
                          : metrics.bundleSize < 2
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, metrics.bundleSize * 50)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'details' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Detailed Metrics */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Detailed Metrics
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">First Contentful Paint</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.firstContentfulPaint}s
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Largest Contentful Paint
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.largestContentfulPaint}s
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">First Input Delay</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.firstInputDelay}ms
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Cumulative Layout Shift
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.cumulativeLayoutShift}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Time to Interactive</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.timeToInteractive}s
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total Blocking Time</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.totalBlockingTime}ms
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Speed Index</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.speedIndex}s
                  </span>
                </div>
              </div>
            </div>

            {/* Optimization Scores */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Optimization Scores
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Image Optimization
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {metrics.imageOptimization}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metrics.imageOptimization >= 90
                          ? 'bg-green-500'
                          : metrics.imageOptimization >= 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${metrics.imageOptimization}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Caching</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {metrics.caching}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metrics.caching >= 90
                          ? 'bg-green-500'
                          : metrics.caching >= 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${metrics.caching}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Compression</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {metrics.compression}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metrics.compression >= 90
                          ? 'bg-green-500'
                          : metrics.compression >= 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${metrics.compression}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'issues' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Performance Issues
            </h3>

            <div className="space-y-4">
              {issues
                .sort((a, b) => a.priority - b.priority)
                .map(issue => (
                  <div
                    key={issue.id}
                    className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          issue.type === 'error'
                            ? 'bg-red-100 dark:bg-red-900/20'
                            : issue.type === 'warning'
                            ? 'bg-yellow-100 dark:bg-yellow-900/20'
                            : 'bg-blue-100 dark:bg-blue-900/20'
                        }`}
                      >
                        {issue.type === 'error' ? (
                          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                        ) : issue.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        ) : (
                          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                            {issue.title}
                          </h4>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              issue.impact === 'high'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                : issue.impact === 'medium'
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                            }`}
                          >
                            {issue.impact} impact
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {issue.description}
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          <strong>Suggestion:</strong> {issue.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {viewMode === 'optimization' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Optimization Recommendations */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Optimization Recommendations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                      ✅ Implemented
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Image compression and optimization</li>
                      <li>• Gzip compression enabled</li>
                      <li>• Browser caching configured</li>
                      <li>• CDN integration</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                      ⚠️ Recommended
                    </h4>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                      <li>• Implement lazy loading for images</li>
                      <li>• Add service worker for offline support</li>
                      <li>• Optimize critical rendering path</li>
                      <li>• Reduce JavaScript bundle size</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Budget */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Performance Budget
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {metrics.bundleSize}MB
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Bundle Size</div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">Target: &lt; 1MB</div>
                </div>

                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {metrics.loadTime}s
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Load Time</div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">Target: &lt; 2s</div>
                </div>

                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {coreWebVitals.lcp}s
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">LCP</div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">
                    Target: &lt; 2.5s
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
