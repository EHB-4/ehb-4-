export type TaskType = 'development' | 'testing' | 'deployment' | 'monitoring';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface Task {
  id: string;
  type: TaskType;
  description: string;
  priority: TaskPriority;
  data: any;
  status: TaskStatus;
  result?: any;
}

export interface AgentControl {
  status: 'idle' | 'active' | 'paused';
  tasks: Task[];
}

export interface MetricData {
  value: any;
  timestamp: Date;
}
