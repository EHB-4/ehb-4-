'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaPlay,
  FaPause,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
  FaChartLine,
  FaUsers,
  FaCalendar,
  FaFlag,
} from 'react-icons/fa';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'completed' | 'on-hold';
  progress: number;
  sco: string;
  startDate: string;
  endDate: string;
  team: string[];
  budget: number;
  spent: number;
  sla: {
    responseTime: string;
    resolutionTime: string;
    uptime: string;
  };
  milestones: Milestone[];
  risks: Risk[];
}

interface Milestone {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  dueDate: string;
  progress: number;
}

interface Risk {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'mitigated' | 'closed';
  description: string;
}

export default function ProjectTrackerPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const projects: Project[] = [
    {
      id: '1',
      name: 'EHB Dashboard Redesign',
      description: 'Complete redesign of the main dashboard with new analytics features',
      status: 'development',
      progress: 65,
      sco: 'Professional',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      budget: 25000,
      spent: 16250,
      sla: {
        responseTime: '8 hours',
        resolutionTime: '1-2 business days',
        uptime: '99.8%',
      },
      milestones: [
        {
          id: '1',
          name: 'Design Approval',
          status: 'completed',
          dueDate: '2024-01-30',
          progress: 100,
        },
        {
          id: '2',
          name: 'Frontend Development',
          status: 'in-progress',
          dueDate: '2024-03-15',
          progress: 75,
        },
        {
          id: '3',
          name: 'Backend Integration',
          status: 'pending',
          dueDate: '2024-03-30',
          progress: 0,
        },
        { id: '4', name: 'Testing & QA', status: 'pending', dueDate: '2024-04-10', progress: 0 },
        { id: '5', name: 'Deployment', status: 'pending', dueDate: '2024-04-15', progress: 0 },
      ],
      risks: [
        {
          id: '1',
          title: 'API Integration Delay',
          severity: 'medium',
          status: 'open',
          description: 'Third-party API documentation is incomplete',
        },
        {
          id: '2',
          title: 'Design Changes',
          severity: 'low',
          status: 'mitigated',
          description: 'Client requested minor design adjustments',
        },
      ],
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application for iOS and Android',
      status: 'testing',
      progress: 85,
      sco: 'Enterprise',
      startDate: '2023-11-01',
      endDate: '2024-03-01',
      team: ['Sarah Wilson', 'Alex Brown', 'Chris Davis'],
      budget: 45000,
      spent: 38250,
      sla: {
        responseTime: '2 hours',
        resolutionTime: 'Same day',
        uptime: '99.9%',
      },
      milestones: [
        {
          id: '1',
          name: 'UI/UX Design',
          status: 'completed',
          dueDate: '2023-12-15',
          progress: 100,
        },
        {
          id: '2',
          name: 'iOS Development',
          status: 'completed',
          dueDate: '2024-01-30',
          progress: 100,
        },
        {
          id: '3',
          name: 'Android Development',
          status: 'completed',
          dueDate: '2024-02-15',
          progress: 100,
        },
        {
          id: '4',
          name: 'Testing & Bug Fixes',
          status: 'in-progress',
          dueDate: '2024-02-28',
          progress: 90,
        },
        {
          id: '5',
          name: 'App Store Submission',
          status: 'pending',
          dueDate: '2024-03-01',
          progress: 0,
        },
      ],
      risks: [
        {
          id: '1',
          title: 'App Store Approval',
          severity: 'medium',
          status: 'open',
          description: 'Potential delays in app store review process',
        },
      ],
    },
    {
      id: '3',
      name: 'E-commerce Platform',
      description: 'Full-featured online shopping platform with payment integration',
      status: 'planning',
      progress: 25,
      sco: 'Basic',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      team: ['David Lee', 'Emily Chen'],
      budget: 15000,
      spent: 3750,
      sla: {
        responseTime: '24 hours',
        resolutionTime: '3-5 business days',
        uptime: '99.5%',
      },
      milestones: [
        {
          id: '1',
          name: 'Requirements Gathering',
          status: 'completed',
          dueDate: '2024-02-15',
          progress: 100,
        },
        {
          id: '2',
          name: 'System Architecture',
          status: 'in-progress',
          dueDate: '2024-02-28',
          progress: 60,
        },
        { id: '3', name: 'Database Design', status: 'pending', dueDate: '2024-03-15', progress: 0 },
        {
          id: '4',
          name: 'Development Phase',
          status: 'pending',
          dueDate: '2024-04-15',
          progress: 0,
        },
        {
          id: '5',
          name: 'Testing & Launch',
          status: 'pending',
          dueDate: '2024-05-01',
          progress: 0,
        },
      ],
      risks: [
        {
          id: '1',
          title: 'Payment Gateway Integration',
          severity: 'high',
          status: 'open',
          description: 'Complex payment gateway requirements',
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-400';
      case 'delayed':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="w-4 h-4" />;
      case 'in-progress':
        return <FaPlay className="w-4 h-4" />;
      case 'pending':
        return <FaClock className="w-4 h-4" />;
      case 'delayed':
        return <FaExclamationTriangle className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
    }
  };

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredProjects = projects.filter(
    project => filterStatus === 'all' || project.status === filterStatus
  );

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <FaChartLine className="w-12 h-12" />
              <h1 className="text-5xl font-bold">Project Tracker</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Monitor your projects in real-time with comprehensive progress tracking, milestone
              management, and SCO compliance monitoring.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilterStatus('planning')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'planning'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Planning
            </button>
            <button
              onClick={() => setFilterStatus('development')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'development'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Development
            </button>
            <button
              onClick={() => setFilterStatus('testing')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'testing'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Testing
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Completed
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                    selectedProject === project.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                      <p className="text-gray-600 mb-2">{project.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FaCalendar className="w-4 h-4 mr-1" />
                          {project.startDate} - {project.endDate}
                        </span>
                        <span className="flex items-center">
                          <FaUsers className="w-4 h-4 mr-1" />
                          {project.team.length} team members
                        </span>
                        <span className="flex items-center">
                          <FaFlag className="w-4 h-4 mr-1" />
                          {project.sco} SCO
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {project.progress}%
                      </div>
                      <div className="text-sm text-gray-500">Complete</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Budget Progress */}
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>Budget: ${project.budget.toLocaleString()}</span>
                    <span>Spent: ${project.spent.toLocaleString()}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        project.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'development'
                            ? 'bg-blue-100 text-blue-800'
                            : project.status === 'testing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.status}
                    </span>
                    <div className="text-sm text-gray-500">
                      {project.milestones.filter(m => m.status === 'completed').length} /{' '}
                      {project.milestones.length} milestones
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-6"
            >
              {selectedProjectData ? (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h3>

                  {/* SLA Information */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">SCO Compliance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time:</span>
                        <span className="font-medium">{selectedProjectData.sla.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Resolution Time:</span>
                        <span className="font-medium">
                          {selectedProjectData.sla.resolutionTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uptime Guarantee:</span>
                        <span className="font-medium">{selectedProjectData.sla.uptime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Milestones</h4>
                    <div className="space-y-3">
                      {selectedProjectData.milestones.map(milestone => (
                        <div key={milestone.id} className="border-l-4 border-gray-200 pl-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {milestone.name}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(milestone.status)} text-white`}
                            >
                              {milestone.status}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mb-2">Due: {milestone.dueDate}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`${getStatusColor(milestone.status)} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${milestone.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Risks & Issues</h4>
                    <div className="space-y-3">
                      {selectedProjectData.risks.map(risk => (
                        <div key={risk.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{risk.title}</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(risk.severity)} text-white`}
                            >
                              {risk.severity}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{risk.description}</p>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              risk.status === 'closed'
                                ? 'bg-green-100 text-green-800'
                                : risk.status === 'mitigated'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {risk.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Team Members</h4>
                    <div className="space-y-2">
                      {selectedProjectData.team.map((member, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {member
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700">{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <FaChartLine className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a project to view details</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
