import React, { useLayoutEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type ScaleInProps = {
  children: ReactNode;
  className?: string;

  duration?: number;
  delay?: number;
  ease?: string;

  triggerStart?: string;
  toggleActions?: string;

  transformOrigin?: string;

  opacityFrom?: number;
  opacityTo?: number;
  scaleFrom?: number;
  scaleTo?: number;

  scrub?: boolean | number;

  force3D?: boolean;
};

export default function ScaleIn({
  children,
  className = "",

  duration = 0.8,
  delay = 0,
  ease = "power3.out",

  triggerStart = "top 85%",
  toggleActions = "play none none reverse",

  transformOrigin = "center center",

  opacityFrom = 0,
  opacityTo = 1,
  scaleFrom = 0.9,
  scaleTo = 1,

  scrub = false,
  force3D = true,
}: ScaleInProps) {
  const el = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const target = el.current;
      if (!target) return;

      // โปรโมตเลเยอร์เพื่อให้ composited (ช่วยความลื่น)
      gsap.set(target, {
        willChange: "transform, opacity",
        force3D, // translateZ(0) ภายใน gsap
        transformOrigin,
      });

      const baseFrom = { scale: scaleFrom, autoAlpha: opacityFrom, y: 0 }; // autoAlpha = opacity+visibility
      const baseTo = {
        scale: scaleTo,
        autoAlpha: opacityTo,
        duration,
        delay,
        ease,
        onComplete: () => gsap.set(target, { willChange: "auto" }), // เคลียร์เมื่อจบ
      };

      if (scrub) {
        gsap.fromTo(target, baseFrom, {
          ...baseTo,
          scrollTrigger: {
            trigger: target,
            start: triggerStart,
            end: "bottom top",
            scrub: typeof scrub === "number" ? scrub : 0.5, // smoothing
          },
        });
      } else {
        gsap.fromTo(target, baseFrom, {
          ...baseTo,
          scrollTrigger: {
            trigger: target,
            start: triggerStart,
            toggleActions,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [
    duration,
    delay,
    ease,
    triggerStart,
    toggleActions,
    transformOrigin,
    opacityFrom,
    opacityTo,
    scaleFrom,
    scaleTo,
    scrub,
    force3D,
  ]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
