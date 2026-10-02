import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValue, type TargetAndTransition } from "framer-motion";
import { useRef, type ReactNode, type RefObject } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// Reveal: scroll triggered entrance with several distinct styles
// ---------------------------------------------------------------------------

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "clip" | "mask";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "span";
}

const hiddenState = (variant: RevealVariant, distance: number): TargetAndTransition => {
  switch (variant) {
    case "down": return { opacity: 0, y: -distance };
    case "left": return { opacity: 0, x: distance };
    case "right": return { opacity: 0, x: -distance };
    case "scale": return { opacity: 0, scale: 0.92 };
    case "blur": return { opacity: 0, y: distance * 0.5, filter: "blur(8px)" };
    case "clip": return { opacity: 0, clipPath: "inset(12% 8% 12% 8% round 24px)", scale: 1.06 };
    case "mask": return { opacity: 0, y: 0 };
    default: return { opacity: 0, y: distance };
  }
};

export const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  duration = 0.9,
  distance = 48,
  className,
  once = true,
}: RevealProps) => {
  const reduce = useReducedMotion();
  const visible = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0% round 24px)" };

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : hiddenState(variant, distance)}
      whileInView={reduce ? { opacity: 1 } : visible}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration, delay, ease: EASE }}
      style={variant === "mask" ? { overflow: "hidden" } : undefined}
    >
      {variant === "mask" ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { y: "110%" }}
          whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
          viewport={{ once, amount: 0.25 }}
          transition={{ duration, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Parallax: subtle depth movement tied to scroll
// ---------------------------------------------------------------------------

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  horizontal?: boolean;
}

export const Parallax = ({ children, speed = 60, className, horizontal = false }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref as RefObject<HTMLElement>, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const offset = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className} style={reduce ? undefined : undefined}>
      <motion.div style={reduce ? undefined : horizontal ? { x: offset } : { y: offset }}>
        {children}
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// SplitWords: staggered masked word reveal for large headings
// ---------------------------------------------------------------------------

interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export const SplitWords = ({ text, className, wordClassName, delay = 0, stagger = 0.07, once = true }: SplitWordsProps) => {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
            whileInView={reduce ? { opacity: 1 } : { y: "0%", opacity: 1 }}
            viewport={{ once, amount: 0.5 }}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// ---------------------------------------------------------------------------
// MagneticButton: subtle cursor attraction, desktop only, respects reduced motion
// ---------------------------------------------------------------------------

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticButton = ({ children, strength = 0.25, className }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  const handleMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current || e.pointerType === "touch") return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// ScrollProgress: thin animated progress bar at the top of the page
// ---------------------------------------------------------------------------

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary/70 z-50 origin-left"
      style={{ scaleX }}
    />
  );
};
