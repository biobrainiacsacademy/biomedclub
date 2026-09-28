import { useRef } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

const NextSession = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(cardRef as React.RefObject<HTMLElement>);

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary vote-title-glow">Coming</span>
        <span className="text-foreground vote-title-glow"> Up</span>
      </h2>

      <div
        ref={cardRef}
        className="max-w-md mx-auto rounded-xl p-6 interactive-card vote-card-glow"
        style={{
          transform: `perspective(800px) rotateX(${mouse.y * -8}deg) rotateY(${mouse.x * 8}deg)`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <h3 className="text-sm font-semibold text-foreground leading-snug text-center">
          Our next meeting is coming up. Stay tuned for details!
        </h3>
      </div>
    </section>
  );
};

export default NextSession;
