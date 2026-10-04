import { useRef } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

const NextSession = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(cardRef as React.RefObject<HTMLElement>);

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary vote-title-glow">Our Next</span>
        <span className="text-foreground vote-title-glow"> Meeting</span>
      </h2>

      <div
        ref={cardRef}
        className="max-w-md mx-auto interactive-card"
        style={{
          transform: `perspective(800px) rotateX(${mouse.y * -8}deg) rotateY(${mouse.x * 8}deg)`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="rounded-xl p-6 qa-glow text-center">
          <p className="text-lg font-semibold text-foreground">
            Our next meeting is coming up. Stay tuned!
          </p>
        </div>
      </div>
    </section>
  );
};

export default NextSession;
