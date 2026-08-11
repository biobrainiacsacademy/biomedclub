import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { embedUrl, watchUrl } from "@/lib/youtube";

type Props = {
  videoId: string;
  title?: string;
  onClose: () => void;
};

const VideoPlayerModal = ({ videoId, title, onClose }: Props) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Video player"}
    >
      <div
        className="w-full max-w-3xl rounded-2xl border border-border bg-card overflow-hidden shadow-[0_0_60px_hsl(50,100%,50%,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border">
          <p className="text-sm font-semibold text-foreground line-clamp-1">{title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={embedUrl(videoId)}
            title={title || "BioBrainiacs lesson"}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">Video not loading? Open it directly.</p>
          <a
            href={watchUrl(videoId)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
          >
            Open on YouTube <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
