import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTwoRevealRef = useRef<HTMLDivElement>(null);
  const heroThreeRef = useRef<HTMLHeadingElement>(null);
  const heroTwoPlayingRef = useRef(false);
  const heroTwoPlayedRef = useRef(false);
  const heroTwo = t("about.hero_2") || "Fullstack";
  const heroTwoDisplay =
    heroTwo.toLowerCase() === "fullstack"
      ? "FULL STACK"
      : heroTwo.toUpperCase();
  const heroThree = (t("about.hero_3") || "Developer").toUpperCase();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTwoRevealRef.current) {
        const revealStartClip = "inset(-30% 100% -30% -30%)";

        const revealTween = gsap.fromTo(
          heroTwoRevealRef.current,
          { clipPath: revealStartClip },
          {
            clipPath: "inset(-30% -2% -30% -2%)",
            duration: 1.15,
            ease: "power3.out",
            paused: true,
            onStart: () => {
              heroTwoPlayingRef.current = true;
            },
            onComplete: () => {
              heroTwoPlayingRef.current = false;
            },
          },
        );

        const playReveal = () => {
          if (heroTwoPlayingRef.current || heroTwoPlayedRef.current) return;
          heroTwoPlayedRef.current = true;
          revealTween.play(0);
        };
        const resetReveal = () => {
          heroTwoPlayingRef.current = false;
          heroTwoPlayedRef.current = false;
          revealTween.pause(0);
          gsap.set(heroTwoRevealRef.current, { clipPath: revealStartClip });
        };

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 85%",
          invalidateOnRefresh: true,
          onEnter: () => {
            playReveal();
          },
          onEnterBack: () => {
            playReveal();
          },
          onLeaveBack: () => {
            resetReveal();
          },
        });
      }

      if (heroThreeRef.current) {
        const chars = heroThreeRef.current.querySelectorAll(".hero-three-char");

        gsap.fromTo(
          chars,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroThreeRef.current,
              start: "top 88%",
              toggleActions: "restart none none reset",
            },
          },
        );
      }

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className=" relative py-16 md:py-0 md:min-h-screen  px-4 md:px-10 flex flex-col justify-center text-[color:var(--fg)] overflow-x-visible overflow-y-hidden transition-colors duration-500"
    >
      <div className=" 2xl:max-w-[1440px] mx-auto w-full">
        {/* <div className="overflow-hidden mb-4">
          <h2 className="reveal-line text-[clamp(2.5rem,11vw,5rem)] font-bold uppercase leading-[0.9] tracking-tighter">
            {t("about.hero_1") || "Senior"}
          </h2>
        </div> */}

        <div className="flex items-center gap-4 md:gap-10 ml-0 md:ml-[-8vw] lg:ml-[8vw] 2xl:ml-[12vw] ">
          {/* <div className="reveal-dash about-dash-effect h-[2px] md:h-[3px] w-[10vw] md:w-[10vw] bg-[color:var(--fg)] opacity-50 hidden sm:block" /> */}
          <div ref={heroTwoRevealRef} className="inline-block overflow-visible">
            <div className="about-corner-frame w-max">
              <h2 className="hover-scale about-corner-text text-[clamp(1.25rem,9vw,5rem)] font-bold uppercase leading-[0.9] tracking-tight font-header">
                {heroTwoDisplay}
              </h2>
            </div>
          </div>
        </div>

        <div className="  ml-[4vw] md:ml-[6vw] mb-10 md:mb-16 text-right mt-4">
          <h2
            ref={heroThreeRef}
            className="hover-scale overflow-hidden   about-developer-effect rotate-4 text-[clamp(2.5rem,11vw,4rem)] font-bold uppercase leading-[0.9] tracking-tighter text-slate-700 dark:text-white"
          >
            {heroThree.split("").map((char, index) => (
              <span key={`${char}-${index}`} className="hero-three-char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>

        <div className="ml-auto max-w-[90%] md:max-w-2xl mt-8 md:mt-0 px-4">
          <p
            className="hover-scale text-base indent-12 md:text-xl lg:text-2xl leading-relaxed font-light text-[color:var(--fg-muted)] hover:text-[color:var(--fg)] transition-colors duration-500"
          >
            {t("about.desc")}
          </p>
        </div>
      </div>
    </section>
  );
}
