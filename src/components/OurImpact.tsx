import { Users, BookOpen, Eye } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const stats = [{
  icon: Users,
  value: 80,
  suffix: "+",
  label: "Students Taught"
}, {
  icon: BookOpen,
  value: 24,
  label: "Topics Covered"
}, {
  icon: Eye,
  value: 20000,
  displayValue: "20K+",
  label: "Online Audience"
}];

const useCountUp = (end: number, duration: number = 2000, shouldStart: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

const StatCard = ({ stat, isVisible, index }: { stat: typeof stats[0]; isVisible: boolean; index: number }) => {
  const count = useCountUp(stat.value, 2000, isVisible);
  
  const formatValue = () => {
    if (stat.displayValue) {
      const ratio = count / stat.value;
      return `${Math.round(20 * ratio)}K+`;
    }
    return count.toString() + (stat.suffix || "");
  };

  return (
    <div
      className="flex flex-col items-center p-3 md:p-4 w-28 md:w-36 rounded-xl bg-card border border-border shadow-sm hover:shadow-[0_0_25px_hsl(180,100%,50%,0.15)] transition-all duration-500 hover:scale-105 hover:border-accent/50 group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
      }}
    >
      <stat.icon className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
      <span className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
        {formatValue()}
      </span>
      <span className="text-xs md:text-sm text-muted-foreground text-center">
        {stat.label}
      </span>
    </div>
  );
};

const OurImpact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-foreground">Our Impact So Far</h2>
      <div className="flex justify-center gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} isVisible={isVisible} index={index} />
        ))}
      </div>
    </section>
  );
};

export default OurImpact;
