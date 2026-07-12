import { Calendar, Clock, MapPin } from "lucide-react";
import { useRef } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { getNextMeeting } from "@/lib/schedule";

interface NextSessionProps {
  onRegisterClick: () => void;
}

const NextSession = ({ onRegisterClick }: NextSessionProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(cardRef as React.RefObject<HTMLElement>);
  const next = getNextMeeting();

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary">Next</span>
        <span className="text-foreground"> Meeting</span>
      </h2>

      

      <div
        ref={cardRef}
        className="max-w-md mx-auto card-gradient rounded-xl p-6 space-y-3 interactive-card"
        style={{
          transform: `perspective(800px) rotateX(${mouse.y * -8}deg) rotateY(${mouse.x * 8}deg)`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-foreground">
            {next ? next.title : "Coming Soon"}
          </h3>
          {next?.isFinal && (
            <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded whitespace-nowrap">
              Final
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-accent" /> {next ? next.displayDate : "To Be Announced"}
          </span>
          <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-accent" /> 12:00 PM EST</span>
          <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-accent" /> Virtual (on Zoom)</span>
        </div>
        <button
          onClick={onRegisterClick}
          className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.7)] hover:scale-[1.02] active:scale-[0.98]"
        >
          Register Now
        </button>
      </div>
    </section>
  );
};

export default NextSession;
