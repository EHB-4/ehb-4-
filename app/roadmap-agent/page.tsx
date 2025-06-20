'use client';

import { roadmapData } from '../roadmap/data/roadmapData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  Box,
  CheckCircle,
  Clock,
  Cpu,
  Zap,
  Briefcase,
  Target,
  Building,
  Users,
  Code,
  Globe,
  TrendingUp,
  Shield,
  BookOpen,
  Heart,
  Gavel,
  Plane,
  Store,
  Wallet,
  MessageSquare,
} from 'lucide-react';
import { useState } from 'react';

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'done':
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'in progress':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'planned':
    case 'upcoming':
    case 'future':
      return <Activity className="h-5 w-5 text-blue-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'done':
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'planned':
    case 'upcoming':
    case 'future':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
  </div>
);

const getDepartmentIcon = (departmentName: string) => {
  switch (departmentName) {
    case 'PSS':
      return <Shield className="h-6 w-6" />;
    case 'EDR':
      return <BookOpen className="h-6 w-6" />;
    case 'EMO':
      return <Building className="h-6 w-6" />;
    case 'JPS':
      return <Users className="h-6 w-6" />;
    case 'Franchise':
      return <Globe className="h-6 w-6" />;
    case 'AI/Agents':
      return <Cpu className="h-6 w-6" />;
    case 'WMS':
      return <Heart className="h-6 w-6" />;
    case 'OLS':
      return <Gavel className="h-6 w-6" />;
    case 'AGTS':
      return <Plane className="h-6 w-6" />;
    case 'OBS':
      return <BookOpen className="h-6 w-6" />;
    case 'Finance':
      return <Wallet className="h-6 w-6" />;
    case 'Support & Complaint':
      return <MessageSquare className="h-6 w-6" />;
    default:
      return <Building className="h-6 w-6" />;
  }
};

export default function RoadmapAgentPage() {
  const { companyOverview, departments, uiRoadmap, agentAssignments, phases } = roadmapData;
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate overall progress
  const totalTasks = phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const completedTasks = phases.reduce(
    (acc, phase) => acc + phase.tasks.filter(task => task.status === 'Done').length,
    0
  );
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Calculate department progress
  const completedDepartments = departments.filter(dept => dept.status === 'Completed').length;
  const inProgressDepartments = departments.filter(dept => dept.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            EHB Development Roadmap Agent
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            AI-powered roadmap management and real-time project tracking
          </p>
        </header>

        {/* Company Overview */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6" />
                Company Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Mission</h3>
                <p className="text-gray-600 dark:text-gray-400">{companyOverview.mission}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Vision</h3>
                <p className="text-gray-600 dark:text-gray-400">{companyOverview.vision}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Primary Goals</h3>
                <p className="text-gray-600 dark:text-gray-400">{companyOverview.primaryGoals}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* High Level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
              </p>
              <ProgressBar progress={overallProgress} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.length}</div>
              <p className="text-xs text-muted-foreground">
                {completedDepartments} completed, {inProgressDepartments} in progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Development Phases</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{phases.length}</div>
              <p className="text-xs text-muted-foreground">
                {phases.filter(p => p.tasks.some(t => t.status === 'Done')).length} active phases
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Agents</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agentAssignments.length}</div>
              <p className="text-xs text-muted-foreground">Active AI agents across modules</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Overview', icon: Target },
              { id: 'departments', label: 'Departments', icon: Building },
              { id: 'phases', label: 'Development Phases', icon: TrendingUp },
              { id: 'ui', label: 'UI Roadmap', icon: Code },
              { id: 'agents', label: 'AI Agents', icon: Cpu },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Department Status</h3>
                    <div className="space-y-2">
                      {departments.map(dept => (
                        <div
                          key={dept.name}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <span className="font-medium">{dept.name}</span>
                          <Badge className={getStatusColor(dept.status)}>{dept.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Phase Progress</h3>
                    <div className="space-y-3">
                      {phases.map(phase => {
                        const completedTasks = phase.tasks.filter(t => t.status === 'Done').length;
                        const progress =
                          phase.tasks.length > 0 ? (completedTasks / phase.tasks.length) * 100 : 0;
                        return (
                          <div key={phase.id}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{phase.title}</span>
                              <span>{progress.toFixed(0)}%</span>
                            </div>
                            <ProgressBar progress={progress} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-6">
            {departments.map(dept => (
              <Card key={dept.name}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {getDepartmentIcon(dept.name)}
                    <div>
                      <CardTitle>{dept.name}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{dept.description}</p>
                    </div>
                    <Badge className={`ml-auto ${getStatusColor(dept.status)}`}>
                      {dept.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Responsibilities</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {dept.responsibilities}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Connected Services</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {dept.connectedServices}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'phases' && (
          <div className="space-y-6">
            {phases.map(phase => (
              <Card key={phase.id}>
                <CardHeader>
                  <CardTitle>{phase.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">{phase.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {phase.tasks.map(task => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {getStatusIcon(task.status)}
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {task.description}
                            </p>
                            <Badge variant="outline" className="mt-1">
                              {task.module}
                            </Badge>
                          </div>
                        </div>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'ui' && (
          <div className="space-y-6">
            {uiRoadmap.map(uiPhase => (
              <Card key={uiPhase.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{uiPhase.title}</CardTitle>
                    <Badge className={getStatusColor(uiPhase.status)}>{uiPhase.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {uiPhase.tasks.map((task, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Agent Assignments</CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  AI agents responsible for different modules and functionalities
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agentAssignments.map((assignment, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <Cpu className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{assignment.module}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {assignment.agent}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
