import React from "react";
import { useTranslation } from "react-i18next";

const SkillsSection = ({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { t } = useTranslation();

  const skillGroups = [
    {
      title: t("skills.categories.frontend"),
      skills: "React.js, Nuxt.js, Vue.js, Tailwind CSS, TypeScript, Redux, Zustand, MUI",
      color: "text-cyan-400",
    },
    {
      title: t("skills.categories.backend"),
      skills: "Node.js, Express.js, SSMS (SQL Server), MongoDB, Firebase, Socket.io",
      color: "text-indigo-400",
    },
    {
      title: t("skills.categories.tools"),
      skills: "Git, Postman, Figma, Adobe XD, RESTful API",
      color: "text-pink-400",
    },
  ];

  return (
    <section ref={innerRef} className="py-24 px-6 overflow-hidden w-full">
      <div className="max-w-6xl mx-auto font-body">
        <h2 className="text-4xl md:text-5xl font-header font-bold mb-16 text-center uppercase">
          {t("skills.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              className="skill-card p-8 rounded-3xl bg-white/[0.03] ring-1 ring-white/10 hover:bg-white/[0.08] hover:ring-white/30 transition-shadow duration-300"
            >
              <h3 className={`text-xl font-bold mb-4 ${group.color}`}>
                {group.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-lg">
                {group.skills}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;