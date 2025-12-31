import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

const BioGlancePreview = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        <span className="text-foreground">The </span>
        <span className="text-primary">BioGlance</span>
      </h2>
      
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
        Explore our collection of published research papers written by BioBrainiacs students. 
        Discover groundbreaking insights into biomedicine, technology, and health sciences.
      </p>
      
      <div className="flex justify-center">
        <Link
          to="/bioglance"
          className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 group"
        >
          <BookOpen className="w-5 h-5" />
          Visit The BioGlance
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default BioGlancePreview;
