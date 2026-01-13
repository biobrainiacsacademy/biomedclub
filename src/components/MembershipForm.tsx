import { useState } from "react";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { membershipSchema, isBot, formatZodErrors } from "@/lib/validation";

interface MembershipFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MembershipForm = ({ isOpen, onClose }: MembershipFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    grade: "",
    schoolEmail: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bot detection
    if (isBot(honeypot)) {
      toast({
        title: "Membership Submitted!",
        description: "Welcome to BioBrainiacs! We'll be in touch soon.",
      });
      onClose();
      return;
    }

    // Validate form data
    const result = membershipSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: formatZodErrors(result.error),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase.from("memberships").insert({
      first_name: result.data.firstName,
      last_name: result.data.lastName,
      grade: result.data.grade,
      school_email: result.data.schoolEmail,
    });

    setIsSubmitting(false);
    
    if (error) {
      toast({
        title: "Error submitting membership",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Membership Submitted!",
      description: "Welcome to BioBrainiacs! We'll be in touch soon.",
    });
    onClose();
    setFormData({
      firstName: "",
      lastName: "",
      grade: "",
      schoolEmail: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="card-gradient rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-foreground mb-6">Become A Member</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
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
              School Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              required
              maxLength={255}
              value={formData.schoolEmail}
              onChange={(e) => setFormData({ ...formData, schoolEmail: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="123456@mcpsmd.net"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Join BioBrainiacs"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MembershipForm;
