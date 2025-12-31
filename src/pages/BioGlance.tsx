import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Users, ExternalLink, FileText, Share2, Star } from "lucide-react";
import biobrainiacsLogo from "@/assets/biobrainiacs-logo.png";
import AuthorApplicationForm from "@/components/AuthorApplicationForm";
import RateUsForm from "@/components/RateUsForm";

const papers = [
  {
    category: "Genetic Engineering",
    categoryColor: "bg-emerald-600",
    date: "December 2024",
    title: "CRISPR-Cas9 Gene Editing: Applications in Treating Genetic Disorders",
    authors: "A. Johnson, M. Patel, S. Williams",
    description: "This paper explores the revolutionary CRISPR-Cas9 technology and its potential applications in treating hereditary diseases. We examine case studies of successful gene therapy trials and discuss the ethical considerations surrounding genetic modification in humans.",
  },
  {
    category: "Nanomedicine",
    categoryColor: "bg-purple-600",
    date: "November 2024",
    title: "The Role of Nanomedicine in Targeted Cancer Treatment",
    authors: "R. Chen, K. Thompson",
    description: "An in-depth analysis of how nanotechnology is revolutionizing cancer treatment through targeted drug delivery systems. This review covers the latest developments in nanoparticle-based therapies and their effectiveness compared to traditional chemotherapy.",
  },
  {
    category: "AI in Medicine",
    categoryColor: "bg-blue-600",
    date: "October 2024",
    title: "Machine Learning Applications in Early Disease Detection",
    authors: "J. Martinez, L. Kim, D. Brown",
    description: "We present a comprehensive study on the implementation of machine learning algorithms for early detection of diseases through medical imaging analysis. Our findings demonstrate significant improvements in diagnostic accuracy for conditions including diabetic retinopathy and lung cancer.",
  },
  {
    category: "Bioelectronics",
    categoryColor: "bg-orange-600",
    date: "September 2024",
    title: "Bioelectronics: Bridging Biology and Technology for Medical Implants",
    authors: "S. Anderson, T. Nguyen",
    description: "This paper investigates the intersection of biological systems and electronic devices, focusing on the development of neural interfaces and smart implants. We discuss current challenges in biocompatibility and future directions for brain-computer interfaces.",
  },
  {
    category: "Regenerative Medicine",
    categoryColor: "bg-pink-600",
    date: "August 2024",
    title: "Stem Cell Therapy: Current Progress and Future Prospects",
    authors: "M. Garcia, E. Wilson, A. Lee",
    description: "A review of stem cell research and its therapeutic applications in regenerative medicine. We examine successful clinical trials for conditions such as spinal cord injuries and heart disease, while addressing the regulatory landscape and ethical considerations.",
  },
  {
    category: "Neuroscience",
    categoryColor: "bg-indigo-600",
    date: "July 2024",
    title: "The Microbiome and Mental Health: Exploring the Gut-Brain Axis",
    authors: "C. Davis, R. Patel",
    description: "This study explores the fascinating connection between gut microbiota and mental health disorders. We review evidence linking dysbiosis to conditions such as depression and anxiety, and discuss potential probiotic-based therapeutic interventions.",
  },
  {
    category: "Tissue Engineering",
    categoryColor: "bg-teal-600",
    date: "June 2024",
    title: "3D Bioprinting: Advancing Organ Transplantation Technology",
    authors: "K. Zhang, J. Roberts, L. Taylor",
    description: "An exploration of 3D bioprinting technology and its potential to address the global organ shortage crisis. We discuss current capabilities in printing tissues and organs, technical challenges, and the path toward clinical implementation.",
  },
  {
    category: "Immunology",
    categoryColor: "bg-red-600",
    date: "May 2024",
    title: "Immunotherapy Breakthroughs in Autoimmune Disease Treatment",
    authors: "N. Smith, P. Johnson",
    description: "This paper reviews recent advances in immunotherapy approaches for treating autoimmune diseases. We focus on CAR-T cell therapy, checkpoint inhibitors, and regulatory T-cell therapies, analyzing their mechanisms and clinical outcomes.",
  },
];

const BioGlance = () => {
  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [showRateUs, setShowRateUs] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Academy</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <img src={biobrainiacsLogo} alt="BioBrainiacs" className="w-8 h-8" />
          <span className="font-semibold">
            <span className="text-primary">Bio</span>
            <span className="text-foreground">Brainiacs</span>
          </span>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="text-center py-8 px-4">
        <div className="inline-flex items-center gap-2 bg-muted/50 border border-border px-4 py-2 rounded-full mb-4">
          <BookOpen className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">Research Publications</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          <span className="text-foreground">The </span>
          <span className="text-primary">BioGlance</span>
        </h1>
        
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Explore cutting-edge research papers authored by BioBrainiacs students, 
          covering topics from genetic engineering to AI-driven medicine.
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-12 md:gap-20">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-accent">8</p>
            <p className="text-sm text-muted-foreground">Published Papers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Research Areas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-foreground">2</p>
            <p className="text-sm text-muted-foreground">Student Authors</p>
          </div>
        </div>
      </section>
      
      {/* Published Research */}
      <section className="py-8 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">
          <span className="text-primary">Published</span>
          <span className="text-foreground"> Research</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {papers.map((paper, index) => (
            <article
              key={index}
              className="card-gradient rounded-xl p-6 hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`${paper.categoryColor} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                  {paper.category}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Calendar className="w-3 h-3" />
                  {paper.date}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {paper.title}
              </h3>
              
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                <Users className="w-4 h-4 text-accent" />
                {paper.authors}
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {paper.description}
              </p>
              
              <div className="flex items-center gap-4">
                <button className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors">
                  <FileText className="w-4 h-4" />
                  Read Paper
                </button>
                <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      {/* Join Section */}
      <section className="py-8 px-4 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Want to Contribute?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">
          Join BioBrainiacs Academy and get the opportunity to publish your own research in The BioGlance.
        </p>
        <button
          onClick={() => setShowAuthorForm(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 animate-pulse-glow"
        >
          Join the Academy
        </button>
      </section>
      
      {/* Rate Us Section */}
      <section className="py-6 px-4 text-center">
        <button
          onClick={() => setShowRateUs(true)}
          className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300"
        >
          <Star className="w-4 h-4" />
          Rate Us
        </button>
      </section>
      
      <footer className="py-6 px-4 flex flex-col items-center justify-center gap-3">
        <img src={biobrainiacsLogo} alt="BioBrainiacs Academy" className="w-12 h-12" />
        <p className="text-muted-foreground text-sm">© 2024 BioBrainiacs Academy</p>
      </footer>
      
      <AuthorApplicationForm
        isOpen={showAuthorForm}
        onClose={() => setShowAuthorForm(false)}
      />
      
      <RateUsForm
        isOpen={showRateUs}
        onClose={() => setShowRateUs(false)}
      />
    </div>
  );
};

export default BioGlance;
