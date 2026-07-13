import { useEffect, useState } from "react";
import { ThumbsUp, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface QAQuestion {
  id: string;
  question: string;
  likes: number;
  created_at: string;
}

const LIKED_KEY = "qa_liked_questions";

const getLiked = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(LIKED_KEY) || "[]");
  } catch {
    return [];
  }
};

const QAQuestions = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QAQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState<string[]>(getLiked());

  const load = async () => {
    const { data, error } = await (supabase as any)
      .from("qa_questions")
      .select("*")
      .order("likes", { ascending: false })
      .order("created_at", { ascending: true });
    if (!error && data) setQuestions(data as QAQuestion[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e?: React.MouseEvent | React.FormEvent) => {
    e?.preventDefault?.();
    const q = newQuestion.trim();
    if (q.length < 3 || q.length > 500) {
      toast({
        title: "Please enter a valid question",
        description: "Questions must be between 3 and 500 characters.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await (supabase as any).from("qa_questions").insert({ question: q });
    setSubmitting(false);
    if (error) {
      toast({ title: "Could not submit question", description: "Please try again.", variant: "destructive" });
      return;
    }
    setNewQuestion("");
    toast({ title: "Question submitted!", description: "Thanks for your question for Paeto." });
    load();
  };

  const toggleLike = async (id: string) => {
    const hasLiked = liked.includes(id);
    const delta = hasLiked ? -1 : 1;
    const rpc = hasLiked ? "unlike_qa_question" : "like_qa_question";

    // optimistic update
    setQuestions((prev) =>
      [...prev]
        .map((q) => (q.id === id ? { ...q, likes: Math.max(q.likes + delta, 0) } : q))
        .sort((a, b) => b.likes - a.likes || a.created_at.localeCompare(b.created_at)),
    );
    const next = hasLiked ? liked.filter((likedId) => likedId !== id) : [...liked, id];
    setLiked(next);
    localStorage.setItem(LIKED_KEY, JSON.stringify(next));

    const { error } = await (supabase as any).rpc(rpc, { _id: id });
    if (error) {
      // revert
      setLiked(liked);
      localStorage.setItem(LIKED_KEY, JSON.stringify(liked));
      toast({
        title: hasLiked ? "Could not remove like" : "Could not register like",
        variant: "destructive",
      });
      load();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Ask Paeto a question
        </label>
        <div className="flex flex-col gap-2">
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            maxLength={500}
            placeholder="What do you want to ask about biotech, research, or his career?"
            className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
          />
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="self-end bg-primary text-primary-foreground text-sm font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit question"}
          </button>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-foreground mb-2">
          Questions from others (like the ones you want answered)
        </div>
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading questions...
          </div>
        ) : questions.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">
            No questions yet. Be the first to ask!
          </p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {questions.map((q) => {
              const hasLiked = liked.includes(q.id);
              return (
                <li
                  key={q.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted"
                >
                  <button
                    type="button"
                    onClick={() => toggleLike(q.id)}
                    aria-label={hasLiked ? "Unlike question" : "Like question"}
                    className={`flex flex-col items-center justify-center min-w-[44px] rounded-md px-2 py-1 border transition-colors ${
                      hasLiked
                        ? "border-primary bg-primary/20 text-primary cursor-default"
                        : "border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-xs font-semibold mt-0.5">{q.likes}</span>
                  </button>
                  <p className="flex-1 text-sm text-foreground whitespace-pre-wrap break-words">
                    {q.question}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QAQuestions;
