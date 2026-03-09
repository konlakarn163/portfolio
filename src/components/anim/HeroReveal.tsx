import {
  useLayoutEffect,
  useRef,
  isValidElement,
  cloneElement,
  ReactElement,
  ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
type HeroRevealProps = {
  children: ReactNode;
  className?: string;
  target?: "child" | "self";
  scaleFrom?: number;
  scaleTo?: number;
  yFrom?: number;
  opacityFrom?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
  parallax?: number;
};

export default function HeroReveal({
  children,
  className = "",
  target = "child",
  scaleFrom = 0.88,
  scaleTo = 1,
  yFrom = 24,
  opacityFrom = 0,
  duration = 0.9,
  delay = 0.05,
  start = "top 100%",
  once = true,
  parallax = 0,
}: HeroRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement | null>(null);

  const childEl =
    target === "child" && isValidElement(children)
      ? cloneElement(children as ReactElement<any>, {
          ref: (node: HTMLElement) => {
            if (typeof (children as any).ref === "function") {
              (children as any).ref(node);
            }
            childRef.current = node;
          },
          className: [(children as any).props?.className ?? ""].join(" "),
        })
      : children;

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {
      const targetEl =
        target === "child" && childRef.current
          ? childRef.current
          : wrapRef.current;

      if (!targetEl) return;

      gsap.fromTo(
        targetEl,
        { scale: scaleFrom, opacity: opacityFrom, y: yFrom },
        {
          scale: scaleTo,
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          },
        }
      );

      if (parallax > 0) {
        gsap.to(targetEl, {
          yPercent: -Math.abs(parallax),
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, wrapRef);

    return () => ctx.revert();
  }, [
    target,
    scaleFrom,
    scaleTo,
    yFrom,
    opacityFrom,
    duration,
    delay,
    start,
    once,
    parallax,
  ]);

  return (
    <div ref={wrapRef} className={className}>
      {childEl}
    </div>
  );
}