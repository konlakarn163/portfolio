import { useTranslation } from "react-i18next";
import ScrollBadge from "@/components/anim/ScrollBadge";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section className="contact-reveal-trigger py-32 md:py-48 pb-40 text-center bg-[color:var(--bg-alt)] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 space-y-10 md:space-y-16">
        <div className="overflow-hidden">
          <h2 className="hover-scale reveal-text-contact text-5xl md:text-7xl font-header font-black uppercase tracking-tighter leading-none">
            Let&apos;s <span className="text-cyan-500">Connect</span>
          </h2>
        </div>

        <div className="overflow-hidden">
          <p className="reveal-text-contact text-[color:var(--fg-muted)] text-lg md:text-2xl max-w-2xl mx-auto font-light">
            {t("contact.desc")}
          </p>
        </div>

        <div className="pt-8">
          <a
            href="mailto:buapian01@gmail.com"
            className="magnetic-target inline-flex items-center gap-4 md:gap-6 text-2xl md:text-4xl lg:text-5xl font-bold hover:text-cyan-500 transition-colors group"
          >
            {t("contact.button")}
            <span className="group-hover:translate-x-4 transition-transform duration-500 text-cyan-500">
              →
            </span>
          </a>
        </div>
      </div>
      <div className="mt-20">
        <ScrollBadge />
      </div>
    </section>
  );
}
