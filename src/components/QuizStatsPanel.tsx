import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import type { QuizStats } from "@/lib/quizStorage";
import { totalQuestions } from "@/data/quizQuestions";

const StatBox = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-xl border border-border bg-card p-3 text-center">
    <div className="text-2xl font-bold text-primary tabular-nums">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const QuizStatsPanel = ({ stats }: { stats: QuizStats }) => {
  const accuracy = stats.answered ? Math.round((stats.correctFirstTry / stats.answered) * 100) : 0;
  const attempts = stats.answered + stats.wrongAttempts;
  const avgAttempts = stats.answered ? (attempts / stats.answered).toFixed(2) : "0";

  const topicData = useMemo(
    () =>
      Object.entries(stats.byTopic)
        .map(([topic, t]) => ({
          topic: topic.split(":")[0].slice(0, 18),
          accuracy: t.answered ? Math.round((t.firstTry / t.answered) * 100) : 0,
          answered: t.answered,
        }))
        .sort((a, b) => b.answered - a.answered),
    [stats.byTopic],
  );

  const historyData = useMemo(
    () =>
      stats.history.slice(-14).map((h) => ({
        date: h.date.slice(5),
        answered: h.answered,
        accuracy: h.answered ? Math.round((h.firstTry / h.answered) * 100) : 0,
      })),
    [stats.history],
  );

  const progress = Math.min(100, Math.round((stats.seen.length / totalQuestions) * 100));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBox label="Questions solved" value={stats.answered} />
        <StatBox label="First try accuracy" value={`${accuracy}%`} />
        <StatBox label="Day streak" value={`${stats.streak} 🔥`} />
        <StatBox label="Best streak" value={stats.bestStreak} />
        <StatBox label="Hints used" value={stats.hintsUsed} />
        <StatBox label="Skipped" value={stats.skipped} />
        <StatBox label="Avg tries per question" value={avgAttempts} />
        <StatBox label="Days practiced" value={stats.daysPlayed.length} />
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground font-medium">Question bank explored</span>
          <span className="text-muted-foreground">
            {stats.seen.length}/{totalQuestions} this round
            {stats.cycles > 0 ? ` · ${stats.cycles} full rounds done` : ""}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {topicData.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Accuracy by topic</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicData} margin={{ left: -20, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="topic" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {historyData.length > 1 && (
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Daily activity</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData} margin={{ left: -20, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="answered" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Solid line shows questions solved per day, the second line shows first try accuracy.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizStatsPanel;
