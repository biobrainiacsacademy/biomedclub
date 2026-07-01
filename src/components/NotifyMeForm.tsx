import { useState } from "react";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isBot } from "@/lib/validation";
import { SUMMER_SCHEDULE } from "@/lib/schedule";

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

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Name and email are required.",
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
      grade: null,
      school: null,
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
    setFormData({ firstName: "", lastName: "", email: "" });
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
                        {m.isFinal && " (final meeting)"}
                      </div>
                      <div className="text-sm text-foreground">{m.title}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

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
        </form>
      </div>
    </div>
  );
};

export default NotifyMeForm;
