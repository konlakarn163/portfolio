import React from "react";
import { useTranslation } from "react-i18next";

const ExperienceSection = ({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { t } = useTranslation();
  const experiences = t("experience.list", { returnObjects: true }) as any[];

  return (
    <section ref={innerRef} className="sm:px-6 font-body">
      <div className="max-w-4xl mx-auto">
        <h2 className="hover-scale text-4xl md:text-5xl font-header font-bold mb-20 text-center uppercase tracking-tight">
          {t("experience.title")}
        </h2>
        <div className="relative border-l-2 border-[color:var(--border)] ml-4 md:ml-0">
          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-10 pb-16 last:pb-0 exp-item">
              {" "}
              <div className="absolute -left-[9px] top-2 w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h3 className="text-2xl font-bold hover-scale">{exp.role}</h3>
                <span className="px-4 py-1 rounded-full bg-cyan-500/60 dark:bg-cyan-500/10 text-white dark:text-cyan-400 text-sm font-mono ring-1 ring-cyan-500/20 w-fit">
                  {exp.period}
                </span>
              </div>
              <h4 className="text-xl text-[color:var(--fg-muted)] mb-6 font-medium text-left">
                {exp.company}
              </h4>
              <ul className="space-y-4 text-left">
                {exp.details.map((detail: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start text-[color:var(--fg-muted)] leading-relaxed"
                  >
                    <span className="mr-3 mt-2 w-1.5 h-1.5 bg-[color:var(--border)] rounded-full shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;