import { useState } from "react";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { registrationSchema, isBot, formatZodErrors } from "@/lib/validation";
interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}
const RegistrationForm = ({
  isOpen,
  onClose
}: RegistrationFormProps) => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    grade: "",
    school: "",
    howHeard: "",
    questions: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot detection
    if (isBot(honeypot)) {
      // Silently reject bot submissions
      toast({
        title: "Registration Submitted!",
        description: "Thank you for registering. We'll be in touch soon."
      });
      onClose();
      return;
    }

    // Validate form data
    const result = registrationSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: formatZodErrors(result.error),
        variant: "destructive"
      });
      return;
    }

    // Validate session selection
    if (selectedSessions.length === 0) {
      toast({
        title: "Please select at least one session",
        description: "Choose which meeting(s) you'd like to attend.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    const {
      error
    } = await supabase.from("registrations").insert({
      first_name: result.data.firstName,
      last_name: result.data.lastName,
      email: result.data.email,
      grade: result.data.grade,
      school: result.data.school,
      how_heard: result.data.howHeard || null,
      questions: `Sessions: ${selectedSessions.join(", ")}${result.data.questions ? `\n\n${result.data.questions}` : ""}`
    });
    setIsSubmitting(false);
    if (error) {
      toast({
        title: "Error submitting registration",
        description: "Please try again.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Registration Submitted!",
      description: "Thank you for registering. We'll be in touch soon."
    });
    onClose();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      grade: "",
      school: "",
      howHeard: "",
      questions: ""
    });
    setSelectedSessions([]);
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="card-gradient rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-foreground mb-6">Register for Session</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field - hidden from users, bots will fill it */}
          <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} style={{
          position: 'absolute',
          left: '-9999px',
          opacity: 0
        }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

          {/* Session Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Session(s) <span className="text-destructive">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 bg-muted border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <input type="checkbox" checked={selectedSessions.includes("Virtual - Jan 31st")} onChange={e => {
                if (e.target.checked) {
                  setSelectedSessions([...selectedSessions, "Virtual - Jan 31st"]);
                } else {
                  setSelectedSessions(selectedSessions.filter(s => s !== "Virtual - Jan 31st"));
                }
              }} className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary" />
                <div>
                  <span className="text-xs font-semibold text-secondary-foreground bg-secondary px-2 py-0.5 rounded-full">VIRTUAL</span>
                  <p className="text-sm text-foreground mt-1">Culturing Bacteria 101: Concepts Behind the Experiment</p>
                  <p className="text-xs text-muted-foreground">Feb 7th • 12:00 PM • via Zoom</p>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 bg-muted border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <input type="checkbox" checked={selectedSessions.includes("Lab - Feb 2nd")} onChange={e => {
                if (e.target.checked) {
                  setSelectedSessions([...selectedSessions, "Lab - Feb 2nd"]);
                } else {
                  setSelectedSessions(selectedSessions.filter(s => s !== "Lab - Feb 2nd"));
                }
              }} className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary" />
                <div>
                  <span className="text-xs font-semibold text-accent-foreground bg-accent px-2 py-0.5 rounded-full">LAB</span>
                  <p className="text-sm text-foreground mt-1">Experimental Microbiology: Culturing Bacteria</p>
                  <p className="text-xs text-muted-foreground">Feb 9th • Lunch • Room 248</p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                First Name (preferred) <span className="text-destructive">*</span>
              </label>
              <input type="text" required maxLength={100} value={formData.firstName} onChange={e => setFormData({
              ...formData,
              firstName: e.target.value
            })} className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Last Name <span className="text-destructive">*</span>
              </label>
              <input type="text" required maxLength={100} value={formData.lastName} onChange={e => setFormData({
              ...formData,
              lastName: e.target.value
            })} className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Doe" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email <span className="text-destructive">*</span>
            </label>
            <input type="email" required maxLength={255} value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="john@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Grade Level <span className="text-destructive">*</span>
            </label>
            <select required value={formData.grade} onChange={e => setFormData({
            ...formData,
            grade: e.target.value
          })} className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select grade</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              School Name <span className="text-destructive">*</span>
            </label>
            <input type="text" required maxLength={200} value={formData.school} onChange={e => setFormData({
            ...formData,
            school: e.target.value
          })} className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your school name" />
          </div>
          
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              How did you hear about us?
            </label>
            <select value={formData.howHeard} onChange={e => setFormData({
            ...formData,
            howHeard: e.target.value
          })} className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select an option</option>
              <option value="instagram">Instagram</option>
              <option value="website">Website</option>
              <option value="friend">Friend</option>
              <option value="teacher">Teacher</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Questions or Comments
            </label>
            <textarea value={formData.questions} maxLength={2000} onChange={e => setFormData({
            ...formData,
            questions: e.target.value
          })} className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]" placeholder="Any questions or comments..." />
          </div>
          
          <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50">
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </div>;
};
export default RegistrationForm;