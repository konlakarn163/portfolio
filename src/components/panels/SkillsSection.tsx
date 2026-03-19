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

  const defaultColor = {
    text: "text-cyan-400/80 dark:text-cyan-400/30",
    accent: "text-cyan-400",
    bg: "bg-cyan-400",
    border: "border-cyan-400/20",
  };

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
              const color = colors[i % colors.length] ?? defaultColor;
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
              const color = colors[i % colors.length] ?? defaultColor;
              const stackIcons = getArray(group.skills).map(
                (skill) => iconMap[skill.trim()] ?? FiDatabase,
              );

              return (
                <div
                  key={`desktop-${i}`}
                  className={`hover-scale relative w-full group desktop-row border-b border-slate-700 dark:border-white/5 overflow-hidden bg-transparent ${i === 0 ? "border-t" : ""}`}
                >
                  <div className="absolute inset-0 z-0 bg-gray-900 dark:bg-white origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

                  <div className="relative z-10 min-h-[190px] flex items-center gap-4 flex-col justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-[clamp(1rem,8vw,2rem)] uppercase tracking-tight font-header font-bold text-center text-[color:var(--fg)]">
                      {t(group.key)}
                    </h3>
                    <div className={`flex items-center`}>
                      {stackIcons.map((Icon, idx) => (
                        <span
                          key={`stack-${i}-${idx}`}
                          className={`${`z-[${idx + 1}]`} bg-white dark:bg-gray-900 shadow-xl  h-11 w-11 rounded-full border border-white/20  flex items-center justify-center ${idx !== 0 ? "-ml-3" : ""}`}
                        >
                          <Icon className={`text-base ${color.accent}`} />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute inset-0 z-20 flex items-center opacity-0 group-hover:opacity-100 [clip-path:inset(50%_0_50%_0)] group-hover:[clip-path:inset(0%_0_0%_0)] transition-[clip-path,opacity] duration-500 ease-out pointer-events-none group-hover:pointer-events-auto cursor-pointer">
                    <SkillMarquee
                      text={formatText(group.skills)}
                      skillsArray={getArray(group.skills)}
                      speed={20}
                      accentColor={color.accent}
                    />
                  </div>
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
