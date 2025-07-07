'use client';

'use client';

import React, { useState, useEffect } from 'react';
import {
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  StarIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  PencilIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface CandidateProfilesProps {
  userType: 'jobseeker' | 'employer' | 'admin';
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  title: string;
  experience: number;
  skills: string[];
  education: Education[];
  workHistory: WorkHistory[];
  certifications: Certification[];
  matchScore?: number;
  status: 'active' | 'inactive' | 'verified';
  lastActive: string;
  salary: string;
  availability: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

interface WorkHistory {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
}

const CandidateProfiles: React.FC<CandidateProfilesProps> = ({ userType }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    loadCandidates();
  }, [userType]);

  const loadCandidates = () => {
    // Mock candidate data
    const mockCandidates: Candidate[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        avatar: '/api/placeholder/150/150',
        title: 'Senior Frontend Developer',
        experience: 5,
        skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
        education: [
          {
            id: '1',
            degree: 'Bachelor of Computer Science',
            institution: 'Stanford University',
            year: '2018',
            gpa: '3.8',
          },
        ],
        workHistory: [
          {
            id: '1',
            title: 'Senior Frontend Developer',
            company: 'TechCorp Inc.',
            duration: '2020 - Present',
            description: 'Led frontend development for multiple web applications...',
          },
          {
            id: '2',
            title: 'Frontend Developer',
            company: 'StartupXYZ',
            duration: '2018 - 2020',
            description: 'Developed responsive web applications using React...',
          },
        ],
        certifications: [
          {
            id: '1',
            name: 'AWS Certified Developer',
            issuer: 'Amazon Web Services',
            date: '2022',
            expiry: '2025',
          },
        ],
        matchScore: 95,
        status: 'verified',
        lastActive: '2 hours ago',
        salary: '$120,000 - $150,000',
        availability: 'Available immediately',
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        phone: '+1 (555) 987-6543',
        location: 'New York, NY',
        avatar: '/api/placeholder/150/150',
        title: 'Full Stack Developer',
        experience: 3,
        skills: ['JavaScript', 'Python', 'Django', 'PostgreSQL', 'Docker'],
        education: [
          {
            id: '1',
            degree: 'Master of Software Engineering',
            institution: 'MIT',
            year: '2020',
            gpa: '3.9',
          },
        ],
        workHistory: [
          {
            id: '1',
            title: 'Full Stack Developer',
            company: 'AI Solutions',
            duration: '2021 - Present',
            description: 'Built scalable web applications using modern technologies...',
          },
        ],
        certifications: [
          {
            id: '1',
            name: 'Google Cloud Professional Developer',
            issuer: 'Google',
            date: '2023',
            expiry: '2026',
          },
        ],
        matchScore: 87,
        status: 'active',
        lastActive: '1 day ago',
        salary: '$90,000 - $110,000',
        availability: 'Available in 2 weeks',
      },
      {
        id: '3',
        name: 'Alex Rodriguez',
        email: 'alex.rodriguez@email.com',
        phone: '+1 (555) 456-7890',
        location: 'Austin, TX',
        avatar: '/api/placeholder/150/150',
        title: 'DevOps Engineer',
        experience: 4,
        skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins'],
        education: [
          {
            id: '1',
            degree: 'Bachelor of Information Technology',
            institution: 'University of Texas',
            year: '2019',
            gpa: '3.7',
          },
        ],
        workHistory: [
          {
            id: '1',
            title: 'DevOps Engineer',
            company: 'CloudTech',
            duration: '2020 - Present',
            description: 'Managed cloud infrastructure and CI/CD pipelines...',
          },
        ],
        certifications: [
          {
            id: '1',
            name: 'Kubernetes Administrator',
            issuer: 'CNCF',
            date: '2022',
            expiry: '2025',
          },
        ],
        matchScore: 82,
        status: 'active',
        lastActive: '3 days ago',
        salary: '$100,000 - $130,000',
        availability: 'Available immediately',
      },
    ];

    setCandidates(mockCandidates);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'active':
        return <ClockIcon className="h-4 w-4" />;
      case 'inactive':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSkills =
      selectedSkills.length === 0 || selectedSkills.some(skill => candidate.skills.includes(skill));

    return matchesSearch && matchesSkills;
  });

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
          <h2 className="text-2xl font-bold text-gray-900">Candidate Profiles</h2>
          <p className="text-gray-600">
            {userType === 'jobseeker'
              ? 'Manage your professional profile'
              : 'Browse and evaluate candidates'}
          </p>
        </div>

        {userType === 'jobseeker' && (
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <UserIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Skills Filter */}
          <select
            value={selectedSkills[0] || ''}
            onChange={e => setSelectedSkills(e.target.value ? [e.target.value] : [])}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Filter by skills"
          >
            <option value="">All Skills</option>
            <option value="React">React</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="AWS">AWS</option>
            <option value="Docker">Docker</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSkills([]);
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map(candidate => (
          <div
            key={candidate.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{candidate.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}
                    >
                      {getStatusIcon(candidate.status)}
                      <span className="ml-1">{candidate.status}</span>
                    </span>
                    {candidate.matchScore && (
                      <span className="flex items-center text-sm text-green-600">
                        <StarIcon className="h-4 w-4 mr-1" />
                        {candidate.matchScore}% match
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {candidate.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  {candidate.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BriefcaseIcon className="h-4 w-4 mr-2" />
                  {candidate.experience} years experience
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{candidate.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Availability</h4>
                <p className="text-sm text-gray-600">{candidate.availability}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Last active: {candidate.lastActive}</span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedCandidate(candidate)}
                    className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View Profile
                  </button>

                  {userType === 'employer' && (
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Contact
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{selectedCandidate.name}</h3>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Info */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                      <UserIcon className="h-12 w-12 text-gray-600" />
                    </div>
                    <h4 className="text-lg font-semibold">{selectedCandidate.name}</h4>
                    <p className="text-gray-600">{selectedCandidate.title}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedCandidate.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedCandidate.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedCandidate.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <BriefcaseIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedCandidate.experience} years experience
                    </div>
                    <div className="flex items-center text-sm">
                      <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedCandidate.salary}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Skills */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work History */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Work History</h4>
                  <div className="space-y-4">
                    {selectedCandidate.workHistory.map(work => (
                      <div key={work.id} className="border-l-4 border-blue-500 pl-4">
                        <h5 className="font-medium">{work.title}</h5>
                        <p className="text-sm text-gray-600">{work.company}</p>
                        <p className="text-sm text-gray-500">{work.duration}</p>
                        <p className="text-sm text-gray-700 mt-1">{work.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Education</h4>
                  <div className="space-y-3">
                    {selectedCandidate.education.map(edu => (
                      <div key={edu.id} className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{edu.degree}</h5>
                          <p className="text-sm text-gray-600">{edu.institution}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{edu.year}</p>
                          {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {selectedCandidate.certifications.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Certifications</h4>
                    <div className="space-y-3">
                      {selectedCandidate.certifications.map(cert => (
                        <div key={cert.id} className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">{cert.name}</h5>
                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">{cert.date}</p>
                            {cert.expiry && (
                              <p className="text-sm text-gray-500">Expires: {cert.expiry}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              {userType === 'employer' && (
                <>
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                    Download Resume
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Schedule Interview
                  </button>
                </>
              )}
              {userType === 'jobseeker' && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateProfiles;
