import { SiFacebook, SiLine, SiLinkedin, SiGithub } from "react-icons/si";
import { useTranslation } from "react-i18next";
import HeroTitle from "@/components/hero/HeroTitle";
import LeftIntro from "@/components/hero/LeftIntro";
import RightSocialRail from "@/components/hero/RightSocialRail";
import HeroImage from "@/components/hero/HeroImage";
import { ReactNode, useRef, useState } from "react";
import gsap from "gsap";

type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
  colorClass?: string;
};

export default function PanelHero() {
  const { t } = useTranslation();
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const toggleImage = () => {
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      opacity: isVisible ? 0 : 1,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => setIsVisible(!isVisible),
    });
  };

  const links: SocialLink[] = [
    {
      label: "GitHub",
      href: "https://github.com/konlakarn163",
      icon: <SiGithub size={20} />,
      colorClass: "text-[color:var(--fg)]",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/konlakarn-buapian-138271267",
      icon: <SiLinkedin size={20} />,
      colorClass: "text-sky-400",
    },
    {
      label: "Facebook",
      href: "https://facebook.com/bass.konlakarn",
      icon: <SiFacebook size={20} />,
      colorClass: "text-blue-400",
    },
    {
      label: "LINE",
      href: "https://line.me/ti/p/konlakarn",
      icon: <SiLine size={20} />,
      colorClass: "text-green-400",
    },
  ];

  return (
    <div className="w-full px-6 min-h-[100svh] container mx-auto flex items-center justify-center relative font-header pt-16 pb-24 md:pb-0">
      <HeroTitle />

      <div onClick={toggleImage} className="cursor-pointer z-20">
        <LeftIntro
          name={t("hero.name")}
          introText={t("hero.intro", { name: t("hero.name") })}
          highlightText={t("hero.highlight")}
          highlightClass="text-cyan-500"
          description={t("hero.description")}
          className=""
        />
      </div>

      <RightSocialRail links={links} className="z-40" />

      <div ref={imageRef} onClick={toggleImage} className="cursor-pointer z-30">
        <HeroImage />
      </div>
    </div>
  );
}
