import { Calendar, Clock, MapPin } from "lucide-react";

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
      
      <div className="max-w-xl mx-auto card-gradient rounded-xl p-6 space-y-3">
        <h3 className="text-xl font-bold text-foreground text-center">The Anatomy Challenge</h3>
        <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm">
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> Monday, March 16</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> During Lunch</span>
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> Room 248</span>
        </div>
      </div>
    </section>
  );
};

export default NextSession;