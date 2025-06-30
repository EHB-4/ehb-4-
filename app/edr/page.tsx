'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  Users,
  TrendingUp,
  ArrowRight,
  Grid3X3,
  List,
  Filter as FilterIcon,
  X,
  Plus,
  Minus,
  Ambulance,
  Fire,
  Police,
  Heart,
  Activity,
  Award,
  Eye,
  MessageCircle,
  Bell,
  AlertCircle,
  PhoneCall,
  Navigation,
  Car,
  Building,
  User,
  Calendar,
  Clock as ClockIcon,
  Star,
  Zap,
  Target,
  Compass,
} from 'lucide-react';
import Link from 'next/link';

/**
 * EDR Emergency Response System - Comprehensive emergency services platform
 * @returns {JSX.Element} The EDR emergency response system component
 */
export default function EDRPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Mock emergency response data
  const incidents = [
    {
      id: 1,
      title: 'Traffic Accident on Highway 101',
      type: 'traffic',
      service: 'police',
      priority: 'high',
      status: 'active',
      location: 'Highway 101, Exit 15',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      reportedAt: '2024-01-20T14:30:00Z',
      estimatedArrival: '5 minutes',
      description: 'Multi-vehicle collision blocking two lanes',
      casualties: 3,
      severity: 'moderate',
      assignedUnits: ['Police Unit 1', 'Ambulance 2', 'Fire Truck 3'],
      contactPerson: 'Officer Johnson',
      contactPhone: '+1-555-0123',
      verified: true,
      trending: true,
    },
    {
      id: 2,
      title: 'Fire at Downtown Office Building',
      type: 'fire',
      service: 'fire',
      priority: 'critical',
      status: 'active',
      location: '123 Main Street, Downtown',
      coordinates: { lat: 37.7849, lng: -122.4094 },
      reportedAt: '2024-01-20T14:25:00Z',
      estimatedArrival: '3 minutes',
      description: 'Fire on 5th floor, smoke visible from street',
      casualties: 0,
      severity: 'high',
      assignedUnits: ['Fire Engine 1', 'Ladder Truck 2', 'Ambulance 1'],
      contactPerson: 'Captain Smith',
      contactPhone: '+1-555-0124',
      verified: true,
      trending: true,
    },
    {
      id: 3,
      title: 'Medical Emergency - Heart Attack',
      type: 'medical',
      service: 'ambulance',
      priority: 'critical',
      status: 'en-route',
      location: '456 Oak Avenue, Residential Area',
      coordinates: { lat: 37.7649, lng: -122.4294 },
      reportedAt: '2024-01-20T14:20:00Z',
      estimatedArrival: '4 minutes',
      description: 'Patient experiencing chest pain and shortness of breath',
      casualties: 1,
      severity: 'high',
      assignedUnits: ['Ambulance 3', 'Paramedic Unit 1'],
      contactPerson: 'Paramedic Davis',
      contactPhone: '+1-555-0125',
      verified: true,
      trending: false,
    },
    {
      id: 4,
      title: 'Domestic Disturbance Call',
      type: 'domestic',
      service: 'police',
      priority: 'medium',
      status: 'active',
      location: '789 Pine Street, Suburban Area',
      coordinates: { lat: 37.7549, lng: -122.4394 },
      reportedAt: '2024-01-20T14:15:00Z',
      estimatedArrival: '7 minutes',
      description: 'Neighbor reports loud argument and possible violence',
      casualties: 0,
      severity: 'low',
      assignedUnits: ['Police Unit 2'],
      contactPerson: 'Officer Wilson',
      contactPhone: '+1-555-0126',
      verified: false,
      trending: false,
    },
    {
      id: 5,
      title: 'Gas Leak in Apartment Complex',
      type: 'hazmat',
      service: 'fire',
      priority: 'high',
      status: 'investigating',
      location: '321 Elm Street, Apartment Complex',
      coordinates: { lat: 37.7449, lng: -122.4494 },
      reportedAt: '2024-01-20T14:10:00Z',
      estimatedArrival: '6 minutes',
      description: 'Residents report strong gas odor in building',
      casualties: 0,
      severity: 'moderate',
      assignedUnits: ['Hazmat Unit 1', 'Fire Engine 2'],
      contactPerson: 'Lieutenant Brown',
      contactPhone: '+1-555-0127',
      verified: true,
      trending: false,
    },
    {
      id: 6,
      title: 'Missing Person Report',
      type: 'missing',
      service: 'police',
      priority: 'medium',
      status: 'investigating',
      location: 'Central Park Area',
      coordinates: { lat: 37.7349, lng: -122.4594 },
      reportedAt: '2024-01-20T14:05:00Z',
      estimatedArrival: '10 minutes',
      description: 'Elderly person missing from home for 4 hours',
      casualties: 0,
      severity: 'medium',
      assignedUnits: ['Search & Rescue Unit', 'Police Unit 3'],
      contactPerson: 'Detective Garcia',
      contactPhone: '+1-555-0128',
      verified: true,
      trending: false,
    },
  ];

  const services = [
    { id: 'all', name: 'All Services', icon: AlertTriangle, count: incidents.length },
    {
      id: 'police',
      name: 'Police',
      icon: Shield,
      count: incidents.filter(i => i.service === 'police').length,
    },
    {
      id: 'fire',
      name: 'Fire',
      icon: Fire,
      count: incidents.filter(i => i.service === 'fire').length,
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      icon: Ambulance,
      count: incidents.filter(i => i.service === 'ambulance').length,
    },
  ];

  const statuses = [
    { id: 'all', name: 'All Status', count: incidents.length },
    { id: 'active', name: 'Active', count: incidents.filter(i => i.status === 'active').length },
    {
      id: 'en-route',
      name: 'En Route',
      count: incidents.filter(i => i.status === 'en-route').length,
    },
    {
      id: 'investigating',
      name: 'Investigating',
      count: incidents.filter(i => i.status === 'investigating').length,
    },
    {
      id: 'resolved',
      name: 'Resolved',
      count: incidents.filter(i => i.status === 'resolved').length,
    },
  ];

  const stats = [
    { label: 'Active Incidents', value: '12', icon: AlertTriangle },
    { label: 'Response Units', value: '45', icon: Car },
    { label: 'Avg Response Time', value: '4.2 min', icon: Clock },
    { label: 'Success Rate', value: '98.5%', icon: CheckCircle },
  ];

  const filteredIncidents = useMemo(() => {
    let filtered = incidents;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        incident =>
          incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by service
    if (selectedService !== 'all') {
      filtered = filtered.filter(incident => incident.service === selectedService);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(incident => incident.status === selectedStatus);
    }

    // Sort incidents
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
        filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      case 'recent':
        filtered.sort(
          (a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
        );
        break;
      case 'location':
        filtered.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case 'severity':
        const severityOrder = { high: 2, moderate: 1, low: 0 };
        filtered.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
        break;
    }

    return filtered;
  }, [searchTerm, selectedService, selectedStatus, sortBy]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'en-route':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'police':
        return Shield;
      case 'fire':
        return Fire;
      case 'ambulance':
        return Ambulance;
      default:
        return AlertTriangle;
    }
  };

  const reportEmergency = () => {
    setEmergencyMode(true);
    // In a real app, this would open emergency reporting interface
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Emergency Alert Banner */}
      {emergencyMode && (
        <div className="bg-red-600 text-white px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">EMERGENCY MODE ACTIVE</span>
            <button
              onClick={() => setEmergencyMode(false)}
              className="ml-4 px-2 py-1 bg-red-700 rounded hover:bg-red-800"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  EDR Emergency Response
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Emergency dispatch and response coordination system
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={reportEmergency}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Report Emergency
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search incidents, locations, or units..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="priority">Priority</option>
                  <option value="recent">Most Recent</option>
                  <option value="location">Location</option>
                  <option value="severity">Severity</option>
                </select>

                <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-l-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-r-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 rounded-lg border transition-colors ${
                    showFilters
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <FilterIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Services
                  </h4>
                  <div className="space-y-2">
                    {services.map(service => (
                      <label key={service.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={selectedService === service.id}
                          onChange={e => setSelectedService(e.target.value)}
                          className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <service.icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {service.name} ({service.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Status</h4>
                  <div className="space-y-2">
                    {statuses.map(status => (
                      <label key={status.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value={status.id}
                          checked={selectedStatus === status.id}
                          onChange={e => setSelectedStatus(e.target.value)}
                          className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {status.name} ({status.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Verified Incidents Only
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      High Priority Only
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Active Incidents
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className="w-8 h-8 text-red-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Incidents Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Active Incidents ({filteredIncidents.length})
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Emergency Response System</span>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredIncidents.map((incident, index) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all"
                    >
                      {/* Incident Header */}
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {(() => {
                              const Icon = getServiceIcon(incident.service);
                              return <Icon className="w-5 h-5 text-red-600" />;
                            })()}
                            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                              {incident.service}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${getPriorityColor(
                                incident.priority
                              )}`}
                            ></div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                incident.status
                              )}`}
                            >
                              {incident.status}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {incident.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {incident.description}
                        </p>
                      </div>

                      {/* Incident Details */}
                      <div className="p-4">
                        {/* Location and Time */}
                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1">{incident.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>Reported: {formatTime(incident.reportedAt)}</span>
                        </div>

                        {/* ETA and Severity */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Car className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-600 dark:text-gray-400">
                              ETA: {incident.estimatedArrival}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {incident.severity} severity
                          </span>
                        </div>

                        {/* Assigned Units */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Assigned Units
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {incident.assignedUnits.slice(0, 2).map((unit, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-xs"
                              >
                                {unit}
                              </span>
                            ))}
                            {incident.assignedUnits.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                                +{incident.assignedUnits.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex items-center justify-between mb-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Contact: </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {incident.contactPerson}
                            </span>
                          </div>
                          {incident.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            <Phone className="w-4 h-4" />
                            Contact
                          </button>
                          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Navigation className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredIncidents.map((incident, index) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                    >
                      <div className="flex items-center gap-6">
                        {/* Service Icon */}
                        <div className="relative w-16 h-16 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          {(() => {
                            const Icon = getServiceIcon(incident.service);
                            return <Icon className="w-8 h-8 text-red-600" />;
                          })()}
                          <div
                            className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getPriorityColor(
                              incident.priority
                            )}`}
                          ></div>
                        </div>

                        {/* Incident Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {incident.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {incident.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    incident.status
                                  )}`}
                                >
                                  {incident.status}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  ETA: {incident.estimatedArrival}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {formatTime(incident.reportedAt)}
                                </span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                  {incident.severity}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{incident.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{incident.assignedUnits.length} units</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>Contact: {incident.contactPerson}</span>
                                {incident.verified && (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <Navigation className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                <Phone className="w-4 h-4" />
                                Contact
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredIncidents.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No incidents found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    No emergency incidents match your current filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
