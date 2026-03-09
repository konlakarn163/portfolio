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
        className={`px-2 py-1 rounded text-sm font-medium border transition-colors duration-200 ${
          i18n.language === 'en'
            ? 'bg-[color:var(--accent)] text-[color:var(--accent-fg)] border-transparent'
            : 'bg-[color:var(--surface)] text-[color:var(--fg)] border-[color:var(--border)] hover:bg-[color:var(--surface-2)]'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('th')}
        className={`px-2 py-1 rounded text-sm font-medium border transition-colors duration-200 ${
          i18n.language === 'th'
            ? 'bg-[color:var(--accent)] text-[color:var(--accent-fg)] border-transparent'
            : 'bg-[color:var(--surface)] text-[color:var(--fg)] border-[color:var(--border)] hover:bg-[color:var(--surface-2)]'
        }`}
      >
        TH
      </button>
    </div>
  );
}
