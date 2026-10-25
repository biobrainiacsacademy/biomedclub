import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { biomedMeeting, biomedRegistrationSchema } from "@/lib/biomedRegistration";
import { isBot } from "@/lib/validation";

const emptyForm = { firstName: "", lastName: "", schoolId: "" };

const BioMedRegistrationForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [data, setData] = useState(emptyForm);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const close = () => {
    if (submitting) return;
    onClose();
    setData(emptyForm);
    setSubmitted(false);
    setError("");
    setHoneypot("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setError("");
    if (isBot(honeypot)) return;
    const result = biomedRegistrationSchema.safeParse(data);
    if (!result.success) {
      setError(result.error.errors.map(item => item.message).join(". "));
      return;
    }
    setSubmitting(true);
    try {
      const { error: saveError } = await supabase.rpc("register_biomed_meeting", {
        _first_name: result.data.firstName,
        _last_name: result.data.lastName,
        _school_id: result.data.schoolId,
      });
      if (saveError) throw saveError;
      setSubmitted(true);
      setData(emptyForm);
    } catch {
      setError("Your registration could not be saved. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => { if (!open) close(); }}>
      <DialogContent className="w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto rounded-lg border-border bg-background">
        <DialogHeader className="pr-6">
          <DialogTitle className="text-2xl tracking-normal text-primary">
            {submitted ? "Thank you for registering!" : "Register for BioMed Club"}
          </DialogTitle>
          <DialogDescription className="leading-relaxed">
            {biomedMeeting.date}. {biomedMeeting.time}. {biomedMeeting.room} ({biomedMeeting.hallway}).
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="space-y-5">
            <p role="status" className="text-foreground">Your registration is saved. See you at lunch!</p>
            <Button onClick={close} className="w-full">Done</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">Anatomy Challenge, DNA Challenge, and DNA Extraction Lab.</p>
            <input name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} className="absolute h-0 w-0 overflow-hidden opacity-0" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="biomed-first-name" className="text-sm font-medium">First Name <span className="text-destructive">*</span></label>
                <Input id="biomed-first-name" autoComplete="given-name" required maxLength={100} value={data.firstName} disabled={submitting} onChange={e => setData({ ...data, firstName: e.target.value })} className="bg-muted" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="biomed-last-name" className="text-sm font-medium">Last Name <span className="text-destructive">*</span></label>
                <Input id="biomed-last-name" autoComplete="family-name" required maxLength={100} value={data.lastName} disabled={submitting} onChange={e => setData({ ...data, lastName: e.target.value })} className="bg-muted" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="biomed-school-id" className="text-sm font-medium">School ID <span className="text-destructive">*</span></label>
              <Input id="biomed-school-id" required maxLength={40} pattern="[A-Za-z0-9]+" autoComplete="off" value={data.schoolId} disabled={submitting} onChange={e => setData({ ...data, schoolId: e.target.value })} className="bg-muted" />
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={submitting} className="w-full font-semibold" size="lg">
              {submitting && <Loader2 className="animate-spin" />}
              {submitting ? "Saving..." : "Submit Registration"}
            </Button>
            <p className="text-xs leading-relaxed text-center text-muted-foreground">
              We use your name and School ID to manage this meeting. By registering, you agree to our{" "}
              <Link to="/terms" target="_blank" className="text-accent hover:underline">Terms of Service</Link> and{" "}
              <Link to="/privacy" target="_blank" className="text-accent hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BioMedRegistrationForm;