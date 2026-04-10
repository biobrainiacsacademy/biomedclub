import { useRef } from "react";
import biobrainiacsLogo from "@/assets/biobrainiacs-logo-new.png";

const Hero = () => {
  const logoRef = useRef<HTMLImageElement>(null);

  return (
    <section className="flex flex-col items-center justify-center text-center py-10 px-4 relative overflow-hidden">
      {/* Ambient glow behind logo */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
      
      <img
        ref={logoRef}
        src={biobrainiacsLogo}
        alt="BioBrainiacs Academy Logo"
        className="w-32 h-32 md:w-40 md:h-40 mb-8 animate-float relative z-10 drop-shadow-[0_0_30px_hsl(50,100%,50%,0.3)]"
      />
      <p className="text-xs md:text-sm tracking-[0.3em] text-primary mb-4 animate-fade-in">
        WELCOME TO
      </p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-up">
        <span className="text-primary animate-shimmer bg-[length:200%_100%]">BIO</span>
        <span className="text-foreground">BRAINIACS</span>
      </h1>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        ACADEMY
      </h2>
      <p className="max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
        A <span className="text-primary font-semibold">FREE</span> in-person & online course taught by high school students. 
        This program takes young learners on an exciting journey through the basics of biomedicine, 
        helping them explore how science and technology work together to solve health challenges and improve lives.
      </p>
    </section>
  );
};

export default Hero;
