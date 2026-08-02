export interface Meeting {
  date: string; // ISO date YYYY-MM-DD
  displayDate: string;
  title: string;
  time?: string; // display time, defaults to 12:00 PM EST
  isFinal?: boolean;
  isQA?: boolean;
}

export const SUMMER_SCHEDULE: Meeting[] = [
  { date: "2026-08-08", displayDate: "Saturday, August 8th", title: "Surgical Robots: Can Machines Save Lives?" },
  { date: "2026-08-15", displayDate: "Saturday, August 15th", title: "Space Medicine: Keeping Humans Alive Beyond Earth" },
  { date: "2026-08-22", displayDate: "Saturday, August 22nd", title: "The Future of Medicine: 2050", isFinal: true },
];

export function getNextMeeting(now: Date = new Date()): Meeting | null {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const upcoming = SUMMER_SCHEDULE.find((m) => {
    const [y, mo, d] = m.date.split("-").map(Number);
    return new Date(y, mo - 1, d).getTime() >= today;
  });
  return upcoming ?? null;
}
