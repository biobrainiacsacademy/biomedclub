import { useRef } from "react";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EASE, MagneticButton } from "@/lib/motion";
import biobrainiacsLogo from "@/assets/biobrainiacs-logo-new.png";

const MaskLine = ({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) => {
  const reduce = useReducedMotion();
  return (
    <span className={`inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] ${className ?? ""}`}>
      <motion.span
        className="inline-block"
        initial={reduce ? { opacity: 0 } : { y: "115%", opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { y: "0%", opacity: 1 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center text-center py-10 px-4 relative overflow-hidden"
    >
      {/* Ambient glow behind logo */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow"
        style={reduce ? undefined : { scale: glowScale }}
      />

      <motion.div style={reduce ? undefined : { y: contentY, opacity: contentOpacity }} className="relative z-10 w-full">
        <motion.img
          src={biobrainiacsLogo}
          alt="BioBrainiacs Academy Logo"
          className="w-32 h-32 md:w-40 md:h-40 mb-8 animate-float relative z-10 mx-auto drop-shadow-[0_0_30px_hsl(50,100%,50%,0.3)]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: EASE }}
        />

        <motion.p
          className="text-xs md:text-sm tracking-[0.3em] text-primary mb-4"
          initial={reduce ? { opacity: 0 } : { opacity: 0, letterSpacing: "0.5em" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        >
          WELCOME TO
        </motion.p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          <MaskLine delay={0.35}>
            <span className="text-primary animate-shimmer bg-[length:200%_100%]">BIO</span>
            <span className="text-foreground">BRAINIACS</span>
          </MaskLine>
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-8">
          <MaskLine delay={0.5}>ACADEMY</MaskLine>
        </h2>

        <motion.p
          className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
        >
          A <span className="text-primary font-semibold">FREE</span> in-person & online course taught by high school students.
          This program takes young learners on an exciting journey through the basics of biomedicine,
          helping them explore how science and technology work together to solve health challenges and improve lives.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
        >
          <MagneticButton strength={0.3}>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-xl shadow-[0_0_30px_hsl(50,100%,50%,0.35)] hover:shadow-[0_0_50px_hsl(50,100%,50%,0.55)] hover:scale-[1.03] transition-all duration-300 relative z-10"
            >
              <Brain className="w-5 h-5 md:w-6 md:h-6" />
              Review Quiz
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
