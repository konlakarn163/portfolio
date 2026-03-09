import React from "react";
import { useTranslation } from "react-i18next";
import { skillGroups } from "@/constant/skills";
import { SkillMarquee } from "../anim/SkillMarquee";

const SkillsSection = ({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { t } = useTranslation();

  const getArray = (s: string) => s.split(", ");
  const formatText = (s: string) => s.split(", ").join(" • ");

  const colors = [
    { text: "text-cyan-400/80 dark:text-cyan-400/30", accent: "text-cyan-400", bg: "bg-cyan-400" },
    { text: "text-indigo-400/80 dark:text-indigo-400/30", accent: "text-indigo-400", bg: "bg-indigo-400" },
    { text: "text-pink-400 dark:text-pink-400/30", accent: "text-pink-400", bg: "bg-pink-400" },
  ];

  return (
    <section
      ref={innerRef}
      className="py-12 md:py-32 bg-transparent overflow-hidden w-full flex flex-col items-center"
    >
      <div className="px-6 mb-12 md:mb-20 w-full max-w-[1440px]">
        <h2 className="text-4xl md:text-5xl font-header font-bold mb-20 text-center uppercase tracking-tight">
          {t("skills.title")}
        </h2>
      </div>

      <div className="flex flex-col w-full border-t border-white/5">
        {skillGroups.map((group, i) => {
          const color = colors[i % colors.length];
          const isEven = i % 2 === 1;

          return (
            <div key={i} className="relative w-full group">
              <div
                className={`absolute top-1 md:top-2 z-10 opacity-40 group-hover:opacity-100 transition-all duration-500
                ${isEven ? "right-4 md:right-12 text-right" : "left-4 md:left-12"}`}
              >
                <span className="block text-[10px] md:text-[14px] font-mono uppercase tracking-[0.3em] mb-1">
                  {t(group.key)}
                </span>
                <div
                  className={`h-[1px] md:h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out ${color.bg} ${isEven ? "ml-auto" : ""}`}
                />
              </div>

              <SkillMarquee
                text={formatText(group.skills)}
                skillsArray={getArray(group.skills)}
                reverse={isEven}
                speed={isEven ? 45 : 35}
                className={color.text}
                accentColor={color.accent}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;