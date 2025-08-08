import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface LanguageSwitcherProps {
  onLanguageChange: (language: 'ru' | 'ua') => void;
  currentLanguage: 'ru' | 'ua';
}

const languages = [
  { code: 'ru', label: 'РУ' },
  { code: 'ua', label: 'UA' }
];

export function LanguageSwitcher({ onLanguageChange, currentLanguage }: LanguageSwitcherProps) {
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);
  
  return (
    <div className="bg-dark-accent rounded-lg p-1 flex">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? 'default' : 'ghost'}
          size="sm"
          className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
            currentLanguage === lang.code 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'text-slate-400 hover:text-slate-200 bg-transparent hover:bg-transparent'
          }`}
          onClick={() => onLanguageChange(lang.code as 'ru' | 'ua')}
          data-testid={`button-lang-${lang.code}`}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
}