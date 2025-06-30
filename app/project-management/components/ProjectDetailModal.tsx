import React from 'react';
import KanbanBoard from './KanbanBoard';
import TeamAssignmentPanel from './TeamAssignmentPanel';
import MilestoneTimeline from './MilestoneTimeline';
import AttachmentsCommentsPanel from './AttachmentsCommentsPanel';

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

type TaskStatus = 'Assigned' | 'In Progress' | 'In Review' | 'Done';
interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: TaskStatus;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

type MilestoneStatus = 'Completed' | 'In Progress' | 'Upcoming';
interface Milestone {
  id: string;
  title: string;
  date: string;
  status: MilestoneStatus;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  date: string;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

// Placeholder tasks for demo
const placeholderTasks: Task[] = [
  { id: 't1', title: 'Design UI', assignee: 'Rafi', dueDate: '2025-07-01', status: 'Assigned' },
  {
    id: 't2',
    title: 'Setup Backend',
    assignee: 'Sana',
    dueDate: '2025-07-05',
    status: 'In Progress',
  },
  {
    id: 't3',
    title: 'API Integration',
    assignee: 'Hamza',
    dueDate: '2025-07-10',
    status: 'In Review',
  },
  { id: 't4', title: 'Testing & QA', assignee: 'Rafi', dueDate: '2025-07-15', status: 'Done' },
];

// Placeholder team for demo
const placeholderTeam: TeamMember[] = [
  { id: 'u1', name: 'Rafi', role: 'Frontend Lead', email: 'rafi@ehb.com' },
  { id: 'u2', name: 'Sana', role: 'Backend Dev', email: 'sana@ehb.com' },
  { id: 'u3', name: 'Hamza', role: 'QA Engineer', email: 'hamza@ehb.com' },
];

// Placeholder milestones for demo
const placeholderMilestones: Milestone[] = [
  { id: 'm1', title: 'Planning', date: '2025-06-01', status: 'Completed' },
  { id: 'm2', title: 'UI Design', date: '2025-06-10', status: 'Completed' },
  { id: 'm3', title: 'Backend/API', date: '2025-06-20', status: 'In Progress' },
  { id: 'm4', title: 'Launch', date: '2025-07-15', status: 'Upcoming' },
];

// Placeholder attachments for demo
const placeholderAttachments: Attachment[] = [
  { id: 'a1', name: 'UI Mockup.pdf', type: 'PDF', uploadedBy: 'Rafi', date: '2025-06-02' },
  { id: 'a2', name: 'API Spec.docx', type: 'DOCX', uploadedBy: 'Sana', date: '2025-06-12' },
];

// Placeholder comments for demo
const placeholderComments: Comment[] = [
  { id: 'c1', user: 'Hamza', text: 'API integration is almost done!', date: '2025-06-20' },
  { id: 'c2', user: 'Rafi', text: 'UI design approved by client.', date: '2025-06-11' },
];

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-700 hover:text-blue-900 text-2xl font-bold focus:outline-none"
          aria-label="Close project details"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-blue-900 mb-2">{project.name}</h2>
        <div className="text-sm text-gray-500 mb-4">Department: {project.department}</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 rounded bg-blue-500 text-white">{project.status}</span>
          <span className="text-xs text-gray-700 font-medium">Progress: {project.progress}%</span>
        </div>
        <div className="mb-2 text-sm text-gray-700">
          Owner: <span className="font-medium">{project.owner}</span>
        </div>
        <div className="mb-4 text-sm text-gray-700">
          ETA: <span className="font-medium">{project.eta}</span>
        </div>
        <MilestoneTimeline milestones={placeholderMilestones} />
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-1">Milestones</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Planning (placeholder)</li>
            <li>UI Design (placeholder)</li>
            <li>Backend/API (placeholder)</li>
            <li>Launch (placeholder)</li>
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Tasks / Kanban</h3>
          <KanbanBoard tasks={placeholderTasks} />
        </div>
        <TeamAssignmentPanel team={placeholderTeam} />
        <AttachmentsCommentsPanel
          attachments={placeholderAttachments}
          comments={placeholderComments}
        />
      </div>
    </div>
  );
};

export default ProjectDetailModal;
