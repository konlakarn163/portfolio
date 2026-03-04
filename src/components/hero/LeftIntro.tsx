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
  highlightClass = "text-orange-500",
  className = "",
}: LeftIntroProps) {
  return (
    <div
      className={`p-4 absolute left-0 top-1/4 sm:top-1/3 md:top-1/2 md:-translate-y-1/2 ${className}`}
    >
      <ScaleIn
        scaleFrom={0.85}
        scaleTo={1}
        opacityFrom={0}
        opacityTo={1}
        duration={2.5}
      >
        <div className="w-full md:w-[30vw] 2xl:w-[25vw]">
          <p className="text-center md:text-left text-2xl font-semibold tracking-widest">
            <span className={`${highlightClass}`}>{highlightText} </span>
            {introText || `I\'m ${name}`}
          </p>
          <p className="text-sm tracking-widest indent-6 whitespace-pre-line leading-6 mt-4">
            {description}
          </p>
        </div>
      </ScaleIn>
    </div>
  );
}
