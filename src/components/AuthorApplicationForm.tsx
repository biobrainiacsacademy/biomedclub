import { useState } from "react";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthorApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthorApplicationForm = ({ isOpen, onClose }: AuthorApplicationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    grade: "",
    highSchool: "",
    introduction: "",
    howHeard: "",
    comments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase.from("author_applications").insert({
      email: formData.email,
      name: formData.name,
      grade: formData.grade,
      high_school: formData.highSchool,
      introduction: formData.introduction,
      how_heard: formData.howHeard,
      comments: formData.comments || null,
    });

    setIsSubmitting(false);
    
    if (error) {
      toast({
        title: "Error submitting application",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Application Submitted!",
      description: "Thank you for applying to The Bio Glance. We'll review your application and get back to you soon.",
    });
    onClose();
    setFormData({
      email: "",
      name: "",
      grade: "",
      highSchool: "",
      introduction: "",
      howHeard: "",
      comments: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="card-gradient rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">The Bio Glance Author Application</h2>
        <p className="text-muted-foreground text-sm mb-6">
          At The Bio Glance, we bring a variety of STEM stories including biology, medicine, and biotechnology 
          to life through clear, credible, and compelling storytelling. We bridge the gap between cutting-edge 
          research and everyday understanding, translating complex discoveries into insights that inform, 
          inspire, and engage curious minds.
        </p>
        
        <p className="text-destructive text-xs mb-6">* Indicates required question</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Name (first, last) <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              School Grade <span className="text-destructive">*</span>
            </label>
            <div className="space-y-2">
              {["9", "10", "11", "12"].map((grade) => (
                <label key={grade} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="grade"
                    value={grade}
                    checked={formData.grade === grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-4 h-4 accent-primary"
                    required
                  />
                  <span className="text-foreground text-sm">{grade}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              High School Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.highSchool}
              onChange={(e) => setFormData({ ...formData, highSchool: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your high school name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Write a 2-3 paragraph introduction about yourself. <span className="text-destructive">*</span>
            </label>
            <p className="text-muted-foreground text-xs mb-2">
              This will help us get a sense of your writing style. Also, if you are accepted, 
              it will also be used for your author "About Me" page on our site. Don't use any 
              form of AI to help write this, if used, you will be automatically rejected. 
              Make this human-written and natural.
            </p>
            <textarea
              required
              value={formData.introduction}
              onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[150px]"
              placeholder="Tell us about yourself..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              How did you hear about The Bio Glance? <span className="text-destructive">*</span>
            </label>
            <div className="space-y-2">
              {["Instagram", "Website", "Friend", "Other"].map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="howHeard"
                    value={option}
                    checked={formData.howHeard === option}
                    onChange={(e) => setFormData({ ...formData, howHeard: e.target.value })}
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
              Comments and/or questions
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              placeholder="Any additional comments or questions..."
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthorApplicationForm;
