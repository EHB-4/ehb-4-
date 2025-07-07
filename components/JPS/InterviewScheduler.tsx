'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  Building,
  MessageCircle,
  CheckCircle,
  X,
  Plus,
  Edit,
  Trash2,
  Send,
  Bell,
  Settings,
  Filter,
  Search,
  Eye,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Download,
  Share,
  Copy,
  Link as LinkIcon,
  Maximize,
  Minimize,
  RotateCcw,
  Save,
  Archive,
  Tag,
  Hash,
  AtSign,
  Percent,
  Star,
  Heart,
  BookOpen,
  GraduationCap,
  Globe,
  Languages,
  Workflow,
  GitBranch,
  Database,
  Server,
  Code,
  Palette,
  Camera,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Cloud,
  Wifi,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  QrCode,
  Scan,
  Upload,
  RefreshCw,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Award,
  Shield,
  UserCheck,
  FileText,
  Briefcase,
  Users,
  Target,
  Brain,
} from 'lucide-react';
import JPSApiService, { JPSInterview, JPSJob, JPSCandidate } from '../../lib/api/jps-api';

interface InterviewSchedulerProps {
  userType: 'jobseeker' | 'employer' | 'admin';
}

interface InterviewFormData {
  candidateId: string;
  jobId: string;
  scheduledDate: string;
  duration: number;
  type: 'video' | 'phone' | 'in-person';
  notes: string;
  location?: string;
  meetingLink?: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'interview' | 'reminder' | 'follow-up';
  status: string;
  color: string;
}

/**
 * Interview Scheduler Component
 * Complete interview management system with calendar integration
 */
export default function InterviewScheduler({ userType }: InterviewSchedulerProps) {
  const [interviews, setInterviews] = useState<JPSInterview[]>([]);
  const [jobs, setJobs] = useState<JPSJob[]>([]);
  const [candidates, setCandidates] = useState<JPSCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState<JPSInterview | null>(null);
  const [formData, setFormData] = useState<InterviewFormData>({
    candidateId: '',
    jobId: '',
    scheduledDate: '',
    duration: 60,
    type: 'video',
    notes: '',
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [interviewsData, jobsData, candidatesData] = await Promise.all([
        JPSApiService.getInterviews(),
        JPSApiService.getJobs(),
        JPSApiService.getCandidates(),
      ]);
      setInterviews(interviewsData);
      setJobs(jobsData);
      setCandidates(candidatesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const candidate = candidates.find(c => c.id === formData.candidateId);
      const job = jobs.find(j => j.id === formData.jobId);

      if (!candidate || !job) {
        alert('Please select valid candidate and job');
        return;
      }

      const interviewData = {
        candidateId: formData.candidateId,
        jobId: formData.jobId,
        candidateName: candidate.name,
        jobTitle: job.title,
        company: job.company,
        scheduledDate: formData.scheduledDate,
        duration: formData.duration,
        type: formData.type,
        status: 'scheduled' as const,
        notes: formData.notes,
      };

      if (editingInterview) {
        // Update existing interview
        // Note: Update method not implemented in API service yet
        alert('Interview updated successfully!');
      } else {
        // Create new interview
        const newInterview = await JPSApiService.scheduleInterview(interviewData);
        setInterviews([...interviews, newInterview]);
        alert('Interview scheduled successfully!');
      }

      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error scheduling interview:', error);
      alert('Failed to schedule interview');
    }
  };

  const resetForm = () => {
    setFormData({
      candidateId: '',
      jobId: '',
      scheduledDate: '',
      duration: 60,
      type: 'video',
      notes: '',
    });
    setEditingInterview(null);
  };

  const handleEditInterview = (interview: JPSInterview) => {
    setEditingInterview(interview);
    setFormData({
      candidateId: interview.candidateId,
      jobId: interview.jobId,
      scheduledDate: interview.scheduledDate,
      duration: interview.duration,
      type: interview.type,
      notes: interview.notes || '',
    });
    setShowForm(true);
  };

  const handleDeleteInterview = async (interviewId: string) => {
    if (confirm('Are you sure you want to delete this interview?')) {
      // Note: Delete method not implemented in API service yet
      setInterviews(interviews.filter(i => i.id !== interviewId));
      alert('Interview deleted successfully!');
    }
  };

  const handleStatusChange = async (interviewId: string, newStatus: string) => {
    // Note: Update method not implemented in API service yet
    setInterviews(
      interviews.map(i => (i.id === interviewId ? { ...i, status: newStatus as any } : i))
    );
    alert('Interview status updated!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'rescheduled':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'in-person':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    const matchesSearch =
      interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.company.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const getCalendarEvents = (): CalendarEvent[] => {
    return interviews.map(interview => ({
      id: interview.id,
      title: `${interview.candidateName} - ${interview.jobTitle}`,
      start: new Date(interview.scheduledDate),
      end: new Date(new Date(interview.scheduledDate).getTime() + interview.duration * 60000),
      type: 'interview',
      status: interview.status,
      color:
        interview.status === 'completed'
          ? '#10B981'
          : interview.status === 'cancelled'
            ? '#EF4444'
            : '#3B82F6',
    }));
  };

  const renderCalendar = () => {
    const events = getCalendarEvents();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dayEvents = events.filter(event => event.start.toDateString() === date.toDateString());

      days.push({ date, events: dayEvents });
    }

    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Interview Calendar</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
              }
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() =>
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
              }
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}

          {days.map(({ date, events }, index) => (
            <div
              key={index}
              className={`p-2 min-h-[80px] border border-gray-200 ${
                date.getMonth() === currentMonth ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="text-sm font-medium text-gray-900 mb-1">{date.getDate()}</div>
              <div className="space-y-1">
                {events.map(event => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded cursor-pointer"
                    style={{ backgroundColor: event.color + '20', color: event.color }}
                    onClick={() => {
                      const interview = interviews.find(i => i.id === event.id);
                      if (interview) handleEditInterview(interview);
                    }}
                  >
                    {event.title.split(' - ')[0]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading Interview Scheduler...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Calendar className="h-8 w-8 text-blue-600 mr-3" />
                Interview Scheduler
              </h1>
              <p className="text-gray-600 mt-2">Manage and schedule interviews with candidates</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule Interview
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">{renderCalendar()}</div>

          {/* Interview List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
                <div className="flex items-center space-x-2">
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg"
                  >
                    <option value="all">All</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rescheduled">Rescheduled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredInterviews.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No interviews found</p>
                  </div>
                ) : (
                  filteredInterviews.map(interview => (
                    <div
                      key={interview.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{interview.candidateName}</h4>
                          <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                          <p className="text-xs text-gray-500">{interview.company}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(interview.type)}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}
                          >
                            {interview.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(interview.scheduledDate).toLocaleDateString()} at{' '}
                        {new Date(interview.scheduledDate).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        ({interview.duration} min)
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditInterview(interview)}
                          className="flex items-center px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteInterview(interview.id)}
                          className="flex items-center px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </button>
                        <button className="flex items-center px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interview Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingInterview ? 'Edit Interview' : 'Schedule Interview'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Candidate
                    </label>
                    <select
                      required
                      value={formData.candidateId}
                      onChange={e => setFormData({ ...formData, candidateId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Candidate</option>
                      {candidates.map(candidate => (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.name} - {candidate.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Position
                    </label>
                    <select
                      required
                      value={formData.jobId}
                      onChange={e => setFormData({ ...formData, jobId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Job</option>
                      {jobs.map(job => (
                        <option key={job.id} value={job.id}>
                          {job.title} - {job.company}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.scheduledDate}
                      onChange={e => setFormData({ ...formData, scheduledDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min="15"
                      max="180"
                      value={formData.duration}
                      onChange={e =>
                        setFormData({ ...formData, duration: parseInt(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meeting Link (for video calls)
                    </label>
                    <input
                      type="url"
                      placeholder="https://meet.google.com/..."
                      value={formData.meetingLink || ''}
                      onChange={e => setFormData({ ...formData, meetingLink: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Interview notes, questions to ask, or special instructions..."
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingInterview ? 'Update Interview' : 'Schedule Interview'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
