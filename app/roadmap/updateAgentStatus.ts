import { roadmapData } from '@/app/roadmap/data/roadmapData';
import { Module } from '@/app/roadmap/types';

export type AgentStatus = Module['status'];

export function updateAgentStatus(
  moduleName: string,
  status: AgentStatus,
  progress?: number,
  error?: string
) {
  // Find the module in roadmapData
  const moduleItem = roadmapData.modules.find(m => m.name === moduleName);
  if (!moduleItem) return false;
  moduleItem.status = status;
  if (typeof progress === 'number') moduleItem.progress = progress;
  if (error && 'error' in moduleItem) (moduleItem as any).error = error;
  // Optionally: log update, trigger UI refresh, notify dashboard, etc.
  return true;
}
