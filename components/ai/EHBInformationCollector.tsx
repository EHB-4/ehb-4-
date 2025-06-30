'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ehbCompanyInfo,
  ehbServices,
  getServiceById,
} from '../../app/roadmap/data/ehb-master-information';

interface InformationUpdate {
  type: 'service' | 'company' | 'new-service';
  data: any;
  timestamp: string;
  agent: string;
}

export default function EHBInformationCollector() {
  const [updates, setUpdates] = useState<InformationUpdate[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [updateType, setUpdateType] = useState<'service' | 'company' | 'new-service'>('service');
  const [formData, setFormData] = useState<any>({});
  const [showForm, setShowForm] = useState(false);

  // Load existing updates from localStorage
  useEffect(() => {
    const savedUpdates = localStorage.getItem('ehb-updates');
    if (savedUpdates) {
      setUpdates(JSON.parse(savedUpdates));
    }
  }, []);

  // Save updates to localStorage
  const saveUpdates = (newUpdates: InformationUpdate[]) => {
    localStorage.setItem('ehb-updates', JSON.stringify(newUpdates));
    setUpdates(newUpdates);
  };

  // Add new update
  const addUpdate = (update: InformationUpdate) => {
    const newUpdates = [...updates, update];
    saveUpdates(newUpdates);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const update: InformationUpdate = {
      type: updateType,
      data: formData,
      timestamp: new Date().toISOString(),
      agent: 'AI Agent',
    };

    addUpdate(update);
    setFormData({});
    setShowForm(false);
  };

  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    if (serviceId) {
      const service = getServiceById(serviceId);
      if (service) {
        setFormData(service);
      }
    }
  };

  // Render service update form
  const renderServiceUpdateForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Service</label>
        <select
          value={selectedService}
          onChange={e => handleServiceSelect(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a service...</option>
          {ehbServices.map(service => (
            <option key={service.id} value={service.id}>
              {service.name} - {service.fullName}
            </option>
          ))}
        </select>
      </div>

      {selectedService && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.progress || 0}
              onChange={e => setFormData({ ...formData, progress: parseInt(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status || ''}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select status...</option>
              <option value="Completed">Completed</option>
              <option value="Working">Working</option>
              <option value="Under Development">Under Development</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
            <textarea
              value={formData.purpose || ''}
              onChange={e => setFormData({ ...formData, purpose: e.target.value })}
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );

  // Render company update form
  const renderCompanyUpdateForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
        <textarea
          value={formData.description || ehbCompanyInfo.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
        <textarea
          value={formData.mission || ehbCompanyInfo.mission}
          onChange={e => setFormData({ ...formData, mission: e.target.value })}
          rows={2}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
        <textarea
          value={formData.vision || ehbCompanyInfo.vision}
          onChange={e => setFormData({ ...formData, vision: e.target.value })}
          rows={2}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  // Render new service form
  const renderNewServiceForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service ID</label>
          <input
            type="text"
            value={formData.id || ''}
            onChange={e => setFormData({ ...formData, id: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., new-service"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., NS"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          value={formData.fullName || ''}
          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., New Service"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Brief description of the service..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
        <textarea
          value={formData.purpose || ''}
          onChange={e => setFormData({ ...formData, purpose: e.target.value })}
          rows={2}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="What is the main purpose of this service?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status || 'Not Started'}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Not Started">Not Started</option>
            <option value="Under Development">Under Development</option>
            <option value="Working">Working</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            value={formData.priority || 'Medium'}
            onChange={e => setFormData({ ...formData, priority: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={formData.progress || 0}
          onChange={e => setFormData({ ...formData, progress: parseInt(e.target.value) })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Path</label>
        <input
          type="text"
          value={formData.path || ''}
          onChange={e => setFormData({ ...formData, path: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., /new-service"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">EHB Information Collector</h2>
            <p className="text-gray-600">Update EHB company and service information</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Cancel' : 'Add Update'}
          </button>
        </div>

        {/* Update Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-6 bg-gray-50 rounded-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Type</label>
                <select
                  value={updateType}
                  onChange={e => setUpdateType(e.target.value as any)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="service">Update Service</option>
                  <option value="company">Update Company Info</option>
                  <option value="new-service">Add New Service</option>
                </select>
              </div>

              {updateType === 'service' && renderServiceUpdateForm()}
              {updateType === 'company' && renderCompanyUpdateForm()}
              {updateType === 'new-service' && renderNewServiceForm()}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Update
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Updates History */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
          <div className="space-y-3">
            {updates.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No updates yet. Add your first update above.
              </p>
            ) : (
              updates
                .slice()
                .reverse()
                .map((update, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {update.type === 'service'
                          ? 'Service Update'
                          : update.type === 'company'
                          ? 'Company Update'
                          : 'New Service'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(update.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify(update.data, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
