// Home.tsx
import React, { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PanelHero from "../components/panels/PanelHero";
import SkillsSection from "@/components/panels/SkillsSection";
import ExperienceSection from "@/components/panels/ExperienceSection";
import AboutSection from "@/components/panels/AboutSection";
import WhyChooseSection from "@/components/panels/WhyChooseSection";
import ContactSection from "@/components/panels/ContactSection";
import ProjectsSection from "@/components/panels/ProjectsSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useTranslation();
  const mainRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const contactSection = mainRef.current?.querySelector(
        ".contact-reveal-trigger",
      );

      if (contactSection) {
        gsap
          .timeline({
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
            "-=0.6",
          );
      }

      const magneticBtn = document.querySelector(
        ".magnetic-target",
      ) as HTMLElement;
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
    <div
      ref={mainRef}
      className="font-body selection:bg-cyan-500/30"
    >
      <PanelHero />

     

      <div className="relative">
        <section
          ref={aboutRef}
          className="py-20 md:py-28 px-6 flex flex-col items-center justify-center bg-[color:var(--bg-alt)]"
        >
          <AboutSection />
          <div className="w-full space-y-16 md:space-y-24 lg:space-y-28">
            <SkillsSection innerRef={skillsRef} />
             <ProjectsSection />
            <ExperienceSection innerRef={expRef} />
          </div>
        </section>

        <WhyChooseSection />
        <ContactSection />
      </div>
    </div>
  );
}
