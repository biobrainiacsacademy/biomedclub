import { Sparkles } from "lucide-react";

const NextSession = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary vote-title-glow">Our Next</span>
        <span className="text-foreground vote-title-glow"> Meeting</span>
      </h2>

      <div className="max-w-md mx-auto">
        <div className="relative rounded-2xl p-6 md:p-8 vote-card-glow text-center overflow-hidden">
          {/* Ambient corner glow */}
          <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-36 w-[130%] rounded-full bg-primary/10 blur-3xl" />

          <p className="relative flex items-center justify-center gap-2 text-base md:text-lg font-semibold text-foreground">
            <Sparkles className="h-4 w-4 shrink-0 text-primary" />
            Stay tuned for our next meeting!
            <Sparkles className="h-4 w-4 shrink-0 text-primary" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default NextSession;
