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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();
  const hasInternalPage = !!project.slug;
  const hasExternalLink = !!project.liveUrl;
  const imgSrc =
    project.image ?? (project.slug ? (IMAGE_MAP[project.slug] ?? null) : null);
  const ctaLabel = hasInternalPage
    ? t("projects.view")
    : hasExternalLink
      ? t("projects.live")
      : null;

  const techTags = project.tech
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);

  const isEvenIndex = index % 2 === 0;

  const image = imgSrc ? (
    <img
      src={imgSrc}
      alt={project.title}
      className="w-full h-full object-cover rounded-2xl"
      loading="lazy"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-950 rounded-2xl" />
  );

  const content = (
    <div className="flex flex-col justify-center h-full">
      <div className="space-y-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--fg)] mb-2">
            {project.title}
          </h2>
          {project.badge && (
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--accent)] mb-4">
              {project.badge}
            </p>
          )}
        </div>

        <p className="text-lg text-[color:var(--fg-secondary)] leading-relaxed max-w-md">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 pt-4">
          {techTags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[color:var(--bg-alt)] border border-[color:var(--border)] text-[color:var(--fg-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {(ctaLabel || project.year) && (
          <div className="flex items-center gap-6 pt-6 border-t border-[color:var(--border)]">
            {project.year && (
              <span className="text-xs font-mono font-semibold text-[color:var(--fg-muted)] uppercase tracking-wider">
                {project.year}
              </span>
            )}
            {ctaLabel && (
              <Link
                to={
                  hasInternalPage
                    ? `/project/${project.slug}`
                    : project.liveUrl || "#"
                }
                target={hasExternalLink ? "_blank" : undefined}
                rel={hasExternalLink ? "noreferrer" : undefined}
                className="flex items-center gap-2 text-sm font-bold text-[color:var(--accent)] hover:gap-3 transition-all group"
              >
                <span>{ctaLabel}</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="py-20 border-t-2 border-dashed border-[color:var(--border)] project-card">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${isEvenIndex ? "" : "md:grid-cols-2"}`}
      >
        <div
          className={`project-card-image aspect-sq md:aspect-square ${isEvenIndex ? "" : "md:order-2"}`}
        >
          {image}
        </div>

        <div
          className={`project-card-content ${isEvenIndex ? "" : "md:order-1"}`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const projects = t("projects.list", { returnObjects: true }) as Project[];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        sectionRef.current?.querySelectorAll(".project-item"),
      );

      items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const imageEl = item.querySelector(
          ".project-card-image",
        ) as HTMLElement;
        const contentEl = item.querySelector(
          ".project-card-content",
        ) as HTMLElement;

        if (!imageEl || !contentEl) return;

        // Initial state - image slides from side, text slides from bottom
        gsap.set(imageEl, {
          opacity: 0,
          x: isEven ? -100 : 100,
        });

        gsap.set(contentEl, {
          opacity: 0,
          y: 60,
        });

        // Create timeline for reveal animation
        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "top 25%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          })
          .to(
            imageEl,
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            0,
          )
          .to(
            contentEl,
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            0.2,
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 md:py-20 px-6 md:px-16 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="hover-scale text-4xl md:text-5xl font-header font-bold mb-10 md:mb-20 text-center uppercase tracking-tight">
          {t("projects.title")}
        </h2>

        <div className="space-y-0">
          {projects.map((p, i) => (
            <div key={i} className="project-item">
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
