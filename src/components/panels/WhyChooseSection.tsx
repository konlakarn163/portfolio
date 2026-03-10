import { useTranslation } from "react-i18next";

export default function WhyChooseSection() {
  const { t } = useTranslation();

  const features = [
    {
      title: t("home.features.performance"),
      desc: t("home.features.performanceDesc"),
    },
    {
      title: t("home.features.scalability"),
      desc: t("home.features.scalabilityDesc"),
    },
    { title: t("home.features.design"), desc: t("home.features.designDesc") },
  ];

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-[color:var(--bg)] px-6 border-t border-[color:var(--border)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="hover-scale text-3xl md:text-5xl font-bold font-header mb-16 md:mb-24 text-center uppercase tracking-widest">
          {t("home.whyChoose")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {features.map((item, i) => (
            <div
              key={i}
              className="hover-scale feature-card border-l-2 border-[color:var(--border)] pl-6 md:pl-8 py-4 hover:border-cyan-500 transition-colors duration-500"
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
  );
}
