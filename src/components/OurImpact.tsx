import { Users, BookOpen, Eye } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const stats = [{
  icon: Users,
  value: 57,
  label: "Students Taught"
}, {
  icon: BookOpen,
  value: 21,
  label: "Topics Covered"
}, {
  icon: Eye,
  value: 14600,
  displayValue: "14.6K",
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

const StatCard = ({ stat, isVisible }: { stat: typeof stats[0]; isVisible: boolean }) => {
  const count = useCountUp(stat.value, 2000, isVisible);
  
  const formatValue = () => {
    if (stat.displayValue) {
      const ratio = count / stat.value;
      return `${(14.6 * ratio).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="flex flex-col items-center p-3 md:p-4 w-28 md:w-36 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
      <stat.icon className="w-6 h-6 text-primary mb-2" />
      <span className="text-2xl md:text-3xl font-bold text-primary">
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
          <StatCard key={index} stat={stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
};

export default OurImpact;