# AGENTS.md

## Technical rules

- Cinematic motion system lives in `src/lib/motion.tsx` (framer-motion based): Reveal, Parallax, SplitWords, MagneticButton, ScrollProgress, EASE. Use these primitives for new animations instead of one-off effects, and always honor prefers reduced motion. Why: keeps the animation language consistent and performance friendly across the site.
