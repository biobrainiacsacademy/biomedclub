

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
        <div>
          {/* Lab Session */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                UPCOMING
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
              Experimental Microbiology: Culturing Bacteria
            </h3>
            <p className="text-muted-foreground text-sm">Coming Soon</p>
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