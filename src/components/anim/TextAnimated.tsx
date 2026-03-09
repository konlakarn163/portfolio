import {
  useLayoutEffect,
  useRef,
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement,
} from "react";
import gsap from "gsap";

type Direction = "up" | "down" | "left" | "right";
type Unit = "all" | "word" | "char";
type Position =
  | "top-center"
  | "center"
  | "bottom-center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "custom";

type TextAnimatedProps = {
  children: ReactNode;
  className?: string;
  position?: Position;
  topClass?: string;
  direction?: Direction;
  unit?: Unit;
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  once?: boolean;
  ease?: string;
};

export default function TextAnimated({
  children,
  className = "",
  position = "top-center",
  topClass = "top-[clamp(1rem,10vw,4rem)]",
  direction = "up",
  unit = "word",
  distance = 24,
  duration = 0.7,
  delay = 0,
  stagger = 0.04,
  once = true,
  ease = "power3.out",
}: TextAnimatedProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const posClass = (() => {
    if (position === "custom") return "";
    const base = "absolute";
    const map: Record<Exclude<Position, "custom">, string> = {
      "top-center": `${base} ${topClass} left-1/2 -translate-x-1/2`,
      center: `${base} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
      "bottom-center": `${base} bottom-8 left-1/2 -translate-x-1/2`,
      "top-left": `${base} ${topClass} left-6`,
      "top-right": `${base} ${topClass} right-6`,
      "bottom-left": `${base} bottom-8 left-6`,
      "bottom-right": `${base} bottom-8 right-6`,
    };
    return map[position as Exclude<Position, "custom">] ?? "";
  })();

  useLayoutEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const lines = Array.from(root.children) as HTMLElement[];

      const fromVars = (() => {
        switch (direction) {
          case "up":
            return { y: distance };
          case "down":
            return { y: -distance };
          case "left":
            return { x: distance };
          case "right":
            return { x: -distance };
          default:
            return { y: distance };
        }
      })();

      if (unit === "all") {
        gsap.from(lines, {
          ...fromVars,
          opacity: 0,
          duration,
          delay,
          ease,
          stagger: 0.08,
          clearProps: "all",
        });
        return;
      }

      const createdSpans: HTMLElement[] = [];

      const splitWords = (text: string) =>
        text.split(/(\s+)/).map((t) => (t === " " ? "\u00A0" : t));

      const splitChars = (text: string) =>
        Array.from(text).map((c) => (c === " " ? "\u00A0" : c));

      lines.forEach((el) => {
        const text = el.textContent ?? "";
        const tokens = unit === "word" ? splitWords(text) : splitChars(text);

        el.textContent = "";
        tokens.forEach((tk) => {
          const span = document.createElement("span");
          span.textContent = tk;
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          el.appendChild(span);
          if (tk.trim() !== "" || unit === "char") {
            createdSpans.push(span);
          }
        });
      });

      gsap.from(createdSpans, {
        ...fromVars,
        opacity: 0,
        duration,
        delay,
        ease,
        stagger,
        clearProps: "all",
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [direction, unit, distance, duration, delay, stagger, ease, once]);

  const safeChildren = isValidElement(children)
    ? cloneElement(children as ReactElement, {
        className: (children as any).props?.className ?? "",
      })
    : children;

  return (
    <div
      ref={wrapRef}
      className={[posClass, className].filter(Boolean).join(" ")}
    >
      {safeChildren}
    </div>
  );
}
