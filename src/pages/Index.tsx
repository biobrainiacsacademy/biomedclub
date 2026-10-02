import { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import FloatingParticles from "@/components/FloatingParticles";
import { ScrollProgress, ScrollMarquee, ScrollStage } from "@/lib/motion";

import NextSession from "@/components/NextSession";

import OurImpact from "@/components/OurImpact";
import Achievement from "@/components/Achievement";
import PreviouslyTaught from "@/components/PreviouslyTaught";
import StudentReviews from "@/components/StudentReviews";

import ConnectWithUs from "@/components/ConnectWithUs";
import NotifyMeForm from "@/components/NotifyMeForm";
import RateUsForm from "@/components/RateUsForm";
import biobrainiacsLogo from "@/assets/biobrainiacs-logo-new.png";

const Index = () => {
  const [showNotifyMe, setShowNotifyMe] = useState(false);
  const [showRateUs, setShowRateUs] = useState(false);

  return (
    <div className="min-h-screen relative">
      <ScrollProgress />
      <FloatingParticles />
      
      <main className="max-w-7xl mx-auto relative z-10">
        <Hero />
        
        <div className="section-divider" />
        <NextSession />
        
        
        
        <ScrollStage>
          <div className="section-divider" />
          <OurImpact />
        </ScrollStage>
        
        <ScrollStage>
          <div className="section-divider" />
          <Achievement />
        </ScrollStage>
        
        <ScrollMarquee text="Learn Biology" />
        <ScrollStage>
          <div className="section-divider" />
          <PreviouslyTaught />
        </ScrollStage>
        
        <ScrollStage>
          <div className="section-divider" />
          <StudentReviews onRateClick={() => setShowRateUs(true)} />
        </ScrollStage>
        
        <ScrollMarquee text="BioBrainiacs Academy" direction={-1} />
        <ScrollStage>
          <div className="section-divider" />
          <ConnectWithUs />
        </ScrollStage>
      </main>
      
      <FadeIn>
        <footer className="py-6 px-4 flex flex-col items-center justify-center gap-3 max-w-7xl mx-auto relative z-10">
          <img src={biobrainiacsLogo} alt="BioBrainiacs Academy" className="w-12 h-12 hover:scale-110 transition-transform duration-300" />
          <div className="flex items-center gap-4 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-muted-foreground text-sm">© 2026 BioBrainiacs Academy</p>
        </footer>
      </FadeIn>
      
      <NotifyMeForm 
        isOpen={showNotifyMe} 
        onClose={() => setShowNotifyMe(false)} 
      />
      
      <RateUsForm 
        isOpen={showRateUs} 
        onClose={() => setShowRateUs(false)} 
      />
    </div>
  );
};

export default Index;
