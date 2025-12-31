import biobrainiacsLogo from "@/assets/biobrainiacs-logo.png";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-4">
      <img
        src={biobrainiacsLogo}
        alt="BioBrainiacs Academy Logo"
        className="w-32 h-32 md:w-40 md:h-40 mb-8 animate-fade-in"
      />
      <p className="text-xs md:text-sm tracking-[0.3em] text-primary mb-4 animate-fade-in">
        WELCOME TO
      </p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-up">
        <span className="text-primary">BIO</span>
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
