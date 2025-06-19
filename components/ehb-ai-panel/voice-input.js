import React, { useState } from 'react';

const VoiceInput = () => {
  const [transcript, setTranscript] = useState('');
  // Placeholder: actual voice logic to be added
  return (
    <div className="my-2">
      <h4 className="font-semibold">🎙 Voice Input</h4>
      <button
        className="bg-blue-100 text-blue-700 px-3 py-1 rounded shadow hover:bg-blue-200"
        onClick={() => setTranscript('Listening... (demo)')}
      >
        🎤 Start Listening
      </button>
      <div className="text-xs text-gray-600 mt-1">{transcript}</div>
    </div>
  );
};

export default VoiceInput;
