import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isBot } from "@/lib/validation";
import { SUMMER_SCHEDULE } from "@/lib/schedule";
import QAQuestions from "@/components/QAQuestions";

interface NotifyMeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotifyMeForm = ({ isOpen, onClose }: NotifyMeFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [selectedMeetings, setSelectedMeetings] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    school: "",
    grade: "",
    email: "",
  });

  const toggleMeeting = (date: string) => {
    setSelectedMeetings((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date],
    );
  };

  const toggleAll = () => {
    if (selectedMeetings.length === SUMMER_SCHEDULE.length) {
      setSelectedMeetings([]);
    } else {
      setSelectedMeetings(SUMMER_SCHEDULE.map((m) => m.date));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBot(honeypot)) {
      toast({ title: "Registration Submitted!", description: "Thank you for registering." });
      onClose();
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.school.trim() ||
      !formData.grade.trim() ||
      !formData.email.trim()
    ) {
      toast({
        title: "Please fill in all fields",
        description: "Name, school, grade, and email are all required.",
        variant: "destructive",
      });
      return;
    }

    if (selectedMeetings.length === 0) {
      toast({
        title: "Select at least one meeting",
        description: "Please choose which sessions you want to attend.",
        variant: "destructive",
      });
      return;
    }

    const meetingsSummary = SUMMER_SCHEDULE
      .filter((m) => selectedMeetings.includes(m.date))
      .map((m) => `${m.displayDate}: ${m.title}`)
      .join("\n");

    setIsSubmitting(true);
    const { error } = await supabase.from("registrations").insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      grade: formData.grade,
      school: formData.school,
      how_heard: null,
      questions: `Registered for:\n${meetingsSummary}`,
    });
    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error submitting registration",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Submitted!",
      description: "Thank you for registering. We will be in touch soon.",
    });
    onClose();
    setFormData({ firstName: "", lastName: "", school: "", grade: "", email: "" });
    setSelectedMeetings([]);
  };

  if (!isOpen) return null;

  const allSelected = selectedMeetings.length === SUMMER_SCHEDULE.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="card-gradient rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-2">Register Now</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Choose the summer sessions you want to attend. All meetings are held virtually on Zoom.
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

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                Summer Meetings <span className="text-destructive">*</span>
              </label>
              <button
                type="button"
                onClick={toggleAll}
                className="text-xs text-primary hover:underline"
              >
                {allSelected ? "Clear all" : "Select all"}
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {SUMMER_SCHEDULE.map((m) => {
                const checked = selectedMeetings.includes(m.date);
                return (
                  <label
                    key={m.date}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      checked
                        ? "border-primary bg-primary/10"
                        : "border-border bg-muted hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMeeting(m.date)}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-accent">
                        {m.displayDate}
                        {m.time ? ` · ${m.time}` : ""}
                        {m.isFinal && " (final meeting)"}
                      </div>
                      <div className="text-sm text-foreground">{m.title}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {selectedMeetings.some(
            (d) => SUMMER_SCHEDULE.find((m) => m.date === d)?.isQA,
          ) && (
            <div className="qa-glow rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0">
                <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold tracking-wide uppercase text-primary-foreground bg-primary rounded-bl-lg rounded-tr-lg">
                  Featured Q&amp;A
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1 pr-24">
                Q&amp;A with Paeto Wangweera
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Submit a question ahead of time or like the ones you want answered most.
              </p>
              <QAQuestions />
            </div>
          )}

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
              School Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={200}
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your school name"
            />
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
              Home Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              required
              maxLength={255}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="john@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Register Now"}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            We use your details only to run this session and send club updates. By registering you
            agree to our{" "}
            <Link to="/terms" className="text-accent hover:underline" target="_blank">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-accent hover:underline" target="_blank">
              Privacy Policy
            </Link>
            . Students under 18 should have a parent or guardian review them.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NotifyMeForm;
