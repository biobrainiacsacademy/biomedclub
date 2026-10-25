# AGENTS.md

## Technical rules

- In person BioMed registrations use a dedicated validated RPC to save into registrations with school_id and event_name; keep public reads denied and validate and rate limit on the server. Why: supports registrations without collecting an email or exposing student identifiers.

- Cinematic motion system lives in `src/lib/motion.tsx` (framer-motion based): Reveal, Parallax, SplitWords, MagneticButton, ScrollProgress, EASE. Use these primitives for new animations instead of one-off effects, and always honor prefers reduced motion. Why: keeps the animation language consistent and performance friendly across the site.
