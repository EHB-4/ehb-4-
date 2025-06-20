'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your translation content
interface TranslationContent {
  readonly mission: {
    readonly title: string;
    readonly text: string;
  };
  readonly vision: {
    readonly title: string;
    readonly text: string;
  };
  readonly coreValues: {
    readonly title: string;
    readonly values: readonly {
      readonly title: string;
      readonly text: string;
    }[];
  };
  // Add other sections as needed
}

// Define the translations for each language
const translations = {
  'Roman Urdu': {
    mission: {
      title: 'EHB Ka Maqsad',
      text: 'Duniya bhar ke logon ko 100% verified, quality services aur products faraham karna – har shaks, har business, har service provider, aur har product ka mukammal verification, taake fraud, dhoka, ya ghair-mutmaeen services ka khatma ho sake. EHB har customer ko digital trust, transparency, aur global access dena chahta hai.',
    },
    vision: {
      title: 'EHB ka Vision',
      text: 'Agle 5 se 10 saal mein EHB Technologies duniya ka sab se bara, multi-service, AI-powered aur blockchain-based digital ecosystem ban jayega, jahan par har country, har shehar, aur har user apne area ki services ko verified tarike se use kar sakayga. Har service, har product, har transaction, aur har complaint, blockchain aur AI ki madad se transparent aur secure ho gi.',
    },
    coreValues: {
      title: 'Buniyadi Usool',
      values: [
        {
          title: 'Jiddat (Innovation)',
          text: 'Naye ideas, new technology aur behtareen solutions laana.',
        },
        {
          title: 'Customer Pehli Tarjeeh (Customer-First)',
          text: 'Har faislay mein customer ki behtari ko pehli tarjeeh dena.',
        },
        {
          title: 'Imandari (Integrity)',
          text: 'Har amal mein sachai, transparency aur zimmedari rakhna.',
        },
        {
          title: 'Zimmedari aur Accountability',
          text: 'Har department, franchise, aur user apni zimmedari ko samjhe aur poori kare.',
        },
        {
          title: 'Bharosa aur Transparency',
          text: 'Sab kuch open aur verify ho, kisi ko bhi kisi chez per shaq na ho.',
        },
      ],
    },
  },
  English: {
    mission: {
      title: 'EHB Mission',
      text: 'To provide 100% verified, quality services and products to people worldwide – complete verification of every person, business, service provider, and product to eliminate fraud, deception, and unsatisfactory services. EHB aims to give every customer digital trust, transparency, and global access.',
    },
    vision: {
      title: 'EHB Vision',
      text: "In the next 5 to 10 years, EHB Technologies will become the world's largest, multi-service, AI-powered, and blockchain-based digital ecosystem, where every country, city, and user can use their local services in a verified manner. Every service, product, transaction, and complaint will be transparent and secure with the help of blockchain and AI.",
    },
    coreValues: {
      title: 'Core Values',
      values: [
        {
          title: 'Innovation',
          text: 'Bringing new ideas, new technology, and the best solutions.',
        },
        {
          title: 'Customer-First',
          text: "Prioritizing the customer's best interest in every decision.",
        },
        {
          title: 'Integrity',
          text: 'Maintaining truth, transparency, and responsibility in every action.',
        },
        {
          title: 'Responsibility and Accountability',
          text: 'Every department, franchise, and user understands and fulfills their responsibility.',
        },
        {
          title: 'Trust and Transparency',
          text: 'Everything is open and verifiable, so no one has any doubts.',
        },
      ],
    },
  },
  // We can add more languages here, for example Urdu
} as const;

type AvailableLanguages = keyof typeof translations;

// Define the context shape
interface LanguageContextType {
  language: AvailableLanguages;
  setLanguage: (language: AvailableLanguages) => void;
  t: TranslationContent;
  availableLanguages: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<AvailableLanguages>('Roman Urdu');

  const t = translations[language];
  const availableLanguages = Object.keys(translations);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// AI Guidance: This context allows you to switch between English and Urdu across the app.
// Wrap your app with <LanguageProvider> in _app.tsx or layout.tsx.
