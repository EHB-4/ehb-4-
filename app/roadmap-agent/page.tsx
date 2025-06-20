'use client';

import { roadmapData } from '../roadmap/data/roadmapData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Box, CheckCircle, Clock, Cpu, Zap, Briefcase, Target } from 'lucide-react';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'planned':
      return <Activity className="h-5 w-5 text-blue-500" />;
    default:
      return null;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
  </div>
);

export default function RoadmapAgentPage() {
  const { modules, companyInfo, timeline, status } = roadmapData;

  const totalProgress = modules.reduce((acc, module) => acc + module.progress, 0) / modules.length;

  const nextMilestone = timeline.find(
    item => item.status === 'in-progress' || item.status === 'planned'
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            EHB Development Roadmap Agent
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Real-time insights into our development progress and future plans.
          </p>
        </header>

        {/* High Level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProgress.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">Across all modules</p>
              <ProgressBar progress={totalProgress} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Modules</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{modules.length}</div>
              <p className="text-xs text-muted-foreground">
                {status.modules.completed} completed, {status.modules.inProgress} in progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Features</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {modules.reduce((acc, m) => acc + m.features.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                {status.features.completed} completed, {status.features.inProgress} in progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{nextMilestone?.title || 'Planning'}</div>
              <p className="text-xs text-muted-foreground">
                ETA: {nextMilestone ? new Date(nextMilestone.date).toLocaleDateString() : 'TBD'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Modules Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Modules & Features</h2>
          <div className="space-y-6">
            {modules.map(module => (
              <Card key={module.id} className="overflow-hidden">
                <CardHeader className="bg-gray-100 dark:bg-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Cpu className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="text-xl font-semibold">{module.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">{module.progress}%</p>
                        <Badge
                          variant={
                            module.status === 'completed'
                              ? 'success'
                              : module.status === 'in-progress'
                                ? 'warning'
                                : 'default'
                          }
                        >
                          {module.status}
                        </Badge>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${getPriorityColor(module.priority)}`}
                        title={`Priority: ${module.priority}`}
                      />
                    </div>
                  </div>
                  <ProgressBar progress={module.progress} />
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <h4 className="font-semibold">Features:</h4>
                  {module.features.map(feature => (
                    <div key={feature.id} className="border-l-2 pl-4 flex items-start gap-4">
                      <div>{getStatusIcon(feature.status)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{feature.name}</p>
                          <Badge variant="outline">{feature.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {feature.description}
                        </p>
                        <ProgressBar progress={feature.progress} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
