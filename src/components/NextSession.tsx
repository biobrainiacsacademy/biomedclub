import { Calendar, Clock, MapPin, UserPlus } from "lucide-react";
import { useRef, useState } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import ClubDayJoinForm from "@/components/ClubDayJoinForm";

const NextSession = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(cardRef as React.RefObject<HTMLElement>);
  const [showJoin, setShowJoin] = useState(false);

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary">Next</span>
        <span className="text-foreground"> Event</span>
      </h2>

      <div
        ref={cardRef}
        className="max-w-md mx-auto rounded-xl p-6 space-y-3 interactive-card card-gradient"
        style={{
          transform: `perspective(800px) rotateX(${mouse.y * -8}deg) rotateY(${mouse.x * 8}deg)`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-foreground">Club Day</h3>
        </div>
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-accent" /> Tuesday, September 15th
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-accent" /> 11:00 AM to 12:00 PM
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-accent" /> WCHS Main Gym
          </span>
        </div>
        <button
          onClick={() => setShowJoin(true)}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm shadow-lg hover:shadow-xl hover:scale-[1.02]"
        >
          <UserPlus className="w-4 h-4" />
          Join BioMed Club
        </button>
      </div>

      <ClubDayJoinForm isOpen={showJoin} onClose={() => setShowJoin(false)} />
    </section>
  );
};

export default NextSession;
