import React, { useLayoutEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RollingPillProps = {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  duration?: number;
  delay?: number;
};

export default function RollingPill({
  children,
  className = "",
  direction = "left",
  duration = 1,
  delay = 0,
}: RollingPillProps) {
  const wrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrap.current) return;

      const screenWidth = window.innerWidth;
      const fromX = direction === "left" ? -screenWidth : screenWidth;
      const fromRotate = direction === "left" ? -90 : 90;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(wrap.current, {
        x: fromX,
        rotate: fromRotate,
        opacity: 0,
        delay,
        duration: duration,
      });
    }, wrap);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div className="col-span-1 hidden sm:flex">
      <div ref={wrap} className={className}>
        {children}
      </div>
    </div>
  );
}
