import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const magTextRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (magTextRef.current) {
        const target = magTextRef.current;

        const onMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = target.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);

          gsap.to(target, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        const onMouseLeave = () => {
          gsap.to(target, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        };

        target.addEventListener("mousemove", onMouseMove);
        target.addEventListener("mouseleave", onMouseLeave);
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t border-neutral-200/60 dark:border-neutral-800/60 relative z-10 bg-transparent"
    >
      <div className="mx-auto container px-4 py-6 text-sm text-neutral-500 flex items-center justify-between">
        <div className="">
          <p
            ref={magTextRef}
            className="cursor-default select-none inline-block font-medium hover:text-cyan-500 transition-colors duration-300"
          >
            © {new Date().getFullYear()} Konlakarn Buapian
          </p>
        </div>

        <div className="flex gap-6">
          <span className="opacity-70 text-xs uppercase tracking-widest">
            Built with Passion
          </span>
        </div>
      </div>
    </footer>
  );
}
