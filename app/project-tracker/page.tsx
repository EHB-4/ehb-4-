"use client";

'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Users,
  Calendar,
  Target,
  BarChart3,
  FileText,
  MessageSquare,
  Settings,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
  milestones: Milestone[];
  risks: Risk[];
  slaCompliance: number;
}

interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'pending' | 'overdue';
  progress: number;
}

interface Risk {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  impact: string;
  mitigation: string;
  status: 'open' | 'mitigated' | 'closed';
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'EHB Platform Development',
    status: 'on-track',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    budget: {
      allocated: 50000,
      spent: 37500,
      currency: 'USD',
    },
    milestones: [
      {
        id: '1',
        name: 'Requirements Analysis',
        dueDate: '2024-02-15',
        status: 'completed',
        progress: 100,
      },
      { id: '2', name: 'Design Phase', dueDate: '2024-03-15', status: 'completed', progress: 100 },
      {
        id: '3',
        name: 'Development Phase',
        dueDate: '2024-05-15',
        status: 'in-progress',
        progress: 75,
      },
      { id: '4', name: 'Testing Phase', dueDate: '2024-06-15', status: 'pending', progress: 0 },
      { id: '5', name: 'Deployment', dueDate: '2024-06-30', status: 'pending', progress: 0 },
    ],
    risks: [
      {
        id: '1',
        title: 'Resource constraints',
        severity: 'medium',
        probability: 60,
        impact: 'Schedule delay',
        mitigation: 'Additional hiring',
        status: 'open',
      },
      {
        id: '2',
        title: 'Technical complexity',
        severity: 'high',
        probability: 40,
        impact: 'Quality issues',
        mitigation: 'Expert consultation',
        status: 'mitigated',
      },
    ],
    slaCompliance: 95,
  },
  {
    id: '2',
    name: 'AI Integration Module',
    status: 'at-risk',
    progress: 45,
    startDate: '2024-03-01',
    endDate: '2024-07-15',
    team: ['Sarah Wilson', 'David Brown'],
    budget: {
      allocated: 30000,
      spent: 18000,
      currency: 'USD',
    },
    milestones: [
      {
        id: '1',
        name: 'AI Model Selection',
        dueDate: '2024-03-30',
        status: 'completed',
        progress: 100,
      },
      {
        id: '2',
        name: 'Integration Development',
        dueDate: '2024-05-30',
        status: 'in-progress',
        progress: 45,
      },
      {
        id: '3',
        name: 'Testing & Validation',
        dueDate: '2024-06-30',
        status: 'pending',
        progress: 0,
      },
      {
        id: '4',
        name: 'Production Deployment',
        dueDate: '2024-07-15',
        status: 'pending',
        progress: 0,
      },
    ],
    risks: [
      {
        id: '1',
        title: 'AI model performance',
        severity: 'high',
        probability: 70,
        impact: 'Functionality issues',
        mitigation: 'Model optimization',
        status: 'open',
      },
      {
        id: '2',
        title: 'Data privacy concerns',
        severity: 'critical',
        probability: 30,
        impact: 'Legal issues',
        mitigation: 'Compliance review',
        status: 'open',
      },
    ],
    slaCompliance: 78,
  },
];

const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
  const config = {
    'on-track': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    'at-risk': { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
    delayed: { color: 'bg-red-100 text-red-800', icon: XCircle },
    completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  };

  const { color, icon: Icon } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${color}`}
    >
      <Icon className="w-4 h-4" />
      {status.replace('-', ' ').toUpperCase()}
    </span>
  );
};

const ProgressBar: React.FC<{ value: number; color?: string }> = ({
  value,
  color = 'bg-blue-500',
}) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className={`h-2 rounded-full transition-all duration-1000 ease-out ${color}`}
      style={{ width: `${value}%` }}
    />
  </div>
);

const RiskBadge: React.FC<{ severity: Risk['severity'] }> = ({ severity }) => {
  const config = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${config[severity]}`}>
      {severity.toUpperCase()}
    </span>
  );
};

export default function ProjectTrackerPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'risks' | 'sla'>(
    'overview'
  );

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setProjects(prev =>
        prev.map(project => ({
          ...project,
          progress: Math.min(100, project.progress + (Math.random() - 0.5) * 2),
          slaCompliance: Math.max(
            70,
            Math.min(100, project.slaCompliance + (Math.random() - 0.5) * 3)
          ),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalBudget = projects.reduce((sum, p) => sum + p.budget.allocated, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.budget.spent, 0);
  const averageProgress = projects.reduce((sum, p) => sum + p.progress, 0) / projects.length;
  const averageSLA = projects.reduce((sum, p) => sum + p.slaCompliance, 0) / projects.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Tracker</h1>
              <p className="text-gray-600 mt-1">Monitor project progress and SLA compliance</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Project
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Progress</p>
                <p className="text-2xl font-bold text-gray-900">{averageProgress.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Used</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(totalSpent / 1000).toFixed(0)}k / ${(totalBudget / 1000).toFixed(0)}k
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SLA Compliance</p>
                <p className="text-2xl font-bold text-gray-900">{averageSLA.toFixed(1)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
              </div>
              <div className="divide-y">
                {projects.map(project => (
                  <div
                    key={project.id}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedProject?.id === project.id
                        ? 'bg-blue-50 border-r-4 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progress.toFixed(1)}%</span>
                      </div>
                      <ProgressBar value={project.progress} />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{project.team.length} team members</span>
                      <span>{project.slaCompliance.toFixed(0)}% SLA</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-2">
            {selectedProject && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedProject.name}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {selectedProject.startDate} - {selectedProject.endDate}
                      </p>
                    </div>
                    <StatusBadge status={selectedProject.status} />
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', label: 'Overview', icon: BarChart3 },
                      { id: 'milestones', label: 'Milestones', icon: Target },
                      { id: 'risks', label: 'Risks', icon: AlertTriangle },
                      { id: 'sla', label: 'SLA', icon: CheckCircle },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Project Progress
                          </h3>
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Overall Progress</span>
                              <span>{selectedProject.progress.toFixed(1)}%</span>
                            </div>
                            <ProgressBar value={selectedProject.progress} />
                          </div>
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>SLA Compliance</span>
                              <span>{selectedProject.slaCompliance.toFixed(1)}%</span>
                            </div>
                            <ProgressBar
                              value={selectedProject.slaCompliance}
                              color="bg-green-500"
                            />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Budget Overview
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Allocated</span>
                              <span className="text-sm font-medium">
                                ${selectedProject.budget.allocated.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Spent</span>
                              <span className="text-sm font-medium">
                                ${selectedProject.budget.spent.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Remaining</span>
                              <span className="text-sm font-medium">
                                $
                                {(
                                  selectedProject.budget.allocated - selectedProject.budget.spent
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="pt-2">
                              <ProgressBar
                                value={
                                  (selectedProject.budget.spent /
                                    selectedProject.budget.allocated) *
                                  100
                                }
                                color="bg-purple-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Team Members</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.team.map((member, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'milestones' && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Project Milestones</h3>
                      <div className="space-y-4">
                        {selectedProject.milestones.map(milestone => (
                          <div key={milestone.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                              <span className="text-sm text-gray-500">{milestone.dueDate}</span>
                            </div>
                            <div className="mb-2">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{milestone.progress}%</span>
                              </div>
                              <ProgressBar value={milestone.progress} />
                            </div>
                            <StatusBadge status={milestone.status} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'risks' && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Assessment</h3>
                      <div className="space-y-4">
                        {selectedProject.risks.map(risk => (
                          <div key={risk.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{risk.title}</h4>
                              <RiskBadge severity={risk.severity} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Probability: </span>
                                <span className="font-medium">{risk.probability}%</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Impact: </span>
                                <span className="font-medium">{risk.impact}</span>
                              </div>
                              <div className="md:col-span-2">
                                <span className="text-gray-600">Mitigation: </span>
                                <span className="font-medium">{risk.mitigation}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'sla' && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        SLA Compliance Monitoring
                      </h3>
                      <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-green-800">
                              Current SLA Compliance
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-green-900">
                            {selectedProject.slaCompliance.toFixed(1)}%
                          </div>
                          <p className="text-sm text-green-700 mt-1">
                            Meeting service level agreement requirements
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Response Time</h4>
                            <div className="text-2xl font-bold text-blue-600">2.3h</div>
                            <p className="text-sm text-gray-600">Target: &lt; 4 hours</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Resolution Time</h4>
                            <div className="text-2xl font-bold text-green-600">18.5h</div>
                            <p className="text-sm text-gray-600">Target: &lt; 24 hours</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
