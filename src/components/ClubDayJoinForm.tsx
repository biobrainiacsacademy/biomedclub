import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isBot } from "@/lib/validation";
import { z } from "zod";

const clubDaySchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  grade: z.enum(["9", "10", "11", "12"], { errorMap: () => ({ message: "Please select a valid grade" }) }),
  schoolId: z.string().trim().min(1, "School ID is required").max(50),
});

interface ClubDayJoinFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClubDayJoinForm = ({ isOpen, onClose }: ClubDayJoinFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    grade: "",
    schoolId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBot(honeypot)) {
      toast({
        title: "You're In!",
        description: "Thanks for joining BioMed Club. See you at Club Day!",
      });
      onClose();
      return;
    }

    const result = clubDaySchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors.map((err) => err.message).join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("club_day_signups").insert({
      first_name: result.data.firstName,
      last_name: result.data.lastName,
      grade: result.data.grade,
      school_id: result.data.schoolId,
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

    toast({
      title: "You're In!",
      description: "Thanks for joining BioMed Club. See you at Club Day!",
    });
    onClose();
    setFormData({ firstName: "", lastName: "", grade: "", schoolId: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="card-gradient rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-2">Join BioMed Club</h2>
        <p className="text-sm text-muted-foreground mb-6">Sign up for Club Day on Tuesday, September 15th.</p>

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
                className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John"
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
                className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Grade Level <span className="text-destructive">*</span>
            </label>
            <select
              required
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select grade</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              School ID <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={50}
              value={formData.schoolId}
              onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your school ID"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
          >
          {isSubmitting ? "Submitting..." : "Join BioMed Club"}
        </button>

          <p className="text-xs text-muted-foreground text-center">
            We use your details only to run club events. By joining you agree to our{" "}
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
    </div>
  );
};

export default ClubDayJoinForm;
