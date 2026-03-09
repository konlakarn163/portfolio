
import Marquee from "react-fast-marquee";

type Props = {
  items: React.ReactNode[];
  speed?: number; 
  direction?: "left" | "right"; 
  gap?: number; 
  className?: string;
  fadeEdges?: boolean; 
};

export default function InfiniteHorizontalScroll({
  items,
  speed = 60,
  direction = "left",
  gap = 24,
  className = "",
  fadeEdges = true,
}: Props) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <Marquee
        speed={speed}
        direction={direction}
        pauseOnHover={false}
        pauseOnClick={false}
        gradient={fadeEdges}
        gradientColor={[255, 255, 255]}
        gradientWidth={fadeEdges ? 40 : 0}
        autoFill
      >
        {items.map((el, i) => (
          <span key={i} style={{ display: "inline-block", marginRight: gap }}>
            {el}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
