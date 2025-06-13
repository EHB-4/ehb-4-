import React, { useState } from 'react';

const ScreenWatch = () => {
  const [watching, setWatching] = useState(false);
  return (
    <div className="my-2">
      <h4 className="font-semibold">🖥 Real-Time Screen On</h4>
      <button className={`px-3 py-1 rounded shadow ${watching ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`} onClick={() => setWatching(w => !w)}>
        {watching ? '🟢 Watching' : '▶️ Start Watching'}
      </button>
      <div className="text-xs text-gray-600 mt-1">{watching ? 'Screen sharing is ON.' : 'Screen sharing is OFF.'}</div>
    </div>
  );
};

export default ScreenWatch; 