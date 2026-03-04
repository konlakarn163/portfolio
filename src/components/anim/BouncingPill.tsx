import React, { useLayoutEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type BouncingPillProps = {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  duration?: number
};

export default function BouncingPill({
  children,
  className = "",
  direction = "left",
  delay = 0,
  duration = 1
}: BouncingPillProps) {
  const wrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let fromVars: gsap.TweenVars = {
        opacity: 0,
        scale: 0.8,
      };

      if (direction === "left") fromVars.x = -120;
      else if (direction === "right") fromVars.x = 120;
      else if (direction === "top") fromVars.y = -120;
      else if (direction === "bottom") fromVars.y = 120;

      gsap.fromTo(wrap.current, fromVars, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: duration,
        delay,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [direction, delay]);

  return (
    <div className="col-span-1 hidden sm:flex">
      <div
        ref={wrap}
        className={` ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
