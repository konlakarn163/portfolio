import React, { useLayoutEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { skillGroups } from "@/constant/skills";
import { SkillMarquee } from "../anim/SkillMarquee";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import {
  SiAdobexd,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiMongodb,
  SiMui,
  SiNodedotjs,
  SiNuxtdotjs,
  SiPostman,
  SiReact,
  SiRedux,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiJavascript,
  SiMysql,
} from "react-icons/si";
import { FiDatabase, FiLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = ({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const getArray = (s: string) => s.split(", ");
  const formatText = (s: string) => s.split(", ").join(" • ");

  const iconMap = useMemo<Record<string, IconType>>(
    () => ({
      "React.js": SiReact,
      "Nuxt.js": SiNuxtdotjs,
      "Vue.js": SiVuedotjs,
      "Tailwind CSS": SiTailwindcss,
      TypeScript: SiTypescript,
      Redux: SiRedux,
      Zustand: SiJavascript,
      MUI: SiMui,
      "Node.js": SiNodedotjs,
      "Express.js": SiExpress,
      "SSMS (SQL Server)": SiMysql,
      MongoDB: SiMongodb,
      Firebase: SiFirebase,
      "Socket.io": SiSocketdotio,
      Supabase: SiSupabase,
      Git: SiGit,
      Postman: SiPostman,
      Figma: SiFigma,
      "Adobe XD": SiAdobexd,
      "RESTful API": FiLink,
      "RESTful API Integration": FiLink,
    }),
    [],
  );

  const colors = [
    {
      text: "text-cyan-400/80 dark:text-cyan-400/30",
      accent: "text-cyan-400",
      bg: "bg-cyan-400",
      border: "border-cyan-400/20",
    },
    {
      text: "text-indigo-400/80 dark:text-indigo-400/30",
      accent: "text-indigo-400",
      bg: "bg-indigo-400",
      border: "border-indigo-400/20",
    },
    {
      text: "text-pink-400 dark:text-pink-400/30",
      accent: "text-pink-400",
      bg: "bg-pink-400",
      border: "border-pink-400/20",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mobile-skill-group", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mobile-grid",
          start: "top 85%",
        },
      });

      gsap.from(".desktop-row", {
        width: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".desktop-container",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={innerRef}
      className="py-12 md:py-32 bg-transparent overflow-hidden w-full flex flex-col items-center"
    >
      <div ref={containerRef} className="w-full flex flex-col items-center">
        <div className="px-6 mb-12 md:mb-20 w-full max-w-[1440px]">
          <h2 className="hover-scale text-4xl md:text-5xl font-header font-bold mb-10 md:mb-20 text-center uppercase tracking-tight">
            {t("skills.title")}
          </h2>
        </div>

        <div className="w-full px-6 md:px-0">
          {/* MOBILE */}
          <div className="md:hidden grid grid-cols-1 gap-10 mobile-grid">
            {skillGroups.map((group, i) => {
              const color = colors[i % colors.length];
              return (
                <div
                  key={`mobile-${i}`}
                  className="space-y-4 mobile-skill-group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-[2px] w-8 ${color.bg}`} />
                    <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-70">
                      {t(group.key)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getArray(group.skills).map((skill, idx) => {
                      const Icon = iconMap[skill.trim()] ?? FiDatabase;

                      return (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm border ${color.border} ${color.accent} bg-white/5 rounded-sm`}
                        >
                          <Icon className="text-xs" />
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/* DESKTOP */}
          <div className="hidden md:flex flex-col w-full border-t border-white/5 desktop-container">
            {skillGroups.map((group, i) => {
              const color = colors[i % colors.length];
              const isEven = i % 2 === 1;

              return (
                <div
                  key={`desktop-${i}`}
                  className="hover-scale relative w-full group desktop-row border-b border-white/5"
                >
                  <div
                    className={`absolute top-2 z-10 opacity-40 group-hover:opacity-100 transition-all duration-500
                    ${isEven ? "right-12 text-right" : "left-12"}`}
                  >
                    <span className="block text-[14px] font-mono uppercase tracking-[0.3em] mb-1">
                      {t(group.key)}
                    </span>
                    <div
                      className={`h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out ${color.bg} ${isEven ? "ml-auto" : ""}`}
                    />
                  </div>

                  <SkillMarquee
                    text={formatText(group.skills)}
                    skillsArray={getArray(group.skills)}
                    reverse={isEven}
                    speed={isEven ? 45 : 35}
                    className={color.text}
                    accentColor={color.accent}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
