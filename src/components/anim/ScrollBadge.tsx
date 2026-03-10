import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollBadge() {
  const badgeWrapperRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(badgeWrapperRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        scrollTrigger: {
          trigger: "body",
          start: "200px top",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(badgeRef.current, {
        rotation: 360,
        duration: 8, 
        repeat: -1,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={badgeWrapperRef}
      className="absolute bottom-22 md:bottom-10 left-2 md:left-10 z-[9999] cursor-pointer pointer-events-auto block opacity-0 scale-50 transition-transform hover:scale-110 active:scale-95"
      onClick={scrollToTop}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-16 h-16 md:w-28 md:h-28 rounded-full bg-cyan-500/5 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.1)]" />

        <div ref={badgeRef} className="relative w-20 h-20 md:w-40 md:h-40">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full fill-cyan-500 drop-shadow-[0_0_2px_rgba(6,182,212,0.5)]"
          >
            <path
              id="circlePath"
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="transparent"
            />
            <text className="text-[9px] uppercase tracking-[1.8px] font-black">
              <textPath xlinkHref="#circlePath">
                {` FULLSTACK — FRONTEND — DEVELOPER — `} 
              </textPath>
            </text>
          </svg>
        </div>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-cyan-500 text-[28px] font-black leading-none transform rotate-180 mb-1">
            ↓
          </span>
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
        </div>
      </div>
    </div>
  );
}
