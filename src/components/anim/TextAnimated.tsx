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
  | "custom"; // ไม่ใส่คลาสตำแหน่งให้ (ใช้ className เอง)

type TextAnimatedProps = {
  children: ReactNode; // ส่ง <p>FRONTEND</p><p>DEVELOPER</p> ได้เลย
  className?: string; // คลาสของ wrapper
  position?: Position; // เลือกตำแหน่งวาง
  topClass?: string; // ใช้กับ *-top-* (เช่น top-[clamp(1rem,10vw,4rem)])
  direction?: Direction; // ทิศที่สไลด์เข้า
  unit?: Unit; // all / word / char
  distance?: number; // px ที่เริ่ม offset
  duration?: number; // วินาที
  delay?: number; // วินาที
  stagger?: number; // เวลาหน่วงระหว่างตัวอักษร/คำ
  once?: boolean; // true = เล่นครั้งเดียว
  ease?: string; // gsap ease
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

  // สร้างคลาสตำแหน่งอัตโนมัติ
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
      // เลือกทุก element ลูกระดับแรกเพื่ออนิเมต (เช่น <p>FRONTEND</p>, <p>DEVELOPER</p>)
      const lines = Array.from(root.children) as HTMLElement[];

      // ช่วย map ทิศเป็นแกน/ระยะเริ่มต้น
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
        }
      })();

      // ถ้า unit = all → ไม่ต้อง split, เล่นรวมทั้งบล็อก
      if (unit === "all") {
        gsap.from(lines, {
          ...fromVars,
          opacity: 0,
          duration,
          delay,
          ease,
          stagger: 0.08, // แต่ละบรรทัดหน่วงเล็กน้อย
          clearProps: "all",
        });
        return;
      }

      // unit = word / char → split เป็น span แล้วอนิเมตแบบ stagger
      const createdSpans: HTMLElement[] = [];

      const splitWords = (text: string) =>
        text.split(/(\s+)/).map((t) => (t === " " ? "\u00A0" : t)); // เก็บช่องว่าง

      const splitChars = (text: string) =>
        Array.from(text).map((c) => (c === " " ? "\u00A0" : c));

      lines.forEach((el) => {
        const text = el.textContent ?? "";
        const tokens = unit === "word" ? splitWords(text) : splitChars(text);

        // สร้าง spans
        el.textContent = ""; // เคลียร์ก่อน
        tokens.forEach((tk) => {
          const span = document.createElement("span");
          span.textContent = tk;
          // inline-block เพื่อให้ transform ได้สวย และให้ wrapping ธรรมชาติ
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          el.appendChild(span);
          if (tk.trim() !== "" || unit === "char") createdSpans.push(span);
        });
      });

      // เล่นอนิเมชัน
      gsap.from(createdSpans, {
        ...fromVars,
        opacity: 0,
        duration,
        delay,
        ease,
        stagger,
        clearProps: "all",
      });

      // ถ้าอยากให้เล่นครั้งเดียวจริง ๆ (เวลาเลื่อนกลับ) ให้ freeze ค่าไว้โดยไม่ reverse
      if (once) {
        // ไม่มี ScrollTrigger ที่นี่ เพราะตำแหน่งหัวเรื่องมักอยู่บนจออยู่แล้ว
        // ถ้าต้องการเล่นตอนเข้าจอเท่านั้น เพิ่ม observer/ScrollTrigger ตามต้องการ
      }
    }, wrapRef);

    return () => ctx.revert();
  }, [direction, unit, distance, duration, delay, stagger, ease, once]);

  // ให้ children ผ่านโดยไม่แตะโครงสร้าง (เราจะแทรก spans ตอน runtime)
  const safeChildren = isValidElement(children)
    ? cloneElement(children as ReactElement, {
        // รวม className เดิมของลูก
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
