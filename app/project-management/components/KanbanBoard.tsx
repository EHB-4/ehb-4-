import React from 'react';

type TaskStatus = 'Assigned' | 'In Progress' | 'In Review' | 'Done';
interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: TaskStatus;
}

interface KanbanBoardProps {
  tasks: Task[];
}

const statusColumns: TaskStatus[] = ['Assigned', 'In Progress', 'In Review', 'Done'];

const statusColors: Record<TaskStatus, string> = {
  Assigned: 'bg-gray-200',
  'In Progress': 'bg-blue-200',
  'In Review': 'bg-yellow-200',
  Done: 'bg-green-200',
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  return (
    <div className="flex gap-4 overflow-x-auto py-4">
      {statusColumns.map(status => (
        <div key={status} className="min-w-[220px] flex-1">
          <div className="font-bold text-blue-800 mb-2 text-center">{status}</div>
          <div className="flex flex-col gap-3">
            {tasks.filter(task => task.status === status).length === 0 && (
              <div className="text-xs text-gray-400 text-center">No tasks</div>
            )}
            {tasks
              .filter(task => task.status === status)
              .map(task => (
                <div
                  key={task.id}
                  className={`rounded-lg shadow p-3 ${statusColors[status]} border border-blue-100`}
                >
                  <div className="font-medium text-blue-900 text-sm mb-1">{task.title}</div>
                  <div className="text-xs text-gray-700 mb-1">Assignee: {task.assignee}</div>
                  <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
