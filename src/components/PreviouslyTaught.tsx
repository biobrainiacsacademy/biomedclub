import { ExternalLink, Lock, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import { Reveal, SplitWords } from "@/lib/motion";
import { getYouTubeId } from "@/lib/youtube";

type Lesson = {
  title: string;
  date: string;
  thumbnail: string;
  url: string;
  revealAt?: string;
};

const lessons: Lesson[] = [
  {
    title: "The Future of Medicine: 2050 (Key Moments)",
    date: "8/22",
    thumbnail: "https://i.ytimg.com/vi/QUbmiBLY9pw/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=QUbmiBLY9pw",
  },
  {
    title: "Space Medicine: Keeping Humans Alive Beyond Earth (Key Moments)",
    date: "8/15",
    thumbnail: "https://i.ytimg.com/vi_webp/grNMQxXClQA/maxresdefault.webp",
    url: "https://www.youtube.com/watch?v=grNMQxXClQA",
  },
  {
    title: "Inside Clinical Trials: How Medicines Become Safe (Key Moments)",
    date: "8/1",
    thumbnail: "https://i.ytimg.com/vi_webp/ULNtz5JgGms/maxresdefault.webp",
    url: "https://www.youtube.com/watch?v=ULNtz5JgGms",
  },
];

const PreviouslyTaught = () => {
  const [now, setNow] = useState(() => Date.now());
  const [active, setActive] = useState<Lesson | null>(null);

  useEffect(() => {
    const pending = lessons
      .map((l) => (l.revealAt ? new Date(l.revealAt).getTime() : 0))
      .filter((t) => t > Date.now());
    if (pending.length === 0) return;
    const next = Math.min(...pending);
    const timeout = setTimeout(() => setNow(Date.now()), next - Date.now() + 500);
    return () => clearTimeout(timeout);
  }, [now]);

  return (
    <section className="py-8 px-4">
      <Reveal variant="up" distance={32}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          <span className="text-primary">Previously</span>
          <span className="text-foreground"> Taught</span>
        </h2>
        <p className="text-center text-muted-foreground mb-6">From most recent to oldest</p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-6">
        {lessons.map((lesson, index) => {
          const isLocked =
            !!lesson.revealAt && new Date(lesson.revealAt).getTime() > now;
          return (
            <Reveal key={index} variant="up" delay={index * 0.12} distance={40}>
              <button
                type="button"
                disabled={isLocked}
                aria-label={isLocked ? "Video locked" : `Play ${lesson.title}`}
                onClick={() => !isLocked && setActive(lesson)}
                className={`w-full text-left card-gradient rounded-xl overflow-hidden group transition-all duration-500 ${
                  isLocked
                    ? "cursor-not-allowed opacity-90"
                    : "hover:scale-[1.03] hover:shadow-[0_0_30px_hsl(180,100%,50%,0.15)] hover:border-accent/30"
                }`}
              >
                <div className="relative aspect-video overflow-hidden">
                  {isLocked ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 text-center px-4">
                      <Lock className="w-8 h-8 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">
                        Unlocks at 8:00 AM ET
                      </p>
                    </div>
                  ) : (
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.fallback) {
                          img.dataset.fallback = "1";
                          const id = lesson.url.split("v=")[1]?.split("&")[0];
                          if (id) img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  )}
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
                    {isLocked ? "Available soon" : "Watch now"}
                    {!isLocked && <PlayCircle className="w-3.5 h-3.5" />}
                  </span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      <Reveal variant="up" delay={0.3}>
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
      </Reveal>

      {active && getYouTubeId(active.url) && (
        <VideoPlayerModal
          videoId={getYouTubeId(active.url) as string}
          title={active.title}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
};

export default PreviouslyTaught;
