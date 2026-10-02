import { useRef, useState } from "react";
import { CalendarDays, Clock, Video } from "lucide-react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import ClubDayJoinForm from "@/components/ClubDayJoinForm";
import SpeakerFeedbackForm from "@/components/SpeakerFeedbackForm";
import paetoPhoto from "@/assets/paeto-mobile.jpg";

const NextSession = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(cardRef as React.RefObject<HTMLElement>);
  const [showRegister, setShowRegister] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const closeRegister = (submitted?: boolean) => {
    setShowRegister(false);
    if (submitted) setFormKey((k) => k + 1);
  };

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary vote-title-glow">Next</span>
        <span className="text-foreground vote-title-glow"> Event</span>
      </h2>

      <div
        ref={cardRef}
        className="max-w-md mx-auto interactive-card"
        style={{
          transform: `perspective(800px) rotateX(${mouse.y * -8}deg) rotateY(${mouse.x * 8}deg)`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="rounded-xl p-6 space-y-4 qa-glow">
          <img
            src={paetoPhoto}
            alt="Paeto Wangweera"
            className="w-28 h-28 rounded-full object-cover mx-auto"
          />
          <h3 className="text-lg font-bold text-foreground text-center leading-snug">
            Guest Speaker Q&A: Paeto Wangweera
          </h3>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 justify-center">
              <CalendarDays className="w-4 h-4 text-accent" />
              <span>Sunday, October 4th</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4 text-accent" />
              <span>3:00 PM</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Video className="w-4 h-4 text-accent" />
              <span>Via Zoom</span>
            </div>
          </div>

          <button
            onClick={() => setShowRegister(true)}
            className="vote-glow w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm hover:scale-[1.02]"
          >
            Register Now
          </button>

          <div className="qa-glow-subtle rounded-lg px-3 py-2 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              Can't make it?
            </p>
            <button
              onClick={() => setShowFeedback(true)}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm hover:scale-[1.02]"
            >
              Feedback Form
            </button>
          </div>
        </div>
      </div>

      {showRegister && (
        <ClubDayJoinForm
          key={formKey}
          isOpen={showRegister}
          onClose={closeRegister}
        />
      )}

      <SpeakerFeedbackForm
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
      />
    </section>
  );
};

export default NextSession;
