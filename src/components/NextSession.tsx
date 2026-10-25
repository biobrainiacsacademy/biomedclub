import { useState } from "react";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BioMedRegistrationForm from "@/components/BioMedRegistrationForm";
import { biomedMeeting } from "@/lib/biomedRegistration";

const NextSession = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  const details = [
    { icon: Calendar, label: "Date", value: biomedMeeting.date },
    { icon: Clock, label: "Time", value: biomedMeeting.time },
    { icon: MapPin, label: "Location", value: `${biomedMeeting.room}, ${biomedMeeting.hallway}` },
  ];

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary vote-title-glow">Our Next</span>
        <span className="text-foreground vote-title-glow"> Meeting</span>
      </h2>

      <div className="max-w-lg mx-auto">
        <div className="relative rounded-2xl p-6 md:p-8 vote-card-glow text-center overflow-hidden">
          {/* Ambient corner glow */}
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[130%] rounded-full bg-primary/10 blur-3xl" />

          <h3 className="relative text-2xl md:text-3xl font-bold text-foreground tracking-tight">BioMed Club</h3>

          {/* Detail rows */}
          <div className="relative mt-6 space-y-3 text-left">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-4 py-3 backdrop-blur-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
                  <p className="text-sm md:text-base font-semibold text-foreground truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Activities */}
          <div className="relative mt-6">
            <p className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              What we will do
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {biomedMeeting.activities.map((activity, index) => (
                <div
                  key={activity}
                  className="flex items-center gap-2.5 rounded-xl border border-primary/25 bg-primary/10 px-3 py-3 text-center sm:flex-col sm:justify-center sm:gap-1.5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground sm:mx-auto">
                    {index + 1}
                  </span>
                  <span className="text-xs md:text-sm font-medium text-foreground leading-snug">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={() => setShowRegistration(true)} size="lg" className="relative mt-7 w-full font-semibold vote-glow motion-reduce:animate-none">Register Now</Button>
        </div>
      </div>
      <BioMedRegistrationForm isOpen={showRegistration} onClose={() => setShowRegistration(false)} />
    </section>
  );
};

export default NextSession;
