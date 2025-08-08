import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  onLanguageChange: (language: 'ru' | 'ua') => void;
  currentLanguage: 'ru' | 'ua';
}

export function LanguageSwitcher({ onLanguageChange, currentLanguage }: LanguageSwitcherProps) {
  return (
    <div className="bg-dark-accent rounded-lg p-1 flex">
      <Button
        variant={currentLanguage === 'ru' ? 'default' : 'ghost'}
        size="sm"
        className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
          currentLanguage === 'ru' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'text-slate-400 hover:text-slate-200 bg-transparent hover:bg-transparent'
        }`}
        onClick={() => onLanguageChange('ru')}
        data-testid="button-lang-ru"
      >
        РУ
      </Button>
      <Button
        variant={currentLanguage === 'ua' ? 'default' : 'ghost'}
        size="sm"
        className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
          currentLanguage === 'ua' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'text-slate-400 hover:text-slate-200 bg-transparent hover:bg-transparent'
        }`}
        onClick={() => onLanguageChange('ua')}
        data-testid="button-lang-ua"
      >
        УА
      </Button>
    </div>
  );
}
