import { Star, Quote } from "lucide-react";

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
];

const StudentReviews = ({ onRateClick }: StudentReviewsProps) => {
  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        <span className="text-primary">Student</span>
        <span className="text-foreground"> Reviews</span>
      </h2>
      
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-4xl font-bold text-primary">5.0</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
          ))}
        </div>
        <span className="text-muted-foreground text-sm">(5 reviews)</span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="card-gradient rounded-xl p-6 relative"
          >
            <Quote className="w-8 h-8 text-accent/30 absolute top-4 right-4" />
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
              "{review.text}"
            </p>
            <div>
              <p className="text-foreground font-semibold">{review.name}</p>
              <p className="text-accent text-xs">{review.role}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <button
          onClick={onRateClick}
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-all duration-300"
        >
          <Star className="w-4 h-4" />
          Rate Us
        </button>
      </div>
    </section>
  );
};

export default StudentReviews;
