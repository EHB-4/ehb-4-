"use client";

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Users,
  Key,
  Fingerprint,
  Database,
  Network,
  Server,
  Globe,
  Settings,
  RefreshCw,
  Download,
  Filter,
  Search,
  Clock,
  MapPin,
  User,
  Building,
  AlertCircle,
  Info,
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
// 1. SECURITY MONITORING SYSTEM
// ========================================

interface SecurityMetrics {
  overallScore: number;
  threats: number;
  vulnerabilities: number;
  incidents: number;
  blockedAttacks: number;
  activeUsers: number;
  failedLogins: number;
  suspiciousActivities: number;
  dataBreaches: number;
  malwareDetected: number;
  firewallStatus: 'active' | 'inactive' | 'warning';
  encryptionStatus: 'enabled' | 'disabled' | 'partial';
  backupStatus: 'current' | 'outdated' | 'failed';
  complianceStatus: 'compliant' | 'non-compliant' | 'pending';
}

interface SecurityThreat {
  id: string;
  type:
    | 'malware'
    | 'phishing'
    | 'ddos'
    | 'brute-force'
    | 'sql-injection'
    | 'xss'
    | 'csrf'
    | 'privilege-escalation';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'blocked' | 'investigating' | 'resolved';
  source: string;
  target: string;
  timestamp: Date;
  description: string;
  impact: string;
  action: string;
}

interface SecurityVulnerability {
  id: string;
  name: string;
  type: 'software' | 'configuration' | 'network' | 'application' | 'database';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'patched' | 'false-positive';
  cveId?: string;
  description: string;
  affectedSystems: string[];
  remediation: string;
  discoveredAt: Date;
  lastUpdated: Date;
}

interface SecurityIncident {
  id: string;
  title: string;
  type: 'breach' | 'attack' | 'data-loss' | 'unauthorized-access' | 'malware' | 'phishing';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'contained' | 'resolved' | 'closed';
  description: string;
  affectedUsers: number;
  dataCompromised: string[];
  discoveredAt: Date;
  resolvedAt?: Date;
  assignedTo: string;
  priority: number;
}

export default function SecurityMonitor() {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    overallScore: 87,
    threats: 12,
    vulnerabilities: 8,
    incidents: 3,
    blockedAttacks: 156,
    activeUsers: 234,
    failedLogins: 45,
    suspiciousActivities: 23,
    dataBreaches: 0,
    malwareDetected: 2,
    firewallStatus: 'active',
    encryptionStatus: 'enabled',
    backupStatus: 'current',
    complianceStatus: 'compliant',
  });

  const [threats, setThreats] = useState<SecurityThreat[]>([
    {
      id: '1',
      type: 'brute-force',
      severity: 'high',
      status: 'blocked',
      source: '192.168.1.100',
      target: 'admin@ehb.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      description: 'Multiple failed login attempts detected',
      impact: 'Account lockout prevented',
      action: 'IP blocked, account locked',
    },
    {
      id: '2',
      type: 'phishing',
      severity: 'medium',
      status: 'investigating',
      source: 'suspicious-domain.com',
      target: 'user@ehb.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      description: 'Suspicious email with malicious link',
      impact: 'User clicked link, investigation ongoing',
      action: 'Email quarantined, user notified',
    },
    {
      id: '3',
      type: 'ddos',
      severity: 'critical',
      status: 'active',
      source: 'Multiple IPs',
      target: 'api.ehb.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      description: 'Distributed denial of service attack',
      impact: 'Service degradation',
      action: 'DDoS protection activated',
    },
  ]);

  const [vulnerabilities, setVulnerabilities] = useState<SecurityVulnerability[]>([
    {
      id: '1',
      name: 'SQL Injection Vulnerability',
      type: 'application',
      severity: 'high',
      status: 'open',
      cveId: 'CVE-2024-1234',
      description: 'Unvalidated user input in login form',
      affectedSystems: ['Web Application', 'Database'],
      remediation: 'Implement input validation and parameterized queries',
      discoveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: '2',
      name: 'Outdated SSL Certificate',
      type: 'configuration',
      severity: 'medium',
      status: 'in-progress',
      description: 'SSL certificate expires in 30 days',
      affectedSystems: ['Web Server'],
      remediation: 'Renew SSL certificate',
      discoveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
  ]);

  const [incidents, setIncidents] = useState<SecurityIncident[]>([
    {
      id: '1',
      title: 'Suspicious Login Activity',
      type: 'unauthorized-access',
      severity: 'medium',
      status: 'investigating',
      description: 'Multiple failed login attempts from unknown location',
      affectedUsers: 1,
      dataCompromised: [],
      discoveredAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
      assignedTo: 'Security Team',
      priority: 2,
    },
  ]);

  const [viewMode, setViewMode] = useState<
    'overview' | 'threats' | 'vulnerabilities' | 'incidents' | 'analytics'
  >('overview');
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [loading, setLoading] = useState(false);

  const getSeverityColor = (severity: string) => {
    const colors = {
      critical: 'text-red-600 bg-red-100 dark:bg-red-900/20',
      high: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
      medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      low: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
    };
    return (
      colors[severity as keyof typeof colors] || 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'text-red-600 bg-red-100 dark:bg-red-900/20',
      blocked: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      investigating: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      resolved: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      open: 'text-red-600 bg-red-100 dark:bg-red-900/20',
      'in-progress': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      patched: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      contained: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      closed: 'text-gray-600 bg-gray-100 dark:bg-gray-900/20',
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return CheckCircle;
    if (score >= 70) return AlertTriangle;
    return XCircle;
  };

  const filteredThreats = threats.filter(threat => filter === 'all' || threat.severity === filter);

  const filteredVulnerabilities = vulnerabilities.filter(
    vuln => filter === 'all' || vuln.severity === filter
  );

  const filteredIncidents = incidents.filter(
    incident => filter === 'all' || incident.severity === filter
  );

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
                Security Monitor
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Real-time security monitoring and threat detection
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLoading(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Overall Security Score */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                  metrics.overallScore
                )}`}
              >
                {metrics.overallScore}/100
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Security Score
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Overall security status</p>
          </div>

          {/* Active Threats */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium text-red-600 bg-red-100 dark:bg-red-900/20">
                {threats.filter(t => t.status === 'active').length} Active
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {metrics.threats}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Total Threats</p>
          </div>

          {/* Vulnerabilities */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Lock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium text-orange-600 bg-orange-100 dark:bg-orange-900/20">
                {vulnerabilities.filter(v => v.status === 'open').length} Open
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {metrics.vulnerabilities}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Vulnerabilities</p>
          </div>

          {/* Blocked Attacks */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/20">
                Blocked
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {metrics.blockedAttacks}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Attacks Blocked</p>
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
                { key: 'overview', label: 'Overview', icon: Activity },
                { key: 'threats', label: 'Threats', icon: AlertTriangle },
                { key: 'vulnerabilities', label: 'Vulnerabilities', icon: Lock },
                { key: 'incidents', label: 'Incidents', icon: AlertCircle },
                { key: 'analytics', label: 'Analytics', icon: BarChart3 },
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
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
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
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Security Status */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Security Status
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        metrics.firewallStatus === 'active'
                          ? 'bg-green-500'
                          : metrics.firewallStatus === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Firewall
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                    {metrics.firewallStatus}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        metrics.encryptionStatus === 'enabled'
                          ? 'bg-green-500'
                          : metrics.encryptionStatus === 'partial'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Encryption
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                    {metrics.encryptionStatus}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        metrics.backupStatus === 'current'
                          ? 'bg-green-500'
                          : metrics.backupStatus === 'outdated'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Backup
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                    {metrics.backupStatus}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        metrics.complianceStatus === 'compliant'
                          ? 'bg-green-500'
                          : metrics.complianceStatus === 'pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Compliance
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                    {metrics.complianceStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Recent Activity
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      Failed Login Attempt
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">2 minutes ago</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      Threat Blocked
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">5 minutes ago</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      User Login
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">10 minutes ago</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'threats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Security Threats
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Threat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredThreats.map(threat => (
                    <tr key={threat.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {threat.type.replace('-', ' ').toUpperCase()}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {threat.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(
                            threat.severity
                          )}`}
                        >
                          {threat.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            threat.status
                          )}`}
                        >
                          {threat.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                        {threat.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {threat.timestamp.toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {viewMode === 'vulnerabilities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Vulnerabilities
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Vulnerability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Discovered
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredVulnerabilities.map(vuln => (
                    <tr key={vuln.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {vuln.name}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {vuln.cveId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(
                            vuln.severity
                          )}`}
                        >
                          {vuln.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            vuln.status
                          )}`}
                        >
                          {vuln.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white capitalize">
                        {vuln.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {vuln.discoveredAt.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {viewMode === 'incidents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {filteredIncidents.map(incident => (
              <div
                key={incident.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {incident.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(
                          incident.severity
                        )}`}
                      >
                        {incident.severity}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          incident.status
                        )}`}
                      >
                        {incident.status}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      {incident.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span>Affected Users: {incident.affectedUsers}</span>
                      <span>Assigned to: {incident.assignedTo}</span>
                      <span>Discovered: {incident.discoveredAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {viewMode === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Security Metrics */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Security Metrics
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Active Users</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.activeUsers}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Failed Logins</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.failedLogins}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Suspicious Activities</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.suspiciousActivities}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Data Breaches</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.dataBreaches}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Malware Detected</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {metrics.malwareDetected}
                  </span>
                </div>
              </div>
            </div>

            {/* Threat Distribution */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Threat Distribution
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Brute Force</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">45%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-red-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Phishing</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">30%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-orange-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">DDoS</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">15%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Other</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">10%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '10%' }}></div>
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
