'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Play,
  Pause,
  Settings,
  Download,
  Upload,
  TestTube,
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  FileText,
  Database,
  Server,
  Network,
  Globe,
  Smartphone,
  Monitor,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  CreditCard,
  Wallet,
  PiggyBank,
  Banknote,
  Coins,
  Bitcoin,
  Ethereum,
  DollarSign,
  Euro,
  PoundSterling,
  Yen,
  Rupee,
  Won,
  Ruble,
  Lira,
  Real,
  Peso,
  Franc,
  Krona,
  Forint,
  Zloty,
  Koruna,
  Leu,
  Lev,
  Hryvnia,
  Tenge,
  Som,
  Tugrik,
  Kyat,
  Kip,
  Dong,
  Baht,
  Ringgit,
  SingaporeDollar,
  HongKongDollar,
  TaiwanDollar,
  NewZealandDollar,
  AustralianDollar,
  CanadianDollar,
  SwissFranc,
  NorwegianKrone,
  SwedishKrona,
  DanishKrone,
  IcelandicKrona,
  PolishZloty,
  CzechKoruna,
  HungarianForint,
  RomanianLeu,
  BulgarianLev,
  CroatianKuna,
  SerbianDinar,
  BosnianMark,
  AlbanianLek,
  MacedonianDenar,
  MontenegrinEuro,
  KosovoEuro,
  MoldovanLeu,
  UkrainianHryvnia,
  BelarusianRuble,
  GeorgianLari,
  ArmenianDram,
  AzerbaijaniManat,
  KazakhstaniTenge,
  KyrgyzstaniSom,
  TajikistaniSomoni,
  TurkmenistaniManat,
  UzbekistaniSom,
  AfghanAfghani,
  PakistaniRupee,
  IndianRupee,
  BangladeshiTaka,
  SriLankanRupee,
  NepaleseRupee,
  BhutaneseNgultrum,
  MaldivianRufiyaa,
  BurmeseKyat,
  CambodianRiel,
  LaoKip,
  VietnameseDong,
  ThaiBaht,
  MalaysianRinggit,
  SingaporeDollar as SingaporeDollarIcon,
  HongKongDollar as HongKongDollarIcon,
  TaiwanDollar as TaiwanDollarIcon,
  NewZealandDollar as NewZealandDollarIcon,
  AustralianDollar as AustralianDollarIcon,
  CanadianDollar as CanadianDollarIcon,
  SwissFranc as SwissFrancIcon,
  NorwegianKrone as NorwegianKroneIcon,
  SwedishKrona as SwedishKronaIcon,
  DanishKrone as DanishKroneIcon,
  IcelandicKrona as IcelandicKronaIcon,
  PolishZloty as PolishZlotyIcon,
  CzechKoruna as CzechKorunaIcon,
  HungarianForint as HungarianForintIcon,
  RomanianLeu as RomanianLeuIcon,
  BulgarianLev as BulgarianLevIcon,
  CroatianKuna as CroatianKunaIcon,
  SerbianDinar as SerbianDinarIcon,
  BosnianMark as BosnianMarkIcon,
  AlbanianLek as AlbanianLekIcon,
  MacedonianDenar as MacedonianDenarIcon,
  MontenegrinEuro as MontenegrinEuroIcon,
  KosovoEuro as KosovoEuroIcon,
  MoldovanLeu as MoldovanLeuIcon,
  UkrainianHryvnia as UkrainianHryvniaIcon,
  BelarusianRuble as BelarusianRubleIcon,
  GeorgianLari as GeorgianLariIcon,
  ArmenianDram as ArmenianDramIcon,
  AzerbaijaniManat as AzerbaijaniManatIcon,
  KazakhstaniTenge as KazakhstaniTengeIcon,
  KyrgyzstaniSom as KyrgyzstaniSomIcon,
  TajikistaniSomoni as TajikistaniSomoniIcon,
  TurkmenistaniManat as TurkmenistaniManatIcon,
  UzbekistaniSom as UzbekistaniSomIcon,
  AfghanAfghani as AfghanAfghaniIcon,
  PakistaniRupee as PakistaniRupeeIcon,
  IndianRupee as IndianRupeeIcon,
  BangladeshiTaka as BangladeshiTakaIcon,
  SriLankanRupee as SriLankanRupeeIcon,
  NepaleseRupee as NepaleseRupeeIcon,
  BhutaneseNgultrum as BhutaneseNgultrumIcon,
  MaldivianRufiyaa as MaldivianRufiyaaIcon,
  BurmeseKyat as BurmeseKyatIcon,
  CambodianRiel as CambodianRielIcon,
  LaoKip as LaoKipIcon,
  VietnameseDong as VietnameseDongIcon,
  ThaiBaht as ThaiBahtIcon,
  MalaysianRinggit as MalaysianRinggitIcon,
} from 'lucide-react';
import Link from 'next/link';

/**
 * AI Agent Training - Train, fine-tune, and optimize AI agents
 * @returns {JSX.Element} The AI agent training component
 */
export default function AIAgentTrainingPage() {
  const [activeTab, setActiveTab] = useState('models');
  const [isTraining, setIsTraining] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');

  // Mock training data
  const trainingModels = [
    {
      id: 1,
      name: 'Customer Support Agent',
      type: 'conversational',
      status: 'training',
      progress: 65,
      accuracy: 87.5,
      loss: 0.23,
      epochs: 150,
      totalEpochs: 200,
      dataset: 'Customer Support Dataset v2.1',
      modelSize: '2.3GB',
      lastUpdated: '2024-01-15T10:30:00Z',
      estimatedTime: '2 hours remaining',
      gpuUsage: 78,
      memoryUsage: 45,
    },
    {
      id: 2,
      name: 'Sales Analytics Agent',
      type: 'analytics',
      status: 'completed',
      progress: 100,
      accuracy: 92.3,
      loss: 0.15,
      epochs: 300,
      totalEpochs: 300,
      dataset: 'Sales Data 2023',
      modelSize: '1.8GB',
      lastUpdated: '2024-01-14T16:45:00Z',
      estimatedTime: 'Completed',
      gpuUsage: 0,
      memoryUsage: 0,
    },
    {
      id: 3,
      name: 'Fraud Detection Agent',
      type: 'security',
      status: 'queued',
      progress: 0,
      accuracy: 0,
      loss: 0,
      epochs: 0,
      totalEpochs: 500,
      dataset: 'Fraud Detection Dataset',
      modelSize: '0GB',
      lastUpdated: '2024-01-15T09:15:00Z',
      estimatedTime: 'Pending',
      gpuUsage: 0,
      memoryUsage: 0,
    },
  ];

  const availableDatasets = [
    {
      id: 1,
      name: 'Customer Support Dataset v2.1',
      type: 'conversational',
      size: '2.1GB',
      samples: 15420,
      quality: 'High',
      lastUpdated: '2024-01-10',
      description: 'Comprehensive customer support conversations with labeled intents',
      features: ['Intent Classification', 'Entity Recognition', 'Sentiment Analysis'],
    },
    {
      id: 2,
      name: 'Sales Data 2023',
      type: 'analytics',
      size: '1.5GB',
      samples: 8920,
      quality: 'High',
      lastUpdated: '2024-01-08',
      description: 'Sales transactions and customer behavior data',
      features: ['Pattern Recognition', 'Predictive Analytics', 'Customer Segmentation'],
    },
    {
      id: 3,
      name: 'Fraud Detection Dataset',
      type: 'security',
      size: '3.2GB',
      samples: 23450,
      quality: 'Medium',
      lastUpdated: '2024-01-05',
      description: 'Anomaly detection and fraud pattern data',
      features: ['Anomaly Detection', 'Pattern Recognition', 'Risk Assessment'],
    },
  ];

  const trainingConfigs = [
    {
      name: 'Fast Training',
      description: 'Quick training with reduced accuracy',
      epochs: 50,
      batchSize: 32,
      learningRate: 0.001,
      estimatedTime: '30 minutes',
      accuracy: '85-90%',
    },
    {
      name: 'Balanced Training',
      description: 'Balanced speed and accuracy',
      epochs: 200,
      batchSize: 16,
      learningRate: 0.0005,
      estimatedTime: '2 hours',
      accuracy: '90-95%',
    },
    {
      name: 'High Accuracy Training',
      description: 'Maximum accuracy with longer training time',
      epochs: 500,
      batchSize: 8,
      learningRate: 0.0001,
      estimatedTime: '6 hours',
      accuracy: '95-98%',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'training':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'queued':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'training':
        return RefreshCw;
      case 'completed':
        return CheckCircle;
      case 'queued':
        return Clock;
      case 'failed':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  AI Agent Training
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Train, fine-tune, and optimize your AI agents with custom datasets
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/ai-agents">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Brain className="w-4 h-4" />
                    Back to Agents
                  </button>
                </Link>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
              {[
                { id: 'models', name: 'Training Models', icon: Brain },
                { id: 'datasets', name: 'Datasets', icon: Database },
                { id: 'configs', name: 'Training Configs', icon: Settings },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Training Models Tab */}
        {activeTab === 'models' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Training Models
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor and manage your AI agent training sessions
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Start New Training
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trainingModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {model.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {model.type} Agent
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          model.status
                        )}`}
                      >
                        {model.status}
                      </span>
                      <div className="flex items-center gap-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Training Progress
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {model.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${model.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Training Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {model.accuracy}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Loss</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {model.loss}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Epochs</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {model.epochs}/{model.totalEpochs}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Model Size</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {model.modelSize}
                      </p>
                    </div>
                  </div>

                  {/* Resource Usage */}
                  {model.status === 'training' && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Resource Usage
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">GPU</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {model.gpuUsage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                            <div
                              className="bg-green-600 h-1 rounded-full"
                              style={{ width: `${model.gpuUsage}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Memory</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {model.memoryUsage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                            <div
                              className="bg-orange-600 h-1 rounded-full"
                              style={{ width: `${model.memoryUsage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dataset Info */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Dataset</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {model.dataset}
                    </p>
                  </div>

                  {/* Time Info */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated Time</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {model.estimatedTime}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {model.status === 'training' && (
                      <button
                        onClick={() => setIsTraining(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        <Pause className="w-4 h-4" />
                        Pause Training
                      </button>
                    )}
                    {model.status === 'completed' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Download Model
                      </button>
                    )}
                    {model.status === 'queued' && (
                      <button
                        onClick={() => setIsTraining(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        Start Training
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Datasets Tab */}
        {activeTab === 'datasets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Training Datasets
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage and organize your training datasets
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4" />
                Upload Dataset
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableDatasets.map((dataset, index) => (
                <motion.div
                  key={dataset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {dataset.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {dataset.type} Dataset
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {dataset.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Size</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {dataset.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Samples</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {dataset.samples.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Quality</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {dataset.quality}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Updated</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {dataset.lastUpdated}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Features
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {dataset.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Training Configs Tab */}
        {activeTab === 'configs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Training Configurations
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Pre-configured training settings for different use cases
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trainingConfigs.map((config, index) => (
                <motion.div
                  key={config.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {config.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Epochs</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {config.epochs}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Batch Size</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {config.batchSize}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Learning Rate
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {config.learningRate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Estimated Time
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {config.estimatedTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Expected Accuracy
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {config.accuracy}
                      </span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Play className="w-4 h-4" />
                    Use Configuration
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
