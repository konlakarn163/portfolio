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
    <div className="flex flex-col justify-center h-full w-full px-8 md:px-14 lg:px-20 py-10 md:py-16">
      <div className="space-y-4 max-w-2xl">
        <div>
          <h2 className="hover-scale text-4xl md:text-5xl lg:text-6xl font-bold text-[color:var(--fg)] mb-2">
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
    <div className="project-slide w-full md:w-screen min-h-[85vh] md:h-screen shrink-0">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-[1.15fr_0.85fr] h-full md:pt-56 md:pb-8">
        <div className="project-card-image h-[42vh] md:h-full">
          {image}
        </div>

        <div className="project-card-content">
          {content}
        </div>
      </div>
    </div>
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

      mm.add("(min-width: 768px)", () => {
        const totalX = Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: -totalX,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalX}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative isolate z-10"
    >
      <h2 className="hidden md:block absolute top-20 left-1/2 -translate-x-1/2 z-30 hover-scale text-4xl md:text-5xl font-header font-bold text-center uppercase tracking-tight">
        {t("projects.title")}
      </h2>

      <div className="hidden md:block overflow-hidden">
        <div ref={trackRef} className="flex w-max">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      </div>

      <div className="md:hidden px-6 py-12 space-y-10">
        <h2 className="hover-scale text-4xl font-header font-bold text-center uppercase tracking-tight">
          {t("projects.title")}
        </h2>

        <div className="space-y-8">
          {projects.map((p, i) => (
            <div key={i} className="border-t border-[color:var(--border)] pt-8">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
