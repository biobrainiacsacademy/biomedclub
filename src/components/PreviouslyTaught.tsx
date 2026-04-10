import { ExternalLink } from "lucide-react";

const lessons = [
  {
    title: "Culturing Bacteria: Experimental Microbiology",
    date: "2/7",
    thumbnail: "https://i.ytimg.com/vi_webp/dNn6nS_onQU/maxresdefault.webp",
    url: "https://www.youtube.com/watch?v=dNn6nS_onQU",
  },
  {
    title: "Blood Types Decoded: The Science Behind Who Can Donate to Who",
    date: "12/21",
    thumbnail: "https://i.ytimg.com/vi_webp/xo-3YKmxN2k/maxresdefault.webp",
    url: "https://www.youtube.com/watch?v=xo-3YKmxN2k",
  },
  {
    title: "AI-Driven Drug Discovery - How Machine Learning Accelerates Medicine",
    date: "10/25",
    thumbnail: "https://i.ytimg.com/vi_webp/5N_uMvDQeQ0/maxresdefault.webp",
    url: "https://www.youtube.com/watch?v=5N_uMvDQeQ0",
  },
];

const PreviouslyTaught = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
        <span className="text-primary">Previously</span>
        <span className="text-foreground"> Taught</span>
      </h2>
      <p className="text-center text-muted-foreground mb-6">From most recent to oldest</p>
      
      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-6">
        {lessons.map((lesson, index) => (
          <a
            key={index}
            href={lesson.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-gradient rounded-xl overflow-hidden group hover:scale-[1.03] transition-all duration-500 hover:shadow-[0_0_30px_hsl(180,100%,50%,0.15)] hover:border-accent/30"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
                {lesson.date}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {lesson.title}
              </h3>
              <span className="inline-flex items-center gap-1 text-accent text-xs font-medium group-hover:gap-2 transition-all duration-300">
                Watch on YouTube
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </a>
        ))}
      </div>
      
      <div className="text-center">
        <a
          href="https://www.youtube.com/@BioBrainiacsAcademy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:border-accent px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsl(180,100%,50%,0.15)] active:scale-95"
        >
          View All Lessons
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default PreviouslyTaught;
