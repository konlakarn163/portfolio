import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useCallback } from 'react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng: string) => {
      const root = document.getElementById('root');
      if (root) {
        gsap.to(root, {
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            i18n.changeLanguage(lng).then(() => {
              gsap.to(root, { opacity: 1, duration: 0.25 });
            });
          },
        });
      } else {
        i18n.changeLanguage(lng);
      }
    },
    [i18n]
  );

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded text-sm font-medium transition-colors duration-200 ${
          i18n.language === 'en'
            ? 'bg-white text-black'
            : 'bg-white/20 text-white hover:bg-white/40'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('th')}
        className={`px-2 py-1 rounded text-sm font-medium transition-colors duration-200 ${
          i18n.language === 'th'
            ? 'bg-white text-black'
            : 'bg-white/20 text-white hover:bg-white/40'
        }`}
      >
        TH
      </button>
    </div>
  );
}
