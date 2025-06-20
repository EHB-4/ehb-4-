import { roadmapData } from '@/app/roadmap/data/roadmapData';

interface Suggestion {
  title: string;
  reasoning: string;
  confidence: number; // A score from 0 to 1
}

/**
 * A simple AI engine that analyzes the current roadmap and suggests next steps.
 */
export class InsightEngine {
  /**
   * Generates development suggestions based on the current state of the roadmap.
   * @returns An array of suggestions.
   */
  static getSuggestions(): Suggestion[] {
    const suggestions: Suggestion[] = [];
    const { departments, phases } = roadmapData;

    // Suggestion 1: Focus on "In Progress" departments
    const inProgressDepartments = departments.filter(d => d.status === 'In Progress');
    if (inProgressDepartments.length > 0) {
      suggestions.push({
        title: `Accelerate development in: ${inProgressDepartments.map(d => d.name).join(', ')}`,
        reasoning: `These departments are already active. Completing them will deliver value faster.`,
        confidence: 0.8,
      });
    }

    // Suggestion 2: Start working on "Planned" phases
    const nextPhase = phases.find(p => p.tasks.every(t => t.status === 'Planned'));
    if (nextPhase) {
      suggestions.push({
        title: `Begin work on Phase: ${nextPhase.title}`,
        reasoning:
          'This is the next logical step in the roadmap. Starting it now will keep the momentum going.',
        confidence: 0.9,
      });
    }

    // Add more complex logic here in the future.
    // For example, analyze task dependencies, team availability, or business priorities.

    return suggestions;
  }
}
