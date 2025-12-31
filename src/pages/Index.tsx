import { useState } from "react";
import Hero from "@/components/Hero";
import NextSession from "@/components/NextSession";
import BioGlancePreview from "@/components/BioGlancePreview";
import PreviouslyTaught from "@/components/PreviouslyTaught";
import StudentReviews from "@/components/StudentReviews";
import UpcomingMeetings from "@/components/UpcomingMeetings";
import RegistrationForm from "@/components/RegistrationForm";
import RateUsForm from "@/components/RateUsForm";

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
        
        <PreviouslyTaught />
        
        <div className="section-divider" />
        
        <StudentReviews onRateClick={() => setShowRateUs(true)} />
        
        <div className="section-divider" />
        
        <UpcomingMeetings />
      </main>
      
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
