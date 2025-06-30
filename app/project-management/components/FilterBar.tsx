import React from 'react';

const FilterBar: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center bg-white rounded-lg shadow px-4 py-3 mb-6 border border-blue-100">
      <label className="text-sm font-medium text-blue-900">
        Department:
        <select className="ml-2 px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>All</option>
          <option>E-Commerce</option>
          <option>Education</option>
          <option>Franchise</option>
          <option>Finance</option>
        </select>
      </label>
      <label className="text-sm font-medium text-blue-900">
        Status:
        <select className="ml-2 px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>All</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Delayed</option>
          <option>Upcoming</option>
        </select>
      </label>
      <label className="text-sm font-medium text-blue-900">
        Owner:
        <select className="ml-2 px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>All</option>
          <option>Rafi</option>
          <option>Sana</option>
          <option>Hamza</option>
        </select>
      </label>
    </div>
  );
};

export default FilterBar;
