'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  FileText,
  Code,
  Settings,
  Download,
  Share,
  Copy,
  Edit,
  Eye,
  Clock,
  User,
  Tag,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderX,
  FilePlus,
  FileMinus,
  FileX,
  FileCheck,
  FileSearch,
  FileEdit,
  FileCode,
  FileJson,
  FileCsv,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileArchive,
  FileAudio,
  FileVideo,
  FileImage,
  Database,
  Server,
  Cloud,
  AlertCircle,
  Info,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudOff,
  CloudDrizzle,
  CloudFog,
  Sun,
  Moon,
  Star as StarIcon,
  Sunrise,
  Sunset,
  Thermometer,
  Droplets,
  Wind,
  Umbrella,
  Snowflake,
  Cloudy,
  PartlyCloudy,
  Clear,
  Rain,
  Thunderstorm,
  Fog,
  Haze,
  Dust,
  Sandstorm,
  Tornado,
  Hurricane,
  Earthquake,
  Volcano,
  Tsunami,
  Flood,
  Drought,
  Wildfire,
  Avalanche,
  Landslide,
  Sinkhole,
  Meteor,
  Comet,
  Asteroid,
  Planet,
  Galaxy,
  Universe,
  Telescope,
  Satellite,
  Rocket,
  SpaceShuttle,
  SpaceStation,
  Moon as MoonIcon,
  Mars,
  Venus,
  Mercury,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
  Pluto,
  Sun as SunIcon,
  Star as StarIcon2,
  Constellation,
  Zodiac,
  Horoscope,
  Astrology,
  Astronomy,
  Physics,
  Chemistry,
  Biology,
  Mathematics,
  Geometry,
  Algebra,
  Calculus,
  Statistics,
  Probability,
  Logic,
  Philosophy,
  Psychology,
  Sociology,
  Anthropology,
  Archaeology,
  History,
  Geography,
  Geology,
  Meteorology,
  Oceanography,
  Ecology,
  Botany,
  Zoology,
  Microbiology,
  Genetics,
  Evolution,
  Medicine,
  Healthcare,
  Hospital,
  Doctor,
  Nurse,
  Patient,
  Ambulance,
  FirstAid,
  Bandage,
  Pill,
  Syringe,
  Stethoscope,
  Thermometer as ThermometerIcon,
  Heart as HeartIcon,
  Brain,
  Eye as EyeIcon,
  Ear,
  Nose,
  Mouth,
  Tooth,
  Bone,
  Muscle,
  Skin,
  Hair,
  Nail,
  Blood,
  Dna,
  Cell,
  Virus,
  Bacteria,
  Parasite,
  Vaccine,
  Antibiotic,
  Antiviral,
  Painkiller,
  Sedative,
  Stimulant,
  Depressant,
  Hallucinogen,
  Narcotic,
  Opioid,
  Cannabis,
  Alcohol,
  Tobacco,
  Caffeine,
  Sugar,
  Salt,
  Fat,
  Protein,
  Carbohydrate,
  Vitamin,
  Mineral,
  Fiber,
  Water,
  Oxygen,
  Carbon,
  Nitrogen,
  Hydrogen,
  Helium,
  Lithium,
  Beryllium,
  Boron,
  Carbon as CarbonIcon,
  Nitrogen as NitrogenIcon,
  Oxygen as OxygenIcon,
  Fluorine,
  Neon,
  Sodium,
  Magnesium,
  Aluminum,
  Silicon,
  Phosphorus,
  Sulfur,
  Chlorine,
  Argon,
  Potassium,
  Calcium,
  Scandium,
  Titanium,
  Vanadium,
  Chromium,
  Manganese,
  Iron,
  Cobalt,
  Nickel,
  Copper,
  Zinc,
  Gallium,
  Germanium,
  Arsenic,
  Selenium,
  Bromine,
  Krypton,
  Rubidium,
  Strontium,
  Yttrium,
  Zirconium,
  Niobium,
  Molybdenum,
  Technetium,
  Ruthenium,
  Rhodium,
  Palladium,
  Silver,
  Cadmium,
  Indium,
  Tin,
  Antimony,
  Tellurium,
  Iodine,
  Xenon,
  Cesium,
  Barium,
  Lanthanum,
  Cerium,
  Praseodymium,
  Neodymium,
  Promethium,
  Samarium,
  Europium,
  Gadolinium,
  Terbium,
  Dysprosium,
  Holmium,
  Erbium,
  Thulium,
  Ytterbium,
  Lutetium,
  Hafnium,
  Tantalum,
  Tungsten,
  Rhenium,
  Osmium,
  Iridium,
  Platinum,
  Gold,
  Mercury,
  Thallium,
  Lead,
  Bismuth,
  Polonium,
  Astatine,
  Radon,
  Francium,
  Radium,
  Actinium,
  Thorium,
  Protactinium,
  Uranium,
  Neptunium,
  Plutonium,
  Americium,
  Curium,
  Berkelium,
  Californium,
  Einsteinium,
  Fermium,
  Mendelevium,
  Nobelium,
  Lawrencium,
  Rutherfordium,
  Dubnium,
  Seaborgium,
  Bohrium,
  Hassium,
  Meitnerium,
  Darmstadtium,
  Roentgenium,
  Copernicium,
  Nihonium,
  Flerovium,
  Moscovium,
  Livermorium,
  Tennessine,
  Oganesson,
} from 'lucide-react';

// ========================================
// 1. DOCUMENTATION VIEWER SYSTEM
// ========================================

interface DocumentationItem {
  id: string;
  title: string;
  category: 'api' | 'components' | 'guides' | 'setup' | 'deployment' | 'development';
  type: 'markdown' | 'code' | 'tutorial' | 'reference';
  content: string;
  tags: string[];
  lastUpdated: Date;
  author: string;
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published' | 'archived';
}

export default function DocumentationViewer() {
  const [documents, setDocuments] = useState<DocumentationItem[]>([
    {
      id: '1',
      title: 'API Documentation',
      category: 'api',
      type: 'reference',
      content: `# API Documentation

## Overview
The EHB Platform provides a comprehensive REST API for integrating with our services.

## Authentication
All API requests require authentication using API keys or OAuth tokens.

### API Key Authentication
\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.ehb.com/v1/users
\`\`\`

## Endpoints

### Users
- \`GET /users\` - List all users
- \`POST /users\` - Create a new user
- \`GET /users/{id}\` - Get user details
- \`PUT /users/{id}\` - Update user
- \`DELETE /users/{id}\` - Delete user

### Authentication
- \`POST /auth/login\` - User login
- \`POST /auth/logout\` - User logout
- \`POST /auth/refresh\` - Refresh token

## Response Format
All API responses follow a standard format:

\`\`\`json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2024-01-01T00:00:00Z"
}
\`\`\`

## Error Handling
Errors are returned with appropriate HTTP status codes and error messages.

\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {}
  }
}
\`\`\``,
      tags: ['api', 'rest', 'authentication', 'endpoints'],
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      author: 'Development Team',
      readTime: 15,
      difficulty: 'intermediate',
      status: 'published',
    },
    {
      id: '2',
      title: 'Component Library',
      category: 'components',
      type: 'reference',
      content: `# Component Library

## Overview
Our component library provides reusable UI components built with React and TypeScript.

## Installation
\`\`\`bash
npm install @ehb/components
\`\`\`

## Usage
\`\`\`tsx
import { Button, Card, Modal } from '@ehb/components';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Card title="Example Card">
        <p>Card content</p>
      </Card>
    </div>
  );
}
\`\`\`

## Available Components

### Button
A versatile button component with multiple variants.

\`\`\`tsx
<Button variant="primary" size="large" disabled={false}>
  Primary Button
</Button>
\`\`\`

### Card
A container component for displaying content.

\`\`\`tsx
<Card title="Card Title" subtitle="Card Subtitle">
  <p>Card content goes here</p>
</Card>
\`\`\`

### Modal
A modal dialog component for overlays.

\`\`\`tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Modal Title</h2>
  <p>Modal content</p>
</Modal>
\`\`\``,
      tags: ['components', 'react', 'typescript', 'ui'],
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      author: 'UI Team',
      readTime: 10,
      difficulty: 'beginner',
      status: 'published',
    },
    {
      id: '3',
      title: 'Quick Start Guide',
      category: 'guides',
      type: 'tutorial',
      content: `# Quick Start Guide

## Getting Started
Welcome to the EHB Platform! This guide will help you get up and running quickly.

## Prerequisites
- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)

## Installation

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/ehb/platform.git
cd platform
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit \`.env.local\` with your configuration:
\`\`\`env
DATABASE_URL=your_database_url
API_KEY=your_api_key
\`\`\`

### 4. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit \`http://localhost:3000\` to see your application.

## Next Steps
1. Read the API documentation
2. Explore the component library
3. Check out the deployment guide
4. Join our community

## Need Help?
- Check our FAQ
- Join our Discord server
- Open an issue on GitHub`,
      tags: ['getting-started', 'installation', 'setup'],
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      author: 'Documentation Team',
      readTime: 8,
      difficulty: 'beginner',
      status: 'published',
    },
  ]);

  const [selectedDocument, setSelectedDocument] = useState<DocumentationItem | null>(documents[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'detailed'>('list');
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');

  const filteredDocuments = documents.filter(doc => {
    if (
      searchTerm &&
      !doc.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !doc.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false;
    }
    if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && doc.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    const icons = {
      api: Code,
      components: FileText,
      guides: BookOpen,
      setup: Settings,
      deployment: Cloud,
      development: Code,
    };
    return icons[category as keyof typeof icons] || FileText;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      intermediate: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      advanced: 'text-red-600 bg-red-100 dark:bg-red-900/20',
    };
    return (
      colors[difficulty as keyof typeof colors] || 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateTableOfContents = (content: string) => {
    const lines = content.split('\n');
    const headings = lines
      .map((line, index) => {
        const match = line.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
          return {
            level: match[1].length,
            title: match[2],
            line: index,
          };
        }
        return null;
      })
      .filter(Boolean);

    return headings;
  };

  const toc = selectedDocument ? generateTableOfContents(selectedDocument.content) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Documentation
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive guides and references for the EHB Platform
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTableOfContents(!showTableOfContents)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                {showTableOfContents ? 'Hide' : 'Show'} TOC
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              >
                <option value="all">All Categories</option>
                <option value="api">API</option>
                <option value="components">Components</option>
                <option value="guides">Guides</option>
                <option value="setup">Setup</option>
                <option value="deployment">Deployment</option>
                <option value="development">Development</option>
              </select>

              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                {[
                  { key: 'list', label: 'List', icon: FileText },
                  { key: 'grid', label: 'Grid', icon: Grid },
                  { key: 'detailed', label: 'Detailed', icon: Eye },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setViewMode(key as any)}
                    className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      viewMode === key
                        ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Documentation
              </h3>

              <div className="space-y-2">
                {filteredDocuments.map(doc => {
                  const CategoryIcon = getCategoryIcon(doc.category);

                  return (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDocument(doc)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedDocument?.id === doc.id
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CategoryIcon className="w-4 h-4" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {doc.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {doc.category} • {doc.readTime} min read
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {selectedDocument ? (
              <motion.div
                key={selectedDocument.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
              >
                {/* Document Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                            selectedDocument.difficulty
                          )}`}
                        >
                          {selectedDocument.difficulty}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                          {selectedDocument.type}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                          {selectedDocument.readTime} min read
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {selectedDocument.title}
                      </h2>

                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span>By {selectedDocument.author}</span>
                        <span>Updated {selectedDocument.lastUpdated.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(selectedDocument.content)}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        title="Copy content"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        title="Share"
                      >
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Document Content */}
                <div className="flex">
                  {/* Main Content */}
                  <div className="flex-1 p-6">
                    <div
                      className="prose prose-slate dark:prose-invert max-w-none"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      <pre className="whitespace-pre-wrap font-sans text-slate-900 dark:text-white">
                        {selectedDocument.content}
                      </pre>
                    </div>
                  </div>

                  {/* Table of Contents */}
                  {showTableOfContents && toc.length > 0 && (
                    <div className="w-64 p-6 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                        Table of Contents
                      </h4>

                      <div className="space-y-1">
                        {toc.map((heading, index) => (
                          <button
                            key={index}
                            className={`w-full text-left text-sm transition-colors ${
                              heading.level === 1
                                ? 'font-medium text-slate-900 dark:text-white'
                                : 'text-slate-600 dark:text-slate-400 pl-4'
                            } hover:text-blue-600 dark:hover:text-blue-400`}
                          >
                            {heading.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Tags:</span>
                    {selectedDocument.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-12 shadow-sm border border-slate-200 dark:border-slate-700 text-center"
              >
                <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No Document Selected
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Select a document from the sidebar to view its content.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
