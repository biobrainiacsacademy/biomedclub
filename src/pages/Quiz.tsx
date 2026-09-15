import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

import { Link } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  Lightbulb,
  SkipForward,
  CheckCircle2,
  XCircle,
  BarChart3,
  RotateCcw,
  Flame,
  Layers,
  Zap,
  Check,
  Users,
  X,
} from "lucide-react";
import { quizQuestions, quizTopics, type QuizQuestion } from "@/data/quizQuestions";
import {
  loadStats,
  saveStats,
  resetStats,
  touchDay,
  recordHistory,
  loadUsername,
  saveUsername,
  getDeviceId,
  loadShareStats,
  saveShareStats,
  loadUsernameDismissed,
  saveUsernameDismissed,
  type QuizStats,
} from "@/lib/quizStorage";

type LeaderRow = {
  username: string;
  answered: number;
  correct_first_try: number;
  best_streak: number;
  last_active: string;
};
import QuizStatsPanel from "@/components/QuizStatsPanel";
import FloatingParticles from "@/components/FloatingParticles";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import { getYouTubeId } from "@/lib/youtube";

const ALL = "All units";

const pickNext = (
  seen: string[],
  topic: string,
  avoidId?: string | null,
): QuizQuestion | null => {
  const scope = topic === ALL ? quizQuestions : quizQuestions.filter((q) => q.topic === topic);
  if (scope.length === 0) return null;
  let pool = scope.filter((q) => !seen.includes(q.id));
  if (pool.length === 0) return null;
  if (pool.length > 1 && avoidId) {
    const filtered = pool.filter((q) => q.id !== avoidId);
    if (filtered.length > 0) pool = filtered;
  }
  return pool[Math.floor(Math.random() * pool.length)];
};

const Quiz = () => {
  const [stats, setStats] = useState<QuizStats>(() => loadStats());
  const [topic, setTopic] = useState<string>(ALL);
  const [showTopics, setShowTopics] = useState(false);
  const [current, setCurrent] = useState<QuizQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [wrongChoices, setWrongChoices] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [triesThisQ, setTriesThisQ] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [playing, setPlaying] = useState<QuizQuestion | null>(null);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [sessionFirstTry, setSessionFirstTry] = useState(0);
  const [run, setRun] = useState(0);
  const [bestRun, setBestRun] = useState(0);
  const [freshCount, setFreshCount] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [username, setUsername] = useState<string | null>(() => loadUsername());
  const [nameDraft, setNameDraft] = useState("");
  const [shareDraft, setShareDraft] = useState<boolean | null>(null);
  const [shareStats, setShareStats] = useState<boolean>(() => loadShareStats());
  const [usernameDismissed, setUsernameDismissed] = useState(() => loadUsernameDismissed());
  const [showWelcome, setShowWelcome] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [board, setBoard] = useState<LeaderRow[] | null>(null);
  const [boardLoading, setBoardLoading] = useState(false);

  const aiQueue = useRef<QuizQuestion[]>([]);
  const pendingByTopic = useRef(new Map<string, Promise<void>>());
  const askedTexts = useRef<string[]>([]);
  const syncRef = useRef({ stats, topic, sessionAnswered, sessionFirstTry, username, shareStats });
  const lastSynced = useRef(-1);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  useEffect(() => {
    syncRef.current = { stats, topic, sessionAnswered, sessionFirstTry, username, shareStats };
  }, [stats, topic, sessionAnswered, sessionFirstTry, username, shareStats]);


  /** Push a brief progress snapshot to the cloud so attempts are visible. */
  const syncToCloud = (immediate = false) => {
    const { stats: s, topic: t, sessionAnswered: sa, sessionFirstTry: sf, username: name, shareStats: share } =
      syncRef.current;
    if (!name) return;
    if (s.answered === lastSynced.current && !immediate) return;
    lastSynced.current = s.answered;
    const payload = {
      username: name,
      device_id: getDeviceId(),
      unit: t,
      answered: s.answered,
      correct_first_try: s.correctFirstTry,
      wrong_attempts: s.wrongAttempts,
      hints_used: s.hintsUsed,
      skipped: s.skipped,
      streak: s.streak,
      best_streak: s.bestStreak,
      session_answered: sa,
      session_first_try: sf,
      share_stats: share,
    };
    // keepalive so the snapshot still lands when the tab is closing
    const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/quiz_activity`;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    void fetch(url, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    }).catch(() => {
      /* offline, progress stays saved locally */
    });
  };

  useEffect(() => {
    if (!username) return;
    // log the visit right away so attempts show up in the cloud
    syncToCloud(true);
    const flush = () => {
      if (document.visibilityState === "hidden") syncToCloud(true);
    };
    const onHide = () => syncToCloud(true);
    document.addEventListener("visibilitychange", flush);
    window.addEventListener("pagehide", onHide);
    const interval = window.setInterval(() => syncToCloud(), 60000);
    return () => {
      document.removeEventListener("visibilitychange", flush);
      window.removeEventListener("pagehide", onHide);
      window.clearInterval(interval);
      syncToCloud();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (username && sessionAnswered > 0 && sessionAnswered % 5 === 0) syncToCloud();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionAnswered]);

  useEffect(() => {
    if (username) {
      setShowWelcome(true);
      const t = window.setTimeout(() => setShowWelcome(false), 10000);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  /** Pull brand new AI written questions so practice never runs out. */
  const topUp = async (forTopic: string, force = false) => {
    const queuedForMode = aiQueue.current.filter(
      (q) => forTopic === ALL || q.topic === forTopic,
    ).length;
    if (!force && queuedForMode >= 3) return;

    const pick =
      forTopic === ALL
        ? quizTopics[Math.floor(Math.random() * quizTopics.length)]
        : quizTopics.find((t) => t.name === forTopic) ?? quizTopics[0];
    if (!pick) return;

    const existing = pendingByTopic.current.get(pick.name);
    if (existing) {
      await existing;
      return;
    }

    const request = (async () => {
      const { data, error } = await supabase.functions.invoke("generate-quiz-question", {
        body: {
          topic: pick.name,
          lessonUrl: pick.url,
          avoid: askedTexts.current,
          count: 3,
        },
      });
      if (error) return;
      const queuedTexts = new Set(aiQueue.current.map((q) => q.question));
      const incoming: QuizQuestion[] = (data?.questions ?? []).filter(
        (q: QuizQuestion) =>
          !askedTexts.current.includes(q.question) && !queuedTexts.has(q.question),
      );
      incoming.forEach((q) => askedTexts.current.push(q.question));
      askedTexts.current = askedTexts.current.slice(-60);
      aiQueue.current = [...aiQueue.current, ...incoming];
    })();

    pendingByTopic.current.set(pick.name, request);
    try {
      await request;
    } finally {
      if (pendingByTopic.current.get(pick.name) === request) {
        pendingByTopic.current.delete(pick.name);
      }
    }
  };

  const takeFromQueue = (forTopic: string): QuizQuestion | null => {
    const i = aiQueue.current.findIndex((q) => forTopic === ALL || q.topic === forTopic);
    if (i < 0) return null;
    const q = aiQueue.current[i];
    aiQueue.current = aiQueue.current.filter((_, idx) => idx !== i);
    return q;
  };

  const applyQuestion = (next: QuizQuestion | null) => {
    setCurrent(next);
    setSelected(null);
    setWrongChoices([]);
    setSolved(false);
    setShowHint(false);
    setTriesThisQ(0);
    if (next) askedTexts.current.push(next.question);
  };

  const startQuestion = async (seen: string[], cycles: number, forTopic: string) => {
    const prevId = current?.id ?? null;
    const banked = pickNext(seen, forTopic, prevId);
    if (banked) {
      setStats((s) => ({ ...s, seen, cycles }));
      applyQuestion(banked);
      void topUp(forTopic);
      return;
    }

    // Bank is done for this scope, serve freshly generated questions forever.
    let fresh = takeFromQueue(forTopic);
    if (!fresh) {
      setGenerating(true);
      // Wait for the writer, and retry so practice truly never ends.
      for (let attempt = 0; attempt < 3 && !fresh; attempt++) {
        await topUp(forTopic, true);
        fresh = takeFromQueue(forTopic);
      }
      setGenerating(false);
    }

    if (fresh) {
      setFreshCount((n) => n + 1);
      setStats((s) => ({ ...s, seen, cycles }));
      applyQuestion(fresh);
      void topUp(forTopic);
      return;
    }

    // Offline or AI unavailable: recycle the bank so the quiz still never stops.
    const scopeIds =
      forTopic === ALL
        ? null
        : new Set(quizQuestions.filter((q) => q.topic === forTopic).map((q) => q.id));
    const nextSeen = scopeIds ? seen.filter((id) => !scopeIds.has(id)) : [];
    let next = pickNext(nextSeen, forTopic, prevId);
    if (!next) {
      const scope =
        forTopic === ALL ? quizQuestions : quizQuestions.filter((q) => q.topic === forTopic);
      const bank = scope.length > 0 ? scope : quizQuestions;
      next = bank[Math.floor(Math.random() * bank.length)];
    }
    setStats((s) => ({ ...s, seen: nextSeen, cycles: cycles + 1 }));
    applyQuestion(next);
    void topUp(forTopic);
  };



  useEffect(() => {
    const s = touchDay(loadStats());
    setStats(s);
    void startQuestion(s.seen, s.cycles, ALL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chooseTopic = (name: string) => {
    setTopic(name);
    setShowTopics(false);
    setShowStats(false);
    void startQuestion(stats.seen, stats.cycles, name);
  };

  const submit = () => {
    if (selected === null || !current || solved) return;
    if (selected === current.correct) {
      const firstTry = triesThisQ === 0;
      setSolved(true);
      setSessionAnswered((n) => n + 1);
      setSessionFirstTry((n) => n + (firstTry ? 1 : 0));
      setRun((r) => {
        const nr = firstTry ? r + 1 : 0;
        setBestRun((b) => Math.max(b, nr));
        return nr;
      });
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
      setRun(0);
      setStats((s) => ({ ...s, wrongAttempts: s.wrongAttempts + 1 }));
    }
  };

  const skip = () => {
    if (!current) return;
    setRun(0);
    setStats((s) => ({
      ...s,
      skipped: s.skipped + 1,
      seen: s.seen.includes(current.id) ? s.seen : [...s.seen, current.id],
    }));
    const seen = stats.seen.includes(current.id) ? stats.seen : [...stats.seen, current.id];
    void startQuestion(seen, stats.cycles, topic);
  };

  const next = () => {
    if (!current) return;
    const seen = stats.seen.includes(current.id) ? stats.seen : [...stats.seen, current.id];
    void startQuestion(seen, stats.cycles, topic);
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

  const unitProgress = useMemo(() => {
    const scope =
      topic === ALL ? quizQuestions : quizQuestions.filter((q) => q.topic === topic);
    const done = scope.filter((q) => stats.seen.includes(q.id)).length;
    return { done };
  }, [topic, stats.seen]);

  /** Fetch the opt in leaderboard so students can compare stats. */
  const loadBoard = async () => {
    setBoardLoading(true);
    const { data } = await supabase.rpc("get_quiz_leaderboard");
    setBoard((data as LeaderRow[] | null) ?? []);
    setBoardLoading(false);
  };

  const toggleBoard = () => {
    const nextOpen = !showBoard;
    setShowBoard(nextOpen);
    if (nextOpen) {
      setShowStats(false);
      void loadBoard();
    }
  };

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
              onClick={toggleBoard}
              className="inline-flex items-center gap-2 border border-border rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
            >
              <Users className="w-4 h-4" /> {showBoard ? "Back to quiz" : "Compare"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowBoard(false);
                setShowStats((v) => !v);
              }}
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
        {username && showWelcome && (
          <p className="text-center text-primary font-semibold mb-1">
            Welcome back {username}!
          </p>
        )}
        <p className="text-center text-muted-foreground text-sm mb-5">
          Infinite practice in every mode, all units or a single unit. Solved {stats.answered} · {accuracy}% first try accuracy
          {freshCount > 0 && <> · {freshCount} freshly written for you</>}
        </p>
        {generating && (
          <p className="text-center text-xs text-accent mb-4 animate-pulse">
            Writing a brand new question for this unit...
          </p>
        )}



        {/* Unit picker */}
        <div className="mb-5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setShowTopics((v) => !v)}
              className="inline-flex items-center gap-2 border border-primary/50 bg-primary/10 text-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:border-primary transition-colors"
            >
              <Layers className="w-4 h-4 text-primary" />
              {topic === ALL ? "Practice by unit" : topic}
            </button>
            {topic !== ALL && (
              <button
                type="button"
                onClick={() => chooseTopic(ALL)}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Clear unit
              </button>
            )}
          </div>

          {showTopics && (
            <div className="mt-3 rounded-xl border border-border bg-card p-3 max-h-72 overflow-y-auto space-y-1">
              <button
                type="button"
                onClick={() => chooseTopic(ALL)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  topic === ALL ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <span className="font-semibold">All units</span>{" "}
                <span className="text-xs">Unlimited practice</span>
                {topic === ALL && <Check className="inline w-4 h-4 ml-2 text-primary" />}
              </button>
              {quizTopics.map((t) => {
                const done = quizQuestions.filter(
                  (q) => q.topic === t.name && stats.seen.includes(q.id),
                ).length;
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => chooseTopic(t.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      topic === t.name
                        ? "bg-primary/15 text-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="font-medium text-foreground">{t.name}</span>
                    <span className="block text-xs">
                      Unlimited practice, {done} completed
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{topic === ALL ? "All units" : "Selected unit"}</span>
            <span>Unlimited practice, {unitProgress.done} bank questions completed</span>
          </div>

          {/* Session scoreboard */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-border bg-card py-2">
              <p className="text-lg font-bold text-foreground">{sessionAnswered}</p>
              <p className="text-[11px] text-muted-foreground">This session</p>
            </div>
            <div className="rounded-lg border border-border bg-card py-2">
              <p className="text-lg font-bold text-foreground">
                {sessionAnswered ? Math.round((sessionFirstTry / sessionAnswered) * 100) : 0}%
              </p>
              <p className="text-[11px] text-muted-foreground">Session accuracy</p>
            </div>
            <div className="rounded-lg border border-border bg-card py-2">
              <p className="text-lg font-bold text-primary inline-flex items-center gap-1">
                <Zap className="w-4 h-4" /> {run}
              </p>
              <p className="text-[11px] text-muted-foreground">Run, best {bestRun}</p>
            </div>
          </div>
        </div>

        {showBoard ? (
          <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <h2 className="text-lg font-bold text-foreground mb-1">Compare with others</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Only students who chose to share their stats appear here.
            </p>
            {!shareStats && username && (
              <div className="mb-4 rounded-lg border border-accent/40 bg-accent/10 p-3 text-sm">
                <p className="text-foreground mb-2">
                  You are currently anonymous. Want to appear on this board with your username?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    saveShareStats(true);
                    setShareStats(true);
                    syncToCloud(true);
                    void loadBoard();
                  }}
                  className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Share my stats
                </button>
              </div>
            )}
            {boardLoading ? (
              <p className="text-sm text-muted-foreground">Loading leaderboard...</p>
            ) : !board || board.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No shared stats yet. Be the first to share yours.
              </p>
            ) : (
              <div className="space-y-2">
                {board.map((row, i) => {
                  const isMe = username && row.username === username;
                  const acc = row.answered
                    ? Math.round((row.correct_first_try / row.answered) * 100)
                    : 0;
                  return (
                    <div
                      key={`${row.username}-${i}`}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                        isMe
                          ? "border-primary bg-primary/10"
                          : "border-border bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-sm font-bold text-primary w-7 shrink-0">
                          {i + 1}.
                        </span>
                        <span className="text-sm font-semibold text-foreground truncate">
                          {row.username}
                          {isMe && <span className="text-xs text-primary ml-1">(you)</span>}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                        <span>
                          <span className="text-foreground font-semibold">{row.answered}</span> solved
                        </span>
                        <span>
                          <span className="text-foreground font-semibold">{acc}%</span> accuracy
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-primary" />
                          <span className="text-foreground font-semibold">{row.best_streak}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : showStats ? (
          <>
            <QuizStatsPanel stats={stats} />
            <button
              type="button"
              onClick={() => {
                const fresh = resetStats();
                setStats(fresh);
                setSessionAnswered(0);
                setSessionFirstTry(0);
                setRun(0);
                setBestRun(0);
                void startQuestion([], 0, topic);
                setShowStats(false);
              }}
              className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset all quiz progress
            </button>
          </>
        ) : current ? (
          <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-[0_0_40px_hsl(50,100%,50%,0.08)]">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Topic</p>
              <button
                type="button"
                onClick={() => setPlaying(current)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline text-left"
              >
                {current.topic}
                <PlayCircle className="w-4 h-4" />
              </button>
              <p className="text-xs text-muted-foreground mt-1">Watch the lesson right here</p>
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
                <button
                  type="button"
                  onClick={() => setPlaying(current)}
                  className="inline-flex items-center gap-1.5 text-xs text-accent mt-3 hover:underline"
                >
                  Review this lesson <PlayCircle className="w-3.5 h-3.5" />
                </button>
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

      {playing && getYouTubeId(playing.lessonUrl) && (
        <VideoPlayerModal
          videoId={getYouTubeId(playing.lessonUrl) as string}
          title={playing.topic}
          onClose={() => setPlaying(null)}
        />
      )}

      {!username && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = nameDraft.trim().slice(0, 40);
              if (!name || shareDraft === null) return;
              saveUsername(name);
              saveShareStats(shareDraft);
              setShareStats(shareDraft);
              setUsername(name);
            }}
            className="card-gradient rounded-xl p-6 w-full max-w-sm space-y-4"
          >
            <h2 className="text-xl font-bold text-foreground">Pick a username</h2>
            <p className="text-sm text-muted-foreground">
              Your username saves your quiz progress, streak, and stats so you can pick up right
              where you left off.
            </p>
            <input
              autoFocus
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              maxLength={40}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
            />
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">
                Can other studiers see your stats with your username?
              </p>
              <button
                type="button"
                onClick={() => setShareDraft(true)}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-left transition-colors ${
                  shareDraft === true
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border bg-muted text-muted-foreground hover:border-primary/60"
                }`}
              >
                Yes, show my username on the leaderboard
              </button>
              <button
                type="button"
                onClick={() => setShareDraft(false)}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-left transition-colors ${
                  shareDraft === false
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border bg-muted text-muted-foreground hover:border-primary/60"
                }`}
              >
                No, keep me anonymous
              </button>
            </div>
            <button
              type="submit"
              disabled={!nameDraft.trim() || shareDraft === null}
              className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-semibold disabled:opacity-50"
            >
              Start practicing
            </button>
            <p className="text-xs text-muted-foreground text-center">
              By continuing you agree to our{" "}
              <Link to="/terms" className="text-accent hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              . Please pick a username that is not your full real name.
            </p>
          </form>
        </div>
      )}

      <footer className="py-6 text-center text-muted-foreground text-sm relative z-10 space-y-2">
        <div className="flex items-center justify-center gap-4">
          <Link to="/privacy" className="hover:text-accent transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-accent transition-colors">
            Terms of Service
          </Link>
        </div>
        <p>© 2026 BioBrainiacs Academy</p>
      </footer>
    </div>
  );
};

export default Quiz;
