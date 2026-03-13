import React, { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function PortfolioPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, false);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const p = t("projectPages.portfolio", { returnObjects: true }) as {
    back: string;
    badge: string;
    title: string;
    tagline: string;
    desc: string;
    techLabel: string;
    tech: string;
    roleLabel: string;
    role: string;
    yearLabel: string;
    year: string;
    highlights: { title: string; list: string[] };
  };

  const techTags = p.tech
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.timeline().from(".hero-overlay-content", {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          delay: 0.2,
        });
      }

      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll(".reveal-item"), {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="font-body bg-[color:var(--bg)] min-h-screen overflow-x-hidden">
      <section
        ref={heroRef}
        className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen flex items-end overflow-hidden no-blend-zone"
      >
        <img
          src="/assets/images/projects/port/port-bg.png"
          alt="Portfolio"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-in-out scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="absolute top-20 left-6 md:top-24 md:left-8 z-20">
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const el = document.getElementById("projects");
                const smoother = ScrollSmoother.get();
                if (el && smoother) {
                  smoother.scrollTo(el, true);
                } else if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }, 120);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90 ring-1 ring-white hover:ring-0 bg-gray-800 hover:bg-gray-700 transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            {p.back}
          </button>
        </div>

        {/* Hero text */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16 lg:pb-20">
          <span className="hero-overlay-content inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] bg-violet-500/25 text-violet-300 ring-1 ring-violet-500/40 mb-5">
            {p.badge}
          </span>

          <h1 className="hero-overlay-content text-5xl md:text-7xl lg:text-8xl font-header font-bold text-white leading-none tracking-tight mb-4">
            {p.title}
          </h1>

          <p className="hero-overlay-content text-lg md:text-xl text-white/70 max-w-xl">
            {p.tagline}
          </p>
        </div>
      </section>

      <section
        ref={contentRef}
        className="px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-5xl mx-auto"
      >
        <div className="reveal-item grid grid-cols-2 md:grid-cols-3 gap-4 mb-14 pb-14 border-b border-[color:var(--border)]">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[color:var(--fg-muted)]">
              {p.yearLabel}
            </span>
            <span className="text-xl font-bold text-[color:var(--fg)]">
              {p.year}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[color:var(--fg-muted)]">
              {p.roleLabel}
            </span>
            <span className="text-xl font-bold text-[color:var(--fg)]">
              {p.role}
            </span>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[color:var(--fg-muted)]">
              {p.techLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {techTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[color:var(--surface)] text-[color:var(--fg)] ring-1 ring-[color:var(--border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal-item mb-14">
          <p className="text-lg md:text-xl text-[color:var(--fg-muted)] leading-relaxed max-w-3xl">
            {p.desc}
          </p>
        </div>

        <div className="reveal-item mb-14">
          <h2 className="text-2xl md:text-3xl font-header font-bold text-[color:var(--fg)] mb-8 uppercase tracking-tight">
            {p.highlights.title}
          </h2>
          <ul className="space-y-4">
            {p.highlights.list.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-[color:var(--fg-muted)]"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                <span className="text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hover-scale reveal-item inline-flex items-start gap-3 px-5 py-4 rounded-2xl bg-violet-500/8 border border-violet-500/20 text-violet-600 dark:text-violet-400">
          <svg
            className="w-4 h-4 mt-0.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <p className="text-sm leading-relaxed ">
            {t("projectPages.portfolio.youAreHere")}
          </p>
        </div>
      </section>
    </div>
  );
}
