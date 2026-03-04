import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type AnimatedHeadlineProps = {
  left: React.ReactNode; 
  right: React.ReactNode;
  className?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  duration?: number;
  delay?: number;
};

export default function AnimatedHeadline({
  left,
  right,
  before,
  after,
  className = "",
  duration = 0.8,
  delay = 0.15,
}: AnimatedHeadlineProps) {
  const root = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(".ah-char");
      gsap.set(chars, { yPercent: 120, rotate: 6, opacity: 0 });
      gsap.to(chars, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        ease: "power3.out",
        duration,
        stagger: {
          from: "random",
          each: 0.03,
        },
      });
      gsap.fromTo(
        ".ah-sym",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: delay }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const renderMixed = (node: React.ReactNode) => {
    return React.Children.toArray(node).flatMap((child, idx) => {
      if (typeof child === "string") {
        return child.split("").map((ch, i) => (
          <span
            key={`t-${idx}-${i}`}
            className="ah-char inline-block will-change-transform"
          >
            {ch === " " ? <span className="inline-block w-2" /> : ch}
          </span>
        ));
      }
      return (
        <span
          key={`e-${idx}`}
          className="ah-char inline-block will-change-transform align-middle"
        >
          {child}
        </span>
      );
    });
  };
  return (
    <h2 ref={root} className={className}>
      <span className="inline-block">{renderMixed(left)}</span>{" "}
      {before && (
        <span className="ah-sym align-middle inline-block">{before}</span>
      )}{" "}
      <span className="inline-block">{renderMixed(right)}</span>{" "}
      {after && (
        <span className="ah-sym align-middle inline-block">{after}</span>
      )}
    </h2>
  );
}
