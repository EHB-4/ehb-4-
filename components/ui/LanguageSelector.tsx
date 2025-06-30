import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../lib/utils/i18n';

const languageNames: Record<string, string> = {
  en: 'English',
  ur: 'اردو',
  ar: 'العربية',
  zh: '中文',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  ru: 'Русский',
};

/**
 * LanguageSelector - Dropdown for switching app language
 */
const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <label htmlFor="language-select" className="flex items-center gap-2">
      <span className="text-sm font-medium">🌐</span>
      <select
        id="language-select"
        value={currentLang}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-sm"
        aria-label="Select language"
      >
        {supportedLanguages.map(lng => (
          <option key={lng} value={lng}>
            {languageNames[lng] || lng}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelector;
