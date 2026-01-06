import { Calendar, Clock, MapPin } from "lucide-react";
interface NextSessionProps {
  onRegisterClick: () => void;
}
const NextSession = ({
  onRegisterClick
}: NextSessionProps) => {
  return <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary">Next</span>
        <span className="text-foreground"> Session</span>
      </h2>
      
      <div className="max-w-xl mx-auto card-gradient rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
            LAB
          </span>
          <span className="text-muted-foreground text-xs">Details coming shortly.</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-6 pr-24">Experimental Microbiology: Culturing Bacteria</h3>
        
        <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-sm">TBD</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-sm">TBD</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm">TBD</span>
          </div>
        </div>
        
        <button onClick={onRegisterClick} className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 animate-pulse-glow">
          Register Now
        </button>
      </div>
    </section>;
};
export default NextSession;