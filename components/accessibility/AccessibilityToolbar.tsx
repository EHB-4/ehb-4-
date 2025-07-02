"use client";

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility,
  Type,
  Contrast,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  MousePointer,
  Keyboard,
  Monitor,
  Smartphone,
  Tablet,
  Settings,
  X,
  Plus,
  Minus,
  RotateCcw,
  Check,
  AlertTriangle,
  HelpCircle,
  FileText,
  Image,
  Video,
  Music,
  File,
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
// 1. ACCESSIBILITY TOOLBAR SYSTEM
// ========================================

interface AccessibilitySettings {
  fontSize: number;
  contrast: 'normal' | 'high' | 'inverted';
  focusIndicator: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  soundEffects: boolean;
  keyboardNavigation: boolean;
  highContrast: boolean;
  largeText: boolean;
  spacing: 'normal' | 'increased' | 'extra';
  cursor: 'normal' | 'large' | 'extra-large';
  lineHeight: 'normal' | 'increased' | 'extra';
  wordSpacing: 'normal' | 'increased' | 'extra';
  letterSpacing: 'normal' | 'increased' | 'extra';
}

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 16,
    contrast: 'normal',
    focusIndicator: false,
    reduceMotion: false,
    screenReader: false,
    soundEffects: false,
    keyboardNavigation: false,
    highContrast: false,
    largeText: false,
    spacing: 'normal',
    cursor: 'normal',
    lineHeight: 'normal',
    wordSpacing: 'normal',
    letterSpacing: 'normal',
  });

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;

    // Font size
    root.style.fontSize = `${settings.fontSize}px`;

    // Contrast
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast');
      root.classList.remove('inverted-contrast');
    } else if (settings.contrast === 'inverted') {
      root.classList.add('inverted-contrast');
      root.classList.remove('high-contrast');
    } else {
      root.classList.remove('high-contrast', 'inverted-contrast');
    }

    // Focus indicator
    if (settings.focusIndicator) {
      root.classList.add('show-focus');
    } else {
      root.classList.remove('show-focus');
    }

    // Reduce motion
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }

    // Large text
    if (settings.largeText) {
      root.classList.add('large-text-mode');
    } else {
      root.classList.remove('large-text-mode');
    }

    // Spacing
    root.classList.remove('increased-spacing', 'extra-spacing');
    if (settings.spacing === 'increased') {
      root.classList.add('increased-spacing');
    } else if (settings.spacing === 'extra') {
      root.classList.add('extra-spacing');
    }

    // Cursor
    root.classList.remove('large-cursor', 'extra-large-cursor');
    if (settings.cursor === 'large') {
      root.classList.add('large-cursor');
    } else if (settings.cursor === 'extra-large') {
      root.classList.add('extra-large-cursor');
    }

    // Line height
    root.classList.remove('increased-line-height', 'extra-line-height');
    if (settings.lineHeight === 'increased') {
      root.classList.add('increased-line-height');
    } else if (settings.lineHeight === 'extra') {
      root.classList.add('extra-line-height');
    }

    // Word spacing
    root.classList.remove('increased-word-spacing', 'extra-word-spacing');
    if (settings.wordSpacing === 'increased') {
      root.classList.add('increased-word-spacing');
    } else if (settings.wordSpacing === 'extra') {
      root.classList.add('extra-word-spacing');
    }

    // Letter spacing
    root.classList.remove('increased-letter-spacing', 'extra-letter-spacing');
    if (settings.letterSpacing === 'increased') {
      root.classList.add('increased-letter-spacing');
    } else if (settings.letterSpacing === 'extra') {
      root.classList.add('extra-letter-spacing');
    }
  }, [settings]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load accessibility settings:', error);
      }
    }
  }, []);

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 16,
      contrast: 'normal',
      focusIndicator: false,
      reduceMotion: false,
      screenReader: false,
      soundEffects: false,
      keyboardNavigation: false,
      highContrast: false,
      largeText: false,
      spacing: 'normal',
      cursor: 'normal',
      lineHeight: 'normal',
      wordSpacing: 'normal',
      letterSpacing: 'normal',
    };
    setSettings(defaultSettings);
  };

  const increaseFontSize = () => {
    setSettings(prev => ({ ...prev, fontSize: Math.min(prev.fontSize + 2, 32) }));
  };

  const decreaseFontSize = () => {
    setSettings(prev => ({ ...prev, fontSize: Math.max(prev.fontSize - 2, 12) }));
  };

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Accessibility Toolbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Accessibility
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="Close accessibility settings"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
              {/* Font Size */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">
                    Font Size
                  </label>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {settings.fontSize}px
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseFontSize}
                    className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Decrease font size"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full transition-all"
                      style={{ width: `${((settings.fontSize - 12) / 20) * 100}%` }}
                    ></div>
                  </div>
                  <button
                    onClick={increaseFontSize}
                    className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Increase font size"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contrast */}
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white mb-3 block">
                  Contrast
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'normal', label: 'Normal' },
                    { value: 'high', label: 'High' },
                    { value: 'inverted', label: 'Inverted' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="contrast"
                        value={option.value}
                        checked={settings.contrast === option.value}
                        onChange={e => updateSetting('contrast', e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quick Toggles */}
              <div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
                  Quick Settings
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.focusIndicator}
                      onChange={() => toggleSetting('focusIndicator')}
                      className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        Focus Indicator
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Show focus outlines
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.reduceMotion}
                      onChange={() => toggleSetting('reduceMotion')}
                      className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        Reduce Motion
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Minimize animations
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.highContrast}
                      onChange={() => toggleSetting('highContrast')}
                      className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        High Contrast
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Enhanced contrast mode
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.largeText}
                      onChange={() => toggleSetting('largeText')}
                      className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        Large Text
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Increase text size
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Spacing */}
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white mb-3 block">
                  Spacing
                </label>
                <select
                  value={settings.spacing}
                  onChange={e => updateSetting('spacing', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="increased">Increased</option>
                  <option value="extra">Extra</option>
                </select>
              </div>

              {/* Cursor */}
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white mb-3 block">
                  Cursor Size
                </label>
                <select
                  value={settings.cursor}
                  onChange={e => updateSetting('cursor', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>

              {/* Reset Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={resetSettings}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for accessibility features */}
      <style jsx global>{`
        /* High Contrast Mode */
        .high-contrast {
          --text-color: #000000;
          --bg-color: #ffffff;
          --border-color: #000000;
          --link-color: #0000ff;
          --visited-color: #800080;
          --focus-color: #ff0000;
        }

        .high-contrast * {
          color: var(--text-color) !important;
          background-color: var(--bg-color) !important;
          border-color: var(--border-color) !important;
        }

        .high-contrast a {
          color: var(--link-color) !important;
        }

        .high-contrast a:visited {
          color: var(--visited-color) !important;
        }

        /* Inverted Contrast */
        .inverted-contrast {
          --text-color: #ffffff;
          --bg-color: #000000;
          --border-color: #ffffff;
          --link-color: #ffff00;
          --visited-color: #ff00ff;
          --focus-color: #00ff00;
        }

        .inverted-contrast * {
          color: var(--text-color) !important;
          background-color: var(--bg-color) !important;
          border-color: var(--border-color) !important;
        }

        .inverted-contrast a {
          color: var(--link-color) !important;
        }

        .inverted-contrast a:visited {
          color: var(--visited-color) !important;
        }

        /* Focus Indicators */
        .show-focus *:focus {
          outline: 3px solid #ff0000 !important;
          outline-offset: 2px !important;
        }

        /* Reduce Motion */
        .reduce-motion *,
        .reduce-motion *::before,
        .reduce-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        /* High Contrast Mode */
        .high-contrast-mode {
          filter: contrast(150%) brightness(120%);
        }

        /* Large Text Mode */
        .large-text-mode {
          font-size: 1.2em !important;
        }

        /* Spacing */
        .increased-spacing {
          letter-spacing: 0.1em !important;
          word-spacing: 0.2em !important;
          line-height: 1.6 !important;
        }

        .extra-spacing {
          letter-spacing: 0.2em !important;
          word-spacing: 0.4em !important;
          line-height: 2 !important;
        }

        /* Cursor */
        .large-cursor {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M0 0h24v24H0z"/></svg>')
              12 12,
            auto !important;
        }

        .extra-large-cursor {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="black"><path d="M0 0h32v32H0z"/></svg>')
              16 16,
            auto !important;
        }

        /* Line Height */
        .increased-line-height {
          line-height: 1.6 !important;
        }

        .extra-line-height {
          line-height: 2 !important;
        }

        /* Word Spacing */
        .increased-word-spacing {
          word-spacing: 0.2em !important;
        }

        .extra-word-spacing {
          word-spacing: 0.4em !important;
        }

        /* Letter Spacing */
        .increased-letter-spacing {
          letter-spacing: 0.1em !important;
        }

        .extra-letter-spacing {
          letter-spacing: 0.2em !important;
        }
      `}</style>
    </>
  );
}
