import { Mail, Youtube, Instagram } from "lucide-react";

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
      <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
        Connect With Us
      </h3>
      
      <div className="flex justify-center items-center gap-8">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
              aria-label={link.name}
            >
              <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <span className="text-xs">{link.name}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default ConnectWithUs;
