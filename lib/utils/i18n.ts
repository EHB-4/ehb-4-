import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Supported languages
export const supportedLanguages = [
  'en', // English
  'ur', // Urdu
  'ar', // Arabic
  'zh', // Chinese
  'fr', // French
  'es', // Spanish
  'de', // German
  'ru', // Russian
  // Add more as needed
];

// i18n initialization
if (!i18n.isInitialized) {
  i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs: supportedLanguages,
      debug: false,
      interpolation: {
        escapeValue: false, // React already escapes
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
