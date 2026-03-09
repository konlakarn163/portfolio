import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type MarqueeProps = {
  text: string;
  speed?: number; 
  className?: string;
  textClassName?: string;
  reverse?: boolean;
};

export default function AutoMarquee({
  text,
  speed = 20,
  className = "",
  textClassName = "",
  reverse = false,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const distance = wrapper.offsetWidth / 2;

    const ctx = gsap.context(() => {
      gsap.to(wrapper, {
        x: reverse ? distance : -distance,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    }, container);

    return () => ctx.revert();
  }, [speed, reverse]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ width: "100%" }}
    >
      <div ref={wrapperRef} className="inline-flex w-max">
        <span className={`inline-block px-4 ${textClassName}`}>{text}</span>
        <span className={`inline-block px-4 ${textClassName}`}>{text}</span>
      </div>
    </div>
  );
}
