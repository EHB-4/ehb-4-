'use client';

import React, { useState } from 'react';
import { Globe, Languages, Check } from 'lucide-react';

// Roman Urdu: Translation data
const translations = {
  en: {
    jobs: 'Jobs',
    candidates: 'Candidates',
    interviews: 'Interviews',
    analytics: 'Analytics',
    dashboard: 'Dashboard',
    search: 'Search',
    filter: 'Filter',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
  },
  ur: {
    jobs: 'نوکریاں',
    candidates: 'امیدوار',
    interviews: 'انٹرویوز',
    analytics: 'تجزیہ',
    dashboard: 'ڈیش بورڈ',
    search: 'تلاش',
    filter: 'فلٹر',
    view: 'دیکھیں',
    edit: 'ترمیم',
    delete: 'حذف',
    save: 'محفوظ',
    cancel: 'منسوخ',
    submit: 'جمع',
    loading: 'لوڈ ہو رہا ہے...',
    success: 'کامیاب',
    error: 'غلطی',
    warning: 'انتباہ',
    info: 'معلومات',
  },
  ar: {
    jobs: 'الوظائف',
    candidates: 'المرشحون',
    interviews: 'المقابلات',
    analytics: 'التحليلات',
    dashboard: 'لوحة التحكم',
    search: 'البحث',
    filter: 'الفلتر',
    view: 'عرض',
    edit: 'تحرير',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    submit: 'إرسال',
    loading: 'جاري التحميل...',
    success: 'نجح',
    error: 'خطأ',
    warning: 'تحذير',
    info: 'معلومات',
  },
};

interface MultiLanguageSupportProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

/**
 * Roman Urdu: Multi-language Support Component
 * Urdu aur Arabic translations support karta hai
 */
export default function MultiLanguageSupport({
  currentLanguage,
  onLanguageChange,
}: MultiLanguageSupportProps) {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="relative">
      {/* Language Selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Globe className="h-4 w-4" />
        <span>{languages.find(lang => lang.code === currentLanguage)?.flag}</span>
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === currentLanguage)?.name}
        </span>
      </button>

      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {languages.map(language => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 ${
                currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="flex-1">{language.name}</span>
              {currentLanguage === language.code && <Check className="h-4 w-4 text-blue-600" />}
            </button>
          ))}
        </div>
      )}

      {/* Translation Preview */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Translation Preview:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
          <div>
            <strong>Jobs:</strong> {t.jobs}
          </div>
          <div>
            <strong>Candidates:</strong> {t.candidates}
          </div>
          <div>
            <strong>Interviews:</strong> {t.interviews}
          </div>
          <div>
            <strong>Analytics:</strong> {t.analytics}
          </div>
          <div>
            <strong>Dashboard:</strong> {t.dashboard}
          </div>
          <div>
            <strong>Search:</strong> {t.search}
          </div>
        </div>
      </div>
    </div>
  );
}
