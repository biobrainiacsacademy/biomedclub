import { useState } from "react";
import { X, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RateUsFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RateUsForm = ({ isOpen, onClose }: RateUsFormProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
    wouldRecommend: "",
    favoriteLesson: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const { error } = await supabase.from("reviews").insert({
      rating,
      name: formData.name || null,
      favorite_lesson: formData.favoriteLesson,
      would_recommend: formData.wouldRecommend,
      feedback: formData.feedback,
    });

    setIsSubmitting(false);
    
    if (error) {
      toast({
        title: "Error submitting review",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you for your feedback!",
      description: "Your review has been submitted successfully.",
    });
    onClose();
    setRating(0);
    setFormData({
      name: "",
      feedback: "",
      wouldRecommend: "",
      favoriteLesson: "",
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
        
        <h2 className="text-2xl font-bold text-foreground mb-2">Rate BioBrainiacs Academy</h2>
        <p className="text-muted-foreground text-sm mb-6">We'd love to hear your feedback!</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Overall Rating <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      value <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name (optional)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              What was your favorite lesson? <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.favoriteLesson}
              onChange={(e) => setFormData({ ...formData, favoriteLesson: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Blood Typing Lab"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Would you recommend us to a friend? <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-4">
              {["Yes", "Maybe", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="recommend"
                    value={option}
                    checked={formData.wouldRecommend === option}
                    onChange={(e) => setFormData({ ...formData, wouldRecommend: e.target.value })}
                    className="w-4 h-4 accent-primary"
                    required
                  />
                  <span className="text-foreground text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Additional Feedback <span className="text-destructive">*</span>
            </label>
            <textarea
              required
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
              placeholder="Tell us about your experience..."
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RateUsForm;
