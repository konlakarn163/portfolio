import React, { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PanelHero from "../components/panels/PanelHero";
import SkillsSection from "@/components/panels/SkillsSection";
import ExperienceSection from "@/components/panels/ExperienceSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useTranslation();
  const mainRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. Custom Mouse Effect ---
      const cursor = cursorRef.current;
      const outline = cursorOutlineRef.current;

      if (cursor && outline) {
        const onMouseMove = (e: MouseEvent) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "none",
          });
          gsap.to(outline, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        window.addEventListener("mousemove", onMouseMove);

        const targets = document.querySelectorAll("a, button, .skill-card, .feature-card, .exp-item");
        targets.forEach((target) => {
          target.addEventListener("mouseenter", () => {
            gsap.to(outline, { scale: 2.5, backgroundColor: "rgba(6, 182, 212, 0.1)", borderColor: "transparent", duration: 0.3 });
            gsap.to(cursor, { scale: 0.5, duration: 0.3 });
          });
          target.addEventListener("mouseleave", () => {
            gsap.to(outline, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(6, 182, 212, 0.5)", duration: 0.3 });
            gsap.to(cursor, { scale: 1, duration: 0.3 });
          });
        });
      }

      const magneticBtn = document.querySelector(".magnetic-target") as HTMLElement;
      if (magneticBtn) {
        magneticBtn.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = magneticBtn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(magneticBtn, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        magneticBtn.addEventListener("mouseleave", () => {
          gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
      }

      if (aboutRef.current) {
        gsap.from(aboutRef.current.querySelectorAll(".reveal-text"), {
          y: 30, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: aboutRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        });
      }

      if (skillsRef.current) {
        gsap.from(skillsRef.current.querySelectorAll(".skill-card"), {
          y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: skillsRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        });
      }

      if (expRef.current) {
        expRef.current.querySelectorAll(".exp-item").forEach((item) => {
          gsap.from(item, {
            opacity: 0, x: -20, duration: 1,
            scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none reverse" }
          });
        });
      }

      const features = mainRef.current?.querySelectorAll(".feature-card");
      if (features) {
        gsap.from(features, {
          scale: 0.95, opacity: 0, y: 20, stagger: 0.1, duration: 0.8,
          scrollTrigger: { trigger: features[0], start: "top 95%" }
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <div ref={mainRef} className="bg-[#0a0a0a] text-white font-body overflow-x-hidden selection:bg-cyan-500/30">
      
      <div ref={cursorRef} className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-cyan-500 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2" />
      <div ref={cursorOutlineRef} className="hidden md:block fixed top-0 left-0 w-10 h-10 border border-cyan-500/50 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />

      <PanelHero />

      <section ref={aboutRef} className="py-20 md:py-32 lg:py-48 px-6 flex flex-col items-center justify-center bg-[#0f0f0f]">
        <div className="max-w-4xl w-full text-center space-y-6 md:space-y-10 mb-20 md:mb-32 lg:mb-40">
          <span className="reveal-text inline-block text-cyan-500 font-mono tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm uppercase">
            / Professional Profile
          </span>
          <h2 className="reveal-text text-3xl md:text-5xl lg:text-6xl font-bold font-header tracking-tight leading-tight">
            {t("about.title")}
          </h2>
          <div className="reveal-text">
            <p className="text-white/60 text-lg md:text-xl lg:text-2xl leading-relaxed font-light italic max-w-3xl mx-auto">
              "{t("about.desc")}"
            </p>
          </div>
        </div>

        <div className="w-full space-y-24 md:space-y-48 lg:space-y-52">
          <SkillsSection innerRef={skillsRef} />
          <ExperienceSection innerRef={expRef} />
        </div>
      </section>

      <section className="py-24 md:py-32 lg:py-40 bg-[#0a0a0a] px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-header mb-16 md:mb-24 text-center uppercase tracking-widest">
            {t("home.whyChoose")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {[
              { title: t("home.features.performance"), desc: t("home.features.performanceDesc") },
              { title: t("home.features.scalability"), desc: t("home.features.scalabilityDesc") },
              { title: t("home.features.design"), desc: t("home.features.designDesc") },
            ].map((item, i) => (
              <div key={i} className="feature-card border-l-2 border-white/10 pl-6 md:pl-8 py-4 hover:border-cyan-500 transition-colors duration-500">
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 font-header text-white/90">{item.title}</h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 md:py-48 text-center bg-black overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 space-y-10 md:space-y-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-header font-black uppercase tracking-tighter">
            Let's <span className="text-cyan-500">Connect</span>
          </h2>
          <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto">{t("contact.desc")}</p>
          <div className="pt-8">
            <a
              href="mailto:buapian01@gmail.com"
              className="magnetic-target inline-flex items-center gap-4 md:gap-6 text-2xl md:text-4xl lg:text-5xl font-bold hover:text-cyan-500 transition-colors group"
            >
              {t("contact.button")}
              <span className="group-hover:translate-x-4 transition-transform duration-500 text-cyan-500">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}