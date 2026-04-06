import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { getSettings } from "@/lib/data";

const Footer = () => {
  const settings = getSettings();

  const socials = [
    { icon: Linkedin, url: settings.linkedinUrl, label: "LinkedIn" },
    { icon: Github, url: settings.githubUrl, label: "GitHub" },
    { icon: Twitter, url: settings.twitterUrl, label: "Twitter" },
    { icon: Mail, url: `mailto:${settings.email}`, label: "Email" },
  ];

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-foreground font-semibold text-lg">DevFreelance</p>
            <p className="text-muted-foreground text-sm mt-1">{settings.email}</p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} DevFreelance. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
