import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

type FadeInProps = {
  children: React.ReactNode;
  duration?: number; 
  delay?: number; 
  fromY?: number;
  className?: string;
};

export default function FadeIn({
  children,
  duration = 0.8,
  delay = 0,
  fromY = 20,
  className = "",
}: FadeInProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elRef.current) return;

    gsap.fromTo(
      elRef.current,
      { opacity: 0, y: fromY },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
      }
    );
  }, [duration, delay, fromY]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
