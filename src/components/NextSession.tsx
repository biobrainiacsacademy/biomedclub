const NextSession = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary vote-title-glow">Our Next</span>
        <span className="text-foreground vote-title-glow"> Meeting</span>
      </h2>

      <div className="max-w-md mx-auto">
        <div className="rounded-lg p-5 vote-card-glow text-center">
          <p className="text-base text-foreground">Our next meeting is coming up. Stay tuned!</p>
        </div>
      </div>

    </section>
  );
};

export default NextSession;
