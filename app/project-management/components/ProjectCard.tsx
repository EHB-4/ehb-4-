import React from 'react';

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

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<ProjectStatus, string> = {
  'In Progress': 'bg-blue-500',
  Completed: 'bg-green-500',
  Delayed: 'bg-red-500',
  Upcoming: 'bg-yellow-400',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-blue-100">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-blue-800">{project.name}</h2>
        <span className={`text-xs px-2 py-1 rounded ${statusColors[project.status]} text-white`}>
          {project.status}
        </span>
      </div>
      <div className="text-sm text-gray-500">Department: {project.department}</div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-full bg-gray-200 rounded h-2">
          <div
            className={`h-2 rounded ${statusColors[project.status]}`}
            style={{ width: `${project.progress}%` }}
            aria-label={`Progress: ${project.progress}%`}
          />
        </div>
        <span className="text-xs text-gray-700 font-medium">{project.progress}%</span>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-2">
        <span>Owner: {project.owner}</span>
        <span>ETA: {project.eta}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
