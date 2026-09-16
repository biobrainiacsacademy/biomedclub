import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isBot } from "@/lib/validation";
import QAQuestions from "@/components/QAQuestions";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  comments: z.string().trim().max(2000).optional().or(z.literal("")),
});

interface ClubDayJoinFormProps {
  isOpen: boolean;
  onClose: (submitted?: boolean) => void;
}

const ClubDayJoinForm = ({ isOpen, onClose }: ClubDayJoinFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBot(honeypot)) {
      toast({ title: "Thank you for registering!", description: "" });
      onClose(true);
      return;
    }

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors.map((err) => err.message).join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("registrations").insert({
      first_name: result.data.firstName,
      last_name: result.data.lastName,
      email: result.data.email,
      grade: "N/A",
      school: "N/A",
      how_heard: null,
      questions: result.data.comments
        ? `Guest Speaker Q&A signup. Comments: ${result.data.comments}`
        : "Guest Speaker Q&A signup",
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

    toast({ title: "Thank you for registering!", description: "" });
    setFormData({ firstName: "", lastName: "", email: "", comments: "" });
    onClose(true);
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background backdrop-blur-sm">
      <div className="card-gradient rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => onClose()}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-2 pr-10">
          Register: Guest Speaker Q&amp;A
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Paeto Wangweera. Sunday, September 20th at 2:00 PM, via Zoom.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                First Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Last Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Home (Personal) Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              required
              maxLength={255}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Any comments or concerns?
            </label>
            <textarea
              maxLength={2000}
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className={`${inputClass} min-h-[70px]`}
            />
          </div>

          <div className="qa-glow rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Questions for Paeto
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Submit a question you would like him to answer. You can also like other members
              questions to move the ones you care about toward the top.
            </p>
            <QAQuestions />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Register Now"}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            We use your details only to run this event. By registering you agree to our{" "}
            <Link to="/terms" className="text-accent hover:underline" target="_blank">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-accent hover:underline" target="_blank">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ClubDayJoinForm;
