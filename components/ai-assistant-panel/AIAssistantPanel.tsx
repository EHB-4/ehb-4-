'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FiX, FiChevronsRight, FiZap, FiCheckCircle, FiBell } from 'react-icons/fi';
import { Button } from '../ui/button';

// Define a type for our state for better type safety
interface AssistantState {
  suggestions: { id: number; description: string; status: string }[];
  actions: { description: string; timestamp: string }[];
  dailySummary: { improvements: number; suggestionsAdded: number };
  autoMode: boolean;
}

export default function AIAssistantPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [state, setState] = useState<AssistantState>({
    suggestions: [],
    actions: [],
    dailySummary: { improvements: 0, suggestionsAdded: 0 },
    autoMode: true,
  });

  // In a real app, you'd fetch this from an API route that reads the state file.
  // For this demo, we'll just use some initial mock data.
  useEffect(() => {
    const mockState: AssistantState = {
      suggestions: [
        {
          id: 1,
          description: 'Theme switcher is missing from the main layout.',
          status: 'pending',
        },
        {
          id: 2,
          description: 'Sidebar should be collapsible to save screen space.',
          status: 'pending',
        },
      ],
      actions: [
        {
          description: 'Agent initialized and scan complete.',
          timestamp: new Date().toISOString(),
        },
      ],
      dailySummary: { improvements: 0, suggestionsAdded: 2 },
      autoMode: true,
    };
    setState(mockState);
  }, []);

  const sidebarVariants: Variants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  if (!isOpen) {
    return (
      <motion.div
        className="fixed top-1/2 right-0 -translate-y-1/2 z-50"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Button onClick={() => setIsOpen(true)} size="icon" className="rounded-r-none shadow-lg">
          <FiChevronsRight className="h-5 w-5" />
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 right-0 h-full w-96 bg-slate-900 text-white shadow-2xl z-50 p-4 flex flex-col font-sans"
        variants={sidebarVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-700">
          <h2 className="text-lg font-bold">🚀 AI UI/UX Assistant</h2>
          <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon">
            <FiX className="h-5 w-5" />
          </Button>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-2 gap-4 p-2 my-4 bg-slate-800 rounded-lg">
          <div className="text-center p-2">
            <p className="text-2xl font-bold">{state.dailySummary.improvements}</p>
            <p className="text-xs text-slate-400">Improvements Today</p>
          </div>
          <div className="text-center p-2">
            <p className="text-2xl font-bold">{state.dailySummary.suggestionsAdded}</p>
            <p className="text-xs text-slate-400">Pending Suggestions</p>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="flex-grow overflow-y-auto space-y-6">
          <div>
            <h3 className="font-bold mb-2 text-slate-300 flex items-center">
              <FiBell className="mr-2" /> Suggestions
            </h3>
            <ul className="space-y-2">
              {state.suggestions.map(s => (
                <li
                  key={s.id}
                  className="p-3 bg-slate-800 rounded-lg text-sm flex items-start hover:bg-slate-700 transition-colors"
                >
                  <FiZap className="w-4 h-4 mr-3 mt-0.5 text-yellow-400 flex-shrink-0" />
                  <span>{s.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2 text-slate-300 flex items-center">
              <FiCheckCircle className="mr-2" /> Recent Actions
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {state.actions.map((a, i) => (
                <li key={i} className="p-3 bg-slate-800/50 rounded-lg text-xs">
                  {a.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
