import React, { useState } from 'react';

const ScreenRecord = () => {
  const [recording, setRecording] = useState(false);
  return (
    <div className="my-2">
      <h4 className="font-semibold">🎥 Screen Recording</h4>
      <button className={`px-3 py-1 rounded shadow ${recording ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`} onClick={() => setRecording(r => !r)}>
        {recording ? '⏹ Stop Recording' : '⏺ Start Recording'}
      </button>
      <div className="text-xs text-gray-600 mt-1">{recording ? 'Recording in progress...' : 'Not recording.'}</div>
    </div>
  );
};

export default ScreenRecord; 