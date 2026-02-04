import { Calendar, Clock, MapPin, Video } from "lucide-react";

interface NextSessionProps {
  onRegisterClick: () => void;
}

const NextSession = ({
  onRegisterClick
}: NextSessionProps) => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary">Upcoming</span>
        <span className="text-foreground"> Sessions</span>
      </h2>
      
      <div className="max-w-xl mx-auto card-gradient rounded-xl p-6">
        <div className="space-y-6">
          {/* Virtual Meeting */}
          <div className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                VIRTUAL
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
              Culturing Bacteria 101: Concepts Behind the Experiment
            </h3>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm">Feb 7th</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm">12:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-accent" />
                <span className="text-sm">via Zoom</span>
              </div>
            </div>
          </div>

          {/* Lab Session */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                LAB
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
              Experimental Microbiology: Culturing Bacteria
            </h3>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm">Feb 9th</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm">Lunch</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm">Room 248</span>
              </div>
            </div>
          </div>
        </div>
        
        <button onClick={onRegisterClick} className="w-full mt-6 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 animate-pulse-glow">
          Register Now
        </button>
      </div>
    </section>
  );
};

export default NextSession;