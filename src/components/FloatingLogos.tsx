import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript,
  SiTailwindcss, SiMongodb, SiFigma,
  SiVite, SiExpress, SiJavascript, SiRedux
} from "react-icons/si";

const LOGOS = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Zustand", type: "text" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "METRO CAT", type: "text" },
  { name: "SQL Server", type: "text" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Top Cloud", type: "text" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "C.I.Group", type: "text" },
  { name: "Vite", Icon: SiVite, color: "#646CFF" },
  { name: "Express", Icon: SiExpress, color: "#000000" },
  { name: "Redux", Icon: SiRedux, color: "#764ABC" },
  { name: "Paiduay", type: "text" },
  { name: "Artisan", type: "text" },
];

export default function FloatingLogos({ 
  className = "", 
  justify = "center" 
}: { 
  className?: string; 
  justify?: "center" | "start" | "end" 
}) {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      [column1Ref, column2Ref].forEach((ref, i) => {
        if (!ref.current) return;
        const col = ref.current;
        const totalHeight = col.scrollHeight / 2;

        gsap.to(col, {
          y: i === 0 ? -totalHeight : totalHeight,
          duration: 35 + i * 10,
          ease: "none",
          repeat: -1,
          modifiers: {
            y: gsap.utils.unitize((y) => {
              const val = parseFloat(y);
              if (i === 0) {
                return val % totalHeight;
              } else {
                const wrapped = val % totalHeight;
                return wrapped > 0 ? wrapped - totalHeight : wrapped;
              }
            })
          }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const renderCol = (ref: React.RefObject<HTMLDivElement>, reverse = false) => {
    const list = reverse ? [...LOGOS].reverse() : LOGOS;
    return (
      <div
        ref={ref}
        className="flex flex-col gap-8 py-8 h-fit"
        style={{ willChange: "transform" }}
      >
        {[...list, ...list].map((logo, idx) => (
          <div
            key={`${logo.name}-${idx}`}
            className="w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center p-4 rounded-[2rem] bg-[color:var(--bg-alt)] border border-[color:var(--border)] shadow-sm hover:scale-105 transition-transform duration-500 cursor-default group no-blend-zone"
          >
            {logo.Icon ? (
              <logo.Icon className="text-3xl md:text-5xl mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ color: logo.color }} />
            ) : (
              <span className="text-[10px] md:text-sm font-header font-bold text-center leading-tight opacity-40 group-hover:opacity-100 transition-opacity duration-500 uppercase tracking-tighter">
                {logo.name}
              </span>
            )}
            <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest opacity-20 group-hover:opacity-50 transition-opacity duration-500">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const justifyClass = {
    center: "justify-center",
    start: "justify-start",
    end: "justify-end"
  }[justify];

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-10 lg:opacity-25 ${className}`}>
      <div
        className={`flex ${justifyClass} gap-10 md:gap-20 h-full w-full`}
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <div className="hidden sm:block">
          {renderCol(column1Ref)}
        </div>
        <div className="hidden lg:block">
          {renderCol(column2Ref, true)}
        </div>
      </div>
    </div>
  );
}

