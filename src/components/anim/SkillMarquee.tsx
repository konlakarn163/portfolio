import { useLayoutEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const setupAnimation = () => {
        if (tl.current) tl.current.kill();
        const xDist = wrapper.offsetWidth / 2;

        tl.current = gsap.timeline().to(wrapper, {
          x: reverse ? xDist : -xDist,
          duration: speed,
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
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", () => {});
    };
  }, [speed, reverse, text]);

  const handleEnter = () => {
    tl.current?.pause();
    gsap.to(gridRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  const handleLeave = () => {
    tl.current?.play();
    gsap.to(gridRef.current, { opacity: 0, y: 10, scale: 0.95, duration: 0.3, ease: "power2.in" });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-6 md:py-10 select-none group border-b border-white/5 cursor-default"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
    >
      <div
        ref={wrapperRef}
        className={`inline-flex items-center gap-8 md:gap-12 w-max transition-all duration-500 group-hover:opacity-5 group-hover:blur-sm ${
          reverse ? "-translate-x-1/2" : ""
        }`}
      >
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`text-[clamp(2rem,10vw,6rem)] uppercase tracking-tighter ${className}`}
          >
            {text} <span className="mx-4 md:mx-8 text-white/10">•</span>
          </span>
        ))}
      </div>

      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0 pointer-events-none flex items-center justify-center px-4"
        style={{ transform: "translateY(10px) scale(0.95)" }}
      >
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-6xl">
          {skillsArray.map((skill, idx) => {
            const cleanSkill = skill.trim();
            const Icon = iconMap[cleanSkill] ?? FiDatabase;

            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-6 md:py-3 rounded-md border border-white/10 bg-white/5 backdrop-blur-xl text-xs md:text-xl font-bold ${accentColor} shadow-2xl whitespace-nowrap`}
              >
                <Icon className="text-sm md:text-base" />
                {cleanSkill}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};