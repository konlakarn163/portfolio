import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
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

type MarqueeProps = {
  text: string;
  skillsArray: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  accentColor?: string;
};

const iconMap: Record<string, IconType> = {
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
};

export const SkillMarquee = ({
  text,
  skillsArray,
  speed = 40,
  reverse = false,
  className = "",
  accentColor = "text-white",
}: MarqueeProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const miniWrapperRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const miniTl = useRef<gsap.core.Timeline | null>(null);
  const cleanSkills = useMemo(
    () => skillsArray.map((skill) => skill.trim()).filter(Boolean),
    [skillsArray],
  );
  const loopSkills = useMemo(
    () => [...cleanSkills, ...cleanSkills],
    [cleanSkills],
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const setupAnimation = () => {
        if (tl.current) tl.current.kill();
        if (miniTl.current) miniTl.current.kill();

        const xDist = wrapper.scrollWidth / 2;
        const fromX = reverse ? -xDist : 0;
        const toX = reverse ? 0 : -xDist;

        gsap.set(wrapper, { x: fromX });

        tl.current = gsap.timeline().to(wrapper, {
          x: toX,
          duration: speed,
          ease: "none",
          repeat: -1,
        });

        const miniWrapper = miniWrapperRef.current;
        if (!miniWrapper) return;

        const miniDist = miniWrapper.scrollWidth / 2;
        const miniFromX = reverse ? 0 : -miniDist;
        const miniToX = reverse ? -miniDist : 0;

        gsap.set(miniWrapper, { x: miniFromX });

        miniTl.current = gsap.timeline().to(miniWrapper, {
          x: miniToX,
          duration: Math.max(18, speed * 0.7),
          ease: "none",
          repeat: -1,
        });
      };

      setupAnimation();

      gsap.from(containerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      window.addEventListener("resize", setupAnimation);

      return () => {
        window.removeEventListener("resize", setupAnimation);
      };
    }, containerRef);

    return () => {
      tl.current?.kill();
      miniTl.current?.kill();
      ctx.revert();
    };
  }, [speed, reverse, text, cleanSkills]);

  return (
    <>
      <div
        ref={containerRef}
        onClick={() => setIsPopupOpen(true)}
        className="relative overflow-hidden py-8 md:py-10 pb-14 md:pb-16 select-none cursor-pointer"
      >
        <div
          ref={wrapperRef}
          className="inline-flex items-center gap-3 md:gap-4 w-max"
        >
          {loopSkills.map((skill, idx) => {
            const Icon = iconMap[skill] ?? FiDatabase;

            return (
              <span
                key={`${skill}-${idx}`}
                className={`flex items-center gap-2 px-4 py-4 md:px-8 md:py-4 text-white dark:text-gray-900 text-[clamp(2rem,2vw,4rem)] ${className}`}
              >
                <div className="rounded-full p-4 dark:bg-gray-900 bg-gray-100">
                  <Icon
                    className={`text-[clamp(2rem,2vw,4rem)] ${accentColor}`}
                  />
                </div>
                {skill}
              </span>
            );
          })}
        </div>

        <div className="absolute left-0 right-0 bottom-2 md:bottom-3 overflow-hidden pointer-events-none">
          <div
            ref={miniWrapperRef}
            className="inline-flex items-center gap-5 md:gap-6 w-max"
          >
            {[...cleanSkills, ...cleanSkills, ...cleanSkills].map((skill, idx) => (
              <span
                key={`mini-${skill}-${idx}`}
                className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/70 dark:text-black/70 whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isPopupOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsPopupOpen(false)}
          >
            <div
              className="relative z-[121] w-full max-w-2xl rounded-xl border border-white/15 bg-gray-900 dark:bg-white text-white dark:text-black p-5 md:p-7"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg md:text-xl font-semibold uppercase tracking-wide">
                  Skills List
                </h4>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="h-9 w-9 rounded-full border border-white/20 dark:border-black/20 text-base"
                >
                  ×
                </button>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {cleanSkills.map((skill, idx) => {
                  const Icon = iconMap[skill] ?? FiDatabase;

                  return (
                    <li
                      key={`popup-skill-${skill}-${idx}`}
                      className="flex items-center gap-2.5 rounded-lg border border-white/10 dark:border-black/10 px-3 py-2"
                    >
                      <Icon className="text-base" />
                      <span className="text-sm md:text-base">{skill}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
