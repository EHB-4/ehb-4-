export interface Task {
  id: string;
  type: 'development' | 'testing' | 'deployment' | 'monitoring';
  data: any;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: number;
  endTime?: number;
  processingTime?: number;
  result?: any;
  error?: string;
}
