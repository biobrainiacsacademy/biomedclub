import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isBot } from "@/lib/validation";

const QUESTION = "Which lab would you like to do to start the year?";

const labs = [
  {
    name: "DNA Extraction Lab",
    description:
      "Extract real DNA from strawberries using simple household items. You will follow the same steps scientists use to isolate genetic material and see DNA with your own eyes.",
  },
  {
    name: "ABO Blood Typing Lab",
    description:
      "Use simulated blood samples to figure out each donor's blood type. You will learn how antibodies react with antigens and why safe transfusions depend on matching types.",
  },
  {
    name: "Growing Bacteria Lab",
    description:
      "Collect samples from everyday surfaces and grow bacterial colonies on agar plates. You will practice sterile technique and find out which places around school are the dirtiest.",
  },
];

interface LabVoteFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LabVoteForm = ({ isOpen, onClose }: LabVoteFormProps) => {
  const { toast } = useToast();
  const [selected, setSelected] = useState<string[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleLab = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const reset = () => {
    setSelected([]);
    setHoneypot("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (selected.length === 0 || isSubmitting) return;
    if (isBot(honeypot)) {
      toast({ title: "Thanks for voting!" });
      handleClose();
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("poll_responses").insert(
        selected.map((lab) => ({
          question: QUESTION,
          answer: lab,
        }))
      );
      if (error) throw error;
      toast({ title: "Thanks for voting!" });
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

  if (!isOpen) return null;

  const optionClass = (active: boolean) =>
    `p-3 rounded-lg border cursor-pointer transition-colors ${
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

        <h2 className="text-2xl font-bold text-foreground mb-2 pr-10">Vote for Our First Lab</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Pick the lab you would like to do to start the year.
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

        <div className="space-y-3">
          {labs.map((lab) => (
            <label key={lab.name} className={`block ${optionClass(selected === lab.name)}`}>
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="lab-vote"
                  value={lab.name}
                  checked={selected === lab.name}
                  onChange={() => setSelected(lab.name)}
                  className="w-4 h-4 mt-0.5 text-primary border-border focus:ring-primary"
                />
                <div>
                  <span className="block text-sm font-semibold text-foreground">{lab.name}</span>
                  <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
                    {lab.description}
                  </span>
                </div>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selected || isSubmitting}
          className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 text-sm mt-6"
        >
          {isSubmitting ? "Submitting..." : "Submit Vote"}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default LabVoteForm;
