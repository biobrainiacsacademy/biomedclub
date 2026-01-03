import { useState } from "react";
import Hero from "@/components/Hero";
import NextSession from "@/components/NextSession";
import BioGlancePreview from "@/components/BioGlancePreview";
import OurImpact from "@/components/OurImpact";
import PreviouslyTaught from "@/components/PreviouslyTaught";
import StudentReviews from "@/components/StudentReviews";
import UpcomingMeetings from "@/components/UpcomingMeetings";
import ConnectWithUs from "@/components/ConnectWithUs";
import RegistrationForm from "@/components/RegistrationForm";
import RateUsForm from "@/components/RateUsForm";
import biobrainiacsLogo from "@/assets/biobrainiacs-logo-new.png";

const Index = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showRateUs, setShowRateUs] = useState(false);

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto">
        <Hero />
        
        <div className="section-divider" />
        
        <NextSession onRegisterClick={() => setShowRegistration(true)} />
        
        <div className="section-divider" />
        
        <BioGlancePreview />
        
        <div className="section-divider" />
        
        <OurImpact />
        
        <div className="section-divider" />
        
        <PreviouslyTaught />
        
        <div className="section-divider" />
        
        <StudentReviews onRateClick={() => setShowRateUs(true)} />
        
        <div className="section-divider" />
        
        <UpcomingMeetings />
        
        <div className="section-divider" />
        
        <ConnectWithUs />
      </main>
      
      <footer className="py-6 px-4 flex flex-col items-center justify-center gap-3 max-w-7xl mx-auto">
        <img src={biobrainiacsLogo} alt="BioBrainiacs Academy" className="w-12 h-12" />
        <p className="text-muted-foreground text-sm">© 2026 BioBrainiacs Academy</p>
      </footer>
      
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