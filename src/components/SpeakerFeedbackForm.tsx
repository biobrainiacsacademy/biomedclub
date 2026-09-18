import { useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isBot } from "@/lib/validation";
import { z } from "zod";

const INTERESTED = "Are you interested in attending the Guest Speaker Q&A?";
const HOLDING_UP = "What is the main reason you are unable to attend?";
const POSTPONE = "If we moved the event, which option would work best for you?";

const holdingUpOptions = ["Scheduling conflict", "It is just this week, I am busy"];

const postponeOptions = [
  "Saturday morning",
  "Saturday afternoon",
  "Saturday evening",
  "Sunday morning",
  "Sunday afternoon (around the same time)",
  "Sunday evening",
];

const otherSchema = z.string().trim().max(500);

interface SpeakerFeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpeakerFeedbackForm = ({ isOpen, onClose }: SpeakerFeedbackFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [interested, setInterested] = useState<string | null>(null);
  const [holdingUp, setHoldingUp] = useState<string | null>(null);
  const [holdingUpOther, setHoldingUpOther] = useState("");
  const [postpone, setPostpone] = useState<string | null>(null);
  const [postponeOther, setPostponeOther] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = () => {
    setStep(0);
    setInterested(null);
    setHoldingUp(null);
    setHoldingUpOther("");
    setPostpone(null);
    setPostponeOther("");
    setHoneypot("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const insertResponse = async (question: string, answer: string) => {
    const { error } = await supabase.from("poll_responses").insert({ question, answer });
    if (error) throw error;
  };

  const finish = async (responses: { question: string; answer: string }[]) => {
    if (isBot(honeypot)) {
      toast({ title: "Thank you for your feedback!" });
      handleClose();
      return;
    }
    setIsSubmitting(true);
    try {
      for (const r of responses) {
        await insertResponse(r.question, r.answer);
      }
      toast({ title: "Thank you for your feedback!" });
      handleClose();
    } catch {
      toast({
        title: "Error submitting",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestedNext = () => {
    if (!interested) return;
    if (interested === "Yes") {
      setStep(1);
    } else {
      finish([{ question: INTERESTED, answer: "No" }]);
    }
  };

  const handleHoldingUpNext = () => {
    if (!holdingUp) return;
    if (holdingUp === "Other") {
      const parsed = otherSchema.safeParse(holdingUpOther);
      if (!parsed.success || parsed.data.length === 0) {
        toast({
          title: "Please tell us more",
          description: "Enter a short answer for Other.",
          variant: "destructive",
        });
        return;
      }
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!postpone) return;
    const holdingAnswer =
      holdingUp === "Other" ? `Other: ${otherSchema.parse(holdingUpOther)}` : holdingUp!;
    const postponeAnswer =
      postpone === "Other" ? `Other: ${otherSchema.parse(postponeOther)}` : postpone!;
    if (postpone === "Other" && otherSchema.parse(postponeOther).length === 0) {
      toast({
        title: "Please tell us more",
        description: "Enter a short answer for Other.",
        variant: "destructive",
      });
      return;
    }
    await finish([
      { question: INTERESTED, answer: "Yes" },
      { question: HOLDING_UP, answer: holdingAnswer },
      { question: POSTPONE, answer: postponeAnswer },
    ]);
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  const optionClass = (active: boolean) =>
    `flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
      active ? "border-primary bg-primary/10" : "border-border bg-muted hover:border-primary/50"
    }`;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background backdrop-blur-sm">
      <div className="card-gradient rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-2 pr-10">Feedback Form</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Guest Speaker Q&amp;A: Paeto Wangweera
        </p>

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

        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{INTERESTED}</h3>
            <div className="space-y-2">
              {["Yes", "No"].map((option) => (
                <label key={option} className={optionClass(interested === option)}>
                  <input
                    type="radio"
                    name="interested"
                    value={option}
                    checked={interested === option}
                    onChange={() => setInterested(option)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{option}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleInterestedNext}
              disabled={!interested || isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 text-sm"
            >
              {isSubmitting ? "Submitting..." : interested === "No" ? "Submit" : "Next"}
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep(0)}
                aria-label="Back"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold text-foreground">{HOLDING_UP}</h3>
            </div>
            <div className="space-y-2">
              {[...holdingUpOptions, "Other"].map((option) => (
                <label key={option} className={optionClass(holdingUp === option)}>
                  <input
                    type="radio"
                    name="holding-up"
                    value={option}
                    checked={holdingUp === option}
                    onChange={() => setHoldingUp(option)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{option}</span>
                </label>
              ))}
            </div>
            {holdingUp === "Other" && (
              <input
                type="text"
                maxLength={500}
                placeholder="Tell us briefly"
                value={holdingUpOther}
                onChange={(e) => setHoldingUpOther(e.target.value)}
                className={inputClass}
              />
            )}
            <button
              onClick={handleHoldingUpNext}
              disabled={!holdingUp}
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 text-sm"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep(1)}
                aria-label="Back"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold text-foreground">{POSTPONE}</h3>
            </div>
            <div className="space-y-2">
              {[...postponeOptions, "Other"].map((option) => (
                <label key={option} className={optionClass(postpone === option)}>
                  <input
                    type="radio"
                    name="postpone"
                    value={option}
                    checked={postpone === option}
                    onChange={() => setPostpone(option)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{option}</span>
                </label>
              ))}
            </div>
            {postpone === "Other" && (
              <input
                type="text"
                maxLength={500}
                placeholder="Tell us briefly"
                value={postponeOther}
                onChange={(e) => setPostponeOther(e.target.value)}
                className={inputClass}
              />
            )}
            <button
              onClick={handleSubmit}
              disabled={!postpone || isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 text-sm"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SpeakerFeedbackForm;
