import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-line", {
        y: "100%",
        rotateZ: 3,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".reveal-dash", {
        width: 0,
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-0 md:min-h-screen  px-4 md:px-10 flex flex-col justify-center text-[color:var(--fg)] overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto w-full md:py-32">
        
        {/* <div className="overflow-hidden mb-4">
          <h2 className="reveal-line text-[clamp(2.5rem,11vw,5rem)] font-bold uppercase leading-[0.9] tracking-tighter">
            {t("about.hero_1") || "Senior"}
          </h2>
        </div> */}

        <div className="flex items-center gap-4 md:gap-10 ml-[8vw] md:ml-[12vw] ">
          <div className="reveal-dash h-[2px] md:h-[3px] w-[10vw] md:w-[15vw] bg-[color:var(--fg)] opacity-50 hidden sm:block" />
          <h2 className="reveal-line text-[clamp(2.5rem,11vw,6rem)] font-bold uppercase leading-[0.9] tracking-tighter italic font-header text-cyan-500 dark:text-cyan-400">
            {t("about.hero_2") || "Frontend"}
          </h2>
        </div>

        <div className="overflow-hidden ml-[4vw] md:ml-[6vw] mb-10 md:mb-16 text-right mt-4">
          <h2 className="reveal-line text-[clamp(2.5rem,11vw,4rem)] font-bold uppercase leading-[0.9] tracking-tighter">
            {t("about.hero_3") || "Developer"}
          </h2>
        </div>

        <div className="ml-auto max-w-[90%] md:max-w-2xl mt-8 md:mt-0 px-4">
          <p className="text-base indent-12 md:text-xl lg:text-2xl leading-relaxed font-light text-[color:var(--fg-muted)] hover:text-[color:var(--fg)] transition-colors duration-500">
            {t("about.desc")}
          </p>
        </div>

      </div>
    </section>
  );
}