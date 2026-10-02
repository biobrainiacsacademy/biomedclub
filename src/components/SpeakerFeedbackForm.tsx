import { useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isBot } from "@/lib/validation";

const REASONS = ["Scheduling conflict", "Unavailable this week only"];

const TIMES = [
  "Saturday morning",
  "Saturday afternoon",
  "Saturday evening",
  "Sunday morning",
  "Sunday afternoon (around the same time)",
  "Sunday evening",
];

interface SpeakerFeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpeakerFeedbackForm = ({ isOpen, onClose }: SpeakerFeedbackFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [reason, setReason] = useState("");
  const [reasonOther, setReasonOther] = useState("");
  const [times, setTimes] = useState<string[]>([]);
  const [timesOther, setTimesOther] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleTime = (t: string) =>
    setTimes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );

  const answerInterested = async (interested: boolean) => {
    if (isBot(honeypot)) {
      onClose();
      return;
    }
    if (!interested) {
      setIsSubmitting(true);
      await supabase
        .from("feedback_responses")
        .insert({ attending_interest: "No" });
      setIsSubmitting(false);
      onClose();
      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate you letting us know.",
      });
      return;
    }
    setStep(1);
  };

  const submitReason = () => {
    if (reason === "Other" && reasonOther.trim().length === 0) {
      toast({
        title: "Please tell us your reason",
        description: "Enter your reason to continue.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const submitFeedback = async () => {
    if (times.length === 0 && timesOther.trim().length === 0) {
      toast({
        title: "Please select at least one option",
        description: "Pick a time that would work for you, or choose Other.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    const reschedule = [
      ...times,
      ...(timesOther.trim() ? [`Other: ${timesOther.trim()}`] : []),
    ].join(", ");
    const { error } = await supabase.from("feedback_responses").insert({
      attending_interest: "Yes",
      cant_attend_reason: reason,
      cant_attend_reason_other: reason === "Other" ? reasonOther.trim() : null,
      reschedule_preference: reschedule,
    });
    setIsSubmitting(false);
    if (error) {
      toast({
        title: "Error submitting",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }
    onClose();
    toast({
      title: "Thank you for your feedback!",
      description: "Every answer helps us plan future events.",
    });
  };

  const inputClass =
    "w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background backdrop-blur-sm">
      <div className="card-gradient rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close feedback form"
        >
          <X className="w-6 h-6" />
        </button>

        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <h2 className="text-2xl font-bold text-foreground mb-6 pr-10 pl-8 text-center">
          Guest Speaker Q&A Feedback
        </h2>

        {step === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-foreground text-center">
              Are you interested in the Guest Speaker Q&A?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => answerInterested(true)}
                disabled={isSubmitting}
                className="flex-1 bg-primary text-primary-foreground font-semibold py-2.5 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm disabled:opacity-50"
              >
                Yes
              </button>
              <button
                onClick={() => answerInterested(false)}
                disabled={isSubmitting}
                className="flex-1 bg-muted text-foreground font-semibold py-2.5 px-6 rounded-lg border border-border hover:bg-muted/70 transition-all duration-300 text-sm disabled:opacity-50"
              >
                No
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-foreground text-center">
              What is the main reason you are unable to attend?
            </p>
            <div className="space-y-2">
              {REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`w-full text-left text-sm py-2.5 px-4 rounded-lg border transition-all duration-300 ${
                    reason === r
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border bg-muted text-foreground hover:border-primary"
                  }`}
                >
                  {r}
                </button>
              ))}
              <button
                onClick={() => setReason("Other")}
                className={`w-full text-left text-sm py-2.5 px-4 rounded-lg border transition-all duration-300 ${
                  reason === "Other"
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-border bg-muted text-foreground hover:border-primary"
                }`}
              >
                Other
              </button>
              {reason === "Other" && (
                <input
                  type="text"
                  value={reasonOther}
                  onChange={(e) => setReasonOther(e.target.value)}
                  placeholder="Please tell us your reason"
                  maxLength={500}
                  className={inputClass}
                />
              )}
            </div>
            <button
              onClick={submitReason}
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-foreground text-center">
              For future events, which options would work for you? Select
              all that apply.
            </p>
            <div className="space-y-2">
              {TIMES.map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-3 text-sm text-foreground py-2 px-4 rounded-lg border border-border bg-muted cursor-pointer hover:border-primary transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={times.includes(t)}
                    onChange={() => toggleTime(t)}
                    className="accent-primary"
                  />
                  {t}
                </label>
              ))}
              <label className="flex items-center gap-3 text-sm text-foreground py-2 px-4 rounded-lg border border-border bg-muted cursor-pointer hover:border-primary transition-colors">
                <input
                  type="checkbox"
                  checked={timesOther.trim().length > 0}
                  onChange={() => setTimesOther(timesOther ? "" : " ")}
                  className="accent-primary"
                />
                Other
              </label>
              {timesOther.trim().length > 0 && (
                <input
                  type="text"
                  value={timesOther}
                  onChange={(e) => setTimesOther(e.target.value)}
                  placeholder="Please tell us a time that works"
                  maxLength={500}
                  className={inputClass}
                />
              )}
            </div>
            <button
              onClick={submitFeedback}
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SpeakerFeedbackForm;
