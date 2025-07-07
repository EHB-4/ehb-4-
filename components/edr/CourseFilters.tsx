'use client';

'use client';

interface CourseFiltersState {
  subject: string;
  city: string;
  mode: string;
  maxFee: string;
}

interface CourseFiltersProps {
  filters: CourseFiltersState;
  onFiltersChange: (filters: CourseFiltersState) => void;
}

export function CourseFilters({ filters, onFiltersChange }: CourseFiltersProps) {
  const handleFilterChange = (key: keyof CourseFiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={filters.subject}
          onChange={e => handleFilterChange('subject', e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          aria-label="Select subject"
        >
          <option value="">All Subjects</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="biology">Biology</option>
          <option value="computer-science">Computer Science</option>
        </select>

        <select
          value={filters.city}
          onChange={e => handleFilterChange('city', e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          aria-label="Select city"
        >
          <option value="">All Cities</option>
          <option value="karachi">Karachi</option>
          <option value="lahore">Lahore</option>
          <option value="islamabad">Islamabad</option>
          <option value="peshawar">Peshawar</option>
          <option value="quetta">Quetta</option>
        </select>

        <select
          value={filters.mode}
          onChange={e => handleFilterChange('mode', e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          aria-label="Select mode"
        >
          <option value="">All Modes</option>
          <option value="online">Online</option>
          <option value="onsite">Onsite</option>
        </select>

        <input
          type="number"
          placeholder="Max Fee (coins)"
          value={filters.maxFee}
          onChange={e => handleFilterChange('maxFee', e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
