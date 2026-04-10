import { Beaker, Bug, Dna, Heart, Users } from "lucide-react";

const meetings = [
  { title: "DNA Extraction Lab", icon: Dna },
  { title: "Build Your Own DNA Double Helix", icon: Dna },
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
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 group cursor-default hover:translate-x-2 p-2 rounded-lg hover:bg-muted/30"
            >
              <div className="p-1.5 rounded-md bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                <Icon className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm">{meeting.title}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default UpcomingMeetings;
