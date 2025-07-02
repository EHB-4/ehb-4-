"use client";

'use client';

import React, { useState, useEffect } from 'react';
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  CurrencyDollarIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  EyeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

interface JobListingsProps {
  userType: 'jobseeker' | 'employer' | 'admin';
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  experience: string;
  skills: string[];
  description: string;
  postedDate: string;
  applications: number;
  matchScore?: number;
  isSaved?: boolean;
  status: 'active' | 'closed' | 'draft';
}

const JobListings: React.FC<JobListingsProps> = ({ userType }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    loadJobs();
  }, [userType]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, selectedType, selectedExperience]);

  const loadJobs = () => {
    // Mock job data
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Senior React Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        salary: '$120,000 - $150,000',
        type: 'full-time',
        experience: '5+ years',
        skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
        description: 'We are looking for a senior React developer to join our team...',
        postedDate: '2 days ago',
        applications: 45,
        matchScore: 95,
        isSaved: false,
        status: 'active'
      },
      {
        id: '2',
        title: 'Frontend Developer',
        company: 'AI Solutions',
        location: 'Remote',
        salary: '$80,000 - $100,000',
        type: 'full-time',
        experience: '3+ years',
        skills: ['JavaScript', 'React', 'Vue.js', 'CSS'],
        description: 'Join our frontend team to build amazing user experiences...',
        postedDate: '1 week ago',
        applications: 32,
        matchScore: 87,
        isSaved: true,
        status: 'active'
      },
      {
        id: '3',
        title: 'UI/UX Designer',
        company: 'Creative Studio',
        location: 'New York, NY',
        salary: '$90,000 - $110,000',
        type: 'full-time',
        experience: '4+ years',
        skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
        description: 'Create beautiful and functional designs for our products...',
        postedDate: '3 days ago',
        applications: 28,
        matchScore: 78,
        isSaved: false,
        status: 'active'
      },
      {
        id: '4',
        title: 'DevOps Engineer',
        company: 'CloudTech',
        location: 'Austin, TX',
        salary: '$100,000 - $130,000',
        type: 'full-time',
        experience: '5+ years',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        description: 'Help us build and maintain our cloud infrastructure...',
        postedDate: '5 days ago',
        applications: 19,
        matchScore: 82,
        isSaved: false,
        status: 'active'
      }
    ];

    setJobs(mockJobs);
    setLoading(false);
  };

  const filterJobs = () => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    // Experience filter
    if (selectedExperience !== 'all') {
      filtered = filtered.filter(job => job.experience === selectedExperience);
    }

    setFilteredJobs(filtered);
  };

  const toggleSaveJob = (jobId: string) => {
    setJobs(jobs.map(job =>
      job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
    ));
  };

  const applyToJob = (job: Job) => {
    // Simulate job application
    alert(`Application submitted for ${job.title} at ${job.company}`);
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'freelance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Listings</h2>
          <p className="text-gray-600">
            {userType === 'jobseeker' ? 'Find your next opportunity' : 'Manage your job postings'}
          </p>
        </div>
        
        {userType === 'employer' && (
          <button
            onClick={() => setShowPostJobModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Post New Job
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Job Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>

          {/* Experience Filter */}
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Experience</option>
            <option value="1+ years">1+ years</option>
            <option value="3+ years">3+ years</option>
            <option value="5+ years">5+ years</option>
            <option value="10+ years">10+ years</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
              setSelectedExperience('all');
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    {job.matchScore && (
                      <span className="flex items-center text-sm text-green-600">
                        <StarIcon className="h-4 w-4 mr-1" />
                        {job.matchScore}% match
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {job.postedDate}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getJobTypeColor(job.type)}`}>
                      {job.type.replace('-', ' ')}
                    </span>
                    <span className="text-sm text-gray-600">{job.experience}</span>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{job.skills.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {job.applications} applications
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      {userType === 'jobseeker' && (
                        <>
                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className={`p-2 rounded-md ${
                              job.isSaved 
                                ? 'text-red-500 hover:text-red-600' 
                                : 'text-gray-400 hover:text-gray-500'
                            }`}
                          >
                            <HeartIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => applyToJob(job)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                          >
                            Apply Now
                          </button>
                        </>
                      )}
                      
                      {userType === 'employer' && (
                        <>
                          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                            View Applications
                          </button>
                          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Job Modal (for employers) */}
      {showPostJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Post New Job</h3>
            {/* Add job posting form here */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Job Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Salary Range"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Job Description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPostJobModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListings; 