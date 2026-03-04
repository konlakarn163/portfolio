import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import th from './locales/th.json';

// initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    th: {
      translation: th,
    },
  },
  // default language; can be overridden by localStorage or browser settings
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

// persist language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng);
});

export default i18n;
