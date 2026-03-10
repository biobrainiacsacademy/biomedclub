import { Calendar, Clock, MapPin, Beaker } from "lucide-react";

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
      
      <div className="max-w-md mx-auto">
        <div className="card-gradient rounded-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Beaker className="w-16 h-16 text-accent/60" />
            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
              3/16
            </div>
          </div>
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              The Anatomy Challenge
            </h3>
            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-accent" /> Monday, March 16</span>
              <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-accent" /> During Lunch</span>
              <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-accent" /> Room 248</span>
            </div>
            <button
              onClick={onRegisterClick}
              className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg font-medium text-sm transition-colors duration-300"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextSession;