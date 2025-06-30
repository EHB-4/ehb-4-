import React from 'react';

type MilestoneStatus = 'Completed' | 'In Progress' | 'Upcoming';
interface Milestone {
  id: string;
  title: string;
  date: string;
  status: MilestoneStatus;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const statusColors: Record<MilestoneStatus, string> = {
  Completed: 'bg-green-500',
  'In Progress': 'bg-blue-500',
  Upcoming: 'bg-gray-300',
};

const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ milestones }) => {
  return (
    <div className="flex items-center gap-6 py-4 overflow-x-auto">
      {milestones.map((milestone, idx) => (
        <div key={milestone.id} className="flex flex-col items-center min-w-[120px]">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold ${
              statusColors[milestone.status]
            }`}
          >
            {idx + 1}
          </div>
          <div className="mt-2 text-xs font-medium text-blue-900 text-center">
            {milestone.title}
          </div>
          <div className="text-[10px] text-gray-500 text-center">{milestone.date}</div>
          {idx < milestones.length - 1 && <div className="w-16 h-1 bg-gray-300 mt-3 mb-3" />}
        </div>
      ))}
    </div>
  );
};

export default MilestoneTimeline;
