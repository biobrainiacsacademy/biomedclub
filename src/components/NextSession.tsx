import { Calendar, Clock, MapPin, Video } from "lucide-react";
import { useState, useEffect } from "react";
interface NextSessionProps {
  onRegisterClick: () => void;
}
const getTimeRemaining = (targetDate: Date) => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  const minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60));
  const seconds = Math.floor(difference % (1000 * 60) / 1000);
  return {
    days,
    hours,
    minutes,
    seconds
  };
};
const CountdownTimer = ({
  targetDate,
  label
}: {
  targetDate: Date;
  label: string;
}) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(targetDate));
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="mt-4 p-3 bg-background/50 rounded-lg">
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      <div className="flex gap-3 text-center">
        <div className="flex-1">
          <span className="text-xl font-bold text-primary">{timeRemaining.days}</span>
          <p className="text-xs text-muted-foreground">Days</p>
        </div>
        <div className="flex-1">
          <span className="text-xl font-bold text-primary">{timeRemaining.hours}</span>
          <p className="text-xs text-muted-foreground">Hours</p>
        </div>
        <div className="flex-1">
          <span className="text-xl font-bold text-primary">{timeRemaining.minutes}</span>
          <p className="text-xs text-muted-foreground">Mins</p>
        </div>
        <div className="flex-1">
          <span className="text-xl font-bold text-primary">{timeRemaining.seconds}</span>
          <p className="text-xs text-muted-foreground">Secs</p>
        </div>
      </div>
    </div>
  );
};
const NextSession = ({
  onRegisterClick
}: NextSessionProps) => {
  // Virtual meeting: Jan 31st, 2026 at 12:00 PM EST
  const virtualMeetingDate = new Date('2026-01-31T12:00:00-05:00');
  // Lab session: Feb 2nd, 2026 at 11:00 AM EST
  const labSessionDate = new Date('2026-02-02T11:00:00-05:00');
  return <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        <span className="text-primary">Upcoming</span>
        <span className="text-foreground"> Sessions</span>
      </h2>
      
      <div className="max-w-xl mx-auto card-gradient rounded-xl p-6">
        <div className="space-y-6">
          {/* Virtual Meeting */}
          <div className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                VIRTUAL
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
              Culturing Bacteria 101: Concepts Behind the Experiment
            </h3>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm">Feb 7th</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm">12:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-accent" />
                <span className="text-sm">via Zoom</span>
              </div>
            </div>
            <CountdownTimer targetDate={virtualMeetingDate} label="Starts in:" />
          </div>

          {/* Lab Session */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                LAB
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
              Experimental Microbiology: Culturing Bacteria
            </h3>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm">Feb 9th</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm">Lunch</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm">Room 248</span>
              </div>
            </div>
            <CountdownTimer targetDate={labSessionDate} label="Starts in:" />
          </div>
        </div>
        
        <button onClick={onRegisterClick} className="w-full mt-6 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 animate-pulse-glow">
          Register Now
        </button>
      </div>
    </section>;
};
export default NextSession;