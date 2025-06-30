import React from 'react';

const MyCasesTab = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">My Legal Cases</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">Submit New Legal Request</button>
      </div>
      {/* Placeholder for cases list */}
      <div className="bg-white border rounded p-6 text-gray-500 text-center">
        Your legal cases will appear here.
      </div>
    </section>
  );
};

export default MyCasesTab; 