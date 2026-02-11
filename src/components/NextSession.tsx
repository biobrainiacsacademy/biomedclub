import { Calendar, Clock, MapPin } from "lucide-react";

const NextSession = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary">Upcoming</span>
        <span className="text-foreground"> Sessions</span>
      </h2>
      
      <div className="max-w-xl mx-auto card-gradient rounded-xl p-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
              LAB
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
            Culturing Bacteria Lab Results
          </h3>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-sm">Feb 12th</span>
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
    </section>
  );
};

export default NextSession;