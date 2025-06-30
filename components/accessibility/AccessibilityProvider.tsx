'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Keyboard,
  MousePointer,
  Contrast,
  Type,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

/**
 * Accessibility Context Interface
 */
interface AccessibilityContextType {
  // Visual accessibility
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;

  // Audio accessibility
  screenReader: boolean;
  toggleScreenReader: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;

  // Navigation accessibility
  keyboardNavigation: boolean;
  toggleKeyboardNavigation: () => void;
  focusIndicator: boolean;
  toggleFocusIndicator: () => void;

  // Motion accessibility
  reducedMotion: boolean;
  toggleReducedMotion: () => void;

  // Zoom accessibility
  zoomLevel: number;
  increaseZoom: () => void;
  decreaseZoom: () => void;
  resetZoom: () => void;

  // Utility functions
  announceToScreenReader: (message: string) => void;
  focusElement: (selector: string) => void;
  skipToContent: () => void;
}

/**
 * Accessibility Provider Context
 */
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

/**
 * Accessibility Provider Props
 */
interface AccessibilityProviderProps {
  children: ReactNode;
}

/**
 * Accessibility Provider Component
 * Provides comprehensive accessibility features for the EHB platform
 */
export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  // Visual accessibility state
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Audio accessibility state
  const [screenReader, setScreenReader] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Navigation accessibility state
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [focusIndicator, setFocusIndicator] = useState(true);

  // Motion accessibility state
  const [reducedMotion, setReducedMotion] = useState(false);

  // Load accessibility preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('ehb-accessibility-preferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      setHighContrast(preferences.highContrast || false);
      setFontSize(preferences.fontSize || 16);
      setZoomLevel(preferences.zoomLevel || 100);
      setScreenReader(preferences.screenReader || false);
      setSoundEnabled(preferences.soundEnabled !== false);
      setKeyboardNavigation(preferences.keyboardNavigation || false);
      setFocusIndicator(preferences.focusIndicator !== false);
      setReducedMotion(preferences.reducedMotion || false);
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    const preferences = {
      highContrast,
      fontSize,
      zoomLevel,
      screenReader,
      soundEnabled,
      keyboardNavigation,
      focusIndicator,
      reducedMotion,
    };
    localStorage.setItem('ehb-accessibility-preferences', JSON.stringify(preferences));
  }, [
    highContrast,
    fontSize,
    zoomLevel,
    screenReader,
    soundEnabled,
    keyboardNavigation,
    focusIndicator,
    reducedMotion,
  ]);

  // Apply accessibility styles to document
  useEffect(() => {
    const root = document.documentElement;

    // Apply high contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply font size
    root.style.fontSize = `${fontSize}px`;

    // Apply zoom level
    root.style.zoom = `${zoomLevel}%`;

    // Apply reduced motion
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Apply focus indicator
    if (focusIndicator) {
      root.classList.add('focus-indicator');
    } else {
      root.classList.remove('focus-indicator');
    }
  }, [highContrast, fontSize, zoomLevel, reducedMotion, focusIndicator]);

  // Toggle functions
  const toggleHighContrast = () => setHighContrast(!highContrast);
  const toggleScreenReader = () => setScreenReader(!screenReader);
  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const toggleKeyboardNavigation = () => setKeyboardNavigation(!keyboardNavigation);
  const toggleFocusIndicator = () => setFocusIndicator(!focusIndicator);
  const toggleReducedMotion = () => setReducedMotion(!reducedMotion);

  // Font size functions
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));
  const resetFontSize = () => setFontSize(16);

  // Zoom functions
  const increaseZoom = () => setZoomLevel(prev => Math.min(prev + 10, 200));
  const decreaseZoom = () => setZoomLevel(prev => Math.max(prev - 10, 50));
  const resetZoom = () => setZoomLevel(100);

  // Utility functions
  const announceToScreenReader = (message: string) => {
    if (screenReader) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);

      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  };

  const focusElement = (selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  };

  const skipToContent = () => {
    const mainContent = document.querySelector('main') || document.querySelector('#main-content');
    if (mainContent) {
      (mainContent as HTMLElement).focus();
      announceToScreenReader('Skipped to main content');
    }
  };

  const contextValue: AccessibilityContextType = {
    highContrast,
    toggleHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    screenReader,
    toggleScreenReader,
    soundEnabled,
    toggleSound,
    keyboardNavigation,
    toggleKeyboardNavigation,
    focusIndicator,
    toggleFocusIndicator,
    reducedMotion,
    toggleReducedMotion,
    zoomLevel,
    increaseZoom,
    decreaseZoom,
    resetZoom,
    announceToScreenReader,
    focusElement,
    skipToContent,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      <AccessibilityToolbar />
    </AccessibilityContext.Provider>
  );
}

/**
 * Accessibility Toolbar Component
 * Floating toolbar with accessibility controls
 */
function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const accessibility = useAccessibility();

  if (!accessibility) return null;

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        onClick={e => {
          e.preventDefault();
          accessibility.skipToContent();
        }}
      >
        Skip to main content
      </a>

      {/* Floating accessibility button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Accessibility settings"
      >
        <Eye className="w-6 h-6" />
      </button>

      {/* Accessibility toolbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-80"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Accessibility Settings
            </h3>

            <div className="space-y-4">
              {/* Visual Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Visual
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={accessibility.toggleHighContrast}
                    className={`flex items-center justify-between w-full p-2 rounded-md text-sm transition-colors ${
                      accessibility.highContrast
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Contrast className="w-4 h-4" />
                      High Contrast
                    </span>
                    {accessibility.highContrast && <span className="text-xs">ON</span>}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={accessibility.decreaseFontSize}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label="Decrease font size"
                    >
                      <Type className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
                      {accessibility.fontSize}px
                    </span>
                    <button
                      onClick={accessibility.increaseFontSize}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label="Increase font size"
                    >
                      <Type className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={accessibility.decreaseZoom}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
                      {accessibility.zoomLevel}%
                    </span>
                    <button
                      onClick={accessibility.increaseZoom}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Audio Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Audio</h4>
                <div className="space-y-2">
                  <button
                    onClick={accessibility.toggleScreenReader}
                    className={`flex items-center justify-between w-full p-2 rounded-md text-sm transition-colors ${
                      accessibility.screenReader
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Screen Reader
                    </span>
                    {accessibility.screenReader && <span className="text-xs">ON</span>}
                  </button>

                  <button
                    onClick={accessibility.toggleSound}
                    className={`flex items-center justify-between w-full p-2 rounded-md text-sm transition-colors ${
                      !accessibility.soundEnabled
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {accessibility.soundEnabled ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4" />
                      )}
                      Sound
                    </span>
                    {!accessibility.soundEnabled && <span className="text-xs">OFF</span>}
                  </button>
                </div>
              </div>

              {/* Navigation Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Navigation
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={accessibility.toggleKeyboardNavigation}
                    className={`flex items-center justify-between w-full p-2 rounded-md text-sm transition-colors ${
                      accessibility.keyboardNavigation
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Keyboard className="w-4 h-4" />
                      Keyboard Navigation
                    </span>
                    {accessibility.keyboardNavigation && <span className="text-xs">ON</span>}
                  </button>

                  <button
                    onClick={accessibility.toggleFocusIndicator}
                    className={`flex items-center justify-between w-full p-2 rounded-md text-sm transition-colors ${
                      accessibility.focusIndicator
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MousePointer className="w-4 h-4" />
                      Focus Indicator
                    </span>
                    {accessibility.focusIndicator && <span className="text-xs">ON</span>}
                  </button>
                </div>
              </div>

              {/* Motion Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Motion
                </h4>
                <button
                  onClick={accessibility.toggleReducedMotion}
                  className={`flex items-center justify-between w-full p-2 rounded-md text-sm transition-colors ${
                    accessibility.reducedMotion
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <EyeOff className="w-4 h-4" />
                    Reduced Motion
                  </span>
                  {accessibility.reducedMotion && <span className="text-xs">ON</span>}
                </button>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  accessibility.resetFontSize();
                  accessibility.resetZoom();
                  setHighContrast(false);
                  setReducedMotion(false);
                }}
                className="w-full p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Custom hook to use accessibility context
 */
export function useAccessibility(): AccessibilityContextType | undefined {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

export default AccessibilityProvider;
