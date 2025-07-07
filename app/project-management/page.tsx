'use client';

'use client';
import React, { useState } from 'react';
import ProjectCard from './components/ProjectCard';
import FilterBar from './components/FilterBar';
import AIAssistantWidget from './components/AIAssistantWidget';
import ProjectDetailModal from './components/ProjectDetailModal';

// Placeholder types
type ProjectStatus = 'In Progress' | 'Completed' | 'Delayed' | 'Upcoming';
interface Project {
  id: string;
  name: string;
  department: string;
  status: ProjectStatus;
  progress: number;
  owner: string;
  eta: string;
}

// Dummy data
const projects: Project[] = [
  {
    id: '1',
    name: 'GoSellr',
    department: 'E-Commerce',
    status: 'In Progress',
    progress: 64,
    owner: 'Rafi',
    eta: '2025-08-01',
  },
  {
    id: '2',
    name: 'OBS',
    department: 'Education',
    status: 'Completed',
    progress: 100,
    owner: 'Sana',
    eta: '2025-05-15',
  },
  {
    id: '3',
    name: 'Franchise',
    department: 'Franchise',
    status: 'Delayed',
    progress: 42,
    owner: 'Hamza',
    eta: '2025-07-10',
  },
  {
    id: '4',
    name: 'Wallet',
    department: 'Finance',
    status: 'Upcoming',
    progress: 0,
    owner: 'Sana',
    eta: '2025-09-01',
  },
];

export default function ProjectManagementDashboard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">EHB Project Management Panel</h1>
        <FilterBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          {projects.map(project => (
            <button
              key={project.id}
              className="text-left focus:outline-none"
              onClick={() => setSelectedProject(project)}
              aria-label={`View details for ${project.name}`}
            >
              <ProjectCard project={project} />
            </button>
          ))}
        </div>
        <AIAssistantWidget />
      </div>
      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
