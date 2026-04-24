import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('votewise-language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('votewise-language', language);
  }, [language]);

  function t(key) {
    return translations[language]?.[key] || key;
  }

  function toggleLanguage() {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}