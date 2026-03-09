import ScaleIn from "../anim/ScaleIn";
type LeftIntroProps = {
  name: string;
  introText?: string; // full sentence such as "I'm Konlakarn"
  highlightText?: string;
  highlightClass?: string;
  description: string;
  className?: string;
};

export default function LeftIntro({
  name,
  introText,
  description,
  highlightText = "HI,",
  highlightClass = "text-cyan-500",
  className = "",
}: LeftIntroProps) {
  return (
    <div
      className={`p-4 w-full md:w-auto sm:mt-32 md:mt-0 md:absolute md:left-0 md:top-2/3 md:-translate-y-1/2  ${className}`}
    >
      <ScaleIn
        scaleFrom={0.85}
        scaleTo={1}
        opacityFrom={0}
        opacityTo={1}
        duration={2.5}
      >
        <div className="w-full md:w-[30vw] 2xl:w-[25vw] md:max-w-[520px]">
          <p className="text-left text-xl sm:text-2xl font-semibold tracking-widest">
            <span className={` ${highlightClass}`}>{highlightText} </span>
            {introText || `I\'m ${name}`}
          </p>
          <p className="text-sm tracking-widest indent-6 whitespace-pre-line leading-6 mt-4 text-[color:var(--fg-muted)]">
            {description}
          </p>
        </div>
      </ScaleIn>
    </div>
  );
}
