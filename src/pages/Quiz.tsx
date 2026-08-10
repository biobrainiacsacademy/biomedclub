import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  SkipForward,
  CheckCircle2,
  XCircle,
  BarChart3,
  RotateCcw,
  Flame,
} from "lucide-react";
import { quizQuestions, type QuizQuestion } from "@/data/quizQuestions";
import {
  loadStats,
  saveStats,
  resetStats,
  touchDay,
  recordHistory,
  type QuizStats,
} from "@/lib/quizStorage";
import QuizStatsPanel from "@/components/QuizStatsPanel";
import FloatingParticles from "@/components/FloatingParticles";

const pickNext = (seen: string[]): QuizQuestion | null => {
  const pool = quizQuestions.filter((q) => !seen.includes(q.id));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
};

const Quiz = () => {
  const [stats, setStats] = useState<QuizStats>(() => loadStats());
  const [current, setCurrent] = useState<QuizQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [wrongChoices, setWrongChoices] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [triesThisQ, setTriesThisQ] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [cycleNotice, setCycleNotice] = useState(false);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const startQuestion = (seen: string[], cycles: number) => {
    let next = pickNext(seen);
    let nextSeen = seen;
    let nextCycles = cycles;
    if (!next) {
      nextSeen = [];
      nextCycles = cycles + 1;
      setCycleNotice(true);
      next = pickNext(nextSeen);
    }
    setStats((s) => ({ ...s, seen: nextSeen, cycles: nextCycles }));
    setCurrent(next);
    setSelected(null);
    setWrongChoices([]);
    setSolved(false);
    setShowHint(false);
    setTriesThisQ(0);
  };

  useEffect(() => {
    const s = touchDay(loadStats());
    setStats(s);
    startQuestion(s.seen, s.cycles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = () => {
    if (selected === null || !current || solved) return;
    if (selected === current.correct) {
      const firstTry = triesThisQ === 0;
      setSolved(true);
      setStats((s) => {
        const t = s.byTopic[current.topic] || { answered: 0, firstTry: 0, attempts: 0 };
        const updated: QuizStats = {
          ...s,
          answered: s.answered + 1,
          correctFirstTry: s.correctFirstTry + (firstTry ? 1 : 0),
          seen: s.seen.includes(current.id) ? s.seen : [...s.seen, current.id],
          byTopic: {
            ...s.byTopic,
            [current.topic]: {
              answered: t.answered + 1,
              firstTry: t.firstTry + (firstTry ? 1 : 0),
              attempts: t.attempts + triesThisQ + 1,
            },
          },
        };
        return recordHistory(updated, firstTry);
      });
    } else {
      setWrongChoices((w) => (w.includes(selected) ? w : [...w, selected]));
      setTriesThisQ((t) => t + 1);
      setStats((s) => ({ ...s, wrongAttempts: s.wrongAttempts + 1 }));
    }
  };

  const skip = () => {
    if (!current) return;
    setStats((s) => ({
      ...s,
      skipped: s.skipped + 1,
      seen: s.seen.includes(current.id) ? s.seen : [...s.seen, current.id],
    }));
    const seen = stats.seen.includes(current.id) ? stats.seen : [...stats.seen, current.id];
    startQuestion(seen, stats.cycles);
  };

  const next = () => {
    if (!current) return;
    const seen = stats.seen.includes(current.id) ? stats.seen : [...stats.seen, current.id];
    startQuestion(seen, stats.cycles);
  };

  const useHint = () => {
    if (showHint) return;
    setShowHint(true);
    setStats((s) => ({ ...s, hintsUsed: s.hintsUsed + 1 }));
  };

  const accuracy = useMemo(
    () => (stats.answered ? Math.round((stats.correctFirstTry / stats.answered) * 100) : 0),
    [stats.answered, stats.correctFirstTry],
  );

  return (
    <div className="min-h-screen relative">
      <FloatingParticles />
      <main className="max-w-3xl mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-sm text-primary font-semibold">
              <Flame className="w-4 h-4" /> {stats.streak} day streak
            </span>
            <button
              type="button"
              onClick={() => setShowStats((v) => !v)}
              className="inline-flex items-center gap-2 border border-border rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
            >
              <BarChart3 className="w-4 h-4" /> {showStats ? "Back to quiz" : "My stats"}
            </button>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-1">
          <span className="text-primary">BioBrainiacs</span>
          <span className="text-foreground"> Review Quiz</span>
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Endless practice questions from every past lesson. Solved {stats.answered} · {accuracy}% first try accuracy
        </p>

        {showStats ? (
          <>
            <QuizStatsPanel stats={stats} />
            <button
              type="button"
              onClick={() => {
                const fresh = resetStats();
                setStats(fresh);
                startQuestion([], 0);
                setShowStats(false);
              }}
              className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset all quiz progress
            </button>
          </>
        ) : current ? (
          <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-[0_0_40px_hsl(50,100%,50%,0.08)]">
            {cycleNotice && (
              <p className="text-xs text-accent mb-3">
                You have answered every question in the bank. Starting a fresh round.
              </p>
            )}
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Topic</p>
              <a
                href={current.lessonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                {current.topic}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-xs text-muted-foreground mt-1">Watch the lesson on YouTube</p>
            </div>

            <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">
              {current.question}
            </h2>

            <div className="space-y-2">
              {current.options.map((opt, i) => {
                const isWrong = wrongChoices.includes(i);
                const isCorrect = solved && i === current.correct;
                const isSelected = selected === i;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={solved || isWrong}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${
                      isCorrect
                        ? "border-primary bg-primary/15 text-foreground"
                        : isWrong
                          ? "border-destructive/60 bg-destructive/10 text-muted-foreground line-through cursor-not-allowed"
                          : isSelected
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-muted text-foreground hover:border-primary/60"
                    }`}
                  >
                    <span className="font-semibold mr-2 text-muted-foreground">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                    {isCorrect && <CheckCircle2 className="inline w-4 h-4 ml-2 text-primary" />}
                    {isWrong && <XCircle className="inline w-4 h-4 ml-2 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {showHint && !solved && (
              <div className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-3 text-sm text-foreground">
                <span className="font-semibold text-accent">Hint: </span>
                {current.hint}
              </div>
            )}

            {wrongChoices.length > 0 && !solved && (
              <p className="mt-3 text-sm text-destructive">
                Not quite. Try again, you can keep going until you get it.
              </p>
            )}

            {solved && (
              <div className="mt-4 rounded-xl border border-primary/40 bg-primary/10 p-4">
                <p className="text-sm font-semibold text-primary mb-1">
                  Correct{triesThisQ === 0 ? ", first try!" : "!"}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{current.explanation}</p>
                <a
                  href={current.lessonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent mt-3 hover:underline"
                >
                  Review this lesson on YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {!solved && (
                <>
                  <button
                    type="button"
                    onClick={submit}
                    disabled={selected === null}
                    className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    Submit answer
                  </button>
                  <button
                    type="button"
                    onClick={useHint}
                    disabled={showHint}
                    className="inline-flex items-center gap-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-accent text-sm px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Lightbulb className="w-4 h-4" /> Hint
                  </button>
                  <button
                    type="button"
                    onClick={skip}
                    className="inline-flex items-center gap-1.5 border border-border text-muted-foreground hover:text-foreground text-sm px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <SkipForward className="w-4 h-4" /> Skip
                  </button>
                </>
              )}
              {solved && (
                <button
                  type="button"
                  onClick={next}
                  className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all"
                >
                  Next question
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Loading question...</p>
        )}
      </main>

      <footer className="py-6 text-center text-muted-foreground text-sm relative z-10">
        © 2026 BioBrainiacs Academy
      </footer>
    </div>
  );
};

export default Quiz;
