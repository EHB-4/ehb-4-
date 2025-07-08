'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ui/LanguageSelector from '@/components/ui/LanguageSelector';
import utils/ehbDataPage from '@/lib/utils/ehbDataPage';

export default function RoadmapAgentPage() {
  const { t } = useTranslation();
  // Get all aggregated EHB data
  const { companyInfo, modules, services, roadmapData, servicesOverviewMarkdown } =
    getAggregatedEHBData();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showInstructions, setShowInstructions] = useState(true);

  // Calculate progress and filter modules by status
  const overallProgress = Math.round(
    modules.reduce((acc, m) => acc + (m.progress || 0), 0) / modules.length
  );
  const completedModules = modules.filter(m => m.status === 'Completed');
  const workingModules = modules.filter(m => m.status === 'Working');
  const underDevelopmentModules = modules.filter(m => m.status === 'Under Development');
  const notStartedModules = modules.filter(m => m.status === 'Not Started');
  const upcomingModules = [...underDevelopmentModules, ...notStartedModules];

  const filteredModules =
    selectedStatus === 'all' ? modules : modules.filter(module => module.status === selectedStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">🤖</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('companyName')} {t('overview')}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showInstructions ? t('hide') : t('show')} Agent Instructions
              </button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex space-x-6">
              <span className="text-gray-600">
                {t('overallProgress')}:{' '}
                <span className="font-semibold text-blue-600">{overallProgress}%</span>
              </span>
              <span className="text-gray-600">
                {t('completed')}:{' '}
                <span className="font-semibold text-green-600">{completedModules.length}</span>
              </span>
              <span className="text-gray-600">
                {t('working')}:{' '}
                <span className="font-semibold text-blue-600">{workingModules.length}</span>
              </span>
              <span className="text-gray-600">
                {t('underDevelopment')}:{' '}
                <span className="font-semibold text-yellow-600">
                  {underDevelopmentModules.length}
                </span>
              </span>
              <span className="text-gray-600">
                {t('notStarted')}:{' '}
                <span className="font-semibold text-gray-600">{notStartedModules.length}</span>
              </span>
            </div>
            <span className="text-gray-500">
              {t('lastUpdated')}: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Roadmap Page Link Card */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white flex items-center justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold mb-1">{t('companyName')} Roadmap</h2>
              <p className="text-sm">See the full company roadmap, rules, and all services.</p>
            </div>
            <a
              href="/roadmap"
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-100 transition-colors"
            >
              View Roadmap
            </a>
          </motion.div>
        </section>

        {/* Launched Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Launched Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{module.name}</h3>
                <p className="text-gray-600 mb-2">{module.description}</p>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-green-600 font-semibold">{module.progress}% Ready</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">{100 - module.progress}% Remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
                <a
                  href={module.path}
                  className="text-blue-600 underline text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('viewDetails')}
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Upcoming Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">Upcoming Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{module.name}</h3>
                <p className="text-gray-600 mb-2">{module.description}</p>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-yellow-600 font-semibold">{module.progress}% Ready</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">{100 - module.progress}% Remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full bg-yellow-500"
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
                <a
                  href={module.path}
                  className="text-blue-600 underline text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('viewDetails')}
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Agent Instructions */}
        {showInstructions && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📋</span>
                <h2 className="text-2xl font-bold">AI Agent Instructions</h2>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
                  {companyInfo.mission}
                </pre>
              </div>
            </div>
          </motion.section>
        )}

        {/* Service Filter */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('filter')} {t('modules')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: t('modules'), color: 'bg-gray-500' },
                { value: 'Completed', label: t('completed'), color: 'bg-green-500' },
                { value: 'Working', label: t('working'), color: 'bg-blue-500' },
                {
                  value: 'Under Development',
                  label: t('underDevelopment'),
                  color: 'bg-yellow-500',
                },
                { value: 'Not Started', label: t('notStarted'), color: 'bg-red-500' },
              ].map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedStatus(filter.value)}
                  className={`px-4 py-2 rounded-lg text-white font-medium transition-all ${
                    selectedStatus === filter.value
                      ? `${filter.color} shadow-lg`
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500"
              >
                {/* Module Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{module.name}</h3>
                    <p className="text-sm text-gray-600">{module.title}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      module.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : module.status === 'Working'
                          ? 'bg-blue-100 text-blue-800'
                          : module.status === 'Under Development'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {t(module.status.toLowerCase())}
                  </span>
                </div>

                {/* Module Description */}
                <p className="text-gray-700 mb-4">{module.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{t('progress')}</span>
                    <span>{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        module.progress >= 80
                          ? 'bg-green-500'
                          : module.progress >= 60
                            ? 'bg-blue-500'
                            : module.progress >= 40
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                      }`}
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Module Details */}
                <div className="space-y-3">
                  {/* Team */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Team:</h4>
                    <p className="text-sm text-gray-600">{module.team?.join(', ')}</p>
                  </div>
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Features:</h4>
                    <ul className="list-disc ml-5 text-sm text-gray-600">
                      {module.features?.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  {/* Dependencies */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Dependencies:</h4>
                    <p className="text-sm text-gray-600">{module.dependencies?.join(', ')}</p>
                  </div>
                  {/* Last Updated */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {t('lastUpdated')}:
                    </h4>
                    <p className="text-sm text-gray-600">{module.lastUpdated}</p>
                  </div>
                  {/* Card with URL */}
                  <div>
                    <a
                      href={module.path}
                      className="text-blue-600 underline text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('viewDetails')}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Markdown Overview Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('ehbServicesOverview')}
            </h2>
            {/* For now, render markdown as plain text. In future, use a markdown renderer. */}
            <pre className="whitespace-pre-wrap text-gray-700 text-sm overflow-x-auto">
              {servicesOverviewMarkdown}
            </pre>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
