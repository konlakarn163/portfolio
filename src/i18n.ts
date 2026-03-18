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

const en = { ...enCommon, ...enHero, ...enHome, ...enProjects, ...enAbout, ...enSkills, ...enExperience, ...enContact };

// initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en'],
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
