import { ReactNode } from "react";
import { createPortal } from "react-dom";
import ScaleIn from "../anim/ScaleIn";
type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
  colorClass?: string;
};

type RightSocialRailProps = {
  links: SocialLink[];
  className?: string;
};

export default function RightSocialRail({
  links,
  className = "",
}: RightSocialRailProps) {
  return (
    <>
      <aside
        aria-label="Social links"
        className={`hidden md:block absolute right-0 mr-3 top-1/2 translate-y-1/2 z-30 ${className}`}
      >
        <ScaleIn
          scaleFrom={0.85}
          scaleTo={1}
          opacityFrom={0}
          opacityTo={1}
          duration={2.5}
        >
          <div className="relative w-[32vw] 2xl:w-[24vw] max-w-[320px] rounded-2xl border border-[color:var(--border)] dark:bg-[color:var(--surface)] p-3 dark:backdrop-blur">
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={l.label}
                    className="group flex items-center rounded-xl px-3 py-2 hover:bg-[color:var(--surface-2)] transition"
                  >
                    <span
                      className={`${l.colorClass ?? "text-[color:var(--fg)]"} shrink-0`}
                    >
                      {l.icon}
                    </span>
                    <span className="ml-3 overflow-hidden max-w-0 group-hover:max-w-[180px] transition-[max-width] duration-300 whitespace-nowrap text-sm text-[color:var(--fg-muted)]">
                      {l.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ScaleIn>
      </aside>

      {/* Mobile bottom bar */}
      {typeof document !== "undefined" &&
        createPortal(
          <nav
            aria-label="Social links"
            className="md:hidden fixed inset-x-4 bottom-4 z-[1000]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <ul className="flex items-center justify-between gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] backdrop-blur px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,.20)] dark:shadow-[0_8px_30px_rgba(0,0,0,.35)]">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={l.label}
                    className={`grid place-items-center w-11 h-11 rounded-xl hover:bg-[color:var(--surface-2)] active:scale-95 transition ${
                      l.colorClass ?? "text-[color:var(--fg)]"
                    }`}
                  >
                    {l.icon}
                  </a>
                </li>
              ))}
            </ul>
          </nav>,
          document.body
        )}
    </>
  );
}
