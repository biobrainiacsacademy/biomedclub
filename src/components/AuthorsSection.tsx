import { Mail } from "lucide-react";

const authors = [
  {
    name: "Ali Yazdi",
    role: "Founder & Author",
    image: "https://aboutaliyazdi.carrd.co/assets/images/image01.jpg?v=8955614f",
    bio: "Hi! My name is Ali Yazdi, and I am the founder and one of the authors of The Bio Glance. I started this page to share my curiosity about biology and medicine and to make science more accessible and exciting for students and readers everywhere. I have always been fascinated by how life works at every level, from cells and genes to the systems that keep our bodies and ecosystems balanced. Writing for The Bio Glance allows me to explore those ideas and explain them in ways that anyone can enjoy and understand. Outside of The Bio Glance, I am the founder of BioBrainiacs Academy, where I teach lessons on various (stem) topics relating to biomedicine to help younger students discover their love for science. I also serve as the president of my school's BioMed Club, where I organize projects and activities that connect biology to real-world research and innovation. Through my work, I hope to inspire others to see science not just as a subject but as a way to understand the world and make a positive difference in it.",
    email: "aliayazdi21@gmail.com",
  },
  {
    name: "David Choi",
    role: "Author",
    image: "https://aboutdavidchoi.carrd.co/assets/images/image01.jpg?v=43b4e6f3",
    bio: "Hi! My name is David Choi. I was born in Paris, France, and moved to the United States when I was eight years old. Growing up between two cultures has given me a unique perspective on the world and a deep appreciation for learning about different people and ideas. I am currently a freshman in high school who loves to stay active and engaged, both inside and outside of school. I play pickleball competitively on my school team and often play outside of school as well - it is one of my favorite ways to challenge myself, meet new people, and have fun. I am also a proud member of BioBrainiacs Academy, where I get to explore my interest in biology and science. I love learning how the body and brain work, and I hope to keep building my knowledge through experiments, research, and collaboration with other students who share my curiosity.",
    email: "davidjchoi2@gmail.com",
  },
];

const AuthorsSection = () => {
  return (
    <section className="py-8 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="text-primary">Meet the</span>
        <span className="text-foreground"> Authors</span>
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {authors.map((author, index) => (
          <div
            key={index}
            className="card-gradient rounded-xl p-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={author.image}
                alt={author.name}
                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground">{author.name}</h3>
                <p className="text-accent text-sm mb-2">{author.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-6">
                  {author.bio}
                </p>
                <a
                  href={`mailto:${author.email}`}
                  className="inline-flex items-center gap-1 text-accent text-sm mt-3 hover:text-accent/80 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {author.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AuthorsSection;