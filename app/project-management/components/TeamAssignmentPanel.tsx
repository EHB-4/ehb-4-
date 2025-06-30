import React from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface TeamAssignmentPanelProps {
  team: TeamMember[];
}

const TeamAssignmentPanel: React.FC<TeamAssignmentPanelProps> = ({ team }) => {
  return (
    <div className="mt-6 bg-blue-50 rounded-xl p-4 shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-blue-800">Assigned Team</h3>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-medium focus:outline-none"
          aria-label="Assign new member"
        >
          + Assign New Member
        </button>
      </div>
      <ul className="divide-y divide-blue-100">
        {team.length === 0 && <li className="text-sm text-gray-400">No team members assigned.</li>}
        {team.map(member => (
          <li key={member.id} className="py-2 flex items-center justify-between">
            <div>
              <span className="font-medium text-blue-900">{member.name}</span>
              <span className="ml-2 text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                {member.role}
              </span>
            </div>
            <a
              href={`mailto:${member.email}`}
              className="text-xs text-blue-600 underline hover:text-blue-800"
            >
              {member.email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamAssignmentPanel;
