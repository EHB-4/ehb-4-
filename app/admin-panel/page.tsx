'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building,
  GitBranch,
  Target,
  Telescope,
  CheckCircle,
  Clock,
  Activity,
  Lightbulb,
} from 'lucide-react';
import { roadmapData } from '../roadmap/data/roadmapData';
import { Badge } from '@/components/ui/badge';
import { InsightEngine } from '@/lib/ai/insight-engine';

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'in progress':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'planned':
    case 'upcoming':
    case 'future':
      return <Activity className="h-5 w-5 text-blue-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'planned':
    case 'upcoming':
    case 'future':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminPanelPage() {
  const { departments, phases, companyOverview } = roadmapData;
  const suggestions = InsightEngine.getSuggestions();

  const getDepartmentLink = (departmentName: string) => {
    if (departmentName === 'EDR') {
      return '/edr';
    }
    // Placeholder for other departments, can be built out later
    return `/#`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            AI Overview Console
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Real-time tracking of modules, roadmap, and company vision.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* Modules Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6" />
                Modules Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map(dept => (
                  <Link href={getDepartmentLink(dept.name)} key={dept.name} passHref>
                    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {dept.name}
                          <Badge className={getStatusColor(dept.status)}>{dept.status}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {dept.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Roadmap Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-6 w-6" />
                Development Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {phases.map(phase => (
                  <div key={phase.id}>
                    <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{phase.description}</p>
                    <div className="space-y-4">
                      {phase.tasks.map(task => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(task.status)}
                            <div>
                              <h4 className="font-medium">{task.title}</h4>
                            </div>
                          </div>
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Vision Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Telescope className="h-6 w-6" />
                Company Vision & Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Mission</h3>
                  <p className="text-gray-600 dark:text-gray-400">{companyOverview.mission}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Vision</h3>
                  <p className="text-gray-600 dark:text-gray-400">{companyOverview.vision}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Primary Goals</h3>
                  <p className="text-gray-600 dark:text-gray-400">{companyOverview.primaryGoals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                AI-Powered Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {suggestion.reasoning}
                    </p>
                    <div className="text-xs font-mono text-blue-500 mt-1">
                      Confidence: {suggestion.confidence * 100}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
