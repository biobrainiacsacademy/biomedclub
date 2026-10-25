import { useState } from "react";
import { Button } from "@/components/ui/button";
import BioMedRegistrationForm from "@/components/BioMedRegistrationForm";
import { biomedMeeting } from "@/lib/biomedRegistration";

const NextSession = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary vote-title-glow">Our Next</span>
        <span className="text-foreground vote-title-glow"> Meeting</span>
      </h2>

      <div className="max-w-lg mx-auto">
        <div className="rounded-lg p-6 qa-glow text-center motion-reduce:animate-none">
          <h3 className="text-2xl font-bold text-foreground">BioMed Club</h3>
          <p className="mt-1 text-sm text-accent">Our first in person meeting</p>
          <p className="mt-4 font-semibold text-foreground">{biomedMeeting.date} · {biomedMeeting.time}</p>
          <p className="mt-1 text-muted-foreground">{biomedMeeting.room} ({biomedMeeting.hallway})</p>
          <ul className="my-5 space-y-2 text-sm text-foreground">
            {biomedMeeting.activities.map(activity => <li key={activity}>{activity}</li>)}
          </ul>
          <Button onClick={() => setShowRegistration(true)} size="lg" className="w-full font-semibold vote-glow motion-reduce:animate-none">Register Now</Button>
        </div>
      </div>
      <BioMedRegistrationForm isOpen={showRegistration} onClose={() => setShowRegistration(false)} />
    </section>
  );
};

export default NextSession;
