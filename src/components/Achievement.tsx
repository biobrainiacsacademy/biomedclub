import { Trophy } from "lucide-react";

const Achievement = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-3xl mx-auto card-gradient rounded-xl p-5 md:p-6 border border-accent/30 hover:border-accent/60 hover:shadow-[0_0_30px_hsl(180,100%,50%,0.15)] transition-all duration-500 group">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-primary mb-1">
              Top 7% Globally in the Blue Ocean Entrepreneurship Competition 📈
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Out of 23,000+ competitors worldwide, our team placed in the Global Top 500. One mission, global impact, fueling our drive to turn this vision into reality. 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
