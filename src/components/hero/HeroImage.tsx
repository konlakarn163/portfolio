import HeroReveal from "../anim/HeroReveal";
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
  return (
    <HeroReveal
      className="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden w-full flex justify-center"
      target="child"
      scaleFrom={1.2}
      scaleTo={1}
      duration={2.5}
      delay={0}
      opacityFrom={1}
    >
      <img
        src={src}
        alt={alt}
        className={`pointer-events-none w-[82vw] sm:w-[56vw] md:w-[46vw] lg:w-[35vw] 2xl:w-[550px] max-w-[560px] max-h-[84svh] object-contain object-bottom brightness-100 dark:brightness-[0.85] ${className}`}
      />
    </HeroReveal>
  );
}
