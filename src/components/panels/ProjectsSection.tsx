import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  slug?: string;
  title: string;
  badge?: string;
  desc: string;
  tech: string;
  year?: string;
  liveUrl?: string;
  image?: string;
};

const IMAGE_MAP: Record<string, string> = {
  "k-space-cms": "/assets/images/projects/k-space-cms/k-space-cms.webp",
  portfolio: "/assets/images/projects/port/port-bg.png",
};

function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const hasInternalPage = !!project.slug;
  const hasExternalLink = !!project.liveUrl;
  const imgSrc = project.image ?? (project.slug ? (IMAGE_MAP[project.slug] ?? null) : null);
  const ctaLabel = hasInternalPage
    ? t("projects.view")
    : hasExternalLink
      ? t("projects.live")
      : null;

  const techTags = project.tech
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);

  const cardContent = (
    <div className="project-card-inner group relative flex flex-col justify-end h-full w-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border  transition-all duration-500 ease-out hover:-translate-y-2 ">
      <div className="absolute inset-0 z-0">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={project.title}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:hidden" />
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out bg-gradient-to-t from-black/80 via-black/45 to-black/10 dark:from-black/85 dark:via-black/55 dark:to-black/15" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-cyan-500/5 via-transparent to-transparent transition-opacity duration-500" />
      </div>

      <div className="relative z-10 h-full p-6 group">
        <div className="flex w-full lg:hidden h-full items-end">
          <div className="space-y-1">
            <h3 className="text-2xl font-header font-bold leading-tight text-slate-900 dark:text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]">
              {project.title}
            </h3>
            {project.badge && (
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.3)]">
                {project.badge}
              </p>
            )}
          </div>
        </div>

        <div className="hidden w-full lg:flex h-full items-end">
          <div className="space-y-3">
            <h3 className="text-3xl font-header font-bold leading-tight text-slate-900 dark:text-white group-hover:text-white transition-colors duration-300 [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]">
              {project.title}
            </h3>
            <p className="w-full text-sm leading-relaxed line-clamp-2 text-slate-600 dark:text-slate-400 group-hover:text-white/85 transition-colors duration-300 [text-shadow:0_1px_14px_rgba(0,0,0,0.3)]">
              {project.desc}
            </p>
            <div className="w-full overflow-hidden max-h-0 translate-y-4 opacity-0 transition-all duration-500 ease-out will-change-transform group-hover:max-h-40 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {techTags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 group-hover:bg-white/12 group-hover:dark::text-white/90 group-hover:border-white/15 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 group-hover:border-white/15 flex items-center justify-between transition-colors duration-300">
                <span className="text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 group-hover:text-white/65 uppercase tracking-wider transition-colors duration-300">
                  {project.year || "2026"}
                </span>
                {ctaLabel && (
                  <div className="flex items-center gap-2 text-sm font-bold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-300 group-hover:gap-3 transition-all [text-shadow:0_2px_14px_rgba(0,0,0,0.35)]">
                    <span>{ctaLabel}</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const cardClass =
    "project-card block w-full md:w-auto aspect-[4/5] lg:aspect-auto lg:w-[420px] lg:h-full lg:max-h-[520px] shrink-0 no-blend-zone";

  return hasInternalPage ? (
    <Link to={`/project/${project.slug}`} className={cardClass}>
      {cardContent}
    </Link>
  ) : hasExternalLink ? (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noreferrer"
      className={cardClass}
    >
      {cardContent}
    </a>
  ) : (
    <div className={cardClass}>{cardContent}</div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const projects = t("projects.list", { returnObjects: true }) as Project[];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        const amountToScroll = scrollWidth - windowWidth;
        const cardInners = gsap.utils.toArray<HTMLElement>(
          track.querySelectorAll(".project-card-inner"),
        );
        const skewProxy = { value: 0 };
        const clampSkew = gsap.utils.clamp(-8, 8);

        gsap.set(cardInners, {
          transformPerspective: 900,
          transformOrigin: "center center",
        });

        const tween = gsap.to(track, {
          x: -(amountToScroll + 150),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            pin: true,
            scrub: 0.4,
            end: () => `+=${amountToScroll}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const nextSkew = clampSkew(self.getVelocity() / -300);

              if (Math.abs(nextSkew) > Math.abs(skewProxy.value)) {
                skewProxy.value = nextSkew;

                gsap.to(skewProxy, {
                  value: 0,
                  duration: 0.7,
                  ease: "power3.out",
                  overwrite: true,
                  onUpdate: () => {
                    gsap.set(cardInners, {
                      skewX: skewProxy.value,
                      rotationY: skewProxy.value * 1.6,
                    });
                  },
                });
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="lg:h-screen lg:overflow-hidden flex flex-col transition-colors duration-500"
    >
      <div className="px-6 md:px-12 lg:px-20 pt-8 lg:pt-12 pb-4 lg:shrink-0">
        <h2 className="hover-scale text-4xl md:text-5xl font-header font-bold mb-20 text-center uppercase tracking-tight">
          {t("projects.title")}
        </h2>
      </div>

      <div
        ref={trackRef}
        className="hover-scale px-6 md:px-12 lg:px-20 pb-12 lg:pb-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:flex lg:flex-row lg:flex-nowrap lg:flex-1 lg:items-center lg:gap-14"
        style={{ willChange: "transform" }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
        <div className="hidden lg:block w-[25vw] shrink-0" aria-hidden="true" />
      </div>
    </section>
  );
}
