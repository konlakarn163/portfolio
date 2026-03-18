import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type HeroImageProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export default function HeroImage({
  src = "/assets/images/image-cover.png",
  alt = "Cover",
  className = "",
}: HeroImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!imgRef.current) return;

      gsap.set(imgRef.current, {
        scale: 1.2,
        opacity: 0,
        y: 20,
      });

      gsap.to(imgRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 2.5,
        delay: 0.2,
        ease: "power4.out",
        onComplete: () => ScrollTrigger.refresh(),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden w-full flex justify-center"
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        data-no-blend
        onLoad={() => ScrollTrigger.refresh()}
        className={`no-blend-zone pointer-events-auto w-[82vw] sm:w-[56vw] md:w-[100%] [@media(min-height:622px)]:w-full lg:w-[35vw] 2xl:w-[550px] max-w-[560px] max-h-[84svh] object-contain object-bottom brightness-100 dark:brightness-[0.85] ${className}`}
      />
    </div>
  );
}
