import { useState } from "react";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import FloatingParticles from "@/components/FloatingParticles";

import NextSession from "@/components/NextSession";

import OurImpact from "@/components/OurImpact";
import Achievement from "@/components/Achievement";
import PreviouslyTaught from "@/components/PreviouslyTaught";
import StudentReviews from "@/components/StudentReviews";

import ConnectWithUs from "@/components/ConnectWithUs";
import RegistrationForm from "@/components/RegistrationForm";
import RateUsForm from "@/components/RateUsForm";
import biobrainiacsLogo from "@/assets/biobrainiacs-logo-new.png";

const Index = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showRateUs, setShowRateUs] = useState(false);

  return (
    <div className="min-h-screen relative">
      <FloatingParticles />
      
      <main className="max-w-7xl mx-auto relative z-10">
        <FadeIn delay={0}>
          <Hero />
        </FadeIn>
        
        <FadeIn delay={100}>
          <div className="section-divider" />
          <NextSession onRegisterClick={() => setShowRegistration(true)} />
        </FadeIn>
        
        
        
        <FadeIn delay={0}>
          <div className="section-divider" />
          <OurImpact />
        </FadeIn>
        
        <FadeIn delay={0}>
          <div className="section-divider" />
          <Achievement />
        </FadeIn>
        
        <FadeIn delay={0}>
          <div className="section-divider" />
          <PreviouslyTaught />
        </FadeIn>
        
        <FadeIn delay={0}>
          <div className="section-divider" />
          <StudentReviews onRateClick={() => setShowRateUs(true)} />
        </FadeIn>
        
        <FadeIn delay={0}>
          <div className="section-divider" />
          <ConnectWithUs />
        </FadeIn>
      </main>
      
      <FadeIn>
        <footer className="py-6 px-4 flex flex-col items-center justify-center gap-3 max-w-7xl mx-auto relative z-10">
          <img src={biobrainiacsLogo} alt="BioBrainiacs Academy" className="w-12 h-12 hover:scale-110 transition-transform duration-300" />
          <p className="text-muted-foreground text-sm">© 2026 BioBrainiacs Academy</p>
        </footer>
      </FadeIn>
      
      <RegistrationForm 
        isOpen={showRegistration} 
        onClose={() => setShowRegistration(false)} 
      />
      
      <RateUsForm 
        isOpen={showRateUs} 
        onClose={() => setShowRateUs(false)} 
      />
    </div>
  );
};

export default Index;
