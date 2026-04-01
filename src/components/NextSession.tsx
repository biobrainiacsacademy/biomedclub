import { Calendar, Clock, MapPin } from "lucide-react";

interface NextSessionProps {
  onRegisterClick: () => void;
}

const NextSession = ({
  onRegisterClick
}: NextSessionProps) => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
        <span className="text-primary">Upcoming</span>
        <span className="text-foreground"> Sessions</span>
      </h2>
      <p className="text-center text-muted-foreground mb-6">Hands-On Meeting</p>
      
      <div className="max-w-md mx-auto card-gradient rounded-xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">The Anatomy Challenge</h3>
          <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">Apr 13</span>
        </div>
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-accent" /> Monday, April 13th</span>
          <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-accent" /> During Lunch</span>
          <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-accent" /> Room 248</span>
        </div>
        <button
          onClick={onRegisterClick}
          className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.7)]"
        >
          Register Now
        </button>
      </div>
    </section>
  );
};

export default NextSession;