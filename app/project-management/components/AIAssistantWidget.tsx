import React from 'react';

const AIAssistantWidget: React.FC = () => {
  return (
    <div className="mt-10 bg-gradient-to-r from-blue-200 to-blue-400 rounded-xl shadow p-6 flex items-center gap-4">
      <div className="flex-shrink-0">
        <span className="inline-block bg-white rounded-full p-2 shadow">
          <svg
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 20h.01M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </div>
      <div>
        <div className="text-lg font-semibold text-blue-900">AI Assistant</div>
        <div className="text-blue-900 text-sm mt-1">
          How can I help you today? (Coming soon: Ask about project status, delays, or get
          suggestions!)
        </div>
      </div>
    </div>
  );
};

export default AIAssistantWidget;
