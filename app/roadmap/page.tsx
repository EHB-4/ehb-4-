'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/ui/LanguageSelector';
import { getAggregatedEHBData } from '../../lib/utils/ehbDataPage';

export default function RoadmapPage() {
  const { t } = useTranslation();
  // Get all aggregated EHB data
  const { companyInfo, servicesOverviewMarkdown, modules, services, roadmapData } =
    getAggregatedEHBData();

  // Example: Calculate overall progress from modules
  const overallProgress = Math.round(
    modules.reduce((acc, m) => acc + (m.progress || 0), 0) / modules.length
  );
  const completedModules = modules.filter(m => m.status === 'Completed');
  const workingModules = modules.filter(m => m.status === 'Working');
  const underDevelopmentModules = modules.filter(m => m.status === 'Under Development');
  const notStartedModules = modules.filter(m => m.status === 'Not Started');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">EHB</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{t('companyName')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {t('lastUpdated')}: {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-blue-600 font-medium">
                {t('overallProgress')}: {overallProgress}%
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Company Overview */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500"
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl text-blue-500 mr-4">🏢</span>
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900">{t('companyName')}</h2>
                <p className="text-lg text-gray-600">{companyInfo.description}</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              {t('mission')}: {companyInfo.mission}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('mission')}</h3>
                <p className="text-gray-700">{companyInfo.mission}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('vision')}</h3>
                <p className="text-gray-700">{companyInfo.vision}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Progress Overview */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('developmentProgress')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{completedModules.length}</div>
                <div className="text-sm text-green-700">{t('completed')}</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{workingModules.length}</div>
                <div className="text-sm text-blue-700">{t('working')}</div>
              </div>
              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">
                  {underDevelopmentModules.length}
                </div>
                <div className="text-sm text-yellow-700">{t('underDevelopment')}</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-600">{notStartedModules.length}</div>
                <div className="text-sm text-gray-700">{t('notStarted')}</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-sm text-gray-600">
              {t('overallProgress')}: {overallProgress}%
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('ourServicesModules')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{module.name}</h3>
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

                  <p className="text-gray-600 mb-4">{module.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{t('progress')}</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
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

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {t('lastUpdated')}: {module.lastUpdated}
                    </span>
                    <a
                      href={module.path}
                      className="text-blue-600 underline text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('viewDetails')}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              {t('coreValues')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companyInfo.coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center"
                >
                  <span className="text-2xl text-blue-500 mb-2 block">⭐</span>
                  <p className="text-lg font-semibold text-gray-900">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
