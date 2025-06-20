'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-6 w-6" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map(lang => (
          <DropdownMenuItem key={lang} onSelect={() => setLanguage(lang)}>
            {lang}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// AI Guidance: This component allows users to switch between English, Urdu, Arabic, and Chinese.
// It uses the LanguageContext to update the language state across the app.
// The component now uses a DropdownMenu for a more modern UI and populates the language options dynamically from the LanguageContext.
