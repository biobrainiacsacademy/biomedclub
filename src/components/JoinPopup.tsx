import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { joinEmailSchema, rememberJoinPopup, shouldShowJoinPopup } from "@/lib/joinPopup";
import logo from "@/assets/biobrainiacs-logo-new.png";

function browserStorage() {
  try { return window.localStorage; } catch { return undefined; }
}

const JoinPopup = () => {
  const [open, setOpen] = useState(() => shouldShowJoinPopup(browserStorage()));
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");

  const close = () => {
    rememberJoinPopup(joined ? "joined" : "dismissed", browserStorage());
    setOpen(false);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting || honeypot) return;
    const result = joinEmailSchema.safeParse({ email });
    if (!result.success) {
      setError("Please enter a valid personal email address.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const { error: saveError } = await supabase.rpc("join_biobrainiacs", { _email: result.data.email });
      if (saveError) throw saveError;
      rememberJoinPopup("joined", browserStorage());
      setJoined(true);
      setEmail("");
    } catch {
      setError("We could not save your email. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={value => { if (!value) close(); }}>
      <DialogContent overlayClassName="bg-background/50 backdrop-blur-sm" className="w-[calc(100%-3rem)] max-w-sm max-h-[85dvh] overflow-y-auto rounded-lg border-primary/30 bg-background p-5 sm:p-6 gap-3 glow-gold motion-reduce:animate-none">
        <div className="flex justify-center">
          <img src={logo} alt="BioBrainiacs Academy" className="h-14 w-14 object-contain" />
        </div>
        <DialogHeader className="space-y-2 text-center sm:text-center">
          <DialogTitle className="text-xl sm:text-2xl leading-tight tracking-normal text-primary">
            {joined ? "Thank you for joining!" : "Join BioBrainiacs Now"}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {joined ? "You are on the list for free virtual lessons and club updates." : "Explore biomedical science with us. Join our virtual lessons for free biomedical education."}
          </DialogDescription>
        </DialogHeader>
        {joined ? (
          <div className="space-y-5 text-center">
            <Check className="h-9 w-9 mx-auto text-accent" aria-hidden="true" />
            <Button className="w-full font-semibold" onClick={close}>Done</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3 pt-1">
            <input name="website" value={honeypot} onChange={event => setHoneypot(event.target.value)} className="absolute h-0 w-0 overflow-hidden opacity-0" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="space-y-2">
              <label htmlFor="join-personal-email" className="text-sm font-medium">Personal Email <span className="text-destructive">*</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <Input id="join-personal-email" type="email" autoComplete="email" required maxLength={255} value={email} onChange={event => setEmail(event.target.value)} disabled={submitting} className="h-11 bg-muted pl-10" aria-describedby={error ? "join-error" : undefined} aria-invalid={Boolean(error)} />
              </div>
            </div>
            {error && <p id="join-error" role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={submitting} className="w-full h-11 font-semibold glow-gold">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" /> : <ArrowRight className="h-4 w-4" />}
              {submitting ? "Joining..." : "Join for Free"}
            </Button>
            <p className="text-xs text-muted-foreground leading-normal text-center">
              By joining, you agree to receive lesson and club updates and accept our{" "}
              <Link to="/terms" target="_blank" className="text-accent hover:underline">Terms of Service</Link> and{" "}
              <Link to="/privacy" target="_blank" className="text-accent hover:underline">Privacy Policy</Link>. You can unsubscribe at any time. Students under 18 should have a parent or guardian review these.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinPopup;