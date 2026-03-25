import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PostponePoll = () => {
  const { toast } = useToast();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selected) return;
    setIsSubmitting(true);

    const { error } = await supabase.from("poll_responses").insert({
      question: "Should we postpone the Anatomy Challenge to after spring break?",
      answer: selected,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error submitting vote",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: "Thanks for your response!",
      description: "Your vote has been recorded.",
    });
  };

  if (submitted) {
    return (
      <section className="py-6 px-4">
        <div className="max-w-md mx-auto card-gradient rounded-xl p-6 text-center">
          <p className="text-foreground font-semibold">Thanks for voting! 🎉</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 px-4">
      <div className="max-w-md mx-auto card-gradient rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-foreground text-center">
          Should we postpone the Anatomy Challenge to after spring break?
        </h3>
        <div className="space-y-2">
          {["Yes", "I do not mind"].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                selected === option
                  ? "border-primary bg-primary/10"
                  : "border-border bg-muted hover:border-primary/50"
              }`}
            >
              <input
                type="radio"
                name="postpone-poll"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <span className="text-sm text-foreground">{option}</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selected || isSubmitting}
          className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 text-sm"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </section>
  );
};

export default PostponePoll;
