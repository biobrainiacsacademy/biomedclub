import { useState } from "react";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSignup = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: email,
    });

    setIsSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Already subscribed!",
          description: "This email is already on our newsletter list.",
        });
      } else {
        toast({
          title: "Error subscribing",
          description: "Please try again.",
          variant: "destructive",
        });
      }
      return;
    }

    toast({
      title: "Subscribed!",
      description: "You'll be the first to receive our newest research papers.",
    });
    setEmail("");
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-primary/10 p-3 rounded-full">
            <Mail className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          Join Our Newsletter
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Be the first to receive our newest research papers and updates.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;