export type QuizStats = {
  seen: string[];
  cycles: number;
  answered: number;
  correctFirstTry: number;
  wrongAttempts: number;
  hintsUsed: number;
  skipped: number;
  streak: number;
  bestStreak: number;
  lastPlayed: string | null;
  daysPlayed: string[];
  byTopic: Record<string, { answered: number; firstTry: number; attempts: number }>;
  history: { date: string; answered: number; firstTry: number }[];
};

const KEY = "bb_quiz_stats_v1";

const empty = (): QuizStats => ({
  seen: [],
  cycles: 0,
  answered: 0,
  correctFirstTry: 0,
  wrongAttempts: 0,
  hintsUsed: 0,
  skipped: 0,
  streak: 0,
  bestStreak: 0,
  lastPlayed: null,
  daysPlayed: [],
  byTopic: {},
  history: [],
});

export const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const dayDiff = (a: string, b: string) =>
  Math.round((new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime()) / 86400000);

export const loadStats = (): QuizStats => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    return { ...empty(), ...JSON.parse(raw) };
  } catch {
    return empty();
  }
};

export const saveStats = (s: QuizStats) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable */
  }
};

export const resetStats = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
  return empty();
};

/** Registers activity for today and updates the daily streak. */
export const touchDay = (s: QuizStats): QuizStats => {
  const today = todayKey();
  if (s.lastPlayed === today) return s;
  let streak = 1;
  if (s.lastPlayed) {
    const diff = dayDiff(s.lastPlayed, today);
    streak = diff === 1 ? s.streak + 1 : 1;
  }
  return {
    ...s,
    streak,
    bestStreak: Math.max(s.bestStreak, streak),
    lastPlayed: today,
    daysPlayed: s.daysPlayed.includes(today) ? s.daysPlayed : [...s.daysPlayed, today],
  };
};

export const recordHistory = (s: QuizStats, firstTry: boolean): QuizStats => {
  const today = todayKey();
  const history = [...s.history];
  const idx = history.findIndex((h) => h.date === today);
  if (idx === -1) history.push({ date: today, answered: 1, firstTry: firstTry ? 1 : 0 });
  else
    history[idx] = {
      ...history[idx],
      answered: history[idx].answered + 1,
      firstTry: history[idx].firstTry + (firstTry ? 1 : 0),
    };
  return { ...s, history: history.slice(-60) };
};
