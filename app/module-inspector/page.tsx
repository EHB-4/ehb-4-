'use client';

import {
  ehbModules,
  ehbServices,
  getOverallProgress,
  getModulesByStatus,
} from '../roadmap/data/enhancedRoadmapData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Square,
  BarChart3,
  Settings,
  Shield,
  BookOpen,
  Building,
  Store,
  Users,
  Globe,
  Cpu,
  Wallet,
  Target,
  Code,
  Monitor,
  FileText,
  Database,
  Server,
  Smartphone,
  Cloud,
  Lock,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Download,
  Upload,
  Play,
  Pause,
  Stop,
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Code2,
  Bug,
  TestTube,
  ShieldCheck,
  AlertTriangle,
  Info,
  HelpCircle,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Home,
  Folder,
  File,
  FolderOpen,
  FileCode,
  FileText as FileTextIcon,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileSpreadsheet,
  FilePresentation,
  FileDatabase,
  FileJson,
  FileXml,
  FileCss,
  FileJs,
  FileTs,
  FileJsx,
  FileTsx,
  FileHtml,
  FileMarkdown,
  FileYaml,
  FileToml,
  FileIni,
  FileConfig,
  FileLog,
  FileLock,
  FileCheck,
  FileX,
  FilePlus,
  FileMinus,
  FileEdit,
  FileSearch,
  FileHeart,
  FileStar,
  FileClock,
  FileCalendar,
  FileUser,
  FileKey,
  FileShield,
  FileAlert,
  FileWarning,
  FileInfo,
  FileQuestion,
  FileHelp,
  FileSettings,
  FileCog,
  FileWrench,
  FileTool,
  FileHammer,
  FileScrewdriver,
  FileWrench2,
  FileTool2,
  FileHammer2,
  FileScrewdriver2,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';

interface FileStatus {
  name: string;
  type: 'page' | 'component' | 'api' | 'config' | 'test' | 'style' | 'util';
  status: 'exists' | 'missing' | 'empty' | 'needs-update';
  path: string;
  size?: number;
  lastModified?: string;
}

interface ModuleDetails {
  id: string;
  name: string;
  files: FileStatus[];
  dependencies: string[];
  issues: string[];
  recommendations: string[];
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'working':
      return <Activity className="h-5 w-5 text-blue-500" />;
    case 'under development':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'not started':
      return <Square className="h-5 w-5 text-gray-500" />;
    default:
      return <AlertCircle className="h-5 w-5 text-red-500" />;
  }
};

const getFileTypeIcon = (type: string) => {
  switch (type) {
    case 'page':
      return <FileText className="h-4 w-4" />;
    case 'component':
      return <Code2 className="h-4 w-4" />;
    case 'api':
      return <Server className="h-4 w-4" />;
    case 'config':
      return <Settings className="h-4 w-4" />;
    case 'test':
      return <TestTube className="h-4 w-4" />;
    case 'style':
      return <FileCss className="h-4 w-4" />;
    case 'util':
      return <FileCode className="h-4 w-4" />;
    default:
      return <File className="h-4 w-4" />;
  }
};

const getFileStatusColor = (status: string) => {
  switch (status) {
    case 'exists':
      return 'text-green-600';
    case 'missing':
      return 'text-red-600';
    case 'empty':
      return 'text-yellow-600';
    case 'needs-update':
      return 'text-orange-600';
    default:
      return 'text-gray-600';
  }
};

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div
      className={`h-2.5 rounded-full transition-all duration-300 ${
        progress >= 80
          ? 'bg-green-600'
          : progress >= 60
            ? 'bg-blue-600'
            : progress >= 40
              ? 'bg-yellow-600'
              : progress >= 20
                ? 'bg-orange-600'
                : 'bg-red-600'
      }`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'working':
      return 'bg-blue-100 text-blue-800';
    case 'under development':
      return 'bg-yellow-100 text-yellow-800';
    case 'not started':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-red-100 text-red-800';
  }
};

const getModuleIcon = (moduleName: string) => {
  const iconMap: { [key: string]: any } = {
    pss: Shield,
    edr: BookOpen,
    emo: Building,
    gosellr: Store,
    jps: Users,
    franchise: Globe,
    'ai-marketplace': Cpu,
    wallet: Wallet,
    analytics: BarChart3,
    'admin-panel': Settings,
    roadmap: Target,
    'roadmap-agent': Cpu,
    'development-portal': Code,
    'ai-agents': Cpu,
    'ehb-dashboard': Monitor,
    'ehb-home-page': Globe,
  };
  return iconMap[moduleName] || Building;
};

// Mock file structure for each module
const getModuleFiles = (moduleId: string): FileStatus[] => {
  const baseFiles: FileStatus[] = [
    { name: 'page.tsx', type: 'page', status: 'exists', path: `/app/${moduleId}/page.tsx` },
    { name: 'layout.tsx', type: 'page', status: 'exists', path: `/app/${moduleId}/layout.tsx` },
    { name: 'loading.tsx', type: 'page', status: 'missing', path: `/app/${moduleId}/loading.tsx` },
    { name: 'error.tsx', type: 'page', status: 'missing', path: `/app/${moduleId}/error.tsx` },
  ];

  const moduleSpecificFiles: { [key: string]: FileStatus[] } = {
    pss: [
      {
        name: 'components/VerificationForm.tsx',
        type: 'component',
        status: 'exists',
        path: `/components/pss/VerificationForm.tsx`,
      },
      {
        name: 'components/TrustScore.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/pss/TrustScore.tsx`,
      },
      {
        name: 'api/verify.ts',
        type: 'api',
        status: 'exists',
        path: `/app/api/pss/verify/route.ts`,
      },
      {
        name: 'api/status.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/pss/status/route.ts`,
      },
      { name: 'types/index.ts', type: 'util', status: 'exists', path: `/types/pss.ts` },
      {
        name: 'tests/VerificationForm.test.tsx',
        type: 'test',
        status: 'missing',
        path: `/__tests__/components/pss/VerificationForm.test.tsx`,
      },
    ],
    edr: [
      {
        name: 'components/ExamForm.tsx',
        type: 'component',
        status: 'exists',
        path: `/components/edr/ExamForm.tsx`,
      },
      {
        name: 'components/ProctoringSystem.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/edr/ProctoringSystem.tsx`,
      },
      { name: 'api/exam.ts', type: 'api', status: 'exists', path: `/app/api/edr/exam/route.ts` },
      {
        name: 'api/result.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/edr/result/route.ts`,
      },
      { name: 'types/index.ts', type: 'util', status: 'exists', path: `/types/edr.ts` },
      {
        name: 'tests/ExamForm.test.tsx',
        type: 'test',
        status: 'missing',
        path: `/__tests__/components/edr/ExamForm.test.tsx`,
      },
    ],
    emo: [
      {
        name: 'components/Dashboard.tsx',
        type: 'component',
        status: 'exists',
        path: `/components/emo/Dashboard.tsx`,
      },
      {
        name: 'components/ProfileManager.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/emo/ProfileManager.tsx`,
      },
      {
        name: 'api/profile.ts',
        type: 'api',
        status: 'exists',
        path: `/app/api/emo/profile/route.ts`,
      },
      {
        name: 'api/dashboard.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/emo/dashboard/route.ts`,
      },
      { name: 'types/index.ts', type: 'util', status: 'exists', path: `/types/emo.ts` },
      {
        name: 'tests/Dashboard.test.tsx',
        type: 'test',
        status: 'missing',
        path: `/__tests__/components/emo/Dashboard.test.tsx`,
      },
    ],
    gosellr: [
      {
        name: 'components/ProductList.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/gosellr/ProductList.tsx`,
      },
      {
        name: 'components/VendorDashboard.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/gosellr/VendorDashboard.tsx`,
      },
      {
        name: 'api/products.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/gosellr/products/route.ts`,
      },
      {
        name: 'api/orders.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/gosellr/orders/route.ts`,
      },
      { name: 'types/index.ts', type: 'util', status: 'missing', path: `/types/gosellr.ts` },
      {
        name: 'tests/ProductList.test.tsx',
        type: 'test',
        status: 'missing',
        path: `/__tests__/components/gosellr/ProductList.test.tsx`,
      },
    ],
    jps: [
      {
        name: 'components/JobList.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/jps/JobList.tsx`,
      },
      {
        name: 'components/JobMatching.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/jps/JobMatching.tsx`,
      },
      { name: 'api/jobs.ts', type: 'api', status: 'missing', path: `/app/api/jps/jobs/route.ts` },
      {
        name: 'api/matching.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/jps/matching/route.ts`,
      },
      { name: 'types/index.ts', type: 'util', status: 'missing', path: `/types/jps.ts` },
      {
        name: 'tests/JobList.test.tsx',
        type: 'test',
        status: 'missing',
        path: `/__tests__/components/jps/JobList.test.tsx`,
      },
    ],
    franchise: [
      {
        name: 'components/FranchiseRegistration.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/franchise/FranchiseRegistration.tsx`,
      },
      {
        name: 'components/TerritoryManager.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/franchise/TerritoryManager.tsx`,
      },
      {
        name: 'api/registration.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/franchise/registration/route.ts`,
      },
      {
        name: 'api/analytics.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/franchise/analytics/route.ts`,
      },
      { name: 'types/index.ts', type: 'util', status: 'missing', path: `/types/franchise.ts` },
      {
        name: 'tests/FranchiseRegistration.test.tsx',
        type: 'test',
        status: 'missing',
        path: `/__tests__/components/franchise/FranchiseRegistration.test.tsx`,
      },
    ],
    'ai-marketplace': [
      {
        name: 'components/ServiceList.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/ai-marketplace/ServiceList.tsx`,
      },
      {
        name: 'components/AgentManager.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/ai-marketplace/AgentManager.tsx`,
      },
      {
        name: 'api/services.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/ai-marketplace/services/route.ts`,
      },
      {
        name: 'api/performance.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/ai-marketplace/performance/route.ts`,
      },
      { name: 'types/index.ts', type: 'util', status: 'missing', path: `/types/ai-marketplace.ts` },
      {
        name: 'tests/ServiceList.test.tsx',
        type: 'test',
        status: 'missing',
        path: `/__tests__/components/ai-marketplace/ServiceList.test.tsx`,
      },
    ],
    wallet: [
      {
        name: 'components/Balance.tsx',
        type: 'component',
        status: 'exists',
        path: `/components/wallet/Balance.tsx`,
      },
      {
        name: 'components/TransactionHistory.tsx',
        type: 'component',
        status: 'exists',
        path: `/components/wallet/TransactionHistory.tsx`,
      },
      {
        name: 'api/balance.ts',
        type: 'api',
        status: 'exists',
        path: `/app/api/wallet/balance/route.ts`,
      },
      {
        name: 'api/payment.ts',
        type: 'api',
        status: 'exists',
        path: `/app/api/wallet/payment/route.ts`,
      },
      { name: 'types/index.ts', type: 'util', status: 'exists', path: `/types/wallet.ts` },
      {
        name: 'tests/Balance.test.tsx',
        type: 'test',
        status: 'exists',
        path: `/__tests__/components/wallet/Balance.test.tsx`,
      },
    ],
    analytics: [
      {
        name: 'components/Metrics.tsx',
        type: 'component',
        status: 'exists',
        path: `/components/analytics/Metrics.tsx`,
      },
      {
        name: 'components/Reports.tsx',
        type: 'component',
        status: 'missing',
        path: `/components/analytics/Reports.tsx`,
      },
      {
        name: 'api/metrics.ts',
        type: 'api',
        status: 'exists',
        path: `/app/api/analytics/metrics/route.ts`,
      },
      {
        name: 'api/reports.ts',
        type: 'api',
        status: 'missing',
        path: `/app/api/analytics/reports/route.ts`,
      },
      { name: 'types/index.ts', type: 'util', status: 'exists', path: `/types/analytics.ts` },
      {
        name: 'tests/Metrics.test.tsx',
        type: 'test',
        status: 'missing',
        path: `/__tests__/components/analytics/Metrics.test.tsx`,
      },
    ],
  };

  return [...baseFiles, ...(moduleSpecificFiles[moduleId] || [])];
};

export default function ModuleInspectorPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const overallProgress = getOverallProgress();
  const workingModules = getModulesByStatus('Working');
  const underDevelopmentModules = getModulesByStatus('Under Development');
  const notStartedModules = getModulesByStatus('Not Started');
  const completedModules = getModulesByStatus('Completed');

  const filteredModules = ehbModules.filter(module => {
    const matchesSearch =
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || module.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  const getFileStats = (files: FileStatus[]) => {
    const exists = files.filter(f => f.status === 'exists').length;
    const missing = files.filter(f => f.status === 'missing').length;
    const empty = files.filter(f => f.status === 'empty').length;
    const needsUpdate = files.filter(f => f.status === 'needs-update').length;
    return { exists, missing, empty, needsUpdate, total: files.length };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                EHB Module Inspector
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Comprehensive module analysis and development status tracking
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                Overall Progress: {overallProgress}%
              </Badge>
              <Badge variant="outline" className="text-sm">
                {ehbModules.length} Modules
              </Badge>
            </div>
          </div>
        </header>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search modules..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="working">Working</option>
                  <option value="under development">Under Development</option>
                  <option value="not started">Not Started</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module Status Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedModules.length}</div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{workingModules.length}</div>
                <div className="text-sm text-blue-700">Working</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {underDevelopmentModules.length}
                </div>
                <div className="text-sm text-yellow-700">In Development</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{notStartedModules.length}</div>
                <div className="text-sm text-gray-700">Not Started</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          {filteredModules.map(module => {
            const files = getModuleFiles(module.id);
            const fileStats = getFileStats(files);
            const isExpanded = expandedModules.includes(module.id);
            const IconComponent = getModuleIcon(module.id);

            return (
              <Card key={module.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                      <div className="flex items-center gap-2">
                        {getStatusIcon(module.status)}
                        <CardTitle className="text-xl">{module.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                      <Badge variant="outline">{module.priority}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleModuleExpansion(module.id)}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                      <Link href={module.path}>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{module.title}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-bold">{module.progress}%</span>
                      </div>
                      <ProgressBar progress={module.progress} />
                    </div>
                  </div>

                  {/* File Statistics */}
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{fileStats.exists} files exist</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span>{fileStats.missing} files missing</span>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent>
                    <div className="space-y-4">
                      {/* Features */}
                      <div>
                        <h4 className="font-medium mb-2">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {module.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Dependencies */}
                      <div>
                        <h4 className="font-medium mb-2">Dependencies</h4>
                        <div className="flex flex-wrap gap-2">
                          {module.dependencies.map((dep, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Team */}
                      <div>
                        <h4 className="font-medium mb-2">Team</h4>
                        <div className="flex flex-wrap gap-2">
                          {module.team.map((member, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Files */}
                      <div>
                        <h4 className="font-medium mb-2">Files</h4>
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                            >
                              <div className="flex items-center gap-2">
                                {getFileTypeIcon(file.type)}
                                <span className="text-sm">{file.name}</span>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getFileStatusColor(file.status)}`}
                                >
                                  {file.status}
                                </Badge>
                              </div>
                              {file.status === 'missing' && (
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Plus className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div>
                        <h4 className="font-medium mb-2">Recommendations</h4>
                        <div className="space-y-2">
                          {fileStats.missing > 0 && (
                            <div className="flex items-center gap-2 text-sm text-red-600">
                              <AlertTriangle className="h-4 w-4" />
                              Create {fileStats.missing} missing files
                            </div>
                          )}
                          {module.progress < 50 && (
                            <div className="flex items-center gap-2 text-sm text-yellow-600">
                              <Clock className="h-4 w-4" />
                              Focus on core functionality development
                            </div>
                          )}
                          {module.progress >= 80 && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              Ready for testing and optimization
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
