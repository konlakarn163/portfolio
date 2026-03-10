import React, { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PanelHero from "../components/panels/PanelHero";
import SkillsSection from "@/components/panels/SkillsSection";
import ExperienceSection from "@/components/panels/ExperienceSection";
import AboutSection from "@/components/panels/AboutSection";
import ScrollBadge from "@/components/anim/ScrollBadge";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useTranslation();
  const mainRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const contactSection = mainRef.current?.querySelector(".contact-reveal-trigger");
      
      if (contactSection) {
        gsap.timeline({
          scrollTrigger: {
            trigger: contactSection,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        })
        .from(contactSection.querySelectorAll(".reveal-text-contact"), {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        })
        .from(
          ".magnetic-target",
          {
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );
      }

      const magneticBtn = document.querySelector(".magnetic-target") as HTMLElement;
      if (magneticBtn) {
        const onMouseMove = (e: MouseEvent) => {
          const rect = magneticBtn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(magneticBtn, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const onMouseLeave = () => {
          gsap.to(magneticBtn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          });
        };
        magneticBtn.addEventListener("mousemove", onMouseMove);
        magneticBtn.addEventListener("mouseleave", onMouseLeave);
      }

      if (aboutRef.current) {
        gsap.from(aboutRef.current.querySelectorAll(".reveal-text"), {
          y: 30,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      if (skillsRef.current) {
        gsap.from(skillsRef.current.querySelectorAll(".skill-card"), {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      if (expRef.current) {
        const expItems = expRef.current.querySelectorAll(".exp-item");
        expItems.forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        });
      }

      const features = mainRef.current?.querySelectorAll(".feature-card");
      if (features) {
        gsap.from(features, {
          scale: 0.95,
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: { 
            trigger: features[0], 
            start: "top 95%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <div ref={mainRef} className="font-body overflow-x-hidden selection:bg-cyan-500/30">
      <PanelHero />

      <div className="relative">
        <section
          ref={aboutRef}
          className="py-20 md:py-28 px-6 flex flex-col items-center justify-center bg-[color:var(--bg-alt)]"
        >
          <AboutSection />
          <div className="w-full space-y-24 md:space-y-48 lg:space-y-52">
            <SkillsSection innerRef={skillsRef} />
            <ExperienceSection innerRef={expRef} />
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40 bg-[color:var(--bg)] px-6 border-t border-[color:var(--border)]">
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
                <div
                  key={i}
                  className="feature-card border-l-2 border-[color:var(--border)] pl-6 md:pl-8 py-4 hover:border-cyan-500 transition-colors duration-500"
                >
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 font-header">
                    {item.title}
                  </h3>
                  <p className="text-[color:var(--fg-muted)] text-sm md:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-reveal-trigger py-32 md:py-48 pb-40 text-center bg-[color:var(--bg-alt)] overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 space-y-10 md:space-y-16">
            <div className="overflow-hidden">
              <h2 className="reveal-text-contact text-5xl md:text-7xl font-header font-black uppercase tracking-tighter leading-none">
                Let's <span className="text-cyan-500">Connect</span>
              </h2>
            </div>

            <div className="overflow-hidden">
              <p className="reveal-text-contact text-[color:var(--fg-muted)] text-lg md:text-2xl max-w-2xl mx-auto font-light">
                {t("contact.desc")}
              </p>
            </div>

            <div className="pt-8">
              <a
                href="mailto:buapian01@gmail.com"
                className="magnetic-target inline-flex items-center gap-4 md:gap-6 text-2xl md:text-4xl lg:text-5xl font-bold hover:text-cyan-500 transition-colors group"
              >
                {t("contact.button")}
                <span className="group-hover:translate-x-4 transition-transform duration-500 text-cyan-500">
                  →
                </span>
              </a>
            </div>
          </div>
          <div>
            <ScrollBadge/>
          </div>
        </section>
      </div>
    </div>
  );
}