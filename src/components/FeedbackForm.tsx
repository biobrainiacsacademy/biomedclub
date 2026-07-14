import { useMemo, useState } from "react";
import { X, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type Answers = {
  attending_interest?: "Yes" | "Maybe" | "No";
  cant_attend_reason?: string;
  cant_attend_reason_other?: string;
  reschedule_preference?: string;
  topics_interest?: string;
  additional_feedback?: string;
};

const RESCHEDULE_OPTIONS = [
  "Later this summer (Weekday evening)",
  "Later this summer (Weekend)",
  "First meeting of the upcoming school year (Fall 2026)",
];

const REASON_OPTIONS = [
  "Work or internship conflict",
  "Travel or vacation",
  "Scheduling conflict (time of day)",
  "Other",
];

const FeedbackForm = ({ isOpen, onClose }: FeedbackFormProps) => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const steps = useMemo(() => {
    if (answers.attending_interest === "No") {
      return ["interest", "topics", "feedback"] as const;
    }
    return ["interest", "reason", "reschedule", "topics", "feedback"] as const;
  }, [answers.attending_interest]);

  const currentKey = steps[step];
  const isLast = step === steps.length - 1;

  const canProceed = (): boolean => {
    switch (currentKey) {
      case "interest":
        return !!answers.attending_interest;
      case "reason":
        if (!answers.cant_attend_reason) return false;
        if (answers.cant_attend_reason === "Other")
          return !!answers.cant_attend_reason_other?.trim();
        return true;
      case "reschedule":
        return !!answers.reschedule_preference;
      case "topics":
        return !!answers.topics_interest?.trim();
      case "feedback":
        return !!answers.additional_feedback?.trim();
    }
    return false;
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 200);
  };

  const submit = async () => {
    setSubmitting(true);
    const { error } = await supabase.from("feedback_responses" as any).insert({
      attending_interest: answers.attending_interest,
      cant_attend_reason: answers.cant_attend_reason || null,
      cant_attend_reason_other: answers.cant_attend_reason_other || null,
      reschedule_preference: answers.reschedule_preference || null,
      topics_interest: answers.topics_interest || null,
      additional_feedback: answers.additional_feedback || null,
    });
    setSubmitting(false);
    if (error) {
      toast({
        title: "Could not submit feedback",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Thank you!",
      description: "Your feedback has been submitted.",
    });
    handleClose();
  };

  const next = () => {
    if (!canProceed()) return;
    if (isLast) {
      submit();
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  if (!isOpen) return null;

  const renderStep = () => {
    switch (currentKey) {
      case "interest":
        return (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Are you interested in attending a Q&amp;A session with Paeto Wangweera?
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(["Yes", "Maybe", "No"] as const).map((opt) => {
                const selected = answers.attending_interest === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setAnswers((a) => ({ ...a, attending_interest: opt }))
                    }
                    className={`py-3 px-4 rounded-lg border font-medium transition-all ${
                      selected
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border bg-muted text-foreground hover:border-primary/50"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      case "reason":
        return (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              What is your primary reason for being unable to attend this Wednesday at 1:30 PM?
            </h3>
            <div className="space-y-2">
              {REASON_OPTIONS.map((opt) => {
                const selected = answers.cant_attend_reason === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setAnswers((a) => ({ ...a, cant_attend_reason: opt }))
                    }
                    className={`w-full text-left py-3 px-4 rounded-lg border font-medium transition-all ${
                      selected
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border bg-muted text-foreground hover:border-primary/50"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answers.cant_attend_reason === "Other" && (
              <textarea
                value={answers.cant_attend_reason_other || ""}
                onChange={(e) =>
                  setAnswers((a) => ({
                    ...a,
                    cant_attend_reason_other: e.target.value,
                  }))
                }
                maxLength={1000}
                placeholder="Please specify..."
                className="mt-3 w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
              />
            )}
          </div>
        );
      case "reschedule":
        return (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              If this event is rescheduled, which option would you prefer?
            </h3>
            <div className="space-y-2">
              {RESCHEDULE_OPTIONS.map((opt) => {
                const selected = answers.reschedule_preference === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setAnswers((a) => ({ ...a, reschedule_preference: opt }))
                    }
                    className={`w-full text-left py-3 px-4 rounded-lg border font-medium transition-all ${
                      selected
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border bg-muted text-foreground hover:border-primary/50"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      case "topics":
        return (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              What specific biotech topics or fields would you like the club to explore next?
            </h3>
            <textarea
              value={answers.topics_interest || ""}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, topics_interest: e.target.value }))
              }
              maxLength={2000}
              placeholder="Share the topics you're most curious about..."
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[140px]"
            />
          </div>
        );
      case "feedback":
        return (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Do you have any additional suggestions or feedback for the BioMed Club leadership?
            </h3>
            <textarea
              value={answers.additional_feedback || ""}
              onChange={(e) =>
                setAnswers((a) => ({
                  ...a,
                  additional_feedback: e.target.value,
                }))
              }
              maxLength={2000}
              placeholder="We'd love to hear your thoughts..."
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[140px]"
            />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="card-gradient rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-1">Feedback Form</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Question {step + 1} of {steps.length}
        </p>

        <div className="w-full h-1.5 bg-muted rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="mb-6">{renderStep()}</div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border text-foreground hover:border-primary/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canProceed() || submitting}
            className="flex items-center gap-1 px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {isLast ? (
              <>
                {submitting ? "Submitting..." : "Submit"}
                {!submitting && <Check className="w-4 h-4" />}
              </>
            ) : (
              <>
                Next <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
