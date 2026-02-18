

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
      
      <div className="max-w-xl mx-auto card-gradient rounded-xl p-6 text-center">
        <p className="text-muted-foreground text-lg">No upcoming sessions at this time.</p>
        <p className="text-muted-foreground text-sm mt-2">Check back soon for new meetings!</p>
      </div>
    </section>
  );
};

export default NextSession;