import { useRef, useState } from "react";
import { Vote } from "lucide-react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import LabVoteForm from "@/components/LabVoteForm";

const NextSession = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(cardRef as React.RefObject<HTMLElement>);
  const [showVote, setShowVote] = useState(false);


  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary vote-title-glow">Vote</span>
        <span className="text-foreground vote-title-glow"> for Our First Lab</span>
      </h2>

      <div
        ref={cardRef}
        className="max-w-md mx-auto rounded-xl p-6 space-y-3 interactive-card vote-card-glow"
        style={{
          transform: `perspective(800px) rotateX(${mouse.y * -8}deg) rotateY(${mouse.x * 8}deg)`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <h3 className="text-sm font-semibold text-foreground leading-snug text-center">
          Help us choose the lab that kicks off the year!
        </h3>
        <button
          onClick={() => setShowVote(true)}
          className="vote-glow w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm hover:scale-[1.02]"
        >
          <Vote className="w-4 h-4" />
          Vote Now
        </button>
      </div>

      <LabVoteForm isOpen={showVote} onClose={() => setShowVote(false)} />
    </section>
  );
};

export default NextSession;
