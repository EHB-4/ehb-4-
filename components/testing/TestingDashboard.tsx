'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Square,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  FileText,
  Settings,
  Download,
  Filter,
  Search,
  Calendar,
  MapPin,
  User,
  Building,
  Globe,
  Activity,
  Zap,
  Eye,
  Code,
  Bug,
  Shield,
  Database,
  Server,
  Cloud,
  AlertCircle,
  Info,
  HelpCircle,
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
// 1. TESTING DASHBOARD SYSTEM
// ========================================

interface TestSuite {
  id: string;
  name: string;
  type: 'unit' | 'integration' | 'e2e' | 'performance' | 'security';
  status: 'running' | 'passed' | 'failed' | 'skipped' | 'pending';
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  duration: number;
  lastRun: Date;
  coverage: number;
  priority: 'high' | 'medium' | 'low';
}

interface TestResult {
  id: string;
  name: string;
  suite: string;
  status: 'passed' | 'failed' | 'skipped' | 'running';
  duration: number;
  error?: string;
  stackTrace?: string;
  timestamp: Date;
  browser?: string;
  environment?: string;
}

interface CoverageReport {
  statements: number;
  branches: number;
  functions: number;
  lines: number;
  uncovered: string[];
}

export default function TestingDashboard() {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    {
      id: '1',
      name: 'Component Tests',
      type: 'unit',
      status: 'passed',
      totalTests: 45,
      passedTests: 43,
      failedTests: 1,
      skippedTests: 1,
      duration: 12.5,
      lastRun: new Date(Date.now() - 1000 * 60 * 30),
      coverage: 87.5,
      priority: 'high',
    },
    {
      id: '2',
      name: 'API Integration Tests',
      type: 'integration',
      status: 'running',
      totalTests: 23,
      passedTests: 18,
      failedTests: 2,
      skippedTests: 3,
      duration: 8.2,
      lastRun: new Date(),
      coverage: 92.1,
      priority: 'high',
    },
    {
      id: '3',
      name: 'E2E User Flow Tests',
      type: 'e2e',
      status: 'failed',
      totalTests: 12,
      passedTests: 8,
      failedTests: 4,
      skippedTests: 0,
      duration: 45.3,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2),
      coverage: 75.0,
      priority: 'medium',
    },
    {
      id: '4',
      name: 'Performance Tests',
      type: 'performance',
      status: 'pending',
      totalTests: 8,
      passedTests: 0,
      failedTests: 0,
      skippedTests: 8,
      duration: 0,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24),
      coverage: 0,
      priority: 'low',
    },
  ]);

  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: '1',
      name: 'Button component renders correctly',
      suite: 'Component Tests',
      status: 'passed',
      duration: 0.2,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: '2',
      name: 'Search functionality works',
      suite: 'Component Tests',
      status: 'failed',
      duration: 1.5,
      error: 'Expected element to be visible but was not found',
      stackTrace: 'at Object.<anonymous> (EnhancedSearch.test.tsx:45)',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
      id: '3',
      name: 'API endpoint returns correct data',
      suite: 'API Integration Tests',
      status: 'running',
      duration: 2.1,
      timestamp: new Date(),
    },
  ]);

  const [coverageReport, setCoverageReport] = useState<CoverageReport>({
    statements: 87.5,
    branches: 82.3,
    functions: 91.2,
    lines: 89.7,
    uncovered: ['components/Button.tsx:15-20', 'hooks/useWallet.ts:45-50', 'lib/api.ts:120-125'],
  });

  const [viewMode, setViewMode] = useState<'overview' | 'suites' | 'results' | 'coverage'>(
    'overview'
  );
  const [filter, setFilter] = useState<'all' | 'passed' | 'failed' | 'running'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isRunning, setIsRunning] = useState(false);
  const [autoRun, setAutoRun] = useState(false);

  const totalTests = testSuites.reduce((sum, suite) => sum + suite.totalTests, 0);
  const totalPassed = testSuites.reduce((sum, suite) => sum + suite.passedTests, 0);
  const totalFailed = testSuites.reduce((sum, suite) => sum + suite.failedTests, 0);
  const totalSkipped = testSuites.reduce((sum, suite) => sum + suite.skippedTests, 0);
  const overallCoverage =
    testSuites.reduce((sum, suite) => sum + suite.coverage, 0) / testSuites.length;

  const getStatusColor = (status: string) => {
    const colors = {
      passed: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      failed: 'text-red-600 bg-red-100 dark:bg-red-900/20',
      running: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      skipped: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      pending: 'text-gray-600 bg-gray-100 dark:bg-gray-900/20',
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return CheckCircle;
      case 'failed':
        return XCircle;
      case 'running':
        return RefreshCw;
      case 'skipped':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'unit':
        return Code;
      case 'integration':
        return Database;
      case 'e2e':
        return Eye;
      case 'performance':
        return Zap;
      case 'security':
        return Shield;
      default:
        return FileText;
    }
  };

  const runAllTests = () => {
    setIsRunning(true);
    setTestSuites(prev => prev.map(suite => ({ ...suite, status: 'running' as any })));

    // Simulate test execution
    setTimeout(() => {
      setTestSuites(prev =>
        prev.map(suite => ({
          ...suite,
          status: Math.random() > 0.2 ? 'passed' : 'failed',
          lastRun: new Date(),
        }))
      );
      setIsRunning(false);
    }, 5000);
  };

  const runTestSuite = (suiteId: string) => {
    setTestSuites(prev =>
      prev.map(suite => (suite.id === suiteId ? { ...suite, status: 'running' } : suite))
    );

    setTimeout(() => {
      setTestSuites(prev =>
        prev.map(suite =>
          suite.id === suiteId
            ? {
                ...suite,
                status: Math.random() > 0.3 ? 'passed' : 'failed',
                lastRun: new Date(),
              }
            : suite
        )
      );
    }, 3000);
  };

  const filteredSuites = testSuites.filter(suite => {
    if (filter !== 'all' && suite.status !== filter) return false;
    if (selectedType !== 'all' && suite.type !== selectedType) return false;
    return true;
  });

  const filteredResults = testResults.filter(result => {
    if (filter !== 'all' && result.status !== filter) return false;
    return true;
  });

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
                Testing Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive test execution and coverage monitoring
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoRun(!autoRun)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  autoRun
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    autoRun ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                  }`}
                ></div>
                Auto Run
              </button>

              <button
                onClick={runAllTests}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                {isRunning ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isRunning ? 'Running...' : 'Run All Tests'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Test Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          {/* Total Tests */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{totalTests}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Total Tests</p>
          </div>

          {/* Passed Tests */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {totalPassed}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Passed</p>
          </div>

          {/* Failed Tests */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {totalFailed}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Failed</p>
          </div>

          {/* Skipped Tests */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {totalSkipped}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Skipped</p>
          </div>

          {/* Coverage */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {overallCoverage.toFixed(1)}%
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Coverage</p>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              {[
                { key: 'overview', label: 'Overview', icon: BarChart3 },
                { key: 'suites', label: 'Test Suites', icon: FileText },
                { key: 'results', label: 'Results', icon: CheckCircle },
                { key: 'coverage', label: 'Coverage', icon: Eye },
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
                value={filter}
                onChange={e => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="running">Running</option>
              </select>

              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              >
                <option value="all">All Types</option>
                <option value="unit">Unit</option>
                <option value="integration">Integration</option>
                <option value="e2e">E2E</option>
                <option value="performance">Performance</option>
                <option value="security">Security</option>
              </select>

              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content Based on View Mode */}
        {viewMode === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Test Suites Overview */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Test Suites
              </h3>

              <div className="space-y-4">
                {testSuites.slice(0, 3).map(suite => {
                  const StatusIcon = getStatusIcon(suite.status);
                  const TypeIcon = getTypeIcon(suite.type);

                  return (
                    <div
                      key={suite.id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-200 dark:bg-slate-600 rounded-lg">
                          <TypeIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                            {suite.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {suite.totalTests} tests • {suite.duration}s
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            suite.status
                          )}`}
                        >
                          {suite.status}
                        </span>
                        <StatusIcon className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Test Results */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Recent Results
              </h3>

              <div className="space-y-3">
                {testResults.slice(0, 5).map(result => {
                  const StatusIcon = getStatusIcon(result.status);

                  return (
                    <div
                      key={result.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                    >
                      <StatusIcon className="w-4 h-4" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {result.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {result.suite} • {result.duration}s
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          result.status
                        )}`}
                      >
                        {result.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'suites' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Test Suites</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Suite
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Tests
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Coverage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredSuites.map(suite => {
                    const StatusIcon = getStatusIcon(suite.status);
                    const TypeIcon = getTypeIcon(suite.type);

                    return (
                      <tr key={suite.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-200 dark:bg-slate-600 rounded-lg">
                              <TypeIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900 dark:text-white">
                                {suite.name}
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                Last run: {suite.lastRun.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-slate-900 dark:text-white capitalize">
                            {suite.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                                suite.status
                              )}`}
                            >
                              {suite.status}
                            </span>
                            <StatusIcon className="w-4 h-4" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900 dark:text-white">
                            {suite.passedTests}/{suite.totalTests} passed
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {suite.failedTests} failed, {suite.skippedTests} skipped
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  suite.coverage >= 90
                                    ? 'bg-green-500'
                                    : suite.coverage >= 70
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${suite.coverage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-slate-900 dark:text-white">
                              {suite.coverage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                          {suite.duration}s
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => runTestSuite(suite.id)}
                            disabled={suite.status === 'running'}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
                          >
                            {suite.status === 'running' ? 'Running...' : 'Run'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {viewMode === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {filteredResults.map(result => {
              const StatusIcon = getStatusIcon(result.status);

              return (
                <div
                  key={result.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <StatusIcon className="w-5 h-5" />
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {result.name}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            result.status
                          )}`}
                        >
                          {result.status}
                        </span>
                      </div>

                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        Suite: {result.suite} • Duration: {result.duration}s •{' '}
                        {result.timestamp.toLocaleTimeString()}
                      </div>

                      {result.error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <div className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                            Error:
                          </div>
                          <div className="text-sm text-red-700 dark:text-red-300">
                            {result.error}
                          </div>
                          {result.stackTrace && (
                            <details className="mt-2">
                              <summary className="text-sm text-red-600 dark:text-red-400 cursor-pointer">
                                Stack Trace
                              </summary>
                              <pre className="text-xs text-red-700 dark:text-red-300 mt-2 bg-red-100 dark:bg-red-900/30 p-2 rounded">
                                {result.stackTrace}
                              </pre>
                            </details>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {viewMode === 'coverage' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Coverage Overview */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Coverage Overview
              </h3>

              <div className="space-y-4">
                {[
                  { label: 'Statements', value: coverageReport.statements, color: 'blue' },
                  { label: 'Branches', value: coverageReport.branches, color: 'green' },
                  { label: 'Functions', value: coverageReport.functions, color: 'purple' },
                  { label: 'Lines', value: coverageReport.lines, color: 'orange' },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {item.value}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.value >= 90
                            ? 'bg-green-500'
                            : item.value >= 70
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Uncovered Lines */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Uncovered Lines
              </h3>

              <div className="space-y-2">
                {coverageReport.uncovered.map((line, index) => (
                  <div
                    key={index}
                    className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <div className="text-sm font-medium text-red-800 dark:text-red-200">{line}</div>
                    <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                      No test coverage
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
