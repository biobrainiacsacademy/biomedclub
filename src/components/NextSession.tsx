import { Calendar, Clock, MapPin } from "lucide-react";
import { useRef } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

interface NextSessionProps {
  onRegisterClick: () => void;
}

const NextSession = ({ onRegisterClick }: NextSessionProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(cardRef as React.RefObject<HTMLElement>);

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
        <span className="text-primary">Upcoming</span>
        <span className="text-foreground"> Sessions</span>
      </h2>
      <p className="text-center text-muted-foreground mb-6">Stay tuned for our next hands-on meeting</p>
      
      <div
        ref={cardRef}
        className="max-w-md mx-auto card-gradient rounded-xl p-6 space-y-3 interactive-card"
        style={{
          transform: `perspective(800px) rotateX(${mouse.y * -8}deg) rotateY(${mouse.x * 8}deg)`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">DNA Extraction Lab</h3>
          <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">In Person</span>
        </div>
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-accent" /> Friday, June 12</span>
          <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-accent" /> During Lunch</span>
          <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-accent" /> Room 248</span>
        </div>
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-foreground">The Blueprint Breakdown</p>
            <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">Virtual</span>
          </div>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-accent" /> Saturday, June 6</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-accent" /> 12:00 PM</span>
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-accent" /> On Zoom</span>
          </div>
        </div>
        <button
          onClick={onRegisterClick}
          className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.7)] hover:scale-[1.02] active:scale-[0.98]"
        >
          Notify Me
        </button>
      </div>
    </section>
  );
};

export default NextSession;
