'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Target,
  Users,
  Briefcase,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Filter,
  Search,
  Eye,
  MessageCircle,
  Calendar,
  MapPin,
  DollarSign,
  Award,
  Shield,
  UserCheck,
  FileText,
  Video,
  Phone,
  Mail,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  Settings,
  BarChart3,
  PieChart,
  Activity,
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
} from 'lucide-react';
import api/jps-api from '@/lib/api/jps-api';

interface AIMatchingProps {
  userType: 'jobseeker' | 'employer' | 'admin';
}

interface MatchResult {
  id: string;
  type: 'job' | 'candidate';
  data: JPSJob | JPSCandidate;
  matchScore: number;
  reasons: string[];
  compatibility: {
    skills: number;
    experience: number;
    location: number;
    salary: number;
    sqlLevel: number;
  };
}

interface MatchingFilters {
  minSalary?: number;
  maxSalary?: number;
  location?: string;
  experience?: string;
  sqlLevel?: number;
  skills?: string[];
  jobType?: string;
}

/**
 * AI-Powered Job Matching System
 * Advanced matching algorithm with real-time suggestions
 */
export default function AIMatching({ userType }: AIMatchingProps) {
  const [jobs, setJobs] = useState<JPSJob[]>([]);
  const [candidates, setCandidates] = useState<JPSCandidate[]>([]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JPSJob | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<JPSCandidate | null>(null);
  const [filters, setFilters] = useState<MatchingFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [matchMode, setMatchMode] = useState<'job-to-candidate' | 'candidate-to-job'>(
    'job-to-candidate'
  );
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [matchingInProgress, setMatchingInProgress] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedJob || selectedCandidate) {
      performMatching();
    }
  }, [selectedJob, selectedCandidate, filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [jobsData, candidatesData] = await Promise.all([
        JPSApiService.getJobs(),
        JPSApiService.getCandidates(),
      ]);
      setJobs(jobsData);
      setCandidates(candidatesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const performMatching = async () => {
    if (!selectedJob && !selectedCandidate) return;

    setMatchingInProgress(true);

    try {
      let matchResults: MatchResult[] = [];

      if (matchMode === 'job-to-candidate' && selectedJob) {
        const candidates = await JPSApiService.getJobMatches(selectedJob.id);
        matchResults = candidates.map(candidate => ({
          id: candidate.id,
          type: 'candidate' as const,
          data: candidate,
          matchScore: candidate.matchScore || 0,
          reasons: generateMatchReasons(selectedJob, candidate),
          compatibility: calculateCompatibility(selectedJob, candidate),
        }));
      } else if (matchMode === 'candidate-to-job' && selectedCandidate) {
        const jobs = await JPSApiService.getCandidateMatches(selectedCandidate.id);
        matchResults = jobs.map(job => ({
          id: job.id,
          type: 'job' as const,
          data: job,
          matchScore: job.matchScore || 0,
          reasons: generateMatchReasons(job, selectedCandidate),
          compatibility: calculateCompatibility(job, selectedCandidate),
        }));
      }

      // Apply filters
      matchResults = applyFilters(matchResults);

      // Sort by match score
      matchResults.sort((a, b) => b.matchScore - a.matchScore);

      setMatches(matchResults);
    } catch (error) {
      console.error('Error performing matching:', error);
    } finally {
      setMatchingInProgress(false);
    }
  };

  const generateMatchReasons = (job: JPSJob, candidate: JPSCandidate): string[] => {
    const reasons: string[] = [];

    // Skills match
    const skillMatches = candidate.skills.filter(skill => job.skills.includes(skill));
    if (skillMatches.length > 0) {
      reasons.push(`${skillMatches.length} matching skills: ${skillMatches.join(', ')}`);
    }

    // SQL Level match
    if (candidate.sqlLevel >= (job.sqlLevelRequired || 0)) {
      reasons.push(
        `SQL Level ${candidate.sqlLevel} meets requirement (${job.sqlLevelRequired || 0})`
      );
    }

    // Experience match
    const candidateExp = candidate.experience;
    const jobExp = parseInt(job.experience.match(/\d+/)?.[0] || '0');
    if (candidateExp >= jobExp) {
      reasons.push(`Experience level matches (${candidateExp} years)`);
    }

    // Location match
    if (candidate.location.includes(job.location.split(',')[0])) {
      reasons.push('Location compatibility');
    }

    return reasons;
  };

  const calculateCompatibility = (job: JPSJob, candidate: JPSCandidate) => {
    // Skills compatibility (0-100)
    const skillMatches = candidate.skills.filter(skill => job.skills.includes(skill));
    const skillsScore = Math.round((skillMatches.length / job.skills.length) * 100);

    // Experience compatibility
    const candidateExp = candidate.experience;
    const jobExp = parseInt(job.experience.match(/\d+/)?.[0] || '0');
    const experienceScore =
      candidateExp >= jobExp ? 100 : Math.round((candidateExp / jobExp) * 100);

    // Location compatibility
    const locationScore = candidate.location.includes(job.location.split(',')[0]) ? 100 : 50;

    // Salary compatibility (candidate's expected vs job salary)
    const salaryScore = 80; // Mock score

    // SQL Level compatibility
    const sqlLevelScore = candidate.sqlLevel >= (job.sqlLevelRequired || 0) ? 100 : 0;

    return {
      skills: skillsScore,
      experience: experienceScore,
      location: locationScore,
      salary: salaryScore,
      sqlLevel: sqlLevelScore,
    };
  };

  const applyFilters = (results: MatchResult[]): MatchResult[] => {
    return results.filter(result => {
      if (filters.minSalary && result.type === 'job') {
        const job = result.data as JPSJob;
        if (job.salary.max < filters.minSalary) return false;
      }

      if (filters.maxSalary && result.type === 'job') {
        const job = result.data as JPSJob;
        if (job.salary.min > filters.maxSalary) return false;
      }

      if (filters.location) {
        const location =
          result.type === 'job'
            ? (result.data as JPSJob).location
            : (result.data as JPSCandidate).location;
        if (!location.toLowerCase().includes(filters.location!.toLowerCase())) return false;
      }

      if (filters.sqlLevel) {
        const sqlLevel =
          result.type === 'job'
            ? (result.data as JPSJob).sqlLevelRequired || 0
            : (result.data as JPSCandidate).sqlLevel;
        if (sqlLevel < filters.sqlLevel) return false;
      }

      return true;
    });
  };

  const handleScheduleInterview = async (candidateId: string, jobId: string) => {
    try {
      const candidate = candidates.find(c => c.id === candidateId);
      const job = jobs.find(j => j.id === jobId);

      if (!candidate || !job) return;

      const interview = await JPSApiService.scheduleInterview({
        candidateId,
        jobId,
        candidateName: candidate.name,
        jobTitle: job.title,
        company: job.company,
        scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        duration: 60,
        type: 'video',
        status: 'scheduled',
        notes: 'AI-suggested interview based on high match score',
      });

      // Show success message
      alert('Interview scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling interview:', error);
      alert('Failed to schedule interview');
    }
  };

  const handleCreatePlacement = async (candidateId: string, jobId: string) => {
    try {
      const candidate = candidates.find(c => c.id === candidateId);
      const job = jobs.find(j => j.id === jobId);

      if (!candidate || !job) return;

      const placement = await JPSApiService.createPlacement({
        candidateId,
        jobId,
        candidateName: candidate.name,
        jobTitle: job.title,
        company: job.company,
        salary: job.salary.max,
        status: 'active',
        successRate: 90,
        feedback: 'AI-recommended placement based on high compatibility',
      });

      // Show success message
      alert('Placement created successfully!');
    } catch (error) {
      console.error('Error creating placement:', error);
      alert('Failed to create placement');
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading AI Matching System...</p>
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
                <Brain className="h-8 w-8 text-blue-600 mr-3" />
                AI-Powered Job Matching
              </h1>
              <p className="text-gray-600 mt-2">
                Advanced matching algorithm with real-time compatibility analysis
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadData}
                disabled={matchingInProgress}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${matchingInProgress ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Settings className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Selection Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Selection</h2>

              {/* Mode Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matching Mode
                </label>
                <div className="flex rounded-lg border border-gray-300">
                  <button
                    onClick={() => setMatchMode('job-to-candidate')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-lg ${
                      matchMode === 'job-to-candidate'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Job → Candidates
                  </button>
                  <button
                    onClick={() => setMatchMode('candidate-to-job')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-lg ${
                      matchMode === 'candidate-to-job'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Candidate → Jobs
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs or candidates..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Selection List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {matchMode === 'job-to-candidate'
                  ? jobs
                      .filter(
                        job =>
                          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(job => (
                        <div
                          key={job.id}
                          onClick={() => setSelectedJob(job)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedJob?.id === job.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h3 className="font-medium text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </div>
                        </div>
                      ))
                  : candidates
                      .filter(
                        candidate =>
                          candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.title.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(candidate => (
                        <div
                          key={candidate.id}
                          onClick={() => setSelectedCandidate(candidate)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedCandidate?.id === candidate.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                          <p className="text-sm text-gray-600">{candidate.title}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {candidate.location}
                          </div>
                        </div>
                      ))}
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Filters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range (PKR)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minSalary || ''}
                        onChange={e =>
                          setFilters({ ...filters, minSalary: Number(e.target.value) || undefined })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxSalary || ''}
                        onChange={e =>
                          setFilters({ ...filters, maxSalary: Number(e.target.value) || undefined })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      value={filters.location || ''}
                      onChange={e => setFilters({ ...filters, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SQL Level
                    </label>
                    <select
                      value={filters.sqlLevel || ''}
                      onChange={e =>
                        setFilters({ ...filters, sqlLevel: Number(e.target.value) || undefined })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Any Level</option>
                      <option value="0">Level 0 - Free</option>
                      <option value="1">Level 1 - Basic</option>
                      <option value="2">Level 2 - Normal</option>
                      <option value="3">Level 3 - High</option>
                      <option value="4">Level 4 - VIP</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">AI Matching Results</h2>
                {matchingInProgress && (
                  <div className="flex items-center text-blue-600">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </div>
                )}
              </div>

              {!selectedJob && !selectedCandidate ? (
                <div className="text-center py-12">
                  <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a {matchMode === 'job-to-candidate' ? 'Job' : 'Candidate'}
                  </h3>
                  <p className="text-gray-600">
                    Choose a {matchMode === 'job-to-candidate' ? 'job' : 'candidate'} from the left
                    panel to see AI-powered matches
                  </p>
                </div>
              ) : matches.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Matches Found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or selecting a different{' '}
                    {matchMode === 'job-to-candidate' ? 'job' : 'candidate'}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {matches.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {match.type === 'job'
                                ? (match.data as JPSJob).title
                                : (match.data as JPSCandidate).name}
                            </h3>
                            <span
                              className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(match.matchScore)}`}
                            >
                              {match.matchScore}% Match
                            </span>
                          </div>

                          <p className="text-gray-600 mb-3">
                            {match.type === 'job'
                              ? `${(match.data as JPSJob).company} • ${(match.data as JPSJob).location}`
                              : `${(match.data as JPSCandidate).title} • ${(match.data as JPSCandidate).location}`}
                          </p>

                          {/* Compatibility Breakdown */}
                          <div className="grid grid-cols-5 gap-4 mb-4">
                            <div className="text-center">
                              <div
                                className={`text-lg font-semibold ${getCompatibilityColor(match.compatibility.skills)}`}
                              >
                                {match.compatibility.skills}%
                              </div>
                              <div className="text-xs text-gray-500">Skills</div>
                            </div>
                            <div className="text-center">
                              <div
                                className={`text-lg font-semibold ${getCompatibilityColor(match.compatibility.experience)}`}
                              >
                                {match.compatibility.experience}%
                              </div>
                              <div className="text-xs text-gray-500">Experience</div>
                            </div>
                            <div className="text-center">
                              <div
                                className={`text-lg font-semibold ${getCompatibilityColor(match.compatibility.location)}`}
                              >
                                {match.compatibility.location}%
                              </div>
                              <div className="text-xs text-gray-500">Location</div>
                            </div>
                            <div className="text-center">
                              <div
                                className={`text-lg font-semibold ${getCompatibilityColor(match.compatibility.salary)}`}
                              >
                                {match.compatibility.salary}%
                              </div>
                              <div className="text-xs text-gray-500">Salary</div>
                            </div>
                            <div className="text-center">
                              <div
                                className={`text-lg font-semibold ${getCompatibilityColor(match.compatibility.sqlLevel)}`}
                              >
                                {match.compatibility.sqlLevel}%
                              </div>
                              <div className="text-xs text-gray-500">SQL Level</div>
                            </div>
                          </div>

                          {/* Match Reasons */}
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Why this match?
                            </h4>
                            <div className="space-y-1">
                              {match.reasons.map((reason, idx) => (
                                <div key={idx} className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                  {reason}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                          <button
                            onClick={() => {
                              if (match.type === 'candidate' && selectedJob) {
                                handleScheduleInterview(match.id, selectedJob.id);
                              }
                            }}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Interview
                          </button>

                          <button
                            onClick={() => {
                              if (match.type === 'candidate' && selectedJob) {
                                handleCreatePlacement(match.id, selectedJob.id);
                              }
                            }}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Award className="h-4 w-4 mr-2" />
                            Create Placement
                          </button>

                          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
