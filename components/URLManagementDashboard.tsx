'use client';

import React, { useState, useEffect } from 'react';
import { urlManager, type PageInfo } from '../lib/utils/urlManager';
import { autoBrowser, type DevelopmentAgent } from '../lib/utils/autoBrowser';

interface URLManagementDashboardProps {
  className?: string;
}

export default function URLManagementDashboard({ className = '' }: URLManagementDashboardProps) {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [agents, setAgents] = useState<DevelopmentAgent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [activeSessions, setActiveSessions] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    setPages(urlManager.getAllPages());
    setAgents(autoBrowser.getAllAgents());
    setSystemStatus(autoBrowser.getSystemStatus());
    setActiveSessions(autoBrowser.getActiveSessions());
  };

  const filteredPages = pages.filter(page => {
    const categoryMatch = selectedCategory === 'all' || page.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || page.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const categories = Array.from(new Set(pages.map(page => page.category))).sort();
  const statuses = Array.from(new Set(pages.map(page => page.status))).sort();

  const handleOpenPage = async (pageId: string) => {
    const success = await autoBrowser.openPage(pageId, selectedAgent || undefined);
    if (success) {
      loadData(); // Refresh data
    }
  };

  const handleOpenMultiplePages = async (pageIds: string[]) => {
    const openedPages = await autoBrowser.openMultiplePages(pageIds, selectedAgent || undefined);
    console.log(`Opened ${openedPages.length} pages`);
    loadData();
  };

  const handleReleaseAgent = (pageId: string) => {
    autoBrowser.releaseAgentFromPage(pageId);
    loadData();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'development':
        return 'text-yellow-600 bg-yellow-100';
      case 'planned':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 90) return 'bg-green-500';
    if (completion >= 70) return 'bg-yellow-500';
    if (completion >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'busy':
        return 'text-yellow-600 bg-yellow-100';
      case 'offline':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Management Dashboard</h1>
        <p className="text-gray-600">Manage all project pages and auto-assign development agents</p>
      </div>

      {/* System Status */}
      {systemStatus && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900">Total Agents</h3>
            <p className="text-2xl font-bold text-blue-600">{systemStatus.totalAgents}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900">Available Agents</h3>
            <p className="text-2xl font-bold text-green-600">{systemStatus.availableAgents}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900">Active Sessions</h3>
            <p className="text-2xl font-bold text-purple-600">{systemStatus.activeSessions}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-orange-900">Total Pages</h3>
            <p className="text-2xl font-bold text-orange-600">{pages.length}</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Agent Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Development Agent</label>
          <select
            value={selectedAgent}
            onChange={e => setSelectedAgent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Auto Assign</option>
            {agents.map(agent => (
              <option key={agent.id} value={agent.id}>
                {agent.name} ({agent.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() =>
            handleOpenMultiplePages(pages.filter(p => p.status === 'active').map(p => p.id))
          }
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          🚀 Open All Active Pages
        </button>
        <button
          onClick={() =>
            handleOpenMultiplePages(pages.filter(p => p.status === 'development').map(p => p.id))
          }
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          🔧 Open Development Pages
        </button>
        <button
          onClick={() => autoBrowser.closeAllSessions()}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          🔒 Close All Sessions
        </button>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPages.map(page => {
          const agent = page.developmentAgent ? autoBrowser.getAgent(page.developmentAgent) : null;
          const isActive = activeSessions.has(page.id);

          return (
            <div
              key={page.id}
              className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                isActive ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              {/* Page Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{page.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{page.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}
                  >
                    {page.status}
                  </span>
                  {isActive && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                      🔗 Active
                    </span>
                  )}
                </div>
              </div>

              {/* Page Details */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{page.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Priority:</span>
                  <span
                    className={`font-medium ${
                      page.priority === 'high'
                        ? 'text-red-600'
                        : page.priority === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                    }`}
                  >
                    {page.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Completion:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getCompletionColor(page.completion)}`}
                        style={{ width: `${page.completion}%` }}
                      />
                    </div>
                    <span className="font-medium">{page.completion}%</span>
                  </div>
                </div>
              </div>

              {/* URL */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">URL:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                    {page.url}
                  </code>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {page.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Agent Assignment */}
              {agent && (
                <div className="mb-3 p-2 bg-blue-50 rounded">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Assigned Agent:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getAgentStatusColor(agent.status)}`}
                    >
                      {agent.name}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenPage(page.id)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  🔗 Open Page
                </button>
                {agent && (
                  <button
                    onClick={() => handleReleaseAgent(page.id)}
                    className="px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    title="Release Agent"
                  >
                    🔓
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredPages.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No pages found matching your criteria.</p>
        </div>
      )}

      {/* Agents Status */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Development Agents Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <div
              key={agent.id}
              className={`border rounded-lg p-4 ${
                agent.status === 'available'
                  ? 'border-green-200 bg-green-50'
                  : agent.status === 'busy'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getAgentStatusColor(agent.status)}`}
                >
                  {agent.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">ID: {agent.id}</p>
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Expertise:</h4>
                <div className="flex flex-wrap gap-1">
                  {agent.expertise.map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Current Pages:</h4>
                <div className="space-y-1">
                  {agent.currentPages.length > 0 ? (
                    agent.currentPages.map(pageId => {
                      const page = urlManager.getPage(pageId);
                      return page ? (
                        <div key={pageId} className="text-xs text-gray-600">
                          • {page.title}
                        </div>
                      ) : null;
                    })
                  ) : (
                    <div className="text-xs text-gray-500">No pages assigned</div>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Last Active: {agent.lastActive.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
