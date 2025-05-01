
import React from 'react';
import { useLanguage, Language, languageNames } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'buttons';
  className?: string;
}

export default function LanguageSelector({ variant = 'dropdown', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();

  if (variant === 'buttons') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {(Object.keys(languageNames) as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-2 py-1 text-xs rounded ${
              language === lang
                ? 'bg-agro-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {languageNames[lang]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className={`bg-transparent border rounded px-2 py-1 text-xs ${className}`}
      aria-label={t('footer.language')}
    >
      {(Object.keys(languageNames) as Language[]).map((lang) => (
        <option key={lang} value={lang}>
          {languageNames[lang]}
        </option>
      ))}
    </select>
  );
}
