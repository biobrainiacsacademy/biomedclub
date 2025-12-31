import { Beaker, Bug, Dna, Heart, Users } from "lucide-react";

const meetings = [
  { title: "DNA Extraction Lab", icon: Dna },
  { title: "Growing Bacteria Lab", icon: Bug },
  { title: "Build Your Own DNA Double Helix", icon: Dna },
  { title: "Biomedical Anatomy Challenge", icon: Heart },
  { title: "Guest Speaker Panel - Professional Biomedical Engineer", icon: Users },
];

const UpcomingMeetings = () => {
  return (
    <section className="py-8 px-4">
      <h3 className="text-2xl font-bold text-center mb-4 text-foreground">
        Upcoming Meetings
      </h3>
      
      <ul className="max-w-md mx-auto space-y-3">
        {meetings.map((meeting, index) => {
          const Icon = meeting.icon;
          return (
            <li
              key={index}
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm">{meeting.title}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default UpcomingMeetings;
