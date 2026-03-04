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
        src="/assets/images/image-cover.png"
        alt="Cover"
        className="sm:w-[clamp(150px,60vw,600px)] h-[580px] sm:h-auto max-w-[unset] brightness-[0.85]"
      />
    </HeroReveal>
  );
}
