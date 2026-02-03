import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import biobrainiacsLogo from "@/assets/biobrainiacs-logo-new.png";

const authors = [
  {
    name: "Ali Yazdi",
    role: "Founder & Author",
    image: "https://aboutaliyazdi.carrd.co/assets/images/image01.jpg?v=8955614f",
    bio: "Hi! My name is Ali Yazdi, and I am the founder and one of the authors of The Bio Glance. I started this page to share my curiosity about biology and medicine and to make science more accessible and exciting for students and readers everywhere. I have always been fascinated by how life works at every level, from cells and genes to the systems that keep our bodies and ecosystems balanced. Writing for The Bio Glance allows me to explore those ideas and explain them in ways that anyone can enjoy and understand. I recently received a Georgetown University certificate of completion for the Medical Research: Clinical Trials Resulting in Medical Discoveries pre-college course. Outside of The Bio Glance, I am the founder of BioBrainiacs Academy, where I teach lessons on various (stem) topics relating to biomedicine to help younger students discover their love for science. I also serve as the president of my school's BioMed Club, where I organize projects and activities that connect biology to real-world research and innovation. Through my work, I hope to inspire others to see science not just as a subject but as a way to understand the world and make a positive difference in it.",
    email: "aliayazdi21@gmail.com",
  },
  {
    name: "David Choi",
    role: "Author",
    image: "https://aboutdavidchoi.carrd.co/assets/images/image01.jpg?v=43b4e6f3",
    bio: "Hi! My name is David Choi. I was born in Paris, France, and moved to the United States when I was eight years old. Growing up between two cultures has given me a unique perspective on the world and a deep appreciation for learning about different people and ideas. I am currently a freshman in high school who loves to stay active and engaged, both inside and outside of school. I play pickleball competitively on my school team and often play outside of school as well - it is one of my favorite ways to challenge myself, meet new people, and have fun. I am also a proud member of BioBrainiacs Academy, where I get to explore my interest in biology and science. I love learning how the body and brain work, and I hope to keep building my knowledge through experiments, research, and collaboration with other students who share my curiosity.",
    email: "davidjchoi2@gmail.com",
  },
  {
    name: "Aryan Juneja",
    role: "Author",
    image: "",
    bio: "Hi! My name is Aryan Juneja. I am a 9th grader at Winston Churchill High School. I am very interested in biology and science. Growing up, I discovered my curiosity for biology and living things through animals. At 9 years old, I set up my first fish tank and realized how interesting ecosystems are - how they maintain themselves and how a real natural environment can be replicated.",
    email: "aryanjuneja2010@gmail.com",
  },
];

const Authors = () => {
  const [expandedAuthor, setExpandedAuthor] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedAuthor(expandedAuthor === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link
          to="/bioglance"
          className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to BioGlance</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <img src={biobrainiacsLogo} alt="BioBrainiacs" className="w-8 h-8" />
          <span className="font-semibold">
            <span className="text-primary">Bio</span>
            <span className="text-foreground">Brainiacs</span>
          </span>
        </div>
      </header>

      {/* Authors Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          <span className="text-primary">Meet the</span>
          <span className="text-foreground"> Authors</span>
        </h1>

        <div className="space-y-8">
          {authors.map((author, index) => (
            <div
              key={index}
              className="card-gradient rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {author.image ? (
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-32 h-32 rounded-full object-cover flex-shrink-0 mx-auto md:mx-0"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                    <svg
                      className="w-16 h-16 text-muted-foreground"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground">{author.name}</h2>
                  <p className="text-accent text-sm mb-4">{author.role}</p>
                  
                  <div className="relative">
                    <p 
                      className={`text-muted-foreground leading-relaxed transition-all duration-300 ${
                        expandedAuthor === index ? '' : 'line-clamp-4'
                      }`}
                    >
                      {author.bio}
                    </p>
                    
                    <button
                      onClick={() => toggleExpand(index)}
                      className="flex items-center gap-1 text-accent hover:text-accent/80 transition-colors mt-3 font-medium"
                    >
                      {expandedAuthor === index ? (
                        <>
                          <span>Show less</span>
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>Read more</span>
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={`mailto:${author.email}`}
                    className="inline-flex items-center gap-2 text-accent text-sm mt-4 hover:text-accent/80 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {author.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-6 px-4 flex flex-col items-center justify-center gap-3">
        <img src={biobrainiacsLogo} alt="BioBrainiacs Academy" className="w-12 h-12" />
        <p className="text-muted-foreground text-sm">© 2026 BioBrainiacs Academy</p>
      </footer>
    </div>
  );
};

export default Authors;
