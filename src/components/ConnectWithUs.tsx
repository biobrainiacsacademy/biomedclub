import { Mail, Youtube, Instagram } from "lucide-react";
import { Reveal } from "@/lib/motion";

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    href: "mailto:biobrainiacsacademy@gmail.com",
    label: "biobrainiacsacademy@gmail.com",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@BioBrainiacsAcademy",
    label: "YouTube",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/biobrainiacsacademy/",
    label: "Instagram",
  },
];

const ConnectWithUs = () => {
  return (
    <section className="py-8 px-4">
      <Reveal variant="up" distance={28}>
        <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
          Connect With Us
        </h3>
      </Reveal>

      <div className="flex justify-center items-center gap-8">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <Reveal key={link.name} variant="scale" delay={index * 0.1}>
              <a
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-all duration-300 group"
                aria-label={link.name}
              >
                <div className="p-3 rounded-full border border-border group-hover:border-accent/50 group-hover:shadow-[0_0_20px_hsl(180,100%,50%,0.2)] transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs group-hover:text-accent transition-colors">{link.name}</span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default ConnectWithUs;
