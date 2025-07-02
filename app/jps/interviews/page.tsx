"use client";

import React, { useState, useEffect } from 'react';
import { useJPSRole } from '../../../components/JPS/JPSRoleContext';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  VideoCameraIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface Interview {
  id: string;
  title: string;
  candidate: string;
  employer: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'phone' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  location?: string;
  meetingLink?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
}

const InterviewsPage: React.FC = () => {
  const { role } = useJPSRole();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = () => {
    // Mock interview data
    const mockInterviews: Interview[] = [
      {
        id: '1',
        title: 'Senior React Developer',
        candidate: 'Sarah Johnson',
        employer: 'TechCorp Inc.',
        date: '2024-01-20',
        time: '14:00',
        duration: 60,
        type: 'video',
        status: 'scheduled',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        notes: 'Focus on React hooks and state management',
      },
      {
        id: '2',
        title: 'Full Stack Developer',
        candidate: 'Mike Chen',
        employer: 'AI Solutions',
        date: '2024-01-18',
        time: '10:30',
        duration: 45,
        type: 'video',
        status: 'completed',
        meetingLink: 'https://meet.google.com/xyz-uvw-rst',
        feedback: 'Excellent technical skills, strong problem-solving abilities',
        rating: 4.5,
      },
      {
        id: '3',
        title: 'DevOps Engineer',
        candidate: 'Alex Rodriguez',
        employer: 'CloudTech',
        date: '2024-01-22',
        time: '16:00',
        duration: 90,
        type: 'in-person',
        status: 'scheduled',
        location: '123 Tech Street, San Francisco, CA',
        notes: 'On-site interview with technical team',
      },
      {
        id: '4',
        title: 'UI/UX Designer',
        candidate: 'Emily Davis',
        employer: 'Creative Studio',
        date: '2024-01-19',
        time: '11:00',
        duration: 60,
        type: 'phone',
        status: 'cancelled',
        notes: 'Candidate requested reschedule',
      },
      {
        id: '5',
        title: 'Product Manager',
        candidate: 'David Wilson',
        employer: 'StartupXYZ',
        date: '2024-01-25',
        time: '13:30',
        duration: 75,
        type: 'video',
        status: 'scheduled',
        meetingLink: 'https://meet.google.com/pmn-opq-rs',
        notes: 'Case study presentation required',
      },
    ];
    setInterviews(mockInterviews);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <ClockIcon className="h-4 w-4" />;
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'cancelled':
        return <XCircleIcon className="h-4 w-4" />;
      case 'rescheduled':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoCameraIcon className="h-5 w-5" />;
      case 'phone':
        return <PhoneIcon className="h-5 w-5" />;
      case 'in-person':
        return <MapPinIcon className="h-5 w-5" />;
      default:
        return <VideoCameraIcon className="h-5 w-5" />;
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    if (filter === 'all') return true;
    return interview.status === filter;
  });

  const joinInterview = (interview: Interview) => {
    if (interview.meetingLink) {
      window.open(interview.meetingLink, '_blank');
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Interview Management</h1>
              <p className="text-sm text-gray-500">Schedule and manage job interviews</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowScheduleModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            {['all', 'scheduled', 'completed', 'cancelled', 'rescheduled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 text-sm rounded-md ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Role-based Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {role === 'jobseeker' && (
          <div className="mb-4">View and manage your upcoming and past interviews.</div>
        )}
        {role === 'employer' && (
          <div className="mb-4">Schedule and manage interviews with candidates.</div>
        )}
        {role === 'admin' && (
          <div className="mb-4">Oversee all interviews and platform scheduling.</div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Interview List */}
          <div className="space-y-4">
            {filteredInterviews.map(interview => (
              <div
                key={interview.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(interview.type)}
                          <h3 className="text-lg font-semibold text-gray-900">{interview.title}</h3>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}
                        >
                          {getStatusIcon(interview.status)}
                          <span className="ml-1">{interview.status}</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <UserIcon className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {interview.candidate}
                            </p>
                            <p className="text-xs text-gray-600">Candidate</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <UserIcon className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {interview.employer}
                            </p>
                            <p className="text-xs text-gray-600">Employer</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(interview.date).toLocaleDateString()} at {interview.time}
                            </p>
                            <p className="text-xs text-gray-600">{interview.duration} minutes</p>
                          </div>
                        </div>
                      </div>
                      {interview.notes && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{interview.notes}</p>
                        </div>
                      )}
                      {interview.feedback && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-700">{interview.feedback}</p>
                          {interview.rating && (
                            <div className="flex items-center mt-2">
                              <span className="text-sm text-green-600 mr-2">Rating:</span>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <StarIcon
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= (interview.rating || 0)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                                <span className="ml-2 text-sm text-green-600">
                                  {interview.rating}/5
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {interview.meetingLink && interview.status === 'scheduled' && (
                            <button
                              onClick={() => joinInterview(interview)}
                              className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                              <VideoCameraIcon className="h-4 w-4 mr-1" />
                              Join Meeting
                            </button>
                          )}
                          {interview.location && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {interview.location}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedInterview(interview)}
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            View Details
                          </button>
                          {interview.status === 'scheduled' && (
                            <>
                              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                                Reschedule
                              </button>
                              <button className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50">
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Schedule New Interview</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Interview Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Select Candidate</option>
                <option value="sarah">Sarah Johnson</option>
                <option value="mike">Mike Chen</option>
                <option value="alex">Alex Rodriguez</option>
              </select>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Select Employer</option>
                <option value="techcorp">TechCorp Inc.</option>
                <option value="ai-solutions">AI Solutions</option>
                <option value="cloudtech">CloudTech</option>
              </select>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Interview Type</option>
                <option value="video">Video Call</option>
                <option value="phone">Phone Call</option>
                <option value="in-person">In Person</option>
              </select>
              <input
                type="number"
                placeholder="Duration (minutes)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Notes"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewsPage;
