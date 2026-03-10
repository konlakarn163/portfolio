import { useTranslation } from 'react-i18next';
import TextAnimated from "../anim/TextAnimated";
type HeroTitleProps = {
  title?: string;
  subtitle?: string;
  top?: string;
  className?: string;
};

export default function HeroTitle({
  title,
  subtitle,
  top = "top-[clamp(1rem,10vw,4rem)]",
  className = "",
}: HeroTitleProps) {
  const { t } = useTranslation();
  const displayTitle = title || t('hero.title', 'FULLSTACK');
  const displaySubtitle = subtitle || t('hero.subtitle', 'DEVELOPER');

  return (
    <TextAnimated
      position="top-center"
      topClass="top-24 md:top-[clamp(1rem,10vw,4rem)]"
      direction="up" 
      unit="word" 
      distance={50}
     duration={2.5}
      stagger={0.06}
    >
      <>
        <p className="hover-scale font-bold text-center leading-tight text-[clamp(2rem,10vw,8rem)] font-header text-slate-700 dark:text-white">
          {displayTitle}
        </p>
        <p className="font-bold text-center leading-tight text-[clamp(1rem,10vw,4rem)] text-slate-700 dark:text-white">
          {displaySubtitle}
        </p>
      </>
    </TextAnimated>
  );
}
