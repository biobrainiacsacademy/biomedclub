import { Users, BookOpen, Eye } from "lucide-react";

const stats = [{
  icon: Users,
  value: "57",
  label: "Students Taught"
}, {
  icon: BookOpen,
  value: "21",
  label: "Topics Covered"
}, {
  icon: Eye,
  value: "14.6K",
  label: "Online Audience"
}];

const OurImpact = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-foreground">Our Impact So Far</h2>
      <div className="flex justify-center gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center p-3 md:p-4 w-28 md:w-36 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <stat.icon className="w-6 h-6 text-primary mb-2" />
            <span className="text-2xl md:text-3xl font-bold text-primary">
              {stat.value}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurImpact;