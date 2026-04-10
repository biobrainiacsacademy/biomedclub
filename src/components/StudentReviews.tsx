import { Star, Quote } from "lucide-react";
import { useRef } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

interface StudentReviewsProps {
  onRateClick: () => void;
}

const reviews = [
  {
    text: "You taught me more than my science teacher and helped me with an upcoming test.",
    name: "Dalam",
    role: "BioBrainiacs Learner",
  },
  {
    text: "Great information present within this organization.",
    name: "Sachin",
    role: "BioBrainiacs Learner",
  },
  {
    text: "This is one of the most efficient technological websites that I have ever seen. I have found it easy to browse, learned a lot, and got all the answers to my questions that I wanted.",
    name: "Yazman",
    role: "BioBrainiacs Learner",
  },
  {
    text: "This academy has helped me increase my knowledge and interest in biology. The interactive learning, and the way the slides are made, keeps me attentive. If anyone has an interest in biology, I highly suggest learning from here.",
    name: "Viren",
    role: "BioBrainiacs Learner",
  },
  {
    text: "The club is very amazing because it has very hands-on labs. I learned so much about blood.",
    name: "Shaun",
    role: "BioBrainiacs Learner",
  },
  {
    text: "I like how the organizers are very interactive with their members and include everyone in the labs.",
    name: "Jeevesh",
    role: "BioBrainiacs Learner",
  },
];

const ReviewCard = ({ review, index }: { review: typeof reviews[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(cardRef as React.RefObject<HTMLElement>);

  return (
    <div
      ref={cardRef}
      className="card-gradient rounded-xl p-6 relative interactive-card group"
      style={{
        transform: `perspective(600px) rotateX(${mouse.y * -5}deg) rotateY(${mouse.x * 5}deg)`,
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <Quote className="w-8 h-8 text-accent/30 absolute top-4 right-4 group-hover:text-accent/50 transition-colors duration-300" />
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
        "{review.text}"
      </p>
      <div>
        <p className="text-foreground font-semibold">{review.name}</p>
        <p className="text-accent text-xs">{review.role}</p>
      </div>
    </div>
  );
};

const StudentReviews = ({ onRateClick }: StudentReviewsProps) => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
        <span className="text-primary">Student</span>
        <span className="text-foreground"> Reviews</span>
      </h2>
      
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-4xl font-bold text-primary">5.0</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary animate-star-pop" style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
        <span className="text-muted-foreground text-sm">(7 reviews)</span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} index={index} />
        ))}
      </div>
      
      <div className="text-center">
        <button
          onClick={onRateClick}
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_hsl(180,100%,50%,0.3)] active:scale-95"
        >
          <Star className="w-4 h-4" />
          Rate Us
        </button>
      </div>
    </section>
  );
};

export default StudentReviews;
