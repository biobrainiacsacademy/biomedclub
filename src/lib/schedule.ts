export interface Meeting {
  date: string; // ISO date YYYY-MM-DD
  displayDate: string;
  title: string;
  isFinal?: boolean;
}

export const SUMMER_SCHEDULE: Meeting[] = [
  { date: "2026-07-04", displayDate: "July 4", title: "The Human Microbiome: The Hidden Organ Inside You" },
  { date: "2026-07-11", displayDate: "July 11", title: "Epigenetics: Why Your DNA Isn't Your Destiny" },
  { date: "2026-07-18", displayDate: "July 18", title: "The Race to Build Artificial Organs" },
  { date: "2026-07-25", displayDate: "July 25", title: "Pandemic Detectives: How Scientists Track New Diseases" },
  { date: "2026-08-01", displayDate: "August 1", title: "Inside Clinical Trials: How Medicines Become Safe" },
  { date: "2026-08-08", displayDate: "August 8", title: "Surgical Robots: Can Machines Save Lives?" },
  { date: "2026-08-15", displayDate: "August 15", title: "Space Medicine: Keeping Humans Alive Beyond Earth" },
  { date: "2026-08-22", displayDate: "August 22", title: "The Future of Medicine: 2050", isFinal: true },
];

export function getNextMeeting(now: Date = new Date()): Meeting | null {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const upcoming = SUMMER_SCHEDULE.find((m) => {
    const [y, mo, d] = m.date.split("-").map(Number);
    return new Date(y, mo - 1, d).getTime() >= today;
  });
  return upcoming ?? null;
}
