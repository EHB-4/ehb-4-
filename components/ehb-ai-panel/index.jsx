import React, { useState } from 'react';
import AgentsList from './agents-list';
import VoiceInput from './voice-input';
import ScreenRecord from './screen-record';
import ScreenWatch from './screen-watch';
import FileUploader from './file-uploader';
import AIContextProvider from './ai-context-provider';

const EhbAiPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <AIContextProvider>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-700 text-white rounded-full shadow-lg p-4 hover:bg-blue-800 focus:outline-none"
        aria-label="Open EHB AI Panel"
        onClick={() => setOpen(v => !v)}
      >
        <span className="font-bold text-lg">EHB AI</span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-96 max-w-full bg-white rounded-xl shadow-2xl border border-blue-200 flex flex-col overflow-hidden animate-fade-in-up">
          <div className="flex items-center justify-between px-4 py-2 bg-blue-700 text-white">
            <span className="font-bold">EHB AI Panel</span>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-white">
              ✕
            </button>
          </div>
          <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[70vh]">
            <AgentsList />
            <VoiceInput />
            <FileUploader />
            <ScreenWatch />
            <ScreenRecord />
            {/* Add EHB-Chat, EHB-Robot, and future agent sections here */}
          </div>
        </div>
      )}
    </AIContextProvider>
  );
};

export default EhbAiPanel;
