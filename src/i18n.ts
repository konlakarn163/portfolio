import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ── EN ──────────────────────────────────────────────
import enCommon     from './locales/en/common.json';
import enHero       from './locales/en/hero.json';
import enHome       from './locales/en/home.json';
import enProjects   from './locales/en/projects.json';
import enAbout      from './locales/en/about.json';
import enSkills     from './locales/en/skills.json';
import enExperience from './locales/en/experience.json';
import enContact    from './locales/en/contact.json';

// ── TH ──────────────────────────────────────────────
import thCommon     from './locales/th/common.json';
import thHero       from './locales/th/hero.json';
import thHome       from './locales/th/home.json';
import thProjects   from './locales/th/projects.json';
import thAbout      from './locales/th/about.json';
import thSkills     from './locales/th/skills.json';
import thExperience from './locales/th/experience.json';
import thContact    from './locales/th/contact.json';

const en = { ...enCommon, ...enHero, ...enHome, ...enProjects, ...enAbout, ...enSkills, ...enExperience, ...enContact };
const th = { ...thCommon, ...thHero, ...thHome, ...thProjects, ...thAbout, ...thSkills, ...thExperience, ...thContact };

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
