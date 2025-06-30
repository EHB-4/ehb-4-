import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-700">
        Language:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'ur')}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="ur">Urdu</option>
      </select>
    </div>
  );
}

// AI Guidance: This component allows users to switch between English and Urdu.
// It uses the LanguageContext to update the language state across the app. 